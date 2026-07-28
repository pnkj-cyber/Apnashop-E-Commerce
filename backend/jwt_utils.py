import base64
import hmac
import hashlib
import json
import time

def base64url_encode(data: bytes) -> str:
    """Encode bytes using base64 url-safe formatting without padding."""
    return base64.urlsafe_b64encode(data).rstrip(b'=').decode('utf-8')

def base64url_decode(data: str) -> bytes:
    """Decode base64 url-safe string with restored padding."""
    padding = '=' * (4 - (len(data) % 4))
    return base64.urlsafe_b64decode(data + padding)

def encode_jwt(payload: dict, secret: str, algorithm: str = 'HS256') -> str:
    """
    Encode payload dictionary into an HS256 JWT string using a secret.
    """
    header = {"alg": algorithm, "typ": "JWT"}
    header_json = json.dumps(header, separators=(',', ':')).encode('utf-8')
    payload_json = json.dumps(payload, separators=(',', ':')).encode('utf-8')
    
    unsigned_token = f"{base64url_encode(header_json)}.{base64url_encode(payload_json)}"
    
    if algorithm == 'HS256':
        signature = hmac.new(secret.encode('utf-8'), unsigned_token.encode('utf-8'), hashlib.sha256).digest()
    else:
        raise ValueError("Unsupported algorithm")
        
    return f"{unsigned_token}.{base64url_encode(signature)}"

def decode_jwt(token: str, secret: str, algorithm: str = 'HS256') -> dict:
    """
    Decode and verify an HS256 JWT token string.
    Raises ValueError on invalid formats, signatures, or expired tokens.
    """
    parts = token.split('.')
    if len(parts) != 3:
        raise ValueError("Invalid token format")
        
    header_b64, payload_b64, signature_b64 = parts
    unsigned_token = f"{header_b64}.{payload_b64}"
    
    if algorithm == 'HS256':
        expected_signature = hmac.new(secret.encode('utf-8'), unsigned_token.encode('utf-8'), hashlib.sha256).digest()
        expected_signature_b64 = base64url_encode(expected_signature)
        if not hmac.compare_digest(signature_b64, expected_signature_b64):
            raise ValueError("Invalid signature")
    else:
        raise ValueError("Unsupported algorithm")
        
    payload = json.loads(base64url_decode(payload_b64).decode('utf-8'))
    
    # Check expiration
    if 'exp' in payload and time.time() > payload['exp']:
        raise ValueError("Token expired")
        
    return payload
