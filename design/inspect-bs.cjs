const fs=require('fs');
(async()=>{const pages=await(await fetch('http://localhost:9228/json')).json();const ws=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);let id=0;const pending=new Map();ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id){pending.get(m.id)?.(m.result);pending.delete(m.id)}};const send=(method,params={})=>new Promise(r=>{pending.set(++id,r);ws.send(JSON.stringify({id,method,params}))});const pause=()=>new Promise(r=>setTimeout(r,1400));const ev=async expression=>(await send('Runtime.evaluate',{expression,returnByValue:true})).result?.value;
await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
await send('Page.navigate',{url:'https://bs-liquidity.com/'}); await new Promise(r=>setTimeout(r,7000));
console.log(await ev('document.body.innerText'));
console.log(await ev('[...document.querySelectorAll("a")].map(a=>({text:a.innerText,url:a.href}))'));
console.log(await ev('[...document.querySelectorAll("input,select")].map(e=>({tag:e.tagName,name:e.name,type:e.type,placeholder:e.placeholder}))'));
const shot=await send('Page.captureScreenshot',{format:'png'});fs.writeFileSync('design/bs-liquidity-live.png',Buffer.from(shot.data,'base64'));
ws.close()})();
