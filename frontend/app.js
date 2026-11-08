// Direcciones del backend
const urlAulas = "http://localhost:8000/index.php";
const urlReservas = "http://localhost:8000/reservas.php";

// Elementos del HTML
const contenedor = document.getElementById("aulas");
const selectAula = document.getElementById("aula");
const formulario = document.getElementById("form-reserva");
const mensaje = document.getElementById("mensaje");

// Pedimos las aulas al backend y las mostramos
function cargarAulas() {
  fetch(urlAulas)
    .then((respuesta) => respuesta.json())
    .then((aulas) => {
      aulas.forEach((aula) => {
        // Tarjeta con nombre y capacidad
        contenedor.innerHTML += `
          <div class="tarjeta">
            <h3>${aula.nombre}</h3>
            <p>Capacidad: ${aula.capacidad}</p>
          </div>
        `;

        // Opción del desplegable
        selectAula.innerHTML += `<option value="${aula.id}">${aula.nombre}</option>`;
      });
    })
    .catch((error) => {
      console.log("Error:", error);
      contenedor.textContent = "No se pudieron cargar las aulas.";
    });
}

// Cuando se envía el formulario
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  // Objeto reserva con los cuatro datos
  const reserva = {
    aula: selectAula.value,
    fecha: document.getElementById("fecha").value,
    hora: document.getElementById("hora").value,
    responsable: document.getElementById("responsable").value.trim()
  };

  // Validación antes de enviar
  if (reserva.aula === "" || reserva.hora === "" || reserva.responsable === "") {
    mensaje.style.color = "red";
    mensaje.textContent = "Todos los campos son obligatorios.";
    return;
  }

  if (reserva.fecha === "") {
    mensaje.style.color = "red";
    mensaje.textContent = "La fecha no puede estar vacía.";
    return;
  }

  // Enviamos la reserva al backend con POST
  fetch(urlReservas, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reserva)
  })
    .then((respuesta) => {
      return respuesta.json().then((datos) => {
        if (respuesta.ok) {
          // Mostramos el mensaje de PHP y limpiamos el formulario
          mensaje.style.color = "green";
          mensaje.textContent = datos.mensaje;
          formulario.reset();
        } else {
          mensaje.style.color = "red";
          mensaje.textContent = datos.mensaje;
        }
      });
    })
    .catch((error) => {
      console.log("Error:", error);
      mensaje.style.color = "red";
      mensaje.textContent = "No se pudo conectar con el servidor.";
    });
});

// Al abrir la página cargamos las aulas
cargarAulas();