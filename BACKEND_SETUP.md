# Backend Setup Guide

This guide explains how to set up and run the DSA Backend server alongside the frontend.

## Directory Structure

```
project/
├── src/                    # Frontend React application
├── server/                 # Backend Node.js/Express server
│   ├── src/
│   ├── tests/
│   ├── package.json
│   └── README.md
└── BACKEND_SETUP.md        # This file
```

## Quick Start

### 1. Install Frontend Dependencies

From the project root:
```bash
npm install
```

### 2. Install Backend Dependencies

From the project root:
```bash
cd server
npm install
cd ..
```

### 3. Configure Environment Variables

Create a `.env` file in the `server` directory:
```bash
cp server/.env.example server/.env
```

Edit `server/.env` with your configuration:
```env
PORT=5000
NODE_ENV=development
LINKEDIN_AI_API_KEY=your_key_here
LINKEDIN_AI_ENDPOINT=https://api.linkedin.com/v2/aiExplain
```

### 4. Run the Development Setup

**Option A: Terminal 1 - Backend, Terminal 2 - Frontend**

Terminal 1 (Backend):
```bash
cd server
npm run dev
```

Terminal 2 (Frontend):
```bash
npm run dev
```

**Option B: Parallel Development (using npm workspaces or manually)**

Or use your preferred method to run both servers in parallel.

## API Endpoints

The backend server runs on `http://localhost:5000` by default.

### Available Endpoints

1. **Algorithm Visualizer**
   - `POST /api/visualizer/run` - Run algorithm visualization
   - `GET /api/visualizer/algorithms` - List supported algorithms
   - `GET /api/visualizer/algorithms/:algorithm` - Get algorithm metadata

2. **AI Explanation**
   - `POST /api/ai/explain` - Get AI explanation for code
   - `GET /api/ai/cache/stats` - View cache statistics
   - `POST /api/ai/cache/clear` - Clear explanation cache

3. **Code Execution**
   - `POST /api/execute/run` - Execute code against test cases
   - `POST /api/execute/init-tests` - Register test cases
   - `GET /api/execute/tests/:problemId` - Get test cases
   - `DELETE /api/execute/tests/:problemId` - Clear test cases

### Example Requests

#### Run TwoSum Visualization
```bash
curl -X POST http://localhost:5000/api/visualizer/run \
  -H "Content-Type: application/json" \
  -d '{
    "algorithm": "TwoSum",
    "input": {
      "nums": [2, 7, 11, 15],
      "target": 9
    }
  }'
```

#### Get AI Explanation
```bash
curl -X POST http://localhost:5000/api/ai/explain \
  -H "Content-Type: application/json" \
  -d '{
    "problemId": "two-sum",
    "code": "const nums = [2, 7]; const target = 9;",
    "language": "javascript"
  }'
```

#### Initialize and Run Test Cases
```bash
# Initialize
curl -X POST http://localhost:5000/api/execute/init-tests \
  -H "Content-Type: application/json" \
  -d '{
    "problemId": "square-test",
    "testCases": [
      {
        "id": "test-1",
        "input": 5,
        "expectedOutput": "25",
        "description": "Square of 5"
      }
    ]
  }'

# Execute
curl -X POST http://localhost:5000/api/execute/run \
  -H "Content-Type: application/json" \
  -d '{
    "code": "console.log(input * input);",
    "problemId": "square-test",
    "language": "javascript"
  }'
```

## Testing

### Run All Tests
```bash
cd server
npm test
```

### Run Only Unit Tests
```bash
cd server
npm run test:unit
```

### Run Only Integration Tests
```bash
cd server
npm run test:integration
```

**Note:** Integration tests require the server to be running on port 5000.

## Production Deployment

### Docker (Recommended)

Build and run using Docker:

```bash
# Backend
docker build -t dsa-backend ./server
docker run -p 5000:5000 \
  -e LINKEDIN_AI_API_KEY=your_key \
  dsa-backend

# Frontend
docker build -t dsa-frontend .
docker run -p 3000:5000 dsa-frontend
```

