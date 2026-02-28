import { procesarDiasLibres } from "../script/funciones.js";
import {
  btnDropDown,
  dropDownLogOut,
  calendarioCentral,
  calendarioLateral,
  nombreGrupoHeader,
  listaMiembros,
  codigoGrupo,
  eliminarGrupoBtn,
  abandonarGrupoBtn,
} from "../script/selectores.js";

const urlActual = new URL(window.location.href).host;

async function cargarInfoGrupo(grupo) {
  return fetch(
    `http://${urlActual}/CalQuedar/rest/Grupo/CargarInfo?grupo=${grupo}`,
    {
      headers: {
        "Access-Control-Allow-origin": "*",
      },
    },
  );
}

async function cargarEventos(idGrupo) {
  return fetch(
    `http://${urlActual}/CalQuedar/rest/Evento/Cargar/DiasLibres?grupo=${idGrupo}`,
    {
      headers: {
        "Access-Control-Allow-origin": "*",
      },
    },
  );
}

async function cargarEventosProximos(idGrupo) {
  return fetch(
    `http://${urlActual}/CalQuedar/rest/Evento/Cargar/DiasLibresProximos?grupo=${idGrupo}`,
    {
      headers: {
        "Access-Control-Allow-origin": "*",
      },
    },
  );
}

async function eliminarGrupo(idGrupo) {
  return fetch(
    `http://${urlActual}/CalQuedar/rest/Grupo/Eliminar?grupo=${idGrupo}`,
    {
      headers: {
        "Access-Control-Allow-origin": "*",
      },
    },
  );
}

async function abandonarGrupo(idGrupo) {
  return fetch(
    `http://${urlActual}/CalQuedar/rest/Grupo/Abandonar?grupo=${idGrupo}`,
    {
      headers: {
        "Access-Control-Allow-origin": "*",
      },
    },
  );
}

let listaEventosCalendario = [];
let listaEventosProximosCalendario = [];
let grupoVisitando;

document.addEventListener("DOMContentLoaded", function () {
  let params = new URLSearchParams(document.location.search);
  let grupoVisita = params.get("grupo");
  let userLogin = sessionStorage.getItem("username");
  codigoGrupo.innerText = grupoVisita;
  grupoVisitando = grupoVisita;

  cargarInfoGrupo(grupoVisita)
    .then((datos) => datos.json())
    .then((grupo) => {
      nombreGrupoHeader.innerText = grupo.nombre;
      gestionPermisos(grupo.miembros, grupo.admin, userLogin);
    });

  cargarEventos(grupoVisita)
      .then((listaEventos) => listaEventos.json())
      .then((datos) => {
        listaEventosCalendario = procesarDiasLibres(datos);
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
  
    cargarEventosProximos(grupoVisita)
      .then((listaEventos) => listaEventos.json())
      .then((datos) => {
        listaEventosProximosCalendario = procesarDiasLibres(datos);
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

eliminarGrupoBtn.addEventListener("click", function() {
  eliminarGrupo(grupoVisitando)
  .then((respuesta) => {
    if(respuesta.ok) {
      window.location.replace("/CalQuedar/UserCalendarServlet");
    } else {
      alert("Ha habido un error")
    }
  })
})

abandonarGrupoBtn.addEventListener("click", function() {
  abandonarGrupo(grupoVisitando)
  .then((respuesta) => {
    if(respuesta.ok) {
      window.location.replace("/CalQuedar/UserCalendarServlet");
    } else {
      alert("Ha habido un error")
    }
  })
})

btnDropDown.addEventListener("click", function () {
  dropDownLogOut.classList.toggle("muestra");
});

function gestionPermisos(miembros, admin, logueado) {
  if(logueado != admin.username) {
    eliminarGrupoBtn.setAttribute("hidden", true);
    pintarMiembros(miembros, admin);
  } else {
    pintarMiembrosAdmin(miembros, admin);
  }
}

function pintarMiembros(miembros, admin) {
  miembros.forEach((miembro) => {
    if (miembro.username == admin.username) {
      let divMiembro = document.createElement("div");
      divMiembro.innerHTML = `<div
              aria-roledescription="Información miembro"
              class="info-miembro"
            >
              <i class="bi bi-emoji-sunglasses"></i>
              <a
                href="#"
                >${miembro.nombre}</a
              >
            </div>`;
      divMiembro.classList.add("miembro");
      divMiembro.classList.add("admin");
      listaMiembros.appendChild(divMiembro);
    } else {
      let divMiembro = document.createElement("div");
      divMiembro.innerHTML = `<div
              aria-roledescription="Información miembro"
              class="info-miembro"
            >
              <i class="bi bi-emoji-wink"></i>
              <a
                href="#"
                >${miembro.nombre}</a
              >
            </div>`;
            divMiembro.classList.add("miembro");
      divMiembro.classList.add("non-role");
      listaMiembros.appendChild(divMiembro);
    }
  });
}

function pintarMiembrosAdmin(miembros, admin) {
  miembros.forEach((miembro) => {
    if (miembro.username == admin.username) {
      let divMiembro = document.createElement("div");
      divMiembro.innerHTML = `<div
              aria-roledescription="Información miembro"
              class="info-miembro"
            >
              <i class="bi bi-emoji-sunglasses"></i>
              <a
                href="#"
                >${miembro.nombre}</a
              >
            </div>
            <button class="eliminar-amigo">
              <i class="bi bi-person-x"></i>
            </button>`;
      divMiembro.classList.add("miembro");
      divMiembro.classList.add("admin");
      listaMiembros.appendChild(divMiembro);
    } else {
      let divMiembro = document.createElement("div");
      divMiembro.innerHTML = `<div
              aria-roledescription="Información miembro"
              class="info-miembro"
            >
              <i class="bi bi-emoji-wink"></i>
              <a
                href="#"
                >${miembro.nombre}</a
              >
            </div>
            <button class="eliminar-amigo">
              <i class="bi bi-person-x"></i>
            </button>`;
            divMiembro.classList.add("miembro");
      divMiembro.classList.add("non-role");
      listaMiembros.appendChild(divMiembro);
    }
  });
}