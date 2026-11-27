
/* ---------- pass 12: two ways in (analyse now, or share), full-screen analyser and compare ----------
   Analyse now: a golfer on their own, or a coach on the range with a student. Film, then straight into the analyser.
   Share: get a coach's review, send the video anywhere, or save a snapshot. A coach sends a lesson from the same screen. */
Object.assign(P,{swhand:'M8 13V5.5a1.5 1.5 0 013 0V12M11 11V4.5a1.5 1.5 0 013 0V12M14 11.5V6a1.5 1.5 0 013 0v8a6 6 0 01-6 6h-1a6 6 0 01-4.8-2.4L3.6 14a1.6 1.6 0 012.5-2L8 14',
 swexp:'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5',swcols:'M4 5h7v14H4zM13 5h7v14h-7z',swrows:'M4 4h16v7H4zM4 13h16v7H4z',
 swimg:'M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M15 9.5a.5.5 0 100-.1',swzoom:'M10.5 4a6.5 6.5 0 110 13 6.5 6.5 0 010-13zM20 20l-4.8-4.8M10.5 8v5M8 10.5h5'});

/* ---------- zoom: a view {z,x,y} lives on the canvas context, so every painter honours it ---------- */
const _swPaint12=swPaint;
swPaint=function(ctx,W,H,s){const R=_swPaint12(ctx,W,H,s),v=ctx.__v;if(!v||(v.z<=1.001&&!v.x&&!v.y))return R;
 const src=swSrc(swEl(s)),Z={x:R.x*v.z+v.x,y:R.y*v.z+v.y,w:R.w*v.z,h:R.h*v.z,z:v.z};ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);if(src)ctx.drawImage(src,Z.x,Z.y,Z.w,Z.h);return Z};
