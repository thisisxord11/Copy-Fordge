import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
const port = Number(process.env.PORT || 8787);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.json({ limit: '100kb' }));

const safe = (v, max=800) => String(v ?? '').trim().slice(0,max);

function demoContent(industry, task, values) {
  const product = safe(values.product || values.campaign || values.category || values.brandname || 'your business');
  const detail = safe(values.detail || values.offer || values.focus || values.details || values.niche || 'something worth discovering');
  const platform = safe(values.platform || 'social media');
  if (task === 'Captions') return [
    `01 — ${product} is here to make ${detail} feel simple. Discover the difference and make it yours. #${platform.replace(/\W/g,'')}`,
    `02 — A fresh reason to choose ${product}. Built for people who care about quality, detail and a better experience.`,
    `03 — Your next favorite starts with ${product}. Save this post and explore what makes it special.`,
    `04 — Good products get attention. Great details get remembered. Meet ${product}.`,
    `05 — Made for ${industry.toLowerCase()}, shaped around real customers. ${detail} is only the beginning.`
  ].join('\n\n');
  if (task === 'Ad Copy') return [
    `Variant 1\nHeadline: ${product} worth stopping for\nPrimary text: Discover ${detail} with a clear reason to try something better.\nCTA: Shop now`,
    `Variant 2\nHeadline: Make your next choice count\nPrimary text: Meet ${product} — designed around what your audience actually wants.\nCTA: Discover more`,
    `Variant 3\nHeadline: A better way to choose\nPrimary text: ${detail}. See why customers are paying attention.\nCTA: Get started`
  ].join('\n\n');
  if (task === 'Content Ideas') return Array.from({length:7},(_,i)=>`Day ${i+1}: ${['Behind the scenes','Customer question','Product spotlight','Quick tip','Myth vs fact','Founder story','Community/poll'][i]} — connect it to ${detail}.`).join('\n\n');
  if (task === 'Brand Templates') return [
    `Template 01 — Product Launch\nHook: Meet [PRODUCT].\nValue: [KEY BENEFIT].\nProof: [REASON TO TRUST].\nCTA: [ACTION].`,
    `Template 02 — Offer\nHook: [OFFER] for a limited time.\nValue: [WHAT THEY GET].\nUrgency: [DEADLINE/SCARCITY].\nCTA: [ACTION].`,
    `Template 03 — Educational\nQuestion: Did you know [FACT]?\nTip: [USEFUL TIP].\nBrand link: [WHY YOUR BUSINESS CARES].\nCTA: [ACTION].`
  ].join('\n\n');
  return [
    `Bio 01: ${product} • ${detail} • Built for people who expect more. DM us to explore.`,
    `Bio 02: ${product} | ${industry} | Quality, detail & a better customer experience.`,
    `Bio 03: Helping you discover ${detail}. Follow for ideas, launches and useful updates.`,
    `Hashtags: #${product.replace(/\W/g,'')} #${industry.replace(/\W/g,'')} #BrandStory #ContentCreator #Business #NewDrop #DiscoverMore`
  ].join('\n\n');
}

app.get('/api/health', (_req,res)=>res.json({ok:true, ai:Boolean(process.env.ANTHROPIC_API_KEY)}));

app.post('/api/generate', async (req,res)=>{
  try {
    const industry=safe(req.body.industry,100), task=safe(req.body.task,100), values=req.body.values || {};
    if(!industry || !task) return res.status(400).json({error:'Industry and task are required.'});
    if(!process.env.ANTHROPIC_API_KEY) return res.json({text:demoContent(industry,task,values), demo:true});
    const prompt = `You are an expert social media content writer.\nBusiness industry: ${industry}\nTask: ${task}\nBusiness information: ${JSON.stringify(values)}\nCreate high-quality, useful, original content. For captions create 5 distinct captions. For ad copy create 3 variants with headline, primary text and CTA. For content ideas create a 7-day content plan. For templates create 3 reusable templates. For hashtags and bio create 3 bio options and 3 hashtag sets. Keep writing natural and specific. Avoid generic filler. Return ONLY the content.`;
    const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'content-type':'application/json','x-api-key':process.env.ANTHROPIC_API_KEY,'anthropic-version':'2023-06-01'},body:JSON.stringify({model:process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6',max_tokens:1800,messages:[{role:'user',content:prompt}]})});
    const data=await r.json();
    if(!r.ok) return res.status(r.status).json({error:data?.error?.message || `AI request failed (${r.status})`});
    const text=(data.content || []).map(x=>x.text || '').join('\n').trim();
    if(!text) return res.status(502).json({error:'The AI returned no content.'});
    res.json({text,demo:false});
  } catch(e){res.status(500).json({error:e.message || 'Server error'});}
});

app.use(express.static(path.join(__dirname,'../dist')));
app.get('*',(req,res)=>res.sendFile(path.join(__dirname,'../dist/index.html')));
app.listen(port,()=>console.log(`Copyforge API: http://localhost:${port}`));
