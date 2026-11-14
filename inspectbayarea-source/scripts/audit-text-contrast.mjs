// Requires headless Chrome with --remote-debugging-port=9222.
// Usage: node scripts/audit-text-contrast.mjs <url> [width]
import { writeFile } from "node:fs/promises";
const [url, rawWidth = "1280"] = process.argv.slice(2);
if (!url) throw new Error("Provide a URL");
const width = Number(rawWidth);
const target = await (await fetch("http://localhost:9222/json/new?about:blank", { method: "PUT" })).json();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener("open", r, { once: true }));
let id = 0;
const pending = new Map();
ws.addEventListener("message", ({ data }) => {
  const m = JSON.parse(data);
  if (pending.has(m.id)) {
    pending.get(m.id)(m);
    pending.delete(m.id);
  }
});
const send = (method, params = {}) => new Promise((resolve, reject) => {
  pending.set(++id, m => m.error ? reject(new Error(JSON.stringify(m.error))) : resolve(m.result));
  ws.send(JSON.stringify({ id, method, params }));
});
const evaluate = async (expression) => {
  const response = await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (response.exceptionDetails) throw new Error(JSON.stringify(response.exceptionDetails));
  return response.result.value;
};
try {
  await send("Page.enable");
  await send("DOM.enable");
  await send("CSS.enable");
  await send("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width < 768 });
  const navigation = await send("Page.navigate", { url });
  if (navigation.errorText) throw new Error(navigation.errorText);
  // Wait for the actual application, not a browser error or an empty Vite shell.
  await evaluate(`(async()=>{for(let i=0;i<100;i++){if(document.querySelector('[data-testid="page-hero"]'))return;await new Promise(r=>setTimeout(r,100))}throw Error('Application did not render')})()`);
  await evaluate(`(async()=>{await document.fonts.ready;for(let y=0;y<document.documentElement.scrollHeight;y+=650){scrollTo(0,y);await new Promise(r=>setTimeout(r,150))}scrollTo(0,0);await new Promise(r=>setTimeout(r,700))})()`);
  const audit = `(()=>{
    const canvas=document.createElement('canvas');canvas.width=canvas.height=1;
    const ctx=canvas.getContext('2d',{willReadFrequently:true});
    const rgba=color=>{ctx.clearRect(0,0,1,1);ctx.fillStyle=color;ctx.fillRect(0,0,1,1);const c=[...ctx.getImageData(0,0,1,1).data];c[3]/=255;return c};
    const blend=(fg,bg)=>[...fg.slice(0,3).map((c,i)=>c*fg[3]+bg[i]*(1-fg[3])),1];
    const luminance=c=>c.slice(0,3).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
    const ratio=(a,b)=>(Math.max(luminance(a),luminance(b))+.05)/(Math.min(luminance(a),luminance(b))+.05);
    const hex=c=>'#'+c.slice(0,3).map(v=>Math.round(v).toString(16).padStart(2,'0')).join('');
    const backgrounds=el=>{
      let chain=[];for(let p=el;p;p=p.parentElement)chain.unshift(p);
      let colors=[[255,255,255,1]];
      for(const p of chain){
        const style=getComputedStyle(p),bg=rgba(style.backgroundColor);
        colors=colors.map(c=>blend(bg,c));
        if(style.backgroundImage.startsWith('linear-gradient')){
          const stops=style.backgroundImage.match(/(?:rgba?|oklch|oklab|hsla?|color)\\([^()]+\\)|#[a-f\\d]{3,8}/gi)||[];
          if(stops.length)colors=colors.flatMap(c=>stops.map(s=>blend(rgba(s),c)));
        }
        // The hero's patterned sibling sits above its background but below the
        // content. Later opaque text backings must cover it in this model.
        if(p.matches('[data-testid="page-hero"]')){
          const pattern=p.firstElementChild;
          if(pattern&&getComputedStyle(pattern).backgroundImage.includes('data:image/svg')){
            const alpha=Number(getComputedStyle(pattern).opacity);
            colors.push(...colors.map(c=>blend([255,255,255,alpha],c)));
          }
        }
      }
      return colors;
    };
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),rows=[];
    let node;
    while(node=walker.nextNode()){
      const text=node.textContent.trim(),el=node.parentElement;
      if(!text||!el||el.closest('script,style,noscript,[aria-hidden="true"],.sr-only'))continue;
      const rect=el.getBoundingClientRect(),style=getComputedStyle(el);
      if(rect.width<=2||rect.height<=2||!el.getClientRects().length||style.visibility!=='visible')continue;
      let transparent=false;for(let p=el;p;p=p.parentElement)if(Number(getComputedStyle(p).opacity)===0)transparent=true;
      if(transparent)continue;
      const fg=rgba(style.color),size=parseFloat(style.fontSize),weight=parseInt(style.fontWeight)||400;
      const minimum=size>=24||(size>=18.666&&weight>=700)?3:4.5;
      const backgroundsForText=backgrounds(el);
      const contrasts=backgroundsForText.map(bg=>({ratio:ratio(blend(fg,bg),bg),fg:hex(blend(fg,bg)),bg:hex(bg)})).sort((a,b)=>a.ratio-b.ratio);
      rows.push({text:text.slice(0,100),tag:el.tagName,class:el.className,size,weight,minimum,...contrasts[0]});
    }
    return {checked:rows.length,failures:rows.filter(r=>r.ratio<r.minimum),rows};
  })()`;
  const normal = await evaluate(audit);
  // Headless/touch devices can report hover:none. Exercise the authored hover
  // colours anyway, as with a mouse attached, without changing application CSS.
  await evaluate(`(()=>{
    const walk=rules=>{for(const rule of rules){
      if(rule.media&&/hover\\s*:\\s*hover/.test(rule.media.mediaText))
        rule.media.mediaText=rule.media.mediaText.replace(/\\(\\s*hover\\s*:\\s*hover\\s*\\)/g,'all');
      if(rule.cssRules)walk(rule.cssRules);
    }};
    for(const sheet of document.styleSheets){try{walk(sheet.cssRules)}catch{}}
  })()`);
  const { root } = await send("DOM.getDocument");
  const { nodeIds } = await send("DOM.querySelectorAll", { nodeId: root.nodeId, selector: "a,button" });
  for (const nodeId of nodeIds) await send("CSS.forcePseudoState", { nodeId, forcedPseudoClasses: ["hover", "focus-visible"] });
  await evaluate(`new Promise(r=>setTimeout(r,500))`);
  const hover = await evaluate(audit);
  const result = { url, width, normal, hover };
  console.log(JSON.stringify({ url, width, normal: { checked: normal.checked, failures: normal.failures }, hover: { checked: hover.checked, failures: hover.failures } }, null, 2));
  if (process.env.CONTRAST_OUTPUT) await writeFile(process.env.CONTRAST_OUTPUT, JSON.stringify(result, null, 2));
} finally {
  ws.close();
  await fetch(`http://localhost:9222/json/close/${target.id}`);
}
