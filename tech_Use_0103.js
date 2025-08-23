
       
       // app.js - Sistema de Sorteos para Familias y Empresas

class SorteoApp {
    constructor() {
        this.participantes = [];
        this.historialJuegos = [];
        this.juegoActual = null;
        this.estadisticas = {
            totalJuegos: 0,
            totalParticipantes: 0,
            promedioPorJuego: 0
        };
        
        this.initializeApp();
        this.loadFromStorage();
    }

    // Contenido de las páginas 
    pages = {
        familiaAmigo: {
            title: "Amigo Secreto Familiar",
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
                </div>
                
                <!-- Formulario para agregar participantes -->
                <div class="sorteo-section">
                    <div class="input-section">
                        <h3>🎯 Ingresa a tu Amigo</h3>
                        <div class="input-group">
                            <input type="text" id="nombreParticipante" placeholder="Nombre del participante..." class="participant-input">
                            <button onclick="app.agregarParticipante('familia')" class="add-btn">Agregar</button>
                        </div>
                    </div>
                    
                    <div class="participants-grid" id="participantesGrid">
                        <!-- Los participantes se mostrarán aquí -->
                    </div>
                    
                    <div class="sorteo-controls">
                        <button onclick="app.realizarSorteo('familia')" class="sorteo-btn" id="sorteoBtn">🎲 Realizar Sorteo</button>
                        <button onclick="app.reiniciarJuego()" class="reset-btn">🔄 Nuevo Juego</button>
                    </div>
                    
                    <div class="resultado-sorteo" id="resultadoSorteo">
                        <!-- El resultado del sorteo aparecerá aquí -->
                    </div>
                </div>
            `
        },
        
        empresaAmigo: {
            title: "Amigo Secreto Empresarial",
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
                
                <!-- Formulario para agregar participantes empresariales -->
                <div class="sorteo-section">
                    <div class="input-section">
                        <h3>👥 Ingresa a tu Compañero</h3>
                        <div class="input-group">
                            <input type="text" id="nombreParticipanteEmpresa" placeholder="Nombre del compañero..." class="participant-input">
                            <button onclick="app.agregarParticipante('empresa')" class="add-btn">Agregar</button>
                        </div>
                    </div>
                    
                    <div class="participants-grid" id="participantesGridEmpresa">
                        <!-- Los participantes se mostrarán aquí -->
                    </div>
                    
                    <div class="sorteo-controls">
                        <button onclick="app.realizarSorteo('empresa')" class="sorteo-btn" id="sorteoBtnEmpresa">🎲 Realizar Sorteo</button>
                        <button onclick="app.reiniciarJuego()" class="reset-btn">🔄 Nuevo Juego</button>
                    </div>
                    
                    <div class="resultado-sorteo" id="resultadoSorteoEmpresa">
                        <!-- El resultado del sorteo aparecerá aquí -->
                    </div>
                </div>
            `
        },
        
        dashboard: {
            title: "📊 Dashboard de Estadísticas",
            subtitle: "Analiza los datos de tus sorteos",
            content: `
                <div class="stats-overview">
                    <div class="stat-card">
                        <h3 id="totalJuegos">0</h3>
                        <p>Total de Juegos</p>
                    </div>
                    <div class="stat-card">
                        <h3 id="totalParticipantes">0</h3>
                        <p>Total Participantes</p>
                    </div>
                    <div class="stat-card">
                        <h3 id="promedioParticipantes">0</h3>
                        <p>Promedio por Juego</p>
                    </div>
                </div>
                
                <div class="charts-container">
                    <div class="chart-section">
                        <h3>📈 Juegos por Tipo</h3>
                        <canvas id="tipoJuegosChart"></canvas>
                    </div>
                    <div class="chart-section">
                        <h3>📊 Participantes por Juego</h3>
                        <canvas id="participantesChart"></canvas>
                    </div>
                    <div class="chart-section">
                        <h3>📉 Evolución Temporal</h3>
                        <canvas id="evolucionChart"></canvas>
                    </div>
                </div>
            `
        }
    };

