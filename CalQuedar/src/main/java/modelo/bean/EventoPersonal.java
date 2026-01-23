package modelo.bean;

import java.io.Serializable;
import java.sql.Timestamp;


/**
 * @author Laura Mora
 * @version 1.0
 * @since 1.0
 * Objeto Evento personal
 */
@SuppressWarnings("serial")
public class EventoPersonal implements Serializable{
	private int id;
	private String titulo;
	private String visibilidad;
	private String etiqueta;
	private Timestamp fecha;
	private String descripcion;
	private Usuario creador;
	public EventoPersonal() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	/**
	 * Constructor con todo
	 * @param id Clave primaria autoincremental
	 * @param titulo Título del evento
	 * @param visibilidad Si el evento es visible por otros usuarios o no
	 * @param etiqueta Clasificación del evento
	 * @param fecha Fecha del evento
	 * @param descripcion Descripción del evento
	 * @param creador Usuario que lo ha creado
	 */
	public EventoPersonal(int id, String titulo, String visibilidad, String etiqueta, Timestamp fecha,
			String descripcion, Usuario creador) {
		super();
		this.id = id;
		this.titulo = titulo;
		this.visibilidad = visibilidad;
		this.etiqueta = etiqueta;
		this.fecha = fecha;
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
	public Timestamp getFecha() {
		return fecha;
	}
	public void setFecha(Timestamp fecha) {
		this.fecha = fecha;
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
				+ etiqueta + ", fecha=" + fecha + ", descripcion=" + descripcion + ", creador=" + creador + "]";
	}
	
	
}
