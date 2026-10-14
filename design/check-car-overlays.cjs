const fs=require('fs');
(async()=>{const pages=await(await fetch('http://localhost:9228/json')).json();const ws=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);let id=0;const pending=new Map();ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){pending.get(m.id)?.(m.result);pending.delete(m.id)}};const send=(method,params={})=>new Promise(r=>{pending.set(++id,r);ws.send(JSON.stringify({id,method,params}))});const pause=()=>new Promise(r=>setTimeout(r,1400));const ev=async expression=>(await send('Runtime.evaluate',{expression,returnByValue:true})).result?.value;
await send('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});
await send('Page.navigate',{url:'http://localhost:3000'});await pause();
const count=()=>ev('document.querySelectorAll(".car-backdrop text[transform]").length');
const points=await ev(`(()=>{const p=document.querySelector('.home-photo-card').getBoundingClientRect();const s=document.querySelector('.spotify-player').getBoundingClientRect();return [{name:'below Spotify',x:s.x+110,y:s.bottom+35},{name:'over photo card',x:p.x+35,y:p.y+10}];})()`);
for(const p of points){await send('Input.dispatchMouseEvent',{type:'mouseMoved',x:p.x,y:p.y});await pause();console.log(p.name,await count());const shot=await send('Page.captureScreenshot',{format:'png'});fs.writeFileSync('design/car-overlay-'+p.name.replaceAll(' ','-')+'.png',Buffer.from(shot.data,'base64'));}
const p=points[1];await send('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',clickCount:1,x:p.x,y:p.y});await send('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',clickCount:1,x:p.x,y:p.y});await pause();
console.log('photo link still works',await ev(`location.pathname === '/photography'`));
console.log('gallery sections',await ev(`[...document.querySelectorAll('.photo-section-heading h2')].map(n=>n.textContent)`));
console.log('group sizes',await ev(`[...document.querySelectorAll('.photo-section')].map(n=>n.querySelectorAll('.photo-tile').length)`));
ws.close()})();
