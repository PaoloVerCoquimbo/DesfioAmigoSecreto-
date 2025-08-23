// ========================================================================
// ========================= LÓGICA DEL JUEGO AMIGO SECRETO =============
// ========================================================================
// Esta sección contiene toda la lógica principal del juego
// Aquí es donde debes hacer cambios si quieres modificar cómo funciona el sorteo

/**
 * ALGORITMO PRINCIPAL DEL SORTEO
 * Esta función es el corazón del juego - realiza el sorteo evitando que alguien se saque a sí mismo
 * @param {Array} participantes - Array con los nombres de todos los participantes
 * @returns {Array} asignaciones - Array de objetos con {dador, receptor}
 */
function realizarSorteoInteligente(participantes) {
    let asignaciones = [];  // Aquí guardaremos quién le da regalo a quién
    let disponibles = [...participantes];  // Copiamos el array para no modificar el original
    
    // Recorremos cada participante para asignarle a quién le dará regalo
    for (let i = 0; i < participantes.length; i++) {
        const dador = participantes[i];  // La persona que dará el regalo
        
        // Filtramos para que no se pueda sacar a sí mismo
        const posiblesReceptores = disponibles.filter(p => p !== dador);
        
        // Si no hay opciones disponibles, reiniciamos el sorteo (caso muy raro)
        if (posiblesReceptores.length === 0) {
            return realizarSorteoInteligente(participantes);  // Recursión para reintentar
        }
        
        // Seleccionamos un receptor al azar
        const receptorIndex = Math.floor(Math.random() * posiblesReceptores.length);
        const receptor = posiblesReceptores[receptorIndex];
        
        // Guardamos la asignación
        asignaciones.push({ dador, receptor });
        
        // Eliminamos al receptor de los disponibles para que no reciba más de un regalo
        disponibles = disponibles.filter(p => p !== receptor);
    }
    
    return asignaciones;  // Devolvemos todas las asignaciones
}

/**
 * VALIDADOR DE NOMBRES
 * Verifica que un nombre sea válido antes de agregarlo
 * @param {string} nombre - El nombre a validar
 * @param {Array} lista - La lista donde verificar duplicados
 * @returns {Object} {valido: boolean, mensaje: string}
 */
function validarNombre(nombre, lista) {
    if (!nombre) {
        return { valido: false, mensaje: 'Por favor ingresa un nombre válido' };
    }
    
    if (nombre.length < 2) {
        return { valido: false, mensaje: 'El nombre debe tener al menos 2 caracteres' };
    }
    
    if (lista.some(item => item.toLowerCase() === nombre.toLowerCase())) {
        return { valido: false, mensaje: 'Este nombre ya está en la lista' };
    }
    
    return { valido: true, mensaje: '' };
}

// ========================================================================
// ========================= SISTEMA DE ALMACENAMIENTO ==================
// ========================================================================
// Esta sección maneja cómo se guardan y cargan los datos del juego

/**
 * ARRAYS PRINCIPALES DE DATOS
 * Estos arrays almacenan toda la información del juego en memoria
 */
let familiares = [];        // Lista de familiares para sorteo familiar
let compañeros = [];        // Lista de compañeros para sorteo empresarial
let historialSorteos = [];  // Historial de todos los sorteos realizados

/**
 * GUARDAR DATOS EN LOCALSTORAGE
 * Guarda automáticamente el progreso del usuario
 */
function guardarDatos() {
    const datos = {
        historial: historialSorteos,
        fechaGuardado: new Date()
    };
    localStorage.setItem('sorteoData', JSON.stringify(datos));
    console.log('Datos guardados automáticamente');
}

/**
 * CARGAR DATOS DESDE LOCALSTORAGE
 * Se ejecuta al iniciar la aplicación
 */
function cargarDatos() {
    const datosGuardados = localStorage.getItem('sorteoData');
    if (datosGuardados) {
        try {
            const datos = JSON.parse(datosGuardados);
            historialSorteos = datos.historial || [];
            console.log(`Cargados ${historialSorteos.length} sorteos del historial`);
        } catch (e) {
            console.log('No se pudieron cargar los datos guardados');
        }
    }
}

// ========================================================================
// ========================= INTERFAZ DE USUARIO ========================
// ========================================================================
// Esta sección maneja todo lo relacionado con mostrar información al usuario

/**
 * SISTEMA DE MENSAJES AL USUARIO
 * Muestra notificaciones temporales en la esquina superior derecha
 * @param {string} mensaje - El texto a mostrar
 * @param {string} tipo - 'success', 'error', 'info' para diferentes colores
 */
