package modelo.bean;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.ArrayList;



/**
 * @author Laura Mora
 * @version 1.0
 * @since 1.0
 * Objeto Evento grupal
 */
@SuppressWarnings("serial")
public class EventoGrupal implements Serializable{
	private int id;
	private String titulo;
	private String planFinal;
	private String fecha;
	private Grupo grupo;
	private ArrayList<Usuario> participantes;
	private ArrayList<String> sugerencias;
	
	public EventoGrupal() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	/**
	 * Constructor completo
	 * @param id Clave primaria autoincremental del event
	 * @param titulo Identificativo
	 * @param planFinal Plan elegido
	 * @param fecha Fecha del evento
	 * @param grupo  Grupo al que pertenece el evento
	 * @param participantes Lista de usuarios que participan en el evento
	 * @param sugerencias Lista de las sugerencias de los participantes
	 */

	public EventoGrupal(int id, String titulo, String planFinal, String fecha, Grupo grupo, ArrayList<Usuario> participantes,
			ArrayList<String> sugerencias) {
		this.id = id;
		this.titulo = titulo;
		this.planFinal = planFinal;
		this.fecha = fecha;
		this.grupo = grupo;
		this.participantes = participantes;
		this.sugerencias = sugerencias;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getPlanFinal() {
		return planFinal;
	}

	public void setPlanFinal(String planFinal) {
		this.planFinal = planFinal;
	}

	public String getFecha() {
		return fecha;
	}

	public void setFecha(String fecha) {
		this.fecha = fecha;
	}

	public Grupo getGrupo() {
		return grupo;
	}

	public void setGrupo(Grupo grupo) {
		this.grupo = grupo;
	}

	public ArrayList<Usuario> getParticipantes() {
		return participantes;
	}

	public void setParticipantes(ArrayList<Usuario> participantes) {
		this.participantes = participantes;
	}

	public ArrayList<String> getSugerencias() {
		return sugerencias;
	}

	public void setSugerencias(ArrayList<String> sugerencias) {
		this.sugerencias = sugerencias;
	}

	@Override
	public String toString() {
		return "EventoGrupal [id=" + id + ", planFinal=" + planFinal + ", fecha=" + fecha + ", grupo=" + grupo
				+ ", participantes=" + participantes + ", sugerencias=" + sugerencias + "]";
	}
	
	
	
}
