// lista de palabras prohibidas 
const palabrasProhibidas = [
  // Comunes sin sentido (solo palabras completas, sin letras sueltas)
  //  estas palabras generan error debo buscar una mejor solucion mas adelante "asdf", "qwerty", "jeje", "jajaja", "lol", "uwu", "nombre", "usuario", "prueba", "test",

  // Groserías (español)
  "puta", "mierda", "kaka", "pedo", "verga", "pene", "culo", "idiota", "imbecil",

  // Groserías (inglés)
  "fuck", "shit", "crap", "bitch", "dick", "ass", "bastard", "jerk", "damn", "cock", "pussy",

  // Frutas (español)
  "manzana", "naranja", "platano", "banana", "pera", "uva", "sandia", "melon", "frutilla", "fresa",
  "cereza", "kiwi", "papaya", "mango", "durazno", "limon", "mandarina", "arándano", "tamarindo",

  // Fruits (English)
  "apple", "orange", "banana", "pear", "grape", "watermelon", "melon", "strawberry",
  "cherry", "kiwi", "papaya", "mango", "peach", "lemon", "lime", "blueberry", "cranberry",

  // Verduras (español)
  "lechuga", "tomate", "cebolla", "ajo", "brocoli", "zanahoria", "pepino", "papa",
  "camote", "col", "repollo", "espinaca", "acelga",

  // Vegetables (English)
  "lettuce", "tomato", "onion", "garlic", "broccoli", "carrot", "cucumber", "potato",
  "sweetpotato", "cabbage", "spinach", "chard",

  // Sentimientos / emociones (español)
  "feliz", "triste", "enojo", "miedo", "alegría", "odio", "amor", "pena",
  "ansiedad", "soledad", "celos", "vergüenza", "culpa",

  // Feelings / emotions (English)
  "happy", "sad", "angry", "fear", "joy", "hate", "love", "shame",
  "anxiety", "lonely", "jealous", "guilt",

  // Colores (español)
  "rojo", "azul", "verde", "amarillo", "morado", "negro", "blanco",
  "gris", "rosado", "naranja",

  // Colors (English)
  "red", "blue", "green", "yellow", "purple", "black", "white",
  "gray", "pink", "orange",

  // Sensaciones (español e inglés)
  "calor", "frío", "frio", "luz", "oscuridad", "sombra", "fuego", "hielo",
  "hot", "cold", "light", "dark", "shadow", "fire", "ice",

  // Nombres ficticios típicos
  "pepe", "juanito", "tontin", "bob", "nemo", "shrek", "batman", "pikachu"
];




// Arreglo para guardar los nombres de los amigos agregados por el usuario
const amigos = [];

// Arreglo para registrar los amigos que ya fueron sorteados y evitar repetirlos
const amigosEscogidos = [];

/**
 * Función que se ejecuta cuando el usuario hace clic en "Añadir"
 * Toma el valor del input, lo valida, y si es correcto lo agrega al arreglo 'amigos'
 */
function agregarAmigo() {
    // Obtiene el input de texto donde el usuario escribe el nombre
    const input = document.getElementById("amigo");

    // Obtiene el texto ingresado y elimina espacios al inicio y al final
   // const nombre = input.value.trim();
    const nombre = input.value.trim().toLowerCase();// esto deja todo en minusculas 

    // Si el campo está vacío (sin texto), muestra alerta y termina la función
    if (nombre === "") {
        alert("Por favor, escribe un nombre.");
        return; // Sale de la función para no continuar con el código siguiente
    }

    // Expresión regular que valida que el nombre solo contenga letras y espacios
    // Incluye letras mayúsculas, minúsculas, con tilde y ñ
    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;

    // Si el texto no cumple con la validación, muestra alerta y termina la función
    if (!regexNombre.test(nombre)) {
        alert("El nombre solo puede contener letras");
        return;
    }

      // Validación manual con for verifica si esta en la lista de palabra no aceptadas 
for (let i = 0; i < palabrasProhibidas.length; i++) {
    const palabra = palabrasProhibidas[i];
    const regex = new RegExp(`\\b${palabra}\\b`, "i"); // busca palabra entera, sin importar mayúsculas
    if (regex.test(nombre)) {
        alert(`El nombre contiene una palabra no permitida: "${palabra}". Usa tu nombre real.`);
        return;
    }
}


    // Verifica si el nombre ya está en la lista para evitar duplicados
    if (amigos.includes(nombre)) {
        alert("Ese nombre ya fue ingresado.\n  si tu amigo se llama igual al  que ya ingresaste\n  puedes agregar la letra de su apellido  junto al nombre para diferenciarlos ");
        return;
    }

    // Si pasa todas las validaciones, agrega el nombre al arreglo 'amigos'
    amigos.push(nombre);

    // Limpia el campo input para que el usuario pueda escribir otro nombre
    input.value = "";

    // Actualiza la lista visible en la página para mostrar el nuevo amigo agregado
    mostrarLista();
}

