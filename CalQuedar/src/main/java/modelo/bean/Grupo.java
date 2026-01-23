package modelo.bean;

import java.io.Serializable;
import java.util.ArrayList;

/**
 * @author Laura Mora
 * @version 1.0
 * @since 1.0
 * Objeto grupo
 */

@SuppressWarnings("serial")
public class Grupo implements Serializable{
	private String id;
	private String nombre;
	private ArrayList<Usuario> miembros;
	
	public Grupo() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	/**
	 * Constructor completo
	 * @param id Clave primaria creada junto con el grupo
	 * @param nombre Nombre distinguible del grupo
	 * @param miembros Usuarios que forman parte del grupo
	 */
	
	public Grupo(String id, String nombre, ArrayList<Usuario> miembros) {
		this.id = id;
		this.nombre = nombre;
		this.miembros = miembros;
	}
	
	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public String getNombre() {
		return nombre;
	}
	
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
	public ArrayList<Usuario> getMiembros() {
		return miembros;
	}
	
	public void setMiembros(ArrayList<Usuario> miembros) {
		this.miembros = miembros;
	}

	@Override
	public String toString() {
		return "Grupo [id=" + id + ", nombre=" + nombre + ", miembros=" + miembros + "]";
	}
	
	
	
	
}
