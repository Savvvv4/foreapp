
/* ---------- pass 10: shot-by-shot strokes gained ---------- */
/* Engine. Off the green in yards, on the green in feet. Tour tables: Broadie's published PGA Tour baselines (approximate).
   Handicap baselines: Fore! beta model, tour + (hcp+6) x skill gap, calibrated to average scores (~74 scratch, ~84 for a 10, ~93 for a 20). */
const SGT={
 T:[[100,2.92],[120,2.99],[140,2.97],[160,2.99],[180,3.05],[200,3.12],[220,3.17],[240,3.25],[260,3.45],[280,3.65],[300,3.71],[320,3.79],[340,3.86],[360,3.92],[380,3.96],[400,3.99],[420,4.02],[440,4.08],[460,4.17],[480,4.28],[500,4.41],[520,4.54],[540,4.65],[560,4.74],[580,4.79],[600,4.82]],
 F:[[5,2.10],[10,2.18],[20,2.40],[30,2.52],[40,2.60],[60,2.70],[80,2.75],[100,2.80],[120,2.85],[140,2.91],[160,2.98],[180,3.08],[200,3.19],[220,3.32],[240,3.45],[260,3.58],[280,3.69],[300,3.78],[350,3.95],[400,4.10],[500,4.40],[600,4.75]],
 R:[[5,2.20],[10,2.34],[20,2.59],[30,2.70],[40,2.78],[60,2.91],[80,2.96],[100,3.02],[120,3.08],[140,3.15],[160,3.23],[180,3.31],[200,3.42],[220,3.53],[240,3.64],[260,3.74],[280,3.83],[300,3.90],[400,4.20],[500,4.50],[600,4.85]],
 S:[[5,2.33],[10,2.43],[20,2.53],[30,2.66],[40,2.82],[60,3.15],[80,3.24],[100,3.23],[120,3.21],[140,3.22],[160,3.28],[180,3.40],[200,3.55],[220,3.70],[240,3.84],[260,3.93],[300,4.05],[400,4.35]],
 X:[[20,3.00],[40,3.20],[60,3.45],[80,3.60],[100,3.80],[120,3.78],[140,3.80],[160,3.81],[180,3.82],[200,3.87],[220,3.92],[240,3.97],[260,4.03],[280,4.10],[300,4.20],[400,4.45]],
 G:[[1,1.00],[2,1.01],[3,1.04],[4,1.13],[5,1.23],[6,1.34],[7,1.42],[8,1.50],[9,1.56],[10,1.61],[15,1.78],[20,1.87],[30,1.98],[40,2.06],[50,2.14],[60,2.21],[90,2.40],[120,2.55]]};
function sxInterp(t,x){if(x<=t[0][0])return t[0][1];for(let i=1;i<t.length;i++)if(x<=t[i][0]){const[a,b]=t[i-1],[c,d]=t[i];return b+(d-b)*(x-a)/(c-a)}const n=t.length,[a,b]=t[n-2],[c,d]=t[n-1];return d+(d-b)*(x-c)/(c-a)}
function sxGap(lie,d,h){const s=Math.max(0,h+6);if(lie==='G')return s*.0026*Math.sqrt(d);d*=.9144;return s*(.021+.00013*Math.min(d,250)+.000026*Math.max(0,d-250)+({R:.004,S:.009,X:.008}[lie]||0))}
function sxE(lie,d,h){const b=sxInterp(SGT[lie],d);return h==null?b:b+sxGap(lie,d,h)}
const sxH=bk=>bk==='tour'?null:+bk;
function sxCat(p,par){if(p.lie==='G')return 'putt';if(p.lie==='T'&&par>3)return 'ott';return p.d<=30?'arg':'app'}
function sxShots(h,h0){const P=h.pos,out=[];P.forEach((a,i)=>{const b=P[i+1];out.push({i,lie:a.lie,d:a.d,side:a.side,pen:a.pen||0,cat:sxCat(a,h.p),next:b||null,sg:sxE(a.lie,a.d,h0)-(b?sxE(b.lie,b.d,h0):0)-1-(a.pen||0)})});return out}
function sxRound(r,h0){const cats={ott:0,app:0,arg:0,putt:0},holes=[],shots=[];r.holes.forEach((h,k)=>{const sh=sxShots(h,h0).map(s=>({...s,hole:k}));let t=0;sh.forEach(s=>{cats[s.cat]+=s.sg;t+=s.sg;shots.push(s)});holes.push({sg:t,s:h.s,p:h.p})});return {cats,holes,shots,total:Object.values(cats).reduce((a,b)=>a+b,0)}}
function sxEquiv(shots,cat){const f=h=>shots.filter(s=>!cat||s.cat===cat).reduce((t,s)=>t+sxE(s.lie,s.d,h)-(s.next?sxE(s.next.lie,s.next.d,h):0)-1-s.pen,0);let lo=-6,hi=40;if(f(lo)>=0)return lo;if(f(hi)<=0)return hi;for(let k=0;k<40;k++){const m=(lo+hi)/2;if(f(m)<0)lo=m;else hi=m}return (lo+hi)/2}
const sxHc=h=>h<-.5?'+'+Math.round(-h):String(Math.round(h));
const sx2=v=>{const r=+v.toFixed(2);return (r>0?'+':r<0?'−':'')+Math.abs(r).toFixed(2)};
const sxCls=v=>v>=.05?'gp':v<=-.05?'gn':'';
const sxOrd=n=>n+(n%10===1&&n!==11?'st':n%10===2&&n!==12?'nd':n%10===3&&n!==13?'rd':'th');
const sxWord=n=>['no','one','two','three','four','five'][n]||String(n);
const SCN=d=>({'-3':'Albatross','-2':'Eagle','-1':'Birdie','0':'Par','1':'Bogey','2':'Double','3':'Triple'})[d]||(d>3?'+'+d:'Ace');
const LIEC={T:'#8D949E',F:'#52C98E',R:'#2F8F5E',S:'#D9C49A',X:'#9A6A48',G:'#8FE0B0'};
const LIEN={T:'Tee',F:'Fairway',R:'Rough',S:'Sand',X:'Trees',G:'Green'};
const lieWord=r=>r.lie==='F'?'fairway':r.lie==='R'?(r.side==='L'?'left rough':r.side==='R'?'right rough':'rough'):r.lie==='S'?(r.side==='L'?'left bunker':r.side==='R'?'right bunker':'bunker'):r.lie==='X'?(r.side==='L'?'trees, left':r.side==='R'?'trees, right':'trees'):r.lie==='T'?'tee':'green';
const isSbs=r=>r&&r.sbs;
const BAND={app:[[30,100,'30–100 yd'],[100,150,'100–150 yd'],[150,200,'150–200 yd'],[200,999,'200 yd +']],putt:[[0,5,'Up to 5 ft'],[5,15,'6–15 ft'],[15,30,'16–30 ft'],[30,999,'Over 30 ft']]};

