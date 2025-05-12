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
                <td>${subproyecto.nombre}</td>`
               
        bodySubproyectos.appendChild(fila);
      });
    })
    .catch((error) => {
          console.error("Error al realizar la solicitud:", error);
        });
})


