import { EventoPers } from "../objJS/eventoPersonal.js";
import { datePickerToBBDD, procesarEventosSet } from "../script/funciones.js";
import {
  selectorAmigos,
  selectorGrupos,
  contenidoAmigos,
  contenidoGrupos,
  btnDropDown,
  dropDownLogOut,
  formulario,
  titulo,
  visibilidad,
  etiqueta,
  fechaInicio,
  fechaFin,
  descripcion,
  listaAmigos,
  calendarioLateral
} from "../script/selectores.js";

const urlActual = new URL(window.location.href).host;

async function anadirEvento(evento) {
  return fetch(
    `http://${urlActual}/CalQuedar/rest/Evento/Anadir/EventoPersonal`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-origin": "*",
      },
      body: JSON.stringify(evento),
    },
  );
}

async function cargarEventosProximos() {
  return fetch(
    `http://${urlActual}/CalQuedar/rest/Evento/Cargar/PropiosProximos`,
    {
      headers: {
        "Access-Control-Allow-origin": "*",
      },
    },
  );
}

async function cargarAmigos() {
  return fetch(`http://${urlActual}/CalQuedar/rest/User/Amigos`, {
    headers: {
      "Access-Control-Allow-origin": "*",
    },
  });
}

let listaEventosProximosCalendario = [];

addEventListener("DOMContentLoaded", function () {
  cargarAmigos()
    .then((listaAmigos) => listaAmigos.json())
    .then((datos) => pintaAmigos(datos));

  cargarEventosProximos()
    .then((listaEventos) => listaEventos.json())
    .then((datos) => {
      listaEventosProximosCalendario = procesarEventosSet(datos);
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
      });
      sideCalendar.render();
    });
});

fechaInicio.addEventListener("change", function () {
  console.log(`${fechaInicio.value}:00`);
  fechaFin.min = `${fechaInicio.value}:00`;
});

formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  if (!formulario.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  } else {
    formulario.classList.add("was-validated");
    let fechaFinal;
    if (fechaFin.value == "") {
      fechaFinal = null;
    } else {
      fechaFinal = fechaFin.value;
    }
    let evento = new EventoPers(
      titulo.value,
      visibilidad.value,
      etiqueta.value,
      datePickerToBBDD(fechaInicio.value),
      datePickerToBBDD(fechaFinal),
      descripcion.value,
    );
    anadirEvento(evento).then((respuesta) => {
      if (respuesta.ok) {
        formulario.submit();
      } else {
        alert("Ha habido un error");
      }
    });
  }
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

selectorAmigos.addEventListener("click", () => {
  selectorGrupos.classList.add("unselected-grupos");
  selectorAmigos.classList.add("selected-amigos");
  selectorAmigos.classList.remove("unselected-amigos");
  contenidoAmigos.hidden = false;
  contenidoAmigos.ariaHidden = false;
  contenidoGrupos.hidden = true;
  contenidoGrupos.ariaHidden = true;
});

selectorGrupos.addEventListener("click", function () {
  selectorGrupos.classList.add("selected-grupos");
  selectorAmigos.classList.add("unselected-amigos");
  selectorGrupos.classList.remove("unselected-grupos");
  contenidoAmigos.hidden = true;
  contenidoAmigos.ariaHidden = true;
  contenidoGrupos.hidden = false;
  contenidoGrupos.ariaHidden = false;
});

btnDropDown.addEventListener("click", function () {
  dropDownLogOut.classList.toggle("muestra");
});
