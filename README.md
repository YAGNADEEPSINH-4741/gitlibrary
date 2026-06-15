<div align="center">
  <img src="https://img.icons8.com/color/150/000000/code.png" alt="Library of Code Logo" width="120" height="120">
  
  <h1 align="center" style="font-family: 'Playfair Display', serif; font-size: 3rem;">The Library of Code</h1>

  <p align="center" style="font-size: 1.2rem; color: #555;">
    <strong>A beautiful, living, interactive 3D catalog mapping the world's open-source knowledge on GitHub.</strong><br>
    <em>Explore the GitHub ecosystem like an infinite library of physical books, powered by real-time data, React Three Fiber, and breathtaking glassmorphism.</em>
  </p>

  <p align="center">
    <a href="#-about-the-project">About</a> •
    <a href="#-core-features">Features</a> •
    <a href="#-the-repository-genome">Genome</a> •
    <a href="#%EF%B8%8F-tech-stack">Tech Stack</a> •
    <a href="#-architecture--design">Architecture</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-mobile-support--3d-controls">Mobile</a>
  </p>

  <p align="center">
    <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 18"></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
    <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-Build_Tool-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite"></a>
    <a href="https://threejs.org/"><img src="https://img.shields.io/badge/Three.js-WebGL-000000?style=for-the-badge&logo=threedotjs&logoColor=white" alt="Three.js"></a>
    <a href="https://docs.pmnd.rs/react-three-fiber/"><img src="https://img.shields.io/badge/R3F-React_Three_Fiber-black?style=for-the-badge" alt="R3F"></a>
    <a href="https://framer.com/motion/"><img src="https://img.shields.io/badge/Framer_Motion-Animations-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion"></a>
  </p>
</div>

---

<details open>
  <summary><strong style="font-size: 1.2rem;">Table of Contents</strong></summary>
  <ol>
    <li><a href="#-about-the-project">About The Project</a></li>
    <li><a href="#-core-features">Core Features</a></li>
    <li><a href="#-the-repository-genome">The Repository Genome</a></li>
    <li><a href="#%EF%B8%8F-tech-stack">Tech Stack</a></li>
    <li><a href="#-architecture--design">Architecture & Design</a>
      <ul>
        <li><a href="#component-structure">Component Structure</a></li>
        <li><a href="#data-fetching-strategy">Data Fetching Strategy</a></li>
        <li><a href="#3d-rendering-pipeline">3D Rendering Pipeline</a></li>
      </ul>
    </li>
    <li><a href="#-getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#development">Development</a></li>
        <li><a href="#production-build">Production Build</a></li>
      </ul>
    </li>
    <li><a href="#-mobile-support--3d-controls">Mobile Support & 3D Controls</a></li>
    <li><a href="#-performance-optimization">Performance Optimization</a></li>
    <li><a href="#-roadmap">Roadmap</a></li>
    <li><a href="#-contributing">Contributing</a></li>
    <li><a href="#-license">License</a></li>
    <li><a href="#-contact--acknowledgements">Contact & Acknowledgements</a></li>
  </ol>
</details>

---

## 📖 About The Project

**The Library of Code (GitBook)** is not just a repository browser—it is a philosophical reimagining of how we interact with code. By transforming abstract digital repositories into tangible, physical objects (books) residing in a limitless 3D space, this project seeks to restore a sense of wonder, exploration, and spatial memory to the open-source community.

Standard interfaces often rely on endless scrolling lists, abstracting away the true scale of human collaboration on platforms like GitHub. The Library of Code turns every search query into a sprawling hallway of knowledge. As you search for topics—whether it be `machine-learning`, `react-components`, or a specific developer's profile—an infinite 3D library is dynamically constructed in real-time right in front of you. 

You can literally *walk* the aisles, gaze upon shelves populated by colorful repository "books," and pull them off the shelf to examine their architecture. By bringing spatial relationships and beautiful aesthetics to repository browsing, The Library of Code creates an experience that is both intellectually engaging and visually stunning.

---

## ✨ Core Features

