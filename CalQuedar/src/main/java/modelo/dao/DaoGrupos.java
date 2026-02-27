package modelo.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.sql.Statement;
import java.util.ArrayList;

import modelo.bean.Grupo;
import modelo.bean.IDGrupoExisteException;
import modelo.bean.Usuario;

public class DaoGrupos {
private static DaoGrupos instance;
	
	private static Connection connection = null;
	
	private static Statement statement;
	
	private static PreparedStatement preparedStatement;
	
	private DaoGrupos() {
		super();
	}
	
	private synchronized static void crearInstancia() {
		if (instance == null) {
			instance = new DaoGrupos();
		}
	}
	
	public static DaoGrupos getInstancia() {
        crearInstancia();

        return instance;
 	}
	
	public void crearGrupo(String idGrupo, String nombre) {
		String sql = "INSERT INTO grupo VALUES(?, ?)";
		try {
			preparedStatement = JdbcConnection.getConnection().prepareStatement(sql);
			preparedStatement.setString(1, idGrupo);
			preparedStatement.setString(2, nombre);
			preparedStatement.executeUpdate();
			preparedStatement.close();
		} catch(SQLIntegrityConstraintViolationException e) {
			throw new IDGrupoExisteException("El ID ya está en uso");
		}catch (SQLException e) {
			e.printStackTrace();
			System.out.println(preparedStatement);
			throw new RuntimeException();
		}
	}
	
	public boolean buscarIDGrupoRepetido(String id) {
		String sql = "SELECT * FROM grupo WHERE id = ?";
		try {
			preparedStatement = JdbcConnection.getConnection().prepareStatement(sql);
			preparedStatement.setString(1, id);
			ResultSet rs = preparedStatement.executeQuery();
			return rs.next();
		} catch(SQLException e) {
			e.printStackTrace();
			System.out.println(preparedStatement);
			return true;
		}
	}
	
	public void anadirAdmin(String username, String idGrupo) {
		String sql = "INSERT INTO miembros_grupo VALUES (?, ?, 1)";
		try {
			preparedStatement = JdbcConnection.getConnection().prepareStatement(sql);
			preparedStatement.setString(1, username);
			preparedStatement.setString(2, idGrupo);
			preparedStatement.executeUpdate();
			preparedStatement.close();
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println(preparedStatement);
		}
	}
	
	public void anadirMiembroGrupo(String username, String idGrupo) {
		String sql = "INSERT INTO miembros_grupo VALUES (?, ?, 0)";
		try {
			preparedStatement = JdbcConnection.getConnection().prepareStatement(sql);
			preparedStatement.setString(1, username);
			preparedStatement.setString(2, idGrupo);
			preparedStatement.executeUpdate();
			preparedStatement.close();
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println(preparedStatement);
		}
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
	
	public Grupo buscaGrupo(String id) {
		Grupo grupo = null;
		String sql = "SELECT * FROM grupo WHERE id = ?";
		try {
			preparedStatement = JdbcConnection.getConnection().prepareStatement(sql);
			preparedStatement.setString(1, id);
			ResultSet rs = preparedStatement.executeQuery();
			
			while(rs.next()) {
				grupo = new Grupo();
				grupo.setId(rs.getString("id"));
				grupo.setMiembros(listaMiembrosGrupo(rs.getString("id")));
				grupo.setNombre(rs.getString("nombre"));
				grupo.setAdmin(adminGrupo());
			}
			preparedStatement.close();
		}catch(SQLException e) {
			System.out.println(preparedStatement.toString());
			e.printStackTrace();
		}
		return grupo;
	}
	
	public ArrayList<Usuario> listaMiembrosGrupo (String idGrupo) {
		ArrayList<Usuario> listaMiembros = new ArrayList<Usuario>();
		String sql = "SELECT * FROM usuario WHERE username IN (SELECT usuario FROM miembros_grupo WHERE grupo = ?)";
		try {
			preparedStatement = JdbcConnection.getConnection().prepareStatement(sql);
			preparedStatement.setString(1, idGrupo);
			ResultSet rs = preparedStatement.executeQuery();
			
			while(rs.next()) {
				Usuario usuario = new Usuario();
				usuario.setNombre(rs.getString("nombre"));
				usuario.setUsername(rs.getString("username"));
				listaMiembros.add(usuario);
			}
			preparedStatement.close();
		}catch(SQLException e) {
			System.out.println(preparedStatement.toString());
			e.printStackTrace();
		}
		return listaMiembros;
	}
	
	public Usuario adminGrupo (String idGrupo) {
		Usuario usuario = null;
		String sql = "SELECT * FROM usuario WHERE username IN (SELECT usuario FROM miembro_grupo WHERE grupo = ? AND administrador = 1)";
		try {
			preparedStatement = JdbcConnection.getConnection().prepareStatement(sql);
			preparedStatement.setString(1, idGrupo);
			ResultSet rs = preparedStatement.executeQuery();
			
			while(rs.next()) {
				usuario = new Usuario();
				usuario.setNombre(rs.getString("nombre"));
				usuario.setUsername(rs.getString("username"));
			}
			preparedStatement.close();
		}catch(SQLException e) {
			System.out.println(preparedStatement.toString());
			e.printStackTrace();
		}
		return usuario;
				
	}
}
