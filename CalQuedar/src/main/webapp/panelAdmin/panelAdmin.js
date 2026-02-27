import { contadorEventos, contadorGrupos, contadorUsuarios, tablaGrupos, tablaUsuarios } from "../script/selectores.js";

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

async function listaGrupos() {
    return fetch(`http://${urlActual}/CalQuedar/rest/Admin/Listado/Grupos`,
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

  listaGrupos()
  .then(respuesta => respuesta.json())
  .then(datos => pintarTablaGrupos(datos));
})

function pintarTablaUsuarios(usuarios) {
  usuarios.forEach(usuario => {
    let fila = document.createElement("tr");
    let rol;
    if(usuario.admin == 1) {
      rol = "Administrador"
    } else {
      rol = "None"
    }
    fila.innerHTML = `<td>${usuario.username}</td><td>${usuario.nombre}</td><td>${rol}</td>`
    tablaUsuarios.appendChild(fila);
  });
}

function pintarTablaGrupos(grupos) {
  grupos.forEach(grupo => {
   let fila = document.createElement("tr");
   fila.innerHTML = `<td>${grupo.id}</td><td>${grupo.nombre}</td><td>${grupo.miembros.length}</td><td>${grupo.admin.username}</td>`
   tablaGrupos.appendChild(fila);
  })
}