package modelo.bean;

import java.io.Serializable;
import java.util.ArrayList;

/**
 * @author Laura Mora
 * @version 1.1
 * @since 1.0
 * Objeto grupo
 */

@SuppressWarnings("serial")
public class Grupo implements Serializable{
	private String id;
	private String nombre;
	private ArrayList<Usuario> miembros;
	private Usuario admin;
	
	public Grupo() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	/**
	 * Constructor completo
	 * @param id Clave primaria creada junto con el grupo
	 * @param nombre Nombre distinguible del grupo
	 * @param miembros Usuarios que forman parte del grupo
	 * @param admin Usuario administrador del grupo
	 */
	
	public Grupo(String id, String nombre, ArrayList<Usuario> miembros, Usuario admin) {
		this.id = id;
		this.nombre = nombre;
		this.miembros = miembros;
		this.admin = admin;
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

	public Usuario getAdmin() {
		return admin;
	}

	public void setAdmin(Usuario admin) {
		this.admin = admin;
	}

	@Override
	public String toString() {
		return "Grupo [id=" + id + ", nombre=" + nombre + ", miembros=" + miembros + "]";
	}
	
	
	
	
}