/* drawings keep their stroke and label size when zoomed */
swShape=function(ctx,R,s){const lw=Math.max(3,Math.min(R.w,R.h)/(R.z||1)*.012),Pt=q=>[R.x+q[0]*R.w,R.y+q[1]*R.h];ctx.save();ctx.strokeStyle=s.color;ctx.fillStyle=s.color;ctx.lineWidth=lw;ctx.lineCap='round';ctx.lineJoin='round';
 if(s.type==='line'||s.type==='arrow'){const a=Pt(s.a),b=Pt(s.b);ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke();
  if(s.type==='arrow'){const an=Math.atan2(b[1]-a[1],b[0]-a[0]),hl=lw*4;ctx.beginPath();ctx.moveTo(b[0],b[1]);ctx.lineTo(b[0]-hl*Math.cos(an-.45),b[1]-hl*Math.sin(an-.45));ctx.moveTo(b[0],b[1]);ctx.lineTo(b[0]-hl*Math.cos(an+.45),b[1]-hl*Math.sin(an+.45));ctx.stroke()}}
 else if(s.type==='circle'){const a=Pt(s.a),b=Pt(s.b);ctx.beginPath();ctx.arc(a[0],a[1],Math.hypot(b[0]-a[0],b[1]-a[1]),0,Math.PI*2);ctx.stroke()}
 else if(s.type==='free'){const p=s.pts.map(Pt);ctx.beginPath();ctx.moveTo(p[0][0],p[0][1]);p.forEach(q=>ctx.lineTo(q[0],q[1]));ctx.stroke()}
 else if(s.type==='angle'){const p=s.pts.map(Pt);ctx.beginPath();p.forEach((q,i)=>i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]));ctx.stroke();p.forEach(q=>{ctx.beginPath();ctx.arc(q[0],q[1],lw*.9,0,Math.PI*2);ctx.fill()});
  if(p.length===3){const v=p[1],a1=Math.atan2(p[0][1]-v[1],p[0][0]-v[0]),a2=Math.atan2(p[2][1]-v[1],p[2][0]-v[0]);let d=a2-a1;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;
   const r=lw*6,fs=Math.max(13,lw*4.2),mid=a1+d/2;ctx.beginPath();ctx.arc(v[0],v[1],r,a1,a1+d,d<0);ctx.stroke();ctx.font=`700 ${fs}px Inter,system-ui,sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';
   const tx=v[0]+Math.cos(mid)*(r+fs*1.1),ty=v[1]+Math.sin(mid)*(r+fs*1.1),deg=Math.round(Math.abs(d)*180/Math.PI)+'°';ctx.lineWidth=4;ctx.strokeStyle='rgba(0,0,0,.65)';ctx.strokeText(deg,tx,ty);ctx.fillText(deg,tx,ty)}}
 ctx.restore()};
const swV0=()=>({z:1,x:0,y:0});
function swVClamp(v,W,H){v.z=Math.max(1,Math.min(6,v.z));if(v.z<=1.001){v.z=1;v.x=0;v.y=0;return v}v.x=Math.min(0,Math.max(W*(1-v.z),v.x));v.y=Math.min(0,Math.max(H*(1-v.z),v.y));return v}
function swVZoom(v,k,cx,cy,W,H){const z=Math.max(1,Math.min(6,v.z*k)),f=z/v.z;v.x=cx-(cx-v.x)*f;v.y=cy-(cy-v.y)*f;v.z=z;return swVClamp(v,W,H)}
const _swHF12=swHintFor;swHintFor=(t,n)=>t==='view'?'':_swHF12(t,n);

/* view gestures, only while the Move tool is on: drag sideways steps frames, pinch zooms, drag pans when zoomed,
   double-tap zooms in or resets, single tap hands off (show or hide controls, or pick a pane). Wheel zooms any time. */
function swGest(stage,cv,h){const pts=new Map();let g=null,lastTap=0,tapT=null;
 const geo=()=>{const r=cv.getBoundingClientRect();return{r,k:cv.width/(r.width||1)}};
 const pt=e=>{const{r,k}=geo();return[(e.clientX-r.left)*k,(e.clientY-r.top)*k]};
 stage.addEventListener('pointerdown',e=>{if(e.target!==cv||!h.on())return;e.stopPropagation();e.preventDefault();try{cv.setPointerCapture(e.pointerId)}catch(_){}
  pts.set(e.pointerId,{p:pt(e)});const v=h.v();
  if(pts.size===2){const[a,b]=[...pts.values()];g={type:'pinch',d0:Math.hypot(a.p[0]-b.p[0],a.p[1]-b.p[1])||1,m0:[(a.p[0]+b.p[0])/2,(a.p[1]+b.p[1])/2],v0:Object.assign({},v)};return}
  if(pts.size===1)g={type:'one',c0:[e.clientX,e.clientY],p0:pt(e),v0:Object.assign({},v),t0:h.time(),at:performance.now(),moved:false,mode:null}},true);
 stage.addEventListener('pointermove',e=>{const r=pts.get(e.pointerId);if(!r)return;e.stopPropagation();r.p=pt(e);const v=h.v(),W=cv.width,H=cv.height;
  if(g&&g.type==='pinch'&&pts.size>=2){const[a,b]=[...pts.values()],d=Math.hypot(a.p[0]-b.p[0],a.p[1]-b.p[1]),m=[(a.p[0]+b.p[0])/2,(a.p[1]+b.p[1])/2],z=Math.max(1,Math.min(6,g.v0.z*d/g.d0)),f=z/g.v0.z;
   v.z=z;v.x=m[0]-(g.m0[0]-g.v0.x)*f;v.y=m[1]-(g.m0[1]-g.v0.y)*f;swVClamp(v,W,H);return}
  if(g&&g.type==='one'){const dx=e.clientX-g.c0[0],dy=e.clientY-g.c0[1];
   if(!g.moved&&Math.hypot(dx,dy)>8){g.moved=true;g.mode=g.v0.z>1?'pan':Math.abs(dx)>=Math.abs(dy)?'jog':'none';if(g.mode==='jog'&&h.jogStart)h.jogStart()}
   if(g.mode==='pan'){const{k}=geo();v.x=g.v0.x+dx*k;v.y=g.v0.y+dy*k;swVClamp(v,W,H)}
   else if(g.mode==='jog')h.jog(g.t0+Math.round(dx/7)/30)}},true);
 const up=e=>{if(!pts.has(e.pointerId))return;e.stopPropagation();pts.delete(e.pointerId);
  if(g&&(g.type==='pinch'||g.type==='hold')){g=pts.size?{type:'hold'}:null;return}
  if(g&&g.type==='one'&&!g.moved&&e.type==='pointerup'&&performance.now()-g.at<350){const now=performance.now(),p=g.p0;
   if(now-lastTap<300){clearTimeout(tapT);lastTap=0;const v=h.v();if(v.z>1.01)Object.assign(v,swV0());else swVZoom(v,2.5,p[0],p[1],cv.width,cv.height)}
   else{lastTap=now;tapT=setTimeout(()=>{if(h.tap)h.tap()},270)}}
  if(!pts.size)g=null};
 stage.addEventListener('pointerup',up,true);stage.addEventListener('pointercancel',up,true);
 stage.addEventListener('wheel',e=>{e.preventDefault();const p=pt(e);swVZoom(h.v(),Math.exp(-e.deltaY*.0025),p[0],p[1],cv.width,cv.height)},{passive:false})}

/* ---------- the full-screen analyser ---------- */
class SwFS extends SwStudio{
 constructor(root,s,o={}){super(root,s,Object.assign({tools:true},o));this.v=swV0();this.ctx.__v=this.v;this.tool='view';this.hid=false;this.was=false;this.paint();
  this.zb=root.querySelector('.fszoom');
  swGest(root.querySelector('.svstage'),this.cv,{on:()=>this.tool==='view',v:()=>this.v,time:()=>this.t,jogStart:()=>this.pause(),jog:t=>this.seek(t),tap:()=>this.setHid(!this.hid)});
  this.kh=e=>{if(!this.root.isConnected||document.querySelector('.sheet'))return;const tg=e.target;if(tg&&tg.closest&&tg.closest('input,textarea,select'))return;
   if(e.key===' '){e.preventDefault();this.toggle()}else if(e.key==='ArrowLeft'){e.preventDefault();this.pause();this.seek(this.t-1/30)}else if(e.key==='ArrowRight'){e.preventDefault();this.pause();this.seek(this.t+1/30)}};
  document.addEventListener('keydown',this.kh)}
 destroy(){super.destroy();document.removeEventListener('keydown',this.kh);clearTimeout(this.hT)}
 setHid(h){if(this.rec)h=false;this.hid=h;this.root.classList.toggle('hid',h);clearTimeout(this.hT)}
 paint(){super.paint();if(this.root)this.root.classList.toggle('drawing',!!this.tool&&this.tool!=='view')}
 click(e){const b=e.target.closest('[data-s]');if(b&&this.root.contains(b)){const k=b.dataset.s;if(k==='zoom'){Object.assign(this.v,swV0());return}if(k==='bigplay'){this.toggle();return}
  if(k.startsWith('tool:')&&this.hid)this.setHid(false)}super.click(e)}
 tick(dt){super.tick(dt);if(this.playing&&!this.was&&!this.rec&&this.tool==='view'){clearTimeout(this.hT);this.hT=setTimeout(()=>{if(this.playing&&!this.rec&&this.tool==='view')this.setHid(true)},1400)}
  if(!this.playing&&this.was&&this.hid)this.setHid(false);this.was=this.playing}
 frame(){super.frame();const W=this.cv.width,H=this.cv.height;if(this.rec&&W){const sm=this.rec.samples,l=sm[sm.length-1];if(!l.v)l.v=[+this.v.z.toFixed(3),this.v.x/W,this.v.y/H]}
  if(this.zb){const on=this.v.z>1.01;if(this.zb.hidden===on)this.zb.hidden=!on;if(on){const b=this.zb.querySelector('b'),t=this.v.z.toFixed(1)+'×';if(b.textContent!==t)b.textContent=t}}}
}
/* replays reproduce the coach's zoom from the recorded samples */
const _rpDraw12=SwReplay.prototype.draw;SwReplay.prototype.draw=function(){const a=this.an&&this.an.samples;
 if(a&&a.length&&!this.an.still){let lo=0,hi=a.length-1;while(lo<hi){const m=(lo+hi+1)>>1;if(a[m].at<=this.ms)lo=m;else hi=m-1}const v=a[lo].v;
  if(v&&v[0]>1.001){swFit(this.cv);const W=this.cv.width,H=this.cv.height;this.ctx.__v={z:v[0],x:v[1]*W,y:v[2]*H}}else this.ctx.__v=null}
 _rpDraw12.call(this)};

const fsRail=()=>`<div class="fsrail" role="toolbar" aria-label="Tools">${[['view','Move and zoom','swhand'],['line','Line','swline'],['arrow','Arrow','swarrow'],['circle','Circle','swcirc'],['angle','Angle','swangle'],['pen','Draw','swpen']].map(([k,l,i])=>`<button data-s="tool:${k}" aria-label="${l}" aria-pressed="${k==='view'}">${ic(i)}</button>`).join('')}<span class="fssep"></span><button data-s="color" aria-label="Change colour"><i></i></button><button data-s="undo" aria-label="Undo">${ic('undo')}</button><button data-s="clear" aria-label="Clear drawings">${ic('swtrash')}</button></div>`;
const fsCtl=()=>`<div class="svctl"><div class="svscrub"><input type="range" min="0" max="1000" value="0" aria-label="Scrub the swing"><span class="tl num">0.00 s</span></div><div class="svrow"><div class="svgrp"><button class="svrb" data-s="prev" aria-label="Back one frame">${ic('swprev')}</button><button class="svrb pri" data-s="play" aria-label="Play">${ic('play')}</button><button class="svrb" data-s="next" aria-label="Forward one frame">${ic('swnext')}</button></div><div class="svspd" role="group" aria-label="Speed">${[['0.125','⅛×'],['0.25','¼×'],['0.5','½×'],['1','1×']].map(([v,l])=>`<button data-s="rate:${v}" aria-pressed="${v==='1'}">${l}</button>`).join('')}</div></div></div>`;
function swFSSub(s,co){const st=s.student&&stud(s.student);
 if(co)return `<span class="fssub">${s.status==='sent'?`${st.first} asked for a review`:st?`Saved to ${st.first}'s swings`:'Only you can see this'}</span>`;
 const c=swCoachOf(s);if(s.status==='replied'&&s.lesson)return `<button class="fssub ok" data-a="go" data-v="swlesson" data-id="${s.id}">${ic('play','width="13" height="13"')}Coach ${swFirst(c)}'s lesson is ready · watch</button>`;
 if(s.status==='sent')return `<button class="fssub" data-a="go" data-v="swstatus" data-id="${s.id}">${ic('clock','width="13" height="13"')}With Coach ${swFirst(c)} · see progress</button>`;
 return `<span class="fssub">Saved to your swings${s.by==='coach'?' · filmed by your coach':''}</span>`}