/* course yardages and stroke index (sample data) */
(function(){const Y=(p,i)=>p===3?150+(i*37)%45:p===4?345+(i*53)%90:495+(i*29)%70;
 COURSES[0].y=[365,340,165,480,385,330,150,395,505,360,175,350,470,400,325,140,380,500].map(m=>Math.round(m*1.0936));COURSES[0].si=[7,11,15,3,1,13,17,5,9,8,16,2,6,4,14,18,10,12];
 COURSES.forEach((c,ci)=>{if(!c.y)c.y=c.p.map((p,i)=>Y(p,i+ci*7));if(!c.si)c.si=c.p.map((p,i)=>((i*7+ci*3)%18)+1)})})();

/* simulator, for sample rounds and the voice demo */
function sxRng(seed){let a=seed>>>0;return ()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function sxSimHole(r,lenY,par,P){const nrm=()=>{let u=0,v=0;while(!u)u=r();while(!v)v=r();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)},pick=a=>{let x=r(),c=0;for(const[k,p]of a){c+=p;if(x<c)return k}return a[a.length-1][0]};
 const len=lenY*.9144,pos=[{lie:'T',d:len,pen:0}];let cur=pos[0],g=0;
 while(g++<14){const{lie,d}=cur;let nl,nd,pen=0;
  if(lie==='G'){if(r()<1/(1+Math.pow(d/P.pk,2.1)))break;nl='G';nd=Math.max(1,Math.round(d*.11+Math.abs(nrm())*1.4+(d>25?1:0)))}
  else if(lie==='T'&&par>3){const dist=P.dr+nrm()*20;nd=Math.max(15,Math.round(d-dist));nl=pick([['F',.5],['R',.38],['S',.05],['X',.04],['P',.03]]);if(nl==='P'){pen=1;nl='R';nd=Math.round(d-dist*.8)}if(nl==='X')nd+=10}
  else if(d>215){nd=Math.max(30,Math.round(d-(165+nrm()*25)));nl=pick([['F',.55],['R',.33],['S',.08],['X',.04]])}
  else if(d>27){let pg=Math.max(.05,(lie==='F'||lie==='T'?.8:lie==='R'?.62:lie==='S'?.5:.25)-d/(lie==='T'?330:300))*P.gk;if(d>120&&d<185)pg*=(P.mi||.5);
   if(r()<pg){nl='G';nd=Math.max(3,Math.round(Math.exp(Math.log(d*.2+4)+nrm()*.45)))}else if(r()<.045){pen=1;nl='R';nd=Math.max(15,Math.round(d*.2+10))}else{nl=pick([['R',.55],['S',.28],['F',.17]]);nd=Math.max(4,Math.round(6+Math.abs(nrm())*10+d*.04))}
   if(lie==='X'&&r()<.5){nl=pick([['F',.5],['R',.5]]);nd=Math.max(30,Math.round(d*.45))}}
  else{if(r()<.03)break;if(r()<(lie==='S'?.62:lie==='R'?.84:.93)){nl='G';nd=Math.max(2,Math.round(3+d*.35+Math.abs(nrm())*5))}else{nl=lie==='S'?pick([['S',.5],['R',.5]]):'R';nd=Math.max(3,Math.round(d*.5+2))}}
  cur.pen=pen;cur={lie:nl,d:nd,pen:0};if(nl!=='F'&&nl!=='G'){const hh=Math.round(nd*7+d*13+g*31)%100;cur.side=(lie==='T'&&par>3)?(hh<66?'R':'L'):(hh<54?'L':'R')}if(pen&&!cur.side)cur.side='R';pos.push(cur)}
 pos.forEach((p,i)=>{if(p.lie!=='G')p.d=i===0?lenY:Math.max(1,Math.round(p.d/.9144))});return pos}
function sxHoleFromPos(pos,p){const s=pos.length+pos.reduce((a,x)=>a+(x.pen||0),0),pt=pos.filter(x=>x.lie==='G').length;return {p,s,pt,fw:p>3?(pos[0].pen?'r':pos[1]&&pos[1].lie==='F'?'hit':(pos[1]&&pos[1].side==='L'?'l':'r')):null,pos}}
function sxSimRound(seed,c,P,d){const r=sxRng(seed);return {id:'r'+(uid++),course:c.n,d,sbs:true,holes:c.p.map((p,i)=>sxHoleFromPos(sxSimHole(r,c.y[i],p,P),p))}}

/* exact strokes gained for shot-by-shot rounds; the scorecard estimate stays for the rest */
const _sgOfEst=sgOf;sgOf=function(r,bk){return isSbs(r)?sxRound(r,sxH(bk)).cats:_sgOfEst(r,bk)};

/* ---------- entry: the hole as a story ---------- */
const sxSw=f=>f.score-f.putts-f.pens;
const sxRows=f=>[{lie:'T',d:f.tee}].concat(f.rows);
const sxType=(f,i)=>i===0?'tee':i<sxSw(f)?'swing':'putt';
const sxDone=r=>!!(r.lie&&r.d>0);
function sxRebuild(f){const sw=sxSw(f),old=f.rows||[],oS=old.filter(r=>r.lie!=='G'),oP=old.filter(r=>r.lie==='G'),rows=[];
 for(let i=0;i<sw-1;i++)rows.push(oS[i]?{...oS[i]}:{lie:null,d:null,side:null});for(let i=0;i<f.putts;i++)rows.push(oP[i]?{...oP[i]}:{lie:'G',d:null,side:null});
 f.rows=rows;f.penAt=(f.penAt||[]).filter(i=>i<sw).slice(0,f.pens);for(let c=0;f.penAt.length<f.pens&&c<sw;c++)if(!f.penAt.includes(c))f.penAt.push(c)}
const sxPos=f=>sxRows(f).map((r,i)=>{const p={lie:r.lie||'F',d:r.d||0,pen:f.penAt.filter(x=>x===i).length};if(r.side)p.side=r.side;return p});
const sxHoled=f=>!!(f&&f.ok&&sxRows(f).every(sxDone));
function sxRowSG(f,h0){const P=sxRows(f);return P.map((a,i)=>{const b=P[i+1];if(!sxDone(a)||(b&&!sxDone(b)))return null;return sxE(a.lie,a.d,h0)-(b?sxE(b.lie,b.d,h0):0)-1-f.penAt.filter(x=>x===i).length})}
function sxNext(f,after){if(!f)return {k:'score'};if(!f.ok)return {k:'putts'};const P=sxRows(f),L=[];P.forEach((r,i)=>{if(!i)return;if(sxType(f,i)==='swing')L.push({k:'lie',i});L.push({k:'dist',i})});
 const open=b=>b.k==='lie'?!P[b.i].lie:!(P[b.i].d>0);let s=0;if(after){const j=L.findIndex(b=>b.k===after.k&&b.i===after.i);if(j>=0)s=j+1}
 for(let j=s;j<L.length;j++)if(open(L[j]))return L[j];for(let j=0;j<s;j++)if(open(L[j]))return L[j];return {k:'done'}}