### 1. The Infinite 3D Library
The crown jewel of the application is the procedurally generated, infinite 3D environment. Using **Three.js** and **React Three Fiber (R3F)**, the app renders a vast architectural space.
* **Infinite Aisle Generation:** As you walk forward in the 3D space, the library dynamically fetches more repositories from the GitHub API and seamlessly constructs new bookcases, lights, and floor segments ahead of you.
* **Spatial Memory:** By browsing repositories physically, developers can better remember where they found specific tools.
* **Immersive Atmosphere:** Fog effects, hemisphere lighting, dynamic shadows, and high-quality PBR (Physically Based Rendering) materials create a warm, inviting library ambiance.

### 2. Real-Time GitHub Search
Powered directly by the public GitHub REST API, the library is always up to date.
* Search by keywords, specific tags, owners, or exact repository names.
* Watch the 3D library instantly tear down and rebuild itself according to your query.
* Real-time loading indicators seamlessly built into the HUD overlay.

### 3. Live Leaderboards & Trending
For users looking for inspiration, the homepage provides curated lists:
* **The Largest Volumes:** Codebases with massive footprints.
* **Most Active Codebases:** Repositories with the highest velocity of recent commits.
* **Trending Worldwide:** What the developer community is starring right now.

### 4. Detailed "Book" Summaries
Clicking on any 3D book or 2D search result brings up the Book Interface:
* **Live Folder Structures:** A visual representation of the project's root tree.
* **Technology Tags:** Extracted and color-coded based on the primary languages used.
* **Direct Links:** One-click access to the original GitHub repository.

---

## 🧬 The Repository Genome

Every repository on GitHub has a unique "DNA." The Library of Code introduces the concept of the **Repository Genome**, a visual signature system that analyzes a repository across four key metrics to give you a glanceable understanding of its health and scale.

1. **Architecture (Scale & Complexity):** Measured by file count, language distribution, and directory depth. Large, monolithic codebases are visually distinct from small, sharp utility libraries.
2. **Activity (Velocity & Pulse):** Measured by commit frequency, active pull requests, and issue resolution time. A repository with a high activity score is "alive" and actively maintained.
3. **Popularity (Community Validation):** Measured by Stars, Forks, and Watchers. High popularity gives a repository a stronger "glow" and more prominent placement on the shelves.
4. **Discoverability (Documentation & Tags):** Measured by the quality of the README, presence of topics/tags, and description length. Well-documented code is easier to "read" in the library.

When you open a book in the library, these metrics are aggregated into the **Book Score**, providing an immediate sense of the repository's value.

---

## 🛠️ Tech Stack

This project is uncompromising in its technology choices, prioritizing modern paradigms, type safety, and raw performance.

| Category | Technology | Why it was chosen |
| :--- | :--- | :--- |
| **UI Framework** | **React 18** | The industry standard for declarative, component-driven interfaces. React 18's concurrent features ensure the 2D UI remains buttery smooth even while the 3D canvas is rendering heavily. |
| **Language** | **TypeScript** | Strict typing eliminates entire classes of runtime errors. Every GitHub API response is strongly typed, ensuring safe data extraction for the 3D renderer. |
| **Build Tool** | **Vite** | Blazing fast HMR (Hot Module Replacement) and optimized production builds via Rollup. Vite drastically reduces development friction compared to older bundlers like Webpack. |
| **3D Engine** | **Three.js** | The premier WebGL wrapper. It provides the core mathematics, geometry, material processing, and lighting engines required for the immersive library. |
| **3D Framework** | **React Three Fiber** | A React renderer for Three.js. It allows us to build complex 3D scenes declaratively using React components, seamlessly integrating 3D state with our 2D UI state. |
| **3D Helpers** | **@react-three/drei** | A growing ecosystem of useful helpers for R3F. We utilize Drei for `PointerLockControls`, 3D `Text`, and environment helpers. |
| **Styling** | **Vanilla CSS3** | We opted for highly optimized, custom Vanilla CSS rather than utility frameworks (like Tailwind) to maintain absolute pixel-perfect control over our complex glassmorphism effects, CSS Grid layouts, and micro-animations. |
| **Icons** | **Lucide React** | Clean, consistent, and beautiful SVG icons that perfectly match the premium aesthetic of the library. |
| **Data Source** | **GitHub REST API v3** | Provides real-time, live data for repositories, users, and search queries. |

