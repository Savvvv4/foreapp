/* ---------- pass 10: swing review v2 ----------
   Golfer: add a swing → tag and send on one screen (price from the coach) → track it → lesson.
   Lesson = voice-over analysis (always) + personal demo (optional) + note + optional drill.
   Coach: brief → studio (voice, play, pause, frame steps, scrubbing and drawings on one timeline)
   → optional demo → note → preview as the golfer → send. Pricing lives in the coach's Profile. */
Object.assign(P,{swpause:'M8 5v14M16 5v14',swtrash:'M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13',swline:'M5 19L19 5',swarrow:'M5 19L19 5M10 5h9v9',swcirc:'M12 19a7 7 0 100-14 7 7 0 000 14z',swangle:'M4 19h16M4 19L16 6',swpen:'M4 20l4-1 11-11-3-3L5 16z',swprev:'M12 6l-6 6 6 6M18 6v12',swnext:'M12 6l6 6-6 6M6 6v12',swfolder:'M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z',swcam:'M3 7h13v10H3zM16 11l5-3v8l-5-3',swspark:'M12 3v3M12 18v3M3 12h3M18 12h3M12 9a3 3 0 100 6 3 3 0 000-6z'});
const SWC=['Driver','Wood','Hybrid','7-iron','Wedge','Putter'],SWA=['Down the line','Face on','Other'],SWF=['Straight','Slice','Hook','Fat','Thin','Push','Pull'],SWD=['wedge','irons','fairway','window'];
const SW_SAMPLE='assets/sample-swing.mp4',SW_DEMO='assets/sample-demo.mp4',SW_COL=['#FFD43B','#FF4D4D','#FFFFFF','#3B9BFF'];
const swMs=ms=>{const s=Math.max(0,Math.floor(ms/1000));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
const swWhen=ts=>new Date(ts).toLocaleString('en-IN',{weekday:'short',day:'numeric',month:'short',hour:'numeric',minute:'2-digit'});
const swCoachOf=s=>coach((s.rv&&s.rv.coach)||s.rc||(myCoaches(s.student)[0]||ME).id);
const swFirst=c=>c.name.split(' ')[0];
function swOwnStudent(cid,w){return S.lessons.some(l=>l.coach===cid&&l.student===w&&l.status!=='cancelled')}
function swPriceFor(cid,w){if(cid!=='arjun')return 500;return swOwnStudent(cid,w)?(S.swPrice.ownPaid?S.swPrice.own:0):S.swPrice.other}

/* ---------- seed ---------- */
function legacyShape(m){const X=v=>v/100,Y=v=>v/75,c='#FFD43B';
 if(m.t==='line')return{type:'line',a:[X(m.a),Y(m.b)],b:[X(m.c2),Y(m.d)],color:c};
 if(m.t==='circle')return{type:'circle',a:[X(m.a),Y(m.b)],b:[X(m.a+m.r),Y(m.b)],color:c};
 if(m.t==='pen')return{type:'free',pts:m.p.map(q=>q.split(',').map(Number)).map(([x,y])=>[X(x),Y(y)]),color:c};
 if(m.t==='angle')return{type:'angle',pts:[[X(m.a1),Y(m.b1)],[X(m.a),Y(m.b)],[X(m.a2),Y(m.b2)]],color:c};return null}
const legacyLesson=s=>({legacy:true,note:s.comment||'',drill:'',demo:null,at:Date.now()-Math.abs(s.d||0)*864e5,an:{still:true,duration:0,samples:[{at:0,t:0}],shapes:(s.marks||[]).map(legacyShape).filter(Boolean)}});
function swInit(){S.swPrice={ownPaid:true,own:500,other:800};S.swForm=null;
 S.swings.forEach(s=>{if(s.status==='replied'&&!s.lesson){s.lesson=legacyLesson(s);s.seenL=true}});
 const s3=S.swings.find(s=>s.id==='s3');if(s3&&!s3.rv){const now=Date.now();s3.url=SW_SAMPLE;s3.club='7-iron';s3.paid=500;s3.rv={coach:'arjun',price:500,stage:'sent',q:'Contact feels thin with my irons. Am I standing up through impact?',flight:'Thin',sentAt:now-5*36e5,dueAt:now+43*36e5}}}
const _seed10=seed;seed=function(){_seed10();swInit()};

/* ---------- media and drawing ---------- */
const SWM_EL={};
function swEl(s){let e=SWM_EL[s.id];if(e&&e.__src===(s.url||''))return e;
 if(s.url){e=document.createElement('video');e.muted=true;e.playsInline=true;e.setAttribute('playsinline','');e.preload='auto';e.src=s.url;e.className='svsrc';e.onerror=()=>toast('This video could not be played here')}
 else{e=new Image();e.src='assets/swing.jpg';e.className='svsrc'}
 e.__src=s.url||'';SWM_EL[s.id]=e;return e}
const swIsVid=e=>e.tagName==='VIDEO';
function swDur(s){const e=swEl(s);return swIsVid(e)&&isFinite(e.duration)&&e.duration>0?e.duration:0}
function swRect(e,W,H){const iw=swIsVid(e)?e.videoWidth:e.naturalWidth,ih=swIsVid(e)?e.videoHeight:e.naturalHeight;const ok=iw&&(swIsVid(e)?e.readyState>=2:e.complete);if(!ok)return null;const k=Math.min(W/iw,H/ih),w=iw*k,h=ih*k;return{x:(W-w)/2,y:(H-h)/2,w,h}}
function swSrc(e){/* keep the last good frame so seeking never flashes black */
 if(!swIsVid(e))return e.complete&&e.naturalWidth?e:null;const ok=e.readyState>=2&&e.videoWidth&&!e.seeking;
 if(ok){let c=e.__c;if(!c){c=e.__c=document.createElement('canvas')}if(c.width!==e.videoWidth){c.width=e.videoWidth;c.height=e.videoHeight}c.getContext('2d').drawImage(e,0,0);e.__ok=1}
 return e.__ok?e.__c:null}
function swPaint(ctx,W,H,s){ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);const e=swEl(s),src=swSrc(e);if(!src)return{x:0,y:0,w:W,h:H};const iw=src.naturalWidth||src.width,ih=src.naturalHeight||src.height,k=Math.min(W/iw,H/ih),R={x:(W-iw*k)/2,y:(H-ih*k)/2,w:iw*k,h:ih*k};ctx.drawImage(src,R.x,R.y,R.w,R.h);return R}
function swShape(ctx,R,s){const lw=Math.max(3,Math.min(R.w,R.h)*.012),Pt=q=>[R.x+q[0]*R.w,R.y+q[1]*R.h];ctx.save();ctx.strokeStyle=s.color;ctx.fillStyle=s.color;ctx.lineWidth=lw;ctx.lineCap='round';ctx.lineJoin='round';
 if(s.type==='line'||s.type==='arrow'){const a=Pt(s.a),b=Pt(s.b);ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.stroke();
  if(s.type==='arrow'){const an=Math.atan2(b[1]-a[1],b[0]-a[0]),hl=lw*4;ctx.beginPath();ctx.moveTo(b[0],b[1]);ctx.lineTo(b[0]-hl*Math.cos(an-.45),b[1]-hl*Math.sin(an-.45));ctx.moveTo(b[0],b[1]);ctx.lineTo(b[0]-hl*Math.cos(an+.45),b[1]-hl*Math.sin(an+.45));ctx.stroke()}}
 else if(s.type==='circle'){const a=Pt(s.a),b=Pt(s.b);ctx.beginPath();ctx.arc(a[0],a[1],Math.hypot(b[0]-a[0],b[1]-a[1]),0,Math.PI*2);ctx.stroke()}
 else if(s.type==='free'){const p=s.pts.map(Pt);ctx.beginPath();ctx.moveTo(p[0][0],p[0][1]);p.forEach(q=>ctx.lineTo(q[0],q[1]));ctx.stroke()}
 else if(s.type==='angle'){const p=s.pts.map(Pt);ctx.beginPath();p.forEach((q,i)=>i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]));ctx.stroke();p.forEach(q=>{ctx.beginPath();ctx.arc(q[0],q[1],lw*.9,0,Math.PI*2);ctx.fill()});
  if(p.length===3){const v=p[1],a1=Math.atan2(p[0][1]-v[1],p[0][0]-v[0]),a2=Math.atan2(p[2][1]-v[1],p[2][0]-v[0]);let d=a2-a1;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;
   const r=lw*6,fs=Math.max(13,lw*4.2),mid=a1+d/2;ctx.beginPath();ctx.arc(v[0],v[1],r,a1,a1+d,d<0);ctx.stroke();ctx.font=`700 ${fs}px Inter,system-ui,sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';
   const tx=v[0]+Math.cos(mid)*(r+fs*1.1),ty=v[1]+Math.sin(mid)*(r+fs*1.1),deg=Math.round(Math.abs(d)*180/Math.PI)+'°';ctx.lineWidth=4;ctx.strokeStyle='rgba(0,0,0,.65)';ctx.strokeText(deg,tx,ty);ctx.fillText(deg,tx,ty)}}
 ctx.restore()}
function swFit(cv){const d=window.devicePixelRatio||1,w=Math.round(cv.clientWidth*d),h=Math.round(cv.clientHeight*d);if(w&&h&&(cv.width!==w||cv.height!==h)){cv.width=w;cv.height=h}}

/* ---------- studio: scrub, step, draw, record ---------- */
const SW_HINT=['Angle: tap the first end','Angle: now tap the corner','Angle: tap the other end'];
class SwStudio{
 constructor(root,s,o={}){this.root=root;this.s=s;this.o=o;this.shapes=o.shapes||[];this.tool='line';this.ci=0;this.live=null;this.ang=[];this.rec=null;this.drag=false;this.t=0;this.playing=false;this.rate=1;this.alive=true;
  this.cv=root.querySelector('canvas');this.ctx=this.cv.getContext('2d');this.e=swEl(s);this.vid=swIsVid(this.e);
  if(this.vid){this.e.pause();this.t=this.e.currentTime||0}(root.querySelector('.svstage')||root).appendChild(this.e);
  this.ui={range:root.querySelector('.svscrub input'),tl:root.querySelector('.svscrub .tl'),play:root.querySelector('[data-s=play]'),hint:root.querySelector('.svhint'),big:root.querySelector('.svbig')};
  if(!this.vid)root.querySelectorAll('.svctl [data-s],.svscrub input').forEach(x=>{x.disabled=true});
  root.addEventListener('click',e=>this.click(e));
  if(this.ui.range)this.ui.range.addEventListener('input',()=>{this.pause();this.seek(this.ui.range.value/1000*swDur(this.s))});
  if(o.tools)this.bindDraw();else this.cv.addEventListener('click',()=>this.toggle());
  this.paint();this.last=performance.now();const loop=n=>{if(!this.alive)return;if(!this.root.isConnected){this.destroy();return}const dt=Math.min(.1,(n-this.last)/1000);this.last=n;this.tick(dt);this.frame();requestAnimationFrame(loop)};requestAnimationFrame(loop)}
 destroy(){this.alive=false;this.pause();if(this.rec)this.stopRec(true)}
 play(){if(!this.vid)return;const d=swDur(this.s);if(d&&this.t>=d-.03)this.seek(0);this.playing=true;this.e.playbackRate=this.rate;this.e.play().catch(()=>{this.playing=false})}
 pause(){this.playing=false;if(this.vid)this.e.pause()}
 toggle(){this.playing?this.pause():this.play()}
 seek(t){const d=swDur(this.s);this.t=Math.max(0,d?Math.min(d,t):0);if(this.vid){try{this.e.currentTime=this.t}catch(_){}}}
 tick(){if(this.vid){this.t=this.e.currentTime;if(this.e.paused||this.e.ended)this.playing=false}}
 vis(){return this.shapes.filter(x=>x.removedAt==null)}
 el(){return this.rec?performance.now()-this.rec.start:0}
 click(e){const b=e.target.closest('[data-s]');if(!b||!this.root.contains(b)||b.disabled)return;const[k,v]=b.dataset.s.split(':');
  if(k==='play')this.toggle();else if(k==='prev'){this.pause();this.seek(this.t-1/30)}else if(k==='next'){this.pause();this.seek(this.t+1/30)}
  else if(k==='rate'){this.rate=+v;if(this.vid)this.e.playbackRate=this.rate;this.root.querySelectorAll('[data-s^="rate:"]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)))}
  else if(k==='tool'){this.tool=v;this.ang=[];this.live=null;this.paint()}else if(k==='color'){this.ci=(this.ci+1)%SW_COL.length;this.paint()}
  else if(k==='undo'){const x=this.vis().pop();if(x){if(this.rec)x.removedAt=this.el();else this.shapes.splice(this.shapes.indexOf(x),1)}}
  else if(k==='clear'){if(this.rec){const t=this.el();this.vis().forEach(x=>{x.removedAt=t})}else this.shapes.length=0}
  if(this.o.onChange)this.o.onChange()}
 paint(){this.root.querySelectorAll('[data-s^="tool:"]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.s==='tool:'+this.tool)));const c=this.root.querySelector('[data-s=color] i');if(c)c.style.background=SW_COL[this.ci];
  if(this.ui.hint){this.ui.hint.hidden=this.tool!=='angle';this.ui.hint.textContent=SW_HINT[this.ang.length]}}
 pos(e){const r=this.cv.getBoundingClientRect(),R=this.R||{x:0,y:0,w:this.cv.width,h:this.cv.height},k=this.cv.width/r.width;return[((e.clientX-r.left)*k-R.x)/R.w,((e.clientY-r.top)*k-R.y)/R.h]}
 bindDraw(){const cv=this.cv;
  cv.addEventListener('pointerdown',e=>{e.preventDefault();this.pause();const p=this.pos(e),col=SW_COL[this.ci];
   if(this.tool==='angle'){this.ang.push(p);if(this.ang.length===3){this.commit({type:'angle',pts:this.ang.slice(),color:col});this.ang=[];this.live=null}else this.live={type:'angle',pts:this.ang.concat([p]),color:col};this.paint();return}
   try{cv.setPointerCapture(e.pointerId)}catch(_){}this.live=this.tool==='pen'?{type:'free',pts:[p],color:col}:{type:this.tool,a:p,b:p,color:col};this.drag=true});
  cv.addEventListener('pointermove',e=>{const p=this.pos(e);if(this.tool==='angle'&&this.ang.length){this.live={type:'angle',pts:this.ang.concat([p]),color:SW_COL[this.ci]};return}if(!this.drag||!this.live)return;if(this.live.type==='free')this.live.pts.push(p);else this.live.b=p});
  const up=()=>{if(!this.drag)return;this.drag=false;const x=this.live;this.live=null;if(!x)return;if(x.type==='free'){if(x.pts.length>2)this.commit(x)}else if(Math.hypot(x.a[0]-x.b[0],x.a[1]-x.b[1])>.015)this.commit(x)};
  cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up)}
 commit(x){x.id='m'+(uid++);if(this.rec)x.at=this.el();this.shapes.push(x);if(this.o.onChange)this.o.onChange()}
 frame(){swFit(this.cv);const W=this.cv.width,H=this.cv.height;if(!W)return;this.R=swPaint(this.ctx,W,H,this.s);this.vis().forEach(x=>swShape(this.ctx,this.R,x));if(this.live)swShape(this.ctx,this.R,this.live);
  const d=swDur(this.s);if(this.ui.range&&document.activeElement!==this.ui.range)this.ui.range.value=d?Math.round(this.t/d*1000):0;if(this.ui.tl)this.ui.tl.textContent=this.vid?this.t.toFixed(2)+' s':'Still';
  if(this.ui.big)this.ui.big.hidden=this.playing||!this.vid;if(this.ui.play){const p=String(this.playing);if(this.ui.play.dataset.st!==p){this.ui.play.dataset.st=p;this.ui.play.innerHTML=ic(this.playing?'swpause':'play');this.ui.play.setAttribute('aria-label',this.playing?'Pause':'Play')}}
  if(this.rec){const t=this.el(),sm=this.rec.samples;if(t-sm[sm.length-1].at>=33)sm.push({at:t,t:this.t});if(this.o.onTick)this.o.onTick(t);if(t>=18e4&&this.o.onLimit)this.o.onLimit()}}
 async startRec(cam){const rec={samples:[],stream:null,mr:null,chunks:[],cam:false,mic:false},md=navigator.mediaDevices;
  if(md&&md.getUserMedia){try{rec.stream=await md.getUserMedia({audio:true,video:cam?{facingMode:'user',width:320,height:320}:false});rec.mic=true;rec.cam=!!cam}catch(e){if(cam){try{rec.stream=await md.getUserMedia({audio:true});rec.mic=true}catch(e2){}}}}
  if(rec.stream&&window.MediaRecorder){const T=rec.cam?['video/webm;codecs=vp8,opus','video/webm','video/mp4']:['audio/webm;codecs=opus','audio/webm','audio/mp4'],t=T.find(x=>MediaRecorder.isTypeSupported&&MediaRecorder.isTypeSupported(x));
   try{rec.mr=new MediaRecorder(rec.stream,t?{mimeType:t}:undefined);rec.mime=rec.mr.mimeType||t;rec.mr.ondataavailable=ev=>{if(ev.data&&ev.data.size)rec.chunks.push(ev.data)};rec.mr.start(250)}catch(e){rec.mr=null}}
  this.shapes=this.vis();this.shapes.forEach(x=>{x.at=0});rec.start=performance.now();rec.samples.push({at:0,t:this.t});this.rec=rec;return rec}
 stopRec(discard){const rec=this.rec;if(!rec)return Promise.resolve(null);this.rec=null;const dur=Math.max(500,performance.now()-rec.start),shapes=this.shapes.map(x=>Object.assign({},x));
  this.shapes=this.vis().map(x=>{const c=Object.assign({},x);delete c.at;return c});
  return new Promise(res=>{const fin=url=>{if(rec.stream)rec.stream.getTracks().forEach(t=>t.stop());res(discard?null:{samples:rec.samples,shapes,duration:dur,media:url,cam:rec.cam&&!!url,mic:rec.mic&&!!url})};
   if(rec.mr&&rec.mr.state!=='inactive'){rec.mr.onstop=()=>{const b=new Blob(rec.chunks,{type:rec.mime||'audio/webm'});fin(b.size?URL.createObjectURL(b):null)};rec.mr.stop()}else fin(null)})}
}
/* one lesson clock drives the frame, the drawings and the coach's voice */
class SwReplay{
 constructor(root,s,an){this.root=root;this.s=s;this.an=an;this.ms=0;this.playing=false;this.alive=true;this.cv=root.querySelector('canvas');this.ctx=this.cv.getContext('2d');this.e=swEl(s);if(swIsVid(this.e))this.e.pause();root.querySelector('.svstage').appendChild(this.e);
  this.ui={range:root.querySelector('.svscrub input'),tl:root.querySelector('.svscrub .tl'),play:root.querySelector('[data-r=play]'),big:root.querySelector('.svbig')};
  if(an.media){const m=document.createElement(an.cam?'video':'audio');m.src=an.media;m.playsInline=true;m.setAttribute('playsinline','');m.preload='auto';this.m=m;if(an.cam){const p=root.querySelector('.svpip');p.innerHTML='';p.appendChild(m);p.hidden=false}else{m.hidden=true;root.appendChild(m)}}
  if(an.still){root.querySelectorAll('.svscrub').forEach(x=>{x.hidden=true})}else{this.ui.play.addEventListener('click',()=>this.toggle());this.cv.addEventListener('click',()=>this.toggle());this.ui.range.addEventListener('input',()=>this.seek(this.ui.range.value/1000*an.duration))}
  this.last=performance.now();const loop=n=>{if(!this.alive)return;if(!this.root.isConnected){this.destroy();return}const dt=Math.min(.1,(n-this.last)/1000);this.last=n;this.tick(dt);this.draw();requestAnimationFrame(loop)};requestAnimationFrame(loop)}
 destroy(){this.alive=false;if(this.m)this.m.pause();if(swIsVid(this.e))this.e.pause()}
 toggle(){this.playing?this.pause():this.play()}
 play(){if(this.ms>=this.an.duration-30)this.seek(0);this.playing=true;if(this.m){try{this.m.currentTime=this.ms/1000}catch(_){}this.m.play().catch(()=>{})}}
 pause(){this.playing=false;if(this.m)this.m.pause()}
 seek(ms){this.ms=Math.max(0,Math.min(this.an.duration,ms));if(this.m){try{this.m.currentTime=this.ms/1000}catch(_){}}}
 tick(dt){if(!this.playing)return;this.ms+=dt*1000;if(this.m&&!this.m.paused&&!this.m.seeking&&isFinite(this.m.currentTime)){const me=this.m.currentTime*1000;if(Math.abs(me-this.ms)>350)this.ms=me}if(this.ms>=this.an.duration){this.ms=this.an.duration;this.pause()}}
 clipT(){const a=this.an.samples;let lo=0,hi=a.length-1;while(lo<hi){const m=(lo+hi+1)>>1;if(a[m].at<=this.ms)lo=m;else hi=m-1}return a[lo].t}
 follow(){const e=this.e,a=this.an.samples;if(!swIsVid(e))return;let i=0,lo=0,hi=a.length-1;while(lo<hi){const m=(lo+hi+1)>>1;if(a[m].at<=this.ms)lo=m;else hi=m-1}i=lo;
  const A=a[i],B=a[Math.min(a.length-1,i+1)],dt=(B.at-A.at)/1000,rate=dt>0?(B.t-A.t)/dt:0,t=A.t+(dt>0?(this.ms-A.at)/1000*rate:0);
  if(this.playing&&rate>.05&&rate<4){if(Math.abs(e.currentTime-t)>.2&&!e.seeking){try{e.currentTime=t}catch(_){}}if(Math.abs(e.playbackRate-rate)>.05)e.playbackRate=Math.max(.0625,rate);if(e.paused)e.play().catch(()=>{})}
  else{if(!e.paused)e.pause();if(!e.seeking&&Math.abs(e.currentTime-t)>.02){try{e.currentTime=t}catch(_){}}}}
 draw(){swFit(this.cv);const W=this.cv.width,H=this.cv.height;if(!W)return;this.follow();
  const R=swPaint(this.ctx,W,H,this.s),ms=this.ms;this.an.shapes.filter(x=>this.an.still||((x.at||0)<=ms&&(x.removedAt==null||x.removedAt>ms))).forEach(x=>swShape(this.ctx,R,x));
  if(this.ui.big)this.ui.big.hidden=this.playing||!!this.an.still;if(this.an.still)return;if(document.activeElement!==this.ui.range)this.ui.range.value=Math.round(ms/this.an.duration*1000);this.ui.tl.textContent=swMs(ms)+' / '+swMs(this.an.duration);
  const p=String(this.playing);if(this.ui.play.dataset.st!==p){this.ui.play.dataset.st=p;this.ui.play.innerHTML=ic(this.playing?'swpause':'play');this.ui.play.setAttribute('aria-label',this.playing?'Pause lesson':'Play lesson')}}
}

/* ---------- shared markup ---------- */
const swJ=o=>esc(JSON.stringify(o));
const swState=s=>{const r=s.rv||{};if(s.status==='replied')return s.seenL||S.role==='coach'?['Coach replied','ok']:['New lesson','ok'];if(s.status==='sent')return S.role==='coach'?[r.stage==='inreview'?'In progress':'To review','fl']:['With coach','fl'];if(s.status==='declined')return[r.price?'Declined · refunded':'Declined','bad'];if(s.status==='withdrawn')return[r.price?'Withdrawn · refunded':'Withdrawn',''];return['Not sent','']};
const swDest=s=>S.role==='coach'?'swing':s.status==='replied'?'swlesson':s.status==='sent'?'swstatus':'swing';
const swPoster=(s,cls='')=>s.url?`<video class="${cls}" src="${esc(s.url)}#t=0.1" muted playsinline preload="metadata"></video>`:`<img class="${cls}" src="assets/swing.jpg" alt="">`;
const swTile=s=>{const[l,c]=swState(s);return `<button class="swt press" data-a="go" data-v="${swDest(s)}" data-id="${s.id}" aria-label="${esc(s.club+', '+s.angle+', '+l)}">${swPoster(s)}<span class="playo sm">${ic('play')}</span><span class="swl"><b>${esc(s.club)}</b><span class="tiny">${esc(s.angle)} · ${dLbl(s.d)}</span></span><span class="pill swp ${c}">${l}</span></button>`};
const swThumbSm=s=>`<span class="svth">${swPoster(s)}</span>`;
const svTools=()=>`<div class="svtools" role="toolbar" aria-label="Drawing tools">${[['line','Line','swline'],['arrow','Arrow','swarrow'],['circle','Circle','swcirc'],['angle','Angle','swangle'],['pen','Draw','swpen']].map(([k,l,i])=>`<button data-s="tool:${k}" aria-label="${l}" aria-pressed="${k==='line'}">${ic(i)}</button>`).join('')}<span class="svsep"></span><button data-s="color" aria-label="Change colour"><i></i></button><button data-s="undo" aria-label="Undo">${ic('undo')}</button><button data-s="clear" aria-label="Clear drawings">${ic('swtrash')}</button></div>`;
const svStage=(o={})=>`<div class="svstage"><canvas aria-label="${o.tools?'Swing video. Pause, then draw on it.':'Swing video. Tap to play.'}"></canvas><span class="svbig" aria-hidden="true">${ic('play')}</span>${o.badge?'<span class="svbadge rec" id="svbadge" hidden></span>':''}${o.pip?`<span class="svpip" id="svpip" ${S.swCam?'':'hidden'}>AR</span>`:''}${o.tools?`<span class="svhint" hidden></span>${svTools()}`:''}</div>`;
const svCtl=()=>`<div class="svctl"><div class="svscrub"><input type="range" min="0" max="1000" value="0" aria-label="Scrub the swing"><span class="tl num">0.00 s</span></div><div class="svrow"><div class="svgrp"><button class="svrb" data-s="prev" aria-label="Back one frame">${ic('swprev')}</button><button class="svrb pri" data-s="play" aria-label="Play">${ic('play')}</button><button class="svrb" data-s="next" aria-label="Forward one frame">${ic('swnext')}</button></div><div class="svspd" role="group" aria-label="Speed">${[['0.25','¼×'],['0.5','½×'],['1','1×']].map(([v,l])=>`<button data-s="rate:${v}" aria-pressed="${v==='1'}">${l}</button>`).join('')}</div></div></div>`;
const svReplay=()=>`<div class="svstage"><canvas aria-label="Swing analysis. Tap to play or pause."></canvas><span class="svbig" aria-hidden="true">${ic('play')}</span><span class="svpip" hidden></span></div><div class="svctl"><div class="svscrub"><button class="svrb pri" data-r="play" aria-label="Play lesson">${ic('play')}</button><input type="range" min="0" max="1000" value="0" aria-label="Lesson position"><span class="tl num">0:00</span></div></div>`;
const svMini=(s,h=220)=>`<div class="svmini" style="height:${h}px" data-swm="mini" data-id="${s.id}"><div class="svstage"><canvas aria-label="Swing video. Tap to play."></canvas><span class="svbig" aria-hidden="true">${ic('play')}</span><span class="svbadge">${s.url?esc(s.club+' · '+s.angle):'Sample still'}</span></div></div>`;
const svStep=(state,t,sub)=>`<div class="svst ${state}"><span class="svc">${state==='done'?ic('check'):''}</span><span class="svtx"><b>${t}</b>${sub?`<span class="small muted">${sub}</span>`:''}</span></div>`;
const swHrs=ts=>Math.max(0,Math.ceil((ts-Date.now())/36e5));
const swPillR=s=>{const r=s.rv||{};if(s.status==='replied')return '<span class="pill ok">Replied</span>';if(s.status==='declined')return '<span class="pill bad">Declined</span>';return r.price?`<span class="pill fl">Due in ${swHrs(r.dueAt)} h</span>`:'<span class="pill">Free</span>'};

/* ---------- golfer: library (Progress → Swings) ---------- */
swingsSeg=function(w){const L=S.swings.filter(s=>s.student===w),fresh=L.filter(s=>s.status==='replied'&&s.lesson&&!s.seenL),jr=stud(w)&&stud(w).junior;
 return `${fresh.map(s=>`<button class="swnew press" data-a="go" data-v="swlesson" data-id="${s.id}"><span class="tile o">${ic('video')}</span><span style="flex:1;min-width:0"><b style="display:block">New lesson from Coach ${swFirst(swCoachOf(s))}</b><span class="small">${esc(s.club)}, ${esc(s.angle)} · ${s.lesson.demo?'analysis and demo':'swing analysis'}</span></span><span class="pill ink">Watch</span></button>`).join('')}
 <button class="btn full" data-a="go" data-v="swup">${ic('video')}Upload a swing</button>
 ${L.length?`<div class="sec-h" style="margin-top:4px"><h2>Your swings</h2><span class="small muted num">${L.length}</span></div><div class="swg">${L.map(swTile).join('')}</div>`:`<div class="empty">${ic('video','class="i"')}<b>No swings yet</b><span class="small muted">Film a swing and your coach replies with a voice-over on your video.</span></div>`}
 ${jr?`<div class="demo">${ic('shield')}Only ${stud(w).first}'s parent and coach can see these videos.</div>`:''}`};

/* ---------- golfer: upload ---------- */
V.swup=()=>nb('Add a swing')+`<div class="scroll"><div class="pad stack">
 <div class="card swtips"><svg viewBox="0 0 120 90" width="120" height="90" aria-hidden="true"><rect x="78" y="22" width="26" height="46" rx="5" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="91" cy="62" r="1.6" fill="currentColor"/><path d="M30 18a5 5 0 110 .1M30 24l-4 22-3 20M26 46l5 20M30 28l9 12 2 2" fill="none" stroke="var(--flag)" stroke-width="3.5" stroke-linecap="round"/><path d="M8 76h104" stroke="currentColor" stroke-width="2" stroke-dasharray="3 4" opacity=".5"/><path d="M72 45H48" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 3" opacity=".6"/></svg>
 <div class="stack" style="gap:7px">${['Phone at hip height, about 3 metres back','Whole body and club in the frame','Up to 60 seconds · MP4 or MOV'].map(t=>`<div class="small" style="display:flex;gap:7px">${ic('check','width="15" height="15" style="flex:none;color:var(--fair);margin-top:2px"')}${t}</div>`).join('')}</div></div>
 <div class="list"><label class="row press" style="cursor:pointer"><span class="tile o">${ic('swcam')}</span><span class="m"><span class="t" style="display:block">Record a swing</span><span class="small muted">Opens your camera</span></span>${ic('chev','class="chev"')}<input type="file" accept="video/*" capture="environment" hidden data-swfile="1"></label>
 <label class="row press" style="cursor:pointer"><span class="tile">${ic('swfolder')}</span><span class="m"><span class="t" style="display:block">Choose from your phone</span><span class="small muted">A video you already filmed</span></span>${ic('chev','class="chev"')}<input type="file" accept="video/*" hidden data-swfile="1"></label>
 <button class="row press" data-a="swSample"><span class="tile">${ic('swspark')}</span><span class="m"><span class="t" style="display:block">Use the sample swing</span><span class="small muted">Try the flow without a video</span></span>${ic('chev','class="chev"')}</button></div>
 <div class="bottom-gap"></div></div></div>`;
ACT.swAdd=()=>go('swup');
function swNew(url){const s={id:'s'+(uid++),student:S.who,club:'7-iron',angle:'Down the line',d:0,status:'own',marks:[],url,comment:'',voice:0,drawings:[]};S.swings.unshift(s);closeSheet();S.swForm=null;
 const st=nv().stack;if(st.length&&st[st.length-1].name==='swup')st.pop();st.push({name:'swsend',p:{id:s.id}});show('push');
 if(url&&url.startsWith('blob:')){const v=swEl(s);v.addEventListener('loadedmetadata',()=>{if(v.duration>60.5)toast('Over 60 seconds. Trim it on your phone first.')},{once:true})}}
ACT.swSample=()=>swNew(SW_SAMPLE);
document.addEventListener('change',e=>{if(e.target.dataset&&e.target.dataset.swfile&&e.target.files[0])swNew(URL.createObjectURL(e.target.files[0]))});

/* ---------- golfer: tag and send ---------- */
const SWQ=['Why does it go right?','Am I standing up through impact?','Check my takeaway'];
function swFormOf(s){if(!S.swForm||S.swForm.id!==s.id)S.swForm={id:s.id,club:s.club,angle:s.angle,flight:'',q:'',coach:(myCoaches(s.student)[0]||coach('arjun')).id};return S.swForm}
function swCoachList(s){const C=myCoaches(s.student);return C.length?C:[coach('arjun')]}
V.swsend=p=>{const s=swing(p.id),f=swFormOf(s),c=coach(f.coach),pr=swPriceFor(c.id,s.student),own=swOwnStudent(c.id,s.student),jr=stud(s.student).junior;
 return nb('Send your swing')+`<div class="scroll"><div class="pad stack">${svMini(s)}
 <div><label class="l">Club</label><div class="chips wrap">${SWC.map(x=>`<button class="chip" data-a="swF" data-k="club" data-id="${x}" aria-pressed="${f.club===x}">${x}</button>`).join('')}</div></div>
 <div><label class="l">Camera angle</label><div class="seg">${SWA.map(x=>`<button data-a="swF" data-k="angle" data-id="${x}" aria-pressed="${f.angle===x}">${x}</button>`).join('')}</div></div>
 <div><label class="l">What did the ball do? <span class="muted" style="font-weight:500">Optional</span></label><div class="chips wrap">${SWF.map(x=>`<button class="chip" data-a="swF" data-k="flight" data-id="${x}" aria-pressed="${f.flight===x}">${x}</button>`).join('')}</div></div>
 <div><label class="l" for="swq">Ask your coach</label><textarea class="ta" id="swq" rows="3" data-i="swq" placeholder="What do you want them to look at?">${esc(f.q)}</textarea><div class="chips" style="margin-top:8px">${SWQ.map(q=>`<button class="chip" data-a="swQ" data-id="${esc(q)}">${esc(q)}</button>`).join('')}</div></div>
 <div><label class="l">Send to</label><div class="list">${swCoachList(s).map(x=>{const q=swPriceFor(x.id,s.student),on=f.coach===x.id;return `<button class="row" data-a="swF" data-k="coach" data-id="${x.id}" aria-pressed="${on}">${mono(x)}<span class="m"><span class="t" style="display:block">Coach ${swFirst(x)}</span><span class="small muted">${q?money(q)+' per review':'Free for his students'} · replies in ${x.reply||'a day'}</span></span><span class="svradio ${on?'on':''}"></span></button>`}).join('')}</div></div>
 ${pr?`<div class="demo">${ic('shield')}${own?`Coach ${swFirst(c)} charges his students for swing reviews. `:''}Refunded automatically if there's no reply within 48 hours.</div>`:''}${jr?`<div class="demo">${ic('shield')}Only ${stud(s.student).first}'s parent and coach can see this video.</div>`:''}
 <div class="bottom-gap"></div></div></div><div class="foot swfoot"><button class="btn full" data-a="swGo" data-id="${s.id}">${pr?`Pay ${money(pr)} and send`:`Send to Coach ${swFirst(c)}`}</button><button class="swlink" data-a="swSave">Just save to my library</button></div>`};
ACT.swF=d=>{const f=S.swForm;if(!f)return;f[d.k]=(d.k==='flight'&&f.flight===d.id)?'':d.id;show('none')};
ACT.swQ=d=>{const f=S.swForm;if(!f)return;f.q=f.q.trim()?f.q.trim()+' '+d.id:d.id;const t=$('#swq');if(t)t.value=f.q};
ACT.swSave=()=>{const f=S.swForm,s=f&&swing(f.id);if(s){s.club=f.club;s.angle=f.angle}S.swForm=null;back();toast('Saved to your library')};
document.addEventListener('input',e=>{const d=e.target.dataset||{};if(d.i==='swq'&&S.swForm)S.swForm.q=e.target.value;if(d.i==='swnote'){const s=swing(d.id);if(s&&s.work)s.work.note=e.target.value}});
function swSendNow(s){const f=swFormOf(s),c=coach(f.coach),pr=swPriceFor(c.id,s.student),now=Date.now();
 s.club=f.club;s.angle=f.angle;s.status='sent';s.rc=c.id;s.paid=pr||0;s.d=0;s.rv={coach:c.id,price:pr,stage:'sent',q:f.q.trim(),flight:f.flight,sentAt:now,dueAt:now+48*36e5};s.work=null;s.lesson=null;s.seenL=false;S.swForm=null;
 closeSheet();const st=nv().stack;st.pop();st.push({name:'swstatus',p:{id:s.id}});show('none');toast(pr?`Paid ${money(pr)} · sent to Coach ${swFirst(c)}`:`Sent to Coach ${swFirst(c)}`);
 if(c.id==='arjun')event('coach',{i:'video',t:`${stud(s.student).first} sent a swing`,b:`${pr?'Paid '+money(pr)+' · ':''}${s.club}, ${s.angle}`})}
function swPaySheet(s,pr,c,onPaid){openSheet(()=>`<h2>Pay for this review</h2><div class="card" style="padding:12px 16px"><div class="line"><span class="muted">Swing review</span><b>Coach ${swFirst(c)}</b></div><div class="line"><span class="muted">Swing</span><b>${esc(s.club)} · ${esc(s.angle)}</b></div><div class="line tot"><span>Total</span><span class="num">${money(pr)}</span></div></div><div class="demo">${ic('shield')}Refunded automatically if Coach ${swFirst(c)} declines or doesn't reply within 48 hours.</div><button class="btn full" data-a="swPayGo">Pay ${money(pr)} with Google Pay</button><span class="tiny muted" style="text-align:center">Prototype · no money moves</span>`);
 ACT.swPayGo=()=>{openSheet(()=>`<div class="sent"><div class="spin"></div><h2>Waiting for Google Pay</h2><span class="muted">Approve ${money(pr)} in the app.</span></div>`,true);
  setTimeout(()=>{if(S.failNext){S.failNext=false;chrome();openSheet(()=>`<h2>That payment didn't go through</h2><p class="muted">No money has left your account. Your swing hasn't been sent.</p><button class="btn full" data-a="swPayGo">Try again</button><button class="btn sec2 full" data-a="closeS">Not now</button>`);return}onPaid()},1500)}}
