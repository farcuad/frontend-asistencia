let listasSubproyectos = [];
window.addEventListener("load", () => {
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
      const bodySubproyectos = document.getElementById("bodySubproyectos");
      listasSubproyectos.forEach((subproyecto, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
                <td>${index + 1}</td>
                <td>${subproyecto.nombre}</td>
                <td>
                  <i class="color-blue fa-solid fa-pen" data-bs-toggle="modal"
                   data-bs-target="#actualizarSubproyecto"data-id="${subproyecto.id}"
                   data-nombre="${subproyecto.nombre}"
                  data-profesor="${subproyecto.profesor}"
                  ></i>
                  <i class="color-red fa-solid fa-circle-xmark"></i>
                `

        bodySubproyectos.appendChild(fila);
      });
    })
    .catch((error) => {
      console.error("Error al realizar la solicitud:", error);
    });
})


const guardarProfesor = document.getElementById("guardarProfesor");

guardarProfesor.addEventListener("show.bs.modal", () => {
  const seleccionar = document.getElementById("seleccionarProfesor");
  seleccionar.innerHTML = '<option value="">Seleccione un profesor</option>';
  fetch("https://api-springboot-hdye.onrender.com/leerprofesores")
    .then(response => response.json())
    .then(data => {
      data.forEach(profesor => {
        const option = document.createElement('option');
        option.value = profesor.id;
        option.textContent = "Nombre no disponible" ? profesor.correo : profesor.nombre;
        seleccionar.appendChild(option);
      });
    });

  const seleccionarCarrera = document.getElementById("seleccionarCarrera");
  seleccionarCarrera.innerHTML = '<option value="">Seleccione una carrera</option>';
  fetch("https://api-springboot-hdye.onrender.com/carreras")
    .then(response => response.json())
    .then(data => {
      data.forEach(carrera => {
        const option = document.createElement('option');
        option.value = carrera.id;
        option.textContent = carrera.nombre;
        seleccionarCarrera.appendChild(option);
      });
    });
})


const guardarSubproyecto = document.getElementById("guardarSubproyecto");

guardarSubproyecto.addEventListener("click", () => {
  const nombre = document.getElementById("nombreSubproyecto").value;
  const profesorId = document.getElementById("seleccionarProfesor").value;
  const carrera = document.getElementById("seleccionarCarrera").value;

  fetch("https://api-springboot-hdye.onrender.com/crearsubproyecto", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nombre: nombre,
      profesor: profesorId.toString(),
      id: "",
      carrera: carrera
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error al guardar el subproyecto`);
      }
      return response.json();
    })
    .then(data => {
      // Opcional: cerrar modal y recargar lista
      location.reload();
    })
    .catch(error => {
      alert('No se pudo guardar el subproyecto');
      console.error(error);
    });
});


const actualizarSubproyecto = document.getElementById("actualizarSubproyecto");
let subproyectoIdActualizar = "";
actualizarSubproyecto.addEventListener("show.bs.modal", (event) => {
  const btn = event.relatedTarget;
  subproyectoIdActualizar = btn.getAttribute("data-id");
  const nombreSubproyecto = btn.getAttribute("data-nombre");
  document.getElementById("nameSubproyecto").value = nombreSubproyecto;

  const seleccionarSubproyecto = document.getElementById("seleccionarSubproyecto");
  seleccionarSubproyecto.innerHTML = '<option value="">Seleccione un profesor</option>';
  fetch("https://api-springboot-hdye.onrender.com/leerprofesores")
    .then(response => response.json())
    .then(data => {
      data.forEach(profesor => {
        const option = document.createElement('option');
        option.value = profesor.id;
        option.textContent = "Nombre no disponible" ? profesor.correo : profesor.nombre;
        seleccionarSubproyecto.appendChild(option);
      });
    });

  // Cargar las carreras disponibles
  const actualizarCarrera = document.getElementById("actualizarCarrera");
  actualizarCarrera.innerHTML = '<option value="">Seleccione una carrera</option>';
  fetch("https://api-springboot-hdye.onrender.com/carreras")
    .then(response => response.json())
    .then(data => {
      data.forEach(carrera => {
        const option = document.createElement('option');
        option.value = carrera.id;
        option.textContent = carrera.nombre;
        actualizarCarrera.appendChild(option);
      });
    });
})

const actualizarSubproyectos = document.getElementById("actualizarSubproyectos");

actualizarSubproyectos.addEventListener("click", () => {
  const nombreSubproyecto = document.getElementById("nameSubproyecto").value;
  const subproyectoId = document.getElementById("seleccionarSubproyecto").value;
  const actualizarCarrera = document.getElementById("actualizarCarrera").value;

  fetch("https://api-springboot-hdye.onrender.com/actualizarsubproyecto", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nombre: nombreSubproyecto,
      profesor: subproyectoId,
      id: subproyectoIdActualizar,
      carrera: actualizarCarrera
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error al guardar el subproyecto`);
      }
      return response.json();
    })
    .then(data => {
      // Opcional: cerrar modal y recargar lista
      location.reload();
    })
    .catch(error => {
      alert('No se pudo guardar el subproyecto');
      console.error(error);
    });
});