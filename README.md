<div align="center">

  <!-- Project Logo / Title -->
  <a href="https://github.com/satwik12dev/URL-Shortner">
    <img src="https://img.shields.io/badge/🔗_URL_Shortener-Link_Management_Reimagined-6366f1?style=for-the-badge&logoColor=white" alt="SnapLink Banner" width="450" />
  </a>

  <h1 align="center" style="font-weight: 800; font-size: 2.5rem; margin-top: 15px;">
    ⚡ SnapLink
  </h1>

  <p align="center">
    <b>A Next-Gen, High-Performance URL Shortener & Real-Time Analytics Suite</b>
  </p>

  <p align="center">
    Powered by <b>Spring Boot 3.4 (Java 23)</b>, <b>React 18 + Vite</b>, <b>Three.js 3D Visuals</b>, and <b>JWT Security</b>.
  </p>

  <!-- Badges -->
  <p align="center">
    <a href="https://spring.io/projects/spring-boot"><img src="https://img.shields.io/badge/Spring%20Boot-3.4.0-6DB33F?style=flat-square&logo=springboot&logoColor=white" alt="Spring Boot" /></a>
    <a href="https://www.oracle.com/java/"><img src="https://img.shields.io/badge/Java-23-ED8B00?style=flat-square&logo=openjdk&logoColor=white" alt="Java 23" /></a>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" /></a>
    <a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" /></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind%20CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind" /></a>
    <a href="https://www.mysql.com/"><img src="https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql&logoColor=white" alt="MySQL" /></a>
    <a href="https://jwt.io/"><img src="https://img.shields.io/badge/JWT-Stateless%20Auth-000000?style=flat-square&logo=json-web-tokens&logoColor=white" alt="JWT" /></a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="License" /></a>
  </p>

  <p align="center">
    <a href="#-key-features"><b>Explore Features</b></a> •
    <a href="#-quick-start"><b>Quick Start</b></a> •
    <a href="#-api-endpoints"><b>API Docs</b></a> •
    <a href="#-system-architecture"><b>Architecture</b></a> •
    <a href="#-docker-support"><b>Docker</b></a>
  </p>

</div>

---

## 🌟 Highlights & Capabilities

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>🚀 Instant URL Shortening</h3>
      <ul>
        <li>Lightning-fast <b>302 HTTP redirection</b> engine.</li>
        <li>Generates collision-resistant 8-character unique alphanumeric tokens.</li>
        <li>Subdomain & root path URL routing support.</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3>📈 Deep Click Analytics</h3>
      <ul>
        <li>Real-time timestamped event tracking for every visit.</li>
        <li>Dynamic time-series charts using <b>Recharts</b> and <b>Chart.js</b>.</li>
        <li>Custom date range filters & aggregate account click trends.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>🎨 Futuristic 3D User Interface</h3>
      <ul>
        <li>Interactive <b>Three.js</b> particle hero and rotating 3D globe.</li>
        <li>Smooth micro-animations via <b>Anime.js</b> and <b>Framer Motion</b>.</li>
        <li>Built-in <b>Dark / Light theme</b> switcher with persistent local state.</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3>🛡️ Enterprise-Grade Security</h3>
      <ul>
        <li>Stateless <b>JWT (JSON Web Token)</b> authentication with 48h validity.</li>
        <li>Salted <b>BCrypt password encryption</b> and role authorization (RBAC).</li>
        <li>Configured CORS filter with granular preflight protection.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>📱 Dynamic QR Code Generator</h3>
      <ul>
        <li>Instant SVG/Canvas QR code creation for every shortened URL.</li>
        <li>One-click high-resolution download for marketing & print media.</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3>📦 Containerized & Cloud-Ready</h3>
      <ul>
        <li>Multi-stage <b>Docker</b> build pipeline on Eclipse Temurin JDK 23.</li>
        <li>Clean Controller-Service-Repository architecture with Spring Data JPA.</li>
      </ul>
    </td>
  </tr>
</table>

---

## 🏗️ System Architecture

```mermaid
graph TB
    subgraph Client ["Client Side (React 18 + Vite)"]
        UI["🎨 Glassmorphic UI (Tailwind + 3D Three.js)"]
        Router["🧭 React Router v7 (Protected & Public Routes)"]
        Context["🔑 Global Auth & Theme Context"]
        AnalyticsUI["📊 Recharts & Chart.js Data Visuals"]
    end

    subgraph Gateway ["Security & Filter Pipeline"]
        CORS["🌐 CORS Security Filter"]
        JWTFilter["🔒 JWT Authentication Filter"]
    end

    subgraph Backend ["Backend Engine (Spring Boot 3.4 / Java 23)"]
        AuthController["🚪 AuthController (/api/auth)"]
        UrlController["🔗 UrlMappingController (/api/urls)"]
        RedirectController["⚡ RedirectController (/{shortUrl})"]
        UserService["👤 UserService & UserDetailsImpl"]
        UrlService["⚙️ UrlMappingService"]
    end

    subgraph Database ["Persistence Layer (MySQL 8.0)"]
        UserTable[("👤 Users Table")]
        UrlTable[("🔗 UrlMappings Table")]
        ClickTable[("📊 ClickEvents Table")]
    end

    UI --> Router
    Router --> Context
    Router --> AnalyticsUI
    UI -->|REST Requests (Axios)| CORS
    CORS --> JWTFilter
    JWTFilter --> AuthController
    JWTFilter --> UrlController
    Router -->|302 Direct Access| RedirectController
    AuthController --> UserService
    UrlController --> UrlService
    RedirectController --> UrlService
    UserService --> UserTable
    UrlService --> UrlTable
    UrlService --> ClickTable
```