### Manual Deployment

```bash
cd server
npm install --production
NODE_ENV=production npm start
```

## Troubleshooting

### Port Already in Use
```bash
# Change PORT in server/.env
PORT=5001

# Or kill the process using port 5000
lsof -i :5000
kill -9 <PID>
```

### Node Module Conflicts
```bash
cd server
rm -rf node_modules package-lock.json
npm install
```

### Server Won't Start
- Check `server/.env` for valid configuration
- Ensure Node.js version >= 16
- Check logs: `cat /tmp/server.log`

### Tests Failing
- Ensure server is running for integration tests
- Check that port 5000 is available
- Reset cache: `POST http://localhost:5000/api/ai/cache/clear`

## Environment Variables Reference

| Variable | Default | Description |
|----------|---------|-------------|
| PORT | 5000 | Server port |
| NODE_ENV | development | Environment mode |
| LINKEDIN_AI_API_KEY | (required) | LinkedIn AI API key |
| LINKEDIN_AI_ENDPOINT | https://api.linkedin.com/v2/aiExplain | AI API endpoint |
| EXECUTION_TIMEOUT | 5000 | Code execution timeout (ms) |
| EXECUTION_MAX_MEMORY | 256 | Max memory (MB) |
| DOCKER_ENABLED | false | Enable Docker sandboxing |
| CACHE_TTL | 3600 | Cache lifetime (seconds) |

## Architecture Overview

### Backend Architecture
- **Express.js** - REST API server
- **Strategy Pattern** - Algorithm visualizers
- **Factory Pattern** - Visualizer creation
- **Singleton Pattern** - Service instances
- **Node Cache** - In-memory caching

### Key Components
1. **AlgorithmVisualizer** - Strategy-based visualization engine
2. **AIExplanationService** - AI API wrapper with caching
3. **CodeExecutionService** - Sandboxed code execution
4. **Controllers** - Request handlers
5. **Routes** - API endpoint definitions

## Adding New Features

### Add New Algorithm
See `server/README.md` for extending the visualizer.

### Add New Language Support
See `server/README.md` for extending code execution.

### Configure AI Provider
Edit `AIExplanationService` constructor to integrate a different AI API.

## Security Considerations

1. **API Key Protection**: Never commit `.env` files
2. **Input Validation**: All inputs are validated
3. **Timeout Limits**: Execution has timeouts
4. **Memory Limits**: Constrained execution environments
5. **CORS**: Configure for your frontend domain

## Performance Tips

1. **Caching**: AI responses cached for 1 hour
2. **Lazy Loading**: Algorithms loaded on-demand
3. **Timeout Protection**: Prevent long-running operations
4. **Memory Limits**: Constrain execution resources

## Support

For issues or questions:
- Check `server/README.md` for detailed API documentation
- Review test files for usage examples
- Check server logs: `tail -f /tmp/server.log`

## License

MIT
# Backend Setup Summary

This document summarizes the Spring Boot backend that has been created for the DSA Hub application.

## What Was Created