function mostrarMensaje(mensaje, tipo = 'info') {
    // Creamos un elemento div para el mensaje
    const messageEl = document.createElement('div');
    
    // Aplicamos estilos CSS inline para el mensaje flotante
    messageEl.style.cssText = `
        position: fixed;          /* Se mantiene fijo en la pantalla */
        top: 20px;               /* 20px desde arriba */
        right: 20px;             /* 20px desde la derecha */
        padding: 15px 20px;      /* Espaciado interno */
        border-radius: 10px;     /* Bordes redondeados */
        color: white;            /* Texto blanco */
        font-weight: bold;       /* Texto en negrita */
        z-index: 1000;          /* Aparece encima de todo */
        animation: slideIn 0.3s ease;  /* Animación de entrada */
        max-width: 300px;        /* Ancho máximo */
    `;
    
    // Colores según el tipo de mensaje
    switch(tipo) {
        case 'success':
            messageEl.style.background = '#32CD32';  // Verde para éxito
            break;
        case 'error':
            messageEl.style.background = '#FF4500';  // Rojo para error
            break;
        case 'info':
            messageEl.style.background = '#4169E1';  // Azul para información
            break;
        default:
            messageEl.style.background = '#666';     // Gris por defecto
    }
    
    messageEl.textContent = mensaje;  // Establecemos el texto
    document.body.appendChild(messageEl);  // Agregamos al DOM
    
    // Eliminamos el mensaje después de 3 segundos
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.parentNode.removeChild(messageEl);
        }
    }, 3000);
}

/**
 * EXPORTADOR DE RESULTADOS
 * Permite descargar los resultados como archivo JSON
 * @param {string} tipo - 'familiar' o 'empresarial'
 */
function exportarResultados(tipo) {
    // Buscamos el sorteo más reciente del tipo especificado
    const sorteo = historialSorteos.find(s => s.tipo === tipo);
    if (!sorteo) return;
    
    // Creamos el objeto de datos a exportar
    const data = {
        tipo: sorteo.tipo,
        fecha: sorteo.fecha,
        participantes: sorteo.participantes,
        asignaciones: sorteo.asignaciones,
        exportDate: new Date()
    };
    
    // Creamos un archivo JSON y lo descargamos
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sorteo_${tipo}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    mostrarMensaje('Resultados exportados correctamente', 'success');
}

// ========================================================================
// =================== FUNCIONES SORTEO FAMILIAR =======================
// ========================================================================
// Esta sección maneja específicamente el sorteo entre familiares

/**
 * AGREGAR FAMILIAR
 * Añade un nuevo familiar a la lista del sorteo familiar
 */
function agregarFamiliar() {
    const input = document.getElementById('nombreFamiliar');  // Obtenemos el input
    const nombre = input.value.trim();  // Eliminamos espacios en blanco
    
    // Validamos el nombre usando nuestra función validadora
    const validacion = validarNombre(nombre, familiares);
    if (!validacion.valido) {
        mostrarMensaje(validacion.mensaje, 'error');
        return;
    }
    
    // Si es válido, lo agregamos
    familiares.push(nombre);
    input.value = '';  // Limpiamos el input
    actualizarListaFamiliares();  // Actualizamos la interfaz
    mostrarMensaje(`${nombre} agregado correctamente`, 'success');
}

/**
 * ELIMINAR FAMILIAR
 * Remueve un familiar de la lista
 * @param {number} index - Índice del familiar en el array
 */
function eliminarFamiliar(index) {
    const nombre = familiares[index];  // Guardamos el nombre para el mensaje
    familiares.splice(index, 1);      // Eliminamos del array
    actualizarListaFamiliares();      // Actualizamos la interfaz
    mostrarMensaje(`${nombre} eliminado`, 'info');
}

/**
 * ACTUALIZAR LISTA VISUAL DE FAMILIARES
 * Regenera el HTML que muestra la lista de familiares
 */
function actualizarListaFamiliares() {
    const lista = document.getElementById('familiares-lista');
    if (!lista) return;  // Si no existe el elemento, salimos
    
    // Si no hay familiares, mostramos mensaje vacío
    if (familiares.length === 0) {
        lista.innerHTML = '<p style="text-align: center; color: #666;">No hay familiares agregados aún</p>';
        return;
    }
    
    // Generamos HTML dinámicamente para mostrar la lista
    lista.innerHTML = `
        <h4 style="text-align: center; margin-bottom: 1rem; color: #8B0000;">
            Familiares (${familiares.length}):
        </h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
            ${familiares.map((familiar, index) => `
                <div style="background: #FFB6C1; color: white; padding: 10px 15px; border-radius: 20px; 
                           display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: bold;">${familiar}</span>
                    <button onclick="eliminarFamiliar(${index})" 
                            style="background: none; border: none; color: white; cursor: pointer; font-size: 16px;">
                        ❌
                    </button>
                </div>
            `).join('')}
        </div>
    `;
}

/**
 * REALIZAR SORTEO FAMILIAR
 * Ejecuta el algoritmo de sorteo para la familia
 */
function realizarSorteoFamiliar() {
    // Validamos que haya suficientes participantes
    if (familiares.length < 2) {
        mostrarMensaje('Se necesitan al menos 2 familiares para realizar el sorteo', 'error');
        return;
    }
    
    // Ejecutamos el algoritmo de sorteo
    const resultado = realizarSorteoInteligente(familiares);
    
    // Guardamos en el historial
    const sorteo = {
        tipo: 'familiar',
        fecha: new Date(),
        participantes: familiares.length,
        asignaciones: resultado
    };
    historialSorteos.push(sorteo);
    
    // Mostramos el resultado y guardamos datos
    mostrarResultadoFamiliar(resultado);
    mostrarMensaje('¡Sorteo familiar realizado con éxito!', 'success');
    guardarDatos();  // Guardamos automáticamente
}

