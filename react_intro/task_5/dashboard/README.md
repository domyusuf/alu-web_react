# React Webpack Boilerplate

This project represents the culmination of the React Introduction module, demonstrating my ability to build a fully functional, production-ready React environment entirely from scratch—bypassing automated tools like `create-react-app`.

## Project Overview

By manually configuring Webpack, Babel, and Jest, I've gained a deep understanding of the underlying mechanisms that power modern JavaScript frameworks. This dashboard application contains a modular, component-driven UI architecture complete with automated testing and hot-reloading capabilities.

## Architecture & Tooling

- **React:** Component rendering and UI layout architecture.
- **Webpack:** Asset bundling, CSS extraction, module resolution, and hot-module replacement (HMR) via `webpack-dev-server`.
- **Babel:** Transpiling JSX syntax and modern ECMAScript into cross-browser compatible JavaScript utilizing `@babel/preset-react` and `@babel/preset-env`.
- **Jest & Enzyme:** A standalone configuration for shallow testing React components and dynamically mocking CSS and image assets inside a simulated JSDOM environment.

## Execution

- Run `npm start` to spin up the local Webpack development server with hot reloading enabled.
- Run `npm run build` to compile an optimized, minified production build into the `dist/` directory.
- Run `npm test` to execute the full Jest and Enzyme test suites across the application's domain logic.
