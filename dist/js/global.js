
window.addEventListener("load", () => {
  cargarUsuario();
});

function  cargarUsuario() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const nombreUsuario = document.querySelectorAll("#nombreUsuario");
  const imagenUsuario = document.querySelectorAll("#imagenUsuario");
  const correoUsuario = document.querySelectorAll("#correoUsuario");
  if (usuario) {
    nombreUsuario.forEach((element) => {
      element.textContent = usuario.nombre;
    });
    correoUsuario.forEach((element) => {
      element.textContent = usuario.correo;
    });
    imagenUsuario.forEach((element) => {
      element.src = usuario.imagen;
    });
  } else {
    nombreUsuario.forEach((element) => {
      element.textContent = "Invitado";
    });
    correoUsuario.forEach((element) => {
      element.textContent = "Sin correo";
    });
    imagenUsuario.forEach((element) => {
      element.src = "../assets/img/avatar5.png";
    });
  }
 }

 function cerrarSesion() {
  localStorage.removeItem("usuario");
  window.location.href = "../outh/login.html";

 }