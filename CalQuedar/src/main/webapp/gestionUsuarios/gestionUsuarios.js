import { Usuario } from "../objJS/usuario.js";
import {
  contrasenyaIgual,
  nombreValido,
  validarContrasenya,
  validarNif,
} from "../script/funciones.js";
import {
  contraAdmin,
  contraAdminRepe,
  errorUsernameAdmin,
  formularioAdmin,
  nombreAdmin,
  tablaUsuariosAdmin,
  tablaUsuariosNormales,
  usernameAdmin,
  verContra,
  verContraRepe,
} from "../script/selectores.js";

const urlActual = new URL(window.location.href).host;

async function registroAdmin(adminRegistrar) {
  return fetch(`http://${urlActual}/CalQuedar/rest/Admin/Registro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-origin": "*",
    },
    body: JSON.stringify(adminRegistrar),
  });
}

async function listaUsuariosAdmin() {
    return fetch(`http://${urlActual}/CalQuedar/rest/Admin/Listado/UsuariosAdmin`,
    {
      headers: {
        'Access-Control-Allow-origin': '*'
      }
    }
  );
}

async function listaUsuariosNormales() {
    return fetch(`http://${urlActual}/CalQuedar/rest/Admin/Listado/UsuariosNormales`,
    {
      headers: {
        'Access-Control-Allow-origin': '*'
      }
    }
  );
}

addEventListener("DOMContentLoaded", function () {
  "use strict";

  listaUsuariosNormales()
  .then(respuesta => respuesta.json())
  .then(datos => pintarTabla(datos, tablaUsuariosNormales))

  listaUsuariosAdmin()
  .then(respuesta => respuesta.json())
  .then(datos => pintarTabla(datos, tablaUsuariosAdmin))

  formularioAdmin.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!formularioAdmin.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      console.log(usernameAdmin.value)
      if (
        nombreValido(nombreAdmin.value) &&
        validarNif(usernameAdmin.value) &&
        validarContrasenya(contraAdmin.value) &&
        contrasenyaIgual(contraAdmin.value, contraAdminRepe.value)
      ) {
        let nuevoAdmin = new Usuario(
          usernameAdmin.value,
          nombreAdmin.value,
          contraAdmin.value,
        );
        registroAdmin(nuevoAdmin).then((respuesta) => {
          if (respuesta.ok) {
            formularioAdmin.submit();
          } else if (respuesta.status == 409) {
            errorUsernameAdmin.innerText =
              "Ya hay un administrador registrado con ese DNI";
            usernameAdmin.setCustomValidity(
              "Ya hay un administrador registrado con ese DNI",
            );
          } else {
            alert("Ha habido un error");
          }
        });
      }
    }

    if (!nombreValido(nombreAdmin.value)) {
      nombreAdmin.setCustomValidity(
        "El nombre es obligatorio y debe estar formado por mínimo nombre y un apellido",
      );
    } else {
      nombreAdmin.setCustomValidity("");
    }

    if (!validarNif(usernameAdmin.value)) {
      usernameAdmin.setCustomValidity(
        "El username debe estar formado por un DNI válido",
      );
      errorUsernameAdmin.innerText =
        "El username debe estar formado por un DNI válido";
    } else {
        usernameAdmin.setCustomValidity(
        "",
      )
    }

    if (!validarContrasenya(contraAdmin.value)) {
      contraAdmin.setCustomValidity(
        "La contraseña no es segura, debe contener minúsculas, mayúsculas, número y carácter especial"
      );
    } else {
      contraAdmin.setCustomValidity("");
    }

    if (!contrasenyaIgual(contraAdmin.value, contraAdminRepe.value)) {
      contraAdminRepe.setCustomValidity("Las contraseñas no coinciden");
    } else {
      contraAdminRepe.setCustomValidity("");
    }

    formularioAdmin.classList.add("was-validated");
  });
});
verContra.addEventListener("click", function () {
  if (contraAdmin.type === "password") {
    contraAdmin.type = "text";
    verContra.ariaChecked = true;
  } else {
    contraAdmin.type = "password";
    verContra.ariaChecked = false;
  }
});

verContraRepe.addEventListener("click", function () {
  if (contraAdminRepe.type === "password") {
    contraAdminRepe.type = "text";
    verContraRepe.ariaChecked = true;
  } else {
    contraAdminRepe.type = "password";
    verContraRepe.ariaChecked = false;
  }
});

function pintarTabla(datos, destino) {
  datos.forEach(usuario => {
    let fila = document.createElement("tr");
    fila.innerHTML = `<td>${usuario.username}</td><td>${usuario.nombre}</td><td>${usuario.contrasenya}</td>`
    destino.appendChild(fila);
  });
}