/**
 * MOSTRAR RESULTADO DEL SORTEO FAMILIAR
 * Genera el HTML para mostrar quién le da regalo a quién
 * @param {Array} resultado - Array de asignaciones del sorteo
 */
function mostrarResultadoFamiliar(resultado) {
    const div = document.getElementById('resultado-familiar');
    
    // Generamos HTML con los resultados
    div.innerHTML = `
        <div style="background: linear-gradient(135deg, #E6FFE6 0%, #E6F3FF 100%); 
                    padding: 2rem; border-radius: 15px; text-align: center;">
            <h3 style="color: #228B22; margin-bottom: 1rem;">🎉 ¡Sorteo Familiar Realizado!</h3>
            <p style="margin-bottom: 1.5rem;">
                Se ha sorteado exitosamente entre ${familiares.length} familiares
            </p>
            
            <!-- Grid con todas las asignaciones -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
                        gap: 15px; margin-bottom: 2rem;">
                ${resultado.map(asignacion => `
                    <div style="background: white; padding: 15px; border-radius: 10px; 
                               box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                        <strong style="color: #FF69B4;">${asignacion.dador}</strong><br>
                        <span style="color: #666;">le da regalo a</span><br>
                        <strong style="color: #4169E1;">${asignacion.receptor}</strong>
                    </div>
                `).join('')}
            </div>
            
            <!-- Botón para exportar -->
            <button onclick="exportarResultados('familiar')" 
                    style="background: linear-gradient(45deg, #32CD32, #228B22); color: white; 
                           border: none; padding: 12px 25px; border-radius: 25px; cursor: pointer; 
                           font-size: 16px; transition: transform 0.3s;">
                📄 Exportar Resultados
            </button>
        </div>
    `;
}

/**
 * REINICIAR SORTEO FAMILIAR
 * Limpia todos los datos del sorteo familiar
 */
function reiniciarSorteoFamiliar() {
    familiares = [];  // Vaciamos el array
    actualizarListaFamiliares();  // Actualizamos la interfaz
    document.getElementById('resultado-familiar').innerHTML = '';  // Limpiamos resultados
    mostrarMensaje('Sorteo familiar reiniciado', 'info');
}

// ========================================================================
// =================== FUNCIONES SORTEO EMPRESARIAL ====================
// ========================================================================
// Esta sección maneja el sorteo entre compañeros de trabajo
// Las funciones son idénticas a las familiares pero con diferentes arrays y elementos

/**
 * AGREGAR COMPAÑERO DE TRABAJO
 */
function agregarCompañero() {
    const input = document.getElementById('nombreCompañero');
    const nombre = input.value.trim();
    
    const validacion = validarNombre(nombre, compañeros);
    if (!validacion.valido) {
        mostrarMensaje(validacion.mensaje, 'error');
        return;
    }
    
    compañeros.push(nombre);
    input.value = '';
    actualizarListaCompañeros();
    mostrarMensaje(`${nombre} agregado correctamente`, 'success');
}

/**
 * ELIMINAR COMPAÑERO DE TRABAJO
 */
function eliminarCompañero(index) {
    const nombre = compañeros[index];
    compañeros.splice(index, 1);
    actualizarListaCompañeros();
    mostrarMensaje(`${nombre} eliminado`, 'info');
}

/**
 * ACTUALIZAR LISTA VISUAL DE COMPAÑEROS
 */
function actualizarListaCompañeros() {
    const lista = document.getElementById('compañeros-lista');
    if (!lista) return;
    
    if (compañeros.length === 0) {
        lista.innerHTML = '<p style="text-align: center; color: #666;">No hay compañeros agregados aún</p>';
        return;
    }
    
    // HTML similar al familiar pero con colores azules (tema empresarial)
    lista.innerHTML = `
        <h4 style="text-align: center; margin-bottom: 1rem; color: #191970;">
            Compañeros (${compañeros.length}):
        </h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
            ${compañeros.map((compañero, index) => `
                <div style="background: #6495ED; color: white; padding: 10px 15px; border-radius: 20px; 
                           display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: bold;">${compañero}</span>
                    <button onclick="eliminarCompañero(${index})" 
                            style="background: none; border: none; color: white; cursor: pointer; font-size: 16px;">
                        ❌
                    </button>
                </div>
            `).join('')}
        </div>
    `;
}

/**
 * REALIZAR SORTEO EMPRESARIAL
 */
function realizarSorteoEmpresarial() {
    if (compañeros.length < 2) {
        mostrarMensaje('Se necesitan al menos 2 compañeros para realizar el sorteo', 'error');
        return;
    }
    
    const resultado = realizarSorteoInteligente(compañeros);
    
    const sorteo = {
        tipo: 'empresarial',
        fecha: new Date(),
        participantes: compañeros.length,
        asignaciones: resultado
    };
    historialSorteos.push(sorteo);
    
    mostrarResultadoEmpresarial(resultado);
    mostrarMensaje('¡Sorteo empresarial realizado con éxito!', 'success');
    guardarDatos();
}

/**
 * MOSTRAR RESULTADO DEL SORTEO EMPRESARIAL
 */
