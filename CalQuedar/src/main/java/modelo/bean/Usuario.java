package modelo.bean;

import java.io.Serializable;

/**
 * @author Laura Mora
 * @version 1.1
 * @since 1.0
 * Objeto usuario
 */

@SuppressWarnings("serial")
public class Usuario implements Serializable {
	private String username;
	private String nombre;
	private String contrasenya;
	private int admin;

	public Usuario() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	/**
	 * Constructor completo
	 * @param username Clave primaria
	 * @param nombre Nombre/apodo elegido
	 * @param contrasenya Contraseña segura
	 */

	public Usuario(String username, String nombre, String contrasenya, int admin) {
		this.username = username;
		this.nombre = nombre;
		this.contrasenya = contrasenya;
		this.admin = admin;
	}
	
	public Usuario(String username, String contrasenya) {
		super();
		this.username = username;
		this.contrasenya = contrasenya;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getContrasenya() {
		return contrasenya;
	}

	public void setContrasenya(String contrasenya) {
		this.contrasenya = contrasenya;
	}

	public int getAdmin() {
		return admin;
	}

	public void setAdmin(int admin) {
		this.admin = admin;
	}

	@Override
	public String toString() {
		return "Usuario [username=" + username + ", nombre=" + nombre + ", contrasenya=" + contrasenya + ", admin="
				+ admin + "]";
	}
	
}
