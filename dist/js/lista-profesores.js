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
                <td>${profesore.id}</td>
                <td>

                  <i class="fa-solid fa-eye" data-bs-toggle="modal" data-bs-target="#verProfesoresModal"
                  data-profesor-nombre="${profesore.nombre}"
                  data-profesor-id="${profesore.id}"
                  data-profesor-telefono="${profesore.telefono}"
                  data-profesor-correo="${profesore.correo}"
                  data-profesor-imagen="${profesore.imagen}">
                  </i>
                  <i class="fa-solid fa-circle-check"></i>
                </td> `
        bodyProfesores.appendChild(fila);
      });
    })
    .catch((error) => {
      console.error("Error al realizar la solicitud:", error);
    });
});

const verAsistencias = document.getElementById("verProfesoresModal");

verAsistencias.addEventListener("show.bs.modal", (event) => {
  const btnVer = event.relatedTarget;

  const nombreProfesor = btnVer.getAttribute("data-profesor-nombre");
  const idProfesor = btnVer.getAttribute("data-profesor-id");
  const telefonoProfesor = btnVer.getAttribute("data-profesor-telefono");
  const correoProfesor = btnVer.getAttribute("data-profesor-correo");
  const imagenProfesor = btnVer.getAttribute("data-profesor-imagen");

  const nombreProfesorModal = document.getElementById("nombreProfesorModal");
  const idProfesorModal = document.getElementById("idProfesorModal");
  const telefonoProfesorModal = document.getElementById("telefonoProfesorModal");
  const correoProfesorModal = document.getElementById("correoProfesorModal");
  const imagenProfesorModal = document.getElementById("imagenProfesorModal");

  nombreProfesorModal.textContent = nombreProfesor;
  idProfesorModal.textContent = idProfesor;
  telefonoProfesorModal.textContent = telefonoProfesor;
  correoProfesorModal.textContent = correoProfesor; 
  imagenProfesorModal.src = imagenProfesor;


})