function sxPredict(f,i,c,k){const P=sxRows(f),pv=P[i-1],t=sxType(f,i),par=c.p[k];
 if(t==='tee')return [f.tee-20,f.tee-10,f.tee,f.tee+10,f.tee+20];
 if(t==='putt'){if(pv&&pv.lie==='G')return [1,2,3,4,6];if(!pv||!pv.d)return [5,10,15,20,30];if(pv.d>120)return [15,25,35,45,60];if(pv.d>30)return [8,12,18,25,35];return [3,5,8,12,18]}
 const pd=pv&&pv.d;let v=!pd?150:pv.lie==='T'&&par>3?pd-238:pd>235?pd-180:pd>30?15:8;v=Math.max(5,Math.round(v/5)*5);const st=v>40?10:5;const o=[v-2*st,v-st,v,v+st,v+2*st].filter(x=>x>0);while(o.length<5)o.push(o[o.length-1]+st);return o}
const sxE0=()=>S.se;
const sxF=()=>{const e=sxE0();return e.holes[e.h].f};
function sxTrack(f,c,k,fi){const W=350,Hh=70,tx=22,gx=318,mid=35,len=c.y[k],P=f?sxRows(f):[{lie:'T',d:len}];
 const X=r=>r.lie==='G'?gx-5-Math.min(r.d,60)/60*14:tx+(1-Math.min(r.d,len)/len)*(gx-26-tx),Y=(r,i)=>{const s=r.side==='R'?1:-1;if(r.lie==='T'||r.lie==='F')return mid;if(r.lie==='G')return mid+(i%2?5:-5);if(r.lie==='R')return mid+s*17;if(r.lie==='S')return mid+s*13;return mid+s*26};
 const pts=P.map((r,i)=>sxDone(r)?[X(r),Y(r,i),i]:null).filter(Boolean),cur=fi&&fi.i>0?fi.i:-1;let gh='';
 if(cur>0&&!sxDone(P[cur])){const r=P[cur],pp=pts.filter(p=>p[2]<cur).pop()||[tx,mid],x=sxType(f,cur)==='putt'?gx-10:r.d?X(r):Math.min(gx-30,pp[0]+(gx-pp[0])*.55),y=r.lie&&r.lie!=='G'?Y(r,cur):mid;gh=`<circle class="sx-ghost" cx="${x}" cy="${y}" r="7"/>`}
 return `<svg class="sx-track" viewBox="0 0 ${W} ${Hh}" role="img" aria-label="Hole map with your shots"><rect x="2" y="2" width="${W-4}" height="${Hh-4}" rx="18" class="sx-rough"/><path d="M${tx-4} ${mid} C ${W*.35} ${mid-13}, ${W*.6} ${mid+12}, ${gx-16} ${mid}" class="sx-fwy"/><ellipse cx="${W*.62}" cy="${mid+17}" rx="12" ry="4.5" class="sx-sand"/><ellipse cx="${gx-28}" cy="${mid-18}" rx="9" ry="4" class="sx-sand"/><circle cx="${gx}" cy="${mid}" r="20" class="sx-green"/><line x1="${gx+2}" y1="${mid}" x2="${gx+2}" y2="${mid-22}" class="sx-pole"/><path d="M${gx+2} ${mid-22} l10 4 -10 4z" class="sx-flag"/><rect x="${tx-9}" y="${mid-6}" width="12" height="12" rx="3" class="sx-tee"/>${pts.length>1?`<polyline points="${pts.map(p=>p[0].toFixed(1)+','+p[1]).join(' ')}" class="sx-path"/>`:''}${gh}${pts.map(([x,y,i])=>`<g class="sx-dot" data-a="sxEdit" data-n="${i}" role="button" aria-label="Edit shot ${i+1}"><circle cx="${x}" cy="${y}" r="7.5"/><text x="${x}" y="${y+3}">${i+1}</text></g>`).join('')}</svg>`}
const sxSlot=(on,filled,text,ph,a)=>`<button class="sx-bl ${on?'on':''} ${filled?'f':''}" ${a}>${filled?text:`<span>${ph}</span>`}</button>`;
function sxStory(f,c,k,fi,sgs){const on=(kk,i)=>fi.k===kk&&(i==null||fi.i===i);
 if(!f)return `<p class="sx-st lead">You made ${sxSlot(on('score'),false,'','score','data-a="sxFocus" data-k="score" aria-label="Your score on this hole"')}.</p>`;
 const P=sxRows(f),L=[],pen=i=>f.penAt.filter(x=>x===i).length;
 L.push(`<p class="sx-st lead">${sxSlot(on('score'),true,`${SCN(f.score-c.p[k])} ${f.score}`,'','data-a="sxFocus" data-k="score" aria-label="Score"')}, ${sxSlot(on('putts'),f.ok,`${sxWord(f.putts)} putt${f.putts===1?'':'s'}`,`${sxWord(f.putts)} putts?`,'data-a="sxFocus" data-k="putts" aria-label="Putts"')}${f.pens?`, <span class="gn">${sxWord(f.pens)} penalty</span>`:''}.</p>`);
 let pn=0;P.forEach((r,i)=>{const t=sxType(f,i),last=i===P.length-1,sg=sgs[i];if(t==='putt')pn++;let tx;
  if(t==='tee')tx=`Teed off, ${sxSlot(on('dist',0),true,`${r.d} yd`,'',`data-a="sxFocus" data-k="dist" data-n="0" aria-label="Hole length"`)}.`;
  else if(t==='swing')tx=`${last?'Holed the ':''}${sxOrd(i+1)} from the ${sxSlot(on('lie',i),!!r.lie,lieWord(r),'where',`data-a="sxFocus" data-k="lie" data-n="${i}" aria-label="${sxOrd(i+1)} shot, played from"`)}, ${sxSlot(on('dist',i),r.d>0,`${r.d} yd`,'yards',`data-a="sxFocus" data-k="dist" data-n="${i}" aria-label="${sxOrd(i+1)} shot, yards to the hole"`)}.`;
  else tx=`${last?'Holed it':pn===1?'Putted':'Then'} from ${sxSlot(on('dist',i),r.d>0,`${r.d} ft`,'feet',`data-a="sxFocus" data-k="dist" data-n="${i}" aria-label="Putt ${pn} length in feet"`)}.`;
  L.push(`<p class="sx-st ${sxDone(r)||t==='tee'?'':'later'} ${fi.i===i?'now':''}"><i class="sx-ld" style="background:${r.lie?LIEC[r.lie]:'transparent'}"></i><span>${tx}${pen(i)?`<span class="sx-pen">+${pen(i)} penalty</span>`:''}</span>${sg!=null&&fi.k==='done'?`<b class="num ${sxCls(sg)}">${sx2(sg)}</b>`:''}</p>`)});
 return L.join('')}
