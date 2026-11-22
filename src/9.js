/* ---------- pass 9: Range bays · Hamoni Golf Camp ----------
   Opens from the Range bays tile (home) and the Range bays switch (Book).
   Prices: hamonigolf.com pricing + Coaching Programme Jan-26, before 18% GST.
   Bay counts, numbers and availability are sample data. */
Object.assign(P,{
 phone:'M5 3h4l2 5-2.5 1.5a11 11 0 005 5L15 12l5 2v4a2 2 0 01-2 2A16 16 0 013 5a2 2 0 012-2z',
 ball:'M12 21a9 9 0 100-18 9 9 0 000 18zM9 9h.01M12 7.5h.01M15 9h.01M10.5 12h.01M13.5 12h.01M12 15h.01',
 coffee:'M4 8h13v5a6 6 0 01-6 6H10a6 6 0 01-6-6zM17 9h1.5a2.5 2.5 0 010 5H17M8 2v3M12 2v3',
 tool:'M14.7 6.3a4 4 0 00-5.4 5.2L3 17.8V21h3.2l6.3-6.3a4 4 0 005.2-5.4l-2.5 2.5-2.3-.6-.6-2.3z',
 drop:'M12 3s6 6.5 6 11a6 6 0 01-12 0c0-4.5 6-11 6-11z',
 light:'M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9V16h7v-2.1A6 6 0 0012 3z',
 bag:'M6 7h12l1 14H5zM9 7a3 3 0 016 0',
 club:'M7 21L15 3M15 3l3 1M5 21h5',
 grass:'M3 20h18M6 20c0-4 1-7 3-9M10 20c0-5 1-9 3-12M14 20c0-3 1-6 3-8M18 20c0-2 .5-4 2-5',
 arrow:'M5 12h14m-6-6l6 6-6 6'
});
const HM={photo:'assets/hamoni.jpg',logo:'assets/hamoni-logo.jpg',addr:'CK Farm, Carterpuri, Sector 23A, Gurugram',near:'Near Palam Vihar, opposite Maruti Udyog',phone:'+91 96431 51511'};
const HMC=[{id:'amit',n:'Amit Rawal',i:'AR',lv:'NGAI C-level coach',a:2000,j:1600},{id:'hemendra',n:'Hemendra Choudhary',i:'HC',lv:'Class C coach',a:2100,j:1800},{id:'rahul',n:'Rahul Singh Pathania',i:'RP',lv:'Class C coach',a:2300,j:1800},{id:'astha',n:'Astha Madan',i:'AM',lv:'Pursuing PGA certification',a:3000,j:1800},{id:'manish',n:'Manish Goyal',i:'MG',lv:'TPI Level 1 · Foresight GC',a:3000}];
const HMP=[{id:'1m',n:'1 Month',days:30,p:12000},{id:'3m',n:'3 Months',days:90,p:24000},{id:'6m',n:'6 Months',days:180,p:50000,ace:true},{id:'1y',n:'1 Year',days:365,p:80000,ace:true}];
const HME={card:{n:'HGC card or app',s:'Entry ₹500 + ball bags ₹150',p:500},day:{n:'Day Pass',s:'All-day access · unlimited balls, grass bays, Ace Pen',p:1000},pass:{n:'HGC Master Pass',s:'Entry and balls included',p:0}};
const hmGst=n=>Math.round(n*.18);
const hmClosed=d=>dayD(d).getDay()===1;
const hmDur=m=>m===60?'1 hr':m===90?'1 hr 30':'2 hr';
const hmTimes=()=>{const o=[];for(let t=360;t<=1260;t+=30)o.push(t);return o};
const hmPart=t=>t<720?'am':t<1020?'pm':'eve';
function hmLeft(d,t,bay){const cap=bay==='grass'?3:7,wk=[0,6].includes(dayD(d).getDay()),load=(t>=1020&&t<=1170?.5:t<=480?.32:.14)+(wk?.15:0);
 const occ=Math.min(cap,Math.floor(cap*(load+(hashN('hm'+bay+d+':'+t)%100)/100*.55)));
 const mine=S.hm.bks.filter(b=>b.status!=='cancelled'&&b.d===d&&b.bay===bay&&t<b.t+b.dur&&b.t<t+30).length;return Math.max(0,cap-occ-mine)}
const hmOpen=(d,t,bay)=>!hmClosed(d)&&!(d===0&&t<=NOW+20)&&t+30<=1320&&hmLeft(d,t,bay)>0;
function hmFirst(bay,from=0,pref=1080){for(let d=from;d<14;d++){if(hmClosed(d))continue;if(hmOpen(d,pref,bay))return [d,pref];const t=hmTimes().find(x=>x>=pref&&hmOpen(d,x,bay))||hmTimes().find(x=>hmOpen(d,x,bay));if(t)return [d,t]}return [1,1080]}
const hmPassOn=()=>!!(S.hm.pass&&S.hm.pass.left>0);
function hmDraft(o={}){const entry=o.entry||(hmPassOn()?'pass':'card'),bay=o.bay||'mat';let d=o.d,t=o.t;if(d==null||t==null){[d,t]=hmFirst(bay,1)}
 const o2={entry,d,t,dur:60,bay,bags:entry==='card'?3:0,clubs:0,coach:null,fs:false,pay:'gpay',part:hmPart(t)};if(entry==='day')Object.assign(o2,{t:360,dur:960,bay:'any'});return o2}
const hmIsDay=b=>b.entry==='day';
const hmAvail=b=>hmIsDay(b)?!hmClosed(b.d)&&!(b.d===0&&NOW>=1260):b.t!=null&&hmOpen(b.d,b.t,b.bay);
const hmBayLbl=b=>hmIsDay(b)?'Any bay · mat or grass':`${b.bay==='grass'?'Grass':'Mat'} bay${b.bayNo?' '+b.bayNo:''}`;
function hmInit(){return {bks:[],pass:null,b:null,paying:null,mp:'3m',seq:4821,mpSeq:311,saved:false}}
if(typeof S==='object'&&S&&!S.hm)S.hm=hmInit();
const _seed9=seed;seed=function(){_seed9();S.hm=hmInit()};

function hmQuote(b){const L=[],lesson=b.coach&&HMC.find(c=>c.id===b.coach),e=b.entry;
 if(e==='pass')L.push(['Entry · Master Pass',0]);else if(lesson&&e==='card')L.push(['Entry · with your lesson',0]);else L.push([e==='day'?'Day Pass · all day':'Entry · HGC card',HME[e].p]);
 if(e==='card'){const free=lesson?Math.min(b.bags,2):0;if(b.bags)L.push([`Ball bags · ${b.bags} × ₹150${free?` (${free} with lesson)`:''}`,(b.bags-free)*150])}else L.push(['Balls',0,'Unlimited']);
 if(!hmIsDay(b))L.push([`${b.bay==='grass'?'Grass':'Mat'} bay · from ${fT(b.t)}`,0]);
 if(b.clubs)L.push([`Club rental · ${b.clubs} club${b.clubs>1?'s':''}`,lesson?0:b.clubs*200]);
 if(lesson)L.push([`Lesson · ${lesson.n} · 45 min`,lesson.a]);
 if(b.fs)L.push(['FlightScope session · 30 min',1500]);
 const sub=L.reduce((a,x)=>a+x[1],0),g=hmGst(sub);return {L,sub,gst:g,tot:sub+g}}

