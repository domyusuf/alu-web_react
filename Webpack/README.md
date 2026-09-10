# Webpack

> Bundling assets, managing dependencies, and optimizing load times for modern web applications.

This directory focuses on mastering Webpack. Starting from zero-configuration builds and scaling up to advanced multi-entrypoint configurations with automated asset management, local development servers, and chunk optimization.

## Core Concepts Demonstrated

- **Entry Points & Outputs:** Configuring Webpack to compile single and multiple `.js` entry points into bundled output directories.
- **Loaders:** Integrating `style-loader`, `css-loader`, `file-loader`, and `image-webpack-loader` to process stylesheets and optimize heavy image assets into the JavaScript dependency graph.
- **Plugins:** Utilizing `HtmlWebpackPlugin` to auto-generate HTML files with dynamic script tags and `CleanWebpackPlugin` to ensure fresh, artifact-free builds.
- **Development Environment:** Setting up `webpack-dev-server` with hot-reloading on custom ports for a rapid development workflow.
- **Optimization:** Implementing `splitChunks` to separate massive vendor libraries (like Lodash and jQuery) from core application code to drastically reduce initial load sizes.
- **Source Mapping:** Configuring `inline-source-map` for readable debugging in browser developer tools.

## Project Requirements

- **Environment:** Tested and executed on Ubuntu 18.04.
- **Node Version:** 12.x.x
- **No Global Installation:** All webpack instances are installed locally and executed via `npm run`.

## Setup and Execution

Each task is isolated in its own directory. To run a specific task:

```bash
cd task_x
npm install       # Install Webpack, loaders, and plugins
npm run build     # Transpile and bundle assets for production
```

*(For `task_3`, run `npm run start-dev` to spin up the local development server).*

## Task Breakdown

| Directory | Task | Implementation Details |
| :--- | :--- | :--- |
| **`task_0`** | Basic Installation | Installs Webpack and builds a basic jQuery DOM-manipulation script relying solely on Webpack's zero-config default behaviors. |
| **`task_1`** | Installing Packages | Introduces `webpack.config.js`. Configures `production` mode and points Webpack to output a unified `bundle.js` into a `public` directory. |
| **`task_2`** | Asset Management | Integrates CSS and Image loaders. Inlines stylesheets and compresses background images seamlessly while suppressing max-size warnings. |
| **`task_3`** | Development & Optimization | Implements a modular architecture (Header, Body, Footer). Configures multiple entry points, automated HTML generation, inline source maps, and splits third-party vendor code into separate chunks. |

## Author
Dominion Yusuf
