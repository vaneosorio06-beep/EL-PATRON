export const categories=['Platos','Interior','Ambiente','Eventos','Personas'];
export const uid=()=>crypto.randomUUID();
export const escapeHTML=(v)=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function promptFor(campaign,style,mode,notes){return `BRIEF — ${campaign.name}
Evento: ${campaign.event||'Campaña gastronómica'}
Fecha: ${campaign.date||'Por definir'}
Objetivo: ${campaign.objective}
Dirección visual: ${style.name}. ${style.description}
${mode==='real'?'MODO PERSONAS REALES: preservar identidad, rostro, expresión, anatomía y proporciones corporales de cada persona. No modificar intencionadamente rostros ni cuerpos. Editar únicamente luz, color, fondo y encuadre. Revisar manualmente la fidelidad antes de aprobar.':'MODO MODELOS VIRTUALES: integrar personas adultas ficticias, sin imitar a personas reales. Anatomía natural, iluminación y perspectiva coherentes. Identificar la pieza como composición con modelos virtuales.'}
Fotografía gastronómica cinematográfica realista: texturas auténticas, comida fiel a la foto original, luz lateral suave y color consistente. No inventar ingredientes ni promesas comerciales.
Formato Instagram, composición con espacio para texto y márgenes de seguridad.
Indicaciones: ${notes||'Destacar la hospitalidad y los sabores colombianos.'}
Revisión humana obligatoria antes de exportar. No publicar automáticamente.`;}
export function moveItem(items,index,delta){const target=index+delta;if(target<0||target>=items.length)return items;const next=[...items];[next[index],next[target]]=[next[target],next[index]];return next;}
export function durationTotal(scenes){return scenes.reduce((n,s)=>n+Number(s.duration||0),0);}
