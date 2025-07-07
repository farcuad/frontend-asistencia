let listasAsistencias = [];
let listasSubproyectos = [];
let listasProfesores = [];
let contador = 0;
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
      contador++;
      imprimirAsistencia(contador);
    });
  fetch("https://api-springboot-hdye.onrender.com/subproyectos")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      return response.json(); // Convertir la respuesta a JSON
    })
    .then((data) => {
      console.log("Datos recibidos:", data); // Procesar los datos recibidos
      // Aquí puedes manipular los datos, por ejemplo, mostrarlos en una tabla
      listasSubproyectos = data;
      contador++;
      imprimirAsistencia(contador);
    });
  fetch("https://api-springboot-hdye.onrender.com/leerprofesores")
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
      contador++;
      imprimirAsistencia(contador);;
    });
});
const verAsistencias = document.getElementById("verAsistenciaModal");

verAsistencias.addEventListener("show.bs.modal", (event) => {
  const btnVer = event.relatedTarget;
  const imagenAsistencia = btnVer.getAttribute("data-imagen-asistencia");
  const estudiantes = JSON.parse(btnVer.getAttribute("data-estudiantes"));
  const descripcion = btnVer.getAttribute("data-descripcion");

  const estudianteModal = document.getElementById("estudiantes");
  estudianteModal.textContent = "";

  const imagenModal = document.getElementById("imagenAsistencia");
  if(imagenModal){
    let html = ""
    if(descripcion){
      html += `<p><strong>Descripción:</strong>${descripcion}</p>`;
    }
    if(imagenAsistencia){
      html += `<img src="${imagenAsistencia}" alt="Imagen de asistencia" class="img-fluid">`;
    }else{
      html += `<p>No hay imagen de asistencia disponible.</p>`;
    }
    imagenModal.innerHTML = html;
  }
  fetch("https://api-springboot-hdye.onrender.com/buscarestudiantes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(
      // Reemplaza esto con los datos que necesitas enviar
      estudiantes
    )
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Datos recibidos:", data);
      // Procesa los datos recibidos aquí

      data.forEach((estudiante, index) => {
        console.log(estudiante);

        const fila = document.createElement("tr");
        fila.innerHTML = `
                <td>${index + 1}</td>
                <td>${estudiante.cedula}</td>
                <td>${estudiante.nombre}</td>

                `
        estudianteModal.appendChild(fila);
      })
    });

})

function nombreSubproyecto(id) {
  const subproyecto = listasSubproyectos.find((subproyecto) => subproyecto.id === id);
  console.log(listasSubproyectos.length);
  return subproyecto ? subproyecto.nombre : "Subproyecto no encontrado";
}


function imprimirAsistencia(n) {
  if (n === 3) {
    const bodyAsistencias = document.getElementById("bodyAsistencias");
    listasAsistencias.forEach((asistencia, index) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
                <td>${index + 1}</td>
                <td>${asistencia.fecha}</td>
                <td>${asistencia.estudiantes.length}</td>
                <td>${nombreProfesor(asistencia.profesor)}</td>
                <td>${nombreSubproyecto(asistencia.subproyecto)}</td>
                <td>

                  <i class="color-blue fa-solid fa-eye" data-bs-toggle="modal" data-bs-target="#verAsistenciaModal"
                  data-estudiantes= '${JSON.stringify(asistencia.estudiantes)}'
                  data-imagen-asistencia="${asistencia.imageUrl || ''}"
                  data-descripcion="${asistencia.descripcion || ''}"></i>
                </td> `
      bodyAsistencias.appendChild(fila);
    })
  }
}

function nombreProfesor(id) {
  const profesor = listasProfesores.find((profesor) => profesor.id === id);
  return profesor ? profesor.nombre : "Profesor no encontrado";
}