// tech_Use.js - Sistema integrado con páginas y sorteos

// Crear instancia global de SorteoApp
let sorteoApp;

// Páginas de contenido (incluye las existentes + nuevas para sorteos)
const pages = {
    // Páginas originales
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

    // NUEVA: Página de sorteo familiar
    familia: {
        title: "🎁 Amigo Secreto Familiar",
        subtitle: "Tradición navideña que une corazones en familia",
        content: `
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
            
            <!-- SECCIÓN DEL JUEGO -->
            <div style="background: rgba(255,255,255,0.9); padding: 2rem; border-radius: 20px; margin-top: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                <h2 style="text-align: center; color: #8B0000; margin-bottom: 1.5rem;">🎯 ¡Comienza el Sorteo!</h2>
                
                <div style="max-width: 500px; margin: 0 auto;">
                    <div style="text-align: center; margin-bottom: 1.5rem;">
                        <label for="nombreFamiliar" style="display: block; font-weight: bold; margin-bottom: 0.5rem; color: #333;">Ingresa a tu Familiar:</label>
                        <div style="display: flex; gap: 10px; justify-content: center;">
                            <input type="text" id="nombreFamiliar" placeholder="Nombre del familiar..." style="flex: 1; max-width: 300px; padding: 12px 15px; border: 2px solid #FFB6C1; border-radius: 25px; font-size: 16px; outline: none;">
                            <button onclick="agregarFamiliar()" style="background: linear-gradient(45deg, #FF69B4, #FF1493); color: white; border: none; padding: 12px 20px; border-radius: 25px; cursor: pointer; font-size: 16px; transition: transform 0.3s;">Agregar</button>
                        </div>
                    </div>
                    
                    <div id="familiares-lista" style="margin-bottom: 1.5rem;">
                        <!-- Aquí aparecerán los familiares agregados -->
                    </div>
                    
                    <div style="text-align: center;">
                        <button onclick="realizarSorteoFamiliar()" id="btn-sorteo-familiar" style="background: linear-gradient(45deg, #4169E1, #6495ED); color: white; border: none; padding: 15px 30px; border-radius: 30px; cursor: pointer; font-size: 18px; font-weight: bold; margin-right: 10px; transition: transform 0.3s;">🎲 Realizar Sorteo</button>
                        <button onclick="reiniciarSorteoFamiliar()" style="background: linear-gradient(45deg, #FF6347, #FF4500); color: white; border: none; padding: 15px 30px; border-radius: 30px; cursor: pointer; font-size: 18px; transition: transform 0.3s;">🔄 Reiniciar</button>
                    </div>
                    
                    <div id="resultado-familiar" style="margin-top: 2rem;">
                        <!-- Aquí aparecerá el resultado -->
                    </div>
                </div>
            </div>
        `
    },

    // NUEVA: Página de sorteo empresarial  
    empresa: {
        title: "🏢 Amigo Secreto Empresarial",
        subtitle: "Fortalece los lazos del equipo de trabajo",
        content: `
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
            
            <!-- SECCIÓN DEL JUEGO EMPRESARIAL -->
            <div style="background: rgba(255,255,255,0.9); padding: 2rem; border-radius: 20px; margin-top: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
                <h2 style="text-align: center; color: #191970; margin-bottom: 1.5rem;">👥 ¡Sorteo Empresarial!</h2>
                
                <div style="max-width: 500px; margin: 0 auto;">
                    <div style="text-align: center; margin-bottom: 1.5rem;">
                        <label for="nombreCompañero" style="display: block; font-weight: bold; margin-bottom: 0.5rem; color: #333;">Ingresa a tu Compañero:</label>
                        <div style="display: flex; gap: 10px; justify-content: center;">
                            <input type="text" id="nombreCompañero" placeholder="Nombre del compañero..." style="flex: 1; max-width: 300px; padding: 12px 15px; border: 2px solid #6495ED; border-radius: 25px; font-size: 16px; outline: none;">
                            <button onclick="agregarCompañero()" style="background: linear-gradient(45deg, #4169E1, #6495ED); color: white; border: none; padding: 12px 20px; border-radius: 25px; cursor: pointer; font-size: 16px; transition: transform 0.3s;">Agregar</button>
                        </div>
                    </div>
                    
                    <div id="compañeros-lista" style="margin-bottom: 1.5rem;">
                        <!-- Aquí aparecerán los compañeros agregados -->
                    </div>
                    
                    <div style="text-align: center;">
                        <button onclick="realizarSorteoEmpresarial()" id="btn-sorteo-empresarial" style="background: linear-gradient(45deg, #FF69B4, #FF1493); color: white; border: none; padding: 15px 30px; border-radius: 30px; cursor: pointer; font-size: 18px; font-weight: bold; margin-right: 10px; transition: transform 0.3s;">🎲 Realizar Sorteo</button>
                        <button onclick="reiniciarSorteoEmpresarial()" style="background: linear-gradient(45deg, #FF6347, #FF4500); color: white; border: none; padding: 15px 30px; border-radius: 30px; cursor: pointer; font-size: 18px; transition: transform 0.3s;">🔄 Reiniciar</button>
                    </div>
                    
                    <div id="resultado-empresarial" style="margin-top: 2rem;">
                        <!-- Aquí aparecerá el resultado -->
                    </div>
                </div>
            </div>
        `
    }
};

