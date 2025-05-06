let estudiantes = [
  {
    cedula: "24114415",
    nombre: "David Reyes",
    carrera: "Ingenieria informatica",
    semestre: "5",
    telefono: "31.204.836",
    correo: "O8g4P@example.com",
    imagen: "https://images.pexels.com/photos/220451/pexels-photo-220451.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    cedula: "30321239",
    nombre: "Rafael Arocha",
    carrera: "Ingenieria informatica",
    semestre: "5",
    telefono: "31.204.836",
    correo: "O8g4P@example.com",
    imagen: "https://images.pexels.com/photos/220452/pexels-photo-220452.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    cedula: "31204836",
    nombre: "Andres Calles",
    carrera: "Ingenieria informatica",
    semestre: "5",
    telefono: "04127575904",
    correo: "O8g4P@example.com",
    imagen: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    cedula: "30740994",
    nombre: "Antony Guevara",
    carrera: "Ingenieria informatica",
    semestre: "5",
    telefono: "31204836",
    correo: "O8g4P@example.com",
    imagen: "https://images.pexels.com/photos/220454/pexels-photo-220454.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    cedula: "31598995",
    nombre: "Jonathan Leal",
    carrera: "Ingenieria informatica",
    semestre: "5",
    telefono: "31204836",
    correo: "O8g4P@example.com",
    imagen: "https://images.pexels.com/photos/220455/pexels-photo-220455.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

window.addEventListener("load", () => {
  const bodyEstudiantes= document.getElementById("bodyEstudiantes")
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
              <i class="fa-solid fa-pen-to-square"></i>
              <i class="fa-solid fa-trash-can btn-eliminar" data-estudiante-cedula="${estudiante.cedula}">
              </i>
            </td>
          `;
    bodyEstudiantes.appendChild(fila);
  });
  bodyEstudiantes.addEventListener("click", (event)=>{
    if (event.target.classList.contains("btn-eliminar")) {
      const cedulaEliminar = event.target.getAttribute("data-estudiante-cedula");
      eliminarFila(cedulaEliminar);
    }
  })
});

  function eliminarFila(cedula){
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