/* ---------- small parts ---------- */
const hi=(n,s=20,x='')=>ic(n,`width="${s}" height="${s}" ${x}`);
const hmLogo=(s=40)=>`<img class="logo2" src="${HM.logo}" alt="Hamoni Golf" style="width:${s}px;height:${s}px;border-radius:${Math.round(s*.26)}px">`;
const hmStar='<svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" fill="currentColor"/></svg>';
const hmDots=n=>`<div class="dots" aria-label="Step ${n+1} of 3">${[0,1,2].map(i=>`<i class="${i===n?'on':i<n?'dn':''}"></i>`).join('')}</div>`;
const hmHead=(title,sub,right)=>`<div class="hdr2"><div class="r" style="justify-content:space-between"><button class="ibt" data-a="back" aria-label="Back">${hi('back')}</button>${right||''}</div><div><h1 class="hd" style="font-size:30px">${title}</h1>${sub?`<p class="mut" style="margin:4px 0 0;font-size:14px">${sub}</p>`:''}</div></div>`;
const hmFoot=(l1,l2,btn)=>`<div class="ft">${l1!=null?`<div class="p"><span class="mut" style="font-size:12px">${l1}</span><b>${l2}</b></div>`:''}${btn}</div>`;
const hmArrow=hi('arrow',16,'stroke-width="2.2"');
const hmMoney=n=>n?money(n):'Included';
const hmWhen=b=>hmIsDay(b)?`${dLbl(b.d)} · All day`:`${dLbl(b.d)} · ${fT(b.t)}`;
const hmBk=id=>S.hm.bks.find(b=>b.id===id);
const hmNext=()=>S.hm.bks.filter(b=>b.status==='confirmed'&&(b.d>0||(b.d===0&&b.t+b.dur>NOW))).sort((a,b)=>a.d-b.d||a.t-b.t)[0];
function hmArt(seed){const r=rngLite(seed),d=[];for(let y=18;y<190;y+=16)for(let x=14;x<370;x+=18)d.push(`<circle cx="${x}" cy="${y}" r="1.4" fill="rgba(255,255,255,.12)"/>`);
 const g=[[80,90],[200,60],[300,110],[160,130]].map(([x,y])=>`<ellipse cx="${x+r(-12,12)}" cy="${y}" rx="40" ry="13" fill="#2E6B4F"/><line x1="${x+4}" y1="${y}" x2="${x+4}" y2="${y-24}" stroke="#fff" stroke-width="2"/><path d="M${x+4} ${y-24}l16 5-16 5z" fill="#FF6E00"/>`).join('');
 const bays=Array.from({length:7},(_,i)=>`<rect x="${20+i*48}" y="236" width="40" height="30" rx="4" fill="${i===2?'#FF6E00':'#0A2E22'}"/>`).join('');
 return `<svg class="art" viewBox="0 0 370 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="370" height="300" fill="#0E3B2C"/>${d.join('')}${g}<rect y="226" width="370" height="74" fill="#0A2E22" opacity=".55"/>${bays}</svg>`}
function hmSlot(d,t,bay,dark){const left=hmLeft(d,t,bay);return `<button class="slot ${dark?'dkr':''}" data-a="hmBook" data-d="${d}" data-t="${t}" data-bay="${bay}"><span class="dot" style="${dark?'background:rgba(255,255,255,.7)':''}"></span><span class="m"><b>${dLbl(d)} · ${fT(t)}</b><span>${bay==='grass'?'Grass bay':'Mat bay'} · ${left} free</span></span>${hi('chev',18)}</button>`}
function hmQuick(n=3){const o=[];for(let d=0;d<7&&o.length<n;d++){if(hmClosed(d))continue;for(const t of [960,1050,1080,1140,420,480]){if(o.length>=n)break;if(hmOpen(d,t,'mat')&&!o.some(x=>x[0]===d&&Math.abs(x[1]-t)<60))o.push([d,t])}}return o.sort((a,b)=>a[0]-b[0]||a[1]-b[1])}
const hmOpenNow=()=>!hmClosed(0)&&NOW>=360&&NOW<1320;

/* ---------- 2 · Book a range ---------- */
function hmVC(o){return `<div class="vc" style="height:${o.h}px;${o.go?'cursor:pointer':''}" ${o.go?`data-a="${o.go}" role="button" tabindex="0" aria-label="${o.n}"`:''}>
 ${o.img?`<img src="${o.img}" alt="">`:hmArt(o.n)}<div class="scr"></div>
 <div class="tp">${o.feat?`<span class="pl" style="background:#FF6E00;color:#17120E">${hmStar} Featured</span>`:'<span></span>'}<button class="ibt" data-a="hmSave" data-id="${o.id}" aria-label="Save ${o.n}" aria-pressed="${!!(o.id==='hamoni'&&S.hm.saved)}" style="color:${o.id==='hamoni'&&S.hm.saved?'#FF6E00':'#17120E'}">${ic('heart',`width="20" height="20" ${o.id==='hamoni'&&S.hm.saved?'fill="currentColor"':''}`)}</button></div>
 <div class="bd"><div class="r" style="gap:8px">${o.rate?`<span class="pl" style="background:rgba(255,255,255,.2);color:#fff">${hmStar} ${o.rate}</span>`:''}${o.tags.map(t=>`<span class="pl" style="background:#EFEBE4;color:#3E3A35;border-radius:8px">${t}</span>`).join('')}</div>
 <h3>${o.n}</h3><p class="lc">${hi('pin',16)}${o.loc}</p>
 <div class="fb"><div style="display:flex;flex-direction:column"><span style="font-size:12px;color:#ddd">From</span><span style="display:flex;align-items:baseline;gap:5px"><b style="font-size:22px;font-weight:800">${o.price}</b><small style="font-size:12px;color:#ddd">${o.unit}</small></span></div>
 ${o.live?`<button class="btn" data-a="hmBook">Book a bay ${hmArrow}</button>`:`<button class="btn off" data-a="hmWait" data-id="${o.id}">${S.notify.has('hm-'+o.id)?'On the list':'Join waitlist'}</button>`}</div></div></div>`}
V.hmRanges=()=>{const nx=hmNext();return `<div class="hm hmw">${hmHead('Book a range','Reserve a practice bay')}
 <div class="scroll"><div class="pd" style="display:flex;flex-direction:column;gap:14px;padding-top:6px;padding-bottom:30px">
 <div class="r" style="gap:8px;overflow-x:auto;scrollbar-width:none"><button class="ch" data-a="soon" data-id="tee">${hi('flag',16)}Tee time</button><button class="ch" aria-pressed="true">${hi('target',16)}Range bay</button><button class="ch" data-a="hmSavedF" aria-pressed="${!!S.hm.onlySaved}">${hi('heart',16)}Saved</button></div>
 <div class="r" style="gap:8px"><button class="ch" style="flex:1;justify-content:flex-start" data-a="locS">${hi('pin',17)}Gurugram · 25 km</button><button class="ibt" data-a="hmFilt" aria-label="Filters">${hi('filter')}</button></div>
 ${nx?`<button class="hl" data-a="go" data-v="hmPass" data-id="${nx.id}"><span class="eb" style="color:rgba(255,255,255,.8)">Your next bay</span><span class="r" style="gap:10px">${hi('cal',20)}<b style="font-size:17px">${hmWhen(nx)}</b></span><span style="font-size:14px;color:rgba(255,255,255,.85)">${hmBayLbl(nx)} · Hamoni Golf Camp</span></button>`:''}
 ${S.hm.onlySaved&&!S.hm.saved?`<div class="card" style="padding:26px;text-align:center"><b>No saved ranges yet</b><p class="mut" style="margin:6px 0 0;font-size:14px">Tap the heart on a range to keep it here.</p></div>`:`
 <p class="eb" style="padding-left:4px">Bookable now on Fore!</p>
 ${hmVC({id:'hamoni',n:'Hamoni Golf Camp',loc:'Sector 23A, Gurugram',tags:['Floodlit','Grass bays'],price:'₹500',unit:'/ person + GST',rate:'4.8 (228)',feat:true,img:HM.photo,go:'hmVenue',live:true,h:400})}
 ${S.hm.onlySaved?'':`<p class="eb" style="padding-left:4px;margin-top:6px">Coming to Fore! soon</p>
 ${hmVC({id:'dgc',n:'Delhi Golf Club Range',loc:'Lodhi Road, New Delhi',tags:['Practice facility'],price:'₹900',unit:'/ entry',rate:'4.6 (184)',h:300})}
 ${hmVC({id:'dwarka',n:'DDA Dwarka Range',loc:'Sector 24, Dwarka',tags:['Practice facility'],price:'₹150',unit:'/ entry',h:300})}`}`}
 </div></div></div>`};

