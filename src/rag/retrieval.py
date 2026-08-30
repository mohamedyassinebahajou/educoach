from __future__ import annotations

import argparse
import os 
from pathlib import Path

from dotenv import load_dotenv
from langchain_community.embeddings import  HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma
from langchain_core.documents import Document

PROJECT_ROOT = Path(__file__).resolve().parents[2]
load_dotenv(PROJECT_ROOT / ".env")

COLLECTION_NAME = "educoach_lessons"

def resolve_project_path(raw_path:str)->Path:
    """Resolvean enviroment path relativeto the project root."""
    path = Path(raw_path)
    if path.is_absolute():
        return path
    return PROJECT_ROOT / path

    
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

def create_embeddings(model_name: str)-> HuggingFaceEmbeddings:
    """Create the local CPU embedding model."""
    return HuggingFaceEmbeddings(
        model_name=model_name,
        model_kwargs = {"device":"cpu"},
        encode_kwargs={"normalize_embeddings":True}
    )
    
def load_vector_store(persist_directory: Path, embedding_model: str)->Chroma:
    """Load a prev ingested Chroma collection."""
    if not persist_directory.exists():
        raise FileNotFoundError(f"Vector DB not found at {persist_directory}."
                                "Run: python -m src.rag.ingest")
    
    embeddings = create_embeddings(embedding_model)
    
    return Chroma(
        persist_directory=str(persist_directory),
        embedding_function=embeddings,
        collection_name=COLLECTION_NAME
    )
    
def retrieve_context(question:str,
                     *,
                     persist_directory: Path|None = None,
                     embedding_model: str | None=None,
                     top_k:int | None=None, )->list[Document]:
    """return the top-k modt similar lesson chunks for a question"""
    cleared = question.strip()
    if not cleared:
        raise ValueError("question must not be empty")
    
    persist_directory = persist_directory or resolve_project_path(
        os.getenv("VECTOR_DB_PATH", "vector_db")
    )
    
    embedding_model = embedding_model or os.getenv(
        "EMBEDDING_MODEL",
        "sentence-transformers/all-MiniLM-L6-v2",
    )
    
    top_k = top_k or get_positive_int("RAG_TOP_K",3)
    
    vector_store = load_vector_store(persist_directory,embedding_model)
    return vector_store.similarity_search(cleared,k=top_k)

def format_context(docs: list[Document])->str:
    """Build a prompt-ready context block from retrieved chunks."""
    if not docs:
        return "No relevent lesson context was found."
    
    blocks: list[str] = []
    for i,doc in enumerate(docs, start=1):
        day = doc.metadata.get("day","?")
        topic = doc.metadata.get("topic","unknown")
        source = doc.metadata.get("source","unknown")
        blocks.append(
            f"[Chunk {i}] day {day} - {topic} (source: {source})\n"
            f"{doc.page_content.strip()}"
        )
    
    return "\n\n".join(blocks)


def print_results(docs: list[Document])-> None:
    """Print retrieved chunks in a readable CLI fromat."""
    if not docs:
        print("No chunks retrieved.")
        return 
    
    for i, doc in enumerate(docs, start=1):
        meta = doc.metadata
        print("="*60)
        print(
            f"#{i} | day={meta.get('day')} | "
            f"topic={meta.get('topic')} | "
            f"source={meta.get('source')}"
        )
        
        print("-" * 60)
        print(doc.page_content.strip())
        print()
        
def main() -> None:
    """CLI enrypoint for testing retrieval quality."""
    parser = argparse.ArgumentParser(
        description="Retrieve Top-K EduCoach lesson chunks for a question."
    )
    
    parser.add_argument(
        "--query",
        "-q",
        required=True,
        help = "Student question to search for.",
    )
    
    parser.add_argument(
        "--top-k",
        type=int,
        default = None,
        help="Override RAG_TOP_K (default from .env or 3).",
    )
    
    parser.add_argument(
        "--show-formatted",
        action = "store_true",
        help="Also print the prompt-ready formatted context block."
    )
    args = parser.parse_args()
    
    docs = retrieve_context(args.query, top_k=args.top_k)
    print(f"Query: {args.query}")
    print(f"Retrieved: {len(docs)} chunk(s)\n")
    print_results(docs)

    if args.show_formatted:
        print("=" * 60)
        print("FORMATTED CONTEXT")
        print("=" * 60)
        print(format_context(docs))
        
if __name__ == "__main__":
    main()