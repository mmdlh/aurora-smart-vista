export function pageHead(name:string, description:string) {
 const title=`${name} · 智慧车联网平台`;
 return {meta:[{title},{name:'description',content:description},{property:'og:title',content:title},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]};
}
