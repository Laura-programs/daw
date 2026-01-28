import {
    selectorAmigos,
    selectorGrupos,
    contenidoAmigos,
    contenidoGrupos,
    btnDropDown,
    dropDownLogOut,
  } from "../script/selectores.js";
  
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
  