### 1. Project Structure
```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/dsahub/backend/
│   │   │   ├── BackendApplication.java          # Main application class
│   │   │   ├── config/
│   │   │   │   └── DataSeeder.java              # Seeds admin user on startup
│   │   │   ├── controller/
│   │   │   │   ├── AuthController.java          # Register, Login, Refresh endpoints
│   │   │   │   └── TestController.java          # Test endpoints for auth verification
│   │   │   ├── dto/
│   │   │   │   ├── AuthResponse.java            # Authentication response
│   │   │   │   ├── LoginRequest.java            # Login request
│   │   │   │   ├── MessageResponse.java         # Generic message response
│   │   │   │   ├── RefreshTokenRequest.java     # Refresh token request
│   │   │   │   └── RegisterRequest.java         # Registration request
│   │   │   ├── model/
│   │   │   │   ├── RefreshToken.java            # Refresh token entity
│   │   │   │   ├── Role.java                    # Role enum (USER, ADMIN)
│   │   │   │   └── User.java                    # User entity with UserDetails
│   │   │   ├── repository/
│   │   │   │   ├── RefreshTokenRepository.java  # Refresh token data access
│   │   │   │   └── UserRepository.java          # User data access
│   │   │   ├── security/
│   │   │   │   ├── JwtAuthenticationFilter.java # JWT token validation filter
│   │   │   │   ├── JwtUtils.java                # JWT token generation/validation
│   │   │   │   └── SecurityConfig.java          # Security configuration
│   │   │   └── service/
│   │   │       ├── AuthService.java             # Authentication business logic
│   │   │       ├── RefreshTokenService.java     # Refresh token management
│   │   │       └── UserDetailsServiceImpl.java  # Spring Security UserDetailsService
│   │   └── resources/
│   │       └── application.properties           # Application configuration
│   └── test/
│       ├── java/com/dsahub/backend/
│       │   └── AuthControllerIntegrationTest.java # Integration tests
│       └── resources/
│           └── application-test.properties      # Test configuration
├── .gitignore                                   # Backend-specific gitignore
├── pom.xml                                      # Maven dependencies
└── README.md                                    # Backend documentation
```

### 2. Dependencies (Spring Boot 3.4.0, Java 21)
- **spring-boot-starter-web**: REST API endpoints
- **spring-boot-starter-security**: Authentication and authorization
- **spring-boot-starter-validation**: Request validation
- **spring-boot-starter-data-jpa**: Database access
- **postgresql**: PostgreSQL JDBC driver
- **jjwt** (v0.12.5): JWT token generation and validation
- **lombok**: Reduce boilerplate code
- **h2**: In-memory database for testing

### 3. Security Features
- **JWT Authentication**: Stateless token-based authentication
- **Refresh Tokens**: Long-lived tokens for obtaining new access tokens
- **Password Hashing**: BCrypt encryption for all passwords
- **Role-Based Access Control**: USER and ADMIN roles
- **CORS Configuration**: Pre-configured for frontend (localhost:5173, localhost:3000)
- **Protected Endpoints**: All endpoints except `/api/auth/**` require authentication

### 4. Database Schema
The following tables are automatically created by JPA:

#### users
- id (BIGSERIAL PRIMARY KEY)
- username (VARCHAR, UNIQUE, NOT NULL)
- email (VARCHAR, UNIQUE, NOT NULL)
- password (VARCHAR, NOT NULL) - BCrypt hashed
- enabled (BOOLEAN, NOT NULL)
- created_at (TIMESTAMP, NOT NULL)
- updated_at (TIMESTAMP)

#### user_roles
- user_id (BIGINT, FOREIGN KEY)
- role (VARCHAR) - USER or ADMIN

#### refresh_tokens
- id (BIGSERIAL PRIMARY KEY)
- user_id (BIGINT, FOREIGN KEY, UNIQUE)
- token (VARCHAR, UNIQUE, NOT NULL)
- expiry_date (TIMESTAMP, NOT NULL)

### 5. API Endpoints

#### Public Endpoints (No Authentication Required)
- **POST /api/auth/register** - Register new user
- **POST /api/auth/login** - Login with username/email and password
- **POST /api/auth/refresh** - Get new access token using refresh token

#### Protected Endpoints (Authentication Required)
- **GET /api/test/user** - Test endpoint for authenticated users
- **GET /api/test/admin** - Test endpoint for admin users only

### 6. Configuration Files

#### docker-compose.yml
PostgreSQL 16 container configuration for local development.

#### .env.example
Template for environment variables including:
- Database credentials
- JWT secret and expiration times
- Admin user credentials

