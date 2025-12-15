# DSA Hub - Algorithm Visualization & Learning Platform

A full-stack application for learning Data Structures and Algorithms with interactive visualizations, AI-powered explanations, and code execution capabilities.
# DSA Hub - Full Stack Application

A full-stack Data Structures and Algorithms learning platform built with React 19 + Vite frontend and Spring Boot 3.4 + Java 21 backend.

## Project Structure

```
project/
├── src/                      # Frontend React application
│   ├── components/          # React components
│   ├── pages/               # Page components
│   ├── data/                # Static DSA content
│   └── lib/                 # Utilities
├── server/                  # Backend Node.js/Express API
│   ├── src/
│   │   ├── services/        # Business logic
│   │   ├── controllers/     # Request handlers
│   │   ├── routes/          # API endpoints
│   │   └── models/          # Data models
│   ├── tests/               # Unit & integration tests
│   └── README.md            # Backend documentation
├── BACKEND_SETUP.md         # Backend setup guide
└── package.json
```

## Features

### Frontend
- 📚 Interactive DSA topic library
- 🎨 Beautiful UI with Tailwind CSS 4
- 📱 Responsive design
- 🌙 Dark mode support
- ⚡ Fast with Vite & React 19

### Backend
- 🔄 **Algorithm Visualizer** - Step-by-step algorithm execution visualization
  - TwoSum, MergeSort, BFS algorithms
  - Detailed narration and state snapshots
  - Extensible strategy pattern

- 🤖 **AI Explanation Engine** - AI-powered code explanations
  - LinkedIn AI integration
  - Automatic fallback mode
  - Response caching
  - Complexity analysis

- ⚙️ **Code Execution** - Execute and test code
  - JavaScript/Python support
  - Test case management
  - Detailed execution verdicts
  - Sandboxed execution

## Quick Start

### Prerequisites
- Node.js >= 16
- npm or yarn

### Installation & Running

1. **Install dependencies:**
   ```bash
   npm install
   cd server && npm install && cd ..
   ```

2. **Configure backend (optional):**
   ```bash
   cp server/.env.example server/.env
   # Edit server/.env with your settings
   ```

3. **Run in development:**

   **Terminal 1 (Backend):**
   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 (Frontend):**
   ```bash
   npm run dev
   ```

   Frontend: http://localhost:5173
   Backend: http://localhost:5000

## API Documentation

### Algorithm Visualizer
```bash
# Run visualization
curl -X POST http://localhost:5000/api/visualizer/run \
  -H "Content-Type: application/json" \
  -d '{
    "algorithm": "TwoSum",
    "input": {"nums": [2, 7, 11, 15], "target": 9}
  }'

# Get supported algorithms
curl http://localhost:5000/api/visualizer/algorithms
```

### AI Explanation
```bash
# Get explanation
curl -X POST http://localhost:5000/api/ai/explain \
  -H "Content-Type: application/json" \
  -d '{
    "problemId": "two-sum",
    "code": "const nums = [2, 7];",
    "language": "javascript"
  }'
```

### Code Execution
```bash
# Initialize tests
curl -X POST http://localhost:5000/api/execute/init-tests \
  -H "Content-Type: application/json" \
  -d '{
    "problemId": "problem-1",
    "testCases": [{"id": "test-1", "input": 5, "expectedOutput": "25"}]
  }'

# Execute code
curl -X POST http://localhost:5000/api/execute/run \
  -H "Content-Type: application/json" \
  -d '{
    "code": "console.log(input * input);",
    "problemId": "problem-1",
    "language": "javascript"
  }'
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
npm run dev           # Start dev server
npm run build         # Build for production
npm run preview       # Preview production build
npm run lint          # Run ESLint
```

### Backend Development
```bash
cd server

npm run dev           # Start server
npm run test          # Run all tests
npm run test:unit    # Run unit tests
npm run test:integration  # Run integration tests
npm run lint          # Run ESLint

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

### Unit Tests
```bash
cd server
npm run test:unit
```

### Integration Tests
```bash
cd server
npm run dev            # Terminal 1
npm run test:integration  # Terminal 2
```

## Technologies

### Frontend
- React 19
- Vite
- React Router
- Tailwind CSS 4
- Motion (animations)
- Lucide React (icons)
- React Syntax Highlighter

### Backend
- Node.js
- Express.js
- Node Cache
- Axios
- dotenv

## Architecture

### Design Patterns
- **Strategy Pattern** - Algorithm visualizers
- **Factory Pattern** - Visualizer creation
- **Singleton Pattern** - Service instances
- **Facade Pattern** - Controller interfaces

### Core Services
1. **AlgorithmVisualizer** - Base class with concrete implementations
2. **AIExplanationService** - AI API wrapper with caching/fallback
3. **CodeExecutionService** - Sandboxed code execution
4. **VisualizerFactory** - Creates visualizers by type

## Configuration

### Backend Environment Variables
```env
PORT=5000
NODE_ENV=development
LINKEDIN_AI_API_KEY=your_key_here
LINKEDIN_AI_ENDPOINT=https://api.linkedin.com/v2/aiExplain
EXECUTION_TIMEOUT=5000
CACHE_TTL=3600
```

See `server/.env.example` for all options.

## Extending the Application

### Adding New Algorithms
1. Create class extending `AlgorithmVisualizer`
2. Implement `visualize()` and `getMetadata()`
3. Register in `VisualizerFactory`
4. Add tests

See `server/README.md` for detailed instructions.

### Adding New Languages
Edit `CodeExecutionService` to add support for more languages.

## Performance Optimizations

- ✅ In-memory caching for AI responses (1 hour TTL)
- ✅ Lazy algorithm loading
- ✅ Timeout protection on code execution
- ✅ Memory limits on execution environments
- ✅ Efficient state snapshots in visualizations

## Security

- ✅ Input validation on all endpoints
- ✅ Environment variable protection
- ✅ Execution timeouts (prevent infinite loops)
- ✅ Memory limits (prevent resource exhaustion)
- ✅ Error message sanitization
- ✅ CORS configuration support

## Troubleshooting

### Backend won't start
```bash
# Check port availability
lsof -i :5000

# Check configuration
cat server/.env

# Check logs
tail -f /tmp/server.log
```

### Tests failing
```bash
cd server
npm install  # Reinstall dependencies
npm run test:unit  # Run unit tests first
```

### API not responding
- Ensure backend is running on port 5000
- Check firewall settings
- Verify environment variables

## Contributing

1. Follow existing code style and patterns
2. Write tests for new features
3. Update documentation
4. Run linting before committing

## License

MIT

## Support

- See `BACKEND_SETUP.md` for detailed backend setup guide
- See `server/README.md` for API documentation
- Check test files for usage examples

## Future Enhancements

- [ ] Database integration (store submissions, progress)
- [ ] User authentication
- [ ] More algorithm visualizations
- [ ] Video tutorials integration
- [ ] Multi-language support (UI)
- [ ] Submission leaderboard
- [ ] Advanced code editor
- [ ] Mobile app

---

Made with ❤️ for learning DSA
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