function mostrarResultadoEmpresarial(resultado) {
    const div = document.getElementById('resultado-empresarial');
    
    // HTML similar al familiar pero con colores azules
    div.innerHTML = `
        <div style="background: linear-gradient(135deg, #E6F3FF 0%, #F0F8FF 100%); 
                    padding: 2rem; border-radius: 15px; text-align: center;">
            <h3 style="color: #191970; margin-bottom: 1rem;">🎉 ¡Sorteo Empresarial Realizado!</h3>
            <p style="margin-bottom: 1.5rem;">
                Se ha sorteado exitosamente entre ${compañeros.length} compañeros
            </p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
                        gap: 15px; margin-bottom: 2rem;">
                ${resultado.map(asignacion => `
                    <div style="background: white; padding: 15px; border-radius: 10px; 
                               box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                        <strong style="color: #4169E1;">${asignacion.dador}</strong><br>
                        <span style="color: #666;">le da regalo a</span><br>
                        <strong style="color: #FF69B4;">${asignacion.receptor}</strong>
                    </div>
                `).join('')}
            </div>
            
            <button onclick="exportarResultados('empresarial')" 
                    style="background: linear-gradient(45deg, #32CD32, #228B22); color: white; 
                           border: none; padding: 12px 25px; border-radius: 25px; cursor: pointer; 
                           font-size: 16px; transition: transform 0.3s;">
                📄 Exportar Resultados
            </button>
        </div>
    `;
}

/**
 * REINICIAR SORTEO EMPRESARIAL
 */
function reiniciarSorteoEmpresarial() {
    compañeros = [];
    actualizarListaCompañeros();
    document.getElementById('resultado-empresarial').innerHTML = '';
    mostrarMensaje('Sorteo empresarial reiniciado', 'info');
}

// ========================================================================
// ===================== SISTEMA WEB MODERNO ============================
// ========================================================================
// CAMBIO DE CONTEXTO: Aquí terminan las funciones del juego y empiezan
// las funciones del sistema web moderno (navegación, páginas, efectos)

/**
 * OBJETO PÁGINAS
 * Contiene todo el contenido de las diferentes páginas del sitio web
 * Cada página tiene: title, subtitle, content (HTML)
 */