/* ---------- 3 · Hamoni venue ---------- */
V.hmVenue=()=>{const q=hmQuick(3),open=hmOpenNow();
 const rates=[['Entry fee','Per person, with your HGC card or the Hamoni app','₹500'],['Day Pass','Unlimited balls, grass bays and the Ace Pen. For top-5 amateurs, IGU-ranked juniors and current PGTI, WGAI and IGPL pros','₹1,000'],['Ball bag','50 Srixon balls','₹150'],['Club rental','Per club','₹200']];
 const am=[['coffee','Hamoni Café'],['bag','Pro shop'],['tool','Club repair centre'],['drop','Showers'],['target','FlightScope · ₹1,500 / 30 min'],['flag','Pitch & Putt · private events'],['light','Floodlit till 10 PM'],['users','Golf academy']];
 return `<div class="hm hmw"><div class="scroll">
 <section style="position:relative;height:330px"><img src="${HM.photo}" alt="The putting green and clubhouse at Hamoni Golf Camp" style="width:100%;height:330px;object-fit:cover;object-position:center 65%;display:block">
  <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.35) 0%,rgba(0,0,0,0) 35%,rgba(0,0,0,.55) 100%)"></div>
  <button class="ibt" data-a="back" aria-label="Back" style="position:absolute;top:12px;left:16px">${hi('back')}</button>
  <div class="r" style="position:absolute;top:12px;right:16px;gap:8px"><button class="ibt" data-a="toast" data-t="Link to Hamoni copied" aria-label="Share">${hi('share')}</button><button class="ibt" data-a="hmSave" data-id="hamoni" aria-label="Save Hamoni Golf Camp" aria-pressed="${S.hm.saved}" style="color:${S.hm.saved?'#FF6E00':'#17120E'}">${ic('heart',`width="20" height="20" ${S.hm.saved?'fill="currentColor"':''}`)}</button></div>
  <div class="r" style="position:absolute;left:20px;bottom:18px;gap:10px">${hmLogo(44)}<span class="eb" style="color:#fff">Gurugram · Sector 23A</span></div></section>
 <div class="pd" style="padding-top:20px;padding-bottom:30px;display:flex;flex-direction:column;gap:26px">
 <header style="display:flex;flex-direction:column;gap:10px"><h1 class="hd" style="font-size:36px">Hamoni Golf Camp</h1>
  <div class="r" style="gap:14px;flex-wrap:wrap;font-size:14px"><span class="r" style="gap:5px">${hmStar}<b>4.8</b><span class="mut">(228 reviews)</span></span><span class="r" style="gap:5px;color:#17120E">${hi('pin',15,'style="color:#FF6E00"')}<b>Carterpuri, Sector 23A</b></span></div>
  <div class="r" style="gap:8px">${open?`<span class="pl" style="background:#D8EFE4;color:#065F46"><i class="dot" style="background:#059669"></i>Open now · until 10 PM</span>`:`<span class="pl" style="background:#FFF1E6;color:#9A3412">${hmClosed(0)?'Closed today':'Opens 6 AM'}</span>`}<span class="pl" style="background:#F1EFEA;color:#3E3A35">Closed Mondays</span></div></header>
 <section class="sec"><h2>Next open bays</h2>${q.map(([d,t])=>hmSlot(d,t,'mat')).join('')}</section>
 <section class="sec"><h2>About</h2><p style="margin:0;line-height:1.55;color:#30302E">A floodlit driving range, golf academy and short-game area near Palam Vihar, with mat and grass bays, a putting green, FlightScope sessions, a pro shop and a café by the greens.</p></section>
 <section class="sec"><h2>Practice prices</h2><div class="card" style="padding:4px 18px">${rates.map(([a,b,c],i)=>`<div style="display:flex;justify-content:space-between;gap:14px;padding:14px 0;${i?'border-top:1px solid rgba(23,18,14,.08)':''}"><span style="display:flex;flex-direction:column;gap:2px"><b>${a}</b><span class="mut" style="font-size:13px">${b}</span></span><b style="font-size:16px;white-space:nowrap">${c}</b></div>`).join('')}</div><p class="mut" style="margin:0;font-size:12px">All prices are before 18% GST.</p></section>
 <section class="sec"><div class="r" style="justify-content:space-between"><h2>HGC Master Pass</h2><button data-a="go" data-v="${hmPassOn()?'hmMPok':'hmMP'}" style="font-weight:700;font-size:14px;color:#0E3B2C;min-height:44px">${hmPassOn()?'Your pass':'See passes'}</button></div>
  <div class="days" style="gap:10px">${HMP.map(p=>`<button data-a="hmMPpick" data-id="${p.id}" style="min-width:150px;border-radius:22px;padding:16px;background:${p.ace?'#17120E':'#fff'};color:${p.ace?'#fff':'#17120E'};border:1px solid rgba(23,18,14,.08);display:flex;flex-direction:column;gap:6px;text-align:left"><span class="eb" style="color:${p.ace?'#FFB27A':'#6E6D66'}">${p.days} days</span><b class="hd" style="font-size:24px">${p.n}</b><b style="font-size:18px">${money(p.p)}</b><span style="font-size:12px;color:${p.ace?'rgba(255,255,255,.75)':'#6E6D66'}">Unlimited balls · grass bays${p.ace?' · Ace Pen':''}</span></button>`).join('')}</div></section>
 <section class="sec"><h2>Coaching at Hamoni</h2><div class="card" style="padding:4px 18px">${HMC.map((c,i)=>`<button data-a="hmCoachGo" data-id="${c.id}" class="r" style="width:100%;padding:11px 0;text-align:left;${i?'border-top:1px solid rgba(23,18,14,.08)':''}"><span class="av2" style="width:44px;height:44px;background:${i%2?'#17120E':'#0E3B2C'}">${c.i}</span><span style="flex:1;display:flex;flex-direction:column"><b>${c.n}</b><span class="mut" style="font-size:13px">${c.lv}</span></span><span style="text-align:right"><b>${money(c.a)}</b><br><span class="mut" style="font-size:12px">45 min</span></span></button>`).join('')}</div><p class="mut" style="margin:0;font-size:12px">Adult 1:1 from. Lessons include entry, club rental and up to 100 balls. Tap a coach to add them to a bay.</p></section>
 <section class="sec"><h2>On site</h2><div style="display:flex;flex-wrap:wrap;gap:8px">${am.map(([i,t])=>`<span class="pl" style="height:36px;background:#fff;border:1px solid rgba(23,18,14,.08);color:#17120E;font-weight:600;font-size:13px;gap:7px">${hi(i,16,'style="color:#0E3B2C"')}${t}</span>`).join('')}</div></section>
 <section class="sec"><h2>Getting there</h2><div style="height:150px;border-radius:22px;background:#E9E5DC;position:relative;overflow:hidden" role="img" aria-label="Map showing Hamoni Golf Camp near Palam Vihar"><div style="position:absolute;left:-20px;right:-20px;top:60px;height:14px;background:#fff;transform:rotate(-8deg)"></div><div style="position:absolute;top:-20px;bottom:-20px;left:220px;width:12px;background:#fff;transform:rotate(12deg)"></div><div style="position:absolute;left:30px;top:92px;width:120px;height:46px;border-radius:20px;background:#CFE0D7"></div><span style="position:absolute;left:160px;top:46px;width:40px;height:40px;border-radius:999px;background:#0E3B2C;color:#fff;display:grid;place-items:center;box-shadow:0 0 0 6px rgba(14,59,44,.18)">${hi('flag',18)}</span></div>
  <p style="margin:0;font-size:14px;line-height:1.5"><b>${HM.addr}</b><br><span class="mut">${HM.near}</span></p>
  <div class="r" style="gap:10px"><button class="btn gh" style="flex:1;height:48px" data-a="toast" data-t="Opening directions in Maps">${hi('pin',18)}Directions</button><button class="btn gh" style="flex:1;height:48px" data-a="toast" data-t="Calling Hamoni · ${HM.phone}">${hi('phone',18)}Call the desk</button></div></section>
 </div></div>${hmFoot('From','₹500 <small style="font-size:12px;font-weight:500;color:#6E6D66">+ GST</small>',`<button class="btn" data-a="hmBook">Book a bay ${hmArrow}</button>`)}</div>`};