function sxTray(f,c,k,fi){const e=sxE0(),par=c.p[k],tile=(a,big,small,on)=>`<button ${a} class="${on?'on':''}"><b class="num">${big}</b>${small?`<small>${small}</small>`:''}</button>`;
 if(fi.k==='score'||fi.k==='putts'){const base=[[-2,'Eagle'],[-1,'Birdie'],[0,'Par'],[1,'Bogey'],[2,'Double']],more=[[3,'Triple'],[4,'Quad'],[5,''],[6,''],[-3,par===3?'Ace':'Albatross']],set=(e.more?more:base).filter(([d])=>par+d>=1);
  return `<div class="sx-g g3">${set.map(([d,n])=>tile(`data-a="sxScore" data-n="${par+d}" aria-label="${n||'Score'} ${par+d}"`,par+d,n,f&&f.score===par+d)).join('')}${tile(`data-a="sxMore" data-n="${e.more?0:1}"`,e.more?'‹':'More',e.more?'':'7, 8, 9…',false)}</div>
   <div class="sx-q ${f?'':'off'}">Putts</div><div class="sx-g g5 putts ${f?'':'off'}">${[0,1,2,3,4].map(p=>`<button data-a="sxPutts" data-n="${p}" class="${f&&f.ok&&f.putts===p?'on':''} ${f&&!f.ok&&f.putts===p?'sug':''}" ${!f||f.score-f.pens-p<1?'disabled':''}><b class="num">${p}</b></button>`).join('')}</div>
   <div class="sx-links"><button class="sx-link" data-a="sxPenGo" ${f?'':'disabled'}>${f&&f.pens?`${sxWord(f.pens)} penalty · change`:'+ Penalty'}</button><button class="sx-link" data-a="sxMic">${ic('mic')}Say it</button></div>`}
 if(fi.k==='pens')return `<div class="sx-q">Penalty strokes</div><div class="sx-g g3">${[0,1,2].map(p=>`<button data-a="sxPens" data-n="${p}" class="${f.pens===p?'on':''}" ${f.score-f.putts-p<1?'disabled':''}><b class="num">${p}</b><small>${p?'+'+p:'none'}</small></button>`).join('')}</div>`;
 if(fi.k==='penat')return `<div class="sx-q">Which shot was penalised?</div><div class="sx-g g4">${Array.from({length:sxSw(f)},(_,i)=>`<button data-a="sxPenAt" data-n="${i}" class="${f.penAt.includes(i)?'on':''}"><b>${i===0?'Tee':sxOrd(i+1)}</b></button>`).join('')}</div>`;
 if(fi.k==='done'){const h0=sxH(S.base||baseFor(S.who)),sg=sxRowSG(f,h0),t=sg.reduce((a,b)=>a+(b||0),0),w=sg.map((v,i)=>[v,i]).filter(x=>x[0]!=null).sort((a,b)=>a[0]-b[0])[0],P=sxRows(f),wt=w?sxType(f,w[1]):null,wn=!w?'':wt==='tee'?'tee shot':wt==='swing'?sxOrd(w[1]+1)+' shot':'putt from '+P[w[1]].d+' ft';
  return `<div class="sx-sum"><span class="disp num ${sxCls(t)}" style="font-size:52px">${sx2(t)}</span><span class="small muted">vs ${BASE[S.base||baseFor(S.who)].n.toLowerCase()}${w&&w[0]<-.25?` · the ${wn} cost most`:''}</span></div><button class="btn full" data-a="sxNextHole">${k<c.p.length-1?'Hole '+(k+2):'See your round'}</button>`}
 const P=sxRows(f),i=fi.i,r=P[i],t=sxType(f,i);
 if(fi.k==='lie'){const pv=P[i-1],same=f.penAt.includes(i-1)&&pv&&sxDone(pv);
  return `<div class="sx-q">${sxOrd(i+1)} shot, played from</div>${same?`<button class="sx-wide" data-a="sxSame">↺ Same spot · ${pv.lie==='T'?'tee':lieWord(pv)}, ${pv.d} yd</button>`:''}<div class="sx-g g2 lies">${['F','R','S','X'].map(l=>`<button data-a="sxLie" data-n="${l}" class="${r.lie===l?'on':''}"><i style="background:${LIEC[l]}"></i><b>${LIEN[l]}</b></button>`).join('')}</div>`}
 const u=t==='putt'?'ft':'yd',pr=sxPredict(f,i,c,k),side=t==='swing'&&'RSX'.includes(r.lie||'-');
 return `<div class="sx-q">${t==='tee'?'Hole length':t==='swing'?`${sxOrd(i+1)} shot, yards to the hole`:'Putt length'}${side?`<span class="sx-seg"><button data-a="sxSide" data-n="L" class="${r.side==='L'?'on':''}">Left</button><button data-a="sxSide" data-n="R" class="${r.side==='R'?'on':''}">Right</button></span>`:''}</div>
  <div class="sx-picks">${e.buf?`<div class="sx-typed"><b class="num">${e.buf}</b> ${u}</div>`:pr.map(v=>`<button data-a="sxPick" data-n="${v}" class="num ${r.d===v?'on':''}">${v}</button>`).join('')}</div>
  <div class="sx-pad">${[1,2,3,4,5,6,7,8,9].map(n=>`<button data-a="sxKey" data-n="${n}">${n}</button>`).join('')}<button data-a="sxKey" data-n="del" aria-label="Delete">⌫</button><button data-a="sxKey" data-n="0">0</button><button data-a="sxKey" data-n="ok" class="go">${e.buf?'OK':'Next'}</button></div>`}
V.se=()=>{const e=sxE0(),c=e.c,k=e.h,f=e.holes[k].f;if(!e.fi)e.fi=sxNext(f);const fi=e.fi,h0=sxH(S.base||baseFor(S.who)),sgs=f?sxRowSG(f,h0):[];
 const done=e.holes.filter(x=>sxHoled(x.f)),tp=done.reduce((a,x,j)=>a+x.f.score,0)-e.holes.reduce((a,x,j)=>a+(sxHoled(x.f)?c.p[j]:0),0);
 return `<div class="sx-top"><div class="nb" style="padding:0 6px 0"><button class="ib" data-a="back" aria-label="Back">${ic('back')}</button><h1 class="small muted" style="font-weight:600">${done.length?`Thru ${done.length} · ${tp>0?'+':''}${tp||'E'}`:esc(c.n)}</h1><button class="btn sec2 sm" data-a="sxFinish" style="min-height:36px">Finish</button></div>
  <div class="sx-board"><button class="sx-hno" data-a="sxCard" aria-label="Hole ${k+1}. Open your card"><small>Hole</small><b class="disp num">${k+1}</b></button><div class="sx-stat"><small>Par</small><b class="disp num">${c.p[k]}</b></div><div class="sx-stat"><small>Yards</small><b class="disp num">${c.y[k]}</b></div><div class="sx-stat"><small>SI</small><b class="disp num">${c.si[k]}</b></div><div class="sx-arr"><button data-a="sxHole" data-n="${k-1}" ${k===0?'disabled':''} aria-label="Previous hole">‹</button><button data-a="sxHole" data-n="${k+1}" ${k===c.p.length-1?'disabled':''} aria-label="Next hole">›</button></div></div>
  ${sxTrack(f,c,k,fi)}</div><div class="sx-story" id="sxstory">${sxStory(f,c,k,fi,sgs)}</div><div class="sx-tray ${fi.k}">${sxTray(f,c,k,fi)}</div>`};