    // Inicialización de la aplicación
    initializeApp() {
        this.createNavigation();
        this.loadPage('familiaAmigo');
    }

    // Crear navegación
    createNavigation() {
        const nav = document.getElementById('navigation');
        if (nav) {
            nav.innerHTML = `
                <button onclick="app.loadPage('familiaAmigo')" class="nav-btn active" id="nav-familiaAmigo">👨‍👩‍👧‍👦 Familia</button>
                <button onclick="app.loadPage('empresaAmigo')" class="nav-btn" id="nav-empresaAmigo">🏢 Empresa</button>
                <button onclick="app.loadPage('dashboard')" class="nav-btn" id="nav-dashboard">📊 Dashboard</button>
            `;
        }
    }

    // Cargar página
    loadPage(pageId) {
        const contentDiv = document.getElementById('content');
        const page = this.pages[pageId];
        
        if (page && contentDiv) {
            contentDiv.innerHTML = `
                <div class="page-header">
                    <h1>${page.title}</h1>
                    <p class="subtitle">${page.subtitle}</p>
                </div>
                ${page.content}
            `;

            // Actualizar navegación activa
            document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
            document.getElementById(`nav-${pageId}`)?.classList.add('active');

            // Si es dashboard, cargar gráficos
            if (pageId === 'dashboard') {
                setTimeout(() => this.loadDashboard(), 100);
            }

            // Actualizar grillas de participantes
            if (pageId === 'familiaAmigo' || pageId === 'empresaAmigo') {
                setTimeout(() => this.updateParticipantsGrid(pageId === 'familiaAmigo' ? 'familia' : 'empresa'), 100);
            }
        }
    }

    // Validar y agregar participante
    agregarParticipante(tipo) {
        const inputId = tipo === 'familia' ? 'nombreParticipante' : 'nombreParticipanteEmpresa';
        const input = document.getElementById(inputId);
        const nombre = input?.value?.trim();

        if (!nombre) {
            this.showMessage('Por favor ingresa un nombre válido', 'error');
            return;
        }

        if (nombre.length < 2) {
            this.showMessage('El nombre debe tener al menos 2 caracteres', 'error');
            return;
        }

        if (this.participantes.some(p => p.nombre.toLowerCase() === nombre.toLowerCase())) {
            this.showMessage('Este participante ya está en la lista', 'error');
            return;
        }

        // Agregar al array
        const participante = {
            id: Date.now(),
            nombre: nombre,
            tipo: tipo,
            fechaAgregado: new Date()
        };

        this.participantes.push(participante);
        input.value = '';
        
        this.updateParticipantsGrid(tipo);
        this.showMessage(`${nombre} agregado correctamente`, 'success');
    }

    // Actualizar grilla de participantes
    updateParticipantsGrid(tipo) {
        const gridId = tipo === 'familia' ? 'participantesGrid' : 'participantesGridEmpresa';
        const grid = document.getElementById(gridId);
        
        if (!grid) return;

        const participantesTipo = this.participantes.filter(p => p.tipo === tipo);
        
        grid.innerHTML = participantesTipo.map(p => `
            <div class="participant-card">
                <span class="participant-name">${p.nombre}</span>
                <button onclick="app.eliminarParticipante(${p.id})" class="remove-btn">❌</button>
            </div>
        `).join('');
    }

    // Eliminar participante
    eliminarParticipante(id) {
        const participante = this.participantes.find(p => p.id === id);
        if (participante) {
            this.participantes = this.participantes.filter(p => p.id !== id);
            this.updateParticipantsGrid(participante.tipo);
            this.showMessage(`${participante.nombre} eliminado`, 'info');
        }
    }

