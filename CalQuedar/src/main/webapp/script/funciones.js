import { EventoCalendarioDTO } from "../objJS/DTO/eventoCalendarioDTO.js";

export function validarUsername(username) {
  const patron = /^[a-zA-Z0-9_]{6,36}$/;
  return patron.test(username);
}

export function validarContrasenya(contrasenya) {
  const patron =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return patron.test(contrasenya);
}

export function contrasenyaIgual(contrasenyaOriginal, contrasenyaRepetida) {
  if (contrasenyaOriginal === contrasenyaRepetida) {
    return true;
  } else {
    return false;
  }
}

export function soloLetras(texto) {
  const patron = /^[A-Za-záéíóúÁÉÍÓÚñÑ]+(?: [A-Za-záéíóúÁÉÍÓÚñÑ]+)*$/;
  return patron.test(texto);
}

export function BBDDtoDateToISO(fecha) {
  if (fecha == null) {
    return fecha;
  } else {
    return new Date(fecha.slice(0, -5)).toISOString().slice(0, -5);
  }
}

export function datePickerToBBDD(fecha) {
  if (fecha == null) {
    return fecha;
  } else {
    return `${fecha}:00Z[UTC]`;
  }
}

export function BBDDToDatePicker(fecha) {
  if (fecha == null) {
    return "";
  } else {
    return fecha.slice(0, -9);
  }
}

function ColorLuminance(hex) {
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, "");
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  lum = 0.5;

  // convert to decimal and change luminosity
  var rgb = "#",
    c,
    i;
  for (i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ("00" + c).substr(c.length);
  }

  return rgb;
}

function getContrastYIQ(hexcolor) {
  var r = parseInt(hexcolor.substr(0, 2), 16);
  var g = parseInt(hexcolor.substr(2, 2), 16);
  var b = parseInt(hexcolor.substr(4, 2), 16);
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "black" : "white";
}

const hex = {
  0: "0",
  1: "1",
  2: "2",
  3: "3",
  4: "4",
  5: "5",
  6: "6",
  7: "6",
  8: "8",
  9: "9",
  10: "A",
  11: "B",
  12: "C",
  13: "D",
  14: "E",
  15: "F",
};

function rgbToHex(rgb) {
  let rgbColor = rgb.split(", ");
  let hexResult = "#";
  let values = Object.values(hex);

  rgbColor.forEach((element) => {
    console.log(element);
    if (values.includes(element)) {
      console.log(element);
      hexResult += element + element;
    } else {
      let number = Number(element) / 16;
      console.log(number);
      let firstDig = String(number).slice(0, 2).replace(".", "");
      console.log(firstDig);
      let secondDig = String((number - Number(firstDig)) * 16);
      console.log(secondDig);
      hexResult += hex[firstDig];
      hexResult += hex[secondDig];
    }
  });

  return hexResult;
}

export function switchBackgroundColor(filtro) {
  let colorFondo;
  switch (filtro) {
    case "viaje":
      colorFondo = "#FEF8A3";
      break;
    case "dia-libre":
      colorFondo = "#FFD580";
      break;
    case "cita":
      colorFondo = "#F7A7AC";
      break;
    case "plan-grupo":
      colorFondo = "#FBBBD6";
      break;
    case "misc":
      colorFondo = "#CAA2F8";
      break;
    case "medico":
      colorFondo = "#A8E7F1";
      break;
    case "selfcare":
      colorFondo = "#CFF192";
      break;
  }

  return colorFondo;
}

export function switchBorderColor(filtro) {
  let colorBorde;
  switch (filtro) {
    case "viaje":
      colorBorde = "#FDF148";
      break;
    case "dia-libre":
      colorBorde = "#FFAB00";
      break;
    case "cita":
      colorBorde = "#F04F5A";
      break;
    case "plan-grupo":
      colorBorde = "#F777AE";
      break;
    case "misc":
      colorBorde = "#9646f2";
      break;
    case "medico":
      colorBorde = "#52D0E3";
      break;
    case "selfcare":
      colorBorde = "#A0E426";
      break;
  }

  return colorBorde;
}

export function procesarEventosSet(eventosRespuesta) {
  let listaEventos = [];
  let { eventosPersonales, eventosGrupales } = eventosRespuesta;

  eventosPersonales.forEach((eventoPersonal) => {
    let evento = new EventoCalendarioDTO(
      eventoPersonal.id,
      BBDDtoDateToISO(eventoPersonal.fechaInicio),
      BBDDtoDateToISO(eventoPersonal.fechaFin),
      eventoPersonal.titulo,
      `/CalQuedar/RUDEventoPersonalServlet?id=${eventoPersonal.id}`,
      false,
      switchBackgroundColor(eventoPersonal.etiqueta),
      switchBorderColor(eventoPersonal.etiqueta),
      "black",
    );
    listaEventos.push(evento);
  });

  eventosGrupales.forEach((eventoGrupal) => {
    let evento = new EventoCalendarioDTO(
      eventoGrupal.id,
      BBDDtoDateToISO(eventoGrupal.fechaInicio),
      "",
      eventoGrupal.titulo,
      "",
      true,
      ColorLuminance(eventoGrupal.grupo),
      `#${eventoGrupal.grupo}`,
      getContrastYIQ(rgbToHex(ColorLuminance(eventoGrupal.grupo))),
    );
    listaEventos.push(evento);
  });

  return listaEventos;
}

export function procesarEventosAjenos(eventosRespuesta) {
  let listaEventos = [];
  eventosRespuesta.forEach((eventoFetch) => {
    let evento = new EventoCalendarioDTO(
      eventoFetch.id,
      BBDDtoDateToISO(eventoFetch.fechaInicio),
      BBDDtoDateToISO(eventoFetch.fechaFin),
      eventoFetch.titulo,
      "",
      false,
      switchBackgroundColor(eventoFetch.etiqueta),
      switchBorderColor(eventoFetch.etiqueta),
      "black",
    );
    listaEventos.push(evento);
  });

  return listaEventos;
}

export function validarNif(dni) {
  const letras = "TRWAGMYFPDXBNJZSQVHLCKE";

  if (!/^[A-Z0-9]{9}$/.test(dni)) {
    return false;
  }

  if (/^[0-9]{8}[A-Z]$/.test(dni)) {
    const numero = parseInt(dni.slice(0, 8), 10);
    const letra = dni[8];
    return letra === letras[numero % 23];
  }
}

export function nombreValido(texto) {
    const patron = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+(?:\s+[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ]+){1,5}(?<!\s)$/;
    return patron.test(texto);
}