function sxRedraw(){show('none');requestAnimationFrame(()=>{const st=$('#sxstory'),on=st&&st.querySelector('.sx-bl.on');if(on){const y=on.closest('p').offsetTop-st.offsetTop;if(y<st.scrollTop+8||y>st.scrollTop+st.clientHeight-60)st.scrollTop=Math.max(0,y-90)}else if(st&&sxE0().fi.k==='done')st.scrollTop=st.scrollHeight})}
function sxStart(c,edit){const holes=c.p.map((p,i)=>({f:null}));if(edit){edit.holes.forEach((h,i)=>{const P=h.pos;holes[i].f={score:h.s,putts:P.filter(x=>x.lie==='G').length,pens:P.reduce((a,x)=>a+(x.pen||0),0),tee:P[0].d,ok:true,penAt:P.map((x,j)=>x.pen?j:-1).filter(j=>j>=0),rows:P.slice(1).map(x=>({lie:x.lie,d:x.d,side:x.side||null}))}})}
 S.se={c,h:0,holes,fi:null,buf:'',more:false,edit:edit?edit.id:null,d:edit?edit.d:0};go('se')}
function sxSetHole(i){const e=sxE0();e.h=i;e.buf='';e.more=false;const f=e.holes[i].f;e.fi=sxNext(f);if(e.fi.k==='done'&&!sxHoled(f))e.fi={k:'putts'};sxRedraw()}
function sxSave(){const e=sxE0(),c=e.c,hs=e.holes.map((x,i)=>sxHoled(x.f)?sxHoleFromPos(sxPos(x.f),c.p[i]):null).filter(Boolean);if(!hs.length){toast('Fill in at least one hole');return}
 let r;if(e.edit){r=findR(e.edit).r;r.holes=hs}else{r={id:'r'+(uid++),course:c.n,d:e.d||0,sbs:true,holes:hs};(S.rds[S.who]=S.rds[S.who]||[]).push(r)}
 S.se=null;syncR(S.who);const st=rstat(r);if(myCoaches(S.who).some(x=>x.id==='arjun'))event('coach',{i:'flag',t:`${stud(S.who).first} logged a round`,b:`${st.score} at ${c.n}, shot by shot`});nv().stack=[{name:'round',p:{id:r.id}}];show('push');toast('Round saved')}
Object.assign(ACT,{
 sxFocus:d=>{const e=sxE0(),f=sxF();if(!f&&d.k!=='score')return;e.fi={k:d.k,i:d.n!=null?+d.n:undefined};e.buf='';sxRedraw()},
 sxEdit:d=>{const f=sxF(),i=+d.n;sxE0().fi={k:sxType(f,i)==='swing'?'lie':'dist',i};sxE0().buf='';sxRedraw()},
 sxScore:d=>{const e=sxE0(),c=e.c,k=e.h,x=e.holes[k];if(!x.f)x.f={score:+d.n,putts:2,pens:0,penAt:[],tee:c.y[k],rows:[],ok:false};const f=x.f;f.score=+d.n;e.more=false;if(sxSw(f)<1){f.pens=0;f.putts=Math.max(0,f.score-1)}sxRebuild(f);e.fi=f.ok?sxNext(f):{k:'putts'};sxRedraw()},
 sxMore:d=>{sxE0().more=d.n==='1';sxRedraw()},
 sxPutts:d=>{const f=sxF();f.putts=+d.n;f.ok=true;sxRebuild(f);sxE0().fi=sxNext(f);sxRedraw()},
 sxPenGo:()=>{sxE0().fi={k:'pens'};sxRedraw()},
 sxPens:d=>{const f=sxF();f.pens=+d.n;sxRebuild(f);sxE0().fi=f.pens?{k:'penat'}:{k:'putts'};sxRedraw()},
 sxPenAt:d=>{const f=sxF(),i=+d.n;if(!f.penAt.includes(i)){f.penAt.push(i);if(f.penAt.length>f.pens)f.penAt.shift()}sxE0().fi=f.penAt.length>=f.pens?{k:'putts'}:{k:'penat'};sxRedraw()},
 sxLie:d=>{const e=sxE0(),f=sxF(),r=sxRows(f)[e.fi.i];r.lie=d.n;if(!'RSX'.includes(d.n))r.side=null;e.fi={k:'dist',i:e.fi.i};sxRedraw()},
 sxSide:d=>{const e=sxE0(),r=sxRows(sxF())[e.fi.i];r.side=r.side===d.n?null:d.n;sxRedraw()},
 sxSame:()=>{const e=sxE0(),f=sxF(),i=e.fi.i,pv=sxRows(f)[i-1];Object.assign(f.rows[i-1],{lie:pv.lie,d:pv.d,side:pv.side||null});e.fi=sxNext(f,{k:'dist',i});sxRedraw()},
 sxPick:d=>{sxE0().buf=d.n;ACT.sxKey({n:'ok'})},
 sxKey:d=>{const e=sxE0(),f=sxF(),fi=e.fi;if(!f||fi.i==null)return;const r=sxRows(f)[fi.i],k=d.n;
  if(/^\d$/.test(k)){if(e.buf.length<3)e.buf=(e.buf==='0'?'':e.buf)+k;return sxRedraw()}
  if(k==='del'){e.buf=e.buf.slice(0,-1);return sxRedraw()}
  const v=parseInt(e.buf,10);if(!(v>0)){if(r.d>0){e.fi=sxNext(f,fi);return sxRedraw()}return toast(sxType(f,fi.i)==='putt'?'Tap or type the feet':'Tap or type the yards')}
  if(fi.i===0)f.tee=v;else r.d=v;e.buf='';e.fi=sxNext(f,fi);sxRedraw()},
 sxHole:d=>{const n=+d.n;if(n>=0&&n<sxE0().c.p.length)sxSetHole(n)},
 sxNextHole:()=>{const e=sxE0();if(e.h<e.c.p.length-1)sxSetHole(e.h+1);else sxSave()},
 sxFinish:()=>{const e=sxE0(),n=e.holes.filter(x=>sxHoled(x.f)).length;if(n===e.c.p.length)return sxSave();openSheet(()=>`<h2>Finish the round?</h2><p class="muted">${n?`${n} of ${e.c.p.length} holes are complete. Only complete holes count.`:'No holes are complete yet.'}</p>${n?'<button class="btn full" data-a="sxSaveGo">Save round</button>':''}<button class="btn sec2 full" data-a="closeS">Keep going</button>`)},
 sxSaveGo:()=>{closeSheet(true);sxSave()},
 sxCard:()=>{const e=sxE0(),c=e.c;openSheet(()=>`<h2>Your card</h2><div class="sx-card">${c.p.map((p,i)=>{const f=e.holes[i].f,s=sxHoled(f)?f.score:null,d=s!=null?s-p:null;return `<button data-a="sxGoH" data-n="${i}" class="${i===e.h?'cur':''} ${d!=null&&d<0?'bd':d!=null&&d>1?'db':''}"><small>${i+1}</small><b class="num">${s!=null?s:'·'}</b><small>par ${p}</small></button>`}).join('')}</div>`)},
 sxGoH:d=>{closeSheet(true);sxSetHole(+d.n)},
 sxMic:()=>{const e=sxE0(),c=e.c,k=e.h,pos=sxSimHole(sxRng(900+k+uid),c.y[k],c.p[k],{dr:205,gk:.9,pk:7}),score=pos.length+pos.reduce((a,p)=>a+(p.pen||0),0),putts=pos.filter(p=>p.lie==='G').length,pens=pos.reduce((a,p)=>a+(p.pen||0),0);
  e.holes[k].f={score,putts,pens,penAt:pos.map((p,i)=>p.pen?i:-1).filter(i=>i>=0),tee:c.y[k],rows:pos.slice(1).map(p=>({lie:null,d:null,side:null})),ok:true};e.fi={k:'lie',i:1};
  toast(`Heard: “${SCN(score-c.p[k]).toLowerCase()}, ${sxWord(putts)} putt${putts===1?'':'s'}…”`);sxRedraw();let i=1;const f=e.holes[k].f;
  const step=()=>{if(i>=pos.length||S.se!==e){if(S.se===e){e.fi={k:'done'};sxRedraw()}return}const p=pos[i];f.rows[i-1]={lie:p.lie,d:p.d,side:p.side||null};e.fi=sxNext(f,{k:'dist',i});sxRedraw();i++;setTimeout(step,520)};setTimeout(step,600)}
});

