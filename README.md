# 🚀 SnapLink — Modern Full-Stack URL Shortener & Analytics Platform

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.0-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Java](https://img.shields.io/badge/Java-23-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Three.js](https://img.shields.io/badge/Three.js-3D_Visuals-black?style=for-the-badge&logo=threedotjs&logoColor=white)](https://threejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

A high-performance, modern URL shortening and analytics platform built with **Spring Boot 3.4 (Java 23)** and **React 18 (Vite)**. Features interactive **Three.js 3D animations**, real-time **click tracking**, **dynamic QR code generation**, **JWT-based authentication**, and an intuitive dark/light mode dashboard.

---

## 📑 Table of Contents

- [Features](#-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Database Setup](#1-database-setup)
  - [Backend Setup](#2-backend-setup)
  - [Frontend Setup](#3-frontend-setup)
- [Docker Deployment](#-docker-deployment)
- [Environment Variables](#-environment-variables)
- [Screenshots & UI Highlights](#-screenshots--ui-highlights)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🔗 URL Shortening & Redirection
- **High-Speed Redirection:** Instant 302 HTTP redirection using unique 8-character alphanumeric slugs.
- **Link Management:** Create, list, copy, inspect, and share shortened URLs seamlessly.
- **QR Code Generator:** Built-in dynamic SVG/Canvas QR code generation for every link with instant download capability.

### 📊 Analytics & Insights
- **Click Event Tracking:** Tracks every redirect event with precise timestamps.
- **Visual Analytics:** Interactive time-series charts (via **Recharts** and **Chart.js**) displaying link performance across custom date ranges.
- **Total Click Metrics:** Aggregate total clicks across all user links over time.

### 🛡️ Security & Authentication
- **Stateless Authentication:** Secure JWT (JSON Web Token) implementation using `jjwt-api 0.12.6`.
- **Role-Based Access Control (RBAC):** Method-level security annotations (`@PreAuthorize`) for user endpoints.
- **Password Security:** Salted BCrypt password hashing.
- **CORS Configured:** Preconfigured for local development and scalable production origins.

### 🎨 Next-Gen UI/UX
- **Interactive 3D Visuals:** Interactive Three.js globe and particle hero background canvases.
- **Fluid Micro-Animations:** Powered by Anime.js and Framer Motion.
- **Theme Support:** Fully integrated Dark and Light mode toggling with persistent state.
- **Responsive Design:** Mobile-first, responsive interface built with Tailwind CSS.

---

## 🏛️ System Architecture

```mermaid
flowchart TD
    subgraph Client ["Client (React + Vite)"]
        UI[React UI / Three.js Canvas]
        Router[React Router v7 / Subdomains]
        AuthContext[Context API / JWT Storage]
        Charts[Recharts & Chart.js Analytics]
    end

    subgraph Backend ["Backend (Spring Boot 3.4 / Java 23)"]
        Security[Spring Security + JWT Filter]
        AuthController[AuthController (/api/auth)]
        UrlController[UrlMappingController (/api/urls)]
        RedirectController[RedirectController (/{shortUrl})]
        UrlService[UrlMappingService]
        UserService[UserService]
    end

    subgraph Database ["Persistence Layer"]
        MySQL[(MySQL Database)]
        UsersTable[(Users Table)]
        UrlsTable[(UrlMapping Table)]
        ClicksTable[(ClickEvents Table)]
    end

    UI -->|REST API / Axios| Security
    Security --> AuthController
    Security --> UrlController
    Router -->|Public Redirect| RedirectController
    RedirectController --> UrlService
    AuthController --> UserService
    UrlController --> UrlService
    UserService --> UsersTable
    UrlService --> UrlsTable
    UrlService --> ClicksTable
```

---

## 🛠️ Tech Stack

### Backend
| Technology | Description |
| :--- | :--- |
| **Java 23** | Modern Java LTS runtime environment |
| **Spring Boot 3.4.0** | Core backend framework |
| **Spring Data JPA / Hibernate** | Object-Relational Mapping & persistence |
| **Spring Security 6** | Authentication, authorization & endpoint security |
| **JJWT (0.12.6)** | Token creation, signing, parsing, and validation |
| **MySQL Connector/J** | Relational database driver |
| **Lombok** | Boilerplate code reduction |

### Frontend
| Technology | Description |
| :--- | :--- |
| **React 18.3** | Component-based UI library |
| **Vite 6.0** | Next-generation frontend build tooling |
| **Tailwind CSS 3.4** | Utility-first styling framework |
| **Three.js** | 3D background canvases and interactive globe |
| **Anime.js & Motion** | High-performance interface animations |
| **Recharts & Chart.js** | Interactive analytics data visualization |
| **qrcode.react** | Dynamic QR code generator |
| **React Hot Toast** | Notification and alert management |

---

## 📂 Project Structure

```
URL-Shortner/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/url/shortener/
│   │   │   │   ├── controller/      # REST API Controllers (Auth, URL, Redirect)
│   │   │   │   ├── dtos/            # Data Transfer Objects (Requests/Responses)
│   │   │   │   ├── models/          # JPA Entities (User, UrlMapping, ClickEvent)
│   │   │   │   ├── repository/      # Spring Data JPA Repositories
│   │   │   │   ├── security/        # WebSecurityConfig, JWT Filters, CORS
│   │   │   │   ├── service/         # Business logic & UserDetails services
│   │   │   │   └── UrlShortenerSbApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties # DB & JWT application config
│   │   └── test/                    # Unit and integration test suites
│   ├── Dockerfile                   # Multi-stage JDK 23 container build
│   ├── pom.xml                      # Maven project dependencies
│   └── mvnw / mvnw.cmd              # Maven wrapper scripts
├── frontend/
│   ├── public/                      # Static assets & favicons
│   ├── src/
│   │   ├── api/                     # Axios instance configured with backend URL
│   │   ├── components/
│   │   │   ├── 3d/                  # Three.js 3D Canvases & Globe visualizer
│   │   │   ├── anime/               # Anime.js visualizers & pipeline flows
│   │   │   ├── Dashboard/           # Dashboard layout, charts, URL list, forms
│   │   │   ├── ui/                  # Reusable UI primitives (Buttons, Modals, Inputs)
│   │   │   ├── LandingPage.jsx      # Marketing hero & interactive preview
│   │   │   ├── AboutPage.jsx        # Project overview & architecture page
│   │   │   ├── LoginPage.jsx        # Login page with animated background
│   │   │   └── RegisterPage.jsx     # Registration page
│   │   ├── contextApi/              # Global Context Provider (Auth + Theme)
│   │   ├── AppRouter.jsx            # Application route definitions
│   │   ├── index.css                # Custom CSS design system & Tailwind layers
│   │   └── main.jsx                 # React root entry point
│   ├── package.json                 # Frontend dependencies and npm scripts
│   ├── tailwind.config.js           # Tailwind design tokens & themes
│   └── vite.config.js               # Vite bundler configuration
└── README.md                        # Master documentation
```

---

## 📡 API Reference

### 🔐 Authentication (`/api/auth`)

| Method | Endpoint | Access | Description | Request Body / Params |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/public/register` | Public | Register new account | `{ "username": "...", "email": "...", "password": "..." }` |
| `POST` | `/api/auth/public/login` | Public | Authenticate user & get JWT | `{ "username": "...", "password": "..." }` |

### 🔗 URL Management & Analytics (`/api/urls`)

> **Note:** Protected endpoints require header: `Authorization: Bearer <JWT_TOKEN>`

| Method | Endpoint | Access | Description | Request Body / Params |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/urls/shorten` | User | Create a short URL | `{ "originalUrl": "https://example.com" }` |
| `GET` | `/api/urls/myurls` | User | Retrieve all URLs created by the user | *None* |
| `GET` | `/api/urls/analytics/{shortUrl}` | User | Get click analytics for a specific short link | `?startDate=YYYY-MM-DDTHH:MM:SS&endDate=YYYY-MM-DDTHH:MM:SS` |
| `GET` | `/api/urls/totalClicks` | User | Get total aggregate clicks grouped by date | `?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD` |

### ⚡ Redirection (`/`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/{shortUrl}` | Public | Resolves `shortUrl`, records click event, returns `302 Found` redirect |

---

## 🚀 Getting Started

### Prerequisites

- **Java JDK**: 23 (or compatible Java 21+)
- **Node.js**: v18.0.0 or higher
- **npm** or **yarn**
- **MySQL Server**: 8.0+
- **Git**

---

### 1. Database Setup

Create a MySQL database named `url_shortener`:

```sql
CREATE DATABASE url_shortener;
```

---

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Configure database credentials and JWT secret in [backend/src/main/resources/application.properties](file:///c:/Users/SATWIK/OneDrive/Desktop/URL-Shortner/backend/src/main/resources/application.properties):
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/url_shortener
   spring.datasource.username=YOUR_MYSQL_USERNAME
   spring.datasource.password=YOUR_MYSQL_PASSWORD

   jwt.secret=3844ecd5ed6ac732a712b52f7b5a5b096615ae879088cf1ad8ef987e1a897da1
   jwt.expiration=172800000
   frontend.url=http://localhost:5173
   ```

3. Run the Spring Boot backend using Maven:
   ```bash
   # Windows
   mvnw.cmd spring-boot:run

   # Linux / macOS
   ./mvnw spring-boot:run
   ```
   *The backend API will start on `http://localhost:8080`.*

---

### 3. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Verify or edit the `.env` configuration in [frontend/.env](file:///c:/Users/SATWIK/OneDrive/Desktop/URL-Shortner/frontend/.env):
   ```env
   VITE_BACKEND_URL=http://localhost:8080
   VITE_REACT_FRONT_END_URL=http://localhost:5173
   VITE_REACT_SUBDOMAIN=http://url.localhost:5173
   ```

4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The web application will be accessible at `http://localhost:5173`.*

---

## 🐳 Docker Deployment

The project includes a multi-stage Docker build for containerizing the Spring Boot backend with Java 23:

```bash
# Build Docker image
cd backend
docker build -t url-shortener-backend .

# Run Docker container
docker run -p 8080:8080 \
  -e SPRING_DATASOURCE_URL=jdbc:mysql://host.docker.internal:3306/url_shortener \
  -e SPRING_DATASOURCE_USERNAME=root \
  -e SPRING_DATASOURCE_PASSWORD=YourPassword \
  url-shortener-backend
```

---

## ⚙️ Environment Variables

### Backend (`application.properties`)
| Property | Default Value | Description |
| :--- | :--- | :--- |
| `spring.datasource.url` | `jdbc:mysql://localhost:3306/url_shortener` | JDBC Database Connection URL |
| `spring.datasource.username` | `root` | Database username |
| `spring.datasource.password` | `NewPassword123!` | Database password |
| `jwt.secret` | *(256-bit Hex Key)* | Secret key for signing and validating JWTs |
| `jwt.expiration` | `172800000` *(48 hours)* | JWT expiration duration in milliseconds |
| `frontend.url` | `http://localhost:5173` | Allowed CORS origin for the frontend client |

### Frontend (`.env`)
| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `VITE_BACKEND_URL` | `http://localhost:8080` | Backend API base URL |
| `VITE_REACT_FRONT_END_URL` | `http://localhost:5173` | Frontend app root URL |
| `VITE_REACT_SUBDOMAIN` | `http://url.localhost:5173` | Subdomain route configuration |

---

## 🖥️ Key Workflows

1. **Shorten URL:** Enter any long target URL from the landing page or dashboard to generate an 8-character short link.
2. **Access Redirection:** Navigating to `http://localhost:8080/{shortUrl}` or `http://localhost:5173/s/{shortUrl}` records a `ClickEvent` entry and redirects immediately to the original URL.
3. **Analyze Trends:** View click count evolution over time through interactive line/bar charts with customized date filtering.
4. **QR Codes:** Download high-resolution QR codes to share links across print and digital media.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
