import { EventoCalendarioDTO } from "../objJS/DTO/eventoCalendarioDTO.js";


export function validarUsername(username) {
    const patron = /^[a-zA-Z0-9_]{6,36}$/;
    return patron.test(username);
}

export function validarContrasenya(contrasenya) {
    const patron = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return patron.test(contrasenya);
}

export function contrasenyaIgual(contrasenyaOriginal, contrasenyaRepetida) {
        if(contrasenyaOriginal === contrasenyaRepetida) {
            return true;
        }else {
            return false;
        }
    }

export function soloLetras(texto) {
    const patron = /^[A-Za-záéíóúÁÉÍÓÚñÑ]+(?: [A-Za-záéíóúÁÉÍÓÚñÑ]+)*$/;
    return patron.test(texto);
}

export function BBDDtoDateToISO(fecha) {
    if(fecha == null) {
        return fecha;
    } else {
        return new Date(fecha.slice(0, -5)).toISOString().slice(0, -5);
    }
}

export function datePickerToBBDD(fecha) {
    if(fecha == null) {
        return fecha;
    }else {
        return `${fecha}:00Z[UTC]`;
    }
}

export function BBDDToDatePicker(fecha) {
    if(fecha == null) {
        return "";
    } else {
        return fecha.slice(0, -9);
    }
}

export function switchBackgroundColor(filtro) {
    let colorFondo;
    switch(filtro) {
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
    switch(filtro) {
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

export function procesarEventos(eventosRespuesta) {
    let listaEventos = [];
    let {
        eventosPersonales,
        eventosGrupales
    } = eventosRespuesta;

    eventosPersonales.forEach(eventoPersonal => {
        let evento = new EventoCalendarioDTO (
            eventoPersonal.id,
            BBDDtoDateToISO(eventoPersonal.fechaInicio),
            BBDDtoDateToISO(eventoPersonal.fechaFin),
            eventoPersonal.titulo,
            `/CalQuedar/RUDEventoPersonalServlet?id=${eventoPersonal.id}`,
            false,
            switchBackgroundColor(eventoPersonal.etiqueta),
            switchBorderColor(eventoPersonal.etiqueta)
        )
        listaEventos.push(evento)
    });

    return listaEventos;
}