function swFSHTML(s,mode){const co=mode==='coach',st=s.student&&stud(s.student),rec=co&&!!st;if(S.swCam==null)S.swCam=true;
 const title=co?`${st?st.first:'You'} · ${s.club}`:`${s.club} · ${s.angle}`;
 return `<div class="fs" data-swm="fs" data-id="${s.id}" data-mode="${mode}">
 <div class="svstage"><canvas aria-label="Swing video. Drag sideways to step through frames, pinch to zoom, or pick a tool to draw."></canvas><button class="svbig" data-s="bigplay" aria-label="Play">${ic('play')}</button><span class="svbadge rec" hidden></span>${rec?`<span class="svpip" ${S.swCam?'':'hidden'}>AR</span>`:''}<span class="svhint" hidden></span></div>
 <div class="fstop"><button class="fsib" data-a="back" aria-label="Close">${ic('x')}</button><div class="fsti"><b>${esc(title)}</b>${swFSSub(s,co)}</div>${rec?`<button class="fsib" data-a="swCam12" aria-pressed="${!!S.swCam}" aria-label="Face cam in the recording">${ic('swcam')}</button>`:''}<button class="fsib" data-a="swCmp" data-id="${s.id}" aria-label="Compare with another swing">${ic('swcols')}</button><button class="fspill" data-a="swShare" data-id="${s.id}">${ic('share')}${co&&st?'Send':'Share'}</button></div>
 <button class="fszoom" data-s="zoom" hidden aria-label="Reset zoom">${ic('swzoom')}<b>1.0×</b></button>
 ${fsRail()}
 <div class="fsbot">${rec?'<div class="fsact"></div>':''}${fsCtl()}</div></div>`}

