import{s as b,B as x,r as l,j as d,P as j,a as o,b as v,c as B,d as H,e as I,f as k,A as E,u as y}from"./sanity-e150d1db.js";import{useDeskTool as C}from"./index-2cbd8830-c4379075.js";import"./json-inspector-e2a993ea.js";var u;function O(t,e){return e||(e=t.slice(0)),Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}function g(t){const{actionHandlers:e,index:a,menuItems:n,menuItemGroups:r,title:i}=t,{features:s}=C();return!(n!=null&&n.length)&&!i?null:o(B,{actions:o(H,{menuItems:n,menuItemGroups:r,actionHandlers:e}),backButton:s.backButton&&a>0&&o(I,{as:k,"data-as":"a",icon:E,mode:"bleed"}),title:i})}const A=b(x)(u||(u=O([`
  position: relative;
`])));function L(t){const{children:e}=t,{collapsed:a}=y();return o(A,{hidden:a,height:"fill",overflow:"auto",children:e})}function G(t){const{index:e,pane:a,paneKey:n,...r}=t,{child:i,component:s,menuItems:m,menuItemGroups:p,title:f="",type:T,...P}=a,[c,h]=l.useState(null);return d(j,{id:n,minWidth:320,selected:r.isSelected,children:[o(g,{actionHandlers:c==null?void 0:c.actionHandlers,index:e,menuItems:m,menuItemGroups:p,title:f}),d(L,{children:[v.isValidElementType(s)&&l.createElement(s,{...r,...P,ref:h,child:i,paneKey:n}),l.isValidElement(s)&&s]})]})}export{G as default};
