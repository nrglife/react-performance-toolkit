import{j as e,i,q as p,r as x,h as s,m as F,o as k,F as I,s as R,z as W,H as v,p as y,D as f}from"./mui-vendor-C0Vrls3f.js";import{r as o}from"./react-vendor-MXZqnNxl.js";import{F as A}from"./react-window-BrAlPq4l.js";import{D as z,C as w}from"./CodeBlock-CU08gLq0.js";import{u as E}from"./useMockData-9NxU6MHF.js";import"./syntax-highlighter-BxLn08Mh.js";function U({containerId:l}){const[m,h]=o.useState(0);return o.useEffect(()=>{const r=()=>{const c=document.getElementById(l);if(c){const g=c.querySelectorAll("[data-list-item]").length;h(g)}};r();const u=setInterval(r,100);return()=>clearInterval(u)},[l]),e.jsx(y,{label:`${m} DOM nodes`,size:"small",color:m>100?"error":m>50?"warning":"success",sx:{fontFamily:"monospace"}})}function J(){const{data:l,loading:m,error:h}=E(),[r,u]=o.useState(!0),[c,g]=o.useState("medium"),[j,T]=o.useState(0),[S,C]=o.useState(0),[b,D]=o.useTransition(),d=o.useMemo(()=>{let t=[];if(!l)return t;switch(c){case"small":t=l.small||[];break;case"medium":t=l.medium||[];break;case"large":t=l.large||[];break;default:t=l.medium||[]}return t},[l,c]);o.useEffect(()=>{const t=performance.now();requestAnimationFrame(()=>{const n=performance.now();T(n-t)})},[d,r]);const V=o.useMemo(()=>{const a=(r?30:d.length)*1e3/1024;return a<1024?`${a.toFixed(0)} KB`:`${(a/1024).toFixed(1)} MB`},[r,d.length]),M=()=>{C(t=>t+1)};if(o.useEffect(()=>{C(0)},[r,c]),m)return e.jsx(z,{title:"Virtualized List Demo",children:e.jsx(i,{sx:{display:"flex",justifyContent:"center",py:8},children:e.jsx(p,{})})});if(h)return e.jsx(z,{title:"Virtualized List Demo",children:e.jsxs(x,{severity:"error",children:["Error loading data: ",h.message]})});const L=({index:t,style:n})=>{const a=d[t];return e.jsxs(i,{style:n,"data-list-item":!0,sx:{display:"flex",alignItems:"center",px:2,borderBottom:1,borderColor:"divider",bgcolor:t%2===0?"background.paper":"action.hover"},children:[e.jsx(i,{sx:{flex:1},children:e.jsx(s,{variant:"body2",children:a.name})}),e.jsxs(i,{sx:{display:"flex",gap:2},children:[e.jsx(s,{variant:"caption",color:"text.secondary",children:a.category}),e.jsx(s,{variant:"caption",color:"text.secondary",children:a.value})]})]})};return e.jsxs(z,{title:"Virtualized List Demo",description:"See how react-window renders large lists efficiently by only rendering visible items",children:[e.jsxs(x,{severity:"info",sx:{mb:3},children:[e.jsx(s,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"🎯 Try This: Change list size and toggle virtualization"}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"Watch the DOM node counter to see the massive difference! Virtualized lists render only ~30 nodes regardless of list size."}),e.jsxs(s,{variant:"body2",sx:{fontStyle:"italic",fontSize:"0.875rem"},children:["💡 Notice: When switching to non-virtualized mode, a loading spinner appears. This demo uses ",e.jsx("strong",{children:"useTransition"})," to keep the UI responsive while rendering thousands of DOM nodes!"]})]}),e.jsx(F,{sx:{mb:3},children:e.jsx(k,{children:e.jsxs(i,{sx:{display:"flex",flexDirection:"column",gap:2},children:[e.jsxs(i,{sx:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:2},children:[e.jsx(I,{control:e.jsx(R,{checked:r,onChange:t=>{t.target.checked?u(!0):D(()=>{u(!1)})},disabled:b}),label:e.jsxs(i,{sx:{display:"flex",alignItems:"center",gap:1},children:[e.jsx(s,{variant:"body2",children:r?"✅ Virtualization ON":"❌ Virtualization OFF"}),b&&e.jsx(p,{size:16,sx:{ml:1}})]})}),e.jsxs(i,{sx:{display:"flex",alignItems:"center",gap:2},children:[e.jsx(s,{variant:"body2",color:"text.secondary",children:"List Size:"}),e.jsxs(W,{value:c,exclusive:!0,onChange:(t,n)=>{if(n){const a={small:1e3,medium:1e4,large:1e5},O=a[c],B=a[n];!r||B>O?D(()=>{g(n)}):g(n)}},size:"small",disabled:b,children:[e.jsx(v,{value:"small",children:"1K"}),e.jsx(v,{value:"medium",children:"10K"}),e.jsx(v,{value:"large",children:"100K"})]})]})]}),e.jsxs(i,{sx:{display:"flex",alignItems:"center",gap:2,flexWrap:"wrap"},children:[e.jsxs(s,{variant:"body2",color:"text.secondary",children:["Total items: ",e.jsx("strong",{children:d.length.toLocaleString()})]}),e.jsx(U,{containerId:r?"virtualized-list":"regular-list"}),e.jsx(y,{label:`~${V} memory`,size:"small",color:"info",sx:{fontFamily:"monospace"}}),e.jsx(y,{label:`${j.toFixed(1)}ms render`,size:"small",color:j>100?"error":j>50?"warning":"success",sx:{fontFamily:"monospace"}}),S>0&&e.jsx(y,{label:`${S} scrolls`,size:"small",variant:"outlined",sx:{fontFamily:"monospace"}})]})]})})}),e.jsxs(x,{severity:r?"success":"warning",sx:{mb:3},children:[e.jsx(s,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:r?"✅ With Virtualization:":"❌ Without Virtualization:"}),r?e.jsxs(e.Fragment,{children:[e.jsx(s,{variant:"body2",sx:{mb:1},children:"• Only renders visible items (~12) plus a small buffer (~30 total DOM nodes)"}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"• Scrolling is smooth even with 100,000 items"}),e.jsx(s,{variant:"body2",children:"• Memory usage stays constant regardless of list size"})]}):e.jsxs(e.Fragment,{children:[e.jsxs(s,{variant:"body2",sx:{mb:1},children:["• Renders ALL items to the DOM (",d.length.toLocaleString()," DOM nodes!)"]}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"• Scrolling may lag with large lists (try 100K items)"}),e.jsx(s,{variant:"body2",children:"• High memory usage and slow initial render"})]})]}),e.jsxs(i,{sx:{mb:3,position:"relative"},children:[b&&e.jsx(i,{sx:{position:"absolute",top:0,left:0,right:0,bottom:0,display:"flex",alignItems:"center",justifyContent:"center",bgcolor:"rgba(0, 0, 0, 0.1)",zIndex:10,borderRadius:1},children:e.jsxs(i,{sx:{textAlign:"center"},children:[e.jsx(p,{size:60}),e.jsxs(s,{variant:"body2",sx:{mt:2},children:["Rendering ",d.length.toLocaleString()," items..."]})]})}),r?e.jsx(i,{id:"virtualized-list",sx:{border:1,borderColor:"divider",borderRadius:1},children:e.jsx(A,{height:600,width:"100%",itemCount:d.length,itemSize:50,onScroll:M,children:L})}):e.jsx(i,{id:"regular-list",onScroll:M,sx:{height:600,overflow:"auto",border:1,borderColor:"divider",borderRadius:1},children:d.map((t,n)=>e.jsxs(i,{"data-list-item":!0,sx:{display:"flex",alignItems:"center",px:2,height:50,borderBottom:1,borderColor:"divider",bgcolor:n%2===0?"background.paper":"action.hover"},children:[e.jsx(i,{sx:{flex:1},children:e.jsx(s,{variant:"body2",children:t.name})}),e.jsxs(i,{sx:{display:"flex",gap:2},children:[e.jsx(s,{variant:"caption",color:"text.secondary",children:t.category}),e.jsx(s,{variant:"caption",color:"text.secondary",children:t.value})]})]},t.id))})]}),e.jsx(f,{sx:{my:4}}),e.jsxs(i,{sx:{mb:4},children:[e.jsx(s,{variant:"h6",gutterBottom:!0,children:"🔄 Bonus: useTransition in Action"}),e.jsxs(x,{severity:"success",sx:{mb:2},children:[e.jsx(s,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"This demo uses useTransition to keep the UI responsive!"}),e.jsxs(s,{variant:"body2",sx:{mb:1},children:["When you switch to non-virtualized mode or increase list size, the UI could freeze while rendering thousands of DOM nodes. Instead, we wrap expensive operations in ",e.jsx("code",{children:"startTransition()"})," to show a loading spinner and keep controls responsive."]}),e.jsx(s,{variant:"body2",children:"Notice: Switching back to virtualized mode is instant (no spinner) because it's a cheap operation. This is smart optimization - only use transitions for expensive work!"})]}),e.jsx(w,{title:"Smart useTransition - Only for Expensive Operations",code:`import { useTransition } from 'react';

function VirtualizedDemo() {
  const [isPending, startTransition] = useTransition();
  const [useVirtualization, setUseVirtualization] = useState(true);

  const handleToggle = (willBeVirtualized) => {
    if (!willBeVirtualized) {
      // Expensive: Rendering 10,000 DOM nodes
      startTransition(() => {
        setUseVirtualization(false);
      });
    } else {
      // Cheap: Switching to ~30 nodes - no transition needed
      setUseVirtualization(true);
    }
  };

  return (
    <>
      {isPending && <LoadingSpinner />}
      {/* ... */}
    </>
  );
}`,language:"typescript"})]}),e.jsx(f,{sx:{my:4}}),e.jsxs(i,{children:[e.jsx(s,{variant:"h6",gutterBottom:!0,children:"Implementation"}),e.jsx(w,{title:"✅ Virtualized List (react-window)",code:`import { FixedSizeList } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].name}
    </div>
  );

  return (
    <FixedSizeList
      height={600}
      width="100%"
      itemCount={items.length}
      itemSize={50}
    >
      {Row}
    </FixedSizeList>
  );
}

// Only renders ~12 visible items + buffer
// Total DOM nodes: ~30 (regardless of list size!)`,language:"typescript"}),e.jsx(w,{title:"❌ Regular List (renders everything)",code:`function RegularList({ items }) {
  return (
    <div style={{ height: 600, overflow: 'auto' }}>
      {items.map((item, index) => (
        <div key={item.id}>
          {item.name}
        </div>
      ))}
    </div>
  );
}

// Renders ALL items to the DOM
// 10,000 items = 10,000 DOM nodes!`,language:"typescript"})]}),e.jsx(f,{sx:{my:4}}),e.jsxs(i,{sx:{mb:4},children:[e.jsx(s,{variant:"h6",gutterBottom:!0,children:"Understanding the Metrics"}),e.jsxs(x,{severity:"info",children:[e.jsxs(s,{variant:"body2",sx:{mb:1},children:["• ",e.jsx("strong",{children:"DOM nodes:"})," Actual elements in the browser's DOM tree. Fewer = better performance"]}),e.jsxs(s,{variant:"body2",sx:{mb:1},children:["• ",e.jsx("strong",{children:"Memory:"})," Estimated RAM used by DOM nodes. Virtualized lists use ~30KB vs several MB"]}),e.jsxs(s,{variant:"body2",sx:{mb:1},children:["• ",e.jsx("strong",{children:"Render time:"})," How long it took to prepare the list. Lower is better"]}),e.jsxs(s,{variant:"body2",children:["• ",e.jsx("strong",{children:"Scrolls:"})," Number of scroll events. Try scrolling fast - virtualized stays smooth!"]})]})]}),e.jsxs(i,{children:[e.jsx(s,{variant:"h6",gutterBottom:!0,children:"How Virtualization Works"}),e.jsxs(s,{variant:"body2",color:"text.secondary",sx:{mb:1},children:["• ",e.jsx("strong",{children:"Window technique:"}),' Only renders items visible in the scrollable "window"']}),e.jsxs(s,{variant:"body2",color:"text.secondary",sx:{mb:1},children:["• ",e.jsx("strong",{children:"Dynamic rendering:"})," As you scroll, items are added/removed from the DOM"]}),e.jsxs(s,{variant:"body2",color:"text.secondary",sx:{mb:1},children:["• ",e.jsx("strong",{children:"Constant performance:"})," 100 items or 100,000 items - same DOM node count"]}),e.jsxs(s,{variant:"body2",color:"text.secondary",sx:{mb:2},children:["• ",e.jsx("strong",{children:"Absolute positioning:"})," Uses CSS transforms for smooth scrolling"]}),e.jsxs(x,{severity:"warning",sx:{mt:2},children:[e.jsx(s,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"⚠️ When to Use Virtualization"}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"• Lists with 100+ items where performance matters"}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"• Infinite scroll or large data tables"}),e.jsx(s,{variant:"body2",children:"• Don't use for small lists (overhead not worth it)"})]})]})]})}export{J as default};
