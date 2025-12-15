# DSA Backend Server

A Node.js/Express backend server providing three core cross-cutting capabilities for algorithm visualization, AI-powered explanations, and code execution.

## Features

### 1. Algorithm Visualizer Engine
Visualizes algorithm execution step-by-step with detailed narration and state snapshots.

**Supported Algorithms:**
- **TwoSum**: Find two numbers that sum to a target value
- **MergeSort**: Divide-and-conquer sorting algorithm
- **BFS**: Breadth-First Search graph traversal

**Endpoint:** `POST /api/visualizer/run`

Example:
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

### 2. AI Explanation Proxy
Provides AI-powered explanations for code and algorithms with built-in caching and fallback mechanisms.

**Features:**
- Configurable LinkedIn AI API integration
- Automatic fallback to heuristic analysis
- Response caching for improved performance
- Complexity analysis and improvement suggestions

**Endpoint:** `POST /api/ai/explain`

Example:
```bash
curl -X POST http://localhost:5000/api/ai/explain \
  -H "Content-Type: application/json" \
  -d '{
    "problemId": "two-sum",
    "code": "const nums = [2, 7]; const target = 9;",
    "language": "javascript"
  }'
```

### 3. Code Execution & Test Runner
Executes submitted code against predefined test cases with sandboxing support.

**Features:**
- JavaScript and Python execution (extensible to Java, C++)
- Test case management
- Detailed execution results and verdicts
- Timeout and memory limits

**Endpoints:**
- `POST /api/execute/run` - Execute code
- `POST /api/execute/init-tests` - Register test cases
- `GET /api/execute/tests/:problemId` - Get test cases
- `DELETE /api/execute/tests/:problemId` - Clear test cases

Example:
```bash
# Initialize test cases
curl -X POST http://localhost:5000/api/execute/init-tests \
  -H "Content-Type: application/json" \
  -d '{
    "problemId": "square-problem",
    "testCases": [
      {
        "id": "test-1",
        "input": 5,
        "expectedOutput": "25",
        "description": "Test squaring 5"
      }
    ]
  }'

# Execute code
curl -X POST http://localhost:5000/api/execute/run \
  -H "Content-Type: application/json" \
  -d '{
    "code": "console.log(input * input);",
    "problemId": "square-problem",
    "language": "javascript"
  }'
```

## Installation

1. Install dependencies:
```bash
cd server
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Configure environment variables in `.env`

## Running the Server

### Development
```bash
npm run dev
```

The server will start on `http://localhost:5000`

### Production
```bash
npm start
```

## Testing

### Run all tests
```bash
npm test
```

### Run unit tests only
```bash
npm run test:unit
```

### Run integration tests only
```bash
npm run test:integration
```

**Note:** Integration tests require the server to be running on port 5000.

## API Documentation

### Health Check
```
GET /health
Response: { status: "ok", timestamp: "..." }
```

### Visualizer Endpoints

#### Run Visualization
```
POST /api/visualizer/run
Body: { algorithm: string, input: object }
Response: { success: boolean, data: VisualizationResult, metadata: object }
```

#### Get Supported Algorithms
```
GET /api/visualizer/algorithms
Response: { success: boolean, algorithms: array }
```

#### Get Algorithm Metadata
```
GET /api/visualizer/algorithms/:algorithm
Response: { success: boolean, metadata: object }
```

### AI Endpoints

#### Get Explanation
```
POST /api/ai/explain
Body: { problemId: string, code: string, language?: string }
Response: { success: boolean, data: { explanation, complexity, improvements, ... } }
```

#### Clear Cache
```
POST /api/ai/cache/clear
Response: { success: boolean, message: string }
```

#### Get Cache Statistics
```
GET /api/ai/cache/stats
Response: { success: boolean, stats: object }
```

### Execution Endpoints