V.swing=p=>{const s=swing(p.id);if(!s)return nb('Swing')+'<div class="scroll"><div class="empty"><b>Swing not found</b></div></div>';
 if(S.role==='coach'){if(s.status==='sent')return V.swbrief(p);if(s.status==='replied'&&s.lesson)return swLessonHTML(s,s.lesson,'coach')}
 return swFSHTML(s,S.role==='coach'?'coach':'golfer')};
V.swstudio=p=>{const s=swing(p.id);swWork(s);if(s.rv&&s.status==='sent')s.rv.stage='inreview';return swFSHTML(s,'coach')};
ACT.swCam12=(d,el)=>{S.swCam=!S.swCam;el.setAttribute('aria-pressed',String(S.swCam));const p=el.closest('.fs').querySelector('.svpip');if(p&&!p.querySelector('video'))p.hidden=!S.swCam;toast(S.swCam?'Face cam on for the voice-over':'Face cam off. Voice only.')};

SWMOUNT.fs=el=>{const s=swing(el.dataset.id),co=el.dataset.mode==='coach',w=co?swWork(s):null,shapes=co?w.shapes:(s.drawings||(s.drawings=[]));
 const act=el.querySelector('.fsact'),badge=el.querySelector('.svbadge.rec'),pip=el.querySelector('.svpip'),camB=el.querySelector('[data-a=swCam12]'),stg=el.querySelector('.svstage');let recing=false,last=-1e3,stop=()=>{};
 const stu=new SwFS(el,s,{shapes,onTick:t=>{if(t-last>200){last=t;badge.innerHTML=`<span class="svdot"></span>REC ${swMs(t)} / 3:00`}},onLimit:()=>stop()});window.__swfs=stu;window.__swcmp=null;
 if(!act)return;
 const foot=()=>{act.innerHTML=recing?`<button class="fsbtn red" data-f="stop"><span class="svsq"></span>Stop recording</button>`
  :w.an?`<span class="fsdone">${ic('check','width="14" height="14"')}Voice-over recorded · ${swMs(w.an.duration)}${w.an.mic?'':' · no voice'}</span><button class="fsbtn" data-f="rec">Re-record</button><button class="fsbtn pri" data-f="next">Next: add a note</button>`
  :`<button class="fsbtn red" data-f="rec"><span class="svdot"></span>Record voice-over</button><span class="fshelp">Talk while you play, pause, scrub, zoom and draw. It all replays in sync.</span>`};
 stop=async()=>{if(!recing)return;recing=false;const an=await stu.stopRec();if(an)w.an=an;w.shapes=stu.shapes;el.classList.remove('recing');if(camB)camB.disabled=false;badge.hidden=true;stg.classList.remove('rec');if(pip){pip.innerHTML='AR';pip.hidden=!S.swCam}if(el.isConnected){foot();if(an)toast('Voice-over saved')}};
 const start=async()=>{const b=act.querySelector('[data-f=rec]');if(b){b.disabled=true;b.textContent='Starting…'}const rec=await stu.startRec(S.swCam);if(!el.isConnected){stu.stopRec(true);return}
  w.an=null;recing=true;stu.setHid(false);el.classList.add('recing');if(camB)camB.disabled=true;badge.hidden=false;badge.innerHTML='<span class="svdot"></span>REC 0:00 / 3:00';stg.classList.add('rec');
  if(rec.cam&&pip){pip.innerHTML='<video autoplay muted playsinline></video>';pip.querySelector('video').srcObject=rec.stream;pip.hidden=false}
  if(!rec.mic)toast('No microphone, so no voice. Scrubbing, zoom and drawings are still recorded.');foot()};
 act.addEventListener('click',e=>{const b=e.target.closest('[data-f]');if(!b||b.disabled)return;const f=b.dataset.f;if(f==='rec')start();else if(f==='stop')stop();else if(f==='next'){w.shapes=stu.shapes;swToReply(s.id)}});
 const keep=()=>{if(!el.isConnected){w.shapes=stu.shapes;return}setTimeout(keep,500)};keep();foot()};

/* ---------- full-screen lesson replay ---------- */
const _slh12=swLessonHTML;swLessonHTML=function(s,L,mode){let h=_slh12(s,L,mode);
 if(L.an&&!L.an.still)h=h.replace(/(<div class="svpane" data-swm="lesson"[^>]*><\/div>)/,`<div class="svpw">$1<button class="svexp" data-a="swLfs" data-id="${s.id}" data-mode="${mode}" aria-label="Watch full screen">${ic('swexp')}Full screen</button></div>`);
 return h.replace('data-a="go" data-v="swup"','data-a="swUp" data-id="analyse"')};
