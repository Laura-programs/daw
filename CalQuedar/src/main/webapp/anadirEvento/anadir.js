import { EventoPers } from "../objJS/eventoPersonal.js";
import { fechaYHoraToDateTime } from "../script/funciones.js";
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
  horaInicio,
  fechaFin,
  horaFin,
  descripcion,
} from "../script/selectores.js";

addEventListener("DOMContentLoaded", function () {});

formulario.addEventListener("submit", function (event) {
  if (!formulario.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  } else {
    event.preventDefault();
    formulario.classList.add("was-validated");
    let evento = new EventoPers(
      titulo.value,
      visibilidad.value,
      etiqueta.value,
      fechaYHoraToDateTime(fechaInicio.value, horaInicio.value),
      fechaYHoraToDateTime(fechaFin.value, horaFin.value),
      descripcion.value,
    );
    console.log(evento);
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