const pages = {
    // ===== PÁGINAS DE DEMOSTRACIÓN TÉCNICA =====
    diseno: {
        title: "Diseño Moderno",
        subtitle: "Interfaz elegante y contemporánea",
        content: `
            <div class="content-grid">
                <div class="card">
                    <h3>🎨 Glassmorphism</h3>
                    <p>Utilizamos efectos de cristal y transparencias que crean una sensación de profundidad y modernidad.</p>
                    <div style="margin-top: 1rem;">
                        <span style="background: rgba(255,255,255,0.2); padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.9rem;">Tendencia 2024</span>
                    </div>
                </div>
                <div class="card">
                    <h3>🌈 Gradientes Vibrantes</h3>
                    <p>Los gradientes coloridos guían la atención del usuario hacia elementos importantes.</p>
                    <div style="height: 50px; background: linear-gradient(45deg, #667eea, #764ba2); border-radius: 10px; margin-top: 1rem;"></div>
                </div>
            </div>
        `
    },

    responsive: {
        title: "Diseño Responsive",
        subtitle: "Adaptación perfecta a cualquier dispositivo",
        content: `
            <div class="content-grid">
                <div class="card">
                    <h3>📱 Móviles (320px+)</h3>
                    <p>Optimizado para smartphones con navegación touch-friendly.</p>
                </div>
                <div class="card">
                    <h3>💻 Tablets (768px+)</h3>
                    <p>Experiencia intermedia que aprovecha el espacio adicional.</p>
                </div>
            </div>
        `
    },

    animaciones: {
        title: "Animaciones Fluidas", 
        subtitle: "Transiciones que dan vida a tu sitio",
        content: `
            <div class="content-grid">
                <div class="card">
                    <h3>🌊 Transiciones CSS</h3>
                    <p>Efectos suaves en hover, focus y cambios de estado.</p>
                </div>
            </div>
        `
    },

    optimizado: {
        title: "Optimización Avanzada",
        subtitle: "Rendimiento y velocidad excepcionales", 
        content: `
            <div class="content-grid">
                <div class="card">
                    <h3>⚡ Carga Rápida</h3>
                    <p>Código optimizado para tiempos de carga mínimos.</p>
                </div>
            </div>
        `
    },

    // ===== PÁGINAS DEL JUEGO AMIGO SECRETO =====
    familia: {
        title: "🎁 Amigo Secreto Familiar",
        subtitle: "Tradición navideña que une corazones en familia",
        content: `
            <!-- Contenido descriptivo de la página familiar -->
            <div class="content-grid">
                <div class="card">
                    <h3>👨‍👩‍👧‍👦 Ambiente Familiar</h3>
                    <p>Crea momentos mágicos donde padres, hijos, abuelos, tíos y primos participan juntos en esta hermosa tradición navideña que fortalece los lazos familiares.</p>
                    <div style="margin-top: 1rem;">
                        <span style="background: rgba(255,182,193,0.3); padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.9rem; color: #8B0000;">💝 Unión Familiar</span>
                    </div>
                </div>
                
                <div class="card">
                    <h3>🎁 Regalos del Corazón</h3>
                    <p>Los regalos familiares no necesitan ser costosos. Un dibujo hecho por un nieto, una foto familiar especial o algo hecho a mano puede ser el regalo más valioso.</p>
                    <div style="height: 50px; background: linear-gradient(45deg, #FFB6C1, #DDA0DD); border-radius: 10px; margin-top: 1rem; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                        ❤️ Amor y Cariño ❤️
                    </div>
                </div>

                <div class="card">
                    <h3>🎭 Diversión Garantizada</h3>
                    <p>La emoción de adivinar quién es el amigo secreto se multiplica en familia. Los niños intentan dar pistas, los adultos actúan misteriosamente.</p>
                    <button onmouseover="this.style.transform='scale(1.05) rotate(2deg)'" onmouseout="this.style.transform='scale(1) rotate(0deg)'" style="background: linear-gradient(45deg, #FF69B4, #FF1493); color: white; border: none; padding: 0.5rem 1rem; border-radius: 25px; transition: all 0.3s; cursor: pointer;">🎪 ¡Sorpresas!</button>
                </div>

                <div class="card">
                    <h3>📸 Recuerdos Eternos</h3>
                    <p>Cada intercambio de regalos se convierte en un recuerdo familiar precioso. Las fotos y videos de estos momentos serán tesoros para siempre.</p>
                    <div style="display: flex; gap: 0.5rem; margin-top: 1rem; justify-content: center;">
                        <div style="width: 30px; height: 25px; background: #FF69B4; border-radius: 5px; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.8rem;">📷</div>
                        <div style="width: 30px; height: 25px; background: #DDA0DD; border-radius: 5px; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.8rem;">🎥</div>
                        <div style="width: 30px; height: 25px; background: #FFB6C1; border-radius: 5px; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.8rem;">💝</div>
                    </div>
                </div>
            </div>
            
            <!-- INTERFAZ DEL JUEGO FAMILIAR -->
            <div style="background: rgba(255,255,255,0.9); padding: 2rem; border-radius: 20px; margin-top: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                <h2 style="text-align: center; color: #8B0000; margin-bottom: 1.5rem;">🎯 ¡Comienza el Sorteo!</h2>
                
                <div style="max-width: 500px; margin: 0 auto;">
                    <!-- Input para agregar familiares -->
                    <div style="text-align: center; margin-bottom: 1.5rem;">
                        <label for="nombreFamiliar" style="display: block; font-weight: bold; margin-bottom: 0.5rem; color: #333;">Ingresa a tu Familiar:</label>
                        <div style="display: flex; gap: 10px; justify-content: center;">
                            <input type="text" id="nombreFamiliar" placeholder="Nombre del familiar..." style="flex: 1; max-width: 300px; padding: 12px 15px; border: 2px solid #FFB6C1; border-radius: 25px; font-size: 16px; outline: none;">
                            <button onclick="agregarFamiliar()" style="background: linear-gradient(45deg, #FF69B4, #FF1493); color: white; border: none; padding: 12px 20px; border-radius: 25px; cursor: pointer; font-size: 16px; transition: transform 0.3s;">Agregar</button>
                        </div>
                    </div>
                    
                    <!-- Lista de familiares (se llena dinámicamente) -->
                    <div id="familiares-lista" style="margin-bottom: 1.5rem;">
                        <!-- JavaScript llenará este contenido -->
                    </div>
                    
                    <!-- Botones de acción -->
                    <div style="text-align: center;">
                        <button onclick="realizarSorteoFamiliar()" id="btn-sorteo-familiar" style="background: linear-gradient(45deg, #4169E1, #6495ED); color: white; border: none; padding: 15px 30px; border-radius: 30px; cursor: pointer; font-size: 18px; font-weight: bold; margin-right: 10px; transition: transform 0.3s;">🎲 Realizar Sorteo</button>
                        <button onclick="reiniciarSorteoFamiliar()" style="background: linear-gradient(45deg, #FF6347, #FF4500); color: white; border: none; padding: 15px 30px; border-radius: 30px; cursor: pointer; font-size: 18px; transition: transform 0.3s;">🔄 Reiniciar</button>
                    </div>
                    
                    <!-- Área de resultados (se llena dinámicamente) -->
                    <div id="resultado-familiar" style="margin-top: 2rem;">
                        <!-- JavaScript mostrará aquí los resultados -->
                    </div>
                </div>
            </div>
        `
    },

    empresa: {
        title: "🏢 Amigo Secreto Empresarial",
        subtitle: "Fortalece los lazos del equipo de trabajo",
        content: `
            <!-- Contenido descriptivo de la página empresarial -->
            <div class="content-grid">
                <div class="card">
                    <h3>🏢 Ambiente Profesional</h3>
                    <p>Mejora el ambiente laboral y crea vínculos más fuertes entre compañeros de trabajo a través de esta divertida tradición.</p>
                    <div style="margin-top: 1rem;">
                        <span style="background: rgba(100,149,237,0.3); padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.9rem; color: #191970;">🤝 Team Building</span>
                    </div>
                </div>
                
                <div class="card">
                    <h3>💼 Regalos Corporativos</h3>
                    <p>Establece presupuestos razonables y fomenta regalos creativos que reflejen la personalidad de cada compañero.</p>
                    <div style="height: 50px; background: linear-gradient(45deg, #4169E1, #6495ED); border-radius: 10px; margin-top: 1rem; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                        💡 Creatividad Profesional 💡
                    </div>
                </div>
            </div>
            
            <!-- INTERFAZ DEL JUEGO EMPRESARIAL -->
            <div style="background: rgba(255,255,255,0.9); padding: 2rem; border-radius: 20px; margin-top: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                <h2 style="text-align: center; color: #191970; margin-bottom: 1.5rem;">👥 ¡Sorteo Empresarial!</h2>
                
                <div style="max-width: 500px; margin: 0 auto;">
                    <!-- Input para agregar compañeros -->
                    <div style="text-align: center; margin-bottom: 1.5rem;">
                        <label for="nombreCompañero" style="display: block; font-weight: bold; margin-bottom: 0.5rem; color: #333;">Ingresa a tu Compañero:</label>
                        <div style="display: flex; gap: 10px; justify-content: center;">
                            <input type="text" id="nombreCompañero" placeholder="Nombre del compañero..." style="flex: 1; max-width: 300px; padding: 12px 15px; border: 2px solid #6495ED; border-radius: 25px; font-size: 16px; outline: none;">
                            <button onclick="agregarCompañero()" style="background: linear-gradient(45deg, #4169E1, #6495ED); color: white; border: none; padding: 12px 20px; border-radius: 25px; cursor: pointer; font-size: 16px; transition: transform 0.3s;">Agregar</button>
                        </div>
                    </div>
                    
                    <!-- Lista de compañeros (se llena dinámicamente) -->
                    <div id="compañeros-lista" style="margin-bottom: 1.5rem;">
                        <!-- JavaScript llenará este contenido -->
                    </div>
                    
                    <!-- Botones de acción -->
                    <div style="text-align: center;">
                        <button onclick="realizarSorteoEmpresarial()" id="btn-sorteo-empresarial" style="background: linear-gradient(45deg, #FF69B4, #FF1493); color: white; border: none; padding: 15px 30px; border-radius: 30px; cursor: pointer; font-size: 18px; font-weight: bold; margin-right: 10px; transition: transform 0.3s;">🎲 Realizar Sorteo</button>
                        <button onclick="reiniciarSorteoEmpresarial()" style="background: linear-gradient(45deg, #FF6347, #FF4500); color: white; border: none; padding: 15px 30px; border-radius: 30px; cursor: pointer; font-size: 18px; transition: transform 0.3s;">🔄 Reiniciar</button>
                    </div>
                    
                    <!-- Área de resultados (se llena dinámicamente) -->
                    <div id="resultado-empresarial" style="margin-top: 2rem;">
                        <!-- JavaScript mostrará aquí los resultados -->
                    </div>
                </div>
            </div>
        `
    }
};

