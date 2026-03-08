#!/usr/bin/env python3
"""
Quick Start Guide for Club Recommendation System

This script helps you set up and test the club recommendation system.
"""

import subprocess
import sys
import os

def run_command(cmd, description):
    """Run a shell command and report results"""
    print(f"\n{'='*60}")
    print(f"📝 {description}")
    print(f"{'='*60}")
    try:
        result = subprocess.run(cmd, shell=True, cwd="backend")
        return result.returncode == 0
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def main():
    print("""
╔════════════════════════════════════════════════════════════╗
║   CometNavigator - Club Recommendation System Setup       ║
╚════════════════════════════════════════════════════════════╝
    """)
    
    steps = [
        ("python -m pip install -q -r requirements.txt", 
         "Installing Python dependencies..."),
        
        ("python test_ml_service.py", 
         "Testing ML service functions..."),
    ]
    
    completed = 0
    for cmd, desc in steps:
        if run_command(cmd, desc):
            completed += 1
            print(f"✓ Completed")
        else:
            print(f"✗ Failed")
            print("Continuing to next step...")
    
    print(f"\n{'='*60}")
    print(f"✓ Setup complete! ({completed}/{len(steps)} steps passed)")
    print(f"{'='*60}")
    
    print("""
Next Steps:
───────────

1. SEED THE DATABASE (one-time setup):
   cd backend
   python scripts/seed_clubs.py
   
   This will:
   - Fetch clubs from https://api.utdnebula.com/clubs/search
   - Generate embeddings for each club
   - Store them in MongoDB

2. START THE API:
   cd backend
   python main.py
   
   Server will run on http://localhost:8000

3. TEST THE ENDPOINT:
   curl -X POST http://localhost:8000/api/onboarding/recommendations \\
     -H "Content-Type: application/json" \\
     -d '{
       "uid": "test_user_123",
       "major": "Computer Science",
       "belief": "Christian",
       "nationality": "Indian",
       "hobbies": ["Gaming", "Coding", "Music"]
     }'

API Documentation:
──────────────────
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

For detailed information, see: RECOMMENDATIONS_GUIDE.md
    """)

if __name__ == "__main__":
    main()
