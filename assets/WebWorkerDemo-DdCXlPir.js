import{j as e,r as o,h as r,m as k,o as v,K as y,i as a,t as z,G as i,k as I,q as D,D as w}from"./mui-vendor-C0Vrls3f.js";import{r as n}from"./react-vendor-MXZqnNxl.js";import{D as O,C as b}from"./CodeBlock-CU08gLq0.js";import"./syntax-highlighter-BxLn08Mh.js";function G(){const[g,R]=n.useState(40),[d,u]=n.useState(!1),[W,h]=n.useState(null),[C,m]=n.useState(null),[p,T]=n.useState(null),x=n.useRef(null),c=n.useRef(null),l=n.useRef(null),j=s=>s<=1?s:j(s-1)+j(s-2),U=()=>{let s=0;const t=()=>{s=(s+2)%360,c.current&&(c.current.style.transform=`rotate(${s}deg)`),l.current=requestAnimationFrame(t)};l.current=requestAnimationFrame(t)},M=()=>{l.current&&(cancelAnimationFrame(l.current),l.current=null),c.current&&(c.current.style.transform="rotate(0deg)")},B=()=>{u(!0),h(null),m(null),T("main"),U(),setTimeout(()=>{const s=performance.now(),t=j(g),f=performance.now();h(t),m(f-s),u(!1),M()},10)},S=()=>{u(!0),h(null),m(null),T("worker"),U();const s=performance.now();x.current||(x.current=new Worker(new URL("/react-performance-toolkit/assets/expensiveCalculation.worker-eO_MAE5a.js",import.meta.url),{type:"module"})),x.current.onmessage=t=>{const f=performance.now();h(t.data),m(f-s),u(!1),M()},x.current.postMessage(g)};return e.jsxs(O,{title:"Web Worker Demo",description:"Learn how to offload expensive calculations to Web Workers to keep your UI responsive",children:[e.jsxs(o,{severity:"info",sx:{mb:3},children:[e.jsx(r,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"🎯 Try This: Calculate Fibonacci and watch the spinner"}),e.jsxs(r,{variant:"body2",sx:{mb:1},children:["• ",e.jsx("strong",{children:"Main Thread:"})," The spinner will freeze during calculation (UI blocked)"]}),e.jsxs(r,{variant:"body2",children:["• ",e.jsx("strong",{children:"Web Worker:"})," The spinner keeps spinning smoothly (UI responsive)"]})]}),e.jsx(k,{sx:{mb:3},children:e.jsx(v,{children:e.jsxs(y,{spacing:3,children:[e.jsxs(a,{children:[e.jsx(r,{variant:"h6",gutterBottom:!0,children:"Calculate Fibonacci Number"}),e.jsx(r,{variant:"body2",color:"text.secondary",sx:{mb:2},children:"Try values between 35-45 to see noticeable differences. Higher values take longer."}),e.jsx(z,{type:"number",label:"Fibonacci Input (n)",value:g,onChange:s=>R(Number(s.target.value)),disabled:d,fullWidth:!0,inputProps:{min:1,max:45},helperText:"Recommended: 40 (takes ~1-2 seconds)"})]}),e.jsxs(i,{container:!0,spacing:2,children:[e.jsx(i,{size:{xs:12,sm:6},children:e.jsx(I,{variant:"contained",color:"error",fullWidth:!0,onClick:B,disabled:d,size:"large",children:"Calculate on Main Thread (Blocks UI)"})}),e.jsx(i,{size:{xs:12,sm:6},children:e.jsx(I,{variant:"contained",color:"success",fullWidth:!0,onClick:S,disabled:d,size:"large",children:"Calculate with Web Worker (Non-blocking)"})})]}),e.jsx(k,{variant:"outlined",sx:{bgcolor:"background.default"},children:e.jsx(v,{children:e.jsxs(y,{direction:"row",spacing:2,alignItems:"center",justifyContent:"center",children:[e.jsx(a,{ref:c,sx:{width:80,height:80,display:"flex",alignItems:"center",justifyContent:"center",border:"3px solid",borderColor:"primary.main",borderRadius:"8px",position:"relative","&::before":{content:'""',position:"absolute",top:4,left:4,width:8,height:8,bgcolor:"error.main",borderRadius:"50%"}},children:e.jsx(D,{size:60,thickness:4})}),e.jsxs(a,{children:[e.jsx(r,{variant:"h6",children:"UI Responsiveness Test"}),e.jsx(r,{variant:"body2",color:"text.secondary",children:d?p==="main"?"⚠️ Watch the border and red dot - they will freeze!":"✅ Watch the border and red dot - they stay smooth!":"Click a button to start calculation"})]})]})})}),W!==null&&C!==null&&e.jsx(k,{variant:"outlined",sx:{bgcolor:p==="worker"?"success.dark":"error.dark"},children:e.jsx(v,{children:e.jsxs(y,{spacing:2,children:[e.jsxs(a,{children:[e.jsx(r,{variant:"overline",color:"text.secondary",children:"Calculation Mode"}),e.jsx(r,{variant:"h6",children:p==="main"?"❌ Main Thread (Blocked UI)":"✅ Web Worker (Smooth UI)"})]}),e.jsx(w,{}),e.jsxs(i,{container:!0,spacing:2,children:[e.jsxs(i,{size:{xs:12,sm:6},children:[e.jsx(r,{variant:"overline",color:"text.secondary",children:"Result"}),e.jsx(r,{variant:"h5",sx:{fontFamily:"monospace",wordBreak:"break-all"},children:W.toLocaleString()})]}),e.jsxs(i,{size:{xs:12,sm:6},children:[e.jsx(r,{variant:"overline",color:"text.secondary",children:"Calculation Time"}),e.jsxs(r,{variant:"h5",children:[C.toFixed(2)," ms"]})]})]})]})})})]})})}),e.jsx(w,{sx:{my:4}}),e.jsxs(a,{children:[e.jsx(r,{variant:"h6",gutterBottom:!0,children:"How Web Workers Work"}),e.jsxs(o,{severity:"error",sx:{mb:2},children:[e.jsx(r,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"❌ Problem: Main Thread Blocking"}),e.jsx(r,{variant:"body2",children:"JavaScript is single-threaded. Heavy calculations freeze the UI because the browser can't render while executing code."})]}),e.jsx(b,{title:"Main Thread (Blocks UI)",code:`// ❌ Main Thread (Blocks UI)
function calculateOnMainThread() {
  const result = fibonacci(40); // Blocks for ~1-2 seconds
  console.log(result);
  // UI is frozen during calculation!
}`,language:"typescript"}),e.jsxs(o,{severity:"success",sx:{mb:2,mt:3},children:[e.jsx(r,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"✅ Solution: Web Workers"}),e.jsx(r,{variant:"body2",children:"Web Workers run in a separate thread, allowing heavy calculations without blocking the UI."})]}),e.jsx(b,{title:"Web Worker (Non-blocking)",code:`// ✅ Web Worker (Non-blocking)

// 1. Create worker file: expensiveCalculation.worker.ts
function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

self.onmessage = (e: MessageEvent<number>) => {
  const result = fibonacci(e.data);
  self.postMessage(result); // Send result back
};

// 2. Use worker in component
const worker = new Worker(
  new URL('./expensiveCalculation.worker.ts', import.meta.url),
  { type: 'module' }
);

worker.onmessage = (e) => {
  console.log('Result:', e.data);
  // UI stays responsive during calculation!
};

worker.postMessage(40); // Start calculation`,language:"typescript"}),e.jsx(b,{title:"Thread Architecture",code:`// Thread Architecture:

Main Thread (UI Thread):
├── React rendering
├── User interactions
├── DOM updates
└── Event handling
    ↓ postMessage()

Web Worker Thread:
├── Heavy calculations
├── Data processing
└── Background tasks
    ↓ postMessage()

Main Thread receives result
└── Update UI with result`,language:"typescript"}),e.jsx(b,{title:"When to Use Web Workers",code:`// When to use Web Workers:

✅ Good use cases:
- Heavy computations (image processing, data parsing)
- Complex algorithms (sorting, filtering large datasets)
- Cryptography operations
- Background data synchronization
- Real-time data processing

❌ Don't use for:
- DOM manipulation (workers can't access DOM)
- Quick operations (< 50ms)
- Operations requiring frequent main thread communication
- Small calculations (overhead not worth it)

// Performance tip:
// Workers have startup cost (~10-50ms)
// Reuse workers instead of creating new ones`,language:"typescript"})]}),e.jsx(w,{sx:{my:4}}),e.jsxs(a,{children:[e.jsx(r,{variant:"h6",gutterBottom:!0,children:"Key Concepts"}),e.jsxs(o,{severity:"success",sx:{mb:2},children:[e.jsx(r,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"✅ Benefits of Web Workers"}),e.jsxs(r,{variant:"body2",sx:{mb:1},children:["• ",e.jsx("strong",{children:"Non-blocking:"})," UI stays responsive during heavy calculations"]}),e.jsxs(r,{variant:"body2",sx:{mb:1},children:["• ",e.jsx("strong",{children:"True parallelism:"})," Utilizes multiple CPU cores"]}),e.jsxs(r,{variant:"body2",sx:{mb:1},children:["• ",e.jsx("strong",{children:"Better UX:"})," No frozen UI, smooth animations"]}),e.jsxs(r,{variant:"body2",children:["• ",e.jsx("strong",{children:"Performance:"})," Offload work from main thread"]})]}),e.jsxs(o,{severity:"warning",sx:{mb:2},children:[e.jsx(r,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"⚠️ Limitations"}),e.jsxs(r,{variant:"body2",sx:{mb:1},children:["• ",e.jsx("strong",{children:"No DOM access:"})," Workers can't manipulate the DOM"]}),e.jsxs(r,{variant:"body2",sx:{mb:1},children:["• ",e.jsx("strong",{children:"Communication overhead:"})," Data must be serialized (postMessage)"]}),e.jsxs(r,{variant:"body2",sx:{mb:1},children:["• ",e.jsx("strong",{children:"Startup cost:"})," Creating workers takes ~10-50ms"]}),e.jsxs(r,{variant:"body2",children:["• ",e.jsx("strong",{children:"Memory:"})," Each worker has its own memory space"]})]}),e.jsxs(o,{severity:"info",children:[e.jsx(r,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"💡 Pro Tips"}),e.jsx(r,{variant:"body2",sx:{mb:1},children:"• Reuse workers instead of creating new ones for each task"}),e.jsx(r,{variant:"body2",sx:{mb:1},children:"• Use workers for operations taking > 50ms"}),e.jsx(r,{variant:"body2",sx:{mb:1},children:"• Consider using libraries like Comlink for easier worker communication"}),e.jsxs(r,{variant:"body2",children:["• Terminate workers when done to free memory: ",e.jsx("code",{children:"worker.terminate()"})]})]})]})]})}export{G as default};
