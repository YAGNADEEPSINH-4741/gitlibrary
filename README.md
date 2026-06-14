<div align="center">
  <img src="https://img.icons8.com/color/96/000000/code.png" alt="Logo" width="100" height="100">
  
  <h1 align="center">The Library of Code</h1>

  <p align="center">
    <strong>A beautiful, living, interactive 3D catalog mapping the world's open-source knowledge on GitHub.</strong>
  </p>

  <p align="center">
    <a href="#features">Features</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#architecture">Architecture</a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/React-18-blue.svg?style=for-the-badge&logo=react" alt="React">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite">
    <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js">
  </p>
</div>

---

## 📖 About The Project

**The Library of Code (GitBook)** is a highly interactive, responsive web application that turns standard code repositories into a visual, living library. Built to inspire developers, the application queries the GitHub API in real-time, allowing users to explore trending repositories, view code "genomes", and even enter a fully immersive 3D Library space to browse code like physical books on a shelf.

### ✨ Core Features

* **Real-time GitHub Search:** Instantaneous search across millions of public repositories, authors, and topics.
* **Immersive 3D Library:** Step into a 3D rendered library to visually browse trending and searched repositories as physical books. *Fully supports Desktop (Pointer Lock) and Mobile (Touch Navigation)*.
* **Repository Genome:** See beyond the source code with our visual signature system—analyzing Architecture, Activity, Popularity, and Discoverability at a glance.
* **Live Leaderboards:** Stay up to date with the largest, most active, and trending codebases on GitHub.
* **Premium Responsive Design:** Stunning aesthetics with micro-animations, glassmorphism, and a seamless mobile-to-desktop experience.
* **Detailed Book Summaries:** Click any repository to view live folder structures, technology tags, and live repository "book scores."

---

## 🛠️ Tech Stack

Built using modern web development standards to ensure maximum performance, beautiful UI, and an excellent developer experience.

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | [React 18](https://reactjs.org/) | UI Library |
| **Build Tool** | [Vite](https://vitejs.dev/) | Next-generation frontend tooling |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Static typing for JavaScript |
| **3D Rendering** | [Three.js](https://threejs.org/) & [R3F](https://docs.pmnd.rs/react-three-fiber/) | WebGL 3D rendering library |
| **Styling** | Vanilla CSS3 | Custom Design System, Glassmorphism |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Production-ready animations |
| **Icons** | [Lucide React](https://lucide.dev/) | Beautifully crafted icons |
| **API** | [GitHub REST API](https://docs.github.com/en/rest) | Real-time code data |

---

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

Ensure you have Node.js installed (v16.x or later is recommended).

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/YAGNADEEPSINH-4741/gitlibrary.git
   cd gitlibrary
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```

4. **Open your browser:** Navigate to `http://localhost:5173` to view the application.

### Building for Production

To create an optimized production build:
```sh
npm run build
```
This will output the static files into the `dist/` directory, ready to be deployed to any static hosting provider.

---

## 🏗️ Architecture

The application is heavily component-driven, favoring a modular approach. For a more detailed breakdown of the application design, refer to the [ARCHITECTURE.md](./ARCHITECTURE.md) document.

- `src/App.tsx` - Main routing and application layout.
- `src/Library3D.tsx` - Handles the 3D immersive view of repositories.
- `src/styles.css` - Custom design system, typography, and responsive media queries.
- `src/data.ts` - Seed data, types, and trending data handling.

---

## 📱 Mobile Support

The 3D Library features full mobile support! When accessed via a touch device, the application automatically disables pointer lock and presents an intuitive on-screen D-Pad and touch-to-drag camera controls for a seamless immersive experience on the go.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

<div align="center">
  <p>Made with ❤️ for the open-source community.</p>
</div>