ACT.swLfs=d=>go('swlfs',{id:d.id,mode:d.mode});
V.swlfs=p=>{const s=swing(p.id),c=swCoachOf(s);return `<div class="fs lfs" data-swm="lfs" data-id="${s.id}" data-mode="${p.mode||'golfer'}"><div class="svstage"><canvas aria-label="Swing analysis. Tap to play or pause."></canvas><span class="svbig" aria-hidden="true">${ic('play')}</span><span class="svpip" hidden></span></div>
 <div class="fstop"><button class="fsib" data-a="back" aria-label="Close">${ic('x')}</button><div class="fsti"><b>Swing analysis</b><span class="fssub">Coach ${swFirst(c)} · ${esc(s.club)}, ${esc(s.angle)}</span></div></div>
 <div class="fsbot"><div class="svctl"><div class="svscrub"><button class="svrb pri" data-r="play" aria-label="Play lesson">${ic('play')}</button><input type="range" min="0" max="1000" value="0" aria-label="Lesson position"><span class="tl num">0:00</span></div></div></div></div>`};
SWMOUNT.lfs=el=>{const s=swing(el.dataset.id),L=el.dataset.mode==='preview'?swWork(s):s.lesson;if(L&&L.an)new SwReplay(el,s,L.an)};

/* ---------- share: review, send the video, snapshot ---------- */
function swFilePre(s){if(s.file||s.__fp||!s.url)return;s.__fp=fetch(s.url).then(r=>r.blob()).then(b=>{s.file=new File([b],'fore-swing.'+((b.type||'').includes('webm')?'webm':'mp4'),{type:b.type||'video/mp4'})}).catch(()=>{})}
ACT.swShare=d=>{const s=swing(d.id);if(!s)return;swFilePre(s);const co=S.role==='coach',st=s.student&&stud(s.student),R=[];
 const row=(a,i,t,sub,x='')=>`<button class="row" data-a="${a}" data-id="${s.id}" ${x}><span class="tile ${i[1]||''}">${ic(i[0])}</span><span class="m"><span class="t" style="display:block">${t}</span><span class="small muted">${sub}</span></span>${ic('chev','class="chev"')}</button>`;
 if(co&&st){if(s.status==='replied'&&s.lesson)R.push(row('swLessonC',['check','o'],`Lesson sent to ${st.first}`,'See what they got'));
  else{const w=swWork(s);R.push(row('swToR',['send','o'],`Send to ${st.first} as a lesson`,w.an?`Your ${swMs(w.an.duration)} voice-over, plus a note and drill`:'Record a voice-over first, or just send a note'))}}
 if(!co){const C=myCoaches(s.student),c=C[0];
  if(s.status==='sent')R.push(row('swGoSt',['clock','o'],`With Coach ${swFirst(swCoachOf(s))}`,'See where your review is'));
  else if(s.status==='replied'&&s.lesson)R.push(row('swGoL',['play','o'],`Watch Coach ${swFirst(swCoachOf(s))}'s lesson`,'Voice-over on this swing'));
  else if(c){const pr=swPriceFor(c.id,s.student);R.push(row('swRv',['send','o'],`Get a review from Coach ${swFirst(c)}`,`${pr?money(pr):'Free'} · a voice-over on this video`))}
  else R.push(row('swRvAny',['send','o'],"Get a coach's review",'From ₹500 · refunded if there\'s no reply in 48 hours'))}
 R.push(row('swSendVid',['video'],'Send the video','WhatsApp, Messages, AirDrop and more'));
 R.push(row('swSnap',['swimg'],'Save a snapshot','This frame with your drawings, as a picture'));
 openSheet(()=>`<h2>${co&&st?`Send ${st.first}'s swing`:'Share this swing'}</h2><div class="list">${R.join('')}</div>${st&&st.junior?`<div class="demo">${ic('shield')}${st.first} is a junior. Only share outside Fore! with their parent's OK.</div>`:''}`)};
ACT.swToR=d=>{closeSheet();const w=swWork(swing(d.id));if(window.__swfs&&window.__swfs.root.isConnected&&!window.__swfs.rec)w.shapes=window.__swfs.shapes;swToReply(d.id)};
ACT.swLessonC=d=>{closeSheet();go('swing',{id:d.id})};
ACT.swGoSt=d=>{closeSheet();go('swstatus',{id:d.id})};
ACT.swGoL=d=>{closeSheet();go('swlesson',{id:d.id})};
ACT.swRv=d=>{closeSheet();S.swForm=null;go('swsend',{id:d.id})};
ACT.swRvAny=d=>{ACT.swPaid({id:d.id})};
ACT.swSendVid=async d=>{const s=swing(d.id),title=`${s.club} · ${s.angle}`,f=s.file;closeSheet();
 if(f&&navigator.canShare&&navigator.canShare({files:[f]})){try{await navigator.share({files:[f],title});return}catch(e){if(e&&e.name==='AbortError')return}}
 const link='https://fore.golf/s/'+s.id;if(navigator.share){try{await navigator.share({title,text:'My swing on Fore!',url:link});return}catch(e){if(e&&e.name==='AbortError')return}}
 try{await navigator.clipboard.writeText(link);toast('Link copied')}catch(_){toast('Link: fore.golf/s/'+s.id)}};