/* ---------- 4 · Choose a bay ---------- */
const hmMini=()=>`<div class="card r" style="padding:12px;border-radius:22px"><img src="${HM.photo}" alt="" style="width:56px;height:56px;border-radius:14px;object-fit:cover"><div style="flex:1;display:flex;flex-direction:column"><b style="font-size:16px">Hamoni Golf Camp</b><span class="mut" style="font-size:13px">Sector 23A, Gurugram</span></div>${hmLogo(30)}</div>`;
V.hmBay=()=>{const b=S.hm.b,pass=hmPassOn(),ts=hmTimes().filter(t=>hmPart(t)===b.part&&t+60<=1320),day=hmIsDay(b);
 const entries=['card','day','pass'].map(k=>{const e=HME[k];if(k==='pass'&&!pass)return `<button class="op" data-a="go" data-v="hmMP"><span style="width:22px;display:grid;place-items:center;color:#6E6D66">${hi('lock',18)}</span><span class="m"><b>HGC Master Pass</b><small>Entry and balls included · from ₹12k</small></span><span style="font-weight:700;color:#0E3B2C;font-size:14px">Get it</span></button>`;
  return `<button class="op" data-a="hmEntry" data-id="${k}" aria-pressed="${b.entry===k}"><span class="rd"></span><span class="m"><b>${k==='pass'?`Master Pass · ${HMP.find(p=>p.id===S.hm.pass.tier).n}`:e.n}</b><small>${k==='pass'?`Entry and balls included · ${S.hm.pass.left} days left`:e.s}</small></span><b>${k==='pass'?'Included':money(e.p)}</b></button>`}).join('');
 const grassOk=b.entry!=='card';
 return `<div class="hm hmw">${hmHead('Choose a bay','Step 1 of 3 · when and where',hmDots(0))}
 <div class="scroll"><div class="pd" style="display:flex;flex-direction:column;gap:22px;padding-top:14px;padding-bottom:30px">${hmMini()}
 <section class="sec"><p class="eb">How are you coming in?</p>${entries}</section>
 <section class="sec"><p class="eb">Day</p><div class="days">${Array.from({length:14},(_,d)=>{const x=dayD(d),cl=hmClosed(d);return `<button class="day" data-a="hmDay" data-id="${d}" aria-pressed="${b.d===d}" ${cl?'disabled':''} aria-label="${dLong(d)}${cl?', closed':''}"><span>${d===0?'Today':WD[x.getDay()]}</span><b>${x.getDate()}</b>${cl?'<small>CLOSED</small>':''}</button>`}).join('')}</div></section>
 ${day?`<div class="card" style="padding:18px;display:flex;flex-direction:column;gap:10px"><div class="r"><span class="ico" style="background:#0E3B2C;color:#fff">${hi('light',22)}</span><span style="flex:1;min-width:0;display:flex;flex-direction:column"><b style="font-size:16px">Unlimited access all day</b><span class="mut" style="font-size:13px">${dLbl(b.d)} · 6:00 AM – 10:00 PM</span></span></div>
  <div style="display:flex;flex-direction:column;gap:7px;font-size:14px">${['Any free mat or grass bay','Unlimited balls','Ace Pen access'].map(x=>`<div class="r" style="gap:9px">${hi('check',16,'style="color:#059669" stroke-width="2.2"')}${x}</div>`).join('')}</div>
  <p class="mut" style="margin:0;font-size:12px;background:#F6F4EF;border-radius:12px;padding:9px 12px">For top-5 amateurs, IGU-ranked juniors and current PGTI, WGAI and IGPL pros. ID is checked at the desk.</p></div>`
 :`<section class="sec"><p class="eb">Bay</p><div class="sg"><button data-a="hmBayT" data-id="mat" aria-pressed="${b.bay==='mat'}">${hi('target',16)}Mat bay</button><button data-a="hmBayT" data-id="grass" aria-pressed="${b.bay==='grass'}">${grassOk?hi('grass',16):hi('lock',15)}Grass bay</button></div>
  <p class="mut" style="margin:0;font-size:12px">${grassOk?'Grass bays are included with your Master Pass.':'Grass bays come with a Day Pass or Master Pass.'}</p></section>
 <section class="sec"><p class="eb">Arrival time</p><div class="sg">${[['am','Morning'],['pm','Afternoon'],['eve','Evening']].map(([k,l])=>`<button data-a="hmPartS" data-id="${k}" aria-pressed="${b.part===k}">${l}</button>`).join('')}</div>
  ${ts.some(t=>hmOpen(b.d,t,b.bay))?`<div class="tg">${ts.map(t=>{const o=hmOpen(b.d,t,b.bay),l=hmLeft(b.d,t,b.bay),past=b.d===0&&t<=NOW+20;return `<button class="tm" data-a="hmTime" data-id="${t}" aria-pressed="${b.t===t}" ${o?'':'disabled'}><b>${fT(t)}</b><span class="${l<=2&&o?'bz':''}">${past?'Gone':o?l+' left':'Full'}</span></button>`}).join('')}</div>`:`<div class="card" style="padding:18px;display:flex;flex-direction:column;gap:6px"><b>No ${b.bay} bays free this ${{am:'morning',pm:'afternoon',eve:'evening'}[b.part]}</b><span class="mut" style="font-size:13px">Try another part of the day or another day.</span></div>`}
  <p class="mut" style="margin:0;font-size:12px">You pay for entry and balls, not bay time.</p></section>`}
 </div></div>${hmFoot(day?dLbl(b.d):b.t!=null?`${dLbl(b.d)} · ${fT(b.t)}`:'Pick a time',day?'Day Pass · all day':`${b.bay==='grass'?'Grass':'Mat'} bay`,`<button class="btn" data-a="go" data-v="hmAdd" ${hmAvail(b)?'':'disabled'}>Continue ${hmArrow}</button>`)}</div>`};

/* ---------- 5 · Add-ons ---------- */
V.hmAdd=()=>{const b=S.hm.b,q=hmQuote(b),card=b.entry==='card',lesson=b.coach&&HMC.find(c=>c.id===b.coach),list=S.hm.allCoaches?HMC.slice():HMC.slice(0,3);
 if(lesson&&!list.includes(lesson))list.push(lesson);
 return `<div class="hm hmw">${hmHead('Make it a session','Step 2 of 3 · balls, clubs and coaching',hmDots(1))}
 <div class="scroll"><div class="pd" style="display:flex;flex-direction:column;gap:18px;padding-top:14px;padding-bottom:30px">
 <div class="card" style="padding:18px;display:flex;flex-direction:column;gap:14px"><div class="r"><span class="ico" style="background:#FFF1E6;color:#FF6E00">${hi('ball',22)}</span><span style="flex:1;display:flex;flex-direction:column"><b style="font-size:16px">Ball bags</b><span class="mut" style="font-size:13px">${card?'50 Srixon balls · ₹150 a bag':'Unlimited balls with your '+(b.entry==='day'?'Day Pass':'Master Pass')}</span></span></div>
  ${card?`<div class="r" style="justify-content:space-between"><div class="r" style="gap:10px"><button class="stp" data-a="hmBags" data-n="-1" aria-label="Fewer bags" ${b.bags<=0?'disabled':''}>−</button><b class="hd" style="font-size:30px;width:34px;text-align:center">${b.bags}</b><button class="stp on" data-a="hmBags" data-n="1" aria-label="More bags" ${b.bags>=12?'disabled':''}>+</button></div><span style="text-align:right"><b style="font-size:17px">${money(b.bags*150)}</b><br><span class="mut" style="font-size:12px">${b.bags*50} balls</span></span></div>
  <p class="mut" style="margin:0;font-size:12px;background:#F6F4EF;border-radius:12px;padding:9px 12px">Collect your bags at the ball desk with your bay pass. You can add more there.</p>`:`<span class="pl" style="background:#D8EFE4;color:#065F46;align-self:flex-start">${hi('check',13)}Included</span>`}</div>
 <div class="card r" style="padding:18px"><span class="ico" style="background:#EEF5F1;color:#0E3B2C">${hi('club',22)}</span><span style="flex:1;display:flex;flex-direction:column"><b style="font-size:16px">Club rental</b><span class="mut" style="font-size:13px">${lesson?'With your lesson':'₹200 a club'}</span></span><div class="r" style="gap:8px"><button class="stp" data-a="hmClubs" data-n="-1" aria-label="Fewer clubs" ${b.clubs<=0?'disabled':''}>−</button><b style="font-size:18px;width:18px;text-align:center">${b.clubs}</b><button class="stp" data-a="hmClubs" data-n="1" aria-label="More clubs" ${b.clubs>=6?'disabled':''}>+</button></div></div>
 <div class="card" style="padding:18px;display:flex;flex-direction:column;gap:6px"><div class="r"><span class="ico" style="background:#17120E;color:#FF6E00">${hi('users',22)}</span><span style="flex:1;display:flex;flex-direction:column"><b style="font-size:16px">Add a lesson</b><span class="mut" style="font-size:13px">Includes entry, clubs, 100 balls</span></span><span class="pl" style="background:${lesson?'#D8EFE4':'#F1EFEA'};color:${lesson?'#065F46':'#3E3A35'}">${lesson?'Added':'Optional'}</span></div>
  ${list.map((c,i)=>`<button class="op" style="border:0;border-radius:0;padding:10px 0;background:none;${i?'border-top:1px solid rgba(23,18,14,.08)':''}" data-a="hmCoach" data-id="${c.id}" aria-pressed="${b.coach===c.id}"><span class="av2">${c.i}</span><span class="m"><b>${c.n}</b><small>45 min · ${hmIsDay(b)?'time set with coach':fT(b.t)}</small></span><b>${money(c.a)}</b><span class="rd"></span></button>`).join('')}
  ${S.hm.allCoaches?'':`<button data-a="hmAllC" style="font-size:14px;font-weight:700;color:#0E3B2C;min-height:40px;text-align:left">See all 5 Hamoni coaches</button>`}</div>
 <div class="card r" style="padding:18px"><span class="ico" style="background:#EEF5F1;color:#0E3B2C">${hi('trend',22)}</span><span style="flex:1;display:flex;flex-direction:column"><b style="font-size:16px">FlightScope session</b><span class="mut" style="font-size:13px">30 min · ₹1,500</span></span><button class="tgl" role="switch" aria-checked="${b.fs}" aria-label="FlightScope session" data-a="hmFs"></button></div>
 </div></div>${hmFoot(q.L.filter(x=>x[1]).map(x=>x[0].split(' · ')[0]).slice(0,2).join(' + ')||'Your bay',`${money(q.sub)} <small style="font-size:12px;font-weight:500;color:#6E6D66">+ GST</small>`,`<button class="btn" data-a="go" data-v="hmReview">Review ${hmArrow}</button>`)}</div>`};

