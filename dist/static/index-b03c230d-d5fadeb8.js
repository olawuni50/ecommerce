import{r as u,a as i,c as oe,e as Y,f as ae,A as ie,d as ce,g as H,h as le,i as ue,S as de,j as b,P as me,_ as pe,k as fe,l as he,m as ye,n as ge,o as Te,u as Ie,p as V,F as A,C as k,q as ve,H as Le,T as E,B as j,t as Se,v as Pe,w as Re,V as _e,x as N,y as be,z as Ce,D as Ee,E as F,G as xe,I as je,J as De,K as Oe,L as we,M as q,N as Ae,O as Fe,Q as Me,R as $e,U as ke,W as Ne,X as qe,Y as W,Z as We,$ as Be,a0 as Ue,a1 as Ye,a2 as He,a3 as Ve,a4 as Ge,a5 as ze,a6 as Ke}from"./sanity-e150d1db.js";import{useDeskTool as Xe,useDeskToolSetting as B,Delay as Qe}from"./index-2cbd8830-c4379075.js";import{P as Je}from"./PaneItem-7b9cb213-1a873935.js";import"./json-inspector-e2a993ea.js";const U=100,M=2e3,G={by:[{field:"_updatedAt",direction:"desc"}]},Ze={};function et(e,s){return e._id?V(e._id):"item-".concat(s)}function tt(e){return Oe(e).map(s=>({...s.draft||s.published,hasPublished:!!s.published,hasDraft:!!s.draft}))}const nt=/\b_type\s*==\s*(['"].*?['"]|\$.*?(?:\s|$))|\B(['"].*?['"]|\$.*?(?:\s|$))\s*==\s*_type\b/;function st(e){let s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const t=e.match(nt);if(!t)return null;const n=(t[1]||t[2]).trim().replace(/^["']|["']$/g,"");if(n[0]==="$"){const r=n.slice(1),c=s[r];return typeof c=="string"?c:null}return n}function rt(e){return/^_type\s*==\s*['"$]\w+['"]?\s*$/.test(e.trim())}function ot(e){return e.map(s=>[at(s),(s.direction||"").toLowerCase()].map(t=>t.trim()).filter(Boolean).join(" ")).join(",")}function at(e){return e.mapWith?"".concat(e.mapWith,"(").concat(e.field,")"):e.field}function it(e,s){const t=e.by.map(n=>{if(n.mapWith)return n;const r=ct(s,n.field);return r?ut(r,"datetime")?{...n,mapWith:"dateTime"}:r.jsonType==="string"?{...n,mapWith:"lower"}:n:n});return t.every((n,r)=>n===e.by[r])?e:{...e,by:t}}function ct(e,s){const t=fe(s);let n=e;for(const r of t){if(!n)return;if(typeof r=="string"){n=lt(n,r);continue}if(!(he(r)||ye(r))||n.jsonType!=="array")return;const[o,a]=n.of||[];if(a||!o)return;if(!ge(o)){n=o;continue}const[m,p]=o.to||[];if(p||!m)return;n=m}return n}function lt(e,s){if(!("fields"in e))return;const t=e.fields.find(n=>n.name===s);return t?t.type:void 0}function ut(e,s){let t=e.type;for(;t;){if(t.name===s||!t.type&&t.jsonType===s)return!0;t=t.type}return!1}function dt(e){const{childItemId:s,error:t,filterIsSimpleTypeContraint:n,fullList:r,isActive:c,isLoading:o,items:a,layout:m,onListChange:p,onRetry:l,showIcons:y}=e,S=H(),{collapsed:v}=Te(),{collapsed:L,index:g}=Ie(),[P,R]=u.useState(!1);u.useEffect(()=>{if(L)return;const d=setTimeout(()=>{R(!0)},0);return()=>{clearTimeout(d)}},[L]);const T=u.useCallback(d=>{const I=V(d._id),f=s===I;return i(Je,{icon:y===!1?!1:void 0,id:I,pressed:!c&&f,selected:c&&f,layout:m,schemaType:S.get(d._type),value:d})},[s,c,m,S,y]),h=u.useMemo(()=>{if(!P)return null;if(t)return i(A,{align:"center",direction:"column",height:"fill",justify:"center",children:i(k,{width:1,children:b(ve,{paddingX:4,paddingY:5,space:4,children:[i(Le,{as:"h3",children:"Could not fetch list items"}),b(E,{as:"p",children:["Error: ",i("code",{children:t.message})]}),l&&i(j,{children:i(Y,{icon:Se,onClick:l,text:"Retry",tone:"primary"})})]})})});if(a===null)return i(A,{align:"center",direction:"column",height:"fill",justify:"center",children:i(Qe,{ms:300,children:b(Pe,{children:[i(Re,{muted:!0}),i(j,{marginTop:3,children:i(E,{align:"center",muted:!0,size:1,children:"Loading documents…"})})]})})});if(!o&&a.length===0)return i(A,{align:"center",direction:"column",height:"fill",justify:"center",children:i(k,{width:1,children:i(j,{paddingX:4,paddingY:5,children:i(E,{align:"center",muted:!0,size:2,children:n?"No documents of this type":"No matching documents"})})})});const d=r&&a.length===M;return b(j,{padding:2,children:[a.length>0&&i(_e,{gap:1,getItemKey:et,items:a,renderItem:T,onChange:p},"".concat(g,"-").concat(L)),o&&i(N,{borderTop:!0,marginTop:1,paddingX:3,paddingY:4,children:i(E,{align:"center",muted:!0,size:1,children:"Loading…"})}),d&&i(N,{marginTop:1,paddingX:3,paddingY:4,radius:2,tone:"transparent",children:b(E,{align:"center",muted:!0,size:1,children:["Displaying a maximum of ",M," documents"]})})]})},[t,n,r,p,o,a,l,T,P,L,g]);return i(be,{overflow:v?void 0:"auto",children:h})}const z=u.memo(e=>{let{index:s,initialValueTemplates:t=[],menuItems:n=[],menuItemGroups:r=[],setLayout:c,setSortOrder:o,title:a}=e;const{features:m}=Xe(),p=u.useMemo(()=>({setLayout:l=>{let{layout:y}=l;c(y)},setSortOrder:l=>{o(l)}}),[c,o]);return i(oe,{backButton:m.backButton&&s>0&&i(Y,{as:ae,"data-as":"a",icon:ie,mode:"bleed"}),title:a,actions:i(ce,{initialValueTemplateItems:t,actionHandlers:p,menuItemGroups:r,menuItems:n})})});z.displayName="DocumentListPaneHeader";const mt={result:null,error:!1},pt=e=>({result:{documents:e},loading:!1,error:!1}),ft=e=>({result:null,loading:!1,error:e}),ht=function(e){let s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const t=new we,n=t.next.bind(t);return e.pipe(q(o=>({client:o.client,query:o.query,params:o.params})),Ae(Fe),Me(1),$e()).pipe(ke(o=>{const a=Ne(o.client,o.query,o.params,s).pipe(q(pt),qe());return W(F({loading:!0}).pipe(We(400),Be(a)),a)})).pipe(Ue(mt),Ye((o,a)=>He(F(ft(o)),W(Ve(window,"online"),t).pipe(Ge(1),ze(a)))),Ke((o,a)=>({...o,...a,onRetry:n})))};function yt(e){var s;const{apiVersion:t,filter:n,params:r,sortOrder:c}=e,o=Ce(Ee),[a,m]=u.useState(!1),p=u.useRef(a),[l,y]=u.useState(null),S=(l==null?void 0:l.error)||null,v=(l==null?void 0:l.loading)||l===null,L=l==null?void 0:l.onRetry,g=(s=l==null?void 0:l.result)==null?void 0:s.documents,P=u.useMemo(()=>g?tt(g):null,[g]),R=u.useMemo(()=>{const h=c==null?void 0:c.extendedProjection,d=["_id","_type"],I=d.join(","),f=(c==null?void 0:c.by)||[],C=a?M:U,_=f.length>0?f:G.by,x=ot(_);if(h){const D=d.concat(h).join(",");return["*[".concat(n,"] {").concat(D,"}"),"order(".concat(x,") [0...").concat(C,"]"),"{".concat(I,"}")].join("|")}return"*[".concat(n,"]|order(").concat(x,")[0...").concat(C,"]{").concat(I,"}")},[n,a,c]),T=u.useCallback(h=>{let{toIndex:d}=h;v||p.current||d>=U/2&&(m(!0),p.current=!0)},[v]);return u.useEffect(()=>{const h=a?f=>!!f.result:()=>!0;y(f=>f?{...f,loading:!0}:null);const I=ht(F({client:o,query:R,params:r}),{apiVersion:t,tag:"desk.document-list"}).pipe(xe(h)).subscribe(y);return()=>I.unsubscribe()},[t,o,a,R,r]),u.useEffect(()=>{y(null),m(!1),p.current=!1},[n,r,c,t]),{error:S,fullList:a,handleListChange:T,isLoading:v,items:P,onRetry:L}}const $=[];function gt(e){const s=u.useRef(e);return je(s.current,e)||(s.current=e),s.current}const Tt=e=>{const{menuItems:s,sortOrder:t,layout:n}=e;return s==null?void 0:s.map(r=>{var c,o,a,m,p,l;return(c=r.params)!=null&&c.layout?{...r,selected:n===((o=r.params)==null?void 0:o.layout)}:(a=r==null?void 0:r.params)!=null&&a.extendedProjection?{...r,selected:(t==null?void 0:t.extendedProjection)===((m=r==null?void 0:r.params)==null?void 0:m.extendedProjection)}:(p=r==null?void 0:r.params)!=null&&p.by?{...r,selected:De(t==null?void 0:t.by,((l=r==null?void 0:r.params)==null?void 0:l.by)||$)}:{...r,selected:!1}})},Pt=u.memo(function(s){const{childItemId:t,index:n,isActive:r,isSelected:c,pane:o,paneKey:a}=s,m=H(),{name:p}=le(),{defaultLayout:l="default",displayOptions:y,initialValueTemplates:S=$,menuItems:v,menuItemGroups:L,options:g,title:P}=o,{apiVersion:R,defaultOrdering:T=$,filter:h}=g,d=gt(g.params||Ze),I=o.source,f=u.useMemo(()=>st(h,d),[h,d]),C=(y==null?void 0:y.showIcons)!==!1,[_,x]=B(f,"layout",l),D=u.useMemo(()=>(T==null?void 0:T.length)>0?{by:T}:G,[T]),[O,K]=B(f,"sortOrder",D),X=f&&O?it(O,m.get(f)):O,w=ue(X),Q=rt(h),{error:J,fullList:Z,handleListChange:ee,isLoading:te,items:ne,onRetry:se}=yt({filter:h,params:d,sortOrder:w,apiVersion:R}),re=u.useMemo(()=>Tt({menuItems:v,sortOrder:w,layout:_}),[_,v,w]);return i(de,{name:I||p,children:b(me,{currentMaxWidth:350,id:a,maxWidth:640,minWidth:320,selected:c,children:[pe,i(z,{index:n,initialValueTemplates:S,menuItems:re,menuItemGroups:L,setLayout:x,setSortOrder:K,title:P}),i(dt,{childItemId:t,error:J,filterIsSimpleTypeContraint:Q,fullList:Z,isActive:r,isLoading:te,items:ne,layout:_,onListChange:ee,onRetry:se,showIcons:C})]})})});export{Pt as default};
