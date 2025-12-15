# DSA Hub Backend API

Spring Boot 3.4 + Java 21 backend for DSA Hub application.

## Tech Stack

- **Java 21**
- **Spring Boot 3.4.0**
- **Spring Security** with JWT authentication
- **Spring Data JPA** with PostgreSQL
- **Lombok** for boilerplate reduction
- **Maven** for dependency management

## Prerequisites

- Java 21 or higher
- Maven 3.6+
- Docker & Docker Compose (for PostgreSQL)

## Getting Started

### 1. Clone the repository and navigate to backend

```bash
cd backend
```

### 2. Set up environment variables

Copy the `.env.example` file from the project root and create a `.env` file:

```bash
cp ../.env.example ../.env
```

Edit the `.env` file with your desired configuration.

### 3. Start PostgreSQL using Docker Compose

From the project root directory:

```bash
docker-compose up -d
```

This will start a PostgreSQL container on port 5432.

### 4. Build the application

```bash
mvn clean install
```

### 5. Run the application

```bash
mvn spring-boot:run
```

The API will be available at `http://localhost:8080/api`

## API Endpoints

### Authentication Endpoints (Public)

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with username/email and password
- `POST /api/auth/refresh` - Refresh access token using refresh token

### Protected Endpoints (Requires Authentication)

- `GET /api/test/user` - Test endpoint for authenticated users
- `GET /api/test/admin` - Test endpoint for admin users only

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. After successful login or registration, you'll receive:

- `accessToken` - Use this in the Authorization header for subsequent requests
- `refreshToken` - Use this to get a new access token when it expires

### Making Authenticated Requests

Include the access token in the Authorization header:

```
Authorization: Bearer <your-access-token>
```

## Default Admin User

On first startup, an admin user is automatically created:

- **Email**: `admin@dsahub.com` (configurable via `ADMIN_EMAIL` env variable)
- **Password**: `Admin@123` (configurable via `ADMIN_PASSWORD` env variable)

## Running Tests

```bash
mvn test
```

Tests use an in-memory H2 database and include:
- Registration and login flows
- Token refresh
- Protected route access control
- Validation of 403 responses for unauthenticated requests

## Database Management

### Access PostgreSQL

```bash
docker exec -it dsahub-postgres psql -U dsahub -d dsahub
```

### Stop PostgreSQL

```bash
docker-compose down
```

### Reset Database

```bash
docker-compose down -v
docker-compose up -d
```

## Project Structure

```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/dsahub/backend/
│   │   │   ├── config/          # Configuration classes
│   │   │   ├── controller/      # REST controllers
│   │   │   ├── dto/             # Data Transfer Objects
│   │   │   ├── model/           # JPA entities
│   │   │   ├── repository/      # Data repositories
│   │   │   ├── security/        # Security configuration & JWT utilities
│   │   │   ├── service/         # Business logic
│   │   │   └── BackendApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│       ├── java/com/dsahub/backend/
│       │   └── AuthControllerIntegrationTest.java
│       └── resources/
│           └── application-test.properties
└── pom.xml
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `SPRING_DATASOURCE_URL` | PostgreSQL connection URL | `jdbc:postgresql://localhost:5432/dsahub` |
| `SPRING_DATASOURCE_USERNAME` | Database username | `dsahub` |
| `SPRING_DATASOURCE_PASSWORD` | Database password | `dsahub123` |
| `JWT_SECRET` | Secret key for JWT signing | (development default provided) |
| `JWT_EXPIRATION_MS` | Access token expiration in milliseconds | `86400000` (24 hours) |
| `JWT_REFRESH_EXPIRATION_MS` | Refresh token expiration in milliseconds | `604800000` (7 days) |
| `ADMIN_EMAIL` | Admin user email | `admin@dsahub.com` |
| `ADMIN_PASSWORD` | Admin user password | `Admin@123` |

## Security Features

- Password hashing using BCrypt
- JWT-based stateless authentication
- Refresh token rotation
- CORS configuration for frontend integration
- Role-based access control (USER, ADMIN)
- Protected routes require valid JWT token

## CORS Configuration

By default, the API allows requests from:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000` (Alternative React dev server)

Modify `SecurityConfig.java` to add additional origins.

## Troubleshooting

### Port 8080 already in use

Change the server port in `application.properties`:

```properties
server.port=8081
```

### Cannot connect to PostgreSQL

1. Ensure Docker is running
2. Check if the PostgreSQL container is running: `docker ps`
3. Verify environment variables are correctly set
4. Check logs: `docker logs dsahub-postgres`

### Tests failing

Ensure H2 database dependency is present in `pom.xml` (it's already included for test scope).
