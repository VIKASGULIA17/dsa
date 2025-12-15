# DSA Hub - Full Stack Application

A full-stack Data Structures and Algorithms learning platform built with React 19 + Vite frontend and Spring Boot 3.4 + Java 21 backend.

## Project Structure

```
.
├── backend/              # Spring Boot backend API
├── src/                 # React frontend source
├── public/              # Frontend static assets
├── docker-compose.yml   # PostgreSQL database setup
├── .env.example         # Environment variables template
└── README.md           # This file
```

## Tech Stack

### Frontend
- React 19 + Vite
- React Router for navigation
- Tailwind CSS 4 with custom CSS variables
- Motion for animations
- Lucide React icons
- React Syntax Highlighter
- Copy-to-clipboard utilities

### Backend
- Java 21
- Spring Boot 3.4.0
- Spring Security with JWT authentication
- Spring Data JPA
- PostgreSQL database
- Maven build system
- Lombok

## Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Java** 21+
- **Maven** 3.6+
- **Docker** and Docker Compose

### 1. Clone and Setup Environment

```bash
# Clone the repository
git clone <repository-url>
cd <project-directory>

# Copy environment variables template
cp .env.example .env

# Edit .env with your configuration (optional - defaults work for local development)
```

### 2. Start PostgreSQL Database

```bash
# Start PostgreSQL in Docker
docker-compose up -d

# Verify it's running
docker ps
```

### 3. Start Backend API

```bash
# Navigate to backend directory
cd backend

# Build and run the Spring Boot application
mvn clean install
mvn spring-boot:run

# Backend will be available at http://localhost:8080/api
```

### 4. Start Frontend Development Server

In a new terminal:

```bash
# Navigate to project root (if in backend directory)
cd ..

# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Frontend will be available at http://localhost:5173
```

## Development

### Frontend Development

```bash
# Install dependencies
npm install

# Start dev server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Backend Development

```bash
cd backend

# Run application
mvn spring-boot:run

# Run tests
mvn test

# Package application
mvn clean package

# Run packaged application
java -jar target/backend-1.0.0.jar
```

## API Documentation

### Authentication Endpoints (Public)

- `POST /api/auth/register` - Register a new user
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```

- `POST /api/auth/login` - Login
  ```json
  {
    "usernameOrEmail": "string",
    "password": "string"
  }
  ```

- `POST /api/auth/refresh` - Refresh access token
  ```json
  {
    "refreshToken": "string"
  }
  ```

### Protected Endpoints

All protected endpoints require the `Authorization: Bearer <token>` header.

- `GET /api/test/user` - Test endpoint for authenticated users
- `GET /api/test/admin` - Test endpoint for admin users only

## Default Credentials

An admin user is automatically created on first startup:

- **Email**: `admin@dsahub.com`
- **Password**: `Admin@123`

(Configure via `ADMIN_EMAIL` and `ADMIN_PASSWORD` environment variables)

## Environment Variables

Create a `.env` file in the project root (copy from `.env.example`):

```env
# Database Configuration
POSTGRES_DB=dsahub
POSTGRES_USER=dsahub
POSTGRES_PASSWORD=dsahub123
POSTGRES_PORT=5432

# Backend Configuration
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/dsahub
SPRING_DATASOURCE_USERNAME=dsahub
SPRING_DATASOURCE_PASSWORD=dsahub123

# JWT Configuration
JWT_SECRET=your-secret-key-min-32-characters
JWT_EXPIRATION_MS=86400000
JWT_REFRESH_EXPIRATION_MS=604800000

# Admin User
ADMIN_EMAIL=admin@dsahub.com
ADMIN_PASSWORD=Admin@123
```

## Testing

### Backend Tests

```bash
cd backend
mvn test
```

Integration tests cover:
- User registration and login
- JWT token generation and validation
- Refresh token functionality
- Protected route access control
- 403 responses for unauthenticated requests

### Frontend Tests

```bash
npm run test
```

## Database Management

### Access PostgreSQL CLI

```bash
docker exec -it dsahub-postgres psql -U dsahub -d dsahub
```

### View Database Logs

```bash
docker logs dsahub-postgres
```

### Stop Database

```bash
docker-compose down
```

### Reset Database (Delete all data)

```bash
docker-compose down -v
docker-compose up -d
```

## Frontend Features

- **Home Page**: Marketing hero, stats, featured topics, problem of the day
- **DSA Hub**: Browse all categories and topics with difficulty tags
- **Topics Page**: Detailed theory with code examples in multiple languages (C++, Java, Python, JavaScript)
- **About Page**: Developer profile, achievements, tech stack, planned features
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on all device sizes
- **Animated Navigation**: Enhanced navbar with smooth animations

## Backend Features

- **RESTful API**: Clean REST endpoints following best practices
- **JWT Authentication**: Stateless authentication with access and refresh tokens
- **Role-Based Access**: USER and ADMIN roles with method-level security
- **Password Security**: BCrypt hashing for all passwords
- **CORS Enabled**: Pre-configured for local development
- **Data Seeding**: Automatic admin user creation
- **Comprehensive Tests**: Integration tests using MockMvc

## Production Deployment

### Backend

1. Build the application:
   ```bash
   cd backend
   mvn clean package -DskipTests
   ```

2. Run the JAR file:
   ```bash
   java -jar target/backend-1.0.0.jar
   ```

3. Or use Docker:
   ```bash
   docker build -t dsahub-backend .
   docker run -p 8080:8080 dsahub-backend
   ```

### Frontend

1. Build the application:
   ```bash
   npm run build
   ```

2. Serve the `dist` folder using any static file server (Nginx, Apache, etc.)

### Production Considerations

- Change JWT secret to a strong random value
- Use production-grade PostgreSQL instance
- Enable HTTPS for both frontend and backend
- Configure CORS to only allow your production domain
- Update admin credentials
- Set appropriate JWT expiration times
- Enable rate limiting and other security measures

## Troubleshooting

### Port Conflicts

**Backend (8080)**:
- Change in `backend/src/main/resources/application.properties`:
  ```properties
  server.port=8081
  ```

**Frontend (5173)**:
- Change in `vite.config.js`:
  ```javascript
  server: { port: 3000 }
  ```

**PostgreSQL (5432)**:
- Change in `docker-compose.yml` and update connection strings

### Database Connection Issues

1. Ensure Docker is running: `docker ps`
2. Check container logs: `docker logs dsahub-postgres`
3. Verify environment variables
4. Ensure PostgreSQL is healthy: `docker-compose ps`

### Backend Build Failures

1. Verify Java version: `java -version` (should be 21+)
2. Verify Maven version: `mvn -version`
3. Clean Maven cache: `mvn clean`
4. Check for port conflicts

### Frontend Build Issues

1. Clear npm cache: `npm cache clean --force`
2. Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
3. Check Node version: `node -v` (should be 18+)

## Additional Documentation

- [Backend API Documentation](backend/README.md)
- Frontend uses client-side routing with React Router
- All DSA content is stored in `src/data/DsaTopics.js`

## License

This project is licensed under the MIT License.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## Support

For issues and questions, please open an issue in the GitHub repository.