    // Realizar sorteo
    realizarSorteo(tipo) {
        const participantesTipo = this.participantes.filter(p => p.tipo === tipo);
        
        if (participantesTipo.length < 2) {
            this.showMessage('Se necesitan al menos 2 participantes para realizar el sorteo', 'error');
            return;
        }

        // Realizar sorteo (evitar que alguien se saque a sí mismo)
        let asignaciones = [];
        let participantesCopia = [...participantesTipo];
        
        for (let i = 0; i < participantesTipo.length; i++) {
            const dador = participantesTipo[i];
            const posiblesReceptores = participantesCopia.filter(p => p.id !== dador.id);
            
            if (posiblesReceptores.length === 0) {
                // Si no hay opciones, reintentar el sorteo
                return this.realizarSorteo(tipo);
            }
            
            const receptorIndex = Math.floor(Math.random() * posiblesReceptores.length);
            const receptor = posiblesReceptores[receptorIndex];
            
            asignaciones.push({
                dador: dador.nombre,
                receptor: receptor.nombre
            });
            
            participantesCopia = participantesCopia.filter(p => p.id !== receptor.id);
        }

        // Guardar juego
        const juego = {
            id: Date.now(),
            tipo: tipo,
            fecha: new Date(),
            participantes: participantesTipo.length,
            asignaciones: asignaciones
        };

        this.historialJuegos.push(juego);
        this.juegoActual = juego;
        
        // Mostrar resultado
        const resultadoId = tipo === 'familia' ? 'resultadoSorteo' : 'resultadoSorteoEmpresa';
        const resultadoDiv = document.getElementById(resultadoId);
        
        if (resultadoDiv) {
            resultadoDiv.innerHTML = `
                <div class="sorteo-result">
                    <h3>🎉 ¡Sorteo Realizado!</h3>
                    <p>Se ha sorteado exitosamente entre ${participantesTipo.length} participantes</p>
                    <div class="result-cards">
                        ${asignaciones.map(a => `
                            <div class="result-card">
                                <strong>${a.dador}</strong> le da regalo a <strong>${a.receptor}</strong>
                            </div>
                        `).join('')}
                    </div>
                    <button onclick="app.exportarResultados()" class="export-btn">📄 Exportar Resultados</button>
                </div>
            `;
        }

        this.saveToStorage();
        this.showMessage('¡Sorteo realizado con éxito!', 'success');
    }

    // Reiniciar juego
    reiniciarJuego() {
        this.participantes = [];
        this.juegoActual = null;
        
        // Limpiar grillas
        ['participantesGrid', 'participantesGridEmpresa'].forEach(id => {
            const grid = document.getElementById(id);
            if (grid) grid.innerHTML = '';
        });
        
        // Limpiar resultados
        ['resultadoSorteo', 'resultadoSorteoEmpresa'].forEach(id => {
            const resultado = document.getElementById(id);
            if (resultado) resultado.innerHTML = '';
        });
        
        this.showMessage('Juego reiniciado', 'info');
    }

    // Cargar dashboard
    loadDashboard() {
        this.updateStats();
        this.createCharts();
    }

    // Actualizar estadísticas
    updateStats() {
        const stats = this.calculateStats();
        
        const totalJuegosEl = document.getElementById('totalJuegos');
        const totalParticipantesEl = document.getElementById('totalParticipantes');
        const promedioEl = document.getElementById('promedioParticipantes');
        
        if (totalJuegosEl) totalJuegosEl.textContent = stats.totalJuegos;
        if (totalParticipantesEl) totalParticipantesEl.textContent = stats.totalParticipantes;
        if (promedioEl) promedioEl.textContent = stats.promedio.toFixed(1);
    }

    // Calcular estadísticas
    calculateStats() {
        const totalJuegos = this.historialJuegos.length;
        const totalParticipantes = this.historialJuegos.reduce((sum, juego) => sum + juego.participantes, 0);
        const promedio = totalJuegos > 0 ? totalParticipantes / totalJuegos : 0;

        return { totalJuegos, totalParticipantes, promedio };
    }

    // Crear gráficos
    createCharts() {
        this.createTipoJuegosChart();
        this.createParticipantesChart();
        this.createEvolucionChart();
    }

