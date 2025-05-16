const eye = document.getElementById("eye");
const password = document.getElementById("loginPassword");

eye.addEventListener("click", () => {
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    eye.classList.toggle("fa-eye-slash");
})


// const loginForm = document.getElementById("login-form");
// var credenciales = {
//     email: "admin@gmail.com",
//     password: "123456"
// }

// loginForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     console.log(loginForm.loginEmail.value);
//     console.log(loginForm.loginPassword.value);
//     let correo = loginForm.loginEmail.value;
//     let password = loginForm.loginPassword.value;
//     if (correo === credenciales.email && password === credenciales.password) {
//         let timerInterval;
//         Swal.fire({
//             title: "Credenciales correctas",
//             text: "Redirigiendo a la página principal",
//             timer: 1500,
//             didOpen: () => {
//                 Swal.showLoading();
//                 const timer = Swal.getPopup().querySelector("b");
//                 timerInterval = setInterval(() => {
//                     timer.textContent = `${Swal.getTimerLeft()}`;
//                 }, 100);
//             },
//             willClose: () => {
//                 clearInterval(timerInterval);
//             }
//         }).then((result) => {
//             /* Read more about handling dismissals below */
//             if (result.dismiss === Swal.DismissReason.timer) {
//                 window.location.href = "../pages/index.html";
//             }
//         });

//     } else {
//         Swal.fire({
//             icon: "error",
//             title: "Credenciales incorrectas",
//             text: "Por favor verifica tus credenciales",
//             showConfirmButton: false,
//             timer: 1500
//         });
//     }

// })

// window.addEventListener("load", () => {
//     fetch("https://api-springboot-hdye.onrender.com/status")
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`Error en la solicitud: ${response.status}`);
//       }
//       quitarPreloader();
//       return response.text();
//     })
//     .then((status) => {
//       console.log(status);

//     })
//     .catch((error) => {
//       console.error("El servicio no está en linea:", error);
//     });
// });