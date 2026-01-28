import {
  botonMesAntes,
  botonMesDespues,
  modalCrearGrupo,
  crearGrupoBtn,
  modalAnadirGrupo,
  unirGrupoBtn,
  selectorAmigos,
  selectorGrupos,
  contenidoAmigos,
  contenidoGrupos,
  btnDropDown,
  dropDownLogOut,
} from "../script/selectores.js";
import { cargaCalendario, cambiaMes } from "../script/modulos/Calendario.js";

document.addEventListener("DOMContentLoaded", cargaCalendario);
botonMesAntes.addEventListener("click", () => cambiaMes(-1));
botonMesDespues.addEventListener("click", () => cambiaMes(1));

unirGrupoBtn.addEventListener("click", () => {
  modalAnadirGrupo.style.display = "block";
});
window.onclick = function (event) {
  if (event.target == modalAnadirGrupo) {
    modalAnadirGrupo.style.display = "none";
  }
};

crearGrupoBtn.addEventListener("click", () => {
  modalCrearGrupo.style.display = "block";
});
window.onclick = function (event) {
  if (event.target == modalCrearGrupo) {
    modalCrearGrupo.style.display = "none";
  }
};

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
