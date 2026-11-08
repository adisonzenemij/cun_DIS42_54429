export type Interest = 'demostracion' | 'piloto';
export interface Feature { title: string; description: string; symbol: string }
export interface Question { question: string; answer: string }
export const content = {
  brand: 'Engineering Code',
  hero: 'Organiza tu proyecto de software desde la idea hasta el despliegue',
  description: 'Una propuesta para conectar documentación, tareas y entregas en un mismo proceso. Pensada para desarrolladores independientes y pequeñas empresas de software.',
  founder: 'Adison Jesús Jiménez Beltrán',
  founderRole: 'Desarrollador de software full stack',
  education: 'Estudiante de Ingeniería de Sistemas, Ingeniería de Software y Ciencia de Datos.',
  motivation: 'Engineering Code nace de una dificultad que encuentro al desarrollar: construir software requiere orden, sin importar el tamaño del proyecto. Quiero organizar el proceso completo de construcción y entrega para resolver problemas reales.',
  photoUrl: '', logoUrl: '',
  contact: { email: '', phone: '', linkedin: '' },
  price: '$100.000', currency: 'COP / mes',
  pilot: 'Hasta 5 cuentas', trial: '14 días de prueba guiada',
  conditions: ['Una cuenta, un usuario y un proyecto activo.', 'Plantillas compatibles y automatizaciones previstas.', 'Soporte básico durante el uso de la plataforma.', 'Infraestructura de producción del cliente pagada aparte.', 'Desarrollo personalizado con alcance y cotización separados.'],
  nav: [{ label: 'La propuesta', href: '#propuesta' }, { label: 'Cómo funcionará', href: '#recorrido' }, { label: 'Piloto y precio', href: '#piloto' }, { label: 'Preguntas', href: '#preguntas' }],
  problems: ['Herramientas desconectadas que dispersan la información.', 'Configuraciones repetidas al empezar cada proyecto.', 'Ambientes que requieren preparación y mantenimiento por separado.', 'Pruebas y entregas manuales que consumen tiempo.', 'Cambios y errores difíciles de rastrear durante el mantenimiento.'],
  features: [
    { symbol: '01', title: 'El proyecto, con contexto', description: 'Requisitos y documentación a lo largo del ciclo de vida del software (SDLC), desde el análisis hasta el mantenimiento.' },
    { symbol: '02', title: 'Trabajo con dirección', description: 'Tareas y entregas organizadas con metodologías ágiles o tradicionales, según las necesidades del proyecto.' },
    { symbol: '03', title: 'Una base para construir', description: 'Plantillas e integraciones compatibles para conectar frontend, backend y bases de datos sin repetir toda la configuración.' },
    { symbol: '04', title: 'Cada ambiente en su lugar', description: 'Separación de desarrollo, pruebas y producción para preparar cambios antes de entregarlos.' },
    { symbol: '05', title: 'Entregas con menos pasos manuales', description: 'Automatización de pruebas y despliegues en servidores locales o en la nube, dentro de las compatibilidades validadas.' },
    { symbol: '06', title: 'Una historia que puedes seguir', description: 'Registro de versiones, errores y despliegues para dar continuidad al mantenimiento.' }
  ] satisfies Feature[],
  steps: [
    { title: 'Define el proyecto', description: 'Crea un proyecto y establece sus necesidades y requisitos.' },
    { title: 'Elige una base compatible', description: 'Selecciona una plantilla y conecta el repositorio.' },
    { title: 'Organiza el trabajo', description: 'Prepara tareas, documentación y ambientes.' },
    { title: 'Comprueba los cambios', description: 'Ejecuta pruebas antes de preparar la entrega.' },
    { title: 'Entrega y da seguimiento', description: 'Despliega y conserva el contexto para mantener el software.' }
  ],
  faqs: [
    { question: '¿La plataforma ya está disponible?', answer: 'Todavía no. Engineering Code está en etapa de propuesta y validación. Esta landing presenta la idea; la prueba guiada comenzará cuando esté disponible el producto mínimo viable (PMV).' },
    { question: '¿A quién está dirigida?', answer: 'A desarrolladores independientes que construyen aplicaciones para clientes y a pequeñas empresas de software que necesitan organizar proyectos y coordinar su trabajo.' },
    { question: '¿Qué tecnologías serán compatibles?', answer: 'La selección inicial aún está por definir. El soporte será limitado a combinaciones validadas de frontend, backend y bases de datos. Las necesidades de los participantes ayudarán a priorizarlo.' },
    { question: '¿Permitirá despliegues locales y en la nube?', answer: 'Es una capacidad prevista. Los servidores y proveedores compatibles se definirán durante la validación; no se promete soporte universal.' },
    { question: '¿Qué incluye el precio propuesto?', answer: 'El plan estimado de $100.000 COP al mes contempla una cuenta, un usuario, un proyecto activo, plantillas compatibles, automatizaciones y soporte básico. Estas condiciones están sujetas a validación.' },
    { question: '¿El alojamiento de la aplicación está incluido?', answer: 'No. La infraestructura de producción del cliente se paga aparte. El desarrollo personalizado también requiere alcance y cotización separados.' },
    { question: '¿Cómo puedo participar en el piloto?', answer: 'Selecciona “Me interesa el piloto” en el formulario. Se prevén hasta 5 cuentas, sujetas a capacidad y selección, con 14 días de prueba guiada cuando el PMV esté disponible. El formulario indica si la recepción de solicitudes está habilitada.' },
    { question: '¿La landing ejecuta despliegues reales?', answer: 'No. La vista conceptual utiliza datos de ejemplo. No conecta repositorios, servidores ni proveedores, y no ejecuta pruebas o despliegues reales.' }
  ] satisfies Question[]
};
