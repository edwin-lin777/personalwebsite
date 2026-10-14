const fs=require('fs');
(async()=>{const pages=await(await fetch('http://localhost:9228/json')).json();const ws=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);let id=0;const pending=new Map();ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){pending.get(m.id)?.(m.result);pending.delete(m.id)}};const send=(method,params={})=>new Promise(r=>{pending.set(++id,r);ws.send(JSON.stringify({id,method,params}))});const pause=()=>new Promise(r=>setTimeout(r,1400));const ev=async expression=>(await send('Runtime.evaluate',{expression,returnByValue:true})).result?.value;
for (const width of [1440,390]) {
await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width===390});
await send('Page.navigate',{url:'http://localhost:3000'}); await pause();
console.log(width,await ev('JSON.stringify({overflow:document.documentElement.scrollWidth>innerWidth,background:getComputedStyle(document.querySelector(".car-backdrop")).backgroundImage})'));
const shot=await send('Page.captureScreenshot',{format:'png'});fs.writeFileSync(`design/ascii-${width}.png`,Buffer.from(shot.data,'base64'));
}
const transform = () => ev('getComputedStyle(document.querySelector(".car-backdrop")).transform');
const before = await transform(); await pause();
console.log('animation moves', before !== await transform());
await ev('document.querySelector(".car-motion-toggle").click()'); await pause();
const stopped = await transform(); await pause();
console.log('pause holds', stopped === await transform());
await ev('document.querySelector(".car-motion-toggle").click()'); await pause();
console.log('resume moves', stopped !== await transform());
await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
console.log('reduced motion',await ev('JSON.stringify({animation:getComputedStyle(document.querySelector(".car-backdrop")).animationName,control:getComputedStyle(document.querySelector(".car-motion-toggle")).display})'));
await send('Emulation.setEmulatedMedia',{features:[]});
ws.close()})();

