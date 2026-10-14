const fs=require('fs');
(async()=>{const pages=await(await fetch('http://localhost:9228/json')).json();const ws=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);let id=0;const pending=new Map();ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){pending.get(m.id)?.(m.result);pending.delete(m.id)}};const send=(method,params={})=>new Promise(r=>{pending.set(++id,r);ws.send(JSON.stringify({id,method,params}))});const pause=()=>new Promise(r=>setTimeout(r,1400));const ev=async expression=>(await send('Runtime.evaluate',{expression,returnByValue:true})).result?.value;
for (const width of [1440,390]) {
await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width===390});
await send('Page.navigate',{url:'http://localhost:3000'});await pause();
for (const tab of ['projects','hackathons']) {
await ev(`document.querySelector('#${tab}-tab').click()`);await pause();
const cards=await ev('[...document.querySelectorAll(".work-card")].map(a=>({href:a.getAttribute("href"),left:a.offsetLeft}))');
console.log(width,tab,cards.map(c=>c.href));
for(let i=0;i<cards.length;i++){
await ev(`(()=>{const rail=document.querySelector('.work-rail');const card=rail.children[${i}];rail.scrollLeft=card.offsetLeft-rail.children[0].offsetLeft;})()`);await pause();
const shot=await send('Page.captureScreenshot',{format:'png'});fs.writeFileSync(`design/work-${width}-${tab}-${i}.png`,Buffer.from(shot.data,'base64'));
}
console.log('overflow',await ev('document.documentElement.scrollWidth>innerWidth'));
}
for (const slug of ['bs-liquidity','rewards-engine','steel-imports','navis','aipm']) {
await send('Page.navigate',{url:'http://localhost:3000/projects/'+slug});await pause();
console.log(width,slug,await ev('({heading:document.querySelector("h1")?.innerText,overflow:document.documentElement.scrollWidth>innerWidth,images:document.querySelectorAll(".gallery-image img,.gallery-image image").length,live:document.querySelector(".action-link")?.href})'));
if(slug==='bs-liquidity'||slug==='steel-imports'){const shot=await send('Page.captureScreenshot',{format:'png'});fs.writeFileSync(`design/detail-${width}-${slug}.png`,Buffer.from(shot.data,'base64'));}
const options=await ev('document.querySelectorAll(".image-options button").length');
if(options>1){await ev('document.querySelector(".image-options button:last-child").click()');console.log('gallery changed',await ev('document.querySelector(".image-options button:last-child").getAttribute("aria-pressed")'));}
}
}
ws.close()})();
