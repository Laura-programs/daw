import { procesarEventosAjenos } from "../script/funciones.js";
import {
  btnDropDown,
  dropDownLogOut,
  calendarioCentral,
  calendarioLateral,
  nombreAmigoHeader,
  listaAmigos,
  elimnarAmigoBtn,
} from "../script/selectores.js";

const urlActual = new URL(window.location.href).host;

async function cargarEventos(usuario) {
  return fetch(
    `http://${urlActual}/CalQuedar/rest/Evento/Cargar/Ajenos?amigo=${usuario}`,
    {
      headers: {
        "Access-Control-Allow-origin": "*",
      },
    },
  );
}

async function cargarEventosProximos(usuario) {
  return fetch(
    `http://${urlActual}/CalQuedar/rest/Evento/Cargar/AjenosProximos?amigo=${usuario}`,
    {
      headers: {
        "Access-Control-Allow-origin": "*",
      },
    },
  );
}

async function cargarInfoAmigo(usuario) {
  return fetch(
    `http://${urlActual}/CalQuedar/rest/User/InfoAmigo?amigo=${usuario}`,
    {
      headers: {
        "Access-Control-Allow-origin": "*",
      },
    },
  );
}

async function cargarAmigosComun(usuario) {
  return fetch(
    `http://${urlActual}/CalQuedar/rest/User/AmigosComun?amigo=${usuario}`,
    {
      headers: {
        "Access-Control-Allow-origin": "*",
      },
    },
  );
}

async function eliminarAmigo(amigo) {
  return fetch(
    `http://${urlActual}/CalQuedar/rest/User/EliminarAmigo?amigo=${amigo}`,
    {
      headers: {
        "Access-Control-Allow-origin": "*",
      },
    },
  );
}

let usernameAmigo;
let listaEventosCalendario = [];
let listaEventosProximosCalendario = [];

document.addEventListener("DOMContentLoaded", function () {
  let params = new URLSearchParams(document.location.search);
  let usuarioAmigo = params.get("amigo");
  usernameAmigo = usuarioAmigo;
  cargarInfoAmigo(usuarioAmigo)
    .then((amigo) => amigo.json())
    .then((datos) => {
      nombreAmigoHeader.innerText = datos.nombre;
    });

  cargarAmigosComun(usuarioAmigo)
    .then((listaAmigos) => listaAmigos.json())
    .then((datos) => pintaAmigos(datos));

  cargarEventos(usuarioAmigo)
    .then((listaEventos) => listaEventos.json())
    .then((datos) => {
      listaEventosCalendario = procesarEventosAjenos(datos);
      const mainCalendar = new FullCalendar.Calendar(calendarioCentral, {
        locale: "es",
        initialView: "dayGridMonth",
        headerToolbar: {
          start: "prev next",
          center: "title",
          end: "today",
        },
        titleFormat: {
          year: "numeric",
          month: "long",
        },
        firstDay: 1,
        themeSystem: "bootstrap5",
        fixedWeekCount: false,
        columnFormat: "dddd",
        events: listaEventosCalendario,
      });
      mainCalendar.render();
    });

  cargarEventosProximos(usuarioAmigo)
    .then((listaEventos) => listaEventos.json())
    .then((datos) => {
      listaEventosProximosCalendario = procesarEventosAjenos(datos);
      const sideCalendar = new FullCalendar.Calendar(calendarioLateral, {
        locale: "es",
        initialView: "listYear",
        headerToolbar: {
          start: "",
          center: "",
          end: "",
        },
        events: listaEventosProximosCalendario,
        header: false,
        height : "95%"
      });
      sideCalendar.render();
    });
});

btnDropDown.addEventListener("click", function () {
  dropDownLogOut.classList.toggle("muestra");
});

elimnarAmigoBtn.addEventListener("click", function () {
  eliminarAmigo(usernameAmigo).then((respuesta) => {
    if (respuesta.ok) {
      window.location.replace("/CalQuedar/UserCalendarServlet");
    } else {
      alert("Ha habido un error");
    }
  });
});

function pintaAmigos(amigos) {
  amigos.forEach((amigo) => {
    let divAmigo = document.createElement("div");
    divAmigo.innerHTML = `<div aria-roledescription="Información amigo" class="info-amigo">
                <i class="bi bi-emoji-wink"></i>
                <a href="/CalQuedar/CalendarioAmigoServlet?amigo=${amigo.username}"
                  >${amigo.nombre}</a
                >
              </div>
              <button class="eliminar-amigo" data-id='${amigo.username}'><i class="bi bi-person-x"></i
              ></button>`;
    divAmigo.classList.add("amigo");
    listaAmigos.appendChild(divAmigo);
  });
}
