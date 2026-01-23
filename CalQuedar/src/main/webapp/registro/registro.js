import {
  validarUsername,
  validarContrasenya,
  contrasenyaIgual,
  soloLetras
} from "../script/funciones.js";
import { Usuario } from "../objJS/usuario.js";

async function registroUsuario(usuarioRegistrar) {
  return fetch("http://localhost:8080/CalQuedar/rest/User/Registro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuarioRegistrar),
  });
}

addEventListener("DOMContentLoaded", function () {
  "use strict";
  const nombreUsuario = document.getElementById("nombre");
  const usernameUsuario = document.getElementById("username");
  const contraUsuario = document.getElementById("contrasenya");
  const contraUsuarioRepe = document.getElementById("contrasenyaRepe");
  const formulario = document.getElementById("formRegistro");
  const errorUsername = document.getElementById("error-usuario");
  const verContra = document.getElementById("ver-contrasenya");
  const verContraRepe = document.getElementById("ver-contrasenya-repe");

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!formulario.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if (
        soloLetras(nombreUsuario.value) &&
        validarUsername(usernameUsuario.value) &&
        validarContrasenya(contraUsuario.value) &&
        contrasenyaIgual(contraUsuario.value, contraUsuarioRepe.value)
      ) {
        let nuevoUsuario = new Usuario(
          usernameUsuario.value,
          nombreUsuario.value,
          contraUsuario.value
        );
        registroUsuario(nuevoUsuario).then((respuesta) => {
          if (respuesta.ok) {
            formulario.submit();
          } else if (respuesta.status == 409) {
            errorUsername.innerText = "El nombre de usuario ya está en uso";
            usernameUsuario.setCustomValidity("El nombre de usuario ya está en uso");
          } else {
            alert("Ha habido un error");
          }
        });
      }
    }

    if (!soloLetras(nombreUsuario.value)) {
      nombreUsuario.setCustomValidity("El nombre solo pude contener letras y espacios, pero no espacios dobles ni al principio o al final");
    } else {
      nombreUsuario.setCustomValidity("");
    }

    if (!validarUsername(usernameUsuario.value)) {
      errorUsername.innerText =
        'El nombre de usuario solo puede contener letras, números y "_"';
      usernameUsuario.setCustomValidity(
        'El nombre de usuario solo puede contener letras, números y "_"'
      );
    } else {
      usernameUsuario.setCustomValidity("");
    }

    if (!validarContrasenya(contraUsuario.value)) {
      contraUsuario.setCustomValidity(
        "La contraseña no es segura, debe contener minúsculas, mayúsculas, número y carácter especial"
      );
    } else {
      contraUsuario.setCustomValidity("");
    }

    if (!contrasenyaIgual(contraUsuario.value, contraUsuarioRepe.value)) {
      contraUsuarioRepe.setCustomValidity("Las contraseñas no coinciden");
    } else {
      contraUsuarioRepe.setCustomValidity("");
    }

    formulario.classList.add("was-validated");
  });

  verContra.addEventListener("click", function () {
    if (contraUsuario.type === "password") {
      contraUsuario.type = "text";
      verContra.ariaChecked = true;
    } else {
      contraUsuario.type = "password";
      verContra.ariaChecked = false;
    }
  });

  verContraRepe.addEventListener("click", function () {
    if (contraUsuarioRepe.type === "password") {
      contraUsuarioRepe.type = "text";
      verContraRepe.ariaChecked = true;
    } else {
      contraUsuarioRepe.type = "password";
      verContraRepe.ariaChecked = false;
    }
  });
});
