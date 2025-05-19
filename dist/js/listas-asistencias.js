let listasAsistencias = [];
window.addEventListener("load", () => {
  fetch("https://api-springboot-hdye.onrender.com/asistencias")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      return response.json(); // Convertir la respuesta a JSON
    })
    .then((data) => {
      console.log("Datos recibidos:", data); // Procesar los datos recibidos
      // Aquí puedes manipular los datos, por ejemplo, mostrarlos en una tabla
      listasAsistencias = data;
      const bodyAsistencias = document.getElementById("bodyAsistencias");
      listasAsistencias.forEach((asistencia, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
                <td>${index + 1}</td>
                <td>${asistencia.fecha}</td>
                <td>${asistencia.asistencias.length}</td>
                <td>

                  <i class="fa-solid fa-eye" data-bs-toggle="modal" data-bs-target="#verAsistenciaModal"
                  data-estudiantes=${JSON.stringify(asistencia.asistencias)}

                  ></i>
                </td> `
        bodyAsistencias.appendChild(fila);
      });
    })
    .catch((error) => {
          console.error("Error al realizar la solicitud:", error);
          
        });
})

const verAsistencias = document.getElementById("verAsistenciaModal");

  verAsistencias.addEventListener("show.bs.modal", (event) => {
    const btnVer = event.relatedTarget;

    const estudiantes = JSON.parse(btnVer.getAttribute("data-estudiantes"));

    const estudianteModal = document.getElementById("estudiantes");


    estudianteModal.textContent = estudiantes;

  })
