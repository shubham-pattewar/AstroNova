# AstroNova

Heritage Astronomy Instruments Simulator
Overview
A full-stack educational web application featuring interactive 3D models and astronomical simulations of historical Indian instruments (Samrat Yantra, Bhitti Yantra, and Nadi Valaya Yantra) with location-based calculations and celestial event tracking.

Project Architecture
Frontend: React.js + Three.js (React Three Fiber) + Tailwind CSS
Backend: Python Flask with NumPy/Pandas for astronomical calculations
3D Visualization: Three.js with procedural geometry and custom shaders
Styling: Tailwind CSS with heritage-astronomy theme
Tech Stack
Frontend
React.js for UI components
Three.js / React Three Fiber for 3D models
Tailwind CSS for styling
React Router for navigation
Axios for API communication
Backend
Python Flask for REST API
NumPy for astronomical calculations
Pandas for data processing
Flask-CORS for cross-origin requests
Features
Interactive 3D models of three historical Indian astronomical instruments
Location-based dimension calculations (latitude/longitude input)
Time-based shadow simulation for Samrat Yantra
Celestial tracking visualization for Bhitti and Nadi Valaya Yantras
Interactive time controls for dynamic simulations
Educational content about historical significance
Astronomical calendar for celestial events (solstices, equinoxes, eclipses)
Responsive heritage-astronomy themed UI
Project Structure
/backend          - Flask API server
/frontend         - React application
Recent Changes
[Oct 10, 2025] Initial project setup with Python Flask and Node.js
[Oct 10, 2025] Complete full-stack application implemented with all MVP features
[Oct 10, 2025] Integrated authoritative NASA eclipse catalog (2023-2030) with 36 eclipses
[Oct 10, 2025] Implemented Meeus polynomial algorithms for accurate equinox/solstice calculations
[Oct 10, 2025] Created interactive 3D models using Three.js for all three instruments
[Oct 10, 2025] Built time-based shadow simulations and celestial tracking visualizations
[Oct 10, 2025] Deployed heritage-astronomy themed UI with Tailwind CSS
Deployment
Frontend: Port 5000 (React + Vite + Three.js)
Backend: Port 8000 (Flask API)
Workflows configured and running successfully
Ready for publication on Replit
