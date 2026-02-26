import { procesarEventosSet } from "../script/funciones.js";

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
  modalCrearGrupo,
  modalAnadirGrupo,
  anadirAmigoBtn,
  modalAnadirAmigo,
  formAnadirAmigo,
  nombreAmigo,
  listaAmigos,
  formAnadirGrupo,
  contenedorAmigos,
} from "../script/selectores.js";

const urlActual = new URL(window.location.href).host;

async function cargarAmigos() {
  return fetch(`http://${urlActual}/CalQuedar/rest/User/Amigos`,
    {
      headers: {
        'Access-Control-Allow-origin': '*'
      }
    }
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
  return fetch(`http://${urlActual}/CalQuedar/rest/Evento/Cargar/PropiosProximos`,
    {
      headers: {
        'Access-Control-Allow-origin': '*'
      }
    }
  );
}

async function anadirAmigo(amigo) {
  return fetch(
    `http://${urlActual}/CalQuedar/rest/User/AnadirAmigo?amigo=${amigo}`,
    {
      method: "POST",
      headers: {
        'Access-Control-Allow-origin': '*'
      }
    },
  );
}

async function eliminaAmigoFetch(amigo) {
  return fetch(
    `http://${urlActual}/CalQuedar/rest/User/EliminarAmigo?amigo=${amigo}`,
    {
      headers: {
        'Access-Control-Allow-origin': '*'
      }
    }
  );
}


let listaEventosCalendario = [];
let listaEventosProximosCalendario = [];

document.addEventListener("DOMContentLoaded", function () {
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

contenedorAmigos.addEventListener("click", function (event) {
  if (event.target.classList.contains("eliminar-amigo")) {
    const username = event.target.dataset.id;
    eliminaAmigoFetch(username).then((respuesta) => {
      if (respuesta.status == 500) {
        alert("Ha habido un problema");
      }
    });
  }
});

/* export function eliminaAmigo(amigo) {
  eliminaAmigoFetch(amigo).then((respuesta) => {
    if (respuesta.status == 500) {
      alert("Ha habido un problema");
    }
  });
} */

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

btnDropDown.addEventListener("click", function () {
  dropDownLogOut.classList.toggle("muestra");
});

crearGrupoBtn.addEventListener("click", function () {
  modalCrearGrupo.style.display = "block";
});

unirGrupoBtn.addEventListener("click", function () {
  modalAnadirGrupo.style.display = "block";
});

anadirAmigoBtn.addEventListener("click", function () {
  modalAnadirAmigo.style.display = "block";
});

window.addEventListener("click", function (event) {
  if (event.target == modalCrearGrupo) {
    modalCrearGrupo.style.display = "none";
  } else if (event.target == modalAnadirGrupo) {
    modalAnadirGrupo.style.display = "none";
  } else if (event.target == modalAnadirAmigo) {
    modalAnadirAmigo.style.display = "none";
  }
});

formAnadirAmigo.addEventListener("submit", function (event) {
  event.preventDefault();
  if (!formAnadirAmigo.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  } else {
    anadirAmigo(nombreAmigo.value).then((respuesta) => {
      if (respuesta.ok) {
        modalAnadirAmigo.style.display = "none";
      } else if (respuesta.status == 409) {
        alert("El usuario ya se encuentra en la lista de amigos");
      } else {
        alert("Ha habido un error");
      }
    });
  }
});

formAnadirGrupo.addEventListener("submit", function (event) {
  event.preventDefault();
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