function swMark(o){const x=o.getContext('2d'),fs=Math.round(o.width*.03)+10;x.font=`800 ${fs}px Inter,system-ui,sans-serif`;x.textAlign='right';x.textBaseline='bottom';x.lineWidth=3;x.strokeStyle='rgba(0,0,0,.5)';x.strokeText('Fore!',o.width-fs*.6,o.height-fs*.5);x.fillStyle='rgba(255,255,255,.9)';x.fillText('Fore!',o.width-fs*.6,o.height-fs*.5);return o}
function swSnapCanvas(){const c=window.__swcmp,f=window.__swfs,o=document.createElement('canvas'),x=o.getContext('2d');
 if(c&&c.root.isConnected){const A=c.P[0].cv,B=c.P[1].cv,stk=!!c.root.querySelector('.cmprow.stack'),g=8;if(stk){o.width=Math.max(A.width,B.width);o.height=A.height+B.height+g}else{o.width=A.width+B.width+g;o.height=Math.max(A.height,B.height)}
  x.fillStyle='#000';x.fillRect(0,0,o.width,o.height);x.drawImage(A,0,0);if(stk)x.drawImage(B,0,A.height+g);else x.drawImage(B,A.width+g,0);return swMark(o)}
 if(f&&f.root.isConnected&&f.cv.width){o.width=f.cv.width;o.height=f.cv.height;x.drawImage(f.cv,0,0);return swMark(o)}return null}
ACT.swSnap=()=>{closeSheet();let c=null;try{c=swSnapCanvas()}catch(_){}if(!c){toast('Nothing to snapshot yet');return}
 c.toBlob(async b=>{if(!b){toast("Couldn't make a snapshot here");return}const f=new File([b],'fore-swing.png',{type:'image/png'});
  if(navigator.canShare&&navigator.canShare({files:[f]})){try{await navigator.share({files:[f]});return}catch(e){if(e&&e.name==='AbortError')return}}
  const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='fore-swing.png';document.body.appendChild(a);a.click();a.remove();toast('Snapshot saved')},'image/png')};
document.addEventListener('change',e=>{if(e.target.dataset&&e.target.dataset.swfile&&e.target.files[0]){const s=S.swings[0];if(s&&!s.file)s.file=e.target.files[0];e.target.value=''}});

/* ---------- two ways in ---------- */
ACT.swUp=d=>{S.swUp={intent:d.id||'analyse'};go('swup')};
ACT.swAdd=()=>ACT.swUp({id:'analyse'});
const _swup12=V.swup;V.swup=()=>{const u=S.swUp||{intent:'analyse'},co=S.role==='coach',st=co&&u.who?stud(u.who):null,c=!co&&myCoaches(S.who)[0];
 const t=co?(st?`Film ${st.first}'s swing`:'Film your swing'):u.intent==='review'?'Get a review':'Analyse a swing';
 const lead=co?`Opens straight into the analyser. ${st?`It's saved to ${st.first}'s swings. Talk ${st.first} through it right there, or send it as a lesson.`:'Only you can see it.'}`
  :u.intent==='review'?`Film or pick a swing, then add your question${c?` for Coach ${swFirst(c)}`:''} and send it.`:'Opens straight into the analyser: slow it down, zoom in, step frame by frame and draw on it. Nothing is shared unless you choose to.';
 const h=_swup12().replace(nb('Add a swing'),nb(t)),i=h.indexOf('<div class="list">');return h.slice(0,i)+`<p class="small muted swlead">${lead}</p>`+h.slice(i)};
swNew=function(url){const u=S.swUp||{intent:'analyse'},co=S.role==='coach',w=co?(u.who||null):S.who;
 const s={id:'s'+(uid++),student:w,club:'7-iron',angle:'Down the line',d:0,status:'own',marks:[],url,comment:'',voice:0,drawings:[],by:co?'coach':'golfer',at:Date.now()};S.swings.unshift(s);closeSheet();S.swForm=null;
 const st=nv().stack;if(st.length&&st[st.length-1].name==='swup')st.pop();
 if(!co&&u.intent==='review'){const has=myCoaches(w).length;st.push({name:has?'swsend':'swing',p:{id:s.id}});show('push');if(!has)setTimeout(()=>ACT.swPaid({id:s.id}),380)}
 else{st.push({name:'swing',p:{id:s.id}});show('push');const who=co&&w?stud(w):null;setTimeout(()=>toast(who?`Saved to ${who.first}'s swings`:'Saved. Drag sideways to step through it.'),420)}
 if(url&&url.startsWith('blob:')){const v=swEl(s);v.addEventListener('loadedmetadata',()=>{if(v.duration>60.5)toast('Over 60 seconds. Trim it on your phone first.')},{once:true})}};
const _swSeg12=swingsSeg;swingsSeg=function(w){const h=_swSeg12(w),c=myCoaches(w)[0];
 const two=`<div class="swacts"><button class="card press swact" data-a="swUp" data-id="analyse"><span class="tile o">${ic('swpen')}</span><b>Analyse</b><span class="small muted">Film it, then slow it down, zoom and draw</span></button><button class="card press swact" data-a="swUp" data-id="review"><span class="tile">${ic('send')}</span><b>Get a review</b><span class="small muted">${c?`Coach ${swFirst(c)} replies with a voice-over`:'A coach replies with a voice-over'}</span></button></div>`;
 return h.replace(`<button class="btn full" data-a="go" data-v="swup">${ic('video')}Upload a swing</button>`,two)};
/* the pay sheet showed the saved club and angle, not the ones just picked */
const _swGo12=ACT.swGo;ACT.swGo=d=>{const s=swing(d.id),f=swFormOf(s);s.club=f.club;s.angle=f.angle;_swGo12(d)};

