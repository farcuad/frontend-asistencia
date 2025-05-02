 let estudiantes = [
   {
     cedula: "24114415",
     nombre: "David",
     apellido: "Reyes",
   },
   {
     cedula: "30321239",
     nombre: "Rafael",
     apellido: "Arocha",
   },
   {
     cedula: "31204836",
     nombre: "Andres",
     apellido: "Calles",
   },
   {
     cedula: "30740994",
     nombre: "Antony",
     apellido: "Guevara",
   },
   {
     cedula: "31598995",
     nombre: "Jonathan",
     apellido: "Leal",
   },
 ];

/* 
 for (let i = 0; i < estudiantes.length; i++) {
    const estudiante = array[i];
    
    const fila = document.createElement("tr");
    fila.setAttribute("data-estudiante-cedula", estudiantes[i].cedula);
    fila.setAttribute("data-estudiante-nombre", estudiantes[i].nombre);
    fila.innerHTML = `
        <td>${i +1}</td>
        <td>${estudiantes[i].nombre + " " +estudiantes[i].apellido}</td>
        <td>${estudiantes[i].cedula }</td>
        <td>
        <i class="fa-solid fa-eye" data-bs-toggle="modal" data-bs-target="#verUsuarioModal" data-estudiante-nombre="Andres Calles"
        <i class="fa-solid fa-pen-to-square"></i>
        data-estudiante-cedula="31.204.836"></i>
        <i class="fa-solid fa-trash-can"></i>
       </td>
        `;
    document.getElementById("bodyEstudiantes").appendChild(fila);
    
    
 } */
 
 window.addEventListener("load", () => {
   estudiantes.forEach((estudiante, index) => {
     const fila = document.createElement("tr");
     fila.setAttribute("data-estudiante-cedula", estudiante.cedula);
     fila.setAttribute("data-estudiante-nombre", estudiante.nombre);
     fila.innerHTML = `
         <td>${index +1}</td>
         <td>${estudiante.nombre + " " +estudiante.apellido}</td>
         <td>${estudiante.cedula }</td>
         <td>
         <i class="fa-solid fa-eye" data-bs-toggle="modal" data-bs-target="#verUsuarioModal" data-estudiante-nombre="Andres Calles"
         data-estudiante-cedula="31.204.836"></i>
         <i class="fa-solid fa-pen-to-square"></i>
         <i class="fa-solid fa-trash-can"></i>
        </td>
         `;
     document.getElementById("bodyEstudiantes").appendChild(fila);
   });
 });