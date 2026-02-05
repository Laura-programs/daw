import { EventoUpdateDTO } from "../objJS/DTO/eventoUpdateDTO.js";
import { BBDDToDatePicker, datePickerToBBDD } from "../script/funciones.js";
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

async function buscaEvento(idEvento) {
  return fetch(
    `http://localhost:8080/CalQuedar/rest/Evento/Buscar/EventoPersonal?id=${idEvento}`,
  );
}

async function eliminaEvento(idEvento) {
  return await fetch(
    `http://localhost:8080/CalQuedar/rest/Evento/Eliminar/EventoPersonal?id=${idEvento}`,
  );
}

async function actualizaEvento(evento) {
  return await fetch(
    "http://localhost:8080/CalQuedar/rest/Evento/Actualizar/EventoPersonal",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(evento),
    },
  );
}

addEventListener("DOMContentLoaded", function () {
  let params = new URLSearchParams(document.location.search);
  let idEvento = params.get("id");
  buscaEvento(idEvento)
    .then((respuesta) => respuesta.json())
    .then((evento) => cargarEvento(evento));
});

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