/* coach: film a student (or yourself) on the range */
ACT.swFilm=d=>{if(d&&d.s){S.swUp={intent:'analyse',who:d.s};closeSheet();go('swup');return}
 let today=[];try{today=upcoming(l=>l.coach==='arjun'&&l.d===0).map(l=>l.student)}catch(_){}
 const R=roster().slice().sort((a,b)=>(today.includes(b.id)?1:0)-(today.includes(a.id)?1:0));
 openSheet(()=>`<h2>Whose swing?</h2><p class="muted">Film it, then slow it down, zoom, draw and talk them through it, right there on the range.</p><div class="list">${R.map(x=>`<button class="row" data-a="swFilm" data-s="${x.id}">${av(x.init,'p')}<span class="m"><span class="t" style="display:block">${x.name}</span>${today.includes(x.id)?'<span class="small muted">Lesson today</span>':''}</span>${ic('chev','class="chev"')}</button>`).join('')}
 <button class="row" data-a="swFilmMe">${mono(ME)}<span class="m"><span class="t" style="display:block">Just me</span><span class="small muted">Your own swing. Only you see it.</span></span>${ic('chev','class="chev"')}</button></div>`)};
ACT.swFilmMe=()=>{S.swUp={intent:'analyse',who:null};closeSheet();go('swup')};
const _today12=V.today;V.today=()=>{let h=_today12();const i=h.indexOf('swtoday');if(i<0)return h;const j=h.indexOf('</button>',i)+9;
 return h.slice(0,j)+`<button class="btn sec2 full swfilm" data-a="swFilm">${ic('swcam')}Film & analyse a swing</button>`+h.slice(j)};
const _stud12=V.student;V.student=p=>_stud12(p).replace(`${ic('plus')}Add lesson</button></div>`,`${ic('plus')}Add lesson</button></div><button class="btn sec2 sm full" data-a="swFilm" data-s="${p.id}">${ic('swcam')}Film & analyse ${stud(p.id).first}'s swing</button>`);
const _inbox12=V.swinbox;V.swinbox=()=>{const F=S.swings.filter(s=>s.by==='coach'),tab=S.swTab||'todo';
 const camB=`<button class="ib" data-a="swFilm" aria-label="Film and analyse a swing">${ic('swcam')}</button>`;
 let h=_inbox12().replace('<button class="ib" data-a="go" data-v="swpricing"',camB+'<button class="ib" data-a="go" data-v="swpricing"').replace(/(Replied · \d+<\/button>)<\/div>/,`$1<button data-a="swTab" data-id="film" aria-pressed="${tab==='film'}">Filmed · ${F.length}</button></div>`);
 if(tab!=='film')return h;
 const row=s=>{const st=s.student&&stud(s.student);return `<button class="row" data-a="go" data-v="swing" data-id="${s.id}">${swThumbSm(s)}<span class="m"><span class="t" style="display:block">${st?st.name:'You'}</span><span class="small muted">${esc(s.club)} · ${dLbl(s.d)}</span></span>${s.status==='replied'?'<span class="pill ok">Lesson sent</span>':'<span class="pill">Saved</span>'}</button>`};
 const a=h.indexOf('<div class="seg">'),b=h.indexOf('</div>',a)+6,e=h.indexOf('<button class="card press swprice"');
 return h.slice(0,b)+`<button class="btn full" data-a="swFilm">${ic('swcam')}Film & analyse a swing</button>`+(F.length?`<div class="list">${F.map(row).join('')}</div>`:`<div class="empty">${ic('swcam','class="i"')}<b>Nothing filmed yet</b><span class="small muted">Film a student on the range, slow it down and draw on it together. It's saved to their swings.</span></div>`)+h.slice(e)};

/* ---------- full-screen compare ---------- */
const swCmpOpts2=s=>{const L=s.student?S.swings.filter(x=>x.student===s.student):s.by==='coach'?S.swings.filter(x=>x.by==='coach'&&!x.student):S.swings.filter(x=>x.student===S.who);return L.concat([SW_MODEL])};
ACT.swCmp=d=>{const a=swGet(d.id),o=swCmpOpts2(a).filter(x=>x.id!==a.id),b=o.find(x=>x.url&&x.id!=='model')||o.find(x=>x.id!=='model')||SW_MODEL;go('swcompare',{a:a.id,b:b.id})};
ACT.swCmpPick=d=>{const c=cur(),here=d.k==='0'?c.p.a:c.p.b,other=d.k==='0'?c.p.b:c.p.a,base=swGet(here==='model'?other:here),o=swCmpOpts2(base).filter(x=>x.id!==other);
 openSheet(()=>`<h2>Pick the ${d.k==='0'?(S.swCmpL==='stack'?'top':'left'):(S.swCmpL==='stack'?'bottom':'right')} swing</h2><div class="list">${o.map(x=>{const[t,sub]=cmpLbl(x);return `<button class="row" data-a="swCmpSet" data-k="${d.k}" data-id="${x.id}" aria-pressed="${x.id===here}">${swThumbSm(x)}<span class="m"><span class="t" style="display:block">${esc(t)}</span><span class="small muted">${esc(sub)}</span></span>${x.id===here?ic('check','width="18" height="18" style="color:var(--flag)"'):''}</button>`}).join('')}</div>`)};
