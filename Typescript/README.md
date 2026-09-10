# TypeScript

> Moving from dynamically-typed JavaScript to statically-typed TypeScript to build scalable and robust applications.

This directory contains a series of incremental tasks I completed to master TypeScript. It starts from basic type definitions and scales up to advanced architectural patterns such as ambient declarations for external libraries and nominal typing to prevent structural type collisions.

## Core Concepts Demonstrated

- **Static Types:** Defining primitives, arrays, and tuples to enforce type safety.
- **Interfaces & Classes:** Creating complex object blueprints with `readonly` properties, optional parameters, index signatures, and class implementations.
- **The DOM:** Interacting with browser DOM elements safely using TypeScript's built-in DOM types.
- **Generics:** Building reusable, type-flexible functions and data structures.
- **Namespaces & Merging:** Organizing code logically and extending existing namespaces across multiple files using declaration merging.
- **Ambient Namespaces:** Writing `.d.ts` declaration files to provide strict types for untyped third-party JavaScript libraries.
- **Nominal Typing:** Implementing the "branding" pattern to differentiate between two structurally identical interfaces (e.g., distinguishing Major Credits from Minor Credits).

## Project Requirements

- **Environment:** Tested and transpiled on Ubuntu 18.04.
- **Extensions:** All TypeScript source files utilize the `.ts` extension.
- **Strict Compilation:** The TypeScript compiler (`tsc`) must compile the code without throwing a single warning or error.
- **Testing:** Scripts are designed to be checked with Jest (version 24.9.*).

## Setup and Execution

Each task is isolated in its own directory with its respective configuration files (`package.json`, `tsconfig.json`, `webpack.config.js`). 

To run a specific task:

```bash
cd task_x
npm install       # Install the necessary dependencies (Webpack, TS Loader, etc.)
npm run build     # Transpile the TypeScript code into JavaScript
npm run start-dev # Spin up the Webpack development server
```
*(Note: `task_4` intentionally omits Webpack to demonstrate raw `tsc` compilation using `npm run build`)*

## Task Breakdown

| Directory | Task | Implementation Details |
| :--- | :--- | :--- |
| **`task_0`** | Creating an interface for a student | Defines a `Student` interface and renders an array of students dynamically into an HTML table using vanilla DOM manipulation. |
| **`task_1`** | Let's build a Teacher interface | Implements a `Teacher` interface demonstrating `readonly` attributes, optional fields, and an index signature for dynamic properties. |
| **`task_1`** | Extending the Teacher class | Uses interface inheritance to create a `Directors` interface that builds upon `Teacher`. |
| **`task_1`** | Printing teachers | Defines a function interface `printTeacherFunction` and implements it with string literal formatting. |
| **`task_1`** | Writing a class | Constructs a `StudentClass` dictated by a specific interface, along with a strictly typed constructor interface. |
| **`task_2`** | Advanced types Part 1 | Creates distinct `Director` and `Teacher` classes, and implements a factory function returning a Union type. |
| **`task_2`** | Creating functions specific to employees | Explores **Type Predicates** (`employee is Director`) to safely narrow union types within execution flows. |
| **`task_2`** | String literal types | Restricts variable assignment using exact string literal types (`Subjects = 'Math' \| 'History'`). |
| **`task_3`** | Ambient namespaces | Bridges the gap between TS and JS by writing an ambient declaration file (`crud.d.ts`) for an external `crud.js` mock database. |
| **`task_4`** | Namespace & declaration merging | Distributes a `Subjects` namespace across 4 different files, merging new properties into a shared interface seamlessly. |
| **`task_5`** | Brand convention & nominal typing | Uses a dummy `_brand: void` property to force TypeScript to use nominal typing, explicitly preventing the cross-assignment of structurally identical interfaces. |

## Author
Dominion Yusuf
