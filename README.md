# Engineering Code

Landing de la propuesta SaaS de Adison Jesús Jiménez Beltrán para Plan de Negocio Aplicado de la CUN. Trabajo local, sin publicación.

## Instalación y ejecución

Angular 22.2 conservado, TypeScript estricto, standalone, ng-bootstrap 21, Bootstrap 5.3.8, Popper 2.11.8 y Localize 22.2.5. Compatibilidad: https://github.com/ng-bootstrap/ng-bootstrap#dependencies. No se carga JavaScript de Bootstrap.

Probado con Node 24.22.1. Ejecutar desde la raíz:

~~~powershell
# Instala las versiones del lockfile.
npm.cmd ci

# Inicia el servidor en http://localhost:4200.
npm.cmd start

# Genera producción en dist/DIS42-54429/browser.
npm.cmd run build

# Ejecuta las pruebas.
npm.cmd test -- --watch=false
~~~

Fuera de Windows se puede usar npm. Para publicar posteriormente, servir dist/DIS42-54429/browser con un servidor estático. No hay páginas independientes ni necesidad de Router.

## Archivos y personalización

- src/app/content.ts: marca, título, descripción, capacidades, pasos, FAQ, precio, condiciones, fundador y contacto. La narrativa restante está en landing.html y los mensajes del formulario en contact.html/contact.ts.
- src/app/layout.ts: encabezado, menú adaptable con ng-bootstrap y pie.
- src/app/landing.ts y landing.html: secciones y acordeón ng-bootstrap.
- src/app/concept.ts: vista interactiva exclusivamente con ejemplos.
- src/app/contact.ts y contact.html: Reactive Forms, validación y estados.
- src/app/lead.service.ts: contrato y servicio HTTP.
- src/app/public-config.ts: endpoint público.
- src/styles.scss: variables de marca, módulos Sass de Bootstrap y estilos adaptables.
- src/index.html: título y metadatos.

Fotografía: colocar archivo optimizado en public/ y configurar photoUrl en content.ts, por ejemplo /fundador.webp. Vacío muestra iniciales sin fotografía ficticia. Logo: colocar archivo en public/ y configurar logoUrl; el nombre permanece visible. Favicon: public/favicon.svg.

Configurar contact.email, contact.phone y contact.linkedin con datos reales; vacíos no generan enlaces públicos. No se incluyen políticas legales ficticias. Al cambiar el precio revisar también su respuesta en las preguntas frecuentes.

## Contrato de integración

No existe backend. Actualmente NO se envían ni guardan datos, tampoco en almacenamiento local. El botón permite comprobar validaciones, con aviso de envío no disponible. No hay éxito simulado.

En src/app/public-config.ts:

~~~typescript
export const publicConfig = { leadEndpoint: '/api/leads' };
~~~

Usar una URL HTTPS real si el servidor está en otro origen y configurar CORS. Recompilar después de cambiarla. Esta configuración es PÚBLICA: nunca colocar secretos ni credenciales privadas.

POST /api/leads con Content-Type: application/json:

~~~json
{
  "name": "Persona de prueba",
  "email": "test@example.com",
  "profile": "independiente",
  "need": "Organizar tareas y entregas de un proyecto.",
  "technologies": "Tecnologías indicadas por el visitante",
  "interest": "piloto"
}
~~~

profile permite independiente o empresa; interest permite demostracion o piloto. technologies permite cadena vacía.

El servidor debe validar: nombre no vacío, máximo 100; correo válido, máximo 254; necesidad no vacía, entre 20 y 3000; tecnologías máximo 300; enumeraciones permitidas. Debe guardar la solicitud de forma durable antes de responder HTTP 201:

~~~json
{ "id": "identificador-persistido", "status": "received" }
~~~

Solo se muestra éxito si llega ese contrato con identificador no vacío. Otros cuerpos, errores HTTP y espera superior a 15 segundos producen error y conservan campos. No se reintenta automáticamente. Se bloquean envíos simultáneos; tras una interrupción podría existir una solicitud guardada sin confirmación. La deduplicación definitiva corresponde al backend.

Para activarlo falta implementar servidor, persistencia, validación del servidor, protección contra abuso y CORS si procede; configurar endpoint y probar una solicitud recuperable por su identificador. Definir tratamiento de datos y publicar la información legal aplicable antes de recibir datos reales. No se envían correos ni se programan demostraciones automáticamente.

## Alcance y comprobaciones

Landing con navegación por anclas, menú, FAQ, tres vistas conceptuales y formulario. CTA preseleccionan el interés y permiten modificarlo. Capacidades SaaS y condiciones comerciales son propuestas sujetas a validación. Sin autenticación, pagos, suscripciones, repositorios conectados ni pruebas o despliegues reales.

- Producción compila: aproximadamente 430 kB iniciales, dentro del presupuesto original de 500 kB.
- 8 pruebas aprobadas: destinos de anclas, menú, FAQ, vista conceptual, selección de interés, validación, ausencia de envío sin backend, carga y duplicados, éxito verificable, error y reintento.
- HTTP usa el controlador de pruebas Angular; no demuestra una conexión real.
- Bootstrap 5.3 utiliza @import para su personalización Sass. angular.json silencia únicamente la deprecación import mediante stylePreprocessorOptions.sass.silenceDeprecations. Es una medida temporal, no una migración a módulos Sass; al actualizar Bootstrap debe revisarse y retirarse cuando ya no sea necesaria. Los demás avisos y errores siguen activos. Reiniciar ng serve después de cambiar angular.json.
- Semántica, etiquetas, foco visible, salto al contenido, mensajes accesibles y movimiento reducido implementados.
- Revisión visual a diferentes tamaños y navegación real por teclado pendientes: el host de acceso al navegador no estaba disponible.

Revisión manual pendiente: 360, 768 y 1440 px; confirmar legibilidad, ausencia de desplazamiento horizontal y menú; recorrer con Tab/Shift+Tab/Enter/Espacio; comprobar preguntas, anclas y formulario. Después de conectar backend verificar el identificador contra el registro persistido.
