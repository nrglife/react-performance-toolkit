var f=(n,r,t)=>new Promise((i,c)=>{var o=a=>{try{u(t.next(a))}catch(x){c(x)}},b=a=>{try{u(t.throw(a))}catch(x){c(x)}},u=a=>a.done?i(a.value):Promise.resolve(a.value).then(o,b);u((t=t.apply(n,r)).next())});import{j as e,q as d,g as s,G as j,h as l,o as v,i as S,l as p,n as y,p as w,D as k}from"./mui-vendor-C8XaRdMS.js";import{r as h}from"./react-vendor-bYt7__KG.js";import{u as U}from"./tanstack-query-ChupeYej.js";import{D as P,C as g}from"./CodeBlock-T5PzMqeg.js";import"./index-vf6S4XKL.js";const T=n=>new Promise(r=>setTimeout(r,n)),W=[{id:1,name:"Alice Johnson",email:"alice@example.com",role:"Developer"},{id:2,name:"Bob Smith",email:"bob@example.com",role:"Designer"},{id:3,name:"Carol Williams",email:"carol@example.com",role:"Manager"}];function R(n){return f(this,null,function*(){yield T(1e3+Math.random()*1e3);const r=W.find(t=>t.id===n);if(!r)throw new Error(`User ${n} not found`);return r})}function I(n){let r="pending",t,i;const c=n.then(o=>{r="success",t=o},o=>{r="error",i=o});return{read(){switch(r){case"pending":throw c;case"error":throw i;case"success":return t}}}}function C(n){return I(R(n))}function B({userId:n}){const{data:r}=U({queryKey:["user",n],queryFn:()=>R(n)});return e.jsx(p,{children:e.jsxs(y,{children:[e.jsx(s,{variant:"h6",gutterBottom:!0,children:r.name}),e.jsxs(s,{variant:"body2",color:"text.secondary",children:["Email: ",r.email]}),e.jsxs(s,{variant:"body2",color:"text.secondary",children:["Role: ",r.role]})]})})}function D({resource:n}){const r=n.read();return e.jsx(p,{children:e.jsxs(y,{children:[e.jsx(s,{variant:"h6",gutterBottom:!0,children:r.name}),e.jsxs(s,{variant:"body2",color:"text.secondary",children:["Email: ",r.email]}),e.jsxs(s,{variant:"body2",color:"text.secondary",children:["Role: ",r.role]})]})})}function z(){const[n,r]=h.useState(1),[t,i]=h.useState(1),[c,o]=h.useState(()=>C(1)),b=()=>{const m=n%3+1;r(m)},u=()=>{const m=t%3+1;i(m),o(C(m))};return e.jsxs(P,{title:"Suspense Demo",description:"Compare TanStack Query (production) vs Pure React Suspense (educational) approaches to data loading",children:[e.jsxs(d,{severity:"info",sx:{mb:3},children:[e.jsx(s,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:'🎯 Try This: Click the "Load Next User" buttons'}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"Watch how both approaches handle loading states automatically. No manual loading flags needed!"}),e.jsx(s,{variant:"body2",sx:{fontStyle:"italic",fontSize:"0.875rem"},children:"💡 Notice: The loading spinner appears automatically while data fetches (1-2 second delay)"})]}),e.jsxs(j,{container:!0,spacing:3,sx:{mb:3},children:[e.jsx(j,{size:{xs:12,md:6},children:e.jsxs(l,{children:[e.jsxs(l,{sx:{display:"flex",alignItems:"center",gap:1,mb:2},children:[e.jsx(s,{variant:"h6",children:"TanStack Query"}),e.jsx(v,{label:"Production",color:"success",size:"small"})]}),e.jsx(s,{variant:"body2",color:"text.secondary",sx:{mb:2},children:"Recommended for real applications. Includes caching, refetching, and error handling."}),e.jsxs(S,{variant:"contained",onClick:b,sx:{mb:2},children:["Load Next User (ID: ",n%3+1,")"]}),e.jsx(h.Suspense,{fallback:e.jsx(p,{children:e.jsx(y,{sx:{display:"flex",justifyContent:"center",py:4},children:e.jsx(w,{})})}),children:e.jsx(B,{userId:n})})]})}),e.jsx(j,{size:{xs:12,md:6},children:e.jsxs(l,{children:[e.jsxs(l,{sx:{display:"flex",alignItems:"center",gap:1,mb:2},children:[e.jsx(s,{variant:"h6",children:"Pure React Suspense"}),e.jsx(v,{label:"Educational",color:"primary",size:"small"})]}),e.jsx(s,{variant:"body2",color:"text.secondary",sx:{mb:2},children:"Shows how Suspense works under the hood. Great for learning, not for production."}),e.jsxs(S,{variant:"contained",onClick:u,sx:{mb:2},children:["Load Next User (ID: ",t%3+1,")"]}),e.jsx(h.Suspense,{fallback:e.jsx(p,{children:e.jsx(y,{sx:{display:"flex",justifyContent:"center",py:4},children:e.jsx(w,{})})}),children:e.jsx(D,{resource:c})})]})})]}),e.jsxs(d,{severity:"success",sx:{mb:3},children:[e.jsx(s,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"✅ What Makes Suspense Special"}),e.jsxs(s,{variant:"body2",sx:{mb:1},children:["• ",e.jsx("strong",{children:"No loading state management:"})," No useState(loading) needed"]}),e.jsxs(s,{variant:"body2",sx:{mb:1},children:["• ",e.jsx("strong",{children:"Declarative:"})," Just wrap components in Suspense boundary"]}),e.jsxs(s,{variant:"body2",sx:{mb:1},children:["• ",e.jsx("strong",{children:"Composable:"})," Multiple components can suspend independently"]}),e.jsxs(s,{variant:"body2",children:["• ",e.jsx("strong",{children:"Automatic:"})," React handles showing/hiding fallback UI"]})]}),e.jsx(k,{sx:{my:4}}),e.jsxs(l,{children:[e.jsx(s,{variant:"h6",gutterBottom:!0,children:"Implementation Comparison"}),e.jsx(g,{title:"✅ TanStack Query (Recommended for Production)",code:`import { useSuspenseQuery } from '@tanstack/react-query';

function UserProfile({ userId }) {
  // useSuspenseQuery automatically suspends while loading
  const { data: user } = useSuspenseQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });

  return <div>{user.name}</div>;
}

// Wrap in Suspense boundary
<Suspense fallback={<Loading />}>
  <UserProfile userId={1} />
</Suspense>

// ✅ Benefits:
// - Automatic caching and refetching
// - Built-in error handling
// - DevTools for debugging
// - Production-ready`,language:"typescript"}),e.jsx(g,{title:"🎓 Pure React Suspense (Educational)",code:`import { wrapPromise } from './utils/wrapPromise';

// Create resource outside component
const userResource = wrapPromise(fetchUser(1));

function UserProfile({ resource }) {
  // read() throws promise while loading - Suspense catches it!
  const user = resource.read();
  return <div>{user.name}</div>;
}

// Wrap in Suspense boundary
<Suspense fallback={<Loading />}>
  <UserProfile resource={userResource} />
</Suspense>

// ✅ Benefits:
// - Educational: shows how Suspense works
// - No dependencies needed
// - Full control over data flow`,language:"typescript"}),e.jsx(g,{title:"🔍 How wrapPromise Works (The Magic Behind Suspense)",code:`function wrapPromise<T>(promise: Promise<T>) {
  let status = 'pending';
  let result: T;

  const suspender = promise.then(
    (data) => {
      status = 'success';
      result = data;
    }
  );

  return {
    read(): T {
      if (status === 'pending') {
        throw suspender; // Suspense catches this!
      }
      return result;
    },
  };
}

// This is the "magic" behind Suspense:
// - Component throws a promise
// - React catches it and shows fallback
// - When promise resolves, React re-renders component`,language:"typescript"})]}),e.jsx(k,{sx:{my:4}}),e.jsxs(l,{children:[e.jsx(s,{variant:"h6",gutterBottom:!0,children:"Understanding Suspense"}),e.jsxs(d,{severity:"info",sx:{mb:2},children:[e.jsx(s,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"🤔 How Does Suspense Work?"}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"1. Component tries to read data that's not ready yet"}),e.jsxs(s,{variant:"body2",sx:{mb:1},children:["2. Component ",e.jsx("strong",{children:"throws a promise"})," (yes, really!)"]}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"3. React catches the thrown promise"}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"4. React shows the fallback UI (loading spinner)"}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"5. When promise resolves, React re-renders the component"}),e.jsx(s,{variant:"body2",children:"6. Component reads data successfully and renders"})]}),e.jsx(s,{variant:"h6",gutterBottom:!0,sx:{mt:3},children:"When to Use Each Approach"}),e.jsxs(d,{severity:"success",sx:{mb:2},children:[e.jsx(s,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"✅ Use TanStack Query When:"}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"• Building a production application"}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"• You need caching, refetching, and error handling"}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"• You want DevTools for debugging"}),e.jsx(s,{variant:"body2",children:"• You need features like pagination, infinite scroll, etc."})]}),e.jsxs(d,{severity:"warning",sx:{mb:2},children:[e.jsx(s,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"🎓 Use Pure React Suspense When:"}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"• Learning how Suspense works under the hood"}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"• Building a simple demo or prototype"}),e.jsx(s,{variant:"body2",sx:{mb:1},children:"• You want full control over data fetching"}),e.jsx(s,{variant:"body2",children:"• You're integrating with a custom data layer"})]}),e.jsxs(d,{severity:"error",children:[e.jsx(s,{variant:"body2",sx:{fontWeight:"bold",mb:1},children:"⚠️ Common Mistakes to Avoid"}),e.jsxs(s,{variant:"body2",sx:{mb:1},children:["• ",e.jsx("strong",{children:"Creating resources inside components:"})," This causes infinite loops! Create resources outside or use state."]}),e.jsxs(s,{variant:"body2",sx:{mb:1},children:["• ",e.jsx("strong",{children:"Forgetting Suspense boundary:"})," Components that suspend must be wrapped in Suspense."]}),e.jsxs(s,{variant:"body2",children:["• ",e.jsx("strong",{children:"Using pure Suspense in production:"})," Use TanStack Query or similar library for real apps."]})]})]})]})}export{z as default};
