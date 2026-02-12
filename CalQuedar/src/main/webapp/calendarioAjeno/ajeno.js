import { procesarEventosAjenos } from "../script/funciones.js";
import {
  btnDropDown,
  dropDownLogOut,
  calendarioCentral,
  calendarioLateral,
  nombreAmigoHeader,
} from "../script/selectores.js";

async function cargarEventos(usuario) {
  return fetch(
    `http://localhost:8080/CalQuedar/rest/Evento/Cargar/Ajenos?amigo=${usuario}`,
  );
}

async function cargarInfoAmigo(usuario) {
  return fetch(`http://localhost:8080/CalQuedar/rest/User/InfoAmigo?amigo=${usuario}`)
}

let listaEventosCalendario = [];

document.addEventListener("DOMContentLoaded", function () {
  let params = new URLSearchParams(document.location.search);
  let usuarioAmigo = params.get("amigo");
  cargarInfoAmigo(usuarioAmigo)
  .then((amigo) => amigo.json())
  .then((datos) => {
    nombreAmigoHeader.innerText = datos.nombre;
  });
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
      const sideCalendar = new FullCalendar.Calendar(calendarioLateral, {
        locale: "es",
        initialView: "listYear",
        headerToolbar: {
          start: "",
          center: "",
          end: "",
        },

        events: listaEventosCalendario,
        height: "auto",
        header: false,
      });
      mainCalendar.render();
      sideCalendar.render();
    });
});

btnDropDown.addEventListener("click", function () {
  dropDownLogOut.classList.toggle("muestra");
});