#### Initialize Test Cases
```
POST /api/execute/init-tests
Body: { problemId: string, testCases: TestCase[] }
Response: { success: boolean, message: string, count: number }
```

#### Execute Code
```
POST /api/execute/run
Body: { code: string, problemId: string, language?: string }
Response: { success: boolean, data: { results, verdict, summary, ... } }
```

#### Get Test Cases
```
GET /api/execute/tests/:problemId
Response: { success: boolean, problemId: string, testCases: array }
```

#### Clear Test Cases
```
DELETE /api/execute/tests/:problemId
Response: { success: boolean, message: string }
```

## Architecture

### Design Patterns Used

1. **Strategy Pattern**: Algorithm visualizers implement a common interface
2. **Factory Pattern**: VisualizerFactory creates appropriate visualizers
3. **Singleton Pattern**: Service instances are shared across requests
4. **Facade Pattern**: Controllers provide simplified API interface

### Project Structure

```
server/
├── src/
│   ├── server.js                 # Express app setup
│   ├── controllers/              # Request handlers
│   │   ├── visualizerController.js
│   │   ├── aiController.js
│   │   └── executionController.js
│   ├── services/                 # Business logic
│   │   ├── AlgorithmVisualizer.js
│   │   ├── AIExplanationService.js
│   │   └── CodeExecutionService.js
│   ├── routes/                   # API routes
│   │   ├── visualizerRoutes.js
│   │   ├── aiRoutes.js
│   │   └── executionRoutes.js
│   ├── models/                   # Data models
│   │   └── VisualizationStep.js
│   └── utils/                    # Helper utilities
├── tests/
│   ├── unit/                     # Unit tests
│   └── integration/              # Integration tests
├── .env.example                  # Environment template
├── .gitignore
├── package.json
└── README.md
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |
| LINKEDIN_AI_API_KEY | API key for LinkedIn AI | (required for API) |
| LINKEDIN_AI_ENDPOINT | AI API endpoint | https://api.linkedin.com/v2/aiExplain |
| EXECUTION_TIMEOUT | Code execution timeout (ms) | 5000 |
| EXECUTION_MAX_MEMORY | Max memory for execution (MB) | 256 |
| DOCKER_ENABLED | Enable Docker sandboxing | false |
| DOCKER_IMAGE | Docker image for execution | node:18-alpine |
| CACHE_TTL | Cache time-to-live (seconds) | 3600 |

## Error Handling

All endpoints return consistent error responses:

```json
{
  "error": "Error message",
  "status": 400
}
```

Common status codes:
- **200**: Success
- **400**: Bad request (validation error)
- **404**: Not found
- **500**: Server error

## Performance Considerations

1. **Caching**: AI explanations are cached in-memory for 1 hour by default
2. **Timeouts**: Code execution has a 5-second timeout to prevent hangs
3. **Memory Limits**: Execution is limited to 256MB by default
4. **Streaming**: Large responses use streaming where applicable

## Security

1. **Input Validation**: All inputs are validated
2. **Timeout Protection**: Long-running operations have timeouts
3. **Memory Limits**: Execution processes are constrained
4. **Error Messages**: Sensitive error details are not exposed in responses
5. **CORS**: Configure appropriately for your frontend

## Extension Points

### Adding New Algorithms

1. Create a new class extending `AlgorithmVisualizer`
2. Implement `visualize()` and `getMetadata()` methods
3. Register in `VisualizerFactory.createVisualizer()`
4. Add tests in `tests/unit/AlgorithmVisualizer.test.js`

Example:
```javascript
export class QuickSortVisualizer extends AlgorithmVisualizer {
  visualize(input) {
    // Implementation
  }
  
  getMetadata() {
    return { name: 'Quick Sort', ... };
  }
}
```

### Supporting New Languages

1. Add execution method in `CodeExecutionService`
2. Implement language-specific execution logic
3. Add test case in code execution tests
4. Update documentation

## License

MIT

## Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Run linting before committing
