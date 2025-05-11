let listasAsistencias = [
  {
    fecha: "02/05/2025",
    estudiantes: ["24114415", "30321239", "31204836", "30740994", "31598995"],
    subproyecto: "subproyectoID",
    profesor: "profesorID",

  },
  {
    fecha: "26/04/2025",
    estudiantes: ["24114415", "30321239", "31204836", "30740994"],
    subproyecto: "subproyectoID",
    profesor: "profesorID"
  }
];


window.addEventListener("load", () => {
  const bodyAsistencias = document.getElementById("bodyAsistencias");
  listasAsistencias.forEach((asistencia, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
                <td>${index + 1}</td>
                <td>${asistencia.fecha}</td>
                <td>${asistencia.estudiantes.length}</td>
                <td>

                  <i class="fa-solid fa-eye" data-bs-toggle="modal" data-bs-target="#verAsistenciaModal"
                  data-estudiantes=${asistencia.estudiantes}

                  ></i>
                </td>


    `
    bodyAsistencias.appendChild(fila);
  })

})

const verAsistencias = document.getElementById("verAsistenciaModal");

verAsistencias.addEventListener("show.bs.modal", (event) => {
  const btnVer = event.relatedTarget;

  const estudiantes = btnVer.getAttribute("data-estudiantes");

  const estudianteModal = document.getElementById("estudiantes");


  estudianteModal.textContent = estudiantes;

})

