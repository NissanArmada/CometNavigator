import logging
from typing import List, Tuple
import numpy as np
from sentence_transformers import SentenceTransformer

logger = logging.getLogger("cometnavigator.ml_service")

# Load the embedding model once at module initialization
try:
    model = SentenceTransformer("all-MiniLM-L6-v2")
    logger.info("Loaded sentence-transformers model: all-MiniLM-L6-v2")
except Exception as e:
    logger.error(f"Failed to load sentence-transformers model: {str(e)}")
    model = None


def generate_user_profile_text(major: str, belief: str, nationality: str, hobbies: List[str]) -> str:
    """
    Format user survey data into a single text string for embedding.
    
    Args:
        major: Student's major
        belief: Student's belief/religion
        nationality: Student's nationality
        hobbies: List of hobbies
    
    Returns:
        Formatted profile text string
    """
    hobbies_str = ", ".join(hobbies)
    profile_text = f"Major: {major}. Belief: {belief}. Nationality: {nationality}. Hobbies: {hobbies_str}."
    return profile_text


def generate_club_profile_text(name: str, description: str, tags: List[str]) -> str:
    """
    Format club data into a single text string for embedding.
    
    Args:
        name: Club name
        description: Club description
        tags: List of club tags/categories
    
    Returns:
        Formatted club profile text string
    """
    tags_str = ", ".join(tags) if tags else ""
    club_text = f"{name}. {description}. Tags: {tags_str}."
    return club_text


def compute_embedding(text: str) -> np.ndarray:
    """
    Generate a dense vector embedding for a text string.
    
    Args:
        text: Input text to embed
    
    Returns:
        Numpy array representing the embedding (384-dimensional for all-MiniLM-L6-v2)
    """
    if model is None:
        raise RuntimeError("Sentence-transformers model not loaded")
    
    embedding = model.encode(text, convert_to_numpy=True)
    return embedding


def cosine_similarity(vec1: np.ndarray, vec2: np.ndarray) -> float:
    """
    Calculate cosine similarity between two vectors.
    
    Args:
        vec1: First vector
        vec2: Second vector
    
    Returns:
        Cosine similarity score between 0 and 1
    """
    norm1 = np.linalg.norm(vec1)
    norm2 = np.linalg.norm(vec2)
    
    if norm1 == 0 or norm2 == 0:
        return 0.0
    
    similarity = np.dot(vec1, vec2) / (norm1 * norm2)
    # Normalize from [-1, 1] to [0, 1]
    normalized_similarity = (similarity + 1) / 2
    return float(normalized_similarity)


def get_top_club_matches(
    user_embedding: np.ndarray,
    club_embeddings: List[Tuple[str, np.ndarray]]
) -> List[Tuple[str, float]]:
    """
    Calculate cosine similarity between user and all clubs, returning top matches.
    
    Args:
        user_embedding: User's profile embedding
        club_embeddings: List of tuples (club_id, embedding)
    
    Returns:
        List of tuples (club_id, similarity_score) sorted by similarity (descending),
        limited to top 3 matches
    """
    similarities = []
    
    for club_id, club_embedding in club_embeddings:
        similarity = cosine_similarity(user_embedding, club_embedding)
        similarities.append((club_id, similarity))
    
    # Sort by similarity score (descending) and take top 3
    top_matches = sorted(similarities, key=lambda x: x[1], reverse=True)[:3]
    
    return top_matches
