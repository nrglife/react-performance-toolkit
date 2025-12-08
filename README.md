# React Performance Toolkit

> An interactive educational platform demonstrating React 19 performance optimization techniques through hands-on demos.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://nrglife.github.io/react-performance-toolkit/)
[![React](https://img.shields.io/badge/React-19.2-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2-purple)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 🎯 What This Project Demonstrates

This portfolio project showcases:

- **Deep React Knowledge**: Implementation of React 19's latest performance APIs
- **Educational Design**: Each demo teaches through interactive examples with visual feedback
- **Production-Ready Code**: TypeScript, proper error handling, responsive design
- **Performance Engineering**: Real-world optimization techniques with measurable results
- **Modern Tooling**: Vite, Material-UI, React Router v6, react-window

## 🚀 Live Demo

**[View Live Demo →](https://nrglife.github.io/react-performance-toolkit/)**

## ✨ Features

### 4 Core Performance Demos (MVP - v1.0.0)

#### 1. **useTransition Demo**
- Shows how to keep UI responsive during expensive updates
- Compares blocking vs non-blocking state updates
- Visual feedback with isPending indicator
- Real-world example: Filtering 10,000 items without freezing the UI

#### 2. **useDeferredValue Demo**
- Demonstrates deferring expensive computations
- Side-by-side comparison with immediate updates
- Shows when deferred value is stale
- Explains the difference between useTransition and useDeferredValue

#### 3. **Memoization Demo**
- Interactive examples of React.memo, useCallback, and useMemo
- Visual render counters showing when components re-render
- Props change indicators to understand re-render triggers
- Calculation run counters demonstrating useMemo caching
- Educational alerts explaining behavior based on toggle state

#### 4. **Virtualized List Demo**
- Compares react-window virtualization vs regular rendering
- Real-time DOM node counter (~30 vs 10,000+ nodes)
- Memory usage estimation
- Render time metrics with color-coding
- Scroll performance demonstration
- Smart useTransition integration for smooth mode switching
- List size selector (1K, 10K, 100K items)

### Additional Features

- 🌓 **Dark/Light Theme** with localStorage persistence
- 📱 **Fully Responsive** design for all screen sizes
- 💻 **Syntax-Highlighted Code Examples** in every demo
- 📊 **Visual Metrics** showing performance improvements
- 🎓 **Educational Explanations** with context-aware alerts
- ⚡ **Lazy-Loaded Routes** for optimal bundle size

## 🛠️ Tech Stack

- **React 19.2** - Latest React with concurrent features
- **TypeScript 5.9** - Type-safe development
- **Vite 7.2** - Lightning-fast build tool
- **Material-UI 7.3** - Modern component library
- **React Router v6** - Client-side routing with lazy loading
- **react-window** - Efficient list virtualization
- **react-syntax-highlighter** - Beautiful code display

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm
- Git

### Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nrglife/react-performance-toolkit.git
   cd react-performance-toolkit
   ```

2. **Install dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

   Note: `--legacy-peer-deps` is required due to React 19 compatibility with some packages.

3. **Generate mock data:**
   ```bash
   npm run generate-data
   ```

   This creates `public/mockData.json` with 1K, 10K, and 100K test items.

4. **Start development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🎮 Usage

### Development

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Deployment

```bash
npm run deploy       # Build and deploy to GitHub Pages
```

See [DEPLOY.md](DEPLOY.md) for detailed deployment instructions.

## 📚 Project Structure

```
react-performance-toolkit/
├── public/
│   └── mockData.json          # Generated test data (14MB)
├── src/
│   ├── components/
│   │   ├── layout/            # AppBar, ThemeToggle
│   │   └── shared/            # DemoContainer, CodeBlock, PageLoader
│   ├── hooks/
│   │   ├── useMockData.ts     # Data loading hook
│   │   └── useProfiler.ts     # Performance profiling
│   ├── pages/
│   │   ├── Home.tsx           # Landing page with demo grid
│   │   └── demos/             # Individual demo pages
│   │       ├── TransitionDemo.tsx
│   │       ├── DeferredDemo.tsx
│   │       ├── MemoDemo.tsx
│   │       └── VirtualizedDemo.tsx
│   ├── theme/
│   │   ├── theme.ts           # MUI theme configuration
│   │   └── ThemeContext.tsx   # Theme provider with persistence
│   ├── types/
│   │   └── index.ts           # TypeScript type definitions
│   ├── utils/
│   │   ├── demoConfig.ts      # Demo metadata configuration
│   │   └── expensiveCalculation.ts
│   ├── App.tsx                # Main app component with routing
│   └── main.tsx               # App entry point
├── scripts/
│   └── generateMockData.ts    # Mock data generator
└── package.json
```

## 🎓 Learning Outcomes

### For Developers Learning React Performance

Each demo teaches a specific optimization technique:

1. **useTransition**: Keep UI responsive during expensive updates
2. **useDeferredValue**: Defer non-urgent updates
3. **Memoization**: Prevent unnecessary re-renders and recalculations
4. **Virtualization**: Render large lists efficiently

### For Hiring Managers

This project demonstrates:

- ✅ Deep understanding of React's rendering behavior
- ✅ Ability to identify and solve performance bottlenecks
- ✅ Clean, maintainable, well-documented code
- ✅ Modern development practices and tooling
- ✅ User-focused design with educational value
- ✅ Production deployment experience

### 5 Expansion Demos (v2.0.0)

#### 5. **Lazy Loading Images Demo**
- IntersectionObserver-based lazy loading
- Placeholder to image transition
- Grid of 50+ images demonstrating on-demand loading
- Performance benefits explanation

#### 6. **Suspense Demo**
- Side-by-side comparison: TanStack Query vs Pure React Suspense
- wrapPromise pattern demonstration
- Suspense boundaries with fallback UI
- Educational comparison of both approaches

#### 7. **Re-render Visualizer Demo**
- Visual flash effects on component re-renders
- Render count tracking
- Three re-render triggers: state, props, context
- Isolated component demonstrations

#### 8. **React Profiler Demo**
- Real-time render performance metrics
- Mount vs update phase comparison
- Duration tracking with color-coded chips
- Summary statistics and insights
- Educational content about profiling in production

#### 9. **Web Worker Demo**
- Main thread vs Web Worker comparison
- Visual UI responsiveness indicator (rotating spinner)
- Fibonacci calculator demonstrating CPU-intensive work
- Clear demonstration of UI blocking vs non-blocking

## 🔮 Roadmap

### v3.0 - Polish (Planned)
- Performance comparison dashboard
- Technique comparison matrix
- Comprehensive documentation with diagrams
- Full test coverage
- CI/CD pipeline

See [tasks.md](.kiro/specs/react-performance-toolkit/tasks.md) for detailed implementation plan.

## 🤝 Contributing

This is a portfolio/educational project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**NRGLife**

- GitHub: [@nrglife](https://github.com/nrglife)
- Project Link: [https://github.com/nrglife/react-performance-toolkit](https://github.com/nrglife/react-performance-toolkit)
- Live Demo: [https://nrglife.github.io/react-performance-toolkit/](https://nrglife.github.io/react-performance-toolkit/)

## 🙏 Acknowledgments

- React team for the amazing concurrent features
- Material-UI for the beautiful component library
- react-window for efficient virtualization
- Vite for the blazing-fast development experience

---

**Built with ❤️ to help developers master React performance optimization**