// ========================================================================
// ===================== NAVEGACIÓN DEL SITIO WEB =======================
// ========================================================================
// Esta sección maneja la navegación entre páginas del sitio web moderno

/**
 * MOSTRAR UNA PÁGINA ESPECÍFICA
 * Función principal de navegación - cambia entre las diferentes páginas
 * @param {string} pageId - ID de la página a mostrar (ej: 'familia', 'empresa', 'diseno')
 */
function showPage(pageId) {
    // Obtenemos referencias a los elementos principales del DOM
    const mainContent = document.getElementById('mainContent');     // Contenido principal (home)
    const pageContent = document.getElementById('pageContent');     // Contenedor de páginas
    const hero = document.querySelector('.hero');                   // Sección hero
    
    // Verificamos si la página existe en nuestro objeto pages
    if (pages[pageId]) {
        const page = pages[pageId];  // Obtenemos los datos de la página
        
        // ACTUALIZAR EL HERO (parte superior de la página)
        // Reemplazamos el hero original con el contenido específico de la página
        hero.innerHTML = `
            <h1>${page.title}</h1>
            <p>${page.subtitle}</p>
            <button onclick="showHome()" class="btn-primary">← Volver al inicio</button>
        `;
        
        // MOSTRAR EL CONTENIDO DE LA PÁGINA
        // Inyectamos el HTML de la página en el contenedor
        document.querySelector('.page-container').innerHTML = page.content;
        
        // CAMBIAR LA VISIBILIDAD DE LOS CONTENEDORES
        mainContent.style.display = 'none';   // Ocultamos el contenido principal
        pageContent.style.display = 'block';  // Mostramos el contenedor de páginas
        
        // INICIALIZACIÓN ESPECÍFICA SEGÚN EL TIPO DE PÁGINA
        if (pageId === 'familia') {
            actualizarListaFamiliares();   // Inicializamos la lista de familiares
        } else if (pageId === 'empresa') {
            actualizarListaCompañeros();   // Inicializamos la lista de compañeros
        }
        
        // SCROLL SUAVE HACIA ARRIBA
        // Llevamos al usuario al inicio de la nueva página
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

/**
 * VOLVER AL HOME/INICIO
 * Restaura la página principal del sitio
 */
function showHome() {
    // Obtenemos referencias a los elementos del DOM
    const mainContent = document.getElementById('mainContent');
    const pageContent = document.getElementById('pageContent');
    const hero = document.querySelector('.hero');
    
    // RESTAURAR EL HERO ORIGINAL
    // Volvemos al contenido original de la página de inicio
    hero.innerHTML = `
        <h1>¡Bienvenido a Jugar !</h1>
        <h2>🎄✨ ¡Vive la magia de la Navidad en familia, Comunidad y Empresa! ✨🎄</h2>
        <p>Disfruta de una experiencia moderna y divertida con un dinámico juego de Amigo Secreto 🎁. Una tradición presente en muchos países, ahora con un toque especial de sorpresa e intriga 😲.</p>
        <a href="#Intrucciones" class="btn-primary">Instrucciones</a>
    `;
    
    // CAMBIAR LA VISIBILIDAD DE LOS CONTENEDORES
    mainContent.style.display = 'grid';   // Mostramos el contenido principal (grid layout)
    pageContent.style.display = 'none';   // Ocultamos el contenedor de páginas
    
    // SCROLL SUAVE HACIA ARRIBA
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * TOGGLE DEL MENÚ MÓVIL
 * Función para mostrar/ocultar el menú en dispositivos móviles
 */
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');  // Alternamos la clase 'active'
}

// ========================================================================
// ================= EFECTOS Y ANIMACIONES DEL SITIO ===================
// ========================================================================
// Esta sección contiene todas las mejoras visuales y de experiencia de usuario

/**
 * APLICAR ESTILOS CSS DINÁMICOS
 * Creamos y aplicamos estilos CSS que no están en el archivo CSS principal
 */
function aplicarEstilosDinamicos() {
    const style = document.createElement('style');
    style.textContent = `
        /* Animación para mensajes flotantes */
        @keyframes slideIn {
            from { 
                transform: translateX(100%); 
                opacity: 0; 
            }
            to { 
                transform: translateX(0); 
                opacity: 1; 
            }
        }
        
        /* Efectos hover para botones principales */
        .btn-primary:hover, 
        .btn-secondary:hover {
            transform: translateY(-2px);              /* Levantamos ligeramente */
            box-shadow: 0 8px 25px rgba(0,0,0,0.15); /* Sombra más pronunciada */
        }
        
        /* Efectos hover para todos los botones */
        button:hover {
            transform: scale(1.05) !important;        /* Aumentamos el tamaño */
            transition: transform 0.3s ease;         /* Transición suave */
        }
        
        /* Efectos hover para tarjetas */
        .card:hover {
            transform: translateY(-5px);              /* Levantamos la tarjeta */
            box-shadow: 0 15px 35px rgba(0,0,0,0.1); /* Sombra más grande */
            transition: all 0.3s ease;               /* Transición suave */
        }
        
        /* Responsive: ocultar elementos en móviles */
        @media (max-width: 768px) {
            .nav-links {
                display: none;                        /* Ocultamos menú por defecto */
            }
            .nav-links.active {
                display: flex;                        /* Mostramos cuando está activo */
                flex-direction: column;               /* Disposición vertical */
                position: absolute;                   /* Posicionamiento absoluto */
                top: 100%;                           /* Justo debajo del navbar */
                left: 0;
                right: 0;
                background: white;                   /* Fondo blanco */
                box-shadow: 0 5px 15px rgba(0,0,0,0.1); /* Sombra */
                z-index: 1000;                       /* Encima de todo */
            }
        }
        
        /* Animaciones sutiles para inputs */
        input:focus {
            transform: scale(1.02);                  /* Aumento sutil al hacer focus */
            box-shadow: 0 0 15px rgba(100,149,237,0.3); /* Brillo azul */
        }
        
        /* Gradientes animados */
        .gradient-animated {
            background: linear-gradient(-45deg, #FF69B4, #4169E1, #32CD32, #FF4500);
            background-size: 400% 400%;              /* Tamaño grande para animación */
            animation: gradientShift 4s ease infinite; /* Animación continua */
        }
        
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    `;
    document.head.appendChild(style);  // Agregamos los estilos al documento
}

// ========================================================================
// =============== EVENT LISTENERS Y CONFIGURACIÓN INICIAL ===============
// ========================================================================
// Esta sección configura todos los eventos y la inicialización del sistema

/**
 * CONFIGURAR SMOOTH SCROLLING
 * Hace que los enlaces internos (#) tengan desplazamiento suave
 */
function configurarSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();  // Evitamos el comportamiento por defecto
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',  // Desplazamiento suave
                    block: 'start'       // Alineación al inicio
                });
            }
        });
    });
}