V.swcompare=p=>{const A=swGet(p.a),B=swGet(p.b),L=S.swCmpL==='stack'?'stack':'side';
 const pane=(s,k)=>{const[t,sub]=cmpLbl(s);return `<div class="cmpp" data-k="${k}"><div class="svstage"><canvas aria-label="${k==='0'?'First':'Second'} swing"></canvas><span class="cmpt num">0.00 s</span></div><button class="cmplbl" data-a="swCmpPick" data-k="${k}"><span><b>${esc(t)}</b><span>${esc(sub)}</span></span>${ic('chev','width="14" height="14"')}</button></div>`};
 const tb=[['view','Move and zoom','swhand'],['line','Line','swline'],['arrow','Arrow','swarrow'],['circle','Circle','swcirc'],['angle','Angle','swangle'],['pen','Draw','swpen']];
 return `<div class="fs fcmp" data-swm="cmp" data-x="${A.id}" data-y="${B.id}">
 <div class="fctop"><button class="fsib" data-a="back" aria-label="Close">${ic('x')}</button><div class="fsti"><b>Compare</b><span class="fssub">${L==='side'?'Side by side':'Stacked'}</span></div><button class="fsib" data-a="swCmpL" aria-label="${L==='side'?'Stack the swings':'Put them side by side'}">${ic(L==='side'?'swrows':'swcols')}</button><button class="fsib" data-a="swCmpSwap" aria-label="Swap the swings">${ic('swswap')}</button><button class="fsib" data-a="swSnap" aria-label="Save a snapshot of both">${ic('swimg')}</button></div>
 <div class="cmprow ${L}">${pane(A,'0')}${pane(B,'1')}</div>
 <div class="svtools cmptools" role="toolbar" aria-label="Tools">${tb.map(([k,l,i])=>`<button data-c="tool:${k}" aria-label="${l}" aria-pressed="${k==='view'}">${ic(i)}</button>`).join('')}<span class="svsep"></span><button data-c="color" aria-label="Change colour"><i></i></button><button data-c="both" aria-label="Draw on both swings" aria-pressed="false">${ic('swboth')}</button><button data-c="copy" aria-label="Copy drawings to the other swing">${ic('swcopy')}</button><button data-c="undo" aria-label="Undo">${ic('undo')}</button><button data-c="clear" aria-label="Clear drawings on this swing">${ic('swtrash')}</button></div>
 <div class="cmphint" aria-live="polite"></div>
 <div class="svctl"><button class="cmplink" data-c="link"></button><div class="svscrub"><input type="range" min="0" max="1000" value="0" aria-label="Scrub"><span class="tl num">0.00 s</span></div><div class="svrow"><div class="svgrp"><button class="svrb" data-c="prev" aria-label="Back one frame">${ic('swprev')}</button><button class="svrb pri" data-c="play" aria-label="Play">${ic('play')}</button><button class="svrb" data-c="next" aria-label="Forward one frame">${ic('swnext')}</button></div><div class="svspd" role="group" aria-label="Speed">${[['0.125','⅛×'],['0.25','¼×'],['0.5','½×'],['1','1×']].map(([v,l])=>`<button data-c="rate:${v}" aria-pressed="${v==='0.5'}">${l}</button>`).join('')}</div></div></div></div>`};
ACT.swCmpL=(d,el)=>{S.swCmpL=S.swCmpL==='stack'?'side':'stack';const r=el.closest('.fcmp');if(!r)return;const k=S.swCmpL,row=r.querySelector('.cmprow');row.classList.toggle('stack',k==='stack');row.classList.toggle('side',k!=='stack');
 el.innerHTML=ic(k==='stack'?'swcols':'swrows');el.setAttribute('aria-label',k==='stack'?'Put them side by side':'Stack the swings');r.querySelector('.fctop .fssub').textContent=k==='stack'?'Stacked':'Side by side'};
class SwCompare2 extends SwCompare{
 constructor(root,A,B){super(root,A,B);this.tool='view';
  this.P.forEach((p,i)=>{p.v=swV0();p.ctx.__v=p.v;swGest(p.el.querySelector('.svstage'),p.cv,{on:()=>this.tool==='view',v:()=>p.v,time:()=>p.t,jogStart:()=>{this.pause();this.select(i)},jog:t=>{if(this.linked)this.seekM(i?t-this.off:t);else this.seekP(p,t)},tap:()=>this.select(i)})});
  this.paint();window.__swcmp=this;window.__swfs=null}
 paintHint(){if(this.tool==='view'){this.ui.hint.textContent=this.linked?'Linked. Drag either swing sideways to step both. Pinch to zoom.':'Tap a swing and drag sideways to line it up. Then link them.';return}super.paintHint()}
 select(i){super.select(i);if(this.tool==='view')this.paintHint()}
}
SWMOUNT.cmp=el=>{new SwCompare2(el,swGet(el.dataset.x),swGet(el.dataset.y))};

/* status bar goes black on the full-screen screens */
const SW_FS=['swstudio','swcompare','compare','swlfs'];
const _show12=show;show=function(k){_show12(k);const c=cur(),ph=$('#phone');if(!ph)return;let f=SW_FS.includes(c.name);
 if(c.name==='swing'){const s=swing(c.p.id);f=!!s&&!(S.role==='coach'&&(s.status==='sent'||(s.status==='replied'&&s.lesson)))}ph.classList.toggle('swfs',f);if(f)ph.classList.add('swdark')};
show('none');