/* add a round: shot by shot (strokes gained) or score only */
ACT.addRound=()=>{if(S.arMode==null)S.arMode='sbs';openSheet(()=>`<h2>Add a round</h2><div class="seg">${[['sbs','Shot by shot'],['card','Score only']].map(([k,l])=>`<button data-a="arMode" data-id="${k}" aria-pressed="${S.arMode===k}">${l}</button>`).join('')}</div><span class="small muted">${S.arMode==='sbs'?'About 3 minutes after you play. Exact strokes gained for every shot.':'Score and putts for each hole. Strokes gained is estimated.'}</span><div class="list">${COURSES.map((c,i)=>`<button class="row" data-a="arGo" data-n="${i}"><span class="tile">${ic('flag')}</span><span class="m"><span class="t" style="display:block">${esc(c.n)}</span><span class="small muted">Par ${c.p.reduce((a,b)=>a+b,0)} · ${c.y.reduce((a,b)=>a+b,0).toLocaleString('en-IN')} yd</span></span>${ic('chev','class="chev"')}</button>`).join('')}<button class="row" data-a="sxAddCourse"><span class="tile o">${ic('plus')}</span><span class="m"><span class="t" style="display:block">Can't find your course?</span><span class="small muted">Add it from a photo of the scorecard</span></span>${ic('chev','class="chev"')}</button></div>`)};
ACT.arMode=d=>{S.arMode=d.id;refreshSheet()};
const _arGo=ACT.arGo;ACT.arGo=d=>{if(S.arMode==='card')return _arGo(d);closeSheet();sxStart(COURSES[+d.n])};
ACT.sxAddCourse=()=>{openSheet(()=>`<h2>Add a course</h2><p class="muted">Take a photo of the scorecard. We read par, stroke index and yardages. You can play it straight away, and our team checks it within two days.</p><div><label class="l" for="sxcn">Course name</label><input class="fld" id="sxcn" value="Noida Golf Course"></div><button class="btn full" data-a="sxScan">Use the sample scorecard</button><span class="small muted">In the prototype the photo step is simulated.</span>`)};
ACT.sxScan=()=>{const n=($('#sxcn')&&$('#sxcn').value.trim())||'New course',p=[4,4,3,5,4,3,4,5,4,4,3,4,5,4,4,3,4,5],c={n,p,y:p.map((x,i)=>x===3?155+(i*13)%35:x===4?350+(i*41)%70:500+(i*17)%45),si:[9,3,15,1,7,17,11,5,13,10,16,4,2,8,6,18,12,14]};COURSES.push(c);closeSheet(true);toast('Scorecard read: 18 holes');sxStart(c)};

/* rounds list: show which rounds are shot by shot, and resume an unfinished one */
const _roundRow=roundRow;roundRow=function(r){const h=_roundRow(r);return isSbs(r)?h.replace('</span></span>',' · Shot by shot</span></span>'):h};
const _vprog=V.progress;V.progress=()=>{let h=_vprog();const w=S.who,R=(S.rds[w]||[]).filter(isSbs).slice(-10),seg=S.seg.perf||'over';
 if(seg==='rounds'&&S.se&&!nv().stack.length)h=h.replace('<button class="btn full" data-a="addRound">',`<button class="card press" data-a="sxResume" style="display:flex;justify-content:space-between;align-items:center"><span><b style="display:block">Finish your round</b><span class="small muted">${esc(S.se.c.n)}, hole ${S.se.h+1} · shot by shot</span></span>${ic('chev','width="18" height="18"')}</button><button class="btn full" data-a="addRound">`);
 if(seg==='over'&&R.length)h=h.replace('<div class="card"><div class="sec-h" style="margin-bottom:8px"><span class="b">Strokes gained</span>',sxByHcp(R,w)+'<div class="card"><div class="sec-h" style="margin-bottom:8px"><span class="b">Strokes gained</span>').replace('<div class="card" style="padding:12px"><div class="b small" style="margin:2px 4px 6px">Score trend</div>',sxFindings(R,w)+'<div class="card" style="padding:12px"><div class="b small" style="margin:2px 4px 6px">Score trend</div>');
 return h};
ACT.sxResume=()=>go('se');

/* your game, by handicap */
function sxAll(R,bk){const h0=sxH(bk),per=R.map(r=>sxRound(r,h0)),shots=[];per.forEach((p,ri)=>p.shots.forEach(s=>shots.push({...s,ri})));return {per,shots,n:R.length}}
function sxByHcp(R,w){const an=sxAll(R,'10'),eq=CATS.map(c=>[c,sxEquiv(an.shots,c[0])]).sort((a,b)=>a[1]-b[1]),ov=sxEquiv(an.shots,null),pos=h=>Math.max(0,Math.min(100,(h+5)/35*100));
 return `<div class="card"><div class="sec-h" style="margin-bottom:2px"><span class="b">Your game, by handicap</span><span class="small muted">${R.length} shot-by-shot round${R.length>1?'s':''}</span></div><p class="small muted" style="margin:0 0 14px">Each part of your game, rated as the handicap it matches.</p><div class="sx-scale">${eq.map(([c,v])=>`<div class="sx-sr"><span class="small">${c[1]}</span><span class="sx-trk"><b class="num" style="left:${pos(v)}%;background:${v<=ov-1?'var(--fair)':v>=ov+1?'var(--bad)':'var(--ink3)'}">${sxHc(v)}</b></span></div>`).join('')}<div class="sx-ix" style="left:calc(92px + (100% - 92px) * ${pos(ov)/100})"><span>You ${sxHc(ov)}</span></div><div class="sx-sr tk"><span></span><span class="sx-trk">${[-5,0,10,20,30].map(t=>`<i style="left:${pos(t)}%">${t<0?'+5':t}</i>`).join('')}</span></div></div></div>`}
