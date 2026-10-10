# El Patrón Creative Studio

Primera versión de un estudio visual para un restaurante colombiano. Interfaz en español, adaptable a móvil y ordenador, sin dependencias externas ni servicios de IA conectados.

## Cómo abrirlo, paso a paso

1. En tu ordenador, instala **Node.js 24 LTS** desde https://nodejs.org si aún no lo tienes.
2. Descarga este repositorio y descomprime la carpeta.
3. Abre una terminal en la carpeta `EL-PATRON`. En Windows puedes escribir `cmd` en la barra de dirección de esa carpeta; en macOS abre Terminal y usa `cd` seguido de la ruta de la carpeta.
4. Escribe `npm start` y pulsa Enter. **No hace falta ejecutar npm install.**
5. Abre tu navegador y escribe `http://localhost:3000`. Esta dirección funciona en el ordenador donde ejecutaste el comando.
6. Deja la terminal abierta mientras trabajas. Para detener la aplicación pulsa Ctrl+C en ella.

En el entorno cloud, el directorio es `/workspace/EL-PATRON`. La interfaz de onboarding no ofrece una vista web pública; el servidor se ha comprobado internamente. Para usarla de forma privada, descarga el proyecto y sigue los pasos anteriores. No se ha desplegado ni publicado.

Si el puerto está ocupado, detén el otro servidor o usa `PORT=3001 npm start` en macOS/Linux; en PowerShell usa `$env:PORT=3001; npm start`.

## Primera prueba guiada

1. **Campañas:** pulsa «Nueva campaña», rellena nombre, fecha, evento y objetivo. Guarda y pulsa «Abrir estudio».
2. **Fotografías:** selecciona una categoría y carga una foto JPEG, PNG o WebP (máximo 8 MB). Cambia su categoría y abre el original para comprobarlo.
3. **Briefs y prompts:** selecciona la campaña y el modo. Genera y descarga el texto. El modo real incluye instrucciones para preservar identidad y proporciones; el modo virtual pide personas adultas ficticias y una identificación de la composición.
4. **Carruseles:** añade dos diapositivas, selecciona la foto, edita títulos y textos. Usa las flechas para reordenarlas. Comprueba ambos formatos y el oscurecimiento de la foto.
5. **Storyboards:** añade escenas, cambia duración y movimiento de cámara. Comprueba el total y descarga el archivo de texto.
6. **Estilos visuales:** crea un estilo y selecciónalo desde el brief o al editar la campaña.
7. **Exportar:** selecciona una diapositiva y un formato, revisa la vista previa, marca la confirmación y descarga el PNG. Repite para cada diapositiva. Los PNG son de 1080 × 1350 o 1080 × 1920 píxeles.
8. Descarga una copia de seguridad. Recarga la página y verifica que el trabajo permanece. Puedes restaurar el JSON; esta operación sustituye el espacio actual tras pedir confirmación.

## Qué funciona y qué requiere una API

| Disponible ahora, sin API | Requiere integración externa |
| --- | --- |
| Campañas por nombre, fecha, evento y objetivo | Edición fotográfica generativa |
| Fotos originales clasificadas y vista previa | Incorporar modelos virtuales en fotografías |
| Briefs y prompts basados en plantillas | Generar o renderizar vídeos con IA |
| Carruseles con texto, encuadre central, oscurecimiento, orden y PNG | Autenticación, colaboración y sincronización cloud |
| Storyboards y estilos reutilizables | Publicación en redes (fuera del alcance solicitado) |
| Copia de seguridad y restauración JSON | |

La aplicación no cambia intencionadamente caras o cuerpos: su compositor solo recorta al centro, oscurece y superpone texto. No ofrece retoque de IA ni simula resultados generados. La biblioteca conserva los originales. Un recorte puede excluir personas; revisa cada composición. El storyboard es un plan de rodaje, no un vídeo. La exportación es individual por diapositiva, sin ZIP. Los textos extensos se ajustan, pero deben revisarse visualmente.

## Datos y privacidad

Todo el espacio se guarda en **IndexedDB del navegador**, en este dispositivo y para esta dirección. No se suben fotografías a ningún servidor. No hay cuentas ni claves API. Cambiar navegador, puerto o dispositivo crea otro espacio. El modo privado, borrar datos del navegador o falta de cuota pueden eliminar o impedir el guardado. Descarga copias periódicamente. Un JSON contiene las fotos originales; no lo compartas sin permiso. No importa archivos de más de 100 MB. Esta versión no está preparada como servicio público multiusuario.

## Integración real propuesta (no implementada)

Puede añadirse un backend autenticado que reciba una fotografía autorizada y un prompt revisado, y llame a la **API de imágenes de OpenAI**, endpoint de edición `POST /v1/images/edits`, con un modelo de imagen compatible vigente, por ejemplo `gpt-image-1` donde esté disponible. Consulta compatibilidad y límites actuales en https://platform.openai.com/docs/guides/image-generation.

La clave `OPENAI_API_KEY` debe vivir exclusivamente en el entorno del servidor o un gestor de secretos. Nunca en JavaScript del navegador, en el repositorio, en un archivo de copia de seguridad ni en logs. El navegador debe llamar al backend propio, que aplicará autenticación, límites de tamaño, cuotas, tiempo máximo de petición y límites de gasto. Debe mostrar el resultado como borrador y pedir revisión antes de incorporarlo al carrusel. La protección de identidad en un prompt no es una garantía técnica: hay que revisar rostro, expresión y anatomía, pedir consentimiento y rechazar resultados incorrectos. Los modelos virtuales deben identificarse como tales.

**Costes:** este MVP no realiza llamadas y no genera cargos de IA. La integración tendría costes variables por entradas, imágenes, resolución y calidad, además de almacenamiento y hosting. Varias variantes y reintentos suman cargos. El vídeo necesitaría un proveedor/endpoint compatible adicional y suele ser más caro. No se presupone que una suscripción de ChatGPT incluya crédito de API. Consulta https://openai.com/api/pricing/ antes de elegir modelo; fija un presupuesto por campaña y un límite mensual en el backend antes de activarlo. No se fijan tarifas que puedan quedar obsoletas.

## Comprobaciones técnicas

- `npm test`: pruebas de preservación en prompts, modo virtual, orden de diapositivas, duración y escape de texto.
- `npm start`: servidor estático Node con lista limitada de archivos públicos; no sirve copias, metadatos Git ni secretos.
- No requiere compilación, paquetes npm, base de datos externa ni variables de entorno para el flujo local.

## Validación realizada en este entorno

Se ejecutaron las 4 pruebas automatizadas de `npm test` y una prueba funcional con Chromium que creó una campaña, subió una imagen PNG, reordenó diapositivas, generó un prompt virtual, añadió una escena y exportó ambos formatos. Se verificaron las dimensiones reales de los PNG, el reinicio de la confirmación al cambiar de formato, la persistencia después de recargar y la ausencia de errores JavaScript. Se revisó la interfaz a 1280 px y 390 px, sin desbordamiento horizontal de la página (la navegación móvil se desplaza lateralmente). Otra prueba creó un estilo y descargó/restauró una copia de seguridad. No se probó una API de IA porque no está integrada.
