# Dragon Ball Tournament API

## 📌 Index
1. [Project Overview](#📌-project-overview)
2. [Tech Stack](#🛠-tech-stack)
3. [Installation & Setup](#🚀-installation--setup)
4. [Available Scripts](#📜-available-scripts)
5. [Project Structure](#📌-project-structure)
6. [Code Quality & Best Practices](#✅-code-quality--best-practices)

---

## 📌 Project Overview
Dragon Ball Tournament API is a backend application built with **NestJS** and **TypeScript**, designed to manage martial arts tournaments. This API provides functionalities for user authentication, tournament creation, match handling, and real-time notifications.

## 🛠 Tech Stack
- **NestJS** (Progressive Node.js framework)
- **TypeScript** (Strongly typed JavaScript)
- **Prisma** (ORM for database management)
- **PostgreSQL** (Primary database)
- **ESLint & Prettier** (Code linting and formatting)
- **Commitlint & Husky** (Enforce commit standards)
- **Jest** (Unit and integration testing)
- **Docker** (Containerization for database setup)

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v18 or later)
- **npm**
- **PostgreSQL** (Ensure you have a running database instance)
- **Docker** (Optional, for database setup)

### Clone Repository
```sh
git clone https://github.com/your-repo/dragonball-tournament-api.git
cd dragonball-tournament-api
```

### Install Dependencies
```sh
npm install
```

### Configure Environment Variables
Create a `.env` file and update it with your database configuration.

### Database Setup (Prisma & PostgreSQL)
```sh
npx prisma migrate dev --name init
```

### Start Development Server
```sh
npm run start:dev
```

### Running PostgreSQL with Docker
```sh
docker-compose up -d
```

---

## 📜 Available Scripts

### Development
```sh
npm run start:dev    # Run in watch mode
npm run start        # Run normally
npm run build        # Build the project
```

### Lint & Format
```sh
npm run lint         # Run ESLint
npm run format       # Run Prettier
```

### Testing
```sh
npm run test         # Run unit tests
npm run test:e2e     # Run end-to-end tests
npm run test:cov     # Generate coverage report
```

### Git Hooks & Commit Linting
```sh
npm run prepare      # Set up Husky hooks
npm run commit       # Use commitizen for standardized commits
```

---

## 📌 Project Structure
```
.
├── README.md
├── commitlint.config.ts
├── db
├── dist
├── docker-compose.yml
├── docs
├── eslint.config.mjs
├── nest-cli.json
├── node_modules
├── package-lock.json
├── package.json
├── prisma
├── src
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── test
├── tsconfig.build.json
└── tsconfig.json
```

---

## ✅ Code Quality & Best Practices
- **Modular Architecture**: Each feature is separated into modules.
- **DTO Validation**: Using `class-validator` for request validation.
- **Error Handling**: Centralized exception filters.
- **Dependency Injection**: Core principle of NestJS.
- **Testing**: Includes unit and integration tests.

---