---

## 💻 Tech Stack Overview

<div align="center">

| Area | Technologies & Frameworks |
| :--- | :--- |
| **Backend Core** | `Java 23` • `Spring Boot 3.4.0` • `Spring Web` • `Lombok` • `Maven` |
| **Data & ORM** | `Spring Data JPA` • `Hibernate ORM` • `MySQL 8.0+` |
| **Security & Auth** | `Spring Security 6` • `JJWT (0.12.6)` • `BCrypt Password Encoder` |
| **Frontend Core** | `React 18.3` • `Vite 6.0` • `React Router DOM 7` • `Axios` |
| **Styling & Icons** | `Tailwind CSS 3.4` • `Material UI (MUI)` • `Lucide React` • `React Icons` |
| **3D & Animations** | `Three.js` • `Anime.js` • `Framer Motion` • `Canvas Confetti` |
| **Data Visualization** | `Recharts` • `Chart.js` • `React-Chartjs-2` |
| **Utilities** | `qrcode.react` • `react-hot-toast` • `react-copy-to-clipboard` • `dayjs` |
| **DevOps** | `Docker (Multi-Stage Build)` • `Eclipse Temurin JDK 23` |

</div>

---

## 📁 Repository Structure

```plaintext
URL-Shortner/
├── 📂 backend/                                # Spring Boot 3.4 Backend
│   ├── 📂 src/main/java/com/url/shortener/
│   │   ├── 📂 controller/                     # REST Controllers
│   │   │   ├── AuthController.java            # Login & Registration endpoints
│   │   │   ├── UrlMappingController.java      # URL creation, listing & analytics
│   │   │   └── RedirectController.java        # 302 Redirection handler
│   │   ├── 📂 dtos/                           # DTO models for request/response
│   │   ├── 📂 models/                         # JPA database entities (User, Url, Click)
│   │   ├── 📂 repository/                     # Spring Data JPA repositories
│   │   ├── 📂 security/                       # Security config & JWT filters
│   │   │   ├── 📂 jwt/                        # JwtUtils & JwtAuthFilter
│   │   │   ├── WebConfig.java                 # Web MVC configuration
│   │   │   └── WebSecurityConfig.java         # Security FilterChain & CORS
│   │   ├── 📂 service/                        # Core business logic services
│   │   └── UrlShortenerSbApplication.java     # Application entry point
│   ├── 📂 src/main/resources/
│   │   └── application.properties             # DB connection, JWT secret & ports
│   ├── Dockerfile                             # Containerized build file
│   └── pom.xml                                # Maven dependencies definition
│
├── 📂 frontend/                               # React 18 + Vite Frontend
│   ├── 📂 src/
│   │   ├── 📂 api/                            # Centralized Axios client
│   │   ├── 📂 components/
│   │   │   ├── 📂 3d/                         # Three.js 3D Canvases & Globe visualizer
│   │   │   ├── 📂 anime/                      # Anime.js visual pipelines & diagrams
│   │   │   ├── 📂 Dashboard/                  # Dashboard layout, charts & URL lists
│   │   │   ├── 📂 ui/                         # Buttons, Modals, Inputs & QR Modals
│   │   │   ├── LandingPage.jsx                # Modern Hero & live shortener preview
│   │   │   ├── AboutPage.jsx                  # Project architecture & timeline page
│   │   │   ├── LoginPage.jsx                  # Glassmorphic login portal
│   │   │   ├── RegisterPage.jsx               # Registration portal
│   │   │   └── NavBar.jsx / Footer.jsx        # Navigation & Footer components
│   │   ├── 📂 contextApi/                     # Context for Auth Token & Theme Mode
│   │   ├── AppRouter.jsx                      # App route configurations
│   │   ├── index.css                          # Tailwind CSS and theme design system
│   │   └── main.jsx                           # Application bootstrap
│   ├── .env                                   # Client environment configuration
│   ├── tailwind.config.js                     # Custom colors, fonts & animations
│   ├── vite.config.js                         # Vite build configuration
│   └── package.json                           # NPM dependencies & scripts
│
└── README.md                                  # Project Documentation
```

---

## ⚡ Quick Start

