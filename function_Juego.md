
📋 ORGANIZACIÓN DEL CÓDIGO
🎯 1. LÓGICA DEL JUEGO (Líneas 1-50)

realizarSorteoInteligente(): El algoritmo principal del sorteo
validarNombre(): Valida que los nombres sean correctos
Aquí es donde cambias la lógica si quieres modificar cómo funciona el juego

💾 2. SISTEMA DE ALMACENAMIENTO (Líneas 51-80)

Arrays para guardar datos: familiares[], compañeros[], historialSorteos[]
guardarDatos() y cargarDatos(): Manejo de localStorage
Persiste la información entre sesiones

🖥️ 3. INTERFAZ DE USUARIO (Líneas 81-120)

mostrarMensaje(): Notificaciones flotantes
exportarResultados(): Descarga de archivos JSON
Todo lo visual y de feedback al usuario

👨‍👩‍👧‍👦 4. SORTEO FAMILIAR (Líneas 121-200)

Funciones específicas para familias
Colores rosa/rojo para el tema familiar
agregarFamiliar(), eliminarFamiliar(), etc.

🏢 5. SORTEO EMPRESARIAL (Líneas 201-280)

Funciones idénticas pero para empresas
Colores azules para el tema profesional
Misma lógica, diferentes elementos del DOM

🌐 6. SISTEMA WEB MODERNO (Líneas 281-400)

Objeto pages: Contiene todo el contenido de las páginas
showPage() y showHome(): Navegación entre secciones
Aquí cambias el contenido de las páginas web

✨ 7. EFECTOS Y ANIMACIONES (Líneas 401-500)

CSS dinámico para efectos visuales
Hover effects, transiciones, glassmorphism
Todo lo que hace que se vea moderno

⚙️ 8. CONFIGURACIÓN E INICIALIZACIÓN (Líneas 501-600)

Event listeners automáticos
Teclas de acceso rápido (H=Home, F=Familia, E=Empresa)
Smooth scrolling, efectos del navbar

🐛 9. FUNCIONES DE DEBUG (Líneas 601-final)

diagnosticoSistema(): Para ver el estado actual
limpiarTodoElSistema(): Para resetear todo

🔧 TÉCNICAS USADAS

Manipulación del DOM: document.getElementById(), innerHTML
Event Listeners: addEventListener(), eventos de teclado
LocalStorage: Persistencia de datos
CSS-in-JS: Estilos dinámicos aplicados por JavaScript
Template Literals: Strings con ${} para HTML dinámico
Array Methods: filter(), map(), some(), splice()
Recursión: En realizarSorteoInteligente() si falla el sorteo
Closures: Las funciones internas acceden a variables externas
Module Pattern: Organización en secciones lógicas
Progressive Enhancement: Funciona sin JavaScript, mejor con él

🎮 CÓMO FUNCIONA EL JUEGO

Usuario agrega nombres → Validación → Array
Presiona "Sortear" → Algoritmo inteligente → Evita autoasignación
Muestra resultados → HTML dinámico → Opción de exportar
Guarda automáticamente → localStorage → Persiste entre sesiones