---

## 🏗️ Architecture & Design

The application is heavily modular, splitting responsibilities strictly between data fetching, 2D UI rendering, and 3D Canvas rendering.

### Component Structure
The project is organized in the `src/` directory as follows:

* `src/main.tsx` - The application entry point. Bootstraps React and mounts the root application.
* `src/App.tsx` - The primary layout wrapper. Manages routing logic, global state, the search bar, and the transition between the 2D homepage and the 3D Library space.
* `src/Library3D.tsx` - **The Core 3D Engine.** This file contains the entire R3F `<Canvas>`, lighting logic, the procedural `Architecture` generator, the `Bookcase` renderer, and the `Walker` component for navigation.
* `src/data.ts` - Data orchestration. Handles all types (`Repo`, `Author`), mock seed data for initial loads, and the crucial `githubToRepo` mapping function which normalizes raw GitHub API responses into our unified application state.
* `src/styles.css` - The global design system. Contains CSS variables for the color palette, typography rules, glassmorphism utilities, and responsive media queries.

### Data Fetching Strategy
To handle GitHub's rate limits and provide a smooth infinite scroll experience:
1. **Initial Load:** The app seeds the view with trending repositories or cached data.
2. **Search:** When a user queries, a debounce mechanism prevents spamming the API.
3. **Infinite Pagination:** As the user walks down the 3D aisle (detected by the camera's Z-axis position in `Walker`), a callback triggers `loadMore()`.
4. **Looping Illusion:** Because the GitHub API limits search pagination to the first 1000 results (page 50), the `loadMore` function gracefully loops back using modular arithmetic, dynamically appending unique IDs to duplicate books, allowing the physical library architecture to extend *infinitely* without crashing or throwing 422 errors.

### 3D Rendering Pipeline
Performance in WebGL requires strict discipline:
* **Geometry Reuse:** The `Bookcase` and `Architecture` components reuse shared `boxGeometry` and `cylinderGeometry` instances, significantly reducing GPU memory footprint.
* **Material Optimization:** We utilize `meshStandardMaterial` with carefully tuned roughness and metalness values to react beautifully to lighting, without the extreme overhead of physical materials (`meshPhysicalMaterial`).
* **Frustum Culling:** React Three Fiber automatically culls objects outside the camera's view, allowing us to maintain high framerates even with thousands of "books" in memory.
* **Lighting:** A combination of a single `hemisphereLight` for ambient library warmth and localized `pointLight` instances positioned strictly near the visible architecture.

---

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

Before you begin, ensure you have the following installed on your local machine:
* **Node.js** (v16.x or newer recommended)
* **npm** (v7.x or newer) or **yarn** or **pnpm**
* A modern web browser with WebGL enabled (Chrome, Firefox, Edge, Safari).

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/YAGNADEEPSINH-4741/gitlibrary.git
   ```

2. **Navigate to the project directory:**
   ```sh
   cd gitlibrary
   ```

3. **Install the dependencies:**
   This project relies on several key packages (`three`, `@react-three/fiber`, etc.). Install them using npm:
   ```sh
   npm install
   ```

### Development

To start the local development server with Hot Module Replacement (HMR):

```sh
npm run dev
```

Your terminal will output a local URL (usually `http://localhost:5173`). Open this URL in your browser to view the application. Any changes you make to the source code will instantly update in the browser.

### Production Build

When you are ready to deploy the application, you need to create an optimized, minified production build:

```sh
npm run build
```

Vite will compile the TypeScript, bundle the JavaScript and CSS, and output static files into the `dist/` directory.

To preview the production build locally:
```sh
npm run preview
```

The contents of the `dist/` folder can be hosted on any static web host, such as GitHub Pages, Vercel, Netlify, or AWS S3.

---

## 📱 Mobile Support & 3D Controls

Navigating a 3D space on the web has traditionally been difficult on mobile devices. The Library of Code features a **fully bespoke Mobile Support System** designed from the ground up.

### Desktop Controls (Mouse & Keyboard)
* **Look:** Pointer Lock Controls. Click the screen to lock your mouse, then simply move the mouse to look around in 360 degrees. Press `ESC` to unlock.
* **Move:** Standard FPS controls. Use `W`, `A`, `S`, `D` or the `Arrow Keys` to walk down the aisles.

### Mobile Controls (Touch Screens)
The application automatically detects if you are using a device with touch capabilities (`ontouchstart` or `maxTouchPoints > 0`). When detected, the UI adapts instantly:
* **Touch-to-Look:** Pointer Lock is safely bypassed. Instead, you can swipe anywhere on the screen to rotate the camera smoothly via a custom Euler rotation algorithm.
* **Virtual D-Pad:** A gorgeous, glassmorphic directional pad appears at the bottom of the screen. Press and hold the on-screen arrows to walk forward, backward, left, or right.

This ensures that the immersive 3D experience is not compromised, regardless of the device you are using.

---

## ⚡ Performance Optimization

Building a 3D world in the browser demands strict performance constraints. We've implemented several advanced techniques to ensure the library runs at a buttery-smooth 60fps even on lower-end devices:

1. **Instanced Rendering (Future Roadmap):** Currently, books are rendered as individual meshes. In the future, utilizing `THREE.InstancedMesh` will allow us to draw tens of thousands of books in a single draw call.
2. **Texture Atlasing:** Instead of loading high-res textures for every book cover, we utilize procedural colors and R3F's `<Text>` component (which uses signed distance fields) to render crisp, performant typography without texture bloat.
3. **Shadow Map Tuning:** Shadows are computationally expensive. We limit cast shadows exclusively to the book meshes and the shelf lips, keeping the shadow map resolution optimized.
4. **React Memoization:** Critical UI components like the Aisle generator use `useMemo` to prevent unnecessary React re-renders when the camera position updates every frame.

---

## 🗺️ Roadmap

The Library of Code is an evolving, living project. Here is what is planned for future releases:

- [ ] **Instanced Rendering:** Refactor `Bookcase` to use `InstancedMesh` for rendering up to 100,000 books simultaneously without frame drops.
- [ ] **Authentication:** Allow users to log in via GitHub OAuth to view their own private repositories in a specialized "Private Study" 3D room.
- [ ] **Advanced Filtering:** Add 3D UI panels to filter books by language, license, and creation date dynamically without leaving the 3D canvas.
- [ ] **Book Contents:** Instead of just a summary overlay, allow users to literally "open" the 3D book and read the README.md file mapped onto the pages of the 3D mesh.
- [ ] **Multiplayer:** Implement WebSockets to allow multiple users to wander the library together, seeing each other as avatars.

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this project better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. **Fork the Project** (Click the Fork button at the top right of this page)
2. **Create your Feature Branch:**
   ```sh
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your Changes:**
   ```sh
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the Branch:**
   ```sh
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request** against the `main` branch.

### Code Style
Please ensure your code passes the TypeScript compiler and adheres to the existing formatting conventions. We recommend using an editor like VSCode with standard Prettier/ESLint configurations.

---

## 📜 License

This project is licensed under the MIT License. You are free to use, modify, and distribute this software, as long as the original copyright and license notice are included. 

See the `LICENSE` file in the root directory for more detailed information.

---

## 📬 Contact & Acknowledgements

**Project Maintainer:**
- GitHub: [@YAGNADEEPSINH-4741](https://github.com/YAGNADEEPSINH-4741)

**Acknowledgements:**
Special thanks to the open-source creators who made the tools that power this application:
- The [Three.js](https://threejs.org/) community for pushing the boundaries of WebGL.
- The [Poimandres](https://pmnd.rs/) collective for `react-three-fiber` and their tireless work on the React 3D ecosystem.
- The developers at [GitHub](https://github.com) for providing a robust, free-to-use public API.

---

<div align="center">
  <p><strong>The Library of Code</strong> - Where knowledge becomes a place.</p>
  <br>
  <img src="https://img.icons8.com/color/48/000000/books.png" alt="Books">
</div>
