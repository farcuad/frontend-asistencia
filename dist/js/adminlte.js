// const modalEliminar = document.getElementById("eliminarEstudianteModal");
// let eliminarEstudiante;

// modalEliminar.addEventListener("show.bs.modal", (event) => {
//   const button = event.relatedTarget;
//   eliminarEstudiante = button.getAttribute("cedula");

// });

// const botonEliminar = document.getElementById("eliminarEstudiante");
// botonEliminar.addEventListener("click", () => {
//     if(eliminarEstudiante){
//         const filaEliminar = document.querySelector(`tr[cedula="${eliminarEstudiante}"]`);
//         if(filaEliminar){
//             filaEliminar.remove();
//             const modalBootstrap = bootstrap.Modal.getInstance(modalEliminar);
//             modalBootstrap.hide();
//         }
//         eliminarEstudiante = null;
//     }

// })

const verUsuarioModal = document.getElementById("verUsuarioModal");

verUsuarioModal.addEventListener("show.bs.modal", (event) => {
    const botonVer = event.relatedTarget;

    const nombreEstudiante = botonVer.getAttribute("data-estudiante-nombre");
    const cedulaEstudiante = botonVer.getAttribute("data-estudiante-cedula");
    const nombreEstudianteModal = document.getElementById("nombreEstudianteModal");
    const cedulaEstudianteModal = document.getElementById("cedulaEstudianteModal");

    nombreEstudianteModal.textContent = nombreEstudiante;
    cedulaEstudianteModal.textContent = cedulaEstudiante;

})
