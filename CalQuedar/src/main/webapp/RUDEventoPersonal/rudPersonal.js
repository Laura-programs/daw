import { EventoUpdateDTO } from "../objJS/DTO/eventoUpdateDTO.js";
import { BBDDToDatePicker, datePickerToBBDD, procesarEventosSet } from "../script/funciones.js";
import {
  selectorAmigos,
  selectorGrupos,
  contenidoAmigos,
  contenidoGrupos,
  btnDropDown,
  dropDownLogOut,
  formulario,
  id,
  titulo,
  visibilidad,
  etiqueta,
  fechaInicio,
  fechaFin,
  descripcion,
  btnActualizar,
  btnEliminar,
} from "../script/selectores.js";

const urlActual = new URL(window.location.href).host;

async function buscaEvento(idEvento) {
  return fetch(
    `http://${urlActual}/CalQuedar/rest/Evento/Buscar/EventoPersonal?id=${idEvento}`,
    {
      headers: {
        'Access-Control-Allow-origin': '*'
      }
    }
  );
}

async function eliminaEvento(idEvento) {
  return await fetch(
    `http://${urlActual}/CalQuedar/rest/Evento/Eliminar/EventoPersonal?id=${idEvento}`,
    {
      headers: {
        'Access-Control-Allow-origin': '*'
      }
    }
  );
}

async function actualizaEvento(evento) {
  return await fetch(
    `http://${urlActual}/CalQuedar/rest/Evento/Actualizar/EventoPersonal`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-origin': '*'
      },
      body: JSON.stringify(evento),
    },
  );
}

async function cargarEventos() {
  return fetch(`http://${urlActual}/CalQuedar/rest/Evento/Cargar/Propios`,
    {
      headers: {
        'Access-Control-Allow-origin': '*'
      }
    }
  );
}

async function cargarEventosProximos() {
  return fetch(
    `http://${urlActual}/CalQuedar/rest/Evento/Cargar/PropiosProximos`,
    {
      headers: {
        'Access-Control-Allow-origin': '*'
      }
    }
  );
}

async function cargarAmigos() {
  return fetch(`http://${urlActual}/CalQuedar/rest/User/Amigos`,
    {
      headers: {
        'Access-Control-Allow-origin': '*'
      }
    }
  );
}

let listaEventosCalendario = [];
let listaEventosProximosCalendario = [];

addEventListener("DOMContentLoaded", function () {
  let params = new URLSearchParams(document.location.search);
  let idEvento = params.get("id");
  buscaEvento(idEvento)
    .then((respuesta) => respuesta.json())
    .then((evento) => cargarEvento(evento));

  cargarAmigos()
    .then((listaAmigos) => listaAmigos.json())
    .then((datos) => pintaAmigos(datos));

  cargarEventos()
    .then((listaEventos) => listaEventos.json())
    .then((datos) => {
      listaEventosCalendario = procesarEventosSet(datos);
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

fechaInicio.addEventListener("change", function () {
  console.log(`${fechaInicio.value}:00`);
  fechaFin.min = `${fechaInicio.value}:00`;
});

btnEliminar.addEventListener("click", function () {
  eliminaEvento(id.value).then((respuesta) => {
    if (respuesta.ok) {
      window.location.replace("/CalQuedar/UserCalendarServlet");
    } else {
      alert("Ha habido un error");
    }
  });
});

btnActualizar.addEventListener("click", function () {
  if (formulario.checkValidity()) {
    formulario.classList.add("was-validated");
    let fechaFinal;
    if (fechaFin.value == "") {
      fechaFinal = null;
    } else {
      fechaFinal = fechaFin.value;
    }
    let evento = new EventoUpdateDTO(
      id.value,
      titulo.value,
      visibilidad.value,
      etiqueta.value,
      datePickerToBBDD(fechaInicio.value),
      datePickerToBBDD(fechaFinal),
      descripcion.value,
    );
    actualizaEvento(evento).then((respuesta) => {
      if (respuesta.ok) {
        window.location.replace("/CalQuedar/UserCalendarServlet");
      } else {
        alert("Ha habido un error");
      }
    });
  }
});

function cargarEvento(evento) {
  id.value = evento.id;
  titulo.value = evento.titulo;
  visibilidad.value = evento.visibilidad;
  etiqueta.value = evento.etiqueta;
  fechaInicio.value = BBDDToDatePicker(evento.fechaInicio);
  fechaFin.value = BBDDToDatePicker(evento.fechaFin);
  descripcion.value = evento.descripcion;
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
