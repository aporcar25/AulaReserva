const API_URL = "http://localhost:8000";

async function cargarAulas() {
    const contenedor = document.getElementById("aulas");
    try {
        const respuesta = await fetch(API_URL);
        const aulas = await respuesta.json();

        aulas.forEach(aula => {
            const tarjeta = document.createElement("div");
            tarjeta.className = "tarjeta";
            tarjeta.innerHTML = `<h3>${aula.nombre}</h3><p>Capacidad: ${aula.capacidad}</p>`;
            contenedor.appendChild(tarjeta);
        });
    } catch (error) {
        contenedor.textContent = "No se pudieron cargar las aulas.";
    }
}

cargarAulas();