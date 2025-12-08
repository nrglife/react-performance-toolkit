import{g as S,e as k,r as c,u as R,j as e,s as z,f as O,h as W,n as F,z as C,A as L,B as m,C as A,T as s,b as $,d as T,a as U,G as w}from"./index-CCjvjdD8.js";import{D as M,A as y,a as I,C as f}from"./CodeBlock-DGa99j9B.js";import{F as B,S as E}from"./Switch-DUs_yQ7k.js";import"./useFormControl-A1vLkL1Q.js";function D(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function P(t){return parseFloat(t)}function H(t){return S("MuiSkeleton",t)}k("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const N=t=>{const{classes:a,variant:n,animation:o,hasChildren:l,width:d,height:i}=t;return W({root:["root",n,o,l&&"withChildren",l&&!d&&"fitContent",l&&!i&&"heightAuto"]},H,a)},v=L`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`,j=L`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`,X=typeof v!="string"?C`
        animation: ${v} 2s ease-in-out 0.5s infinite;
      `:null,G=typeof j!="string"?C`
        &::after {
          animation: ${j} 2s linear 0.5s infinite;
        }
      `:null,K=z("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,a)=>{const{ownerState:n}=t;return[a.root,a[n.variant],n.animation!==!1&&a[n.animation],n.hasChildren&&a.withChildren,n.hasChildren&&!n.width&&a.fitContent,n.hasChildren&&!n.height&&a.heightAuto]}})(F(({theme:t})=>{const a=D(t.shape.borderRadius)||"px",n=P(t.shape.borderRadius);return{display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:t.alpha(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em",variants:[{props:{variant:"text"},style:{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${n}${a}/${Math.round(n/.6*10)/10}${a}`,"&:empty:before":{content:'"\\00a0"'}}},{props:{variant:"circular"},style:{borderRadius:"50%"}},{props:{variant:"rounded"},style:{borderRadius:(t.vars||t).shape.borderRadius}},{props:({ownerState:o})=>o.hasChildren,style:{"& > *":{visibility:"hidden"}}},{props:({ownerState:o})=>o.hasChildren&&!o.width,style:{maxWidth:"fit-content"}},{props:({ownerState:o})=>o.hasChildren&&!o.height,style:{height:"auto"}},{props:{animation:"pulse"},style:X||{animation:`${v} 2s ease-in-out 0.5s infinite`}},{props:{animation:"wave"},style:{position:"relative",overflow:"hidden",WebkitMaskImage:"-webkit-radial-gradient(white, black)","&::after":{background:`linear-gradient(
                90deg,
                transparent,
                ${(t.vars||t).palette.action.hover},
                transparent
              )`,content:'""',position:"absolute",transform:"translateX(-100%)",bottom:0,left:0,right:0,top:0}}},{props:{animation:"wave"},style:G||{"&::after":{animation:`${j} 2s linear 0.5s infinite`}}}]}})),V=c.forwardRef(function(a,n){const o=R({props:a,name:"MuiSkeleton"}),{animation:l="pulse",className:d,component:i="span",height:u,style:g,variant:r="text",width:x,...h}=o,p={...o,animation:l,component:i,variant:r,hasChildren:!!h.children},b=N(p);return e.jsx(K,{as:i,ref:n,className:O(b.root,d),ownerState:p,...h,style:{width:x,height:u,...g}})});function _(t={}){const{threshold:a=0,root:n=null,rootMargin:o="0px"}=t,[l,d]=c.useState(!1),[i,u]=c.useState(!1),g=c.useRef(null);return c.useEffect(()=>{const r=g.current;if(!r)return;const x=new IntersectionObserver(([h])=>{d(h.isIntersecting),h.isIntersecting&&!i&&u(!0)},{threshold:a,root:n,rootMargin:o});return x.observe(r),()=>{x.disconnect()}},[a,n,o,i]),{targetRef:g,isIntersecting:l,hasIntersected:i}}function q({src:t,alt:a,width:n="100%",height:o=200,threshold:l=.1,onLoad:d}){const[i,u]=c.useState(!1),[g,r]=c.useState(!1),{targetRef:x,hasIntersected:h}=_({threshold:l});c.useEffect(()=>{h&&!g&&r(!0)},[h,g]);const p=()=>{u(!0),d&&d()},b=()=>{console.error(`Failed to load image: ${t}`)};return e.jsxs(m,{ref:x,sx:{width:n,height:o,position:"relative",overflow:"hidden",borderRadius:1,bgcolor:"action.hover"},children:[!h&&e.jsx(V,{variant:"rectangular",width:"100%",height:"100%",animation:!1}),h&&!i&&e.jsx(m,{sx:{display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"100%",position:"absolute",top:0,left:0},children:e.jsx(A,{size:40})}),g&&e.jsx(m,{component:"img",src:t,alt:a,onLoad:p,onError:b,sx:{width:"100%",height:"100%",objectFit:"cover",opacity:i?1:0,transition:"opacity 0.3s ease-in-out"}})]})}const J=t=>Array.from({length:t},(a,n)=>({id:n+1,src:`https://picsum.photos/400/300?random=${n+1}`,alt:`Demo image ${n+1}`}));function te(){const[t,a]=c.useState(!0),[n,o]=c.useState(0),l=c.useMemo(()=>J(50),[]),d=()=>{o(r=>r+1)};return e.jsxs(M,{title:"Lazy Loading Images Demo",description:"See how IntersectionObserver enables efficient image loading by only loading images when they enter the viewport",children:[e.jsxs(y,{severity:"info",sx:{mb:3},children:[e.jsx(s,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"🎯 Try This: Scroll down slowly"}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"Watch images load only as they come into view. With lazy loading ON, images load on-demand. With it OFF, all 50 images load immediately."}),e.jsx(s,{variant:"body2",sx:{fontStyle:"italic",fontSize:"0.875rem"},children:"💡 Notice: The loaded count increases as you scroll, not all at once!"})]}),e.jsx($,{sx:{mb:3},children:e.jsx(T,{children:e.jsxs(m,{sx:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:2},children:[e.jsx(B,{control:e.jsx(E,{checked:t,onChange:r=>{a(r.target.checked),o(0)}}),label:e.jsx(m,{sx:{display:"flex",alignItems:"center",gap:1},children:e.jsx(s,{variant:"body2",children:t?"✅ Lazy Loading ON":"❌ Lazy Loading OFF"})})}),e.jsxs(m,{sx:{display:"flex",alignItems:"center",gap:2},children:[e.jsxs(s,{variant:"body2",color:"text.secondary",children:["Total images: ",e.jsx("strong",{children:"50"})]}),e.jsx(U,{label:`${n} loaded`,size:"small",color:n===50?"success":"primary",sx:{fontFamily:"monospace"}})]})]})})}),e.jsxs(y,{severity:t?"success":"warning",sx:{mb:3},children:[e.jsx(s,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:t?"✅ With Lazy Loading:":"❌ Without Lazy Loading:"}),t?e.jsxs(e.Fragment,{children:[e.jsx(s,{variant:"body2",sx:{mb:1},children:"• Images load only when they enter the viewport"}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"• Faster initial page load (only loads visible images)"}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"• Saves bandwidth (doesn't load images user never sees)"}),e.jsx(s,{variant:"body2",children:"• Better performance on slow connections"})]}):e.jsxs(e.Fragment,{children:[e.jsx(s,{variant:"body2",sx:{mb:1},children:"• All 50 images load immediately on page load"}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"• Slow initial page load (downloads all images at once)"}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"• Wastes bandwidth loading images user may never see"}),e.jsx(s,{variant:"body2",children:"• Poor experience on slow connections"})]})]}),e.jsx(m,{sx:{mb:3},children:e.jsx(w,{container:!0,spacing:2,children:l.map(r=>e.jsxs(w,{size:{xs:12,sm:6,md:4,lg:3},children:[t?e.jsx(q,{src:r.src,alt:r.alt,height:200,onLoad:d}):e.jsx(m,{component:"img",src:r.src,alt:r.alt,onLoad:d,sx:{width:"100%",height:200,objectFit:"cover",borderRadius:1}}),e.jsxs(s,{variant:"caption",color:"text.secondary",sx:{mt:.5,display:"block"},children:["Image ",r.id]})]},r.id))})}),e.jsx(I,{sx:{my:4}}),e.jsxs(m,{children:[e.jsx(s,{variant:"h6",gutterBottom:!0,children:"Implementation"}),e.jsx(f,{title:"✅ Lazy Image Component",code:`import { useIntersectionObserver } from './hooks/useIntersectionObserver';

function LazyImage({ src, alt }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const { targetRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1, // Load when 10% visible
  });

  return (
    <div ref={targetRef}>
      {!hasIntersected && <Skeleton />}
      {hasIntersected && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          style={{ opacity: isLoaded ? 1 : 0 }}
        />
      )}
    </div>
  );
}`,language:"typescript"}),e.jsx(f,{title:"🔍 useIntersectionObserver Hook",code:`function useIntersectionObserver(options = {}) {
  const [hasIntersected, setHasIntersected] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      options
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, [hasIntersected]);

  return { targetRef, hasIntersected };
}`,language:"typescript"}),e.jsx(f,{title:"❌ Regular Image (loads immediately)",code:`function RegularImage({ src, alt }) {
  return <img src={src} alt={alt} />;
}

// ❌ Problem: All 50 images load immediately
// - Slow initial page load
// - Wasted bandwidth for images user never sees
// - Poor performance on slow connections`,language:"typescript"})]}),e.jsx(I,{sx:{my:4}}),e.jsxs(m,{children:[e.jsx(s,{variant:"h6",gutterBottom:!0,children:"How Lazy Loading Works"}),e.jsxs(s,{variant:"body2",color:"text.secondary",sx:{mb:1},children:["• ",e.jsx("strong",{children:"IntersectionObserver API:"})," Efficiently detects when elements enter the viewport"]}),e.jsxs(s,{variant:"body2",color:"text.secondary",sx:{mb:1},children:["• ",e.jsx("strong",{children:"Threshold:"})," Controls when loading starts (0.1 = load when 10% visible)"]}),e.jsxs(s,{variant:"body2",color:"text.secondary",sx:{mb:1},children:["• ",e.jsx("strong",{children:"Placeholder:"})," Shows skeleton/spinner while image loads"]}),e.jsxs(s,{variant:"body2",color:"text.secondary",sx:{mb:2},children:["• ",e.jsx("strong",{children:"Fade-in effect:"})," Smooth transition when image loads"]}),e.jsxs(y,{severity:"success",sx:{mt:2},children:[e.jsx(s,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"✅ When to Use Lazy Loading"}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"• Long pages with many images (galleries, feeds, product lists)"}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"• Images below the fold (not visible on initial page load)"}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"• Mobile-first applications (save bandwidth)"}),e.jsx(s,{variant:"body2",children:"• Any scenario where initial page load speed matters"})]}),e.jsxs(y,{severity:"warning",sx:{mt:2},children:[e.jsx(s,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"⚠️ When NOT to Use Lazy Loading"}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"• Hero images or above-the-fold content (load immediately)"}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"• Small number of images (overhead not worth it)"}),e.jsx(s,{variant:"body2",children:"• Critical images needed for initial render"})]})]})]})}export{te as default};
