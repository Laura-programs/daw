package modelo.bean;

import java.io.Serializable;
import java.sql.Timestamp;
import java.time.LocalDateTime;


/**
 * @author Laura Mora
 * @version 1.1
 * @since 1.0
 * Objeto Evento personal
 */
@SuppressWarnings("serial")
public class EventoPersonal implements Serializable{
	private int id;
	private String titulo;
	private String visibilidad;
	private String etiqueta;
	private Timestamp fechaInicio;
	private Timestamp fechaFin;
	private String descripcion;
	private Usuario creador;
	public EventoPersonal() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	/**
	 * Constructor completo
	 * @param id Clave primaria
	 * @param titulo Identificativo
	 * @param visibilidad Privacidad
	 * @param etiqueta Clasificatorio
	 * @param fechaInicio Fecha de inicio, hora opcional
	 * @param fechaFin Fecha final, opcional
	 * @param descripcion Descripción del evento
	 * @param creador Usuario
	 */
	public EventoPersonal(int id, String titulo, String visibilidad, String etiqueta, Timestamp fechaInicio,
			Timestamp fechaFin, String descripcion, Usuario creador) {
		super();
		this.id = id;
		this.titulo = titulo;
		this.visibilidad = visibilidad;
		this.etiqueta = etiqueta;
		this.fechaInicio = fechaInicio;
		this.fechaFin = fechaFin;
		this.descripcion = descripcion;
		this.creador = creador;
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
	public String getVisibilidad() {
		return visibilidad;
	}
	public void setVisibilidad(String visibilidad) {
		this.visibilidad = visibilidad;
	}
	public String getEtiqueta() {
		return etiqueta;
	}
	public void setEtiqueta(String etiqueta) {
		this.etiqueta = etiqueta;
	}
	public Timestamp getFechaInicio() {
		return fechaInicio;
	}
	public void setFechaInicio(Timestamp fechaInicio) {
		this.fechaInicio = fechaInicio;
	}
	public Timestamp getFechaFin() {
		return fechaFin;
	}
	public void setFechaFin(Timestamp fechaFin) {
		this.fechaFin = fechaFin;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public Usuario getCreador() {
		return creador;
	}
	public void setCreador(Usuario creador) {
		this.creador = creador;
	}
	@Override
	public String toString() {
		return "EventoPersonal [id=" + id + ", titulo=" + titulo + ", visibilidad=" + visibilidad + ", etiqueta="
				+ etiqueta + ", fechaInicio=" + fechaInicio + ", fechaFin=" + fechaFin + ", descripcion=" + descripcion
				+ ", creador=" + creador + "]";
	}
	
	
}
