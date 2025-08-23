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