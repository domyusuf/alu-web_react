# React Intro

> Introduction to the React Framework

This module introduces the fundamentals of building single-page applications using React. It covers everything from using automated scaffolding tools like `create-react-app` to manually configuring an entire React ecosystem from scratch using Webpack, Babel, and Jest.

## Module Objectives

Through this project, I learned how to:
- Quickly scaffold a React application using `create-react-app`.
- Write clean and semantic JSX, building modular UI components.
- Utilize React inline styling alongside traditional CSS files.
- Inject static assets and use dynamic data rendering via utility functions.
- Deploy a React application live to GitHub Pages.
- Entirely bypass `create-react-app` by manually wiring Webpack, Babel, and testing suites together.
- Configure standalone Jest and Enzyme environments to execute shallow component tests.

## Task Overview

- **`task_0`**: Initializes the React app using `create-react-app`, implements a simple layout (Header, Body, Footer) using JSX, and imports static assets like the Holberton logo and custom favicons.
- **`task_1`**: Introduces modular component architecture by adding utility functions (`getFullYear`, `getFooterCopy`) and creating a standalone `Notifications` component.
- **`task_2`**: Expands the UI by adding interactive form elements (inputs and labels mapped via `htmlFor`), inline styling objects in JSX, and injecting raw HTML securely using `dangerouslySetInnerHTML`.
- **`task_3`**: Focuses strictly on testing and deployment. Utilizes Jest and Enzyme's `shallow` rendering to build out robust unit tests for all components and utilities. Deploys the application directly to GitHub Pages via the `gh-pages` branch.
- **`task_4`**: Placeholder step for curriculum progression tracking.
- **`task_5`**: The ultimate culmination of the module. Completely rebuilds the React ecosystem manually from scratch without `create-react-app`. Configures Webpack (asset bundling, CSS extraction, HMR), Babel (JSX transpilation), and Jest/Enzyme (unit testing with asset mocking) to mirror a professional, production-grade setup.
