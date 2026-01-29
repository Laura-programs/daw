package modelo.bean;

import java.util.ArrayList;

public class EventosRespuesta {
	private ArrayList<EventoPersonal> eventosPersonales = new ArrayList<EventoPersonal>();
	private ArrayList<EventoGrupal> eventosGrupales = new ArrayList<EventoGrupal>();
	
	public EventosRespuesta(ArrayList<EventoPersonal> eventosPersonales, ArrayList<EventoGrupal> eventosGrupales) {
		super();
		this.eventosPersonales = eventosPersonales;
		this.eventosGrupales = eventosGrupales;
	}
	
	public EventosRespuesta() {

	}

	public ArrayList<EventoPersonal> getEventosPersonales() {
		return eventosPersonales;
	}

	public void setEventosPersonales(ArrayList<EventoPersonal> eventosPersonales) {
		this.eventosPersonales = eventosPersonales;
	}

	public ArrayList<EventoGrupal> getEventosGrupales() {
		return eventosGrupales;
	}

	public void setEventosGrupales(ArrayList<EventoGrupal> eventosGrupales) {
		this.eventosGrupales = eventosGrupales;
	}
	
	
}