ACT.swGo=d=>{const s=swing(d.id),f=swFormOf(s),c=coach(f.coach),pr=swPriceFor(c.id,s.student);if(!pr)return swSendNow(s);swPaySheet(s,pr,c,()=>swSendNow(s))};

/* ---------- golfer: track ---------- */
V.swstatus=p=>{const s=swing(p.id),r=s.rv||{},c=swCoachOf(s),st=s.status,closed=st==='declined'||st==='withdrawn',idx=st==='replied'?3:{sent:0,seen:1,inreview:2}[r.stage]??0;
 const steps=[['Sent',r.sentAt?swWhen(r.sentAt):''],[`Seen by Coach ${swFirst(c)}`,''],['Recording your lesson','A voice-over on your swing'],['Lesson ready','']];
 return nb('Swing review')+`<div class="scroll"><div class="pad stack">
 <div class="card swhead">${swThumbSm(s)}<div style="flex:1;min-width:0"><b style="display:block;font-size:17px">${st==='replied'?'Your lesson is ready':closed?(st==='declined'?'Review declined':'Withdrawn'):`With Coach ${swFirst(c)}`}</b><span class="small muted">${esc(s.club)} · ${esc(s.angle)}${r.flight?' · '+esc(r.flight):''}</span><div style="margin-top:6px">${r.price?`<span class="pill ${closed?'':'fl'}">${closed?'Refunded '+money(r.price):'Paid '+money(r.price)}</span>`:'<span class="pill">Free review</span>'}</div></div></div>
 ${closed?`<div class="card"><b>${st==='declined'?`Coach ${swFirst(c)} couldn't review this swing`:'You withdrew this swing'}</b><p class="small muted" style="margin-top:4px">${r.price?money(r.price)+' is on its way back to you.':'You can send it again any time.'}</p></div>`:
 `<div class="card"><div class="sec-h" style="margin-bottom:12px"><span class="eyebrow">Progress</span>${r.price&&st!=='replied'?`<span class="tiny muted">Reply by ${swWhen(r.dueAt)}</span>`:''}</div><div class="svsteps">${steps.map((x,i)=>svStep(i<=idx?'done':i===idx+1?'now':'',x[0],i<=idx?x[1]:i===idx+1&&i===2?'':''))}</div></div>`}
 ${r.q?`<div class="card stack" style="gap:6px"><span class="eyebrow">Your question</span><p>${esc(r.q)}</p></div>`:''}
 ${st==='sent'?`<div class="demo">${ic('clock')}You'll get a notification when the lesson is ready. Switch to Coach at the top to record it.</div>`:''}
 <div class="bottom-gap"></div></div></div>
 <div class="foot swfoot">${st==='replied'?`<button class="btn full" data-a="go" data-v="swlesson" data-id="${s.id}">${ic('play')}Watch your lesson</button>`:''}${closed?`<button class="btn full" data-a="go" data-v="swsend" data-id="${s.id}">Send again</button>`:''}${st==='sent'?`<button class="btn sec2 full" data-a="go" data-v="swing" data-id="${s.id}">${ic('swpen')}Draw on it while you wait</button>`:''}${st==='sent'&&r.stage==='sent'?`<button class="swlink" data-a="swWd" data-id="${s.id}">Withdraw${r.price?' and get a refund':''}</button>`:''}</div>`};
ACT.swWd=d=>{const s=swing(d.id);openSheet(()=>`<h2>Withdraw this swing?</h2><p class="muted">${s.rv.price?money(s.rv.price)+' is refunded straight away. ':''}Coach ${swFirst(swCoachOf(s))} won't see it.</p><button class="btn danger full" data-a="swWd2" data-id="${s.id}">Withdraw</button><button class="btn sec2 full" data-a="closeS">Keep it</button>`)};
ACT.swWd2=d=>{const s=swing(d.id);s.status='withdrawn';closeSheet();show('none');toast(s.rv.price?`Withdrawn · ${money(s.rv.price)} refunded`:'Withdrawn')};

/* ---------- golfer: own swing studio (and coach view of a student's own swing) ---------- */
V.swing=p=>{const s=swing(p.id);if(!s)return nb('Swing')+'<div class="scroll"><div class="empty"><b>Swing not found</b></div></div>';
 if(S.role==='coach'){if(s.status==='sent')return V.swbrief(p);if(s.status==='replied'&&s.lesson)return swLessonHTML(s,s.lesson,'coach')}
 const c=swCoachOf(s),has=myCoaches(s.student).length,st=s.status,me=S.role==='golfer',mine=has?myCoaches(s.student)[0]:null;
 const foot=!me?'':st==='replied'?`<button class="btn full" data-a="go" data-v="swlesson" data-id="${s.id}">${ic('play')}Watch your lesson</button>`:st==='sent'?`<button class="btn full svghost" data-a="go" data-v="swstatus" data-id="${s.id}">With Coach ${swFirst(c)} · see progress</button>`:has?`<button class="btn full" data-a="go" data-v="swsend" data-id="${s.id}">Send to Coach ${swFirst(mine)}${swPriceFor(mine.id,s.student)?' · '+money(swPriceFor(mine.id,s.student)):''}</button>`:`<button class="btn full" data-a="swPaid" data-id="${s.id}">Get a coach's review</button>`;
 return `<div class="svd">${nb(`${esc(s.club)} · ${esc(s.angle)}`,`<button class="ib" data-a="swCmp" data-id="${s.id}" aria-label="Compare with another swing">${ic('grid')}</button>`)}<div class="svbody" data-swm="studio" data-id="${s.id}">${svStage({tools:true})}${svCtl()}</div><div class="svfoot">${foot}</div></div>`};
ACT.swPaid=d=>{const s=swing(d.id),C=Object.values(COACHES).filter(c=>c.km<=25).slice(0,4);openSheet(()=>`<h2>Get a coach's review</h2><p class="muted">A coach talks you through your swing on the video and draws on it. Refunded if there's no reply within 48 hours.</p><div class="list">${C.map(c=>`<button class="row" data-a="swPay" data-id="${s.id}" data-c="${c.id}">${mono(c)}<span class="m"><span class="t" style="display:block">${c.name}</span><span class="small muted">${c.good}</span></span><b class="num">${money(swPriceFor(c.id,s.student))}</b></button>`).join('')}</div>`)};
ACT.swPay=d=>{const s=swing(d.id),c=coach(d.c),pr=swPriceFor(c.id,s.student);swPaySheet(s,pr,c,()=>{closeSheet();const now=Date.now();s.status='sent';s.paid=pr;s.rc=c.id;s.d=0;s.rv={coach:c.id,price:pr,stage:'sent',q:'',flight:'',sentAt:now,dueAt:now+48*36e5};nv().stack.push({name:'swstatus',p:{id:s.id}});show('push');toast(`Paid ${money(pr)} · sent to ${c.name}`);
 if(c.id==='arjun')event('coach',{i:'video',t:`Paid swing review from ${stud(s.student).first}`,b:money(pr)+' · '+s.club});
 else setTimeout(()=>{if(s.status!=='sent')return;s.status='replied';s.comment='Good tempo. Keep your head steady through the backswing.';s.lesson=Object.assign(legacyLesson(s),{at:Date.now()});s.rv.stage='replied';if(ids().includes(s.student))event('golfer',{i:'video',t:`${c.name} reviewed your swing`,b:s.comment})},3500)})};

/* ---------- the lesson (golfer, coach copy, preview) ---------- */
function swLessonHTML(s,L,mode){const c=swCoachOf(s),prev=mode==='preview',co=mode==='coach',st=stud(s.student),dr=L.drill&&drill(L.drill),an=L.an;
 const title=prev?`What ${st.first} will see`:co?`Lesson for ${st.first}`:`Lesson from Coach ${swFirst(c)}`,len=an.still?'':' · '+swMs(an.duration);
 return `<div class="svd">${nb(esc(title))}${L.demo?`<div class="pad" style="padding-bottom:10px"><div class="seg svseg" role="tablist"><button data-t="an" aria-pressed="true" role="tab">${ic('video')}Swing analysis${len}</button><button data-t="demo" aria-pressed="false" role="tab">${ic('play')}Coach's demo</button></div></div>`:`<div class="pad svsub">Swing analysis${len}${an.still||an.media?'':' · no voice'}</div>`}
 <div class="svpane" data-swm="lesson" data-id="${s.id}" data-mode="${mode}"></div>
 <div class="svpanel"><div class="card stack" style="gap:10px"><div style="display:flex;gap:10px;align-items:center">${mono(c)}<div style="flex:1;min-width:0"><b style="display:block">Coach ${swFirst(c)}'s note</b><span class="small muted">${prev?'Sends when you tap Send':swWhen(L.at)}</span></div></div>${L.note?`<p class="swnote">${esc(L.note)}</p>`:'<span class="small muted">No note this time. It\'s all in the video.</span>'}</div>
 ${dr?`<div class="card" style="display:flex;gap:12px;align-items:center"><span class="dthumb lg">${drillArt(dr)}</span><span style="flex:1;min-width:0"><span class="eyebrow">Drill to practise</span><b style="display:block">${dr.n}</b><span class="small muted">${dr.mins} min · target ${dr.target}/${maxOf(dr)}</span></span>${prev||co?'':`<button class="btn sm" data-a="go" data-v="drill" data-id="${dr.id}">Start</button>`}</div>`:''}
 ${prev||co?(co?`<span class="small muted" style="text-align:center">Sent ${swWhen(L.at)}${s.rv&&s.rv.price?' · paid '+money(s.rv.price):''}</span>`:''):`<div style="display:flex;gap:8px"><button class="btn sec2 grow" data-a="go" data-v="swing" data-id="${s.id}">${ic('swpen')}Draw on it</button><button class="btn grow" data-a="go" data-v="swup">${ic('video')}New swing</button></div>`}
 <div class="bottom-gap"></div></div>${prev?`<div class="svfoot svfoot-l"><button class="btn full" data-a="swSend2" data-id="${s.id}">Send lesson to ${st.first}</button></div>`:''}</div>`}
V.swlesson=p=>{const s=swing(p.id);s.seenL=true;return swLessonHTML(s,s.lesson,'golfer')};

/* ---------- coach: review inbox ---------- */
V.swinbox=()=>{const mine=S.swings.filter(s=>(s.rv?s.rv.coach:s.rc||'arjun')==='arjun'),pend=mine.filter(s=>s.status==='sent').sort((a,b)=>((a.rv&&a.rv.price?a.rv.dueAt:9e15)-(b.rv&&b.rv.price?b.rv.dueAt:9e15))||((b.rv&&b.rv.sentAt||0)-(a.rv&&a.rv.sentAt||0))),done=mine.filter(s=>s.status==='replied'),tab=S.swTab||'todo',L=tab==='todo'?pend:done;
 const row=s=>{const st=stud(s.student),r=s.rv||{};return `<button class="row" data-a="go" data-v="swing" data-id="${s.id}">${swThumbSm(s)}<span class="m"><span style="display:flex;justify-content:space-between;gap:8px;align-items:center"><span class="t">${st.name}</span>${swPillR(s)}</span><span class="small" style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px">${r.q?'“'+esc(r.q)+'”':s.status==='replied'?esc(s.lesson&&s.lesson.note||'Lesson sent'):'No question'}</span><span class="tiny muted">${r.price?'Paid '+money(r.price):'Free'} · ${esc(s.club)}, ${esc(s.angle)}${r.stage==='inreview'&&s.status==='sent'?' · in progress':''}</span></span></button>`};
 return nb('Swing reviews',`<button class="ib" data-a="go" data-v="swpricing" aria-label="Pricing">${ic('wallet')}</button>`)+`<div class="scroll"><div class="pad stack">
 <div class="seg"><button data-a="swTab" data-id="todo" aria-pressed="${tab==='todo'}">To review · ${pend.length}</button><button data-a="swTab" data-id="done" aria-pressed="${tab==='done'}">Replied · ${done.length}</button></div>
 ${L.length?`<div class="list">${L.map(row).join('')}</div>`:`<div class="empty">${ic('video','class="i"')}<b>${tab==='todo'?'Nothing to review':'No lessons sent yet'}</b><span class="small muted">${tab==='todo'?'When a golfer sends a swing, it shows up here with any payment and the time left to reply.':'Lessons you send appear here.'}</span></div>`}
 <button class="card press swprice" data-a="go" data-v="swpricing"><span class="tile o">${ic('wallet')}</span><span style="flex:1;min-width:0"><b style="display:block">Your students: ${S.swPrice.ownPaid?money(S.swPrice.own)+' per review':'free'}</b><span class="small muted">Other golfers: ${money(S.swPrice.other)} per review</span></span>${ic('chev','width="18" height="18" style="flex:none;color:var(--ink3)"')}</button>
 <div class="bottom-gap"></div></div></div>`};
