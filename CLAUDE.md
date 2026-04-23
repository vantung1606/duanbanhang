# Project: DUANMOI (DIY & Frontend)

This is a full-stack project consisting of a Spring Boot backend (`DIY`) and a React/Vite frontend (`frontend`).

## Project Structure
- `DIY/`: Backend (Java 17+, Maven, Spring Boot, Spring Security, JPA/PostgreSQL).
- `frontend/`: Frontend (React, Vite, JavaScript/TypeScript, Tailwind CSS).

## Tech Stack
- **Backend:** Spring Boot, Spring Data JPA, Spring Security (JWT), Maven, PostgreSQL.
- **Frontend:** React 18+, Vite, Axios, Tailwind CSS.

## Build & Run Commands
### Backend (`DIY`)
- Build: `./mvnw clean install`
- Run: `./mvnw spring-boot:run`
- Test: `./mvnw test`

### Frontend (`frontend`)
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`

## AI Guidelines & Rules
This project uses the **Everything Claude Code** rule system. 
Please refer to the following directories for specific guidelines:
- `.claude/rules/common/`: General coding and workflow standards.
- `.claude/rules/java/`: Java and Spring Boot specific patterns.
- `.claude/rules/typescript/`: React and TypeScript/JavaScript standards.
- `.agent/skills/`: Cross-cutting skills (API design, security).
- `DIY/.agent/skills/`: Backend-specific skills (Spring Boot, JPA, MySQL).
- `frontend/.agent/skills/`: Frontend-specific skills (React, Vite, CSS).

### Core Principles
- **TDD Preferred:** Write tests before or alongside implementation.
- **Clean Architecture:** Keep business logic separated from presentation/infrastructure layers.
- **Security First:** Ensure all APIs are protected and validated.
- **Standardized Commits:** Use conventional commits (feat, fix, refactor, chore).
