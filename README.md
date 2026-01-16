# 🤖 Nali-Bot Control Core v1.0

> **"This system is designed for Ramesh, a sanitation worker in Delhi, to detect toxic gas pockets before entering a sewer. The dashboard focuses on clarity and immediate safety alerts."**

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-00ff41?style=for-the-badge&logo=statuspal&logoColor=white" alt="Status">
  <img src="https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/Tailwind-4.1.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind">
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License">
</p>

---

## 🎯 The Problem

In India, **manual scavenging**—the practice of manually cleaning sewers—claims lives every year due to toxic gas exposure. Sanitation workers like **Ramesh** enter confined spaces without proper equipment or real-time monitoring, risking their lives to hydrogen sulfide (H₂S) and methane (CH₄) gas pockets.

## 💡 The Solution

**Nali-Bot** is a soft-robotic crawler designed to inspect sewers autonomously, eliminating the need for human entry. This **Intelligent Control Station** serves as the mission control dashboard for municipal engineers to:

- 📹 **Monitor live video feeds** from the robot's camera
- 📊 **Track real-time gas levels** (Methane/H₂S) with instant alerts
- 🤖 **View AI-powered defect detection** (cracks, blockages, corrosion)
- 📋 **Review system logs** for complete operational transparency

---

## 🖥️ Dashboard Preview

### Features at a Glance

| Feature | Description |
|---------|-------------|
| **Smart Video Feed** | Simulated sewer cam with HUD overlay, AI detection boxes |
| **Live Telemetry** | Real-time methane & pressure graphs with threshold alerts |
| **System Logs** | Auto-scrolling console with color-coded entries |
| **Safety Indicators** | Instant visual warnings for dangerous gas levels |

### Design Aesthetic

- **Theme**: Cyberpunk Industrial / NASA Dark Mode
- **Colors**: Deep blacks (#0a0a0a), Neon Greens (#00ff41), Warning Oranges (#ff9f00)
- **Typography**: Monospace HUD-style text
- **Effects**: Scanlines, grid overlays, glowing elements

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/MohammedAnasNathani/Nali-Bot-RedBrick-
cd nali-bot

# Install dependencies
npm install

# Start the development server
npm run dev
```

The dashboard will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
nali-bot/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Dashboard.jsx      # Main grid layout
│   │   │   ├── Sidebar.jsx        # Navigation panel
│   │   │   └── Header.jsx         # Top bar with clock
│   │   ├── video/
│   │   │   ├── VideoFeed.jsx      # Camera feed container
│   │   │   ├── VideoOverlay.jsx   # HUD overlay layer
│   │   │   └── DetectionBox.jsx   # AI detection boxes
│   │   ├── telemetry/
│   │   │   ├── TelemetryPanel.jsx # Graph container
│   │   │   ├── MethaneGraph.jsx   # CH4 levels chart
│   │   │   └── PressureGraph.jsx  # PSI chart
│   │   └── logs/
│   │       └── SystemLogs.jsx     # Rolling log console
│   ├── hooks/
│   │   ├── useTelemetry.js        # Real-time data hook
│   │   ├── useClock.js            # Live clock hook
│   │   └── useLogs.js             # Auto-log generator
│   ├── utils/
│   │   └── dataGenerators.js      # Mock data functions
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                  # Design system + animations
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | UI Framework |
| **Vite 7** | Build tool & dev server |
| **Tailwind CSS 4** | Utility-first styling |
| **Recharts** | Data visualization |
| **Lucide React** | Icon library |

---

## 🎮 Simulated Features

Since this is a hackathon demo without a physical robot, the dashboard includes:

1. **Simulated Video Feed**: Dark sewer tunnel background with scanning effects
2. **AI Detection Boxes**: Appear at 5s and 15s intervals simulating crack/blockage detection
3. **Real-time Telemetry**: Methane and pressure values update every second with realistic noise
4. **System Logs**: Auto-generate authentic-looking operational logs

---

## 🔐 Safety Features

- ⚠️ **Methane Alert at 35 PPM** - Graph turns orange
- 🚨 **Critical Alert at 50 PPM** - Graph turns red with blinking indicators
- 📊 **Threshold Lines** - Visual reference for safe operating levels
- 🔔 **Real-time Notifications** - System logs highlight dangerous conditions

---

## 📖 User Story: Ramesh

> *Ramesh is a 42-year-old sanitation worker in Delhi's municipal corporation. Every week, he's asked to enter sewers for inspection—a task that has claimed the lives of his colleagues due to toxic gas exposure.*
>
> *With Nali-Bot, Ramesh no longer needs to enter the sewer himself. He operates the robot from this control station, watching the live feed and monitoring gas levels. When the AI detects a crack or dangerous gas pocket, Ramesh can mark it for repair—all from the safety of ground level.*
>
> *"For the first time, I don't fear going to work. The robot goes where I shouldn't."* — Ramesh

---

## 🏆 Hackathon Context

This project was developed for a hackathon focused on **eliminating manual scavenging in India**. The Nali-Bot soft-robotic crawler, combined with this intelligent control station, represents a complete solution for:

1. **Autonomous sewer inspection**
2. **Real-time safety monitoring**
3. **AI-powered defect detection**
4. **Dignifying sanitation work**

---

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

---

## 👥 Team

**RedBrick** - Hackathon Team

---

<p align="center">
  <strong>🚀 Built with ❤️ to save lives</strong>
</p>
