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
