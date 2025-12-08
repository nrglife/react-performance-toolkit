import{ag as O,r as a,ah as G,j as e,f as H,ai as K,aj as D,ak as P,al as L,I as q,am as Y,h as J,g as Q,an as X,ao as F,s as Z,u as _,T as n,G as h,B as d,b as p,d as j,a as C,o as b}from"./index-Schwu1pY.js";import{D as ee,A as m,a as R,C as g}from"./CodeBlock-Decn4p9E.js";const ne=X(),re=O("div",{name:"MuiStack",slot:"Root"});function te(r){return K({props:r,name:"MuiStack",defaultTheme:ne})}function se(r,s){const t=a.Children.toArray(r).filter(Boolean);return t.reduce((o,c,i)=>(o.push(c),i<t.length-1&&o.push(a.cloneElement(s,{key:`separator-${i}`})),o),[])}const oe=r=>({row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"})[r],ie=({ownerState:r,theme:s})=>{let t={display:"flex",flexDirection:"column",...D({theme:s},P({values:r.direction,breakpoints:s.breakpoints.values}),o=>({flexDirection:o}))};if(r.spacing){const o=L(s),c=Object.keys(s.breakpoints.values).reduce((l,u)=>((typeof r.spacing=="object"&&r.spacing[u]!=null||typeof r.direction=="object"&&r.direction[u]!=null)&&(l[u]=!0),l),{}),i=P({values:r.direction,base:c}),v=P({values:r.spacing,base:c});typeof i=="object"&&Object.keys(i).forEach((l,u,k)=>{if(!i[l]){const w=u>0?i[k[u-1]]:"column";i[l]=w}}),t=q(t,D({theme:s},v,(l,u)=>r.useFlexGap?{gap:F(o,l)}:{"& > :not(style):not(style)":{margin:0},"& > :not(style) ~ :not(style)":{[`margin${oe(u?i[u]:r.direction)}`]:F(o,l)}}))}return t=Y(s.breakpoints,t),t};function ae(r={}){const{createStyledComponent:s=re,useThemeProps:t=te,componentName:o="MuiStack"}=r,c=()=>J({root:["root"]},l=>Q(o,l),{}),i=s(ie);return a.forwardRef(function(l,u){const k=t(l),S=G(k),{component:w="div",direction:V="column",spacing:W=0,divider:z,children:B,className:I,useFlexGap:U=!1,...E}=S,A={direction:V,spacing:W,useFlexGap:U},$=c();return e.jsx(i,{as:w,ownerState:A,ref:u,className:H($.root,I),...E,children:z?se(B,z):B})})}const x=ae({createStyledComponent:Z("div",{name:"MuiStack",slot:"Root"}),useThemeProps:r=>_({props:r,name:"MuiStack"})});function f(){const r=a.useRef(0);return r.current+=1,r.current}function y(r=500,s="#ffeb3b"){const t=a.useRef(null),o=a.useRef(0),c=a.useRef(void 0);return a.useEffect(()=>{if(o.current+=1,o.current!==1){if(c.current&&clearTimeout(c.current),t.current){const i=t.current,v=i.style.backgroundColor;i.style.transition="background-color 0.1s ease-in-out",i.style.backgroundColor=s,c.current=setTimeout(()=>{i.style.backgroundColor=v},r)}return()=>{c.current&&clearTimeout(c.current)}}}),{elementRef:t}}const M=a.createContext({theme:"light",toggleTheme:()=>{}});function ce(){const[r,s]=a.useState(0),t=f(),{elementRef:o}=y();return e.jsx(p,{ref:o,sx:{border:"1px solid",borderColor:"divider"},children:e.jsx(j,{children:e.jsxs(x,{spacing:2,children:[e.jsxs(d,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx(n,{variant:"h6",children:"State Component"}),e.jsx(C,{label:`Renders: ${t}`,color:"primary",size:"small",sx:{fontFamily:"monospace"}})]}),e.jsx(n,{variant:"body2",color:"text.secondary",children:"Re-renders when its own state changes"}),e.jsxs(d,{children:[e.jsxs(n,{variant:"body2",sx:{mb:1},children:["Count: ",e.jsx("strong",{children:r})]}),e.jsx(b,{variant:"contained",size:"small",onClick:()=>s(r+1),children:"Increment State"})]})]})})})}function N({value:r}){const s=f(),{elementRef:t}=y();return e.jsx(p,{ref:t,sx:{border:"1px solid",borderColor:"divider"},children:e.jsx(j,{children:e.jsxs(x,{spacing:2,children:[e.jsxs(d,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx(n,{variant:"h6",children:"Prop Child"}),e.jsx(C,{label:`Renders: ${s}`,color:"secondary",size:"small",sx:{fontFamily:"monospace"}})]}),e.jsx(n,{variant:"body2",color:"text.secondary",children:"Re-renders when parent passes new props"}),e.jsxs(n,{variant:"body2",children:["Received value: ",e.jsx("strong",{children:r})]})]})})})}const de=a.memo(N);function le(){const[r,s]=a.useState(0),[t,o]=a.useState(0),c=f(),{elementRef:i}=y();return e.jsx(p,{ref:i,sx:{border:"1px solid",borderColor:"divider"},children:e.jsx(j,{children:e.jsxs(x,{spacing:2,children:[e.jsxs(d,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx(n,{variant:"h6",children:"Prop Parent"}),e.jsx(C,{label:`Renders: ${c}`,color:"info",size:"small",sx:{fontFamily:"monospace"}})]}),e.jsxs(n,{variant:"body2",color:"text.secondary",children:["Parent state: ",e.jsx("strong",{children:r})]}),e.jsxs(x,{direction:"row",spacing:1,children:[e.jsx(b,{variant:"contained",size:"small",onClick:()=>s(r+1),children:"Update Parent Only"}),e.jsx(b,{variant:"contained",size:"small",color:"secondary",onClick:()=>o(t+1),children:"Update Child Prop"})]}),e.jsx(R,{}),e.jsxs(d,{children:[e.jsx(n,{variant:"subtitle2",gutterBottom:!0,children:"Regular Child (re-renders on parent update):"}),e.jsx(N,{value:t})]}),e.jsxs(d,{children:[e.jsx(n,{variant:"subtitle2",gutterBottom:!0,children:"Memoized Child (only re-renders when prop changes):"}),e.jsx(de,{value:t})]})]})})})}function ue(){const{theme:r}=a.useContext(M),s=f(),{elementRef:t}=y();return e.jsx(p,{ref:t,sx:{border:"1px solid",borderColor:"divider"},children:e.jsx(j,{children:e.jsxs(x,{spacing:2,children:[e.jsxs(d,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx(n,{variant:"h6",children:"Context Consumer"}),e.jsx(C,{label:`Renders: ${s}`,color:"success",size:"small",sx:{fontFamily:"monospace"}})]}),e.jsx(n,{variant:"body2",color:"text.secondary",children:"Re-renders when context value changes"}),e.jsxs(n,{variant:"body2",children:["Current theme: ",e.jsx("strong",{children:r})]})]})})})}const he=a.memo(function(){const s=f(),{elementRef:t}=y();return e.jsx(p,{ref:t,sx:{border:"1px solid",borderColor:"divider"},children:e.jsx(j,{children:e.jsxs(x,{spacing:2,children:[e.jsxs(d,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx(n,{variant:"h6",children:"Non-Consumer (Memoized)"}),e.jsx(C,{label:`Renders: ${s}`,color:"default",size:"small",sx:{fontFamily:"monospace"}})]}),e.jsx(n,{variant:"body2",color:"text.secondary",children:"Doesn't consume context + memoized (won't re-render)"})]})})})});function xe(){const[r,s]=a.useState("light"),t=()=>{s(o=>o==="light"?"dark":"light")};return e.jsx(M.Provider,{value:{theme:r,toggleTheme:t},children:e.jsx(p,{children:e.jsx(j,{children:e.jsxs(x,{spacing:3,children:[e.jsxs(d,{children:[e.jsx(n,{variant:"h6",gutterBottom:!0,children:"Context Provider"}),e.jsxs(n,{variant:"body2",color:"text.secondary",sx:{mb:2},children:["Current theme: ",e.jsx("strong",{children:r})]}),e.jsx(b,{variant:"contained",onClick:t,fullWidth:!0,children:"Toggle Theme Context"})]}),e.jsx(R,{}),e.jsxs(d,{children:[e.jsx(n,{variant:"subtitle2",gutterBottom:!0,sx:{mb:2},children:"Components inside this provider:"}),e.jsxs(h,{container:!0,spacing:2,children:[e.jsx(h,{size:{xs:12,md:6},children:e.jsx(ue,{})}),e.jsx(h,{size:{xs:12,md:6},children:e.jsx(he,{})})]})]})]})})})})}function je(){return e.jsxs(ee,{title:"Re-render Visualizer Demo",description:"See WHY React components re-render with visual flash effects and render counters",children:[e.jsxs(m,{severity:"info",sx:{mb:3},children:[e.jsx(n,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"🎯 Try This: Click the buttons and watch components flash"}),e.jsxs(n,{variant:"body2",sx:{mb:1},children:["Components flash ",e.jsx("strong",{children:"yellow"})," when they re-render. Watch the render counters increase!"]}),e.jsx(n,{variant:"body2",sx:{fontStyle:"italic",fontSize:"0.875rem"},children:"💡 Notice: Some components re-render even when their data doesn't change"})]}),e.jsxs(m,{severity:"warning",sx:{mb:3},children:[e.jsx(n,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"📚 The 3 Reasons React Re-renders:"}),e.jsxs(n,{variant:"body2",sx:{mb:1},children:["1. ",e.jsx("strong",{children:"State changes"})," - Component's own useState/useReducer updates"]}),e.jsxs(n,{variant:"body2",sx:{mb:1},children:["2. ",e.jsx("strong",{children:"Prop changes"})," - Parent passes new props (or parent re-renders)"]}),e.jsxs(n,{variant:"body2",children:["3. ",e.jsx("strong",{children:"Context changes"})," - useContext value updates"]})]}),e.jsxs(h,{container:!0,spacing:3,sx:{mb:3},children:[e.jsx(h,{size:{xs:12,md:6},children:e.jsx(ce,{})}),e.jsx(h,{size:{xs:12,md:6},children:e.jsx(le,{})})]}),e.jsxs(d,{sx:{mb:3},children:[e.jsx(n,{variant:"h6",gutterBottom:!0,children:"Context-Based Re-renders"}),e.jsxs(m,{severity:"info",sx:{mb:2},children:[e.jsxs(n,{variant:"body2",sx:{mb:1},children:[e.jsx("strong",{children:"Key Point:"})," The Non-Consumer is ",e.jsx("strong",{children:"memoized with React.memo"})]}),e.jsx(n,{variant:"body2",children:"Without memo, it would re-render when its parent re-renders (even though it doesn't use context). With memo, it only re-renders if its props change."})]}),e.jsx(xe,{})]}),e.jsx(h,{container:!0,spacing:3,sx:{mb:3}}),e.jsx(R,{sx:{my:4}}),e.jsxs(d,{children:[e.jsx(n,{variant:"h6",gutterBottom:!0,children:"Understanding Re-renders"}),e.jsx(g,{title:"1️⃣ State-Based Re-renders",code:`function StateComponent() {
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
// ❌ Doesn't re-render when: parent re-renders (if memoized)`,language:"typescript"}),e.jsx(g,{title:"2️⃣ Prop-Based Re-renders",code:`function Parent() {
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
// Now only re-renders when value actually changes`,language:"typescript"}),e.jsx(g,{title:"3️⃣ Context-Based Re-renders",code:`const ThemeContext = createContext({ theme: 'light' });

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
// 💡 Without memo, NonConsumer would re-render when parent re-renders!`,language:"typescript"}),e.jsx(g,{title:"🎨 Visual Flash Effect Hook",code:`function useRenderFlash(duration = 500, color = '#ffeb3b') {
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
}`,language:"typescript"})]}),e.jsx(R,{sx:{my:4}}),e.jsxs(d,{children:[e.jsx(n,{variant:"h6",gutterBottom:!0,children:"Key Takeaways"}),e.jsxs(m,{severity:"success",sx:{mb:2},children:[e.jsx(n,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"✅ When Re-renders Are Good"}),e.jsx(n,{variant:"body2",sx:{mb:1},children:"• State changes that affect what's displayed"}),e.jsx(n,{variant:"body2",sx:{mb:1},children:"• Prop changes that require UI updates"}),e.jsx(n,{variant:"body2",children:"• Context changes that components actually use"})]}),e.jsxs(m,{severity:"warning",sx:{mb:2},children:[e.jsx(n,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"⚠️ When Re-renders Are Wasteful"}),e.jsx(n,{variant:"body2",sx:{mb:1},children:"• Parent re-renders but child props haven't changed → Use React.memo"}),e.jsx(n,{variant:"body2",sx:{mb:1},children:"• Expensive calculations run on every render → Use useMemo"}),e.jsx(n,{variant:"body2",children:"• Functions recreated on every render → Use useCallback"})]}),e.jsxs(m,{severity:"error",children:[e.jsx(n,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"❌ Common Mistakes"}),e.jsxs(n,{variant:"body2",sx:{mb:1},children:["• ",e.jsx("strong",{children:"Over-optimizing:"})," Don't memo everything! Only optimize when needed."]}),e.jsxs(n,{variant:"body2",sx:{mb:1},children:["• ",e.jsx("strong",{children:"Context overuse:"})," Putting everything in context causes widespread re-renders."]}),e.jsxs(n,{variant:"body2",children:["• ",e.jsx("strong",{children:"Inline objects/arrays as props:"})," Creates new references every render."]})]})]})]})}export{je as default};
