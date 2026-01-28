import {
    botonMesAntes,
    botonMesDespues,
    btnDropDown,
    dropDownLogOut,
  } from "../script/selectores.js";
  import { cargaCalendario, cambiaMes } from "../script/modulos/Calendario.js";
  
  document.addEventListener("DOMContentLoaded", cargaCalendario);
  botonMesAntes.addEventListener("click", () => cambiaMes(-1));
  botonMesDespues.addEventListener("click", () => cambiaMes(1));
  
  btnDropDown.addEventListener("click", function () {
    dropDownLogOut.classList.toggle("muestra");
  });
  