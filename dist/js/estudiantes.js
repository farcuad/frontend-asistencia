let estudiantes = [];

window.addEventListener("load", () => {
  const delayMessage = document.getElementById('delay-message');
  let delayTimer;
  // Mostrar mensaje después de 5 segundos si aún carga
  delayTimer = setTimeout(() => {
    delayMessage.style.opacity = '1';
  }, 5000);
  
  fetch("https://api-springboot-hdye.onrender.com/status")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      quitarPreloader();
      return response.text();
    })
    .then((status) => {
      console.log(status);

    })
    .catch((error) => {
      console.error("El servicio no está en linea:", error);
    });
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
              <i class="color-blue fa-solid fa-eye" data-bs-toggle="modal" 
                 data-bs-target="#verUsuarioModal" 
                 data-estudiante-nombre="${estudiante.nombre}"
                 data-estudiante-cedula="${estudiante.cedula}"
                 data-estudiante-carrera="${estudiante.carrera}"
                 data-estudiante-periodo="${estudiante.periodo}"
                 data-estudiante-telefono="${estudiante.telefono}"
                 data-estudiante-correo="${estudiante.correo}"
                 data-estudiante-imagen="${estudiante.imagen}"
                 data-estudiante-fecha="${estudiante.fechaNacimiento}"
                 data-estudiante-estado="${estudiante.estado}">
                 </i>
            </td>
          `;
        bodyEstudiantes.appendChild(fila);
      });
    })
    .catch((error) => {
      console.error("Error al realizar la solicitud:", error);
    });
  });
const verUsuarioModal = document.getElementById("verUsuarioModal");

verUsuarioModal.addEventListener("show.bs.modal", (event) => {
  const botonVer = event.relatedTarget;
  const nombreEstudiante = botonVer.getAttribute("data-estudiante-nombre");
  const cedulaEstudiante = botonVer.getAttribute("data-estudiante-cedula");
  const carreraEstudiante = botonVer.getAttribute("data-estudiante-carrera");
  const periodoEstudiante = botonVer.getAttribute("data-estudiante-periodo");
  const telefonoEstudiante = botonVer.getAttribute("data-estudiante-telefono");
  const correoEstudiante = botonVer.getAttribute("data-estudiante-correo");
  const imagenEstudiante = botonVer.getAttribute("data-estudiante-imagen");
  const fechaEstudiante = botonVer.getAttribute("data-estudiante-fecha");
  const estadoEstudiante = botonVer.getAttribute("data-estudiante-estado");

  const nombreEstudianteModal = document.getElementById("nombreEstudianteModal");
  const cedulaEstudianteModal = document.getElementById("cedulaEstudianteModal");
  const carreraEstudianteModal = document.getElementById("carreraEstudianteModal");
  const periodoEstudianteModal = document.getElementById("periodoEstudianteModal");
  const telefonoEstudianteModal = document.getElementById("telefonoEstudianteModal");
  const correoEstudianteModal = document.getElementById("correoEstudianteModal");
  const imagenEstudianteModal = document.getElementById("imagenEstudianteModal");
  const fechaEstudianteModal = document.getElementById("fechaEstudianteModal");
  const estadoEstudianteModal = document.getElementById("estadoEstudianteModal");

  nombreEstudianteModal.textContent = nombreEstudiante;
  cedulaEstudianteModal.textContent = cedulaEstudiante;
  carreraEstudianteModal.textContent = carreraEstudiante;
  periodoEstudianteModal.textContent = periodoEstudiante;
  telefonoEstudianteModal.textContent = telefonoEstudiante;
  correoEstudianteModal.textContent = correoEstudiante;
  imagenEstudianteModal.src = imagenEstudiante;
  fechaEstudianteModal.textContent = fechaEstudiante;
  estadoEstudianteModal.textContent = estadoEstudiante;
});

function quitarPreloader() {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500); // Tiempo para que desaparezca (0.5s)
  }, 1000); // Tiempo mínimo que se mostrará (1s)
}





