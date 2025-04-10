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


## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v18 or later)
- **npm**
- **Docker** (for running the application and PostgreSQL in containers)
- **Docker Compose** (to manage multi-container setups)

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

1. Create a `.env` file in the root directory of your project.
2. Add the following environment variables for database configuration in the `.env` file:

```env
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
POSTGRES_DB=your_db_name
```

Ensure to replace `your_db_user`, `your_db_password`, and `your_db_name` with appropriate values.

### Start Database & Application with Docker

To start both the PostgreSQL database and the application in containers using Docker Compose:

```sh
docker-compose up -d
```

This will pull the necessary Docker images and run both the database and the app.

### Database Setup (Prisma & PostgreSQL)

Once your Docker containers are up and running, apply the Prisma migrations to set up your database schema:

```sh
docker-compose exec app npx prisma migrate dev --name init
```

This command runs Prisma's migration process inside the `app` container, ensuring your database is properly set up.
After applying the migrations, run the Prisma seed script to populate your database with initial data:

```sh
docker-compose exec app npm run prisma:seed
```
This will execute the seed script (prisma:seed), which will insert any predefined data into your database (such as default values for tables).

### Start Development Server

Your app should now be running on `http://localhost:3000`. To start the server in development mode, run the following command:

```sh
docker-compose up -d
```

This will start the containers in the background and your app will be available at `http://localhost:3000`.

### Running PostgreSQL with Docker

If you only need to start the PostgreSQL service (without the app), you can run:

```sh
docker-compose up -d db
```
This will start only the PostgreSQL database container.

---

## 📜 Available Scripts

### Development

```sh
npm run start:dev    # Run in watch mode
npm run start        # Run normally
npm run start:debug  # Run in debug mode
npm run start:prod   # Run in production mode
npm run build        # Build the project
```

### Lint & Format

```sh
npm run lint         # Run ESLint with automatic fixing
npm run format       # Run Prettier to format the code
```

### Testing

```sh
npm run test         # Run unit tests
npm run test:watch   # Run unit tests in watch mode
npm run test:cov     # Generate coverage report
npm run test:debug   # Run unit tests in debug mode
npm run test:e2e     # Run end-to-end tests
```

### Git Hooks & Commit Linting

```sh
npm run prepare      # Set up Husky hooks
npm run commit       # Use Commitizen for standardized commits
npm run commitlint   # Run commitlint to validate commit messages
```

### Prisma

```sh
npm run prisma:seed  # Seed the database with initial data
npm run prisma:studio # Open Prisma Studio for managing the database
```

### Miscellaneous

```sh
npm run check:skips  # Check for any skipped tests (it.skip, describe.skip, test.skip)
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

