# parse_lesson_metadata(path: Path) -> dict[str, str | int]
# load_lesson_documents(lessons_path: Path) -> list[Document]
# split_documents(documents: list[Document], ...) -> list[Document]
# build_vector_store(chunks: list[Document], ...)
# main() -> None


from __future__ import annotations

import argparse
import os
import re
import shutil
from pathlib import Path

from dotenv import load_dotenv
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter

PROJECT_ROOT = Path(__file__).resolve().parents[2]
load_dotenv(PROJECT_ROOT / ".env")

COLLECTION_NAME = "educoach_lessons"
LESSON_FILENAME_PATTERN = re.compile(r"^day(?P<day>\d{2})_(?P<topic>[a-z0-9_]+)\.md$")


def resolve_project_path(raw_path:str)-> Path:
    """resolve and env path relative to project root."""
    path = Path(raw_path)
    if path.is_absolute():
        return path
    return PROJECT_ROOT/path

def parse_lesson_metadata(path:Path)->dict[str,str|int]:
    """Estract the dat, topic, and metadata from a lesson filename"""
    match = LESSON_FILENAME_PATTERN.match(path.name)
    if match is None:
        raise ValueError(f"Invalid lesson filename:{path.name}. Excpected format: dayNN_topic.md")
    
    return {
        "day":int(match.group("day")),
        "topic":match.group("topic"),
        "source":str(path.relative_to(PROJECT_ROOT)),
        "filename":path.name,
    }
    
def load_lesson_documents(lessons_path: Path)->list[Document]:
    """Load lesson MArkdown files as LangChain document."""
    lesson_files = sorted(lessons_path.glob("day*.md"))
    
    if not lesson_files:
        raise FileNotFoundError(f"No lesson files matching day*.md found in {lesson_files}")
    
    documents : list[Document] = []
    
    for lesson_path in lesson_files:
        content = lesson_path.read_text(encoding="utf-8").strip()
        if not content:
            raise ValueError(f"Lesson file is empty:{lesson_path}")
        
        documents.append(
            Document(
                page_content = content,
                metadata=parse_lesson_metadata(lesson_path),
            )
        )
        
    return documents 

# docs = load_lesson_documents(PROJECT_ROOT / "data/raw")

# print(len(docs))
# print(docs[2].metadata)
# print(docs[2].page_content[:200])

def split_documents(
    documents: list[Document],
    chunk_size: int,
    chunk_overlap:int,
)-> list[Document]:
    """Split lesson documents into overlapping retrieval chunks."""
    if chunk_size <= 0:
        raise ValueError("chunk_size must be greater than zero")
    if chunk_overlap < 0 or chunk_overlap >= chunk_size:
        raise ValueError("chunk_overlap must be non-negative and smaller than chunk_size")
    
    splitter = RecursiveCharacterTextSplitter(
        chunk_size = chunk_size,
        chunk_overlap = chunk_overlap, 
        separators=["\n##", "\n###","\n\n"," ",""]
    )
    
    chunks = splitter.split_documents(documents)
    
    for index, chunk in enumerate(chunks):
        chunk.metadata["chunk_id"] = index
    
    return chunks

# chunks = split_documents(docs,chunk_size=500,chunk_overlap=50)
# print(f"Created {len(chunks)} chunks")
# print(chunks[0].metadata)
# print(chunks[0].page_content)

def create_embeddings(model_name: str)-> HuggingFaceEmbeddings:
    """Create the local CPU embedding model."""
    return HuggingFaceEmbeddings(
        model_name=model_name,
        model_kwargs = {"device":"cpu"},
        encode_kwargs={"normalize_embeddings":True}
    )
    
def prepare_persist_directory(persist_dir:Path,rebuild:bool)->None:
    """Create an empty persistence directory or rebuild it create_embeddings"""
    existing_entries = (
        [entry for entry in persist_dir.iterdir() if entry.name != ".gitkeep"]
        if persist_dir.exists()
        else []
    )
    
    if existing_entries and not rebuild:
        raise FileExistsError(f"Vector DB already exists at {persist_dir}. "
                              "Run again with --rebuild to replace it.")
    
    if existing_entries and rebuild:
        shutil.rmtree(persist_dir)
    
    persist_dir.mkdir(parents=True,exist_ok=True) 
    

def build_vector_store(chunks: list[Document],persist_dir:Path,embedding_model:str)->Chroma:
    """Embed chunks and store them in a persistent Chroma collection,"""
    if not chunks :
        raise ValueError("Cannot build a vector store from zero chunks")
    
    embeddings = create_embeddings(embedding_model)
    
    return Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=str(persist_dir),
        collection_name=COLLECTION_NAME,
        collection_metadata={"hnsw:space":"cosine"} 
    )
    
def get_positive_int(name:str, default:int)->int:
    """Read a positive integer from the env"""
    raw_value = os.getenv(name,str(default))
    try: 
        value = int(raw_value)
    except ValueError as exc:
        raise ValueError(f"{name} must be an integer, got {raw_value!r}") from exc 
    
    if value <=0:
        raise ValueError(f"{name} must be dreater than zero")
    return value 

def main()->None : 
    """run the complete lesson-ingestion pipeline."""
    parser = argparse.ArgumentParser(
        description="Build the EduCoach lesson vector database."
    )
    
    parser.add_argument(
        "--rebuild",
        action="store_true",
        help="Delete and rebuild an existing vector database."
    )
    
    args = parser.parse_args()
    
    lessons_path = resolve_project_path(
        os.getenv("LESSONS_PATH","data/raw")
    )
    
    persist_directory = resolve_project_path(
        os.getenv("VECTOR_DB_PATH","vector_db")
    )
    
    embedding_model = os.getenv(
        "EMBEDDING_MODEL",
        "sentence-transformers/all-MiniLM-L6-v2"
    )
    
    chunk_size = get_positive_int("RAG_CHUNK_SIZE",500)
    chunk_overlap = int(os.getenv("RAG_CHUNK_OVERLAP","50"))
    
    print(f"Loading lessons from :{lessons_path}")
    documents = load_lesson_documents(lessons_path)
    print(f"Loaded {len(documents)} lesson documents")
    
    chunks = split_documents(
        documents,
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap
    )
    print(
        f"Created {len(chunks)} chunks"
        f"(size={chunk_size}, overlap={chunk_overlap})"
    )
    
    prepare_persist_directory(persist_dir=persist_directory,rebuild=args.rebuild)
    
    print(f"Embedding with:{embedding_model}")
    
    vector_store = build_vector_store(chunks,
                                      persist_dir=persist_directory ,
                                      embedding_model=embedding_model)
    
    stored_count = vector_store._collection.count()
    
    print(f"Stored {stored_count} chunks")
    print(f"Vectore DB saved tp:{persist_directory}")
    
    
if __name__ == "__main__":
    main()