/**
 * CONFIGURAR CIERRE DE MENÚ MÓVIL
 * Cierra el menú móvil cuando se hace clic en un enlace
 */
function configurarCierreMenuMovil() {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('navLinks').classList.remove('active');
        });
    });
}

/**
 * EFECTO DE SCROLL EN NAVBAR
 * Cambia la apariencia del navbar según el scroll
 */
function configurarEfectoScrollNavbar() {
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                // Cuando hacemos scroll hacia abajo, navbar más opaco
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                // Al inicio, navbar más transparente
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(5px)';
            }
        }
    });
}

/**
 * CONFIGURAR TECLAS DE ACCESO RÁPIDO
 * Permite usar el teclado para navegar
 */
function configurarTeclasRapidas() {
    document.addEventListener('keydown', function(e) {
        // Solo funcionan si no estamos escribiendo en un input
        if (e.target.tagName !== 'INPUT') {
            switch(e.key) {
                case 'h':
                case 'H':
                    showHome();  // H para Home
                    break;
                case 'f':
                case 'F':
                    showPage('familia');  // F para Familia
                    break;
                case 'e':
                case 'E':
                    showPage('empresa');  // E para Empresa
                    break;
                case 'Escape':
                    showHome();  // Escape siempre vuelve al inicio
                    break;
            }
        }
    });
}

