import type {IndustryKey,TabKey} from '../data/config';
export async function generate(industry:IndustryKey,task:TabKey,values:Record<string,string>){
 const r=await fetch('/api/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({industry,task:TASK_NAMES[task],values})});
 const data=await r.json(); if(!r.ok) throw new Error(data.error || 'Generation failed'); return data as {text:string;demo?:boolean};
}
const TASK_NAMES:Record<TabKey,string>={captions:'Captions',adcopy:'Ad Copy',ideas:'Content Ideas',templates:'Brand Templates',hashtags:'Hashtags & Bio'};
