let listasProfesores = [];
window.addEventListener("load", () => {
  fetch("https://api-springboot-hdye.onrender.com/leerprofesores")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Datos recibidos:", data); // Procesar los datos recibidos
      // Aquí puedes manipular los datos, por ejemplo, mostrarlos en una tabla
      listasProfesores = data;
      const bodyProfesores = document.getElementById("bodyProfesores");
      listasProfesores.forEach((profesore, index) => {
        const aprobarId = `aprobado-${index}`;
        const botonAprobarId = `aprobar-${index}`;
        const botonRechazarId = `rechazar-${index}`;
        const fila = document.createElement("tr");
        fila.innerHTML = `
          <td>${index + 1}</td>
          <td>${profesore.nombre === "Nombre no disponible" ? profesore.correo : profesore.nombre}</td>
          <td>${profesore.ci}</td>
          <td id="${aprobarId}">${profesore.aprobado}</td>
          <td>
            <i class="color-blue fa-solid fa-eye" data-bs-toggle="modal" data-bs-target="#verProfesoresModal"
              data-profesor-nombre="${profesore.nombre}"
              data-profesor-cedula="${profesore.ci}"
              data-profesor-telefono="${profesore.telefono}"
              data-profesor-correo="${profesore.correo}"
              data-profesor-imagen="${profesore.imagen}">
            </i>
            <i class="color-green fa-solid fa-circle-check" id="${botonAprobarId}" style="${profesore.aprobado === true ? 'display:none;' : ''}"></i>
            <i class="color-red fa-solid fa-circle-xmark" id="${botonRechazarId}" style="${profesore.aprobado === false ? 'display:none;' : ''}"></i>
          </td>
        `;
        bodyProfesores.appendChild(fila);

        const botonAprobar = document.getElementById(botonAprobarId);
        const botonRechazar = document.getElementById(botonRechazarId);
        const aprobado = document.getElementById(aprobarId);

        if (botonAprobar) {
          botonAprobar.addEventListener("click", () => {
            fetch("https://api-springboot-hdye.onrender.com/actualizarprofesor", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                aprobado: "aprobado",
                imagen: profesore.imagen,
                id: profesore.id,
                nombre: profesore.nombre,
                telefono: profesore.telefono,
                correo: profesore.correo,
                ci: profesore.ci
              })
            })
            .then(response => {
              if (!response.ok) throw new Error(`Error al actualizar`);
              aprobado.textContent = "aprobado";
              if (botonAprobar) botonAprobar.style.display = "none";
              if (botonRechazar) botonRechazar.style.display = "none";
            })
            .catch(error => {
              alert("Error al actualizar el profesor");
              console.error(error);
            });
          });
        }
        if (botonRechazar) {
          botonRechazar.addEventListener("click", () => {
            fetch("https://api-springboot-hdye.onrender.com/actualizarprofesor", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                aprobado: "rechazado",
                imagen: profesore.imagen,
                id: profesore.id,
                nombre: profesore.nombre,
                telefono: profesore.telefono,
                correo: profesore.correo,
                ci: profesore.ci
              })
            })
            .then(response => {
              if (!response.ok) throw new Error(`Error al actualizar`);
              aprobado.textContent = "rechazado";
              if (botonAprobar) botonAprobar.style.display = "none";
              if (botonRechazar) botonRechazar.style.display = "none";
            })
            .catch(error => {
              alert("Error al actualizar el profesor");
              console.error(error);
            });
          });
        }
      });
    })
    .catch((error) => {
      console.error("Error al realizar la solicitud:", error);
    });
});

// Modal de detalle de profesor
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
  
});