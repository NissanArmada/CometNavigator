# ☄️ Comet Navigator

**Description**
The ultimate student scheduling and campus discovery platform! Proud winner of the Figma track at HackUTD! 🏆 Comet Navigator seamlessly integrates campus data sources to help students manage their classes, discover clubs, find study rooms, and even match with friends. 

**✨ Key Features**
* **📅 Dynamic Class Scheduling:** A beautiful, intuitive calendar and dashboard (`ClassScheduleManager`) to keep your academic life perfectly organized!
* **📚 Smart Study Room Finder:** Real-time discovery of available study rooms across campus so you never have to wander around looking for a spot!
* **🤖 AI Club Recommendations:** Uses an advanced Machine Learning backend (`ml_service.py`) to analyze your onboarding survey and suggest the perfect campus organizations for you!
* **🤝 Friend Matching System:** Connect with peers who share your academic portfolios and special interests using the built-in swipe and match UI!

**🚀 Tech Stack**
* **Frontend:** Next.js, React, Tailwind CSS (Beautiful, award-winning UI!)
* **Backend:** Python, FastAPI
* **Data/ML:** Custom campus data scrapers and dynamic recommendation algorithms.

**🛠️ Getting Started**

**1. Start the Next.js Frontend:**
```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```
*The web app will be available on `http://localhost:3000`!*

**2. Boot up the FastAPI Backend:**
Make sure you are in the `/backend` directory!
```bash
# Install Python dependencies
pip install -r requirements.txt

# Start the API server
python main.py
```
*The API will start running on `http://localhost:8000` to serve your frontend!*
