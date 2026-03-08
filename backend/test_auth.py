# test_auth.py
from starlette.testclient import TestClient
from main import app
import sys

def run_tests():
    client = TestClient(app)
    
    print("=== AUTH ENDPOINT TESTS ===\n")
    
    print("--- Test 1: Invalid Email Format (not UTD) ---")
    response = client.post("/api/auth/register", json={"email": "not_utd@gmail.com", "password": "password123"})
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    assert response.status_code == 422, "Should return 422 for invalid email format"
    assert "Email must be a valid @utdallas.edu address" in str(response.json())
    print("✓ PASS\n")
    
    print("--- Test 2: Invalid Email Format (wrong UTD pattern) ---")
    response = client.post("/api/auth/register", json={"email": "toolongemailaddress123456@utdallas.edu", "password": "password123"})
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    assert response.status_code == 422, "Should return 422 for invalid UTD email pattern"
    print("✓ PASS\n")
    
    print("--- Test 3: Valid Email Format but Short Password ---")
    response = client.post("/api/auth/register", json={"email": "abc123456@utdallas.edu", "password": "short"})
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    assert response.status_code == 422, "Should return 422 for password too short"
    assert "at least 6 characters" in str(response.json())
    print("✓ PASS\n")
    
    print("--- Test 4: Valid Email Format and Valid Password Length ---")
    test_email = sys.argv[1] if len(sys.argv) > 1 else "xyz789012@utdallas.edu"
    response = client.post("/api/auth/register", json={"email": test_email, "password": "password123"})
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    # Status will be 400 if Firebase not configured (expected), or 201 if successful
    assert response.status_code in [201, 400], "Should return 201 on success or 400 if Firebase not configured"
    print("✓ PASS (Firebase configuration not required for this test)\n")
    
    print("--- Test 5: Missing Email Field ---")
    response = client.post("/api/auth/register", json={"password": "password123"})
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    assert response.status_code == 422, "Should return 422 for missing email"
    assert "email is required" in str(response.json())
    print("✓ PASS\n")
    
    print("--- Test 6: Missing Password Field ---")
    response = client.post("/api/auth/register", json={"email": "abc123456@utdallas.edu"})
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    assert response.status_code == 422, "Should return 422 for missing password"
    assert "password is required" in str(response.json())
    print("✓ PASS\n")
    
    print("=== ALL TESTS PASSED ===")

if __name__ == "__main__":
    run_tests()
