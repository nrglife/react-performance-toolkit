import{j as e,l,g as n,p,r as j,o as h,h as x,i as f,O as z,P as F,Q as S,U as A,V as P,W as d,X as I,s as g,D as w,N as y}from"./mui-vendor-BcogAy2T.js";import{r as a}from"./react-vendor-bYt7__KG.js";import{D as E,C as v}from"./CodeBlock-DwP4a17t.js";import"./index-C8ZS78_l.js";import"./tanstack-query-qmwwa--H.js";function B({count:t}){let i=0;for(let o=0;o<t*2e5;o++)i+=Math.sqrt(o)*Math.sin(o)*Math.cos(o);const s=Array.from({length:t*1e3},(o,u)=>({id:u,value:Math.random()*100})).reduce((o,u)=>o+u.value,0);return e.jsxs(x,{sx:{p:2,border:1,borderColor:"divider",borderRadius:1,bgcolor:"background.paper"},children:[e.jsx(n,{variant:"h6",sx:{mb:1},children:"Expensive Component"}),e.jsxs(n,{variant:"body2",color:"text.secondary",sx:{mb:1},children:["Performed ",(t*2e5).toLocaleString()," calculations"]}),e.jsxs(n,{variant:"body2",sx:{mb:.5},children:["Count: ",e.jsx("strong",{children:t})]}),e.jsxs(n,{variant:"caption",color:"text.secondary",children:["Result: ",i.toFixed(2)," | Sum: ",s.toFixed(2)]})]})}function H({value:t}){return e.jsxs(x,{sx:{p:2,border:1,borderColor:"divider",borderRadius:1,bgcolor:"background.paper"},children:[e.jsx(n,{variant:"h6",sx:{mb:1},children:"Fast Component"}),e.jsx(n,{variant:"body2",color:"text.secondary",sx:{mb:1},children:"Minimal rendering work"}),e.jsxs(n,{variant:"body2",children:["Value: ",e.jsx("strong",{children:t})]})]})}function L({onRender:t}){const[i,c]=a.useState(1),[s,o]=a.useState(!0);return e.jsxs(y,{spacing:2,children:[e.jsx(n,{variant:"subtitle2",children:"Expensive Component"}),e.jsxs(n,{variant:"body2",color:"text.secondary",children:["Current count: ",e.jsx("strong",{children:i})]}),e.jsxs(y,{direction:"row",spacing:1,children:[e.jsx(f,{variant:"contained",onClick:()=>c(i+1),disabled:!s,fullWidth:!0,children:"Increment (Update)"}),e.jsx(f,{variant:"outlined",onClick:()=>o(!s),color:s?"error":"success",fullWidth:!0,children:s?"Unmount":"Mount"})]}),s&&e.jsx(a.Profiler,{id:"ExpensiveComponent",onRender:t,children:e.jsx(B,{count:i})}),!s&&e.jsx(l,{severity:"info",sx:{mt:2},children:'Component unmounted. Click "Mount" to see the mount phase in profiler!'})]})}function $({onRender:t}){const[i,c]=a.useState("Hello"),[s,o]=a.useState(!0);return e.jsxs(y,{spacing:2,children:[e.jsx(n,{variant:"subtitle2",children:"Fast Component"}),e.jsxs(n,{variant:"body2",color:"text.secondary",children:["Current value: ",e.jsx("strong",{children:i})]}),e.jsxs(y,{direction:"row",spacing:1,children:[e.jsx(f,{variant:"contained",color:"secondary",onClick:()=>c(i==="Hello"?"World":"Hello"),disabled:!s,fullWidth:!0,children:"Toggle (Update)"}),e.jsx(f,{variant:"outlined",onClick:()=>o(!s),color:s?"error":"success",fullWidth:!0,children:s?"Unmount":"Mount"})]}),s&&e.jsx(a.Profiler,{id:"FastComponent",onRender:t,children:e.jsx(H,{value:i})}),!s&&e.jsx(l,{severity:"info",sx:{mt:2},children:'Component unmounted. Click "Mount" to see the mount phase in profiler!'})]})}function X(){const[t,i]=a.useState([]),c=a.useRef(!1),s=a.useRef(0),o=a.useRef(0),u=a.useCallback((r,m,W,M,U,C)=>{if(r!=="ExpensiveComponent"&&r!=="FastComponent"||C===s.current||(s.current=C,c.current))return;o.current+=1;const D={renderNumber:o.current,id:r,phase:m,actualDuration:W,baseDuration:M,startTime:U,commitTime:C,timestamp:new Date().toLocaleTimeString()};c.current=!0,setTimeout(()=>{i(b=>b.length>0&&b[0].commitTime===D.commitTime?(c.current=!1,b):[D,...b].slice(0,10)),setTimeout(()=>{c.current=!1},50)},0)},[]),R=()=>{i([]),o.current=0},T=r=>{switch(r){case"mount":return"success";case"update":return"primary";case"nested-update":return"warning";default:return"default"}},k=r=>r<1?"success":r<5?"warning":"error";return e.jsxs(E,{title:"React Profiler Demo",description:"Learn how to use React's built-in Profiler API to measure component render performance",children:[e.jsxs(l,{severity:"info",sx:{mb:3},children:[e.jsx(n,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"🎯 Try This: Understand Mount vs Update phases"}),e.jsxs(n,{variant:"body2",sx:{mb:1},children:["• ",e.jsx("strong",{children:"Update Phase:"}),' Click "Increment" or "Toggle" buttons - component re-renders (already exists)']}),e.jsxs(n,{variant:"body2",sx:{mb:1},children:["• ",e.jsx("strong",{children:"Mount Phase:"}),' Click "Unmount" then "Mount" - component is created from scratch']}),e.jsx(n,{variant:"body2",sx:{fontStyle:"italic",fontSize:"0.875rem",mt:1},children:"💡 Mount is usually slower than update because React has to create the entire component tree!"})]}),e.jsxs(l,{severity:"success",sx:{mb:3},children:[e.jsx(n,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"✅ Lightweight Component Profiling"}),e.jsxs(n,{variant:"body2",sx:{mb:1},children:["The profiled components use ",e.jsx("strong",{children:"Box + Typography"})," instead of Card/CardContent. Why?"]}),e.jsx(n,{variant:"body2",sx:{mb:1},children:"• Card/CardContent add ~3-5ms overhead that masks the actual performance difference"}),e.jsxs(n,{variant:"body2",sx:{mb:1},children:["• Lightweight components let you see the ",e.jsx("strong",{children:"pure calculation cost"})]}),e.jsx(n,{variant:"body2",sx:{fontWeight:"bold",mt:1},children:"💡 Now you'll see: FastComponent ~1-2ms vs ExpensiveComponent 10-30ms - a clear 10-15x difference!"})]}),e.jsx(p,{sx:{mb:3},children:e.jsx(j,{children:e.jsxs(h,{container:!0,spacing:3,children:[e.jsx(h,{size:{xs:12,md:6},children:e.jsx(L,{onRender:u})}),e.jsx(h,{size:{xs:12,md:6},children:e.jsx($,{onRender:u})})]})})}),e.jsxs(x,{sx:{mb:3},children:[e.jsxs(x,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center",mb:2},children:[e.jsx(n,{variant:"h6",children:"Profiler Data (Last 10 Renders)"}),e.jsx(f,{variant:"outlined",size:"small",onClick:R,children:"Clear Data"})]}),e.jsxs(l,{severity:"warning",sx:{mb:2},children:[e.jsx(n,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"📊 How to Read This Data"}),e.jsxs(n,{variant:"body2",sx:{mb:1},children:["• ",e.jsx("strong",{children:"#:"})," Sequential render number - higher numbers are more recent"]}),e.jsxs(n,{variant:"body2",sx:{mb:1},children:["• ",e.jsx("strong",{children:"Phase:"}),' "mount" (green) = first render, "update" (blue) = re-render']}),e.jsxs(n,{variant:"body2",sx:{mb:1},children:["• ",e.jsx("strong",{children:"Duration (ms):"})," Green = fast (<1ms), Yellow = medium (1-5ms), Red = slow (>5ms)"]}),e.jsx(n,{variant:"body2",sx:{fontStyle:"italic",fontSize:"0.875rem"},children:'💡 To see "mount" phase: Click "Unmount" then "Mount" button!'})]}),t.length===0?e.jsx(l,{severity:"info",children:"No profiler data yet. Click the buttons above to trigger renders and see profiling data appear here."}):e.jsxs(e.Fragment,{children:[e.jsxs(h,{container:!0,spacing:2,sx:{mb:2},children:[e.jsx(h,{size:{xs:12,sm:3},children:e.jsx(p,{variant:"outlined",children:e.jsxs(j,{children:[e.jsx(n,{variant:"caption",color:"text.secondary",children:"Total Renders"}),e.jsx(n,{variant:"h4",children:t.length}),e.jsx(n,{variant:"caption",color:"text.secondary",children:"Tracked"})]})})}),e.jsx(h,{size:{xs:12,sm:3},children:e.jsx(p,{variant:"outlined",children:e.jsxs(j,{children:[e.jsx(n,{variant:"caption",color:"text.secondary",children:"Avg Duration"}),e.jsxs(n,{variant:"h4",children:[(t.reduce((r,m)=>r+m.actualDuration,0)/t.length).toFixed(2),"ms"]}),e.jsx(n,{variant:"caption",color:"text.secondary",children:"Per render"})]})})}),e.jsx(h,{size:{xs:12,sm:3},children:e.jsx(p,{variant:"outlined",children:e.jsxs(j,{children:[e.jsx(n,{variant:"caption",color:"text.secondary",children:"Slowest Render"}),e.jsxs(n,{variant:"h4",children:[Math.max(...t.map(r=>r.actualDuration)).toFixed(2),"ms"]}),e.jsx(n,{variant:"caption",color:"text.secondary",children:"Peak time"})]})})}),e.jsx(h,{size:{xs:12,sm:3},children:e.jsx(p,{variant:"outlined",children:e.jsxs(j,{children:[e.jsx(n,{variant:"caption",color:"text.secondary",children:"Mount vs Update"}),e.jsxs(n,{variant:"h4",children:[t.filter(r=>r.phase==="mount").length," / ",t.filter(r=>r.phase==="update").length]}),e.jsx(n,{variant:"caption",color:"text.secondary",children:"Ratio"})]})})})]}),e.jsxs(l,{severity:"info",sx:{mb:2},children:[e.jsx(n,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"📊 Insights You Can Derive from Profiler Data:"}),e.jsxs(n,{variant:"body2",sx:{mb:.5},children:["• ",e.jsx("strong",{children:"Render Frequency:"})," How often components re-render (count)"]}),e.jsxs(n,{variant:"body2",sx:{mb:.5},children:["• ",e.jsx("strong",{children:"Performance Trends:"})," Is it getting slower over time? (compare durations)"]}),e.jsxs(n,{variant:"body2",sx:{mb:.5},children:["• ",e.jsx("strong",{children:"Mount Cost:"})," How expensive is initial render vs updates?"]}),e.jsxs(n,{variant:"body2",sx:{mb:.5},children:["• ",e.jsx("strong",{children:"Render Timing:"})," When do renders happen? (commitTime)"]}),e.jsxs(n,{variant:"body2",children:["• ",e.jsx("strong",{children:"Bottlenecks:"})," Which component is the slowest? (compare IDs)"]})]}),e.jsx(z,{component:F,children:e.jsxs(S,{size:"small",children:[e.jsx(A,{children:e.jsxs(P,{children:[e.jsx(d,{align:"center",children:"#"}),e.jsx(d,{children:"Time"}),e.jsx(d,{children:"Component"}),e.jsx(d,{children:"Phase"}),e.jsx(d,{align:"right",children:e.jsxs(x,{children:[e.jsx(n,{variant:"caption",sx:{fontWeight:"bold"},children:"Duration (ms)"}),e.jsx(n,{variant:"caption",display:"block",color:"text.secondary",children:"(Render time)"})]})})]})}),e.jsx(I,{children:t.map((r,m)=>e.jsxs(P,{children:[e.jsx(d,{align:"center",children:e.jsx(g,{label:r.renderNumber,size:"small",color:"default",sx:{fontFamily:"monospace",fontWeight:"bold"}})}),e.jsx(d,{children:r.timestamp}),e.jsx(d,{children:e.jsx(g,{label:r.id,size:"small"})}),e.jsx(d,{children:e.jsx(g,{label:r.phase,size:"small",color:T(r.phase)})}),e.jsx(d,{align:"right",children:e.jsx(g,{label:`${r.actualDuration.toFixed(2)} ms`,size:"small",color:k(r.actualDuration),sx:{fontFamily:"monospace"}})})]},`${r.id}-${r.commitTime}-${m}`))})]})})]})]}),e.jsx(w,{sx:{my:4}}),e.jsxs(x,{children:[e.jsx(n,{variant:"h6",gutterBottom:!0,children:"How to Use React Profiler"}),e.jsx(v,{title:"Basic Profiler Usage",code:`import { Profiler } from 'react';

function MyComponent() {
  const onRender = (
    id,                   // Profiler id
    phase,                // "mount" or "update"
    actualDuration,       // Time spent rendering
    baseDuration,         // Estimated time without memoization
    startTime,            // When render started
    commitTime            // When React committed changes
  ) => {
    console.log(\`\${id} took \${actualDuration}ms to \${phase}\`);
  };

  return (
    <Profiler id="MyComponent" onRender={onRender}>
      <ExpensiveComponent />
    </Profiler>
  );
}`,language:"typescript"}),e.jsx(v,{title:"Understanding the Metrics",code:`// Key Profiler insights:

1. actualDuration (ms):
   - Time spent rendering
   - Identify slow components
   - Track performance trends over time
   - Compare different components

2. phase:
   - "mount": First render (usually slower)
   - "update": Re-render (usually faster)
   - Understand component lifecycle

3. Derived insights:
   - Render frequency (how often?)
   - Performance degradation (getting slower?)
   - Mount vs update cost comparison
   - Component comparison (which is slowest?)`,language:"typescript"}),e.jsx(v,{title:"Real-World Profiler Applications",code:`// Real-world Profiler usage:

// 1. Track performance in production
function sendToAnalytics(id, phase, actualDuration) {
  if (actualDuration > 50) { // Only track slow renders
    analytics.track('slow_render', {
      component: id,
      duration: actualDuration,
      phase: phase,
      timestamp: Date.now()
    });
  }
}

<Profiler id="UserDashboard" onRender={sendToAnalytics}>
  <UserDashboard />
</Profiler>

// 2. Performance regression testing
test('Dashboard renders in under 100ms', () => {
  let duration = 0;
  const onRender = (id, phase, actualDuration) => {
    duration = actualDuration;
  };

  render(
    <Profiler id="Dashboard" onRender={onRender}>
      <Dashboard />
    </Profiler>
  );

  expect(duration).toBeLessThan(100);
});

// 3. A/B testing performance
function trackPerformance(id, phase, actualDuration) {
  if (isVariantA) {
    trackMetric('variant_a_render', actualDuration);
  } else {
    trackMetric('variant_b_render', actualDuration);
  }
}`,language:"typescript"}),e.jsx(v,{title:"When to Use Profiler",code:`// When to use React Profiler:

✅ Good use cases:
- Identifying slow components in production
- Measuring impact of optimizations
- Finding unnecessary re-renders
- Performance regression testing

❌ Don't use for:
- Every component (adds overhead)
- Development-only debugging (use React DevTools instead)
- Micro-optimizations (< 1ms differences)

// Production usage:
<Profiler id="App" onRender={sendToAnalytics}>
  <App />
</Profiler>`,language:"typescript"})]}),e.jsx(w,{sx:{my:4}}),e.jsxs(x,{children:[e.jsx(n,{variant:"h6",gutterBottom:!0,children:"Key Concepts"}),e.jsxs(l,{severity:"success",sx:{mb:2},children:[e.jsx(n,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"✅ What Profiler Tells You"}),e.jsxs(n,{variant:"body2",sx:{mb:1},children:["• ",e.jsx("strong",{children:"Duration:"})," How long the render took in milliseconds"]}),e.jsxs(n,{variant:"body2",sx:{mb:1},children:["• ",e.jsx("strong",{children:"Phase:"})," Whether it's a mount (first render) or update (re-render)"]}),e.jsxs(n,{variant:"body2",sx:{mb:1},children:["• ",e.jsx("strong",{children:"Trends:"})," Watch how duration changes as data grows (like incrementing count)"]}),e.jsxs(n,{variant:"body2",children:["• ",e.jsx("strong",{children:"Comparison:"})," Compare different components to find bottlenecks"]})]}),e.jsxs(l,{severity:"warning",sx:{mb:2},children:[e.jsx(n,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"⚠️ Important Notes"}),e.jsx(n,{variant:"body2",sx:{mb:1},children:"• Profiler adds overhead - don't wrap every component"}),e.jsx(n,{variant:"body2",sx:{mb:1},children:"• Use React DevTools Profiler for development debugging"}),e.jsx(n,{variant:"body2",children:"• Use this API for production monitoring and analytics"})]}),e.jsxs(l,{severity:"info",children:[e.jsx(n,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"💡 Pro Tips"}),e.jsx(n,{variant:"body2",sx:{mb:1},children:"• Wrap components at different levels to isolate performance issues"}),e.jsx(n,{variant:"body2",sx:{mb:1},children:"• Send profiler data to analytics to track performance in production"}),e.jsx(n,{variant:"body2",children:"• Compare actualDuration before and after optimizations to measure impact"})]})]})]})}export{X as default};