function sxFindings(R,w){const bk=S.base||baseFor(w),an=sxAll(R,bk),n=an.n,sh=an.shots,out=[];
 const pens=sh.filter(s=>s.pen);if(pens.length){const c=pens.reduce((a,s)=>a+s.sg,0)/n;out.push([c,`Penalties cost ${Math.abs(c).toFixed(1)} a round`,`${(pens.length/n).toFixed(1)} penalty shots a round, most of them ${pens.filter(s=>s.cat==='ott').length>=pens.length/2?'off the tee':'on approaches'}.`])}
 const om=sh.filter(s=>s.cat==='ott'&&s.next&&s.next.side);if(om.length>=6){const Rr=om.filter(s=>s.next.side==='R'),Ll=om.filter(s=>s.next.side==='L'),dom=Rr.length>=Ll.length?Rr:Ll,c=dom.reduce((a,s)=>a+s.sg,0)/n;out.push([c,`${Math.round(dom.length/om.length*100)}% of missed fairways go ${dom===Rr?'right':'left'}`,`They cost ${Math.abs(c).toFixed(1)} a round. A one-sided miss is something a coach can fix.`])}
 const holes=[];an.per.forEach(p=>p.holes.forEach(h=>holes.push(h)));const bl=holes.filter(h=>h.s-h.p>=2),lost=holes.filter(h=>h.sg<0).reduce((a,h)=>a+h.sg,0),lb=bl.reduce((a,h)=>a+h.sg,0);if(bl.length&&lost<0)out.push([lb/n,`${Math.round(lb/lost*100)}% of lost strokes come on big numbers`,`${(bl.length/n).toFixed(1)} double bogeys or worse a round.`]);
 let three=0;R.forEach(r=>r.holes.forEach(h=>{if(h.pt>=3)three++}));out.push([-three/n*.8,`${(three/n).toFixed(1)} three-putts a round`,three/n<1?'Lag putting is a strength.':'They mostly start from 30 feet and beyond.']);
 out.sort((a,b)=>a[0]-b[0]);return `<div class="sec-h" style="margin-top:4px"><h2>What else we found</h2></div><div class="list">${out.slice(0,4).map(([v,t,s])=>`<div class="row" style="align-items:flex-start"><span class="tile ${v<-.3?'o':''}">${ic(v<-.3?'target':'check')}</span><span class="m"><span class="t" style="display:block">${t}</span><span class="small muted">${s}</span></span></div>`).join('')}</div>`}

/* strokes gained page: one level deeper for shot-by-shot rounds */
const _vsg=V.sg;V.sg=p=>{let h=_vsg(p);const w=viewW(),R=(S.rds[w]||[]).filter(isSbs).slice(-6);if(!R.length)return h;
 const bk=S.base||baseFor(w),g=sgAvg(w,bk),k=p.id||leak(g)[0][0],an=sxAll(R,bk),list=an.shots.filter(s=>s.cat===k),n=an.n;
 let rows;if(BAND[k])rows=BAND[k].map(([a,b,l])=>{const ss=list.filter(s=>s.d>a&&s.d<=b);return [l,ss]});else if(k==='arg')rows=[['F','From fairway'],['R','From rough'],['S','From sand']].map(([L,l])=>[l,list.filter(s=>s.lie===L)]);else rows=[['F','Found fairway'],['R','Rough'],['S','Fairway bunker'],['X','Trees'],['P','Penalty']].map(([L,l])=>[l,list.filter(s=>L==='P'?s.pen:!s.pen&&s.next&&s.next.lie===L)]);
 rows=rows.filter(x=>x[1].length);const M=Math.max(.5,...rows.map(([l,ss])=>Math.abs(ss.reduce((a,s)=>a+s.sg,0)/n)));
 const extra=k==='putt'?`<div class="card" style="padding:4px 16px"><div class="sx-tbl"><b>Length</b><b>Holed</b><b>You</b><b>${BASE[bk].n.replace(' handicap',' hcp')}</b>${BAND.putt.map(([a,b,l])=>{const ss=list.filter(s=>s.d>a&&s.d<=b);if(!ss.length)return '';const m=ss.filter(s=>!s.next).length,kk=bk==='tour'?8:8-.07*(+bk+6),ex=ss.reduce((x,s)=>x+1/(1+Math.pow(s.d/kk,2.6)),0);return `<span>${l}</span><span class="num">${m}/${ss.length}</span><span class="num">${Math.round(m/ss.length*100)}%</span><span class="num">${Math.round(ex/ss.length*100)}%</span>`}).join('')}</div></div>`
  :k==='app'?`<div class="card" style="padding:4px 16px"><div class="sx-tbl"><b>From</b><b>Shots</b><b>Green hit</b><b>Avg leave</b>${BAND.app.map(([a,b,l])=>{const ss=list.filter(s=>s.d>a&&s.d<=b);if(!ss.length)return '';const gg=ss.filter(s=>s.next&&s.next.lie==='G');return `<span>${l}</span><span class="num">${ss.length}</span><span class="num">${Math.round(gg.length/ss.length*100)}%</span><span class="num">${gg.length?Math.round(gg.reduce((x,s)=>x+s.next.d,0)/gg.length)+' ft':'–'}</span>`}).join('')}</div></div>`
  :k==='ott'?`<span class="small muted">Average drive ${Math.round(list.filter(s=>s.next&&!s.pen).reduce((a,s)=>a+s.d-s.next.d,0)/Math.max(1,list.filter(s=>s.next&&!s.pen).length))} yd, measured to where the next shot started.</span>`:'';
 const worst=list.slice().sort((a,b)=>a.sg-b.sg).slice(0,3);
 const sec=`<div class="sec"><div class="sec-h"><h2>Where it comes from</h2><span class="small muted">per round</span></div><div class="card"><div class="sgb">${rows.map(([l,ss])=>{const v=ss.reduce((a,s)=>a+s.sg,0)/n,wd=Math.abs(v)/M*50;return `<div class="sgr"><span class="small">${l}<br><span class="tiny muted">${ss.length} shots</span></span><span class="tr"><i class="${v>=0?'p':'n'}" style="width:${wd}%;${v>=0?'left:50%':'right:50%'}"></i><u></u></span><b class="num ${v>=0?'gp':'gn'}">${sg1(v)}</b></div>`}).join('')}</div></div>${extra}</div>
  <div class="sec"><div class="sec-h"><h2>Costliest shots</h2></div><div class="list">${worst.map(s=>{const d=sxDesc(s,R[s.ri]);return `<button class="row" data-a="go" data-v="round" data-id="${R[s.ri].id}"><span class="m"><span class="t" style="display:block">${d[0]}</span><span class="small muted">${d[1]} · ${dLong(R[s.ri].d)}</span></span><b class="num gn">${sx2(s.sg)}</b></button>`}).join('')}</div></div>`;
 return h.replace('<div class="sec"><div class="sec-h"><h2>Work on it</h2>',sec+'<div class="sec"><div class="sec-h"><h2>Work on it</h2>').replace('Estimated from scorecards. Shot-by-shot tracking would make this exact.',`Exact for your ${R.length} shot-by-shot round${R.length>1?'s':''}; estimated for scorecard-only rounds.`)};
