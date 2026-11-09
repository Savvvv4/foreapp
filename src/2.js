/* ---------- icons ---------- */
const P={sun:'M12 17a5 5 0 100-10 5 5 0 000 10zM12 1v2M12 21v2M4.200 4.200l1.400 1.400M18.400 18.400l1.400 1.400M1 12h2M21 12h2M4.200 19.800l1.400-1.400M18.400 5.600l1.400-1.400',moon:'M21 12.800A9 9 0 1111.200 3a7 7 0 009.800 9.800z',home:'M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z',flag:'M6 21V4m0 1c5-3 8 2 13 0v9c-5 2-8-3-13 0',cal:'M4 6h16v15H4zM4 10h16M8 3v4M16 3v4',users:'M9 11a4 4 0 100-8 4 4 0 000 8zM2 21c0-4 3-7 7-7s7 3 7 7M17 4a4 4 0 010 7M18 14c3 1 4 4 4 7',trend:'M3 17l6-6 4 4 8-9M15 6h6v6',wallet:'M3 7h16a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2zM3 7l13-4v4M16 14h2',list:'M8 6h13M8 12h13M8 18h13M3 6h1M3 12h1M3 18h1',bell:'M6 9a6 6 0 1112 0c0 7 3 8 3 8H3s3-1 3-8M10 21h4',msg:'M21 12a8 8 0 01-12 7l-6 2 2-6a8 8 0 1116-3z',search:'M11 18a7 7 0 100-14 7 7 0 000 14zM21 21l-5-5',heart:'M12 20s-8-5-8-11a4.5 4.5 0 018-3 4.5 4.5 0 018 3c0 6-8 11-8 11z',back:'M15 5l-7 7 7 7',chev:'M9 5l7 7-7 7',x:'M6 6l12 12M18 6L6 18',check:'M5 12.5l5 5L20 7',star:'M12 3l2.8 5.8 6.2.8-4.6 4.4 1.2 6.3L12 17.2 6.4 20.300l1.2-6.300L3 9.600l6.200-.8z',pin:'M12 21s7-6.500 7-12a7 7 0 10-14 0c0 5.500 7 12 7 12zM12 11.500a2.500 2.500 0 100-5 2.500 2.500 0 000 5z',clock:'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2',plus:'M12 5v14M5 12h14',lock:'M6 11h12v10H6zM8 11V7a4 4 0 118 0v4',play:'M7 4l13 8-13 8z',filter:'M4 6h16M7 12h10M10 18h4',share:'M12 3v13M7 8l5-5 5 5M5 14v7h14v-7',shield:'M12 3l8 3v6c0 5-3.500 8-8 9-4.500-1-8-4-8-9V6z',target:'M12 21a9 9 0 100-18 9 9 0 000 18zM12 16a4 4 0 100-8 4 4 0 000 8z',card:'M3 6h18v13H3zM3 10h18',video:'M3 6h13v12H3zM16 10l5-3v10l-5-3',mic:'M12 3a3 3 0 00-3 3v6a3 3 0 006 0V6a3 3 0 00-3-3zM5 11a7 7 0 0014 0M12 18v3',info:'M12 21a9 9 0 100-18 9 9 0 000 18zM12 11v5M12 8h.01',grid:'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',undo:'M4 9h11a5 5 0 010 10H9M4 9l4-4M4 9l4 4',bars:'M5 20V10M12 20V4M19 20v-7',send:'M4 12l17-8-7 17-2.500-7z',child:'M12 9a3.500 3.500 0 100-7 3.500 3.500 0 000 7zM5 22c0-6 3-9 7-9s7 3 7 9'};
const ic=(n,x='')=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${x}><path d="${P[n]}"/></svg>`;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function hashN(s){let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}

/* ---------- sample data ---------- */
const NOW=8*60+10, T=[360,420,480,540,960,1020,1080];
const COACHES={
 arjun:{id:'arjun',name:'Arjun Rao',init:'AR',title:'NGAI Category A Coach',yrs:12,rate:4.9,rev:312,lessons:'1,140',reply:'1 hr',venue:'Aravalli Practice Range',area:'Sector 59',km:3.2,price:3000,goals:['full','junior'],good:'Juniors and full swing',badges:['Top Coach 2026','Founding Coach'],quals:['NGAI Category A Coach','Trackman Certified Professional','Level 2 Junior Coaching'],about:'I work with juniors and club golfers who want a swing they can trust under pressure. Every lesson ends with one clear thing to work on.',pk:[{id:'trial',n:'Trial lesson',d:'45 min, first time only',p:800},{id:'one',n:'Single lesson',d:'60 min',p:3000},{id:'six',n:'6-lesson package',d:'₹2,700 per lesson',p:16200,c:6},{id:'twelve',n:'12-lesson package',d:'₹2,500 per lesson',p:30000,c:12}]},
 meher:{id:'meher',name:'Meher Sandhu',init:'MS',title:'NGAI Category B Coach',yrs:7,rate:4.8,rev:96,lessons:'410',reply:'2 hrs',venue:'Golfers’ Green',area:'Sector 28',km:5.4,price:1800,goals:['start','short'],good:'Beginners and women golfers',badges:['Top Coach 2026'],quals:['NGAI Category B Coach','Rules of Golf certificate'],about:'If you have never held a club, start here. We keep it simple, and you will hit good shots in your first lesson.',},
 dev:{id:'dev',name:'Dev Nair',init:'DN',title:'Short game specialist',yrs:9,rate:4.9,rev:141,lessons:'620',reply:'1 hr',venue:'Sohna Road Golf Centre',area:'Sohna Road',km:7.1,price:2400,goals:['short','putt'],good:'Short game and putting',badges:[],quals:['NGAI Category A Coach','Putting specialist course'],about:'Most handicaps come down inside 100 metres. We work on wedges, chipping and a putting routine that holds up.'},
 ishaan:{id:'ishaan',name:'Ishaan Verma',init:'IV',title:'Junior performance coach',yrs:6,rate:4.7,rev:58,lessons:'290',reply:'3 hrs',venue:'Aravalli Practice Range',area:'Sector 59',km:3.2,price:2800,goals:['junior','full'],good:'Competitive juniors',badges:['Founding Coach'],quals:['NGAI Category B Coach','Sports science diploma'],about:'I prepare juniors for IGU and US Kids events, with a plan parents can follow.'},
 farah:{id:'farah',name:'Farah Qureshi',init:'FQ',title:'Beginner coach',yrs:4,rate:4.8,rev:44,lessons:'180',reply:'1 hr',venue:'Golfers’ Green',area:'Sector 28',km:5.4,price:1500,goals:['start'],good:'Complete beginners',badges:[],quals:['NGAI Level 1 Coach'],about:'Relaxed lessons for adults starting golf later in life. Clubs provided for your first three lessons.'},
 nikhil:{id:'nikhil',name:'Nikhil Bose',init:'NB',title:'On-course coach',yrs:15,rate:5.0,rev:22,lessons:'95',reply:'4 hrs',venue:'Sohna Road Golf Centre',area:'Sohna Road',km:7.1,price:3500,goals:['course','full'],good:'Course management',badges:['New on Fore!'],quals:['Former touring professional','NGAI Category A Coach'],about:'We play nine holes together and decide every shot out loud. Most golfers save strokes without changing their swing.'}
};
Object.values(COACHES).forEach(c=>{if(!c.pk)c.pk=[{id:'trial',n:'Trial lesson',d:'45 min, first time only',p:Math.round(c.price*.4/100)*100},{id:'one',n:'Single lesson',d:'60 min',p:c.price},{id:'six',n:'6-lesson package',d:'Save 10%',p:Math.round(c.price*5.4/100)*100,c:6}]});
const GOALS=[['all','Any goal'],['start','Just starting'],['full','Full swing'],['short','Short game'],['putt','Putting'],['junior','Juniors'],['course','On-course']];
const REVIEWS=[['Aditya S.',5,'Fixed my slice in two lessons, and I knew exactly what to practise between them.','2 weeks ago'],['Priya M.',5,'Kabir looks forward to every lesson. The notes help me keep him on track.','1 month ago'],['Vikram J.',4,'Very clear. Morning slots go fast, so book early.','1 month ago']];
const STUD={
 kabir:{id:'kabir',name:'Kabir Kapoor',first:'Kabir',init:'KK',age:14,level:'Scratch junior',junior:true,parent:'Aditi Kapoor',src:'invited'},
 aditi:{id:'aditi',name:'Aditi Kapoor',first:'Aditi',init:'AK',level:'Handicap 24',src:'fore'},
 meera:{id:'meera',name:'Meera Pillai',first:'Meera',init:'MP',level:'Handicap 12',src:'invited'},
 rohan:{id:'rohan',name:'Rohan Malhotra',first:'Rohan',init:'RM',level:'Handicap 18',src:'fore'},
 sana:{id:'sana',name:'Sana Mirza',first:'Sana',init:'SM',level:'Beginner',src:'fore',isNew:true},
 aditya:{id:'aditya',name:'Aditya Singh',first:'Aditya',init:'AS',level:'Handicap 8',src:'invited'},
 vikram:{id:'vikram',name:'Vikram Joshi',first:'Vikram',init:'VJ',level:'Handicap 15',src:'invited',quiet:true},
 tara:{id:'tara',name:'Tara Menon',first:'Tara',init:'TM',age:11,level:'Junior',junior:true,parent:'Rahul Menon',src:'invited'}
};
const WEEK_SEED=[[1,420,'meera'],[1,480,'rohan'],[1,540,'aditya'],[1,1080,'tara'],[2,360,'aditya'],[2,420,'rohan'],[2,1020,'meera'],[2,1080,'sana'],[3,420,'tara'],[3,480,'meera'],[3,960,'aditya'],[4,360,'rohan'],[4,540,'sana'],[4,1020,'tara'],[5,360,'meera'],[5,420,'aditya'],[5,480,'rohan'],[5,540,'tara'],[5,960,'sana'],[6,420,'rohan'],[6,480,'meera'],[6,960,'aditya']];
let S,uid=1;
function seed(){
  const L=[];let n=()=>'l'+(uid++);
  const add=(student,coach,d,t,status,extra={})=>{const l=Object.assign({id:n(),student,coach,d,t,dur:60,status,price:2700,pkg:'six'},extra);L.push(l);return l};
  add('kabir','arjun',-21,1020,'done',{note:{focus:'Set your grip the same way every time, before each swing.',worked:['Grip','Setup'],tasks:[{t:'20 grip resets at home',done:true},{t:'Mirror check, 5 minutes',done:true}],parent:true,when:-21},rated:5});
  add('kabir','arjun',-14,1020,'done',{note:{focus:'Finish facing the target with your weight on your front foot.',worked:['Balance','Finish'],tasks:[{t:'30 half swings, hold the finish',done:true},{t:'Feet-together drill',done:true}],parent:true,when:-14},rated:5});
  add('kabir','arjun',-7,1020,'done',{note:{focus:'Keep your head inside the circle as you turn back.',worked:['Head position','Takeaway'],tasks:[{t:'30 slow backswings against a wall',done:true},{t:'Film 5 swings from behind',done:false},{t:'Range session, 40 balls, 8-iron',done:false}],parent:true,when:-7}});
  add('kabir','arjun',1,990,'confirmed',{fromPack:true});
  add('aditi','meher',-6,420,'done',{price:1800,pkg:'one',note:{focus:'Let your arms hang before you take your grip.',worked:['Setup','Grip'],tasks:[{t:'10 setups in the mirror',done:false},{t:'One range visit before Sunday',done:false}],when:-6}});
  add('aditi','meher',3,420,'confirmed',{price:1800,pkg:'one'});
  add('meera','arjun',0,390,'done',{note:null,price:3000,pkg:'one'});
  add('rohan','arjun',0,540,'confirmed',{price:3000,pkg:'one'});
  add('sana','arjun',0,990,'confirmed',{price:800,pkg:'trial',isNew:true,dur:45});
  add('aditya','arjun',0,1080,'confirmed');
  WEEK_SEED.forEach(([d,t,s])=>add(s,'arjun',d,t,'confirmed',{price:3000,pkg:'one',isNew:s==='sana'&&d===2?false:undefined}));
  const open=new Set(['0:660','4:480','6:540','2:540','3:540','7:420','8:480','9:1020','10:420']);
  S={role:'golfer',who:'kabir',nav:{golfer:{tab:'home',stack:[]},coach:{tab:'today',stack:[]}},lessons:L,open,blocks:[{d:2,t:780,dur:120,label:'Physio'}],taken:new Set(),saved:new Set(['dev']),
    goal:'all',q:'',maxP:0,weekend:false,loaded:false,bk:null,failNext:false,approveNew:false,
    notifs:{golfer:[{i:'msg',t:'Coach Arjun sent a note',b:'Kabir, lesson 3: head position.',d:'7 days ago'}],coach:[{i:'star',t:'New review, 5 stars',b:'Aditya S. rated his lesson.',d:'Yesterday'}]},
    unread:{golfer:0,coach:0},pending:{golfer:[],coach:[]},
    chats:{'arjun:kabir':[['c','Good work on Saturday, Kabir. Send me a swing from behind if you can.'],['g','Will do, thanks coach']],'meher:aditi':[['c','See you Sunday at 7. Wear soft spikes if you have them.']],'arjun:vikram':[['g','Travelling this month, coach. Will book soon.']]},
    rounds:{kabir:[['Aravalli Links',76,31,-34],['Sohna Road',74,30,-21],['Aravalli Links',73,29,-12],['DLF Par 3',72,30,-5]],aditi:[['Golfers’ Green',104,41,-19],['Golfers’ Green',101,39,-3]]},
    packs:[{student:'kabir',coach:'arjun',total:6,used:3}],invited:4,calMode:'week',calDay:0,seg:{lessons:'up',earn:'overview',stu:'all',book:'coaches'},
    weeks:[48000,56000,41000,62000,58000,64000],notify:new Set(),noteDraft:null,toggles:{rem:true,wa:true,news:false}};
}
const coach=id=>COACHES[id], stud=id=>STUD[id], ME=COACHES.arjun;
const money=n=>'₹'+Number(n).toLocaleString('en-IN');
const dayD=d=>{const x=new Date();x.setHours(0,0,0,0);x.setDate(x.getDate()+d);return x};
const WD=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],MO=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const dLong=d=>{const x=dayD(d);return `${WD[x.getDay()]} ${x.getDate()} ${MO[x.getMonth()]}`};
const dLbl=d=>d===0?'Today':d===1?'Tomorrow':d===-1?'Yesterday':dLong(d);
const fT=m=>{let h=Math.floor(m/60),mi=m%60,a=h>=12?'PM':'AM';h=h%12||12;return `${h}:${String(mi).padStart(2,'0')} ${a}`};
const fS=m=>{let h=Math.floor(m/60)%12||12;return `${h}:${String(m%60).padStart(2,'0')}`};
const ago=d=>d===0?'today':d===-1?'yesterday':`${-d} days ago`;
const initOf=s=>stud(s).init;
const isOpen=(c,d,t)=>{ if(d===0&&t<=NOW)return false;if(d*1440+t-NOW<(S.minNotice||0)*60)return false;
  if(c==='arjun')return S.open.has(d+':'+t);
  if(S.taken.has(c+d+':'+t))return false;return (hashN(c+d+t)%100)<46};
function slotsOf(c,n=4){const o=[];for(let d=0;d<14&&o.length<n;d++)for(const t of (c==='arjun'?[360,420,480,540,600,660,960,1020,1080]:T)){if(isOpen(c,d,t)&&o.length<n)o.push([d,t])}return o}
const timesFor=c=>c==='arjun'?[360,420,480,540,660,960,1020,1080]:T;
const upcoming=(f)=>S.lessons.filter(l=>['confirmed','requested','proposed','approval'].includes(l.status)&&f(l)).sort((a,b)=>a.d-b.d||a.t-b.t);
const past=(f)=>S.lessons.filter(l=>l.status==='done'&&f(l)).sort((a,b)=>b.d-a.d||b.t-a.t);
const lesson=id=>S.lessons.find(l=>l.id===id);
const lastNote=who=>past(l=>l.student===who&&l.note)[0];
const pkOf=l=>coach(l.coach).pk.find(p=>p.id===l.pkg);
const packLeft=p=>p.total-p.used-S.lessons.filter(l=>l.fromPack&&l.student===p.student&&l.coach===p.coach&&['confirmed','requested','proposed','approval'].includes(l.status)).length;
const clashAt=(d,t,dur,ign)=>S.lessons.some(l=>l.coach==='arjun'&&l.status!=='cancelled'&&l.status!=='approval'&&l.d===d&&l.id!==ign&&t<l.t+l.dur&&l.t<t+dur)||S.blocks.some(b=>b.d===d&&t<b.t+b.dur&&b.t<t+dur);
const lessonNo=l=>S.lessons.filter(x=>x.student===l.student&&x.coach===l.coach&&x.status!=='cancelled'&&(x.d<l.d||(x.d===l.d&&x.t<=l.t))).length;
const packFor=l=>S.packs.find(p=>p.student===l.student&&p.coach===l.coach);
const holes=(total,used,next)=>`<div class="holes">${Array.from({length:total},(_,i)=>`<i class="${i<used?'d':i===next?'n':''}">${i+1}</i>`).join('')}</div>`;
const soon=()=>`<span class="soon">Soon</span>`;
const av=(init,c='')=>`<span class="av ${c}">${init}</span>`;
const mono=c=>`<span class="pic" style="width:48px;height:48px;border-radius:14px">${portrait(c)}</span>`;
const SOON={
 tee:['Tee times','Book a round at partner courses, in the same place as your lessons. This opens when facilities go live on Fore!.'],
 range:['Range bays','Reserve a bay and buy practice packages at your range. This opens when facilities go live on Fore!.'],
 video:['Swing video','Film a swing and send it to your coach. They slow it down, draw on it and reply with their voice.'],
 sg:['Strokes gained','See where you lose shots against golfers at your level, with one drill to fix the biggest leak.'],
 drills:['Drills and challenges','Coach-set drills with targets, plus short-game challenges with friends and a leaderboard.'],
 pro:['Fore! Pro','Deeper stats and video tools for golfers who want more. Everything you already use stays free.'],
 online:['Online lessons','Live video lessons with your coach when you cannot get to the range.'],
 voice:['Voice notes','Talk through the lesson instead of typing. Your student gets a short audio note.'],
 gcal:['Calendar sync','Two-way sync with Google Calendar, so a personal event blocks your Fore! slots.'],
 routine:['Practice routines','Assign a routine with targets and see each student’s scores before they walk in.'],
 squads:['Squads and academies','Run groups and bring your whole coaching team onto one record.'],
 saved:['Saved payment','Keep your UPI ID and cards for a one-tap checkout.'],
 group:['Group lessons','Book a group lesson and split the cost with friends.'],
 mile:['Junior milestones','Age-group benchmarks so parents can see what good looks like at each stage.'],
 child:['Add a child','A parent sets up each junior profile and gives consent before any of the child’s data is stored.'],
 intro:['Intro video','A short video from the coach on their profile.']
};
