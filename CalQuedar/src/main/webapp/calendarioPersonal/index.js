async function comprobarUsuarioIniciado() {
  return fetch("http://localhost:8080/CalQuedar/rest/User/CompruebaSesion", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "username" : sessionStorage.getItem("username")
    },
  });
}

document.addEventListener('DOMContentLoaded', function() {
  comprobarUsuarioIniciado()
  .then((respuesta) => {
    if(respuesta.status == 403) {
      console.log("El usuario no tiene permisos");
      window.location.replace("/CalQuedar/Login");
    } else if (respuesta.status != 200) {
      console.log("Ha habido un error");
      window.location.replace("/CalQuedar/Login");
    }
  })
  const calendarioCentral = document.getElementById('calendar')
  const calendarioLateral = document.getElementById('proximos-eventos')
  const mainCalendar = new FullCalendar.Calendar(calendarioCentral, {
    locale: 'es',
    initialView: 'dayGridMonth',
    headerToolbar: {
      start: 'prev next',
      center: 'title',
      end: 'today'
    },
    titleFormat: {
      year: 'numeric',
      month: 'long',
    },
    firstDay: 1,
    themeSystem: 'bootstrap5',
    fixedWeekCount: false,
    columnFormat : 'dddd',
    events: [
      {
        id : '1',
        title  : 'event1',
        start  : '2026-01-01'
      },
      {
        title  : 'event2',
        start  : '2026-01-05T12:30:00',
        end    : '2026-01-07T12:30:00',
        allDay : false,
        classNames : ['viaje', 'evento']
      },
      {
        title  : 'event3',
        start  : '2026-01-09T12:30:00',
        allDay : false // will make the time show
      }
    ]
  });
  const sideCalendar = new FullCalendar.Calendar(calendarioLateral, {
    locale: 'es',
    initialView: 'listYear',
    headerToolbar: {
      start: '',
      center: '',
      end: ''
    },

    events: [
      {
        id : '1',
        title  : 'event1',
        start  : '2026-01-01'
      },
      {
        title  : 'event2',
        start  : '2026-01-05',
        end    : '2026-01-07',
        classNames : ['viaje', 'evento']
      },
      {
        title  : 'event3',
        start  : '2026-01-09T12:30:00',
        allDay : false // will make the time show
      }
    ],
    height : 'auto',
    header : false
  });
  mainCalendar.render();
  sideCalendar.render();


});