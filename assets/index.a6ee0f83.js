import{r as m,w as X,a as V,o as d,c as B,b as c,d as $,e as n,n as A,f as r,g as q,h as b,t as O,T as F,i as Y,j as L,u as T,F as x,k as M,l as Z,m as U,p as ee,q as te,s as oe,v as le,_ as ae,E as se,x as ne,y as ie}from"./vendor.0caf144f.js";const re=function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))e(l);new MutationObserver(l=>{for(const s of l)if(s.type==="childList")for(const _ of s.addedNodes)_.tagName==="LINK"&&_.rel==="modulepreload"&&e(_)}).observe(document,{childList:!0,subtree:!0});function i(l){const s={};return l.integrity&&(s.integrity=l.integrity),l.referrerpolicy&&(s.referrerPolicy=l.referrerpolicy),l.crossorigin==="use-credentials"?s.credentials="include":l.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function e(l){if(l.ep)return;l.ep=!0;const s=i(l);fetch(l.href,s)}};re();const ue={key:0,class:"modal"},de={class:"modal_inner"},ce={class:"modal_content"},_e={class:"form_group"},fe={class:"form_group"},pe=n("div",{class:"title"},"\u5099\u8A3B",-1),ve={class:"modal_footer"},me=b("\u522A\u9664"),ke=b("\u95DC\u9589"),ge={props:{is_open:{type:Boolean,default:!1,required:!0},is_create:{type:Boolean,default:!0},data:{type:Object,default:{},required:!1}},emits:["ticket_add","ticket_save","ticket_delete","modal_close"],setup(S,{emit:a}){const i=S,e=m({}),l=m(!1);X(()=>{e.value=JSON.parse(JSON.stringify(i.data))});function s(){e.value.title.length===0?l.value=!0:(i.is_create?a("ticket_add",e.value):a("ticket_save",e.value),w())}function _(){a("ticket_delete",e.value),w()}function C(){a("modal_close"),w()}function w(){e.value={},l.value=!1}return(g,u)=>{const k=V("el-input"),f=V("el-button");return d(),B(F,{name:"fade"},{default:c(()=>[i.is_open?(d(),$("div",ue,[n("div",de,[n("div",ce,[n("div",_e,[n("div",{class:A(["title required",{has_error:l.value}])},"\u4E8B\u9805",2),r(k,{modelValue:e.value.title,"onUpdate:modelValue":u[0]||(u[0]=h=>e.value.title=h),maxlength:"50"},null,8,["modelValue"])]),n("div",fe,[pe,r(k,{modelValue:e.value.remark,"onUpdate:modelValue":u[1]||(u[1]=h=>e.value.remark=h),maxlength:"500",type:"textarea",rows:2},null,8,["modelValue"])])]),n("div",ve,[S.is_create?q("",!0):(d(),B(f,{key:0,type:"danger",onClick:u[2]||(u[2]=h=>_())},{default:c(()=>[me]),_:1})),r(f,{type:"primary",onClick:u[3]||(u[3]=h=>s())},{default:c(()=>[b(O(i.is_create?"\u65B0\u589E":"\u4FDD\u5B58"),1)]),_:1}),r(f,{type:"primary",onClick:u[4]||(u[4]=h=>C())},{default:c(()=>[ke]),_:1})])])])):q("",!0)]),_:1})}}},ye={key:0,class:"modal"},he={class:"modal_inner"},$e={class:"modal_content"},Ve={class:"form_group"},be={class:"modal_footer"},Ce=b("\u65B0\u589E"),Se=b("\u95DC\u9589"),we={props:{is_open:{type:Boolean,default:!1,required:!0}},emits:["status_add","modal_close"],setup(S,{emit:a}){const i=S,e=m(""),l=m(!1);function s(){e.value.length===0?l.value=!0:(a("status_add",e.value),C())}function _(){a("modal_close"),C()}function C(){e.value="",l.value=!1}return(w,g)=>{const u=V("el-input"),k=V("el-button");return d(),B(F,{name:"fade"},{default:c(()=>[i.is_open?(d(),$("div",ye,[n("div",he,[n("div",$e,[n("div",Ve,[n("div",{class:A(["title required",{has_error:l.value}])},"\u72C0\u614B",2),r(u,{modelValue:e.value,"onUpdate:modelValue":g[0]||(g[0]=f=>e.value=f),maxlength:"50"},null,8,["modelValue"])])]),n("div",be,[r(k,{type:"primary",onClick:g[1]||(g[1]=f=>s())},{default:c(()=>[Ce]),_:1}),r(k,{type:"primary",onClick:g[2]||(g[2]=f=>_())},{default:c(()=>[Se]),_:1})])])])):q("",!0)]),_:1})}}};const De={class:"header"},Ne=b("\u65B0\u589E\u4E8B\u9805"),Te=b("\u65B0\u589E\u72C0\u614B"),Oe=b("\u6E05\u7A7A\u4E8B\u9805"),Be={class:"container"},Ie=["onDrop"],xe={class:"status_title"},qe={key:1},Ee=["onDragstart","onClick"],Je={class:"plan_list_title"},Le={setup(S){const a=m(["\u5F85\u8FA6\u4E8B\u9805","\u9032\u884C\u4E2D","\u5DF2\u5B8C\u6210"]),i=m([!1,!1,!1]),e=m([]);Y(()=>{localStorage.getItem("status")&&(a.value=JSON.parse(localStorage.getItem("status"))),localStorage.getItem("tickets")&&(e.value=JSON.parse(localStorage.getItem("tickets")))}),L(a,(o,t)=>{localStorage.setItem("status",JSON.stringify(a.value))},{deep:!0}),L(e,(o,t)=>{localStorage.setItem("tickets",JSON.stringify(e.value))},{deep:!0});const l=m(!1),s=m(!0),_=m({});function C(o=!0,t={}){l.value=!0,o||(_.value=t,s.value=!1)}function w(o){var D;k();const y={id:e.value.length+1,title:o.title,remark:(D=o.remark)!=null?D:"",list:1};e.value.push(y)}function g(o){k(),e.value.forEach(t=>{t.id===o.id&&Object.assign(t,o)})}function u(o){k(),e.value=e.value.filter(t=>t.id!==o.id)}function k(){l.value=!1,s.value=!0,_.value={}}const f=m(!1);function h(){f.value=!0}function P(o){E(),a.value.push(o),i.value.push(!1)}function E(){f.value=!1}function z(o){return e.value.filter(t=>t.list==o)}function K(o,t){o.dataTransfer.dropEffect="move",o.dataTransfer.effectAllowed="move",o.dataTransfer.setData("listID",t.id)}function G(o,t){const y=o.dataTransfer.getData("listID"),D=e.value.find(I=>I.id==y);D.list=t}function H(){e.value=[]}function Q(o){se.confirm("\u78BA\u5B9A\u8981\u522A\u9664\u6B64\u72C0\u614B\u55CE\uFF1F\u5E95\u4E0B\u6240\u6709\u4E8B\u9805\u4E5F\u5C07\u6703\u88AB\u6E05\u9664\uFF01","\u522A\u9664",{confirmButtonText:"\u78BA\u5B9A",cancelButtonText:"\u53D6\u6D88",type:"warning"}).then(()=>{a.value.splice(o,1),i.value.splice(o,1),e.value=e.value.filter(t=>t.id!==o+1)}).catch(()=>{})}function R(o,t){i.value[o]=t}return(o,t)=>{const y=V("el-button"),D=V("el-popconfirm"),I=V("el-input"),W=V("el-button-group");return d(),$(x,null,[n("div",De,[r(y,{type:"primary",onClick:t[0]||(t[0]=N=>C())},{default:c(()=>[Ne]),_:1}),r(y,{type:"primary",onClick:t[1]||(t[1]=N=>h())},{default:c(()=>[Te]),_:1}),r(D,{"confirm-button-text":"\u78BA\u5B9A","cancel-button-text":"\u53D6\u6D88",icon:T(Z),"icon-color":"red",title:"\u78BA\u5B9A\u8981\u6E05\u7A7A\u6240\u6709\u4E8B\u9805\u55CE\uFF1F",onConfirm:t[2]||(t[2]=N=>H())},{reference:c(()=>[r(y,null,{default:c(()=>[Oe]),_:1})]),_:1},8,["icon"])]),n("div",Be,[(d(!0),$(x,null,M(a.value,(N,p)=>(d(),$("div",{class:"plan_board",key:`plan_board_${p}`,onDrop:v=>G(v,p+1),onDragenter:t[3]||(t[3]=U(()=>{},["prevent"])),onDragover:t[4]||(t[4]=U(()=>{},["prevent"]))},[n("div",xe,[i.value[p]?(d(),B(I,{key:0,modelValue:a.value[p],"onUpdate:modelValue":v=>a.value[p]=v,maxlength:"50"},null,8,["modelValue","onUpdate:modelValue"])):(d(),$("span",qe,O(N),1)),r(W,null,{default:c(()=>[r(y,{type:"text",icon:i.value[p]?T(ee):T(te),onClick:v=>R(p,!i.value[p])},null,8,["icon","onClick"]),oe(r(y,{type:"text",icon:T(ae),onClick:v=>Q(p)},null,8,["icon","onClick"]),[[le,!i.value[p]]])]),_:2},1024)]),(d(!0),$(x,null,M(z(p+1),v=>(d(),$("div",{class:"plan_list",key:v.id,draggable:"true",onDragstart:J=>K(J,v),onClick:J=>C(!1,v)},[n("span",Je,O(v.title),1),n("span",null,O(v.id),1)],40,Ee))),128))],40,Ie))),128))]),r(ge,{is_open:l.value,is_create:s.value,data:_.value,onTicket_add:w,onTicket_save:g,onTicket_delete:u,onModal_close:k},null,8,["is_open","is_create","data"]),r(we,{is_open:f.value,onStatus_add:P,onModal_close:E},null,8,["is_open"])],64)}}};const j=ne(Le);j.use(ie);j.mount("#app");