function sxDesc(s,r){const h=r.holes[s.hole],from=s.lie==='T'?`Tee shot, par ${h.p}`:s.lie==='G'?`Putt from ${s.d} ft`:`${LIEN[s.lie]}, ${s.d} yd`;
 if(s.pen&&s.next&&s.next.lie===s.lie&&s.next.d===s.d)return [`${from} → penalty, replayed`,`Hole ${s.hole+1} · stroke and distance`];
 const to=!s.next?'holed':s.lie==='G'?`missed, ${s.next.d} ft left`:s.next.lie==='G'?`green, ${s.next.d} ft`:`${lieWord(s.next)} ${s.next.d} yd`;return [`${from} → ${to}`,`Hole ${s.hole+1} · ${CATS.find(c=>c[0]===s.cat)[1]}${s.pen?' · penalty':''}`]}

/* round report for shot-by-shot rounds */
const _vround=V.round;V.round=p=>{const {r,w}=findR(p.id);if(!isSbs(r))return _vround(p);const s=rstat(r),dd=s.score-s.par,bk=S.base||baseFor(w),h0=sxH(bk),res=sxRound(r,h0),C=CATS.map(c=>[c,res.cats[c[0]]]).sort((a,b)=>a[1]-b[1]),wo=C[0],be=C[3];
 let line='';if(wo[1]<-.3){let tail='';if(BAND[wo[0][0]]){const bs=BAND[wo[0][0]].map(([a,b,l])=>[l,res.shots.filter(x=>x.cat===wo[0][0]&&x.d>a&&x.d<=b).reduce((t,x)=>t+x.sg,0)]).sort((a,b)=>a[1]-b[1])[0];if(bs[1]<-.3)tail=Math.abs(bs[1])<=Math.abs(wo[1])?`, ${Math.abs(bs[1]).toFixed(1)} of them ${wo[0][0]==='app'?'from':'on putts of'} ${bs[0].toLowerCase()}`:`. The leak is ${bs[0].toLowerCase()} (${sg1(bs[1])})`}line=`${wo[0][1]} cost you ${Math.abs(wo[1]).toFixed(1)} strokes${tail}.`}
 if(be[1]>.3)line+=` ${be[0][1]} saved you ${be[1].toFixed(1)}.`;if(!line)line='An even round: no part of your game cost or saved more than a third of a stroke.';
 const sorted=res.shots.slice().sort((a,b)=>a.sg-b.sg),pick=sorted.slice(0,3).concat(sorted.slice(-2).reverse()),mh=Math.max(1,...res.holes.map(h=>Math.abs(h.sg)));
 return nb('Round')+`<div class="scroll"><div class="pad stack"><div><span class="eyebrow">${dLong(r.d)} · Shot by shot</span><div class="disp" style="font-size:40px;margin-top:4px">${esc(r.course)}</div></div>
 <div class="hero" style="gap:6px"><span class="eyebrow">Strokes gained vs ${BASE[bk].n.toLowerCase()}</span><span class="disp big num">${sg1(res.total)}</span><span class="sub">${line}</span><span class="small" style="opacity:.75">${s.score} · ${dd===0?'level par':Math.abs(dd)+(dd>0?' over':' under')} · ${res.shots.length} shots</span></div>
 <div class="seg">${Object.entries(BASE).map(([b,o])=>`<button data-a="baseS" data-id="${b}" aria-pressed="${bk===b}">${o.n.replace(' handicap','')}</button>`).join('')}</div><div class="card">${sgBars(res.cats)}</div></div>
 <div class="sec"><div class="sec-h"><h2>Shots that decided it</h2></div><div class="list">${pick.map(x=>{const d=sxDesc(x,r);return `<div class="row"><span class="m"><span class="t" style="display:block">${d[0]}</span><span class="small muted">${d[1]}</span></span><b class="num ${sxCls(x.sg)}">${sx2(x.sg)}</b></div>`}).join('')}</div></div>
 <div class="sec"><div class="sec-h"><h2>Hole by hole</h2><span class="small muted">strokes gained</span></div><div class="card"><div class="sx-hb" style="grid-template-columns:repeat(${res.holes.length},1fr)">${res.holes.map(h=>`<span><i class="p" style="height:${h.sg>0?h.sg/mh*50:0}%"></i><i class="n" style="height:${h.sg<0?-h.sg/mh*50:0}%"></i></span>`).join('')}</div><div class="sx-hn" style="grid-template-columns:repeat(${res.holes.length},1fr)">${res.holes.map((h,i)=>`<span>${i+1}</span>`).join('')}</div></div></div>
 <div class="sec"><div class="sec-h"><h2>You played like a…</h2></div><div class="score" style="grid-template-columns:repeat(4,1fr)">${CATS.map(c=>`<div><b class="num">${sxHc(sxEquiv(res.shots,c[0]))}</b><span>${c[1]}</span></div>`).join('')}</div><span class="small muted">One round is noisy. Your Overview uses your last 10.</span></div>
 <div class="sec">${scorecard(r)}</div>
 ${S.role==='golfer'?`<div class="sec"><div style="display:flex;gap:8px"><button class="btn sec2 sm grow" data-a="sxEditR" data-id="${r.id}">Edit shots</button><button class="btn sec2 sm grow" data-a="rDel" data-id="${r.id}">Delete</button></div></div>`:''}<div class="bottom-gap"></div></div>`};
ACT.sxEditR=d=>{const {r}=findR(d.id),c=COURSES.find(x=>x.n===r.course)||COURSES[0];sxStart(c,r)};

/* sample data: Rohan (has a coach) logs shot by shot */
function sxSeed(){const P={dr:205,gk:1,mi:.75,pk:5.4};S.rds.rohan=[[0,-40],[2,-30],[0,-21],[1,-12],[0,-4]].map(([c,d],i)=>sxSimRound(300+i,COURSES[c],P,d));syncR('rohan');S.se=null;S.arMode='sbs';S.units='y'}
const _seed11=seed;seed=function(){_seed11();sxSeed()};
sxSeed();
