let listasProfesores = [];
window.addEventListener("load", () => {
  fetch("https://api-springboot-hdye.onrender.com/profesores")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      return response.json(); // Convertir la respuesta a JSON
    })
    .then((data) => {
      console.log("Datos recibidos:", data); // Procesar los datos recibidos
      // Aquí puedes manipular los datos, por ejemplo, mostrarlos en una tabla
      listasProfesores = data;
      const bodyProfesores = document.getElementById("bodyProfesores");
      listasProfesores.forEach((profesore, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
                <td>${index + 1}</td>
                <td>${profesore.nombre}</td>
                <td>${profesore.cedula}</td>
                <td>

                  <i class="fa-solid fa-eye" data-bs-toggle="modal" data-bs-target="#verProfesoresModal"
                  data-profesor-nombre="${profesore.nombre}"
                  data-profesor-cedula="${profesore.cedula}"
                  data-profesor-telefono="${profesore.telefono}"
                  data-profesor-correo="${profesore.correo}"
                  data-profesor-imagen="${profesore.imagen}"></i>
                  <i class="fa-solid fa-trash-can btn-eliminar" data-profesor-cedula="${profesore.cedula}">
                  </i>
                </td> `
        bodyProfesores.appendChild(fila);
      });
    })
    .catch((error) => {
      console.error("Error al realizar la solicitud:", error);
    });


  bodyProfesores.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-eliminar")) {
      const cedulaEliminar = event.target.getAttribute("data-profesor-cedula");
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
          Swal.fire("Eliminado", "El profesor ha sido eliminado.", "success");
        }
      });
    }
  })
})

function eliminarFila(cedula) {
  const filaEliminar = document.querySelector(`tr td .btn-eliminar[data-profesor-cedula='${cedula}']`).closest("tr");
  if (filaEliminar) {
    filaEliminar.remove();
  }
}

const verAsistencias = document.getElementById("verProfesoresModal");

verAsistencias.addEventListener("show.bs.modal", (event) => {
  const btnVer = event.relatedTarget;

  const nombreProfesor = btnVer.getAttribute("data-profesor-nombre");
  const cedulaProfesor = btnVer.getAttribute("data-profesor-cedula");
  const telefonoProfesor = btnVer.getAttribute("data-profesor-telefono");
  const correoProfesor = btnVer.getAttribute("data-profesor-correo");
  const imagenProfesor = btnVer.getAttribute("data-profesor-imagen");

  const nombreProfesorModal = document.getElementById("nombreProfesorModal");
  const cedulaProfesorModal = document.getElementById("cedulaProfesorModal");
  const telefonoProfesorModal = document.getElementById("telefonoProfesorModal");
  const correoProfesorModal = document.getElementById("correoProfesorModal");
  const imagenProfesorModal = document.getElementById("imagenProfesorModal");
  nombreProfesorModal.textContent = nombreProfesor;
  cedulaProfesorModal.textContent = cedulaProfesor;
  telefonoProfesorModal.textContent = telefonoProfesor;
  correoProfesorModal.textContent = correoProfesor; 
  imagenProfesorModal.src = imagenProfesor;


})
