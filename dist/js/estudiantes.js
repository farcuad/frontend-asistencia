let estudiantes = [];

window.addEventListener("load", () => {
  fetch("https://api-springboot-hdye.onrender.com/status")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      return response.text();
    })
    .then((status) => {
      console.log(status); // Procesar los datos recibidos
      // Aquí puedes manipular los datos, por ejemplo, mostrarlos en una tabla
      fetch("https://api-springboot-hdye.onrender.com/estudiantes")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
          }
          return response.json(); // Convertir la respuesta a JSON
        })
        .then((data) => {
          console.log("Datos recibidos:", data); // Procesar los datos recibidos
          // Aquí puedes manipular los datos, por ejemplo, mostrarlos en una tabla
          estudiantes = data;
          const bodyEstudiantes = document.getElementById("bodyEstudiantes")
          estudiantes.forEach((estudiante, index) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${estudiante.nombre}</td>
            <td>${estudiante.cedula}</td>
            <td>
              <i class="fa-solid fa-eye" data-bs-toggle="modal" 
                 data-bs-target="#verUsuarioModal" 
                 data-estudiante-nombre="${estudiante.nombre}"
                 data-estudiante-cedula="${estudiante.cedula}"
                 data-estudiante-carrera="${estudiante.carrera}"
                 data-estudiante-semestre="${estudiante.semestre}"
                 data-estudiante-telefono="${estudiante.telefono}"
                 data-estudiante-correo="${estudiante.correo}"
                 data-estudiante-imagen="${estudiante.imagen}"></i>
              <i class="fa-solid fa-trash-can btn-eliminar" data-estudiante-cedula="${estudiante.cedula}">
              </i>
            </td>
          `;
            bodyEstudiantes.appendChild(fila);
          });
        })
        .catch((error) => {
          console.error("Error al realizar la solicitud:", error);
        });
    })
    .catch((error) => {
      console.error("El servicio no está en linea:", error);
    });




  bodyEstudiantes.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-eliminar")) {
      const cedulaEliminar = event.target.getAttribute("data-estudiante-cedula");
      Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esta acción.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          // Si el usuario confirma, eliminar la fila
          eliminarFila(cedulaEliminar);

          // Mostrar mensaje de éxito
          Swal.fire("Eliminado", "El estudiante ha sido eliminado.", "success");
        }
      });
    }
  })
});

function eliminarFila(cedula) {
  const filaEliminar = document.querySelector(`tr td .btn-eliminar[data-estudiante-cedula='${cedula}']`).closest("tr");
  if (filaEliminar) {
    filaEliminar.remove();
  }
}

const verUsuarioModal = document.getElementById("verUsuarioModal");

verUsuarioModal.addEventListener("show.bs.modal", (event) => {
  const botonVer = event.relatedTarget;
  const nombreEstudiante = botonVer.getAttribute("data-estudiante-nombre");
  const cedulaEstudiante = botonVer.getAttribute("data-estudiante-cedula");
  const carreraEstudiante = botonVer.getAttribute("data-estudiante-carrera");
  const semestreEstudiante = botonVer.getAttribute("data-estudiante-semestre");
  const telefonoEstudiante = botonVer.getAttribute("data-estudiante-telefono");
  const correoEstudiante = botonVer.getAttribute("data-estudiante-correo");
  const imagenEstudiante = botonVer.getAttribute("data-estudiante-imagen");

  const nombreEstudianteModal = document.getElementById("nombreEstudianteModal");
  const cedulaEstudianteModal = document.getElementById("cedulaEstudianteModal");
  const carreraEstudianteModal = document.getElementById("carreraEstudianteModal");
  const semestreEstudianteModal = document.getElementById("semestreEstudianteModal");
  const telefonoEstudianteModal = document.getElementById("telefonoEstudianteModal");
  const correoEstudianteModal = document.getElementById("correoEstudianteModal");
  const imagenEstudianteModal = document.getElementById("imagenEstudianteModal");

  nombreEstudianteModal.textContent = nombreEstudiante;
  cedulaEstudianteModal.textContent = cedulaEstudiante;
  carreraEstudianteModal.textContent = carreraEstudiante;
  semestreEstudianteModal.textContent = semestreEstudiante;
  telefonoEstudianteModal.textContent = telefonoEstudiante;
  correoEstudianteModal.textContent = correoEstudiante;
  imagenEstudianteModal.src = imagenEstudiante;
});






