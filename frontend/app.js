// Dirección de la API en PHP
const URL_API = "http://localhost:8000";

// Elementos del HTML que vamos a usar
const contenedorAulas = document.getElementById("aulas");
const selectAula = document.getElementById("aula");
const formulario = document.getElementById("form-reserva");
const mensaje = document.getElementById("mensaje");

// Crea una tarjeta con el nombre y la capacidad de un aula
function crearTarjeta(aula) {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");

    const titulo = document.createElement("h3");
    titulo.textContent = aula.nombre;

    const capacidad = document.createElement("p");
    capacidad.textContent = "Capacidad: " + aula.capacidad;

    tarjeta.appendChild(titulo);
    tarjeta.appendChild(capacidad);
    contenedorAulas.appendChild(tarjeta);
}

// Añade un aula como opción del desplegable del formulario
function crearOpcion(aula) {
    const opcion = document.createElement("option");
    opcion.value = aula.id;
    opcion.textContent = aula.nombre;
    selectAula.appendChild(opcion);
}

// Pide las aulas a la API y las muestra en la página
function cargarAulas() {
    fetch(URL_API)
        .then(function (respuesta) {
            return respuesta.json();
        })
        .then(function (aulas) {
            aulas.forEach(function (aula) {
                crearTarjeta(aula);
                crearOpcion(aula);
            });
        })
        .catch(function (error) {
            console.error("Error al cargar las aulas:", error);
            contenedorAulas.textContent = "No se pudieron cargar las aulas.";
        });
}

// Muestra un mensaje debajo del formulario (rojo si es error, verde si está bien)
function mostrarMensaje(texto, esError) {
    mensaje.textContent = texto;
    if (esError) {
        mensaje.style.color = "red";
    } else {
        mensaje.style.color = "green";
    }
}

// Validación del formulario al enviarlo
formulario.addEventListener("submit", function (evento) {
    // Evitamos que la página se recargue
    evento.preventDefault();

    const aula = selectAula.value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const responsable = document.getElementById("responsable").value.trim();

    // Campos obligatorios
    if (aula === "" || hora === "" || responsable === "") {
        mostrarMensaje("Todos los campos son obligatorios.", true);
        return;
    }

    // La fecha no puede estar vacía
    if (fecha === "") {
        mostrarMensaje("La fecha no puede estar vacía.", true);
        return;
    }

    // Si todo está bien
    mostrarMensaje(
        "Reserva solicitada para el " + fecha + " a las " + hora + " por " + responsable + ".",
        false
    );
    formulario.reset();
});

// Al abrir la página, cargamos las aulas
cargarAulas();