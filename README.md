# DSA Hub - Algorithm Visualization & Learning Platform

A full-stack application for learning Data Structures and Algorithms with interactive visualizations, AI-powered explanations, and code execution capabilities.

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