/**
 * CONFIGURAR ENTER EN INPUTS
 * Permite agregar participantes presionando Enter
 */
function configurarEnterInputs() {
    // Input de familiares
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            if (e.target.id === 'nombreFamiliar') {
                agregarFamiliar();
            } else if (e.target.id === 'nombreCompañero') {
                agregarCompañero();
            }
        }
    });
}

/**
 * FUNCIÓN DE INICIALIZACIÓN PRINCIPAL
 * Se ejecuta cuando el DOM está completamente cargado
 */
function inicializarSistema() {
    console.log('🎯 Iniciando sistema de Amigo Secreto...');
    
    // PASO 1: Cargar datos guardados
    cargarDatos();
    console.log('✅ Datos cargados desde localStorage');
    
    // PASO 2: Aplicar estilos dinámicos
    aplicarEstilosDinamicos();
    console.log('✅ Estilos dinámicos aplicados');
    
    // PASO 3: Configurar eventos de navegación
    configurarSmoothScrolling();
    configurarCierreMenuMovil();
    configurarEfectoScrollNavbar();
    console.log('✅ Eventos de navegación configurados');
    
    // PASO 4: Configurar funcionalidades adicionales
    configurarTeclasRapidas();
    configurarEnterInputs();
    console.log('✅ Funcionalidades adicionales configuradas');
    
    // PASO 5: Mostrar mensaje de bienvenida
    setTimeout(() => {
        mostrarMensaje('¡Sistema cargado correctamente! Usa F para Familia, E para Empresa', 'success');
    }, 1000);
    
    console.log('🎉 Sistema completamente inicializado');
    console.log('📖 Teclas rápidas: H=Home, F=Familia, E=Empresa, Esc=Volver al inicio');
}

// ========================================================================
// ====================== INICIALIZACIÓN AUTOMÁTICA =====================
// ========================================================================

/**
 * EVENT LISTENER PRINCIPAL
 * Se ejecuta automáticamente cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', inicializarSistema);

/**
 * RESPALDO DE INICIALIZACIÓN
 * Por si el DOMContentLoaded ya pasó
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarSistema);
} else {
    inicializarSistema();  // El DOM ya está listo, ejecutamos inmediatamente
}

// ========================================================================
// ========================= FUNCIONES DE DEBUG =========================
// ========================================================================
// Estas funciones son útiles para desarrollo y debugging

/**
 * FUNCIÓN DE DIAGNÓSTICO
 * Muestra información del estado actual del sistema
 */
function diagnosticoSistema() {
    console.log('=== DIAGNÓSTICO DEL SISTEMA ===');
    console.log('Familiares:', familiares.length, familiares);
    console.log('Compañeros:', compañeros.length, compañeros);
    console.log('Historial de sorteos:', historialSorteos.length);
    console.log('Página actual visible:', 
                document.getElementById('mainContent').style.display !== 'none' ? 'HOME' : 'PÁGINA');
    
    // Verificar elementos del DOM
    const elementos = ['mainContent', 'pageContent', 'navLinks'];
    elementos.forEach(id => {
        const elemento = document.getElementById(id);
        console.log(`Elemento ${id}:`, elemento ? '✅ Encontrado' : '❌ No encontrado');
    });
}

/**
 * LIMPIAR TODO EL SISTEMA
 * Función de utilidad para resetear completamente el sistema
 */
function limpiarTodoElSistema() {
    familiares = [];
    compañeros = [];
    historialSorteos = [];
    localStorage.removeItem('sorteoData');
    
    // Limpiar interfaces
    const elementos = ['familiares-lista', 'compañeros-lista', 'resultado-familiar', 'resultado-empresarial'];
    elementos.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = '';
    });
    
    // Limpiar inputs
    const inputs = ['nombreFamiliar', 'nombreCompañero'];
    inputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) input.value = '';
    });
    
    mostrarMensaje('Sistema completamente limpiado', 'info');
    console.log('🧹 Sistema limpiado completamente');
}

// Hacemos las funciones de debug accesibles globalmente para la consola
window.diagnosticoSistema = diagnosticoSistema;
window.limpiarTodoElSistema = limpiarTodoElSistema;

console.log('🔧 Funciones de debug disponibles: diagnosticoSistema(), limpiarTodoElSistema()');

// ========================================================================
// =============================== FIN ===================================
// ========================================================================
// Sistema completo de Amigo Secreto con interfaz web moderna
// Creado para aprendizaje y demostración de técnicas web modernas