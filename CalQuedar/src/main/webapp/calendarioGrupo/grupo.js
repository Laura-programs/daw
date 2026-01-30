import {
    btnDropDown,
    dropDownLogOut,
    calendarioCentral,
    calendarioLateral
  } from "../script/selectores.js";

  document.addEventListener('DOMContentLoaded', function() {
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
  
  btnDropDown.addEventListener("click", function () {
    dropDownLogOut.classList.toggle("muestra");
  });