### 📋 Prerequisites
Ensure you have the following installed on your machine:
- **Java JDK 23+** ([Download Oracle OpenJDK](https://jdk.java.net/23/))
- **Node.js 18.x+** & **npm** ([Download Node.js](https://nodejs.org/))
- **MySQL Server 8.0+** ([Download MySQL](https://dev.mysql.com/downloads/))
- **Git**

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/satwik12dev/URL-Shortner.git
cd URL-Shortner
```

---

### Step 2: Configure & Start the Database
Open MySQL Workbench or your terminal, and create a fresh database:
```sql
CREATE DATABASE url_shortener;
```

---

### Step 3: Launch Backend Server
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Update your credentials in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/url_shortener
   spring.datasource.username=YOUR_MYSQL_USERNAME
   spring.datasource.password=YOUR_MYSQL_PASSWORD
   ```
3. Run the application:
   ```bash
   # Windows
   mvnw.cmd spring-boot:run

   # Linux / macOS
   ./mvnw spring-boot:run
   ```
   > 🚀 Backend server runs at: `http://localhost:8080`

---

### Step 4: Launch Frontend Client
1. Open a separate terminal and navigate to `frontend`:
   ```bash
   cd frontend
   ```
2. Install npm dependencies:
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```
   > 🌐 Open your browser at: `http://localhost:5173`

---

## 📡 REST API Documentation

### 🔓 Public Authentication
```http
POST /api/auth/public/register
```
<details>
<summary><b>View Register Payload & Response</b></summary>

**Request Body:**
```json
{
  "username": "satwik",
  "email": "satwik@example.com",
  "password": "SecurePassword123!"
}
```
**Response:** `200 OK`
```text
User registered successfully
```
</details>

```http
POST /api/auth/public/login
```
<details>
<summary><b>View Login Payload & Response</b></summary>

**Request Body:**
```json
{
  "username": "satwik",
  "password": "SecurePassword123!"
}
```
**Response:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
</details>

---

### 🔒 URL Management *(Requires `Authorization: Bearer <TOKEN>`)*

```http
POST /api/urls/shorten
```
<details>
<summary><b>View Shorten URL Payload & Response</b></summary>

**Request Body:**
```json
{
  "originalUrl": "https://github.com/satwik12dev/URL-Shortner"
}
```
**Response:** `200 OK`
```json
{
  "id": 1,
  "originalUrl": "https://github.com/satwik12dev/URL-Shortner",
  "shortUrl": "QN7XOa0a",
  "clickCount": 0,
  "createdDate": "2026-08-31T01:00:00",
  "username": "satwik"
}
```
</details>

```http
GET /api/urls/myurls
```
<details>
<summary><b>View User URLs Response</b></summary>

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "originalUrl": "https://github.com/satwik12dev/URL-Shortner",
    "shortUrl": "QN7XOa0a",
    "clickCount": 14,
    "createdDate": "2026-08-31T01:00:00",
    "username": "satwik"
  }
]
```
</details>

```http
GET /api/urls/analytics/{shortUrl}?startDate=2026-08-01T00:00:00&endDate=2026-08-31T23:59:59
```
<details>
<summary><b>View Analytics Response</b></summary>

**Response:** `200 OK`
```json
[
  {
    "clickDate": "2026-08-30",
    "count": 5
  },
  {
    "clickDate": "2026-08-31",
    "count": 9
  }
]
```
</details>

---

### ⚡ Redirection Endpoint
```http
GET /{shortUrl}
```
- **Access:** Public
- **Behavior:** Increments `clickCount`, persists a new `ClickEvent` record, and issues an **`HTTP 302 Found`** redirect with `Location: <originalUrl>`.

---

## 🐳 Docker Support

Run the backend inside an optimized container:

```bash
# 1. Build Docker image
cd backend
docker build -t snaplink-backend .

# 2. Run container connecting to local or remote MySQL
docker run -d -p 8080:8080 \
  --name snaplink-backend-app \
  -e SPRING_DATASOURCE_URL="jdbc:mysql://host.docker.internal:3306/url_shortener" \
  -e SPRING_DATASOURCE_USERNAME="root" \
  -e SPRING_DATASOURCE_PASSWORD="YOUR_PASSWORD" \
  snaplink-backend
```

---

## ⚙️ Configuration Reference

### Backend Configuration (`application.properties`)
| Key | Default | Description |
| :--- | :--- | :--- |
| `spring.datasource.url` | `jdbc:mysql://localhost:3306/url_shortener` | MySQL JDBC URL |
| `spring.datasource.username` | `root` | Database user |
| `spring.datasource.password` | `NewPassword123!` | Database password |
| `jwt.secret` | `3844ecd5ed6ac732a712b...` | 256-bit signing key |
| `jwt.expiration` | `172800000` | Expiration time (48 hours in ms) |
| `frontend.url` | `http://localhost:5173` | Allowed CORS frontend host |

### Frontend Configuration (`.env`)
| Key | Default | Description |
| :--- | :--- | :--- |
| `VITE_BACKEND_URL` | `http://localhost:8080` | Spring Boot API origin |
| `VITE_REACT_FRONT_END_URL` | `http://localhost:5173` | Frontend application origin |
| `VITE_REACT_SUBDOMAIN` | `http://url.localhost:5173` | Custom subdomain redirect origin |

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create!

1. **Fork the Project**
2. **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your Changes** (`git commit -m 'feat: add some amazing feature'`)
4. **Push to the Branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/satwik12dev">Satwik</a></sub>
</div>
