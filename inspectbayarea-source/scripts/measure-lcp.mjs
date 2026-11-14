// Dependency-free Chrome DevTools lab probe. Start Chrome with remote debugging
// on port 9222. Usage: node scripts/measure-lcp.mjs <base-url> [seconds] [slugs...]
import { writeFile } from "node:fs/promises";
const [base, seconds = "50", ...slugs] = process.argv.slice(2);
const width = Number(process.env.PERF_WIDTH || 390);
const height = Number(process.env.PERF_HEIGHT || 844);
const fontDelay = Number(process.env.PERF_FONT_DELAY || 0);
if (!base) throw new Error("Provide a base URL");
const results = [];
for (const slug of slugs.length ? slugs : ["newark", "woodside", "palo-alto"]) {
  const target = await (await fetch("http://localhost:9222/json/new?about:blank", { method: "PUT" })).json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve) => ws.addEventListener("open", resolve, { once: true }));
  let id = 0;
  const pending = new Map();
  ws.addEventListener("message", ({ data }) => {
    const message = JSON.parse(data);
    if (message.id && pending.has(message.id)) {
      pending.get(message.id)(message);
      pending.delete(message.id);
    }
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const n = ++id;
    pending.set(n, (r) => r.error ? reject(new Error(JSON.stringify(r.error))) : resolve(r.result));
    ws.send(JSON.stringify({ id: n, method, params }));
  });
  if (fontDelay) {
    ws.addEventListener("message", ({ data }) => {
      const message = JSON.parse(data);
      if (message.method === "Fetch.requestPaused") {
        setTimeout(() => send("Fetch.continueRequest", { requestId: message.params.requestId }).catch(console.error), fontDelay);
      }
    });
    await send("Fetch.enable", { patterns: [{ urlPattern: "*.woff2", requestStage: "Request" }] });
  }
  await send("Page.enable");
  await send("Network.enable");
  await send("Network.setCacheDisabled", { cacheDisabled: true });
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 768 });
  await send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: 1600000 / 8, uploadThroughput: 750000 / 8 });
  await send("Page.addScriptToEvaluateOnNewDocument", { source: `
    window.__lcp=[];window.__errors=[];window.__shifts=[];window.__cls=0;
    let session=0,first=0,last=0;
    new PerformanceObserver(list=>{for(const e of list.getEntries()){
      if(e.hadRecentInput)continue;
      if(last&&e.startTime-last<1000&&e.startTime-first<5000){session+=e.value}
      else{session=e.value;first=e.startTime}
      last=e.startTime;window.__cls=Math.max(window.__cls,session);
      window.__shifts.push({ms:e.startTime,value:e.value,sources:e.sources.map(s=>({
        tag:s.node?.tagName,text:s.node?.textContent?.slice(0,100),before:s.previousRect,after:s.currentRect
      }))});
    }}).observe({type:'layout-shift',buffered:true});
    addEventListener('error',e=>window.__errors.push(e.message));
    new PerformanceObserver(list=>{for(const e of list.getEntries())window.__lcp.push({
      ms:e.startTime,size:e.size,url:e.url,tag:e.element?.tagName,text:e.element?.textContent?.slice(0,160),
      html:e.element?.outerHTML?.slice(0,350)
    })}).observe({type:'largest-contentful-paint',buffered:true});`
  });
  const url = `${base.replace(/\/$/, "")}/service-areas/${slug}`;
  const navigation = await send("Page.navigate", { url });
  if (navigation.errorText) {
    ws.close();
    await fetch(`http://localhost:9222/json/close/${target.id}`);
    throw new Error(`Navigation failed for ${url}: ${navigation.errorText}`);
  }
  await new Promise((resolve) => setTimeout(resolve, Number(seconds) * 1000));
  // Optional whole-page pass to exercise lazy images without clicking anything.
  if (process.env.PERF_SCROLL) {
    await send("Runtime.evaluate", {
      expression: `(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=innerHeight*.75){scrollTo(0,y);await new Promise(r=>setTimeout(r,350))}await new Promise(r=>setTimeout(r,2000))})()`,
      awaitPromise: true,
    });
  }
  const value = await send("Runtime.evaluate", { expression: `JSON.stringify({
    isApp:!!document.querySelector('#root'),lcp:window.__lcp,cls:window.__cls,shifts:window.__shifts,errors:window.__errors,
    media:[...document.querySelectorAll('img,iframe,embed,object,video')].map(e=>({tag:e.tagName,src:e.getAttribute('src'),width:e.getAttribute('width'),height:e.getAttribute('height'),renderedWidth:e.getBoundingClientRect().width,renderedHeight:e.getBoundingClientRect().height})),
    navigation:performance.getEntriesByType('navigation').map(n=>({ttfb:n.responseStart,dom:n.domContentLoadedEventEnd,load:n.loadEventEnd,transfer:n.transferSize})),
    images:[...document.images].filter(i=>!i.currentSrc.startsWith('data:')).map(i=>({src:i.currentSrc,width:i.width,naturalWidth:i.naturalWidth,loading:i.loading})),
    resources:performance.getEntriesByType('resource').filter(r=>r.initiatorType==='script'||r.initiatorType==='link').map(r=>({name:r.name,ms:r.duration,bytes:r.transferSize}))
  })`, returnByValue: true });
  const result = { slug, url, conditions: { width, height, cpu: 4, latency: 150, mbps: 1.6, fontDelay }, ...JSON.parse(value.result.value) };
  if (!result.isApp) throw new Error(`Application HTML missing at ${url}; refusing to report a browser error page as an LCP result`);
  results.push(result);
  console.log(JSON.stringify(result));
  ws.close();
  await fetch(`http://localhost:9222/json/close/${target.id}`);
}
if (process.env.LCP_OUTPUT) await writeFile(process.env.LCP_OUTPUT, JSON.stringify(results, null, 2));
