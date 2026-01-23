import { fechaCalendario, calendario, diasCalendario, primerDiaGrid, botonMesAntes, botonMesDespues, mesCalendario } from "../selectores.js";

const fechaHoy = new Date();

export function cargaCalendario() {
    const dia = fechaHoy.getDay();
    const mes = fechaHoy.getMonth();
    const anyo = fechaHoy.getFullYear();

    const primerMesFecha = new Date(anyo, mes, 1);
    const ultimoMesFecha = new Date(anyo, mes + 1, 0);

    const tituloCalendario = fechaHoy.toLocaleDateString("es-ES", {
        day: "numeric",
        month: "numeric",
        year: "numeric"
    })
    fechaCalendario.textContent = tituloCalendario;

    const mesVisitando = fechaHoy.toLocaleDateString("es-ES", {
        month: "long"
    })

    mesCalendario.textContent = mesVisitando;

    const primerDiaSemana = primerMesFecha.getDay();
    const ultiimoMesDia = ultimoMesFecha.getDate();

    primerDiaGrid.style.gridColumnStart = primerDiaSemana === 0 ? 7 : primerDiaSemana;

    for (let i = 30; i >= 28; i--) {
        const diaCalendario = diasCalendario[i];
        const dia = Number(diaCalendario.dataset.day);
        diaCalendario.classList.toggle("dia-calendario--oculto", dia > ultiimoMesDia)
    }
}

export function cambiaMes(paso) {
    const mesActual = fechaHoy.getMonth();
    fechaHoy.setMonth(mesActual + paso);
    cargaCalendario()
}