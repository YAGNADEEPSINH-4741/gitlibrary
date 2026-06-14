<div align="center">
  <img src="https://img.icons8.com/color/96/000000/code.png" alt="Logo" width="80" height="80">
  <h1 align="center">The Library of Code</h1>
  <p align="center">
    A beautiful, living, interactive 3D catalog mapping the world's open-source knowledge on GitHub.
    <br />
    <br />
    <a href="#features"><strong>Explore Features »</strong></a>
    <br />
    <br />
    <a href="#getting-started">Getting Started</a>
    ·
    <a href="#tech-stack">Tech Stack</a>
    ·
    <a href="#architecture">Architecture</a>
  </p>
</div>

<hr />

## 📖 About The Project

**The Library of Code (GitBook)** is a highly interactive, responsive web application that turns standard code repositories into a visual, living library. Built to inspire developers, the application queries the GitHub API in real-time, allowing users to explore trending repositories, view code "genomes", and even enter a fully immersive 3D Library space to browse code like books on a shelf.

### ✨ Core Features

* **Real-time GitHub Search:** Instantaneous search across millions of public repositories, authors, and topics.
* **Immersive 3D Library:** Step into a 3D rendered library to visually browse trending and searched repositories as physical books.
* **Repository Genome:** See beyond the source code with our visual signature system—analyzing Architecture, Activity, Popularity, and Discoverability at a glance.
* **Live Leaderboards:** Stay up to date with the largest, most active, and trending codebases on GitHub.
* **Premium Responsive Design:** Stunning aesthetics with micro-animations, glassmorphism, and a seamless mobile-to-desktop experience.
* **Detailed Book Summaries:** Click any repository to view live folder structures, technology tags, and live repository "book scores."

## 🛠️ Tech Stack

This project is built using modern web development standards to ensure maximum performance, beautiful UI, and an excellent developer experience.

* **Framework:** [React 18](https://reactjs.org/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** Vanilla CSS3 (Custom Design System, Glassmorphism, CSS Grid/Flexbox)
* **Animations:** [Framer Motion](https://www.framer.com/motion/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **API Integration:** [GitHub REST API](https://docs.github.com/en/rest)

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
This will output the static files into the `dist/` directory, ready to be deployed.

## 🏗️ Architecture

The application is heavily component-driven, favoring a modular approach. For a more detailed breakdown of the application design, refer to the [ARCHITECTURE.md](./ARCHITECTURE.md) document.

* `src/App.tsx` - Main routing and layout.
* `src/Library3D.tsx` - Handles the 3D immersive view of repositories.
* `src/styles.css` - Custom design system, typography, and responsive media queries.
* `src/data.ts` - Seed data, types, and trending data handling.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---
<p align="center">Made with ❤️ for the open-source community.</p>