// Arrays para almacenar participantes
let familiares = [];
let compañeros = [];
let historialSorteos = [];

// Función principal para mostrar páginas
function showPage(pageId) {
    const mainContent = document.getElementById('mainContent');
    const pageContent = document.getElementById('pageContent');
    const hero = document.querySelector('.hero');
    
    if (pages[pageId]) {
        const page = pages[pageId];
        
        // Actualizar el hero con el contenido de la página
        hero.innerHTML = `
            <h1>${page.title}</h1>
            <p>${page.subtitle}</p>
            <button onclick="showHome()" class="btn-primary">← Volver al inicio</button>
        `;
        
        // Mostrar el contenido de la página
        document.querySelector('.page-container').innerHTML = page.content;
        
        // Ocultar contenido principal y mostrar página
        mainContent.style.display = 'none';
        pageContent.style.display = 'block';
        
        // Si es una página de sorteo, inicializar las listas
        if (pageId === 'familia') {
            actualizarListaFamiliares();
        } else if (pageId === 'empresa') {
            actualizarListaCompañeros();
        }
        
        // Scroll suave hacia arriba
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// ==================== FUNCIONES PARA SORTEO FAMILIAR ====================

function agregarFamiliar() {
    const input = document.getElementById('nombreFamiliar');
    const nombre = input.value.trim();
    
    if (!nombre) {
        mostrarMensaje('Por favor ingresa un nombre válido', 'error');
        return;
    }
    
    if (nombre.length < 2) {
        mostrarMensaje('El nombre debe tener al menos 2 caracteres', 'error');
        return;
    }
    
    if (familiares.some(f => f.toLowerCase() === nombre.toLowerCase())) {
        mostrarMensaje('Este familiar ya está en la lista', 'error');
        return;
    }
    
    familiares.push(nombre);
    input.value = '';
    actualizarListaFamiliares();
    mostrarMensaje(`${nombre} agregado correctamente`, 'success');
}

function eliminarFamiliar(index) {
    const nombre = familiares[index];
    familiares.splice(index, 1);
    actualizarListaFamiliares();
    mostrarMensaje(`${nombre} eliminado`, 'info');
}

function actualizarListaFamiliares() {
    const lista = document.getElementById('familiares-lista');
    if (!lista) return;
    
    if (familiares.length === 0) {
        lista.innerHTML = '<p style="text-align: center; color: #666;">No hay familiares agregados aún</p>';
        return;
    }
    
    lista.innerHTML = `
        <h4 style="text-align: center; margin-bottom: 1rem; color: #8B0000;">Familiares (${familiares.length}):</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
            ${familiares.map((familiar, index) => `
                <div style="background: #FFB6C1; color: white; padding: 10px 15px; border-radius: 20px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: bold;">${familiar}</span>
                    <button onclick="eliminarFamiliar(${index})" style="background: none; border: none; color: white; cursor: pointer; font-size: 16px;">❌</button>
                </div>
            `).join('')}
        </div>
    `;
}

function realizarSorteoFamiliar() {
    if (familiares.length < 2) {
        mostrarMensaje('Se necesitan al menos 2 familiares para realizar el sorteo', 'error');
        return;
    }
    
    const resultado = realizarSorteoInteligente(familiares);
    
    // Guardar en historial
    const sorteo = {
        tipo: 'familiar',
        fecha: new Date(),
        participantes: familiares.length,
        asignaciones: resultado
    };
    historialSorteos.push(sorteo);
    
    mostrarResultadoFamiliar(resultado);
    mostrarMensaje('¡Sorteo familiar realizado con éxito!', 'success');
}

function mostrarResultadoFamiliar(resultado) {
    const div = document.getElementById('resultado-familiar');
    div.innerHTML = `
        <div style="background: linear-gradient(135deg, #E6FFE6 0%, #E6F3FF 100%); padding: 2rem; border-radius: 15px; text-align: center;">
            <h3 style="color: #228B22; margin-bottom: 1rem;">🎉 ¡Sorteo Familiar Realizado!</h3>
            <p style="margin-bottom: 1.5rem;">Se ha sorteado exitosamente entre ${familiares.length} familiares</p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin-bottom: 2rem;">
                ${resultado.map(asignacion => `
                    <div style="background: white; padding: 15px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                        <strong style="color: #FF69B4;">${asignacion.dador}</strong><br>
                        <span style="color: #666;">le da regalo a</span><br>
                        <strong style="color: #4169E1;">${asignacion.receptor}</strong>
                    </div>
                `).join('')}
            </div>
            
            <button onclick="exportarResultados('familiar')" style="background: linear-gradient(45deg, #32CD32, #228B22); color: white; border: none; padding: 12px 25px; border-radius: 25px; cursor: pointer; font-size: 16px; transition: transform 0.3s;">📄 Exportar Resultados</button>
        </div>
    `;
}

function reiniciarSorteoFamiliar() {
    familiares = [];
    actualizarListaFamiliares();
    document.getElementById('resultado-familiar').innerHTML = '';
    mostrarMensaje('Sorteo familiar reiniciado', 'info');
}

// ==================== FUNCIONES PARA SORTEO EMPRESARIAL ====================

function agregarCompañero() {
    const input = document.getElementById('nombreCompañero');
    const nombre = input.value.trim();
    
    if (!nombre) {
        mostrarMensaje('Por favor ingresa un nombre válido', 'error');
        return;
    }
    
    if (nombre.length < 2) {
        mostrarMensaje('El nombre debe tener al menos 2 caracteres', 'error');
        return;
    }
    
    if (compañeros.some(c => c.toLowerCase() === nombre.toLowerCase())) {
        mostrarMensaje('Este compañero ya está en la lista', 'error');
        return;
    }
    
    compañeros.push(nombre);
    input.value = '';
    actualizarListaCompañeros();
    mostrarMensaje(`${nombre} agregado correctamente`, 'success');
}

function eliminarCompañero(index) {
    const nombre = compañeros[index];
    compañeros.splice(index, 1);
    actualizarListaCompañeros();
    mostrarMensaje(`${nombre} eliminado`, 'info');
}

function actualizarListaCompañeros() {
    const lista = document.getElementById('compañeros-lista');
    if (!lista) return;
    
    if (compañeros.length === 0) {
        lista.innerHTML = '<p style="text-align: center; color: #666;">No hay compañeros agregados aún</p>';
        return;
    }
    
    lista.innerHTML = `
        <h4 style="text-align: center; margin-bottom: 1rem; color: #191970;">Compañeros (${compañeros.length}):</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px;">
            ${compañeros.map((compañero, index) => `
                <div style="background: #6495ED; color: white; padding: 10px 15px; border-radius: 20px; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: bold;">${compañero}</span>
                    <button onclick="eliminarCompañero(${index})" style="background: none; border: none; color: white; cursor: pointer; font-size: 16px;">❌</button>
                </div>
            `).join('')}
        </div>
    `;
}

function realizarSorteoEmpresarial() {
    if (compañeros.length < 2) {
        mostrarMensaje('Se necesitan al menos 2 compañeros para realizar el sorteo', 'error');
        return;
    }
    
    const resultado = realizarSorteoInteligente(compañeros);
    
    // Guardar en historial
    const sorteo = {
        tipo: 'empresarial',
        fecha: new Date(),
        participantes: compañeros.length,
        asignaciones: resultado
    };
    historialSorteos.push(sorteo);
    
    mostrarResultadoEmpresarial(resultado);
    mostrarMensaje('¡Sorteo empresarial realizado con éxito!', 'success');
}

function mostrarResultadoEmpresarial(resultado) {
    const div = document.getElementById('resultado-empresarial');
    div.innerHTML = `
        <div style="background: linear-gradient(135deg, #E6F3FF 0%, #F0F8FF 100%); padding: 2rem; border-radius: 15px; text-align: center;">
            <h3 style="color: #191970; margin-bottom: 1rem;">🎉 ¡Sorteo Empresarial Realizado!</h3>
            <p style="margin-bottom: 1.5rem;">Se ha sorteado exitosamente entre ${compañeros.length} compañeros</p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; margin-bottom: 2rem;">
                ${resultado.map(asignacion => `
                    <div style="background: white; padding: 15px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
                        <strong style="color: #4169E1;">${asignacion.dador}</strong><br>
                        <span style="color: #666;">le da regalo a</span><br>
                        <strong style="color: #FF69B4;">${asignacion.receptor}</strong>
                    </div>
                `).join('')}
            </div>
            
            <button onclick="exportarResultados('empresarial')" style="background: linear-gradient(45deg, #32CD32, #228B22); color: white; border: none; padding: 12px 25px; border-radius: 25px; cursor: pointer; font-size: 16px; transition: transform 0.3s;">📄 Exportar Resultados</button>
        </div>
    `;
}

function reiniciarSorteoEmpresarial() {
    compañeros = [];
    actualizarListaCompañeros();
    document.getElementById('resultado-empresarial').innerHTML = '';
    mostrarMensaje('Sorteo empresarial reiniciado', 'info');
}

// ==================== FUNCIONES AUXILIARES ====================

function realizarSorteoInteligente(participantes) {
    let asignaciones = [];
    let disponibles = [...participantes];
    
    for (let i = 0; i < participantes.length; i++) {
        const dador = participantes[i];
        const posiblesReceptores = disponibles.filter(p => p !== dador);
        
        if (posiblesReceptores.length === 0) {
            // Si no hay opciones, reintentar
            return realizarSorteoInteligente(participantes);
        }
        
        const receptorIndex = Math.floor(Math.random() * posiblesReceptores.length);
        const receptor = posiblesReceptores[receptorIndex];
        
        asignaciones.push({ dador, receptor });
        disponibles = disponibles.filter(p => p !== receptor);
    }
    
    return asignaciones;
}

function mostrarMensaje(mensaje, tipo = 'info') {
    const messageEl = document.createElement('div');
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    switch(tipo) {
        case 'success':
            messageEl.style.background = '#32CD32';
            break;
        case 'error':
            messageEl.style.background = '#FF4500';
            break;
        case 'info':
            messageEl.style.background = '#4169E1';
            break;
        default:
            messageEl.style.background = '#666';
    }
    
    messageEl.textContent = mensaje;
    document.body.appendChild(messageEl);
    
    setTimeout(() => {
        if (messageEl.parentNode) {
            messageEl.parentNode.removeChild(messageEl);
        }
    }, 3000);
}

function exportarResultados(tipo) {
    const sorteo = historialSorteos.find(s => s.tipo === tipo);
    if (!sorteo) return;
    
    const data = {
        tipo: sorteo.tipo,
        fecha: sorteo.fecha,
        participantes: sorteo.participantes,
        asignaciones: sorteo.asignaciones,
        exportDate: new Date()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sorteo_${tipo}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

// ==================== FUNCIONES ORIGINALES ====================

function showHome() {
    const mainContent = document.getElementById('mainContent');
    const pageContent = document.getElementById('pageContent');
    const hero = document.querySelector('.hero');
    
    // Restaurar el hero original
    hero.innerHTML = `
        <h1>¡Bienvenido a Jugar !</h1>
        <h2>🎄✨ ¡Vive la magia de la Navidad en familia, Comunidad y Empresa! ✨🎄</h2>
        <p>Disfruta de una experiencia moderna y divertida con un dinámico juego de Amigo Secreto 🎁. Una tradición presente en muchos países, ahora con un toque especial de sorpresa e intriga 😲.</p>
        <a href="#Intrucciones" class="btn-primary">Instrucciones</a>
    `;
    
    // Mostrar contenido principal y ocultar página
    mainContent.style.display = 'grid';
    pageContent.style.display = 'none';
    
    // Scroll suave hacia arriba
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('active');
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    }
});

// Agregar estilos CSS para las animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    .btn-primary:hover, .btn-secondary:hover {
        transform: translateY(-2px);
    }
    
    button:hover {
        transform: scale(1.05) !important;
    }
    
    .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba(0,0,0,0.1);
    }
`;
document.head.appendChild(style);

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistema de sorteos cargado correctamente');
    
    // Cargar datos guardados si existen
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
});

// Guardar datos automáticamente
function guardarDatos() {
    const datos = {
        historial: historialSorteos,
        fechaGuardado: new Date()
    };
    localStorage.setItem('sorteoData', JSON.stringify(datos));
}

// Guardar automáticamente cuando se realiza un sorteo
const originalRealizarSorteoFamiliar = realizarSorteoFamiliar;
const originalRealizarSorteoEmpresarial = realizarSorteoEmpresarial;

realizarSorteoFamiliar = function() {
    originalRealizarSorteoFamiliar();
    guardarDatos();
};

realizarSorteoEmpresarial = function() {
    originalRealizarSorteoEmpresarial();
    guardarDatos();
};