Estas son las dos nuevas páginas que puedes agregar a tu objeto pages:
familiaAmigo: Una página enfocada en el ambiente familiar del amigo secreto, con:

Consejos específicos para diferentes miembros de la familia (niños, padres, abuelos)
Enfoque en regalos del corazón más que costosos
Elementos visuales cálidos con colores rosados y morados
Énfasis en crear recuerdos familiares

comunidadEmpresa: Una página orientada al ámbito empresarial/corporativo, con:

Guía completa para organizar el evento en la oficina
Sugerencias de regalos apropiados para el ambiente laboral
Beneficios del team building
Colores más profesionales (azules y verdes)
Información sobre presupuestos y planificación

Ambas páginas siguen el mismo estilo y estructura que las páginas existentes (diseno, responsive, animaciones, optimizado), con:

Grid responsive de cards
Gradientes y efectos visuales
Botones interactivos
Contenido organizado y visualmente atractivo
Consejos prácticos y específicos para cada contexto

Solo necesitas copiar este código e insertarlo dentro de tu objeto pages existente, junto con las otras páginas que ya tienes.


✨ Características principales:
🎯 Sistema de Sorteos:

Validación de nombres (mínimo 2 caracteres, sin duplicados)
Sorteo inteligente que evita que alguien se saque a sí mismo
Separación entre sorteos familiares y empresariales

📊 Dashboard con Estadísticas:

Gráfico de torta (tipos de juegos)
Gráfico de barras (participantes por juego)
Gráfico de líneas (evolución temporal)
Estadísticas generales

💾 Persistencia de Datos:

Guarda automáticamente en localStorage (simula tu JSON)
Historial completo de todos los juegos
Exportación de resultados en formato JSON

🎨 Estructura como tu ejemplo:

Páginas definidas con contenido HTML embedded
Sistema de navegación por pestañas
Cards con el mismo estilo visual que mostraste

📋 Para usar este código:

Conecta con tu HTML que tenga estos elementos:

html<div id="navigation"></div>
<div id="content"></div>

Incluye Chart.js para los gráficos:

html<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>

El app se inicializa automáticamente cuando carga la página

✨ Funcionalidades incluidas:

🎯 Sorteo Familiar: Agregar familiares, sortear y ver resultados
🏢 Sorteo Empresarial: Igual pero para compañeros de trabajo
💾 Persistencia: Guarda automáticamente en localStorage
📄 Exportación: Descarga resultados en JSON
🔄 Reinicio: Limpia todo para empezar de nuevo
✅ Validaciones: No permite duplicados ni nombres vacíos
📱 Responsive: Funciona en móviles y desktop


***********************************************************************
***********************************************************************
***********************************************************************
Plan Completo para Sistema de Amigo Secreto con Dashboard
📋 TAREAS A REALIZAR
1. CONFIGURACIÓN INICIAL DEL PROYECTO

 Crear estructura de carpetas según las mejores prácticas
 Inicializar repositorio Git
 Configurar .gitignore apropiado
 Crear archivo README.md inicial

2. GESTIÓN DE DATOS JSON

 Verificación de nombres: Sistema que compare nombres ingresados contra la base de datos de nombres latinos
 Escritura en participantes.json: Guardar nombres válidos de participantes del juego
 Escritura en sorteo.json: Registrar los emparejamientos de amigo secreto
 Escritura en historial.json: Mantener registro de juegos anteriores
 Escritura en configuracion.json: Guardar preferencias y configuraciones del juego

3. FUNCIONALIDADES DE VERIFICACIÓN

 Validar si un nombre existe en la base de datos latina
 Verificar nombres duplicados en participantes
 Validar formato de nombres (solo letras, acentos permitidos)
 Sistema de sugerencias para nombres similares

4. SISTEMA DE ESCRITURA JSON

 Función para agregar participantes
 Función para actualizar configuraciones
 Función para guardar resultados de sorteo
 Sistema de backup automático
 Validación de integridad de datos

5. DASHBOARD INTERACTIVO

 Panel de participantes: Lista actual de participantes registrados
 Panel de verificación: Interface para verificar nuevos nombres
 Panel de sorteo: Botón para ejecutar sorteo y mostrar resultados
 Panel de estadísticas: Métricas del juego (total participantes, nombres válidos/inválidos)
 Panel de historial: Visualizar juegos anteriores
 Panel de configuración: Ajustar parámetros del juego

6. CARACTERÍSTICAS DEL DASHBOARD

 Diseño responsive y moderno
 Animaciones y transiciones suaves
 Sistema de notificaciones/alertas
 Exportar resultados en diferentes formatos
 Modo oscuro/claro
 Búsqueda y filtrado de datos


🛠️ TECNOLOGÍAS Y HERRAMIENTAS UTILIZADAS
Frontend

HTML5: Estructura del dashboard
CSS3: Estilos y animaciones
JavaScript (ES6+): Lógica de la aplicación
Tailwind CSS: Framework de CSS (si se usa)

Manipulación de Datos

Fetch API: Para leer/escribir archivos JSON
Local Storage: Para datos temporales del navegador
JSON: Formato de intercambio de datos

Librerías JavaScript Potenciales

Lodash: Manipulación de arrays y objetos
Chart.js: Para gráficos en el dashboard
Moment.js/Day.js: Manejo de fechas
Sweet Alert: Alertas elegantes
Papa Parse: Si necesitas manejar CSV

Desarrollo y Versionado

Git: Control de versiones
GitHub/GitLab: Repositorio remoto
VS Code: Editor recomendado
Live Server: Servidor de desarrollo local

Archivos JSON del Sistema

nombres_latinos.json: Base de datos de nombres
participantes.json: Lista actual de participantes
sorteo_actual.json: Emparejamientos del juego activo
historial_juegos.json: Registro de juegos pasados
configuracion.json: Preferencias del sistema
estadisticas.json: Métricas y analíticas


📁 ESTRUCTURA DE ARCHIVOS FINAL
amigo-secreto-dashboard/
├── data/
│   ├── nombres_latinos.json
│   ├── participantes.json
│   ├── sorteo_actual.json
│   ├── historial_juegos.json
│   ├── configuracion.json
│   └── estadisticas.json
├── src/
│   ├── js/
│   │   ├── app.js
│   │   ├── verificador.js
│   │   ├── sorteo.js
│   │   └── dashboard.js
│   ├── css/
│   │   ├── styles.css
│   │   └── dashboard.css
│   └── assets/
│       └── icons/
├── docs/
│   ├── API.md
│   └── USER_GUIDE.md
├── .gitignore
├── README.md
└── index.html

🐙 RESPUESTA SOBRE GITHUB Y JSON
¿Se pueden escribir archivos JSON en GitHub?
NO directamente desde una aplicación web cliente. GitHub no permite que aplicaciones web escriban archivos directamente al repositorio por razones de seguridad.
Alternativas para manejo de datos:

Local Storage del navegador: Los datos se guardan solo en el navegador del usuario
GitHub API: Requiere autenticación y es más complejo
Backend simple: Un servidor que maneje la escritura de archivos
Servicios cloud: Firebase, Supabase, o similar
Fork y Pull Request: El usuario hace fork, modifica, y envía PR

Recomendación para tu proyecto:

Usar Local Storage para desarrollo y pruebas
Los JSONs en GitHub servirían como "plantillas" o datos iniciales
Para producción, considerar un backend simple o servicio cloud

Para el README profesional incluirías:

Badges de tecnologías utilizadas
Instrucciones de instalación y uso
Screenshots del dashboard
Documentación de la estructura JSON
Guía de contribución
Licencia del proyecto
Créditos y agradecimientos