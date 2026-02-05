package modelo.dao;

import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import modelo.bean.Grupo;
import modelo.bean.UsernameExisteException;
import modelo.bean.Usuario;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;

/**
 * @author Laura Mora
 * @version 1.0
 * @since 1.0
 */
public class DaoUsuarios {
	private static DaoUsuarios instance;
	
	private static Connection connection = null;
	
	private static Statement statement;
	
	private static PreparedStatement preparedStatement;

	private DaoUsuarios() {
		super();
	}
	
	private synchronized static void crearInstancia() {
		if (instance == null) {
			instance = new DaoUsuarios();
		}
	}
	
	public static DaoUsuarios getInstancia() {
        crearInstancia();

        return instance;
    }
	
	/**
	 * Añade un usuario a la base de datos
	 * @param usuario
	 */
	
	public void anadirUsuario(Usuario usuario) {
		String sql = "INSERT INTO usuario values (?,?,?)";
		try {
    		preparedStatement = JdbcConnection.getConnection().prepareStatement(sql);
    	    preparedStatement.setString(1, usuario.getUsername());				        	  
    	    preparedStatement.setString(2, usuario.getNombre());
    	    preparedStatement.setString(3, usuario.getContrasenya());			        	  
    	    preparedStatement.executeUpdate();
    	    preparedStatement.close();
		} catch (SQLIntegrityConstraintViolationException e) {
			throw new UsernameExisteException("El username ya está en uso");
		} catch (SQLException e) {
			throw new RuntimeException();
		}
	}
	
	/**
	 * Busca un usuario en la base de datos
	 * @param id
	 * @param contrasenya
	 * @return
	 */
	
	public Usuario buscarUsuario(String id, String contrasenya) {
		Usuario usuario = null;
		String sql = "select * from usuario where username = ? and contrasenya = ?";
		try {
			preparedStatement = JdbcConnection.getConnection().prepareStatement(sql);
			preparedStatement.setString(1, id);
			preparedStatement.setString(2, contrasenya);
			ResultSet rs = preparedStatement.executeQuery();
			
			while(rs.next()) {
				usuario = new Usuario();
				usuario.setNombre(rs.getString("nombre"));
				usuario.setUsername(rs.getString("username"));
				usuario.setContrasenya(rs.getString("contrasenya"));
			}
			preparedStatement.close();
		}catch(SQLException e) {
			e.printStackTrace();
		}
		return usuario;
	}
	
	public Usuario buscarUsername(String username) {
		Usuario usuario = null;
		String sql = "select * from usuario where username = ?";
		try {
			preparedStatement = JdbcConnection.getConnection().prepareStatement(sql);
			preparedStatement.setString(1, username);
			ResultSet rs = preparedStatement.executeQuery();
			
			while(rs.next()) {
				usuario = new Usuario();
				usuario.setNombre(rs.getString("nombre"));
				usuario.setUsername(rs.getString("username"));
			}
			preparedStatement.close();
		}catch(SQLException e) {
			e.printStackTrace();
		}
		return usuario;
	}
	
	/**
	 * Busca los amigos de un usuario en específico
	 * @param username
	 * @return Lista de usuarios amigos
	 */
	
	public ArrayList<Usuario> cargarAmigos(String username) {
		ArrayList<Usuario> listaAmigos = new ArrayList<Usuario>();
		String sql = "SELECT * FROM usuario WHERE username IN (SELECT amigo2 from amistad where amigo1 = ?)";
		try {
			preparedStatement = JdbcConnection.getConnection().prepareStatement(sql);
			preparedStatement.setString(1, username);
			ResultSet rs = preparedStatement.executeQuery();
			
			while(rs.next()) {
				Usuario usuario = new Usuario();
				usuario.setNombre(rs.getString("nombre"));
				usuario.setUsername(rs.getString("username"));
				listaAmigos.add(usuario);
			}
			preparedStatement.close();
		}catch(SQLException e) {
			e.printStackTrace();
		}
		return listaAmigos;
		
	}
	
	public ArrayList<Grupo> cargarGrupos(String username) {
		ArrayList<Grupo> listaGrupos = new ArrayList<Grupo>();
		String sql = "SELECT grupo.id, grupo.nombre FROM grupo LEFT JOIN miembros_grupo ON miembros_grupo.grupo = grupo.id WHERE miembros_grupo.usuario = ?";
		try {
			preparedStatement = JdbcConnection.getConnection().prepareStatement(sql);
			preparedStatement.setString(1, username);
			ResultSet rs = preparedStatement.executeQuery();
			
			while(rs.next()) {
				Grupo grupo = new Grupo();
				grupo.setNombre(rs.getString("nombre"));
				grupo.setId(rs.getString("id"));
				listaGrupos.add(grupo);
			}
			preparedStatement.close();
		}catch(SQLException e) {
			e.printStackTrace();
		}
		
		return listaGrupos;
	}
	
	public void anadirAmigo(String username, String usernameAmigo) {
		String sql = "INSERT INTO amistad(amigo1, amigo2) VALUES (?, ?); INSERT INTO amistad(amigo1, amigo2) VALUES(?, ?)";
		try {
			preparedStatement = JdbcConnection.getConnection().prepareStatement(sql);
			preparedStatement.setString(1, username);
			preparedStatement.setString(2, usernameAmigo);
			preparedStatement.setString(3, usernameAmigo);
			preparedStatement.setString(4, username);
			preparedStatement.executeUpdate();
			preparedStatement.close();
		}catch(SQLException e) {
			System.out.println(preparedStatement.toString());
			throw new RuntimeException();
		}
	}
	
	/*
	 * public void crearGrupo(String nombre) { String sql =
	 * "INSERT INTO grupo VALUES(?, ?)"; try {
	 * 
	 * } }
	 */
}
