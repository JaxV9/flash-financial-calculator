# Flash Financial Calculator

**Flash Financial Calculator** is a fast, frictionless web application providing instant financial simulations tailored to the French market—no sign-up or multi-step forms required.

## Core Features

- **Gross-to-Net Salary Converter:** Instant monthly and annual breakdowns factoring in employee status (_cadre_ vs. _non-cadre_), employer cost, and income tax withholding (_prélèvement à la source_).
- **Mortgage & Borrowing Capacity Calculator:** Real-time estimation of maximum monthly payments, borrowing power (within the 35% debt-to-income cap), and total loan cost based on duration and interest rates.
- **Zero-Tunnel Reactive UX:** Results update live as sliders and inputs change, paired with a recent simulation history.

## Technical Stack & Architecture

Built as a full-stack TypeScript monorepo focusing on clean architecture and **Test-Driven Development (TDD)**:

- **Backend (`/backend`):** Node.js, TypeScript, Express, Zod validation, and Vitest/Supertest for unit and integration testing.
- **Frontend (`/frontend`):** Modern Angular (Standalone components, Signals, and RxJS) for reactive state management and debounced API communication.