### 7. Integration Tests
Comprehensive test suite using MockMvc and H2 in-memory database:
- ✅ User registration with validation
- ✅ Duplicate username/email detection
- ✅ User login with valid credentials
- ✅ Invalid login credentials handling
- ✅ Refresh token generation and usage
- ✅ Protected route access control
- ✅ 403 response for unauthenticated requests

All 7 tests passing ✓

### 8. Admin User Seeding
On first startup, an admin user is automatically created:
- **Username**: admin
- **Email**: admin@dsahub.com (configurable)
- **Password**: Admin@123 (configurable)
- **Roles**: ADMIN, USER

## Quick Start Commands

```bash
# Start PostgreSQL
docker-compose up -d

# Navigate to backend
cd backend

# Build and run
mvn clean install
mvn spring-boot:run

# Run tests
mvn test

# Package for production
mvn clean package -DskipTests
```

## API Usage Example

### 1. Register a new user
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "john",
    "email": "john@example.com",
    "password": "password123"
  }'
```

Response:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiJ9...",
  "refreshToken": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "tokenType": "Bearer",
  "userId": 1,
  "username": "john",
  "email": "john@example.com",
  "roles": ["ROLE_USER"]
}
```

### 2. Login
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "usernameOrEmail": "john",
    "password": "password123"
  }'
```

### 3. Access protected endpoint
```bash
curl http://localhost:8080/api/test/user \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9..."
```

### 4. Refresh access token
```bash
curl -X POST http://localhost:8080/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
  }'
```

## Security Considerations

### Development (Current Configuration)
- Default JWT secret (DO NOT use in production)
- Permissive CORS allowing localhost origins
- Auto-created admin user with default password
- Verbose logging enabled

### Production Checklist
- [ ] Change JWT secret to a strong random value (min 32 characters)
- [ ] Update admin password or disable auto-creation
- [ ] Configure CORS to only allow production domains
- [ ] Use production PostgreSQL instance (not Docker)
- [ ] Enable HTTPS
- [ ] Set appropriate JWT expiration times
- [ ] Disable detailed error messages
- [ ] Add rate limiting
- [ ] Configure proper logging levels
- [ ] Set up database connection pooling
- [ ] Configure backup strategy

## Next Steps

### Potential Enhancements
1. **Email Verification**: Add email confirmation for new registrations
2. **Password Reset**: Implement forgot password functionality
3. **User Profiles**: Add endpoints to view and update user profiles
4. **Problem Tracking**: Add endpoints to track user progress on DSA problems
5. **Submissions**: Allow users to submit code solutions
6. **Leaderboards**: Track and display user rankings
7. **Social Features**: Add comments, likes, and following
8. **Rate Limiting**: Implement API rate limiting with Spring Cloud Gateway
9. **Actuator**: Add Spring Boot Actuator for monitoring
10. **Swagger/OpenAPI**: Add API documentation

### Integration with Frontend
To integrate the backend with the existing React frontend:

1. **Install Axios** (or use fetch):
   ```bash
   npm install axios
   ```

2. **Create API service** (`src/services/api.js`):
   ```javascript
   import axios from 'axios';

   const API_BASE_URL = 'http://localhost:8080/api';

   const api = axios.create({
     baseURL: API_BASE_URL,
   });

   // Add token to requests
   api.interceptors.request.use((config) => {
     const token = localStorage.getItem('accessToken');
     if (token) {
       config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
   });

   export const authAPI = {
     register: (data) => api.post('/auth/register', data),
     login: (data) => api.post('/auth/login', data),
     refresh: (refreshToken) => api.post('/auth/refresh', { refreshToken }),
   };
   ```

3. **Create auth context** for state management
4. **Add login/register pages** to the frontend
5. **Protect routes** that require authentication

## Support

For questions or issues, refer to:
- [Backend README](backend/README.md)
- [Main README](README.md)
- Spring Boot documentation: https://spring.io/projects/spring-boot
- Spring Security documentation: https://spring.io/projects/spring-security
