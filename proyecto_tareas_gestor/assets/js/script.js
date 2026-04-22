// Selección de elementos
const form = document.querySelector("form");
const pendientesContainer = document.querySelector("#pendientes .tareas-container");
const enProgresoContainer = document.querySelector("#en-progreso .tareas-container");
const completadasContainer = document.querySelector("#completadas .tareas-container");

// Contadores
const pendientesContador = document.querySelector("#pendientes .contador");
const progresoContador = document.querySelector("#en-progreso .contador");
const completadasContador = document.querySelector("#completadas .contador");

// Función para actualizar contadores
function actualizarContadores() {
  pendientesContador.textContent = pendientesContainer.children.length;
  progresoContador.textContent = enProgresoContainer.children.length;
  completadasContador.textContent = completadasContainer.children.length;
}

// Función para actualizar botones según el estado
function updateButtons(tarjeta) {
  // Remover botones existentes
  tarjeta.querySelectorAll('button').forEach(btn => btn.remove());

  const descripcion = tarjeta.dataset.descripcion;
  const prioridad = tarjeta.dataset.prioridad;
  const fecha = tarjeta.dataset.fecha;
  const state = tarjeta.parentElement.parentElement.id;

  if (state === 'pendientes') {
    tarjeta.innerHTML += `
      <button class="btn-progreso">Mover a Progreso</button>
      <button class="btn-eliminar">Eliminar</button>
    `;
  } else if (state === 'en-progreso') {
    tarjeta.innerHTML += `
      <button class="btn-completada">Marcar Completada</button>
      <button class="btn-eliminar">Eliminar</button>
    `;
  } else if (state === 'completadas') {
    tarjeta.innerHTML += `
      <button class="btn-eliminar">Eliminar</button>
    `;
  }

  // Re-agregar event listeners
  const btnProgreso = tarjeta.querySelector('.btn-progreso');
  if (btnProgreso) {
    btnProgreso.addEventListener('click', () => {
      enProgresoContainer.appendChild(tarjeta);
      updateButtons(tarjeta);
      actualizarContadores();
    });
  }

  const btnCompletada = tarjeta.querySelector('.btn-completada');
  if (btnCompletada) {
    btnCompletada.addEventListener('click', () => {
      completadasContainer.appendChild(tarjeta);
      updateButtons(tarjeta);
      actualizarContadores();
    });
  }

  const btnEliminar = tarjeta.querySelector('.btn-eliminar');
  if (btnEliminar) {
    btnEliminar.addEventListener('click', () => {
      tarjeta.remove();
      actualizarContadores();
    });
  }
}

// Crear tarjeta de tarea
function crearTarea(descripcion, prioridad, fecha) {
  const tarjeta = document.createElement("div");
  tarjeta.classList.add("tarea");
  tarjeta.dataset.descripcion = descripcion;
  tarjeta.dataset.prioridad = prioridad;
  tarjeta.dataset.fecha = fecha;
  tarjeta.innerHTML = `
    <p><strong>${descripcion}</strong></p>
    <p>Prioridad: ${prioridad}</p>
    <p>Fecha límite: ${fecha}</p>
  `;

  updateButtons(tarjeta);

  return tarjeta;
}

// Evento submit del formulario
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const descripcion = document.querySelector("#descripcion").value.trim();
  const prioridad = document.querySelector("#prioridad").value;
  const fecha = document.querySelector("#fecha").value;

  if (!descripcion || !prioridad || !fecha) {
    alert("Por favor completa todos los campos.");
    return;
  }

  const nuevaTarea = crearTarea(descripcion, prioridad, fecha);
  pendientesContainer.appendChild(nuevaTarea);

  form.reset();
  actualizarContadores();
});
