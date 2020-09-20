//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

function login() {
    var user = document.getElementById("user").value;
    var password = document.getElementById("password").value;

    var useralert = document.getElementById("alertauser");
    var passwordalert = document.getElementById("alertapassword");

    if (user.trim() !== "") {
        useralert.style.visibility="hidden";
    }
    if (user.trim() === "") {
        useralert.style.visibility="visible";
    }
    if (password.trim() !== "") {
        passwordalert.style.visibility="hidden";
    }
    if (password.trim() === "") {
        passwordalert.style.visibility="visible";
    }
    if (user.trim() !== "" && password.trim() !== "") {
        sessionStorage.setItem("usuario", user.trim());
        window.location="cover.html";
    }
};

document.addEventListener("DOMContentLoaded", function(e){
    
});