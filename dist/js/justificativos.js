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
        const fila = document.createElement("tr");
        fila.innerHTML = `
          <td>${index + 1}</td>
          <td>${profesore.nombre === "Nombre no disponible" ? profesore.correo : profesore.nombre}</td>
          <td>${profesore.ci}</td>
          <td>
            <i class="color-blue fa-solid fa-eye" data-bs-toggle="modal" data-bs-target="#verJustificativosModal"
              data-profesor-id="${profesore.id}">
            </i>
          </td>
        `;
        bodyProfesores.appendChild(fila);
      });
    })
    .catch((error) => {
      console.error("Error al realizar la solicitud:", error);
    });
});

// Modal de detalle de profesor
const verAsistencias = document.getElementById("verJustificativosModal");

verAsistencias.addEventListener("show.bs.modal", (event) => {
  const btnVer = event.relatedTarget;
  const profesorId = btnVer.getAttribute("data-profesor-id");

  const justificativosContainer = document.getElementById("justificativosContainer");

  fetch("https://api-springboot-hdye.onrender.com/justificativos")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log("Datos recibidos:", data); // Procesar los datos recibidos
    console.log("Profesor ID:", profesorId); // Verificar el ID del profesor
    console.log("Justificativos profesores:", data.map(j => j.profesor)); // Verificar los IDs de los profesores en los justificativos
    const justificativos = data.filter(justificativo => String(justificativo.profesor) === String(profesorId));

    if (justificativos.length === 0) {
      justificativosContainer.innerHTML = "<p>No hay justificativos para este profesor.</p>";
    }else{
      justificativosContainer.innerHTML= justificativos.map(justificativo => `
        <div class="justificativo">
        <strong>Fecha:</strong> ${justificativo.fecha}<br>
        <strong>Descripcion:</strong> ${justificativo.descripcion}<br>
        <strong>Profesor:</strong> ${justificativo.profesor}<br>
        <img src="${justificativo.imageUrl}" alt="Justificativo" class="img-fluid rounded" width="100">
        </div>
        `).join("");
    }

  }).catch((error) => {
    console.error("Error al realizar la solicitud:", error);
    justificativosContainer.innerHTML = "<p>Error al cargar los justificativos.</p>";
  })
});