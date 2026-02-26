import { contadorEventos, contadorGrupos, contadorUsuarios, tablaUsuarios } from "../script/selectores.js";

const urlActual = new URL(window.location.href).host;

async function totalUsuarios() {
    return fetch(`http://${urlActual}/CalQuedar/rest/Admin/Conteo/Usuarios`,
    {
      headers: {
        'Access-Control-Allow-origin': '*'
      }
    }
  );
}

async function totalGrupos() {
    return fetch(`http://${urlActual}/CalQuedar/rest/Admin/Conteo/Grupos`,
    {
      headers: {
        'Access-Control-Allow-origin': '*'
      }
    }
  );
}

async function totalEventos() {
    return fetch(`http://${urlActual}/CalQuedar/rest/Admin/Conteo/Eventos`,
    {
      headers: {
        'Access-Control-Allow-origin': '*'
      }
    }
  );
}

async function listaUsuarios() {
    return fetch(`http://${urlActual}/CalQuedar/rest/Admin/Listado/Usuarios`,
    {
      headers: {
        'Access-Control-Allow-origin': '*'
      }
    }
  );
}

addEventListener("DOMContentLoaded", function() {
  totalUsuarios()
  .then(respuesta => respuesta.json())
  .then(datos => contadorUsuarios.innerText = datos);

  totalGrupos()
  .then(respuesta => respuesta.json())
  .then(datos => contadorGrupos.innerText = datos);

  totalEventos()
  .then(respuesta => respuesta.json())
  .then(datos => contadorEventos.innerText = datos);

  listaUsuarios()
  .then(respuesta => respuesta.json())
  .then(datos => pintarTablaUsuarios(datos));
})

function pintarTablaUsuarios(usuarios) {
  usuarios.forEach(usuario => {
    let fila = document.createElement("tr");
    let rol;
    if(usuario.rol == true) {
      rol = "Administrador"
    } else {
      rol = "None"
    }
    fila.innerHTML = `<td>${usuario.username}</td><td>${usuario.nombre}</td><td>${rol}</td>`
    tablaUsuarios.appendChild(fila);
  });
}