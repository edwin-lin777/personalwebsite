const fs=require('fs');
(async()=>{const pages=await(await fetch('http://localhost:9228/json')).json();const ws=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);let id=0;const pending=new Map();ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){pending.get(m.id)?.(m.result);pending.delete(m.id)}};const send=(method,params={})=>new Promise(r=>{pending.set(++id,r);ws.send(JSON.stringify({id,method,params}))});const pause=()=>new Promise(r=>setTimeout(r,1400));const ev=async expression=>(await send('Runtime.evaluate',{expression,returnByValue:true})).result?.value;
for (const width of [1440,390]) {
await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width===390});
await send('Page.navigate',{url:'http://localhost:3000/photography'}); await pause();
console.log(width,await ev('JSON.stringify({overflow:document.documentElement.scrollWidth>innerWidth,imageLoaded:document.querySelector(".photo-camera-ascii").naturalWidth>0})'));
const shot=await send('Page.captureScreenshot',{format:'png'});fs.writeFileSync(`design/camera-${width}.png`,Buffer.from(shot.data,'base64'));
}
ws.close()})();