/* ---------- 6 · Review and pay (+ 7 · waiting sheet) ---------- */
const HMPAY=[['gpay','G','Google Pay','UPI'],['phonepe','Pe','PhonePe','UPI'],['wallet','W','Fore! wallet','Pay from your balance']];
function hmPaySheet(){const p=S.hm.paying;if(!p)return '';const n=(HMPAY.find(x=>x[0]===p.pay)||[0,0,'your app'])[2];
 return `<div class="sheet2" role="dialog" aria-modal="true" aria-label="Waiting for payment"><div><span style="width:40px;height:5px;border-radius:999px;background:#D3CDC3;display:block"></span>
 ${p.failed?`<span class="ico" style="width:64px;height:64px;border-radius:999px;background:#FDE8E4;color:#B42318;margin-top:8px">${hi('x',28)}</span><h2 class="hd" style="font-size:28px">Payment didn't go through</h2><p class="mut" style="margin:0;line-height:1.5">No money has left your account.<br>Your ${p.kind==='mp'?'pass':'bay'} is still held for 5 minutes.</p><button class="btn" style="width:100%" data-a="hmRetry">Try again</button><button class="btn gh" style="width:100%;border:0;background:none;color:#6E6D66" data-a="hmPayX">Choose another way to pay</button>`
 :`<div class="spn"></div><h2 class="hd" style="font-size:28px">Waiting for ${n}</h2><p class="mut" style="margin:0;line-height:1.5">Approve ${money(p.amt)} in ${n}.<br>We're holding your ${p.kind==='mp'?'pass':'bay'} for 5 minutes.</p>
 <div class="card r" style="padding:12px 16px;width:100%;border-radius:20px">${hmLogo(36)}<span style="flex:1;text-align:left;display:flex;flex-direction:column"><b style="font-size:14px">Hamoni Golf Camp</b><span class="mut" style="font-size:12px">${p.label}</span></span><b>${money(p.amt)}</b></div>
 <button class="btn gh" style="width:100%" data-a="hmApprove">Approve now</button><button class="btn gh" style="width:100%;border:0;background:none;color:#6E6D66" data-a="hmPayX">Cancel</button>`}</div></div>`}
const hmBkCard=(b,edit)=>`<div class="hl"><div class="r" style="justify-content:space-between"><span class="eb" style="color:rgba(255,255,255,.8)">${hmIsDay(b)?'Your visit':'Your bay'}</span>${edit?`<button data-a="hmEdit" style="color:#FFB27A;font-weight:700;font-size:14px;min-height:36px">Edit</button>`:''}</div>
 <div class="r" style="gap:12px">${hi('cal',22)}<b style="font-size:20px;line-height:1.25">${hmWhen(b)}</b></div>
 <p style="margin:0;font-size:15px;color:rgba(255,255,255,.86)">${hmIsDay(b)?'Any bay':b.bay==='grass'?'Grass bay':'Mat bay'} · ${b.entry==='pass'?'Master Pass':b.entry==='day'?'Day Pass':'HGC card entry'}${b.entry==='card'&&b.bags?` · ${b.bags} ball bag${b.bags>1?'s':''}`:b.entry!=='card'?' · unlimited balls':''}</p>
 <div class="r" style="justify-content:space-between"><span class="r" style="gap:6px;font-size:13px;color:rgba(255,255,255,.8)">${hi('pin',15)}Hamoni Golf Camp, Gurugram</span>${b.entry==='pass'?'<span class="pl" style="background:#FF6E00;color:#17120E">Member</span>':'<span class="pl" style="background:rgba(255,255,255,.12);color:#fff">For you</span>'}</div></div>`;
V.hmReview=()=>{const b=S.hm.b,q=hmQuote(b),late=b.d*1440+b.t-NOW<1440,free=!q.tot;
 return `<div class="hm hmw">${hmHead('Review and pay',b.entry==='pass'?'With your Master Pass':'Step 3 of 3',hmDots(2))}
 <div class="scroll"><div class="pd" style="display:flex;flex-direction:column;gap:18px;padding-top:14px;padding-bottom:30px">${hmBkCard(b,true)}
 <div class="card" style="padding:14px 20px">${q.L.map(([l,a,t])=>`<div class="ln"><span>${l}</span><span class="${a?'':'inc'}">${a?money(a):(t||'Included')}</span></div>`).join('')}
 ${q.gst?`<div class="ln" style="border-top:1px solid rgba(23,18,14,.08);margin-top:6px;padding-top:12px"><span class="mut">Subtotal</span><span class="mut">${money(q.sub)}</span></div><div class="ln"><span class="mut">GST 18%</span><span class="mut">${money(q.gst)}</span></div>`:''}
 <div class="ln tt"><span>Total</span><span>${money(q.tot)}</span></div></div>
 ${b.entry==='pass'?`<div class="r" style="gap:10px;padding:14px 16px;border-radius:18px;background:#EEF5F1">${hi('shield',20,'style="color:#0E3B2C"')}<p style="margin:0;font-size:13px;line-height:1.5">You'd have paid <b>₹1,000</b> for this visit on a Day Pass.</p></div>`:''}
 ${free?'':`<section class="sec"><p class="eb">Pay with</p>${HMPAY.map(([k,g,n,s])=>`<button class="op" data-a="hmPayM" data-id="${k}" aria-pressed="${b.pay===k}"><span class="ico" style="width:42px;height:42px;border-radius:12px;background:#F1EFEA;font-weight:800">${g}</span><span class="m"><b>${n}</b><small>${s}</small></span><span class="rd"></span></button>`).join('')}</section>`}
 <div class="r" style="gap:10px;align-items:flex-start">${hi('clock',19,'style="color:#0E3B2C;flex:none"')}<p style="margin:0;font-size:13px;line-height:1.5">${late?'<b>This bay is less than 24 hours away.</b> <span class="mut">You can move it, but it can\'t be refunded.</span>':`<b>Free cancellation until ${dLbl(b.d-1)}, ${fT(b.t)}.</b> <span class="mut">After that you can move your bay to another time.</span>`}</p></div>
 </div></div>${hmFoot(null,null,`<button class="btn" data-a="hmPay">${free?'Confirm booking':'Pay '+money(q.tot)}</button>`)}${hmPaySheet()}</div>`};

/* ---------- 8 · Booked ---------- */
V.hmBooked=p=>{const b=hmBk(p.id);if(!b)return '<div class="hm hmw"></div>';
 return `<div class="hm hmw hmg"><div class="rings" aria-hidden="true"><i style="right:-70px;top:-60px;width:340px;height:340px"></i><i style="right:-10px;top:0;width:220px;height:220px"></i></div>
 <span class="chk" style="position:absolute;right:54px;top:58px;width:92px;height:92px;border-radius:999px;background:#FF6E00;color:#17120E;display:grid;place-items:center">${hi('check',44,'stroke-width="2.6"')}</span>
 <div style="flex:1;display:flex;flex-direction:column;gap:18px;padding:220px 24px max(24px,var(--sab))">
 <p class="eb" style="color:#FFB27A">Booking ${b.code}${b.total?' · paid '+money(b.total):''}</p>
 <h1 class="hd" style="font-size:64px;color:#fff">You're<br>booked.</h1>
 <div style="display:flex;flex-direction:column;gap:6px"><b style="font-size:20px">${hmWhen(b)}</b><span style="font-size:15px;color:rgba(255,255,255,.82)">${hmBayLbl(b)} · ${b.entry==='card'?b.bags+' ball bag'+(b.bags===1?'':'s'):'unlimited balls'}${b.coach?' · lesson with '+HMC.find(c=>c.id===b.coach).n.split(' ')[0]:''} · Hamoni Golf Camp</span>
 <span style="font-size:14px;color:rgba(255,255,255,.7)">We'll remind you ${b.d===0?'an hour before':dLbl(b.d-1).toLowerCase()==='today'?'today':'the day before'}. Show your bay pass at the desk.</span></div>
 <div style="margin-top:auto;display:flex;flex-direction:column;gap:10px"><button class="btn" data-a="hmToPass" data-id="${b.id}">Show bay pass ${hmArrow}</button><button class="btn wt" data-a="toast" data-t="Added to your calendar">${hi('cal',18)}Add to calendar</button><button class="btn" style="background:none;color:#fff" data-a="hmDone">Done</button></div></div></div>`};

/* ---------- 10/11 · Bay pass and check-in ---------- */
function hmQR(code){const n=25,r=rngLite(code);let o='';const f=(x,y)=>`<rect x="${x}" y="${y}" width="7" height="7" fill="#17120E"/><rect x="${x+1}" y="${y+1}" width="5" height="5" fill="#fff"/><rect x="${x+2}" y="${y+2}" width="3" height="3" fill="#17120E"/>`;
 for(let y=0;y<n;y++)for(let x=0;x<n;x++){if((x<8&&y<8)||(x>16&&y<8)||(x<8&&y>16))continue;if(r(0,1)>.52)o+=`<rect x="${x}" y="${y}" width="1" height="1" fill="#17120E"/>`}
 return `<svg width="176" height="176" viewBox="-1 -1 27 27" role="img" aria-label="Check-in QR code for booking ${code}" style="display:block"><rect x="-1" y="-1" width="27" height="27" fill="#fff"/>${f(0,0)}${f(18,0)}${f(0,18)}${o}</svg>`}
V.hmPass=p=>{const b=hmBk(p.id);if(!b)return nb('Bay pass');const ck=b.checked,cnc=b.status==='cancelled',lesson=b.coach&&HMC.find(c=>c.id===b.coach);
 const status=cnc?`<span class="pl" style="background:#FDE8E4;color:#B42318">Cancelled</span>`:ck?`<span class="pl" style="background:#D8EFE4;color:#065F46"><i class="dot" style="background:#059669"></i>Checked in · ${fT(b.ckAt)}</span>`:`<span class="pl" style="background:#FFF1E6;color:#9A3412">${hi('clock',13)}${hmIsDay(b)?'Opens 6:00 AM':'Arrive from '+fT(b.t)}</span>`;
 const rows=ck?[[hmIsDay(b)?'Access':'Bay',hmIsDay(b)?'All day · until 10:00 PM':hmBayLbl(b)],['Balls',b.entry==='card'?`${b.bags} bag${b.bags===1?'':'s'} at the ball desk`:'Unlimited · ball desk'],...(lesson?[['Lesson',`${lesson.n} · ${fT(b.t)}`]]:[]),['Booking',b.code]]
  :[['Bay',hmBayLbl(b)],['When',hmIsDay(b)?`${dLbl(b.d)} · 6:00 AM – 10:00 PM`:`${dLbl(b.d)} · from ${fT(b.t)}`],['Entry',b.entry==='pass'?'Master Pass':b.entry==='day'?'Day Pass · paid':'HGC card · paid'],['Balls',b.entry==='card'?`${b.bags} bag${b.bags===1?'':'s'} · ${b.bags*50} Srixon balls`:'Unlimited'],...(b.clubs?[['Clubs',`${b.clubs} rental club${b.clubs>1?'s':''}`]]:[]),...(lesson?[['Lesson',`${lesson.n} · 45 min`]]:[]),...(b.fs?[['FlightScope','30 min session']]:[]),['Paid',b.total?money(b.total):'Nothing to pay']];
 return `<div class="hm hmw">${hmHead(cnc?'Booking cancelled':ck?'Enjoy your session':'Bay pass',null,status)}
 <div class="scroll"><div class="pd" style="display:flex;flex-direction:column;gap:16px;padding-top:14px;padding-bottom:30px">
 <div style="border-radius:28px;overflow:hidden;background:#fff;border:1px solid rgba(23,18,14,.06);box-shadow:0 12px 30px rgba(23,18,14,.08);${cnc?'opacity:.6':''}">
  <div class="r" style="background:#0E3B2C;color:#fff;padding:16px 18px">${hmLogo(42)}<span style="flex:1;display:flex;flex-direction:column"><b style="font-size:16px">Hamoni Golf Camp</b><span style="font-size:13px;color:rgba(255,255,255,.78)">Carterpuri, Sector 23A, Gurugram</span></span></div>
  <div style="padding:20px 20px 8px">${ck?`<div style="display:flex;flex-direction:column;align-items:center;gap:6px;padding:6px 0 2px"><span class="chk" style="width:92px;height:92px;border-radius:999px;background:#0E3B2C;color:#fff;display:grid;place-items:center">${hi('check',46,'stroke-width="2.6"')}</span><b class="hd" style="font-size:40px;color:#0E3B2C">${hmIsDay(b)?'All day':'Bay '+b.bayNo}</b><span class="mut" style="font-size:14px;text-align:center">${hmIsDay(b)?'Pick any free mat or grass bay':b.bay==='grass'?'Grass bays · by the putting green':'Mat bays · number '+b.bayNo+' from the left'}</span></div>`
   :`<div style="display:flex;flex-direction:column;align-items:center;gap:10px"><div style="padding:12px;border-radius:22px;background:#fff;border:1px solid rgba(23,18,14,.08)">${hmQR(b.code)}</div><b style="font-size:18px;letter-spacing:.12em">${b.code}</b><span class="mut" style="font-size:13px">Show this at the desk, or your HGC card</span></div>`}</div>
  <div style="margin:10px 0;border-top:2px dashed #E4DED4"></div>
  <div style="padding:0 20px 14px">${rows.map(([a,v],i)=>`<div class="ln" style="padding:9px 0;${i?'border-top:1px solid rgba(23,18,14,.08)':''}"><span class="mut">${a}</span><b style="text-align:right">${v}</b></div>`).join('')}</div></div>
 ${cnc?`<p class="mut" style="margin:0;text-align:center;font-size:14px">${b.refund?money(b.refund)+' is on its way back to your '+(b.pay==='wallet'?'Fore! wallet':'UPI account')+'.':'Nothing was charged.'}</p><button class="btn" data-a="hmBook">Book another bay</button>`
 :ck?`<div class="card r" style="padding:16px"><span class="ico" style="background:#FFF1E6;color:#FF6E00">${hi('ball',22)}</span><span style="flex:1;display:flex;flex-direction:column"><b>${b.entry==='card'?'Running low?':'Balls are unlimited'}</b><span class="mut" style="font-size:13px">${b.entry==='card'?'Add a bag and the desk brings it to Bay '+b.bayNo:'Ask the desk for more any time'}</span></span>${b.entry==='card'?`<button class="btn" style="height:44px;padding:0 16px;font-size:14px" data-a="hmAddBag" data-id="${b.id}">+ ₹150</button>`:''}</div>
  <div class="r" style="gap:10px"><button class="btn gh" style="flex:1;height:48px" data-a="toast" data-t="Message sent to the Hamoni desk">${hi('msg',18)}Message desk</button><button class="btn gh" style="flex:1;height:48px" data-a="toast" data-t="Calling Hamoni · ${HM.phone}">${hi('phone',18)}Call desk</button></div>
  ${b.extra?`<p class="mut" style="margin:0;font-size:13px;text-align:center">Added at the range: ${money(b.extra)} incl. GST, paid by UPI</p>`:''}`
 :`<div class="r" style="gap:10px"><button class="btn gh" style="flex:1;height:48px" data-a="toast" data-t="Opening directions in Maps">${hi('pin',18)}Directions</button><button class="btn gh" style="flex:1;height:48px" data-a="toast" data-t="Calling Hamoni · ${HM.phone}">${hi('phone',18)}Call desk</button></div>
  <button class="btn gr" data-a="hmCheckin" data-id="${b.id}">Simulate check-in at the desk</button>
  <div class="r" style="justify-content:center;gap:22px"><button style="font-weight:700;color:#0E3B2C;font-size:14px;min-height:44px" data-a="hmMove" data-id="${b.id}">Move booking</button><button style="font-weight:700;color:#B42318;font-size:14px;min-height:44px" data-a="hmCancel" data-id="${b.id}">Cancel booking</button></div>`}
 </div></div></div>`};

/* ---------- 12/13 · Master Pass ---------- */
V.hmMP=()=>{const sel=HMP.find(p=>p.id===S.hm.mp),g=hmGst(sel.p);
 return `<div class="hm hmw">${hmHead('HGC Master Pass','Hamoni Golf Camp membership')}
 <div class="scroll"><div class="pd" style="display:flex;flex-direction:column;gap:18px;padding-top:14px;padding-bottom:30px">
 <div style="border-radius:28px;background:#17120E;color:#fff;padding:22px;display:flex;flex-direction:column;gap:14px;position:relative;overflow:hidden"><div style="position:absolute;right:-40px;top:-40px;width:170px;height:170px;border-radius:999px;background:#0E3B2C"></div>
  <div class="r" style="position:relative;justify-content:space-between">${hmLogo(48)}<span class="eb" style="color:#FFB27A">Master Pass</span></div>
  <h2 class="hd" style="font-size:30px;color:#fff;position:relative">Practise as much as you like.</h2>
  <div style="display:flex;flex-direction:column;gap:9px;position:relative;font-size:14px">${[['ball','Unlimited ball rentals'],['grass','Grass bay access'],['target','Book bays on Fore! with entry included'],['lock','Ace Pen with 6 months and 1 year']].map(([i,t])=>`<div class="r" style="gap:10px">${hi(i,18,'style="color:#FF6E00"')}<span>${t}</span></div>`).join('')}</div></div>
 <section class="sec"><p class="eb">Choose your pass</p>${HMP.map(p=>`<button class="op" style="padding:16px" data-a="hmMPpick" data-id="${p.id}" data-stay="1" aria-pressed="${S.hm.mp===p.id}"><span class="rd"></span><span class="m"><b style="font-size:16px">${p.n}</b><small>${p.days} days${p.ace?' · Ace Pen access':''}</small></span><span style="text-align:right"><b style="font-size:17px">${money(p.p)}</b><br><span class="mut" style="font-size:11px">+ GST</span></span></button>`).join('')}</section>
 <div class="card" style="padding:14px 20px"><div class="ln"><span>Master Pass · ${sel.n}</span><span>${money(sel.p)}</span></div><div class="ln"><span class="mut">GST 18%</span><span class="mut">${money(g)}</span></div><div class="ln tt"><span>Total</span><span>${money(sel.p+g)}</span></div></div>
 <section class="sec"><p class="eb">Pay with</p>${HMPAY.slice(0,2).map(([k,gl,n,s])=>`<button class="op" data-a="hmMPpay" data-id="${k}" aria-pressed="${(S.hm.mpPay||'gpay')===k}"><span class="ico" style="width:42px;height:42px;border-radius:12px;background:#F1EFEA;font-weight:800">${gl}</span><span class="m"><b>${n}</b><small>${s}</small></span><span class="rd"></span></button>`).join('')}</section>
 <p class="mut" style="margin:0;font-size:12px;line-height:1.5">Starts today and is linked to your HGC card. Passes are non-transferable and non-refundable.</p>
 </div></div>${hmFoot(null,null,`<button class="btn dk" data-a="hmMPbuy">Pay ${money(sel.p+g)}</button>`)}${hmPaySheet()}</div>`};
V.hmMPok=()=>{const ps=S.hm.pass;if(!ps)return V.hmMP();const t=HMP.find(p=>p.id===ps.tier),end=dayD(ps.left),st=dayD(ps.left-t.days),fd=x=>`${x.getDate()} ${MO[x.getMonth()]} ${x.getFullYear()}`;
 return `<div class="hm hmw">${hmHead('Your membership',null)}
 <div class="scroll"><div class="pd" style="display:flex;flex-direction:column;gap:18px;padding-top:14px;padding-bottom:30px">
 <div style="border-radius:28px;background:#0E3B2C;color:#fff;padding:22px;display:flex;flex-direction:column;gap:16px;position:relative;overflow:hidden;box-shadow:0 18px 40px rgba(14,59,44,.3)"><div style="position:absolute;right:-50px;bottom:-70px;width:220px;height:220px;border-radius:999px;border:26px solid rgba(255,110,0,.9)"></div>
  <div class="r" style="justify-content:space-between;position:relative">${hmLogo(46)}<span class="pl" style="background:#fff;color:#047857"><i class="dot" style="background:#059669"></i>Active</span></div>
  <div style="position:relative"><p class="eb" style="color:rgba(255,255,255,.75)">HGC Master Pass</p><h2 class="hd" style="font-size:40px;color:#fff">${t.n}</h2></div>
  <div style="position:relative;display:flex;flex-direction:column;gap:6px"><div class="r" style="justify-content:space-between;font-size:13px"><span style="color:rgba(255,255,255,.8)">${fd(st)} – ${fd(end)}</span><b>${ps.left} days left</b></div><div style="height:6px;border-radius:999px;background:rgba(255,255,255,.18)"><div style="width:${Math.max(3,Math.round((1-ps.left/t.days)*100))}%;height:6px;border-radius:999px;background:#FF6E00"></div></div></div>
  <div class="r" style="position:relative;justify-content:space-between;font-size:13px;color:rgba(255,255,255,.85)"><span>${esc(stud(meId()).name)}</span><span>HGC card linked</span></div></div>
 <div class="card" style="padding:18px;display:flex;flex-direction:column;gap:12px"><b style="font-size:16px">What changes when you book</b>${['Entry included on every visit','Unlimited balls, no bags to buy','Grass bays unlocked',...(t.ace?['Ace Pen access']:[])].map(x=>`<div class="r" style="gap:10px;font-size:14px">${hi('check',18,'style="color:#059669" stroke-width="2.2"')}${x}</div>`).join('')}</div>
 <button class="btn" data-a="hmPassBook">Book a grass bay ${hmArrow}</button>
 <p class="mut" style="margin:0;font-size:12px;text-align:center">Receipt ${ps.rc} sent to WhatsApp · paid ${money(ps.paid)}</p>
 </div></div></div>`};

/* ---------- actions ---------- */
function hmSync(){const b=S.hm.b;if(!b)return;
 if(b.entry==='day'){Object.assign(b,{bay:'any',t:360,dur:960,bags:0});return}
 b.dur=60;if(b.bay==='any'||(b.entry==='card'&&b.bay==='grass'))b.bay='mat';if(b.entry!=='card')b.bags=0;else if(b.bags===0&&!b._bagsTouched)b.bags=3;
 if(b.t==null||!hmOpen(b.d,b.t,b.bay)||hmPart(b.t)!==b.part){const t=hmTimes().find(x=>hmPart(x)===b.part&&hmOpen(b.d,x,b.bay));b.t=t!=null?t:null}}
function hmStartPay(kind,amt,label,pay){S.hm.paying={kind,amt,label,pay,failed:false};show('none');clearTimeout(S.hm._pt);
 S.hm._pt=setTimeout(()=>{if(!S.hm.paying||S.hm.paying.failed)return;if(S.failNext){S.failNext=false;chrome();S.hm.paying.failed=true;show('none');return}ACT.hmApprove()},2200)}
function hmFinal(){const b=S.hm.b,q=hmQuote(b),n=S.hm.seq++,range=b.bay==='grass'?[8,10]:[1,7],day=hmIsDay(b);
 const used=new Set(S.hm.bks.filter(x=>x.status==='confirmed'&&x.d===b.d&&x.bay===b.bay&&b.t<x.t+x.dur&&x.t<b.t+b.dur).map(x=>x.bayNo));
 let no=range[0]+hashN(n+''+b.t)%(range[1]-range[0]+1);for(let i=0;i<10&&used.has(no);i++)no=no>=range[1]?range[0]:no+1;
 const bk=Object.assign({},b,{id:'hb'+n,code:'HGC-'+n,bayNo:day?null:no,total:q.tot,status:'confirmed',checked:false});S.hm.bks.push(bk);S.hm.paying=null;
 nv().stack=[{name:'hmBooked',p:{id:bk.id}}];show('up');
 setTimeout(()=>event('golfer',{i:'check',t:hmIsDay(bk)?'Day Pass booked at Hamoni':'Bay booked at Hamoni',b:`${hmWhen(bk)} · ${hmBayLbl(bk)}`}),900)}
Object.assign(ACT,{
 hmOpen:()=>{closeSheet();go('hmRanges')},
 hmVenue:(d,el,ev)=>{if(ev&&ev.target.closest('button'))return;go('hmVenue')},
 hmSave:d=>{if(d.id!=='hamoni'){toast('Saved');return}S.hm.saved=!S.hm.saved;toast(S.hm.saved?'Hamoni saved':'Removed from saved');show('none')},
 hmSavedF:()=>{S.hm.onlySaved=!S.hm.onlySaved;show('none')},
 hmFilt:()=>openSheet(()=>`<h2>Filters</h2><p class="muted">Hamoni Golf Camp is the only range taking bookings on Fore! right now. More ranges in Gurugram and Delhi are on the way.</p><button class="btn full" data-a="closeS">Done</button>`),
 hmWait:d=>{S.notify.add('hm-'+d.id);toast('We’ll tell you when it opens on Fore!');show('none')},
 hmBook:d=>{const o={};if(d.d!=null){o.d=+d.d;o.t=+d.t;o.bay=d.bay}if(o.bay==='grass'&&!hmPassOn())o.entry='day';S.hm.b=hmDraft(o);S.hm.allCoaches=false;go('hmBay')},
 hmCoachGo:d=>{S.hm.b=hmDraft();S.hm.b.coach=d.id;S.hm.b.bags=2;S.hm.allCoaches=true;go('hmBay');toast(`${HMC.find(c=>c.id===d.id).n} added · pick a time`)},
 hmEntry:d=>{const b=S.hm.b;b.entry=d.id;if(d.id!=='card'){b.bags=0}else if(!b.bags)b.bags=3;hmSync();show('none')},
 hmDay:d=>{S.hm.b.d=+d.id;hmSync();show('none')},
 hmBayT:d=>{const b=S.hm.b;if(d.id==='grass'&&b.entry==='card'){toast('Grass bays come with a Day Pass or Master Pass');return}b.bay=d.id;hmSync();show('none')},
 hmPartS:d=>{S.hm.b.part=d.id;hmSync();show('none')},
 hmTime:d=>{S.hm.b.t=+d.id;show('none')},
 hmBags:d=>{const b=S.hm.b;b._bagsTouched=true;b.bags=Math.max(0,Math.min(12,b.bags+ +d.n));show('none')},
 hmClubs:d=>{const b=S.hm.b;b.clubs=Math.max(0,Math.min(6,b.clubs+ +d.n));show('none')},
 hmCoach:d=>{const b=S.hm.b;b.coach=b.coach===d.id?null:d.id;if(b.coach&&b.entry==='card'&&b.bags<2)b.bags=2;show('none')},
 hmAllC:()=>{S.hm.allCoaches=true;show('none')},
 hmFs:()=>{S.hm.b.fs=!S.hm.b.fs;show('none')},
 hmPayM:d=>{S.hm.b.pay=d.id;show('none')},
 hmEdit:()=>{const n=nv();const i=n.stack.map(x=>x.name).lastIndexOf('hmBay');if(i>=0){n.stack=n.stack.slice(0,i+1);show('pop')}else back()},
 hmPay:()=>{const b=S.hm.b,q=hmQuote(b);if(!hmAvail(b)){toast('That bay was just taken. Pick another time.');ACT.hmEdit();return}if(!q.tot){hmFinal();return}hmStartPay('bay',q.tot,`${hmWhen(b)} · ${hmIsDay(b)?'Day Pass':b.bay==='grass'?'Grass bay':'Mat bay'}`,b.pay)},
 hmApprove:()=>{const p=S.hm.paying;if(!p)return;clearTimeout(S.hm._pt);if(p.kind==='mp')hmMPdone();else hmFinal()},
 hmRetry:()=>{const p=S.hm.paying;if(!p)return;hmStartPay(p.kind,p.amt,p.label,p.pay)},
 hmPayX:()=>{clearTimeout(S.hm._pt);S.hm.paying=null;show('none')},
 hmToPass:d=>{nv().stack=[{name:'hmPass',p:{id:d.id}}];show('push')},
 hmDone:()=>{const n=nv();n.stack=[];n.tab='home';show('pop')},
 hmCheckin:d=>{const b=hmBk(d.id);b.checked=true;b.ckAt=b.d===0?Math.max(NOW,b.t-5):b.t-4;show('none');toast(hmIsDay(b)?'Checked in · pick any free bay':`Checked in · head to Bay ${b.bayNo}`)},
 hmAddBag:d=>{const b=hmBk(d.id);b.bags++;b.extra=(b.extra||0)+150+hmGst(150);toast('Bag on its way to Bay '+b.bayNo);show('none')},
 hmMove:d=>{const b=hmBk(d.id);let dd=b.d,tt=b.t;const fn=()=>`<h2>Move your ${hmIsDay(b)?'Day Pass':'bay'}</h2><p class="muted">${hmIsDay(b)?'Day Pass · all day':b.bay==='grass'?'Grass bay':'Mat bay'} · no extra charge</p>
  <div class="datestrip">${Array.from({length:10},(_,i)=>{const x=dayD(i),cl=hmClosed(i);return `<button class="ds ${cl?'none':''}" data-a="hmMvD" data-id="${i}" aria-pressed="${dd===i}" ${cl?'disabled':''}><span>${i===0?'Today':WD[x.getDay()]}</span><b class="num">${x.getDate()}</b></button>`}).join('')}</div>
  ${hmIsDay(b)?'':`<div class="times">${hmTimes().filter(t=>t+60<=1320).map(t=>{const o=(dd===b.d&&t===b.t)||hmOpen(dd,t,b.bay);return `<button class="tm num" data-a="hmMvT" data-id="${t}" aria-pressed="${tt===t&&dd!=null}" ${o?'':'disabled'}>${fT(t)}</button>`}).join('')}</div>`}
  <button class="btn full" data-a="hmMvGo" ${tt==null?'disabled':''}>Move to ${dd!=null&&tt!=null?dLbl(dd)+(hmIsDay(b)?'':', '+fT(tt)):'…'}</button>`;
  ACT.hmMvD=x=>{dd=+x.id;tt=hmIsDay(b)?360:null;refreshSheet()};ACT.hmMvT=x=>{tt=+x.id;refreshSheet()};
  ACT.hmMvGo=()=>{if(tt==null)return;b.d=dd;b.t=tt;closeSheet();toast(`Moved to ${dLbl(dd)}${hmIsDay(b)?'':', '+fT(tt)}`);show('none')};openSheet(fn)},
 hmCancel:d=>{const b=hmBk(d.id),late=b.d*1440+b.t-NOW<1440;openSheet(()=>`<h2>Cancel this bay?</h2><p class="muted">${late?'This bay is less than 24 hours away, so it can’t be refunded. You can move it instead.':b.total?`${money(b.total)} goes back to your ${b.pay==='wallet'?'Fore! wallet':'UPI account'} in 3–5 working days.`:'Nothing was charged for this booking.'}</p><button class="btn danger full" data-a="hmCancelGo" data-id="${b.id}">Cancel booking</button><button class="btn sec2 full" data-a="closeS">Keep it</button>`)},
 hmCancelGo:d=>{const b=hmBk(d.id),late=b.d*1440+b.t-NOW<1440;b.status='cancelled';b.refund=late?0:b.total;closeSheet();toast(late?'Booking cancelled':'Booking cancelled · refund started');show('none')},
 hmMPpick:d=>{S.hm.mp=d.id;if(d.stay)show('none');else go('hmMP')},
 hmMPpay:d=>{S.hm.mpPay=d.id;show('none')},
 hmMPbuy:()=>{const sel=HMP.find(p=>p.id===S.hm.mp);hmStartPay('mp',sel.p+hmGst(sel.p),`Master Pass · ${sel.n}`,S.hm.mpPay||'gpay')},
 hmPassBook:()=>{S.hm.b=hmDraft({entry:'pass',bay:'grass'});const [d,t]=hmFirst('grass',1,420);Object.assign(S.hm.b,{d,t,part:hmPart(t)});go('hmBay')}
});
function hmMPdone(){const sel=HMP.find(p=>p.id===S.hm.mp),paid=sel.p+hmGst(sel.p);S.hm.pass={tier:sel.id,left:sel.days,paid,rc:'HGC-MP-0'+(S.hm.mpSeq++)};S.hm.paying=null;
 const n=nv(),i=n.stack.map(x=>x.name).lastIndexOf('hmMP');if(i>=0)n.stack[i]={name:'hmMPok',p:{}};else n.stack.push({name:'hmMPok',p:{}});
 if(S.hm.b&&S.hm.b.entry==='card'){S.hm.b.entry='pass';hmSync()}show('up');setTimeout(()=>event('golfer',{i:'check',t:'Master Pass active',b:`${sel.n} at Hamoni Golf Camp`}),900)}

/* ---------- wire into the app ---------- */
const _soon9=ACT.soon;ACT.soon=d=>{if(d.id==='range')return ACT.hmOpen();return _soon9(d)};
const _show9=show;show=function(k){_show9(k);const n=cur().name,ph=$('#phone');if(!ph)return;ph.classList.toggle('hmode',n.startsWith('hm')&&n!=='hmBooked');ph.classList.toggle('hmgreen',n==='hmBooked')};
const _home9=V.home;V.home=()=>{let h=_home9();
 h=h.replace(/(data-id="range"><span class="bt-top"><svg[\s\S]*?<\/svg>)<span class="soon">Soon<\/span>/,'$1<span class="hm-new">New</span>');
 const nx=S.hm&&hmNext();
 if(nx)h=h.replace(/(<div class="hero|<button class="hero)/,`<button class="hm-home press" data-a="go" data-v="hmPass" data-id="${nx.id}"><span class="r" style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;opacity:.8">Next at the range</span><span style="background:#fff;color:#047857;border-radius:999px;padding:3px 10px;font-size:12px;font-weight:700">${nx.checked?'Checked in':'Confirmed'}</span></span><b style="font-size:18px;display:flex;gap:9px;align-items:center">${ic('cal')}${hmWhen(nx)}</b><span style="font-size:14px;opacity:.85">${hmBayLbl(nx)} · Hamoni Golf Camp</span></button>$1`);
 return h};
GUIDE.push(['range','Book a range bay at Hamoni']);
const _jump9=ACT.jump;ACT.jump=d=>{if(d.id!=='range')return _jump9(d);closeSheet();if(S.role!=='golfer'){S.role='golfer';chrome()}S.nav.golfer={tab:'home',stack:[{name:'hmRanges',p:{}}]};show('role')};
