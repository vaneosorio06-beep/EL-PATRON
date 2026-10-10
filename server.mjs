import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=fileURLToPath(new URL('.',import.meta.url));
const allowed=new Map([['/','index.html'],['/index.html','index.html'],['/app.js','app.js'],['/styles.css','styles.css'],['/core.js','core.js']]);
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css'};
const port=Number(process.env.PORT||3000);
http.createServer(async(req,res)=>{
 const file=allowed.get(new URL(req.url,'http://localhost').pathname);
 if(!file){res.writeHead(404);res.end('No encontrado');return;}
 try{const data=await readFile(path.join(root,file));res.writeHead(200,{'Content-Type':mime[path.extname(file)]+'; charset=utf-8','X-Content-Type-Options':'nosniff','Cache-Control':'no-cache'});res.end(data);}catch{res.writeHead(500);res.end('Error al leer el archivo');}
}).listen(port,'0.0.0.0',()=>console.log(`El Patrón disponible en el puerto ${port}`));
