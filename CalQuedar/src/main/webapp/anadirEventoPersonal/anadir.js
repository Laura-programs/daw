import { EventoPers } from "../objJS/eventoPersonal.js";
import { datePickerToBBDD } from "../script/funciones.js";
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
} from "../script/selectores.js";

async function anadirEvento(evento) {
  return fetch(
    "http://localhost:8080/CalQuedar/rest/Evento/Anadir/EventoPersonal",
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
  /* const inputFechaFinal = document.getElementById("fechaFin");
  fechaInicio.addEventListener("change", function () {
    console.log(`${fechaInicio.value}:00`);
    inputFechaFinal.min = `${fechaInicio.value}:00`;
  }); */
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
