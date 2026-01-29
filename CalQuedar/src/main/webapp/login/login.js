import { UsuarioDTO } from "../objJS/DTO/usuarioDTO.js";
import { dropDownLogOut, btnDropDown } from "../script/selectores.js";

async function logearUsuario(usuarioLogin) {
  return fetch("http://localhost:8080/CalQuedar/rest/User/Login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuarioLogin),
  });
}

addEventListener("DOMContentLoaded", function () {
  const nomUsuario = document.getElementById("username");
  const contUsuario = document.getElementById("contrasenya");
  const formulario = document.getElementById("formLogin");
  const verContra = document.getElementById("ver-contrasenya");

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    let loginUsuario = new UsuarioDTO(nomUsuario.value, contUsuario.value);
    logearUsuario(loginUsuario)
      .then((respuesta) => {
        if (respuesta.status == 404) {
          nomUsuario.setCustomValidity("Usuario o contraseña inválidos");
          contUsuario.setCustomValidity("Usuario o contraseña inválidos");
        } else {
          sessionStorage.setItem("username", nomUsuario.value);
          formulario.submit();
        }
      })
      .catch((error) => alert(error));
    formulario.classList.add("was-validated");
  });

  verContra.addEventListener("click", function () {
    if (contUsuario.type === "password") {
      contUsuario.type = "text";
      verContra.ariaChecked = true;
    } else {
      contUsuario.type = "password";
      verContra.ariaChecked = false;
    }
  });

  btnDropDown.addEventListener("click", function () {
    dropDownLogOut.classList.toggle("muestra");
  });
});