ACT.swTab=d=>{S.swTab=d.id;show('none')};
const _today10=V.today;V.today=()=>{let h=_today10();const pend=S.swings.filter(s=>s.status==='sent'&&(s.rv?s.rv.coach:s.rc||'arjun')==='arjun'),paid=pend.filter(s=>s.rv&&s.rv.price).sort((a,b)=>a.rv.dueAt-b.rv.dueAt)[0];
 const card=`<div class="sec"><button class="card press swtoday" data-a="go" data-v="swinbox"><span class="tile o">${ic('video')}</span><span style="flex:1;min-width:0"><b style="display:block">Swing reviews</b><span class="small muted">${pend.length?`${pend.length} to review${paid?` · next due in ${swHrs(paid.rv.dueAt)} h`:''}`:'All caught up'}</span></span>${pend.length?`<span class="pill fl num">${pend.length}</span>`:''}${ic('chev','width="18" height="18" style="flex:none;color:var(--ink3)"')}</button></div>`;
 const a='<div class="sec"><div class="sec-h"><h2>Needs you</h2>';return h.includes(a)?h.replace(a,card+a):h.replace('<div class="bottom-gap"></div>',card+'<div class="bottom-gap"></div>')};

/* ---------- coach: brief ---------- */
V.swbrief=p=>{const s=swing(p.id),r=s.rv||{},st=stud(s.student);if(r.stage==='sent'){r.stage='seen'}
 return nb('Swing review')+`<div class="scroll"><div class="pad stack">
 <div style="display:flex;gap:12px;align-items:center">${av(st.init,'p')}<div style="flex:1;min-width:0"><b style="display:block;font-size:18px">${st.name}</b><span class="small muted">${swOwnStudent('arjun',s.student)?'Your student':'New golfer'} · sent ${r.sentAt?swWhen(r.sentAt):dLbl(s.d)}</span></div>${swPillR(s)}</div>
 <div class="card stack" style="gap:10px"><span class="eyebrow">${st.first} asks</span><p class="quote" style="font-size:20px">${r.q?'“'+esc(r.q)+'”':'No question. Wants your eye on it.'}</p><div class="chips wrap"><span class="pill">${esc(s.club)}</span><span class="pill">${esc(s.angle)}</span>${r.flight?`<span class="pill fl">Ball: ${esc(r.flight.toLowerCase())}</span>`:''}</div></div>
 ${svMini(s,240)}
 <div class="card" style="padding:12px 16px">${r.price?`<div class="line"><span class="muted">Paid</span><b class="num">${money(r.price)}</b></div><div class="line"><span class="muted">Reply by</span><b>${swWhen(r.dueAt)}</b></div><span class="tiny muted">No reply by then and ${st.first} is refunded automatically.</span>`:`<div class="line"><span class="muted">Review</span><b>Free</b></div>`}</div>
 ${st.junior?`<div class="demo">${ic('shield')}Only ${st.first}'s parent and you can see this video.</div>`:''}<div class="bottom-gap"></div></div></div>
 <div class="foot"><button class="btn sec2" data-a="swDecl" data-id="${s.id}">Decline</button><button class="btn grow" data-a="go" data-v="swstudio" data-id="${s.id}">${ic('swpen')}Open in studio</button></div>`};
ACT.swDecl=d=>{const s=swing(d.id),st=stud(s.student),pr=s.rv&&s.rv.price;openSheet(()=>`<h2>Decline this review?</h2><p class="muted">${pr?`${st.first} is refunded ${money(pr)} automatically.`:`${st.first} is told you can't review this swing.`}</p><button class="btn danger full" data-a="swDecl2" data-id="${s.id}">Decline review</button><button class="btn sec2 full" data-a="closeS">Cancel</button>`)};
ACT.swDecl2=d=>{const s=swing(d.id);s.status='declined';closeSheet();const st=nv().stack;st.pop();show('pop');toast(`Declined${s.rv.price?' · '+money(s.rv.price)+' refunded':''}`);if(ids().includes(s.student))event('golfer',{i:'video',t:'Coach Arjun couldn\'t review your swing',b:s.rv.price?money(s.rv.price)+' refunded':'Send it again any time'})};

/* ---------- coach: studio, demo, note, preview, sent ---------- */
const swWork=s=>{if(!s.work)s.work={shapes:[],an:null,demo:null,note:'',drill:''};return s.work};
V.swstudio=p=>{const s=swing(p.id);swWork(s);if(s.rv&&s.status==='sent')s.rv.stage='inreview';if(S.swCam==null)S.swCam=true;const st=stud(s.student);
 return `<div class="svd">${nb(`${st.first} · ${esc(s.club)}`,`<button class="svcam" data-a="swCamT" aria-pressed="${S.swCam}">${ic('swcam')}<span>${S.swCam?'Face cam':'Cam off'}</span></button>`)}<div class="svbody" data-swm="cstudio" data-id="${s.id}">${svStage({tools:true,badge:true,pip:true})}${svCtl()}</div><div class="svfoot" id="svcf"></div></div>`};
ACT.swCamT=(d,el)=>{S.swCam=!S.swCam;el.setAttribute('aria-pressed',S.swCam);el.querySelector('span').textContent=S.swCam?'Face cam':'Cam off';const p=$('#svpip');if(p)p.hidden=!S.swCam};
V.swdemo=p=>`<div class="svd">${nb('Add a demo')}<div class="pad svsub">Optional · film yourself doing the move</div><div class="svbody" data-swm="demo" data-id="${p.id}"><div class="svstage" id="svdv"></div></div><div class="svfoot" id="svdf"></div></div>`;
V.swreply=p=>{const s=swing(p.id),w=swWork(s),st=stud(s.student),ok=!!w.an;
 const part=(done,ic2,t,sub,lab,v,opt)=>`<div class="swpart">${done?`<span class="svok">${ic('check')}</span>`:`<span class="svtodo">${ic(ic2)}</span>`}<span style="flex:1;min-width:0"><b style="display:block">${t}${opt?' <span class="pill" style="height:20px;font-size:11px">Optional</span>':''}</b><span class="small muted">${sub}</span></span><button class="btn ${done?'sec2':''} sm" data-a="swTo" data-v="${v}" data-id="${s.id}">${lab}</button></div>`;
 return nb(`Lesson for ${st.first}`)+`<div class="scroll"><div class="pad stack"><span class="eyebrow">What ${st.first} gets</span><div class="card stack" style="gap:14px">${part(!!w.an,'video','Swing analysis',w.an?`${swMs(w.an.duration)} · ${w.an.shapes.length} drawing${w.an.shapes.length===1?'':'s'}${w.an.mic?'':' · no voice'}`:'Your voice-over on the swing',w.an?'Redo':'Record','swstudio')}${part(!!w.demo,'swcam','Your demo',w.demo?(w.demo.sample?'Sample demo':'Video added'):'You doing the move, if it helps',w.demo?'Change':'Add','swdemo',1)}</div>
 <div><label class="l" for="swn">Note to ${st.first}</label><textarea class="ta" id="swn" rows="4" data-i="swnote" data-id="${s.id}" placeholder="What you saw, and what to work on">${esc(w.note)}</textarea></div>
 <div><label class="l">Drill <span class="muted" style="font-weight:500">Optional</span></label><div class="chips wrap"><button class="chip" data-a="swDr" data-id="${s.id}" data-k="" aria-pressed="${!w.drill}">None</button>${SWD.map(id=>`<button class="chip" data-a="swDr" data-id="${s.id}" data-k="${id}" aria-pressed="${w.drill===id}">${drill(id).n}</button>`).join('')}</div></div>
 <div class="bottom-gap"></div></div></div><div class="foot swfoot"><button class="btn full" data-a="go" data-v="swprev" data-id="${s.id}" ${ok?'':'disabled'}>Preview as ${st.first}</button>${ok?'':'<span class="tiny muted" style="text-align:center">Record the swing analysis to continue</span>'}</div>`};
ACT.swDr=d=>{swWork(swing(d.id)).drill=d.k;show('none')};
ACT.swTo=d=>{const n=nv().stack,i=n.map(x=>x.name).lastIndexOf(d.v);if(i>=0&&n[i].p.id===d.id){nv().stack=n.slice(0,i+1);show('pop')}else go(d.v,{id:d.id})};
function swToReply(id){const n=nv().stack,i=n.map(x=>x.name).lastIndexOf('swreply');if(i>=0){nv().stack=n.slice(0,i+1);show('pop')}else go('swreply',{id})}
V.swprev=p=>{const s=swing(p.id),w=swWork(s);return swLessonHTML(s,{an:w.an,demo:w.demo,note:w.note.trim(),drill:w.drill,at:Date.now()},'preview')};
ACT.swSend2=d=>{const s=swing(d.id),st=stud(s.student);openSheet(()=>`<h2>Send lesson to ${st.first}?</h2><p class="muted">${st.first} gets a notification straight away with your analysis${s.work.demo?', demo':''}${s.work.note.trim()?' and note':''}.</p><button class="btn full" data-a="swSend3" data-id="${s.id}">Send lesson</button><button class="btn sec2 full" data-a="closeS">Keep editing</button>`)};
ACT.swSend3=d=>{const s=swing(d.id),w=s.work;s.lesson={an:w.an,demo:w.demo,note:w.note.trim(),drill:w.drill,at:Date.now()};s.status='replied';s.comment=s.lesson.note;if(s.rv)s.rv.stage='replied';s.seenL=false;
 if(w.drill){const D=drill(w.drill);S.assign=S.assign.filter(a=>!(a.student===s.student&&a.drill===D.id));S.assign.push({student:s.student,drill:D.id,by:'Arjun',target:D.target,note:'From your swing lesson.'})}
 closeSheet();nv().stack=[{name:'swinbox',p:{}},{name:'swdone',p:{id:s.id}}];show('up');if(ids().includes(s.student))event('golfer',{i:'video',t:'Coach Arjun sent your swing lesson',b:s.lesson.note||`${s.club}, ${s.angle}`})};
V.swdone=p=>{const s=swing(p.id),st=stud(s.student),L=s.lesson;return `<div class="scroll"><div class="pad stack" style="padding-top:36px"><div class="sent"><div class="sentc">${ic('check')}</div><h2>Lesson sent to ${st.first}</h2><span class="muted small">${s.rv&&s.rv.price?'Paid '+money(s.rv.price)+' · ':''}${esc(s.club)}, ${esc(s.angle)}</span></div>
 <div class="list">${[['video','Swing analysis',swMs(L.an.duration)+(L.an.mic?'':' · no voice')],...(L.demo?[['swcam','Your demo',L.demo.sample?'Sample demo':'Video']]:[]),['list','Note',L.note?'Included':'None'],...(L.drill?[['target','Drill',drill(L.drill).n]]:[])].map(([i,a,b])=>`<div class="row"><span class="tile">${ic(i)}</span><span class="m t">${a}</span><span class="small muted">${b}</span></div>`).join('')}</div>
 <button class="btn ink full" data-a="swAsG" data-id="${s.id}">See it as ${st.first}</button><button class="btn sec2 full" data-a="back">Back to swing reviews</button></div></div>`};
ACT.swAsG=d=>{const s=swing(d.id),per=Object.keys(PERSONA).find(k=>PERSONA[k].who===s.student)||'coach';setPersona(per);S.role='golfer';S.unread.golfer=0;S.pending.golfer=[];S.seg.perf='swings';S.nav.golfer={tab:'progress',stack:[{name:'swlesson',p:{id:s.id}}]};closeSheet();show('role');chrome()};

/* ---------- coach: pricing ---------- */
V.swpricing=()=>{const q=S.swPrice,chipsP=(k,v)=>`<div class="chips" style="margin-top:8px">${[300,500,800,1000,1500].map(n=>`<button class="chip num" data-a="swPQ" data-k="${k}" data-id="${n}" aria-pressed="${v===n}">${money(n)}</button>`).join('')}</div>`;
 return nb('Swing review pricing')+`<div class="scroll"><div class="pad stack">
 <div class="card stack"><div><b style="display:block">Your students</b><span class="small muted">Golfers who book lessons with you</span></div><div class="seg"><button data-a="swPO" data-id="0" aria-pressed="${!q.ownPaid}">Free</button><button data-a="swPO" data-id="1" aria-pressed="${q.ownPaid}">Paid per review</button></div>
 ${q.ownPaid?`<div><label class="l" for="swpo">Price per review</label><div class="svprice"><span>₹</span><input class="fld num" id="swpo" type="number" inputmode="numeric" min="200" max="2000" step="50" value="${q.own}"></div>${chipsP('own',q.own)}</div>`:''}<span class="small muted">Good for online coaching, where swing reviews are the lesson.</span></div>
 <div class="card stack"><div><b style="display:block">Other golfers</b><span class="small muted">Anyone on Fore! who doesn't train with you</span></div><div><label class="l" for="swpx">Price per review</label><div class="svprice"><span>₹</span><input class="fld num" id="swpx" type="number" inputmode="numeric" min="200" max="2000" step="50" value="${q.other}"></div>${chipsP('other',q.other)}</div></div>
 <div class="demo">${ic('clock')}Reply within 48 hours or the golfer is refunded automatically. Between ₹200 and ₹2,000.</div><div id="swperr" class="small" style="color:var(--bad)" role="alert"></div><div class="bottom-gap"></div></div></div><div class="foot"><button class="btn full" data-a="swPS">Save prices</button></div>`};
ACT.swPO=d=>{swPGrab();S.swPrice.ownPaid=d.id==='1';show('none')};
ACT.swPQ=d=>{swPGrab();S.swPrice[d.k]=+d.id;show('none')};
function swPGrab(){const o=$('#swpo'),x=$('#swpx');if(o&&+o.value)S.swPrice.own=+o.value;if(x&&+x.value)S.swPrice.other=+x.value}
ACT.swPS=()=>{const o=$('#swpo'),x=$('#swpx'),ov=o?+o.value:S.swPrice.own,xv=+x.value,ok=n=>n>=200&&n<=2000;if(!ok(ov)||!ok(xv)){$('#swperr').textContent='Prices must be between ₹200 and ₹2,000.';return}S.swPrice.own=ov;S.swPrice.other=xv;back();toast('Prices saved')};
const _cprof10=V.cprofile;V.cprofile=()=>_cprof10().replace('<button class="row" data-a="go" data-v="hours">',`<button class="row" data-a="go" data-v="swpricing"><span class="tile o">${ic('video')}</span><span class="m"><span class="t" style="display:block">Swing review pricing</span><span class="small muted">Your students: ${S.swPrice.ownPaid?money(S.swPrice.own):'free'} · Others: ${money(S.swPrice.other)}</span></span>${ic('chev','class="chev"')}</button><button class="row" data-a="go" data-v="hours">`);
const _cperf10=coachPerf;coachPerf=function(x){return _cperf10(x).split('<span class="pill fl swp">With coach</span>').join('<span class="pill fl swp">To review</span>')};

/* ---------- mounting the live parts ---------- */
const SWMOUNT={
 mini(el){new SwStudio(el,swing(el.dataset.id),{})},
 studio(el){const s=swing(el.dataset.id);if(!s.drawings)s.drawings=[];new SwStudio(el,s,{tools:true,shapes:s.drawings})},
 lesson(el){const s=swing(el.dataset.id),mode=el.dataset.mode,L=mode==='preview'?swWork(s):s.lesson,scr=el.closest('.svd');let cur2=null;
  const pick=k=>{if(cur2&&cur2.destroy)cur2.destroy();cur2=null;scr.querySelectorAll('[data-t]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.t===k)));
   if(k==='an'){el.innerHTML=svReplay();cur2=new SwReplay(el,s,L.an)}
   else if(L.demo){el.innerHTML=`<div class="svstage"><video src="${esc(L.demo.url)}" controls playsinline preload="auto" class="svdemo"></video>${L.demo.sample?'<span class="svbadge">Sample demo</span>':''}</div>`;const v=el.querySelector('video');cur2={destroy(){v.pause()}}}};
  scr.querySelectorAll('[data-t]').forEach(b=>b.addEventListener('click',()=>pick(b.dataset.t)));pick('an')},
 cstudio(el){const s=swing(el.dataset.id),w=swWork(s),ft=$('#svcf'),badge=el.querySelector('#svbadge'),pip=el.querySelector('#svpip'),stg=el.querySelector('.svstage'),camB=el.closest('.svd').querySelector('.svcam');let recing=false,last=-1e3,note='';
  const stop=async()=>{if(!recing)return;recing=false;const an=await stu.stopRec();if(an)w.an=an;w.shapes=stu.shapes;if(camB)camB.disabled=false;badge.hidden=true;stg.classList.remove('rec');pip.innerHTML='AR';pip.hidden=!S.swCam;if(el.isConnected)foot()};
  const stu=new SwStudio(el,s,{tools:true,shapes:w.shapes,onTick:t=>{if(t-last>200){last=t;badge.innerHTML=`<span class="svdot"></span>REC ${swMs(t)} / 3:00`}},onLimit:()=>stop()});
  const N=x=>`<span class="svnote">${x}</span>`;
  const foot=()=>{ft.innerHTML=recing?`<button class="btn full svred" data-f="stop"><span class="svsq"></span>Stop recording</button>${N(note||'Talk while you play, pause, step frames, scrub and draw. It all replays in sync.')}`
   :w.an?`<div class="svdone">${ic('check')}<span>Analysis recorded · ${swMs(w.an.duration)}${w.an.mic?'':' · no voice'}</span></div><div style="display:flex;gap:8px"><button class="btn svghost grow" data-f="rec">Re-record</button><button class="btn grow" data-f="next">Next: add note</button></div>`
   :`<button class="btn full" data-f="rec"><span class="svdot red"></span>Record analysis</button>${N('Your voice, face cam, scrubbing and drawings are recorded together. Up to 3 minutes.')}`};
  const start=async()=>{const b=ft.querySelector('[data-f=rec]');if(b){b.disabled=true;b.textContent='Starting…'}const rec=await stu.startRec(S.swCam);if(!el.isConnected){stu.stopRec(true);return}w.an=null;
   recing=true;if(camB)camB.disabled=true;badge.hidden=false;badge.innerHTML='<span class="svdot"></span>REC 0:00 / 3:00';stg.classList.add('rec');
   if(rec.cam){pip.innerHTML='<video autoplay muted playsinline></video>';pip.querySelector('video').srcObject=rec.stream;pip.hidden=false}
   note=rec.mic?'':'No microphone access, so no voice. Pauses, scrubbing and drawings are still recorded.';foot()};
  ft.addEventListener('click',e=>{const b=e.target.closest('[data-f]');if(!b||b.disabled)return;const f=b.dataset.f;if(f==='rec')start();else if(f==='stop')stop();else if(f==='next'){w.shapes=stu.shapes;swToReply(s.id)}});
  const keep=()=>{if(!el.isConnected){w.shapes=stu.shapes;return}setTimeout(keep,500)};keep();foot()},
 demo(el){const s=swing(el.dataset.id),w=swWork(s),vw=el.querySelector('#svdv'),ft=$('#svdf');let state=w.demo?'done':'choose',stream=null,mr=null,chunks=[],t0=0,tm=null;
  const kill=()=>{if(stream){stream.getTracks().forEach(t=>t.stop());stream=null}};
  const draw=()=>{if(state==='choose'){vw.innerHTML=`<div class="svcover"><span class="svcoveri">${ic('swcam')}</span><b>Show ${stud(s.student).first} the move</b><span>A short clip of you doing it, slowly, from the same angle as the swing.</span></div>`;
    ft.innerHTML=`<button class="btn full" data-f="cam">${ic('swcam')}Record with camera</button><div style="display:flex;gap:8px"><label class="btn svghost grow" style="cursor:pointer">${ic('swfolder')}Upload<input type="file" accept="video/*" hidden data-f2="up"></label><button class="btn svghost grow" data-f="sample">Use sample</button></div><button class="swlink dk" data-f="skip">Skip, no demo this time</button>`}
   else if(state==='live'||state==='rec'){if(!vw.querySelector('video.svcamv')){vw.innerHTML='<video class="svcamv" autoplay muted playsinline></video><span class="svbadge rec" id="svdb" hidden></span>';vw.querySelector('video').srcObject=stream}vw.querySelector('#svdb').hidden=state!=='rec';
    ft.innerHTML=state==='live'?'<button class="btn full" data-f="start"><span class="svdot red"></span>Start recording</button><button class="swlink dk" data-f="cancel">Cancel</button>':`<button class="btn full svred" data-f="stop"><span class="svsq"></span>Stop recording</button><span class="svnote">Up to 60 seconds</span>`}
   else{vw.innerHTML=`<video class="svdemo" src="${esc(w.demo.url)}" controls playsinline preload="auto"></video>${w.demo.sample?'<span class="svbadge">Sample demo</span>':''}`;ft.innerHTML='<div style="display:flex;gap:8px"><button class="btn svghost grow" data-f="redo">Remove</button><button class="btn grow" data-f="use">Use this demo</button></div>'}};
  const endRec=()=>{clearInterval(tm);if(mr&&mr.state!=='inactive')mr.stop()};
  ft.addEventListener('change',e=>{if(e.target.dataset.f2==='up'&&e.target.files[0]){w.demo={url:URL.createObjectURL(e.target.files[0])};state='done';draw()}});
  ft.addEventListener('click',async e=>{const b=e.target.closest('[data-f]');if(!b||b.disabled)return;const f=b.dataset.f;
   if(f==='cam'){const md=navigator.mediaDevices;try{if(!md||!md.getUserMedia)throw 0;try{stream=await md.getUserMedia({video:{facingMode:'user'},audio:true})}catch(_){stream=await md.getUserMedia({video:{facingMode:'user'}})}if(!el.isConnected){kill();return}state='live';draw()}catch(_){toast('Camera not available. Upload a video instead.')}}
   else if(f==='start'){if(!window.MediaRecorder){toast('Recording isn\'t supported here. Upload a video instead.');return}chunks=[];try{mr=new MediaRecorder(stream)}catch(_){toast('Recording isn\'t supported here.');return}
    mr.ondataavailable=ev=>{if(ev.data&&ev.data.size)chunks.push(ev.data)};mr.onstop=()=>{const bl=new Blob(chunks,{type:mr.mimeType||'video/webm'});kill();if(!el.isConnected)return;if(bl.size){w.demo={url:URL.createObjectURL(bl)};state='done'}else state='choose';draw()};
    mr.start(250);t0=Date.now();state='rec';draw();const bd=vw.querySelector('#svdb');bd.innerHTML='<span class="svdot"></span>REC 0:00';tm=setInterval(()=>{if(!el.isConnected){endRec();return}const t=Date.now()-t0;bd.innerHTML='<span class="svdot"></span>REC '+swMs(t);if(t>=6e4)endRec()},250)}
   else if(f==='stop')endRec();else if(f==='cancel'){kill();state='choose';draw()}else if(f==='sample'){w.demo={url:SW_DEMO,sample:true};state='done';draw()}
   else if(f==='redo'){w.demo=null;state='choose';draw()}else if(f==='use'||f==='skip')swToReply(s.id)});
  const watch=()=>{if(!el.isConnected){clearInterval(tm);if(mr&&mr.state!=='inactive'){mr.onstop=null;mr.stop()}kill();return}setTimeout(watch,500)};watch();draw()}
};
function swMount(){document.querySelectorAll('#screens [data-swm]').forEach(el=>{if(el.__m)return;el.__m=1;const f=SWMOUNT[el.dataset.swm];if(f)try{f(el)}catch(e){console.error(e)}})}
const _tabs10=tabs;tabs=function(){_tabs10();swMount()};
const SW_DARK=['swstudio','swlesson','swdemo','swprev'];
const _show10=show;show=function(k){_show10(k);const c=cur(),ph=$('#phone');if(!ph)return;let dk=SW_DARK.includes(c.name);if(c.name==='swing'){const s=swing(c.p.id);dk=!!s&&!(S.role==='coach'&&s.status==='sent')}ph.classList.toggle('swdark',dk)};
GUIDE.push(['swc','Coach records a swing lesson']);
const _jump10=ACT.jump;ACT.jump=d=>{if(d.id!=='swc')return _jump10(d);closeSheet();S.role='coach';S.unread.coach=0;S.nav.coach={tab:'today',stack:[{name:'swinbox',p:{}}]};show('role');chrome()};
swInit();show('none');
