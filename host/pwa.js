/* ---------- hosted build only: remember who is logged in, pick up new versions ---------- */
(function(){
const KEY='fore.session',FLAG='fore.updated',TRY='fore.tried';
const get=(s,k)=>{try{return s.getItem(k)}catch(e){return null}},set=(s,k,v)=>{try{v==null?s.removeItem(k):s.setItem(k,v)}catch(e){}};
const _land=land;land=function(r,p,msg){_land(r,p,msg);set(localStorage,KEY,JSON.stringify({r,p:S.persona}))};
const _out=ACT.logoutGo;ACT.logoutGo=(d,e,v)=>{set(localStorage,KEY,null);_out(d,e,v)};
let saved=null;try{saved=JSON.parse(get(localStorage,KEY))}catch(e){}
if(saved&&saved.r){_land(saved.r,saved.p||null)}
if(get(localStorage,FLAG)){set(localStorage,FLAG,null);toast('Updated to the latest version')}
let busy=false;
async function check(){if(busy||document.visibilityState!=='visible')return;busy=true;try{const r=await fetch('version.txt?t='+Date.now(),{cache:'no-store'});if(r.ok){const v=(await r.text()).trim();if(v&&v!==window.__BUILD&&get(sessionStorage,TRY)!==v){set(sessionStorage,TRY,v);set(localStorage,FLAG,'1');location.reload()}}}catch(e){}busy=false}
document.addEventListener('visibilitychange',check);addEventListener('pageshow',check);addEventListener('focus',check);
})();