/**
 * Función que actualiza la lista HTML que muestra los nombres agregados
 */
/* function mostrarLista() {
    // Obtiene el elemento UL donde se mostrarán los nombres
    const lista = document.getElementById("listaAmigos");

    // Limpia el contenido HTML para evitar duplicar la lista completa cada vez
    lista.innerHTML = "";

    // Recorre el arreglo 'amigos' para mostrar cada nombre
    amigos.forEach((amigo, index) => {
        // Crea un nuevo elemento <li> para cada amigo
        const item = document.createElement("li");

        // Establece el texto del <li>, con número y nombre
        item.textContent = `${index + 1}. ${amigo}`;

        // Inserta el <li> dentro del <ul>
        lista.appendChild(item);
    });
}
*/ 

function mostrarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    // Solo mostramos los amigos que no han sido sorteados aún
    const amigosRestantes = amigos.filter(amigo => !amigosEscogidos.includes(amigo));

    amigosRestantes.forEach((amigo, index) => {
        const item = document.createElement("li");
        item.textContent = `${index + 1}. ${amigo}`;
        lista.appendChild(item);
    });
}


/**
 * Función que realiza el sorteo del amigo secreto
 * Evita repetir amigos ya sorteados y muestra el resultado en la página
 */
function sortearAmigo() {
    // Obtiene el contenedor UL donde se mostrará el resultado del sorteo
    const resultado = document.getElementById("resultado");

    // Limpia el contenido anterior para mostrar solo el nuevo resultado
    resultado.innerHTML = "";
  // deben haber minimo dos amigos 
if (amigos.length < 2) {
    resultado.textContent = "Debes agregar al menos dos amigos para hacer el sorteo.";
    return;
}
    // Si no hay amigos agregados, muestra mensaje y detiene la función
    if (amigos.length === 0) {
        resultado.textContent = "No hay amigos para sortear.";
        return;
    }

    // Filtra los amigos que aún no han sido sorteados
    // El método filter() crea un nuevo arreglo solo con los amigos que NO están en 'amigosEscogidos'
    const amigosDisponibles = amigos.filter(amigo => !amigosEscogidos.includes(amigo));

    // Si no quedan amigos disponibles para sortear, significa que ya todos fueron sorteados
    if (amigosDisponibles.length === 0) {
        resultado.textContent = "Ya se han sorteado todos los amigos.";
        return;
    }

    /*
      Genera un número aleatorio entre 0 y (cantidad de amigos disponibles - 1)
      Math.random() genera un número decimal >=0 y <1
      Multiplicamos por la cantidad de amigos disponibles para ampliar el rango
      Math.floor() redondea hacia abajo para obtener un entero válido como índice
    */
    const indiceAleatorio = Math.floor(Math.random() * amigosDisponibles.length);

    // Obtiene el nombre del amigo que corresponde al índice aleatorio
    const amigoSeleccionado = amigosDisponibles[indiceAleatorio];

    // Agrega el amigo seleccionado al arreglo 'amigosEscogidos' para no repetirlo en futuros sorteos
    amigosEscogidos.push(amigoSeleccionado);

    // Crea un nuevo elemento <li> para mostrar el resultado del sorteo
    const li = document.createElement("li");

    // Asigna el texto que indica quién fue el amigo secreto sorteado
    li.textContent = `El amigo secreto es: ${amigoSeleccionado}`;

    // Inserta el <li> dentro del contenedor de resultados para que se muestre en la web
    resultado.appendChild(li);
   mostrarLista();
}

// funcion reinica el juego 
function reiniciarJuego() {
    amigos.length = 0;
    amigosEscogidos.length = 0;
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
}









