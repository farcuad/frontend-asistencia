const eye = document.getElementById("eye");
const password = document.getElementById("loginPassword");

eye.addEventListener("click", () => {
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    eye.classList.toggle("fa-eye-slash");
})