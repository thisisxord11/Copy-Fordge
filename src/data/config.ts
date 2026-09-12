export type TabKey='captions'|'adcopy'|'ideas'|'templates'|'hashtags';
export const INDUSTRIES = {
 clothing:{name:'Clothing Brand',icon:'✦',tagline:'AI content studio tuned for fashion brands.'},
 restaurant:{name:'Restaurant',icon:'◈',tagline:'AI content studio tuned for restaurants and cafes.'},
 carshowroom:{name:'Car Showroom',icon:'◇',tagline:'AI content studio tuned for dealerships.'},
 salon:{name:'Salon & Beauty',icon:'✧',tagline:'AI content studio tuned for beauty businesses.'},
 realestate:{name:'Real Estate',icon:'▣',tagline:'AI content studio tuned for property businesses.'},
 gym:{name:'Gym & Fitness',icon:'▲',tagline:'AI content studio tuned for fitness brands.'},
 electronics:{name:'Electronics Store',icon:'⌁',tagline:'AI content studio tuned for technology stores.'},
 bakery:{name:'Bakery & Sweets',icon:'◆',tagline:'AI content studio tuned for bakeries and sweet shops.'},
 jewelry:{name:'Jewelry Brand',icon:'◇',tagline:'AI content studio tuned for jewelry brands.'}
} as const;
export type IndustryKey=keyof typeof INDUSTRIES;
export const TABS:Record<TabKey,{title:string;description:string;fields:{id:string;label:string;type:'text'|'select';placeholder?:string;options?:string[]}[]}>={
 captions:{title:'Captions',description:'Generate ready-to-post social captions from your business details.',fields:[{id:'product',label:'Product / service',type:'text',placeholder:'e.g. New product or service'},{id:'platform',label:'Platform',type:'select',options:['Instagram','TikTok','Facebook','Pinterest']},{id:'tone',label:'Brand tone',type:'select',options:['Minimal & premium','Bold & energetic','Friendly & casual','Professional','Playful']},{id:'detail',label:'Key detail',type:'text',placeholder:'e.g. new launch, discount, limited stock'}]},
 adcopy:{title:'Ad Copy',description:'Create short paid-social advertisements with strong hooks and CTAs.',fields:[{id:'campaign',label:'Campaign name',type:'text',placeholder:'e.g. Summer Sale'},{id:'offer',label:'Offer / hook',type:'text',placeholder:'e.g. 20% off'},{id:'audience',label:'Target audience',type:'text',placeholder:'e.g. young professionals'},{id:'platform',label:'Platform',type:'select',options:['Instagram','Facebook','TikTok','Google Ads']}]},
 ideas:{title:'Content Ideas',description:'Build a complete week of content ideas around your current business focus.',fields:[{id:'category',label:'Business category',type:'text',placeholder:'e.g. luxury fashion'},{id:'focus',label:'Current focus',type:'text',placeholder:'e.g. new collection'},{id:'platform',label:'Main platform',type:'select',options:['Instagram','TikTok','Facebook','YouTube']}]},
 templates:{title:'Brand Templates',description:'Create reusable copy frameworks that your brand can use again and again.',fields:[{id:'purpose',label:'Template purpose',type:'text',placeholder:'e.g. product launch'},{id:'tone',label:'Brand tone',type:'select',options:['Premium','Friendly','Bold','Minimal','Professional']},{id:'details',label:'Important details',type:'text',placeholder:'e.g. offer, location, CTA'}]},
 hashtags:{title:'Hashtags & Bio',description:'Generate Instagram bio options and useful hashtag groups.',fields:[{id:'brandname',label:'Brand name',type:'text',placeholder:'e.g. My Brand'},{id:'niche',label:'What you sell',type:'text',placeholder:'e.g. premium handmade clothing'},{id:'location',label:'Location',type:'text',placeholder:'e.g. Islamabad, Pakistan'}]}
};
