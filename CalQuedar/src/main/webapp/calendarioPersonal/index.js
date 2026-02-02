import {
  btnDropDown,
  dropDownLogOut,
  calendarioCentral,
  calendarioLateral,
  crearGrupoBtn,
  unirGrupoBtn,
  selectorAmigos,
  selectorGrupos,
  contenidoAmigos,
  contenidoGrupos,
  modalIndex,
} from "../script/selectores.js";

async function cargarAmigos() {
  return fetch("http://localhost:8080/CalQuedar/rest/User/Amigos");
}

document.addEventListener("DOMContentLoaded", function () {
  cargarAmigos()
    .then((listaAmigos) => listaAmigos.json())
    .then((datos) => console.log(datos));
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
    events: [
      {
        id: "1",
        title: "event1",
        start: "2026-01-01",
      },
      {
        title: "event2",
        start: "2026-01-05T12:30:00",
        end: "2026-01-07 12:30:00",
        allDay: false,
        classNames: ["viaje", "evento"],
      },
      {
        title: "event3",
        start: "2026-01-09T12:30:00",
        allDay: false, // will make the time show
      },
      {
        description: "",
        classNames: "plan-grupo",
        end: "",
        start: "2026-02-26T00:00",
        title: "Título",
        visibilidad: "publico",
      },
    ],
  });
  const sideCalendar = new FullCalendar.Calendar(calendarioLateral, {
    locale: "es",
    initialView: "listYear",
    headerToolbar: {
      start: "",
      center: "",
      end: "",
    },

    events: [
      {
        id: "1",
        title: "event1",
        start: "2026-01-01",
      },
      {
        title: "event2",
        start: "2026-01-05",
        end: "2026-01-07",
        classNames: ["viaje", "evento"],
      },
      {
        title: "event3",
        start: "2026-01-09T12:30:00",
        allDay: false, // will make the time show
      },
    ],
    height: "auto",
    header: false,
  });
  mainCalendar.render();
  sideCalendar.render();
});

btnDropDown.addEventListener("click", function () {
  dropDownLogOut.classList.toggle("muestra");
});

crearGrupoBtn.addEventListener("click", function () {
  modalIndex.style.display = "block";
});

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

// https://www.youtube.com/watch?v=H-5LOvht5hQ
