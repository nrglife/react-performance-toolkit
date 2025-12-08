import{j as e,i as o,J as I,q as w,r as y,h as s,m as L,o as C,F as S,s as z,p as O,G as v,D as f}from"./mui-vendor-C0Vrls3f.js";import{r}from"./react-vendor-MXZqnNxl.js";import{D as R,C as u}from"./CodeBlock-CU08gLq0.js";import"./syntax-highlighter-BxLn08Mh.js";function W(n={}){const{threshold:i=0,root:a=null,rootMargin:d="0px"}=n,[x,l]=r.useState(!1),[c,g]=r.useState(!1),h=r.useRef(null);return r.useEffect(()=>{const t=h.current;if(!t)return;const b=new IntersectionObserver(([m])=>{l(m.isIntersecting),m.isIntersecting&&!c&&g(!0)},{threshold:i,root:a,rootMargin:d});return b.observe(t),()=>{b.disconnect()}},[i,a,d,c]),{targetRef:h,isIntersecting:x,hasIntersected:c}}function F({src:n,alt:i,width:a="100%",height:d=200,threshold:x=.1,onLoad:l}){const[c,g]=r.useState(!1),[h,t]=r.useState(!1),{targetRef:b,hasIntersected:m}=W({threshold:x});r.useEffect(()=>{m&&!h&&t(!0)},[m,h]);const j=()=>{g(!0),l&&l()},p=()=>{console.error(`Failed to load image: ${n}`)};return e.jsxs(o,{ref:b,sx:{width:a,height:d,position:"relative",overflow:"hidden",borderRadius:1,bgcolor:"action.hover"},children:[!m&&e.jsx(I,{variant:"rectangular",width:"100%",height:"100%",animation:!1}),m&&!c&&e.jsx(o,{sx:{display:"flex",alignItems:"center",justifyContent:"center",width:"100%",height:"100%",position:"absolute",top:0,left:0},children:e.jsx(w,{size:40})}),h&&e.jsx(o,{component:"img",src:n,alt:i,onLoad:j,onError:p,sx:{width:"100%",height:"100%",objectFit:"cover",opacity:c?1:0,transition:"opacity 0.3s ease-in-out"}})]})}const k=n=>Array.from({length:n},(i,a)=>({id:a+1,src:`https://picsum.photos/400/300?random=${a+1}`,alt:`Demo image ${a+1}`}));function H(){const[n,i]=r.useState(!0),[a,d]=r.useState(0),x=r.useMemo(()=>k(50),[]),l=()=>{d(t=>t+1)};return e.jsxs(R,{title:"Lazy Loading Images Demo",description:"See how IntersectionObserver enables efficient image loading by only loading images when they enter the viewport",children:[e.jsxs(y,{severity:"info",sx:{mb:3},children:[e.jsx(s,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"🎯 Try This: Scroll down slowly"}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"Watch images load only as they come into view. With lazy loading ON, images load on-demand. With it OFF, all 50 images load immediately."}),e.jsx(s,{variant:"body2",sx:{fontStyle:"italic",fontSize:"0.875rem"},children:"💡 Notice: The loaded count increases as you scroll, not all at once!"})]}),e.jsx(L,{sx:{mb:3},children:e.jsx(C,{children:e.jsxs(o,{sx:{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:2},children:[e.jsx(S,{control:e.jsx(z,{checked:n,onChange:t=>{i(t.target.checked),d(0)}}),label:e.jsx(o,{sx:{display:"flex",alignItems:"center",gap:1},children:e.jsx(s,{variant:"body2",children:n?"✅ Lazy Loading ON":"❌ Lazy Loading OFF"})})}),e.jsxs(o,{sx:{display:"flex",alignItems:"center",gap:2},children:[e.jsxs(s,{variant:"body2",color:"text.secondary",children:["Total images: ",e.jsx("strong",{children:"50"})]}),e.jsx(O,{label:`${a} loaded`,size:"small",color:a===50?"success":"primary",sx:{fontFamily:"monospace"}})]})]})})}),e.jsxs(y,{severity:n?"success":"warning",sx:{mb:3},children:[e.jsx(s,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:n?"✅ With Lazy Loading:":"❌ Without Lazy Loading:"}),n?e.jsxs(e.Fragment,{children:[e.jsx(s,{variant:"body2",sx:{mb:1},children:"• Images load only when they enter the viewport"}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"• Faster initial page load (only loads visible images)"}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"• Saves bandwidth (doesn't load images user never sees)"}),e.jsx(s,{variant:"body2",children:"• Better performance on slow connections"})]}):e.jsxs(e.Fragment,{children:[e.jsx(s,{variant:"body2",sx:{mb:1},children:"• All 50 images load immediately on page load"}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"• Slow initial page load (downloads all images at once)"}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"• Wastes bandwidth loading images user may never see"}),e.jsx(s,{variant:"body2",children:"• Poor experience on slow connections"})]})]}),e.jsx(o,{sx:{mb:3},children:e.jsx(v,{container:!0,spacing:2,children:x.map(t=>e.jsxs(v,{size:{xs:12,sm:6,md:4,lg:3},children:[n?e.jsx(F,{src:t.src,alt:t.alt,height:200,onLoad:l}):e.jsx(o,{component:"img",src:t.src,alt:t.alt,onLoad:l,sx:{width:"100%",height:200,objectFit:"cover",borderRadius:1}}),e.jsxs(s,{variant:"caption",color:"text.secondary",sx:{mt:.5,display:"block"},children:["Image ",t.id]})]},t.id))})}),e.jsx(f,{sx:{my:4}}),e.jsxs(o,{children:[e.jsx(s,{variant:"h6",gutterBottom:!0,children:"Implementation"}),e.jsx(u,{title:"✅ Lazy Image Component",code:`import { useIntersectionObserver } from './hooks/useIntersectionObserver';

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
}`,language:"typescript"}),e.jsx(u,{title:"🔍 useIntersectionObserver Hook",code:`function useIntersectionObserver(options = {}) {
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
}`,language:"typescript"}),e.jsx(u,{title:"❌ Regular Image (loads immediately)",code:`function RegularImage({ src, alt }) {
  return <img src={src} alt={alt} />;
}

// ❌ Problem: All 50 images load immediately
// - Slow initial page load
// - Wasted bandwidth for images user never sees
// - Poor performance on slow connections`,language:"typescript"})]}),e.jsx(f,{sx:{my:4}}),e.jsxs(o,{children:[e.jsx(s,{variant:"h6",gutterBottom:!0,children:"How Lazy Loading Works"}),e.jsxs(s,{variant:"body2",color:"text.secondary",sx:{mb:1},children:["• ",e.jsx("strong",{children:"IntersectionObserver API:"})," Efficiently detects when elements enter the viewport"]}),e.jsxs(s,{variant:"body2",color:"text.secondary",sx:{mb:1},children:["• ",e.jsx("strong",{children:"Threshold:"})," Controls when loading starts (0.1 = load when 10% visible)"]}),e.jsxs(s,{variant:"body2",color:"text.secondary",sx:{mb:1},children:["• ",e.jsx("strong",{children:"Placeholder:"})," Shows skeleton/spinner while image loads"]}),e.jsxs(s,{variant:"body2",color:"text.secondary",sx:{mb:2},children:["• ",e.jsx("strong",{children:"Fade-in effect:"})," Smooth transition when image loads"]}),e.jsxs(y,{severity:"success",sx:{mt:2},children:[e.jsx(s,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"✅ When to Use Lazy Loading"}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"• Long pages with many images (galleries, feeds, product lists)"}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"• Images below the fold (not visible on initial page load)"}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"• Mobile-first applications (save bandwidth)"}),e.jsx(s,{variant:"body2",children:"• Any scenario where initial page load speed matters"})]}),e.jsxs(y,{severity:"warning",sx:{mt:2},children:[e.jsx(s,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"⚠️ When NOT to Use Lazy Loading"}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"• Hero images or above-the-fold content (load immediately)"}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"• Small number of images (overhead not worth it)"}),e.jsx(s,{variant:"body2",children:"• Critical images needed for initial render"})]})]})]})}export{H as default};
