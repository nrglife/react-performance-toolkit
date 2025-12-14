import{j as e,l as h,g as n,o as c,h as i,D as v,p as x,r as m,N as l,s as j,i as b}from"./mui-vendor-BcogAy2T.js";import{r as o}from"./react-vendor-bYt7__KG.js";import{D as w,C as f}from"./CodeBlock-DwP4a17t.js";import"./index-C8ZS78_l.js";import"./tanstack-query-qmwwa--H.js";function C(){const r=o.useRef(0);return r.current+=1,r.current}function p(r=500,s="#ffeb3b"){const t=o.useRef(null),d=o.useRef(0),a=o.useRef(void 0);return o.useEffect(()=>{if(d.current+=1,d.current!==1){if(a.current&&clearTimeout(a.current),t.current){const u=t.current,R=u.style.backgroundColor;u.style.transition="background-color 0.1s ease-in-out",u.style.backgroundColor=s,a.current=setTimeout(()=>{u.style.backgroundColor=R},r)}return()=>{a.current&&clearTimeout(a.current)}}}),{elementRef:t}}const g=o.createContext({theme:"light",toggleTheme:()=>{}});function z(){const[r,s]=o.useState(0),t=C(),{elementRef:d}=p();return e.jsx(x,{ref:d,sx:{border:"1px solid",borderColor:"divider"},children:e.jsx(m,{children:e.jsxs(l,{spacing:2,children:[e.jsxs(i,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx(n,{variant:"h6",children:"State Component"}),e.jsx(j,{label:`Renders: ${t}`,color:"primary",size:"small",sx:{fontFamily:"monospace"}})]}),e.jsx(n,{variant:"body2",color:"text.secondary",children:"Re-renders when its own state changes"}),e.jsxs(i,{children:[e.jsxs(n,{variant:"body2",sx:{mb:1},children:["Count: ",e.jsx("strong",{children:r})]}),e.jsx(b,{variant:"contained",size:"small",onClick:()=>s(r+1),children:"Increment State"})]})]})})})}function y({value:r}){const s=C(),{elementRef:t}=p();return e.jsx(x,{ref:t,sx:{border:"1px solid",borderColor:"divider"},children:e.jsx(m,{children:e.jsxs(l,{spacing:2,children:[e.jsxs(i,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx(n,{variant:"h6",children:"Prop Child"}),e.jsx(j,{label:`Renders: ${s}`,color:"secondary",size:"small",sx:{fontFamily:"monospace"}})]}),e.jsx(n,{variant:"body2",color:"text.secondary",children:"Re-renders when parent passes new props"}),e.jsxs(n,{variant:"body2",children:["Received value: ",e.jsx("strong",{children:r})]})]})})})}const T=o.memo(y);function P(){const[r,s]=o.useState(0),[t,d]=o.useState(0),a=C(),{elementRef:u}=p();return e.jsx(x,{ref:u,sx:{border:"1px solid",borderColor:"divider"},children:e.jsx(m,{children:e.jsxs(l,{spacing:2,children:[e.jsxs(i,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx(n,{variant:"h6",children:"Prop Parent"}),e.jsx(j,{label:`Renders: ${a}`,color:"info",size:"small",sx:{fontFamily:"monospace"}})]}),e.jsxs(n,{variant:"body2",color:"text.secondary",children:["Parent state: ",e.jsx("strong",{children:r})]}),e.jsxs(l,{direction:"row",spacing:1,children:[e.jsx(b,{variant:"contained",size:"small",onClick:()=>s(r+1),children:"Update Parent Only"}),e.jsx(b,{variant:"contained",size:"small",color:"secondary",onClick:()=>d(t+1),children:"Update Child Prop"})]}),e.jsx(v,{}),e.jsxs(i,{children:[e.jsx(n,{variant:"subtitle2",gutterBottom:!0,children:"Regular Child (re-renders on parent update):"}),e.jsx(y,{value:t})]}),e.jsxs(i,{children:[e.jsx(n,{variant:"subtitle2",gutterBottom:!0,children:"Memoized Child (only re-renders when prop changes):"}),e.jsx(T,{value:t})]})]})})})}function k(){const{theme:r}=o.useContext(g),s=C(),{elementRef:t}=p();return e.jsx(x,{ref:t,sx:{border:"1px solid",borderColor:"divider"},children:e.jsx(m,{children:e.jsxs(l,{spacing:2,children:[e.jsxs(i,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx(n,{variant:"h6",children:"Context Consumer"}),e.jsx(j,{label:`Renders: ${s}`,color:"success",size:"small",sx:{fontFamily:"monospace"}})]}),e.jsx(n,{variant:"body2",color:"text.secondary",children:"Re-renders when context value changes"}),e.jsxs(n,{variant:"body2",children:["Current theme: ",e.jsx("strong",{children:r})]})]})})})}const S=o.memo(function(){const s=C(),{elementRef:t}=p();return e.jsx(x,{ref:t,sx:{border:"1px solid",borderColor:"divider"},children:e.jsx(m,{children:e.jsxs(l,{spacing:2,children:[e.jsxs(i,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx(n,{variant:"h6",children:"Non-Consumer (Memoized)"}),e.jsx(j,{label:`Renders: ${s}`,color:"default",size:"small",sx:{fontFamily:"monospace"}})]}),e.jsx(n,{variant:"body2",color:"text.secondary",children:"Doesn't consume context + memoized (won't re-render)"})]})})})});function B(){const[r,s]=o.useState("light"),t=()=>{s(d=>d==="light"?"dark":"light")};return e.jsx(g.Provider,{value:{theme:r,toggleTheme:t},children:e.jsx(x,{children:e.jsx(m,{children:e.jsxs(l,{spacing:3,children:[e.jsxs(i,{children:[e.jsx(n,{variant:"h6",gutterBottom:!0,children:"Context Provider"}),e.jsxs(n,{variant:"body2",color:"text.secondary",sx:{mb:2},children:["Current theme: ",e.jsx("strong",{children:r})]}),e.jsx(b,{variant:"contained",onClick:t,fullWidth:!0,children:"Toggle Theme Context"})]}),e.jsx(v,{}),e.jsxs(i,{children:[e.jsx(n,{variant:"subtitle2",gutterBottom:!0,sx:{mb:2},children:"Components inside this provider:"}),e.jsxs(c,{container:!0,spacing:2,children:[e.jsx(c,{size:{xs:12,md:6},children:e.jsx(k,{})}),e.jsx(c,{size:{xs:12,md:6},children:e.jsx(S,{})})]})]})]})})})})}function M(){return e.jsxs(w,{title:"Re-render Visualizer Demo",description:"See WHY React components re-render with visual flash effects and render counters",children:[e.jsxs(h,{severity:"info",sx:{mb:3},children:[e.jsx(n,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"🎯 Try This: Click the buttons and watch components flash"}),e.jsxs(n,{variant:"body2",sx:{mb:1},children:["Components flash ",e.jsx("strong",{children:"yellow"})," when they re-render. Watch the render counters increase!"]}),e.jsx(n,{variant:"body2",sx:{fontStyle:"italic",fontSize:"0.875rem"},children:"💡 Notice: Some components re-render even when their data doesn't change"})]}),e.jsxs(h,{severity:"warning",sx:{mb:3},children:[e.jsx(n,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"📚 The 3 Reasons React Re-renders:"}),e.jsxs(n,{variant:"body2",sx:{mb:1},children:["1. ",e.jsx("strong",{children:"State changes"})," - Component's own useState/useReducer updates"]}),e.jsxs(n,{variant:"body2",sx:{mb:1},children:["2. ",e.jsx("strong",{children:"Prop changes"})," - Parent passes new props (or parent re-renders)"]}),e.jsxs(n,{variant:"body2",children:["3. ",e.jsx("strong",{children:"Context changes"})," - useContext value updates"]})]}),e.jsxs(c,{container:!0,spacing:3,sx:{mb:3},children:[e.jsx(c,{size:{xs:12,md:6},children:e.jsx(z,{})}),e.jsx(c,{size:{xs:12,md:6},children:e.jsx(P,{})})]}),e.jsxs(i,{sx:{mb:3},children:[e.jsx(n,{variant:"h6",gutterBottom:!0,children:"Context-Based Re-renders"}),e.jsxs(h,{severity:"info",sx:{mb:2},children:[e.jsxs(n,{variant:"body2",sx:{mb:1},children:[e.jsx("strong",{children:"Key Point:"})," The Non-Consumer is ",e.jsx("strong",{children:"memoized with React.memo"})]}),e.jsx(n,{variant:"body2",children:"Without memo, it would re-render when its parent re-renders (even though it doesn't use context). With memo, it only re-renders if its props change."})]}),e.jsx(B,{})]}),e.jsx(c,{container:!0,spacing:3,sx:{mb:3}}),e.jsx(v,{sx:{my:4}}),e.jsxs(i,{children:[e.jsx(n,{variant:"h6",gutterBottom:!0,children:"Understanding Re-renders"}),e.jsx(f,{title:"1️⃣ State-Based Re-renders",code:`function StateComponent() {
  const [count, setCount] = useState(0);
  const renderCount = useRenderCount();

  return (
    <div>
      <p>Renders: {renderCount}</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

// ✅ Re-renders when: count state changes
// ❌ Doesn't re-render when: parent re-renders (if memoized)`,language:"typescript"}),e.jsx(f,{title:"2️⃣ Prop-Based Re-renders",code:`function Parent() {
  const [value, setValue] = useState(0);
  return <Child value={value} />;
}

function Child({ value }) {
  const renderCount = useRenderCount();
  return <div>Renders: {renderCount}, Value: {value}</div>;
}

// ✅ Child re-renders when: value prop changes
// ✅ Child re-renders when: parent re-renders (even if props same!)
// 💡 Use React.memo to prevent unnecessary re-renders:

const MemoizedChild = memo(Child);
// Now only re-renders when value actually changes`,language:"typescript"}),e.jsx(f,{title:"3️⃣ Context-Based Re-renders",code:`const ThemeContext = createContext({ theme: 'light' });

function ContextConsumer() {
  const { theme } = useContext(ThemeContext);
  const renderCount = useRenderCount();
  return <div>Renders: {renderCount}, Theme: {theme}</div>;
}

// IMPORTANT: Memoize to prevent re-renders when parent re-renders
const NonConsumer = memo(function NonConsumer() {
  const renderCount = useRenderCount();
  return <div>Renders: {renderCount}</div>;
});

function ContextDemo() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme }}>
      <ContextConsumer />  {/* Re-renders on theme change */}
      <NonConsumer />      {/* Doesn't re-render (memoized) */}
    </ThemeContext.Provider>
  );
}

// ✅ Consumer re-renders when: context value changes
// ❌ Non-consumer doesn't re-render: memoized + no context usage
// 💡 Without memo, NonConsumer would re-render when parent re-renders!`,language:"typescript"}),e.jsx(f,{title:"🎨 Visual Flash Effect Hook",code:`function useRenderFlash(duration = 500, color = '#ffeb3b') {
  const elementRef = useRef<HTMLDivElement>(null);
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;

    // Skip flash on initial render
    if (renderCount.current === 1) return;

    // Apply flash effect
    if (elementRef.current) {
      elementRef.current.style.backgroundColor = color;
      setTimeout(() => {
        elementRef.current.style.backgroundColor = '';
      }, duration);
    }
  });

  return { elementRef };
}

// Usage:
function MyComponent() {
  const { elementRef } = useRenderFlash();
  return <div ref={elementRef}>I flash on re-render!</div>;
}`,language:"typescript"})]}),e.jsx(v,{sx:{my:4}}),e.jsxs(i,{children:[e.jsx(n,{variant:"h6",gutterBottom:!0,children:"Key Takeaways"}),e.jsxs(h,{severity:"success",sx:{mb:2},children:[e.jsx(n,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"✅ When Re-renders Are Good"}),e.jsx(n,{variant:"body2",sx:{mb:1},children:"• State changes that affect what's displayed"}),e.jsx(n,{variant:"body2",sx:{mb:1},children:"• Prop changes that require UI updates"}),e.jsx(n,{variant:"body2",children:"• Context changes that components actually use"})]}),e.jsxs(h,{severity:"warning",sx:{mb:2},children:[e.jsx(n,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"⚠️ When Re-renders Are Wasteful"}),e.jsx(n,{variant:"body2",sx:{mb:1},children:"• Parent re-renders but child props haven't changed → Use React.memo"}),e.jsx(n,{variant:"body2",sx:{mb:1},children:"• Expensive calculations run on every render → Use useMemo"}),e.jsx(n,{variant:"body2",children:"• Functions recreated on every render → Use useCallback"})]}),e.jsxs(h,{severity:"error",children:[e.jsx(n,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"❌ Common Mistakes"}),e.jsxs(n,{variant:"body2",sx:{mb:1},children:["• ",e.jsx("strong",{children:"Over-optimizing:"})," Don't memo everything! Only optimize when needed."]}),e.jsxs(n,{variant:"body2",sx:{mb:1},children:["• ",e.jsx("strong",{children:"Context overuse:"})," Putting everything in context causes widespread re-renders."]}),e.jsxs(n,{variant:"body2",children:["• ",e.jsx("strong",{children:"Inline objects/arrays as props:"})," Creates new references every render."]})]})]})]})}export{M as default};
