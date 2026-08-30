"""Block clearly dangerous patterns in students messages."""


from __future__ import annotations

import re 

DANGEROUS_PATTERNS: list[tuple[str, str]] = [
    (r"\beval\s*\(", "eval() is not allowed"),
    (r"\bexec\s*\(", "exec() is not allowed"),
    (r"\bos\.system\s*\(", "os.system() is not allowed"),
    (r"\bsubprocess\b", "subprocess is not allowed"),
    (r"__import__\s*\(", "__import__() is not allowed"),
    (r"\bopen\s*\(\s*['\"]\/etc\/", "reading system files is not allowed"),
]

def validate_input(text: str)->tuple[bool,str]:
    """Return (ok, reason). ok=False means the messsage mujst be rejected."""
    cleaned = (text or "").strip()
    if not cleaned:
        return False,"MEssage is empty."
    
    for pattern,reason in DANGEROUS_PATTERNS:
        if re.search(pattern,cleaned,flags=re.IGNORECASE):
            return False, reason
        
    return True, "ok"