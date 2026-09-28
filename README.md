# 🏭 SafeSkill AR — Industrial Safety Simulator

> **SIH Problem Statement SIH26041:** AR-Based Vocational Training Simulator for Industrial Safety in Jharkhand's Mining & Manufacturing Sector.

[![Built with React](https://img.shields.io/badge/Built%20with-React%2018-blue.svg)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/3D%20Engine-Three.js-black.svg)](https://threejs.org/)
[![WebAR Enabled](https://img.shields.io/badge/AR-WebAR%20Camera%20Passthrough-amber.svg)](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📌 Problem Statement Overview
In hazardous sectors like Jharkhand's underground coal mining (Dhanbad, Jharia) and heavy steel manufacturing (Bokaro, Jamshedpur), practical training in dangerous situations (such as methane accumulation, roof strata fall, live electrical fires, or ladle crane hazards) is life-threatening and economically unfeasible for vocational trainees (ITI and Polytechnic apprentices).

**SafeSkill AR** solves this by providing a zero-install, cross-platform **WebAR and 3D spatial training simulator**. Workers can experience dangerous industrial scenarios, spot hazards in real-time, make critical emergency decisions, and earn verified safety competency certificates without any physical danger.

---

## 🌟 Key Features

1. **Dual Viewport (WebAR + 3D Digital Twin):**
   - **Live WebAR Passthrough:** Streams the trainee's real-world camera feed with 3D hazard meshes and holographic HUD indicators overlaid onto their real room or table.
   - **3D Spatial Digital Twin:** 360° orbit view with zoom and industrial lighting for desktop computers or devices without camera access.

2. **Three Dedicated Jharkhand Scenarios:**
   - ⛏️ **Dhanbad Underground Coal Mine (Mining Safety):**
     - Worker missing DGMS-approved safety helmet & cap lamp (CMR 2017)
     - Fractured roof strata without props/bolts (SCAMP failure)
     - Methane ($\text{CH}_4$) gas accumulation & disconnected ventilation duct
     - 3.3kV trailing cable submerged in mine water puddle
   - ⚙️ **Bokaro Steel Manufacturing Plant (Machine Safety):**
     - 150-Ton overhead crane moving $1600^\circ\text{C}$ molten ladle without siren
     - 500-Ton hydraulic press with bypassed optical light curtain
     - 415V electrical maintenance without Lockout/Tagout (LOTO)
     - Hydraulic oil slick on operator walkway
   - 🔥 **Substation & Chemical Facility (Fire Emergency):**
     - Live Class C electrical switchgear fire with smoke & flame particles
     - Blocked emergency exit door obstructed by scrap pallets
     - Misplaced pressurized water extinguisher next to live 415V busbars
     - Flammable solvent chemical drums in transformer heat zone

3. **Interactive Mechanics:**
   - **Tap-to-Detect Raycasting:** Tap floating 3D holographic pins in the viewport to identify hazards and read statutory explanations.
   - **Web Audio Synthesizer:** Native offline siren alarms, gas detector pings, chime chords, and error buzzers (no external MP3 downloads).
   - **Timed Emergency Decision Dilemmas:** High-stakes decision trees with real-world physics and safety consequences.
   - **Statutory Assessment Quiz:** DGMS (Coal Mines Regulations) and The Factories Act 1948 multiple choice questions.
   - **Competency Dashboard & Radar Metrics:** Real-time tracking of hazard detection rates and safety readiness indices.
   - **Verified Digital Certificate:** Printable certificate issued under the State Vocational Safety Training Cell with certificate ID and QR verification.
   - **Bilingual Interface:** Instant one-click toggle between English and हिन्दी.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/<YOUR_USERNAME>/safeskill-ar.git

# Navigate into project directory
cd safeskill-ar

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173/` in your mobile or desktop browser!

### Building for Production
```bash
npm run build
```
The compiled, production-ready static assets will be located in the `dist/` directory.

---

## 🛠️ Tech Stack
- **Frontend:** React 18, Vite
- **3D & AR:** Three.js, WebRTC Camera API (`getUserMedia`)
- **Styling:** Tailwind CSS, Custom Glassmorphism UI
- **Audio:** Web Audio API (Synthesized Industrial SFX)
- **Icons & Effects:** Lucide React, Canvas Confetti

---

## 📜 Compliance & Regulations Referenced
- **DGMS** (Directorate General of Mines Safety) — Coal Mines Regulations (CMR) 2017
- **The Factories Act 1948** (Sections 21, 29, 32, 38)
- **Indian Electricity Rules 1956 & CEA Mines Regulations 2010**
- **IS 2190 & IS 15683** (Portable Fire Extinguisher Standards)