    // Gráfico de torta - tipos de juegos
    createTipoJuegosChart() {
        const ctx = document.getElementById('tipoJuegosChart');
        if (!ctx) return;

        const familiaCount = this.historialJuegos.filter(j => j.tipo === 'familia').length;
        const empresaCount = this.historialJuegos.filter(j => j.tipo === 'empresa').length;

        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Familia', 'Empresa'],
                datasets: [{
                    data: [familiaCount, empresaCount],
                    backgroundColor: ['#FF69B4', '#4169E1']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { position: 'bottom' }
                }
            }
        });
    }

    // Gráfico de barras - participantes por juego
    createParticipantesChart() {
        const ctx = document.getElementById('participantesChart');
        if (!ctx) return;

        const labels = this.historialJuegos.map((juego, index) => `Juego ${index + 1}`);
        const data = this.historialJuegos.map(juego => juego.participantes);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Participantes',
                    data: data,
                    backgroundColor: '#6495ED'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    // Gráfico de líneas - evolución temporal
    createEvolucionChart() {
        const ctx = document.getElementById('evolucionChart');
        if (!ctx) return;

        const labels = this.historialJuegos.map(juego => 
            new Date(juego.fecha).toLocaleDateString()
        );
        const data = this.historialJuegos.map(juego => juego.participantes);

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Participantes por Fecha',
                    data: data,
                    borderColor: '#FF69B4',
                    backgroundColor: 'rgba(255, 105, 180, 0.1)',
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }

    // Exportar resultados
    exportarResultados() {
        if (!this.juegoActual) return;

        const data = {
            juego: this.juegoActual,
            historial: this.historialJuegos,
            exportDate: new Date()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `sorteo_${this.juegoActual.tipo}_${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }

    // Mostrar mensajes
    showMessage(message, type = 'info') {
        // Crear elemento de mensaje
        const messageEl = document.createElement('div');
        messageEl.className = `message message-${type}`;
        messageEl.textContent = message;
        
        // Agregar al DOM
        document.body.appendChild(messageEl);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.parentNode.removeChild(messageEl);
            }
        }, 3000);
    }

    // Guardar en localStorage (simulando JSON)
    saveToStorage() {
        const data = {
            historialJuegos: this.historialJuegos,
            estadisticas: this.calculateStats(),
            lastUpdate: new Date()
        };
        
        // En un entorno real, aquí harías una petición al servidor
        // para guardar en un archivo JSON real
        localStorage.setItem('sorteoApp', JSON.stringify(data));
    }

    // Cargar desde localStorage
    loadFromStorage() {
        const data = localStorage.getItem('sorteoApp');
        if (data) {
            const parsed = JSON.parse(data);
            this.historialJuegos = parsed.historialJuegos || [];
            this.estadisticas = parsed.estadisticas || {};
        }
    }
}

// Inicializar aplicación cuando el DOM esté listo
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new SorteoApp();
});

// Exportar para uso global
window.SorteoApp = SorteoApp;
       
       
       //************************************************************************************** */
       // Páginas de contenido
       //*************************************************************************************   */
        const pages = {

//************************************************************************** */
//        Agregar Amigos 
//************************************************************************** */

// Agregar estas páginas al objeto pages existente

familia_Amigo_regalo: {
    title: "Amigo Secreto Familiar",
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
            
                            <div class="card" style="grid-column: 1 / -1;">
                                <h3>🌟 Consejos para el Amigo Secreto Familiar</h3>
                                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-top: 1rem;">
                                                                <div style="background: #FFF0F5; padding: 1rem; border-radius: 10px; border-left: 4px solid #FF69B4;">
                                                                    <h4 style="color: #8B0000; margin: 0 0 0.5rem 0;">👶 Para los Niños</h4>
                                                                    <p style="margin: 0; font-size: 0.9rem;">Ayúdalos a hacer regalos creativos: dibujos, manualidades o cartas especiales para sus familiares.</p>
                                                                </div>
                                                    <div style="background: #F0F8FF; padding: 1rem; border-radius: 10px; border-left: 4px solid #4169E1;">
                                                        <h4 style="color: #191970; margin: 0 0 0.5rem 0;">👨‍👩‍👧‍👦 Para Padres</h4>
                                                        <p style="margin: 0; font-size: 0.9rem;">Involúcrate en la creación del regalo de tus hijos y crea momentos de complicidad especiales.</p>
                                                    </div>
                                                                    <div style="background: #F5FFFA; padding: 1rem; border-radius: 10px; border-left: 4px solid #2E8B57;">
                                                                        <h4 style="color: #006400; margin: 0 0 0.5rem 0;">👵👴 Para Abuelos</h4>
                                                                        <p style="margin: 0; font-size: 0.9rem;">Comparte historias familiares o crea algo especial con tus propias manos llenas de experiencia.</p>
                                                                    </div>
                                        </div>
                            </div>
        </div>
    `
},

comunidadEmpresa_regalo: {
    title: "Amigo Secreto Empresarial",
    subtitle: "Fortalece el espíritu navideño en tu equipo de trabajo",
    content: `
        <div class="content-grid">
            <div class="card">
                <h3>🏢 Ambiente Profesional</h3>
                <p>Transforma el ambiente laboral con una actividad que fomenta la camaradería, reduce el estrés y crea conexiones más allá del trabajo diario.</p>
                <div style="margin-top: 1rem;">
                    <span style="background: rgba(70,130,180,0.2); padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.9rem; color: #191970;">🤝 Team Building</span>
                </div>
            </div>
            
            <div class="card">
                <h3>💼 Regalos Corporativos</h3>
                <p>Establece un presupuesto apropiado y sugiere regalos que sean adecuados para el entorno laboral: artículos de oficina, plantas, libros o experiencias.</p>
                <div style="height: 50px; background: linear-gradient(45deg, #4682B4, #5F9EA0); border-radius: 10px; margin-top: 1rem; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">
                    💰 $10 - $25 USD 💰
                </div>
            </div>
            
            <div class="card">
                <h3>🎯 Networking Divertido</h3>
                <p>Una oportunidad única para que colegas de diferentes departamentos interactúen de manera informal y construyan relaciones más sólidas.</p>
                <button onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" style="background: linear-gradient(45deg, #20B2AA, #48CAE4); color: white; border: none; padding: 0.5rem 1rem; border-radius: 25px; transition: all 0.3s; cursor: pointer;">🌐 ¡Conecta!</button>
            </div>
            
            <div class="card">
                <h3>📊 Beneficios Comprobados</h3>
                <p>Estudios muestran que las actividades navideñas en la oficina aumentan la satisfacción laboral y mejoran el clima organizacional significativamente.</p>
                <div style="display: flex; gap: 0.5rem; margin-top: 1rem; justify-content: center;">
                    <div style="width: 35px; height: 30px; background: #4682B4; border-radius: 5px; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.7rem;">+20%</div>
                    <div style="width: 35px; height: 30px; background: #5F9EA0; border-radius: 5px; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.7rem;">😊</div>
                    <div style="width: 35px; height: 30px; background: #20B2AA; border-radius: 5px; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.7rem;">🤝</div>
                </div>
            </div>
            
            <div class="card" style="grid-column: 1 / -1;">
                <h3>🎓 Guía para Organizar el Amigo Secreto Empresarial</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-top: 1rem;">
                    <div style="background: #E6F3FF; padding: 1rem; border-radius: 10px; border-left: 4px solid #4682B4;">
                        <h4 style="color: #191970; margin: 0 0 0.5rem 0;">📋 Planificación</h4>
                        <ul style="margin: 0; font-size: 0.9rem; padding-left: 1.2rem;">
                            <li>Definir presupuesto máximo</li>
                            <li>Establecer fecha límite de inscripción</li>
                            <li>Elegir día para el intercambio</li>
                            <li>Crear reglas claras y divertidas</li>
                        </ul>
                    </div>
                    <div style="background: #F0FFFF; padding: 1rem; border-radius: 10px; border-left: 4px solid #5F9EA0;">
                        <h4 style="color: #2F4F4F; margin: 0 0 0.5rem 0;">🎁 Sugerencias de Regalos</h4>
                        <ul style="margin: 0; font-size: 0.9rem; padding-left: 1.2rem;">
                            <li>Taza personalizada con café</li>
                            <li>Planta pequeña para escritorio</li>
                            <li>Libro inspiracional</li>
                            <li>Accesorios de oficina creativos</li>
                        </ul>
                    </div>
                    <div style="background: #F5FFFA; padding: 1rem; border-radius: 10px; border-left: 4px solid #20B2AA;">
                        <h4 style="color: #008B8B; margin: 0 0 0.5rem 0;">🎉 El Gran Día</h4>
                        <ul style="margin: 0; font-size: 0.9rem; padding-left: 1.2rem;">
                            <li>Organizar en horario de almuerzo</li>
                            <li>Preparar espacio decorado</li>
                            <li>Tomar fotos del momento</li>
                            <li>Incluir juegos de adivinanzas</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="card" style="grid-column: 1 / -1; background: linear-gradient(135deg, #667eea, #764ba2); color: white;">
                <h3 style="color: white;">🌟 ¡Haz que tu empresa brille esta Navidad!</h3>
                <p style="margin-bottom: 1rem;">El Amigo Secreto empresarial no es solo un intercambio de regalos, es una inversión en el bienestar y la cultura de tu equipo. ¡Crea recuerdos que fortalezcan los lazos profesionales y personales!</p>
                <div style="text-align: center;">
                    <button onclick="alert('¡Comencemos a organizar el mejor Amigo Secreto empresarial!')" style="background: rgba(255,255,255,0.2); color: white; border: 2px solid white; padding: 0.8rem 1.5rem; border-radius: 30px; font-weight: bold; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">
                        🚀 ¡Empezar Ahora!
                    </button>
                </div>
            </div>
        </div>
    `
},





  // ****************************************************************************
  //**   DISEÑO               **
 // *****************************************************************************
            diseno: {
                title: "Diseño Moderno",
                subtitle: "Interfaz elegante y contemporánea",
                content: `
                    <div class="content-grid">
                        <div class="card">
                            <h3>🎨 Glassmorphism</h3>
                            <p>Utilizamos efectos de cristal y transparencias que crean una sensación de profundidad y modernidad. Este estilo está en la vanguardia del diseño web actual.</p>
                            <div style="margin-top: 1rem;">
                                <span style="background: rgba(255,255,255,0.2); padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.9rem;">Tendencia 2024</span>
                            </div>
                        </div>
                        
                        <div class="card">
                            <h3>🌈 Gradientes Vibrantes</h3>
                            <p>Los gradientes coloridos no solo son estéticamente atractivos, sino que también guían la atención del usuario hacia elementos importantes.</p>
                            <div style="height: 50px; background: linear-gradient(45deg, #667eea, #764ba2); border-radius: 10px; margin-top: 1rem;"></div>
                        </div>
                        
                        <div class="card">
                            <h3>✨ Microinteracciones</h3>
                            <p>Pequeñas animaciones y efectos que responden a las acciones del usuario, mejorando significativamente la experiencia de navegación.</p>
                            <button onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" style="background: linear-gradient(45deg, #ff6b6b, #ee5a24); color: white; border: none; padding: 0.5rem 1rem; border-radius: 25px; transition: all 0.3s;">Hover me!</button>
                        </div>
                        
                        <div class="card">
                            <h3>📱 Mobile First</h3>
                            <p>Diseñamos primero para dispositivos móviles y luego escalamos hacia pantallas más grandes, garantizando la mejor experiencia en todos los dispositivos.</p>
                            <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                                <div style="width: 20px; height: 35px; background: #667eea; border-radius: 3px;"></div>
                                <div style="width: 30px; height: 35px; background: #764ba2; border-radius: 3px;"></div>
                                <div style="width: 45px; height: 35px; background: #ff6b6b; border-radius: 3px;"></div>
                            </div>
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
                            <p>Optimizado para smartphones con navegación touch-friendly, menús colapsables y contenido reorganizado en una sola columna.</p>
                            <div style="background: #667eea; color: white; padding: 1rem; border-radius: 10px; margin-top: 1rem; font-size: 0.9rem;">
                                Grid: 1 columna<br>
                                Menú: Hamburguesa<br>
                                Touch: Optimizado
                            </div>
                        </div>
                        
                        <div class="card">
                            <h3>💻 Tablets (768px+)</h3>
                            <p>Experiencia intermedia que aprovecha el espacio adicional manteniendo la usabilidad táctil y la legibilidad optimal.</p>
                            <div style="background: #764ba2; color: white; padding: 1rem; border-radius: 10px; margin-top: 1rem; font-size: 0.9rem;">
                                Grid: 2 columnas<br>
                                Menú: Expandido<br>
                                Espacios: Amplios
                            </div>
                        </div>
                        
                        <div class="card">
                            <h3>🖥️ Desktop (1200px+)</h3>
                            <p>Experiencia completa que utiliza todo el espacio disponible con múltiples columnas y elementos avanzados de navegación.</p>
                            <div style="background: #ff6b6b; color: white; padding: 1rem; border-radius: 10px; margin-top: 1rem; font-size: 0.9rem;">
                                Grid: 3-4 columnas<br>
                                Menú: Completo<br>
                                Efectos: Avanzados
                            </div>
                        </div>
                        
                        <div class="card">
                            <h3>🔧 Flexibilidad CSS</h3>
                            <p>Utilizamos CSS Grid, Flexbox y media queries para crear un diseño que se adapta fluidamente a cualquier tamaño de pantalla.</p>
                            <code style="background: #f8f9fa; padding: 0.5rem; border-radius: 5px; display: block; margin-top: 1rem; font-size: 0.8rem;">
                                @media (max-width: 768px) {<br>
                                &nbsp;&nbsp;.grid { grid-template-columns: 1fr; }<br>
                                }
                            </code>
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
                            <p>Efectos suaves en hover, focus y cambios de estado que hacen la interacción más natural e intuitiva.</p>
                            <div style="width: 100px; height: 50px; background: linear-gradient(45deg, #667eea, #764ba2); border-radius: 10px; margin: 1rem auto; transition: all 0.3s ease; cursor: pointer;" 
                                 onmouseover="this.style.transform='rotate(5deg) scale(1.1)'" 
                                 onmouseout="this.style.transform='rotate(0deg) scale(1)'">
                                Hover me!
                            </div>
                        </div>
                        
                        <div class="card">
                            <h3>⚡ Animaciones de Entrada</h3>
                            <p>Los elementos aparecen de forma escalonada y elegante cuando el usuario navega por la página.</p>
                            <div style="margin-top: 1rem;">
                                <div style="background: #ff6b6b; height: 10px; border-radius: 5px; animation: slideIn 2s ease infinite;"></div>
                            </div>
                        </div>
                        
                        <div class="card">
                            <h3>🎯 Micro-interacciones</h3>
                            <p>Pequeños detalles animados que responden a las acciones del usuario, mejorando el feedback visual.</p>
                            <button onclick="this.style.animation='bounce 0.5s ease'" style="background: #764ba2; color: white; border: none; padding: 0.5rem 1rem; border-radius: 20px; margin-top: 1rem; cursor: pointer;">¡Clícame!</button>
                        </div>
                        
                        <div class="card">
                            <h3>🚀 Rendimiento Optimizado</h3>
                            <p>Todas las animaciones utilizan propiedades CSS que aprovechan la aceleración por hardware para mantener 60 FPS.</p>
                            <div style="font-family: monospace; background: #f8f9fa; padding: 1rem; border-radius: 8px; margin-top: 1rem; font-size: 0.8rem;">
                                transform: translateZ(0);<br>
                                will-change: transform;
                            </div>
                        </div>
                    </div>
                    
                    <style>
                        @keyframes slideIn {
                            0%, 100% { transform: translateX(-100%); }
                            50% { transform: translateX(100%); }
                        }
                        @keyframes bounce {
                            0%, 100% { transform: translateY(0); }
                            50% { transform: translateY(-10px); }
                        }
                    </style>
                `
            },
            
            optimizado: {
                title: "Optimización Avanzada",
                subtitle: "Rendimiento y velocidad excepcionales",
                content: `
                    <div class="content-grid">
                        <div class="card">
                            <h3>⚡ Carga Rápida</h3>
                            <p>Código CSS y JavaScript optimizados, imágenes comprimidas y recursos minificados para tiempos de carga mínimos.</p>
                            <div style="background: linear-gradient(90deg, #4ade80 70%, #e5e7eb 70%); height: 20px; border-radius: 10px; margin-top: 1rem; position: relative;">
                                <span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 0.8rem; font-weight: bold;">70% más rápido</span>
                            </div>
                        </div>
                        
                        <div class="card">
                            <h3>🌐 Compatibilidad</h3>
                            <p>Compatible con todos los navegadores modernos, incluyendo Chrome, Firefox, Safari, Edge y sus versiones móviles.</p>
                            <div style="display: flex; justify-content: space-around; margin-top: 1rem; font-size: 1.5rem;">
                                <span title="Chrome">🌐</span>
                                <span title="Firefox">🔥</span>
                                <span title="Safari">🧭</span>
                                <span title="Edge">💎</span>
                            </div>
                        </div>
                        
                        <div class="card">
                            <h3>🎯 SEO Optimizado</h3>
                            <p>Estructura semántica HTML5, meta tags apropiados y contenido optimizado para motores de búsqueda.</p>
                            <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin-top: 1rem; border-left: 4px solid #4ade80;">
                                <div style="font-size: 0.9rem; color: #059669;">✓ Semántica HTML5</div>
                                <div style="font-size: 0.9rem; color: #059669;">✓ Meta descripción</div>
                                <div style="font-size: 0.9rem; color: #059669;">✓ Estructura clara</div>
                            </div>
                        </div>
                        
                        <div class="card">
                            <h3>📊 Core Web Vitals</h3>
                            <p>Optimizado para las métricas clave de Google: LCP, FID, CLS, asegurando una excelente experiencia de usuario.</p>
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; margin-top: 1rem; text-align: center;">
                                <div style="background: #4ade80; color: white; padding: 0.5rem; border-radius: 8px; font-size: 0.8rem;">
                                    <div style="font-weight: bold;">LCP</div>
                                    <div>&lt; 1.5s</div>
                                </div>
                                <div style="background: #4ade80; color: white; padding: 0.5rem; border-radius: 8px; font-size: 0.8rem;">
                                    <div style="font-weight: bold;">FID</div>
                                    <div>&lt; 100ms</div>
                                </div>
                                <div style="background: #4ade80; color: white; padding: 0.5rem; border-radius: 8px; font-size: 0.8rem;">
                                    <div style="font-weight: bold;">CLS</div>
                                    <div>&lt; 0.1</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
        };

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
                
                // Scroll suave hacia arriba
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        function showHome() {
            const mainContent = document.getElementById('mainContent');
            const pageContent = document.getElementById('pageContent');
            const hero = document.querySelector('.hero');
            
            // Restaurar el hero original
            hero.innerHTML = `
               <1>¡Bienvenido a Jugar !</h1>
            <h2 >🎄✨ ¡Vive la magia de la Navidad en familia, Comunidad y Empresa! ✨🎄</h2>
            <p>
                        Disfruta de una experiencia moderna y divertida con un dinámico juego de Amigo Secreto 🎁.
                         Una tradición presente en muchos países, ahora con un toque especial de sorpresa e intriga 😲.

                        Descubre quién es tu amigo secreto 🤫 y piensa en cómo sorprenderlo con un bonito gesto de cariño 💖. 
                        Investiga sus gustos, prepara tu regalo y ¡haz que esta Navidad sea inolvidable! 🎅🎉 </p>

                <a href="#Intrucciones" class="btn-primary">Intrucciones</a>
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
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        });
            