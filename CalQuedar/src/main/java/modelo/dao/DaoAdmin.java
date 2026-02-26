package modelo.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;

import helper.utils;
import modelo.bean.Grupo;
import modelo.bean.Usuario;

public class DaoAdmin {
	
private static DaoAdmin instance;
	
	private static Connection connection = null;
	
	private static Statement statement;
	
	private static PreparedStatement preparedStatement;
	
	private DaoAdmin() {
		super();
	}
	
	private synchronized static void crearInstancia() {
		if (instance == null) {
			instance = new DaoAdmin();
		}
	}
	
	public static DaoAdmin getInstancia() {
        crearInstancia();

        return instance;
    }

	
	public int conteoEventos() {
		int conteo = -1;
		String sql = "SELECT sum(tbl.Conteo) from ( select count(*) as Conteo from evento_grupal UNION ALL select count(*) as Conteo from evento_personal )tbl;";
		try {
			preparedStatement = JdbcConnection.getConnection().prepareStatement(sql);
			ResultSet rs = preparedStatement.executeQuery();
			
			while(rs.next()) {
				conteo = rs.getInt("sum(tbl.Conteo)");
			}
			preparedStatement.close();
		}catch (SQLException e) {
			System.out.println(preparedStatement.toString());
			e.printStackTrace();
		}
		return conteo;
	}
	
	public int conteoGrupos() {
		int conteo = -1;
		String sql = "SELECT COUNT(*) AS totalGrupos FROM grupo";
		try {
			preparedStatement = JdbcConnection.getConnection().prepareStatement(sql);
			ResultSet rs = preparedStatement.executeQuery();
			
			while(rs.next()) {
				conteo = rs.getInt("totalGrupos");
			}
			preparedStatement.close();
		}catch (SQLException e) {
			System.out.println(preparedStatement.toString());
			e.printStackTrace();
		}
		return conteo;
	}
	
	public int conteoUsuarios() {
		int conteo = -1;
		String sql = "SELECT COUNT(*) AS totalUsuarios FROM usuario";
		try {
			preparedStatement = JdbcConnection.getConnection().prepareStatement(sql);
			ResultSet rs = preparedStatement.executeQuery();
			
			while(rs.next()) {
				conteo = rs.getInt("totalUsuarios");
			}
			preparedStatement.close();
		}catch (SQLException e) {
			System.out.println(preparedStatement.toString());
			e.printStackTrace();
		}
		return conteo;
	}
	
	public ArrayList<Usuario> cargaUsuarios() {
		ArrayList<Usuario> listaUsuarios = new ArrayList<Usuario>();
		String sql = "SELECT * FROM usuario";
		try {
			preparedStatement = JdbcConnection.getConnection().prepareStatement(sql);
			ResultSet rs = preparedStatement.executeQuery();
			
			while(rs.next()) {
				Usuario usuario = new Usuario();
				usuario.setNombre(rs.getString("nombre"));
				usuario.setUsername(rs.getString("username"));
				usuario.setContrasenya(rs.getString("contrasenya"));
				usuario.setAdmin(utils.intToBool(rs.getInt("administrador")));
				listaUsuarios.add(usuario);
			}
		}catch(SQLException e) {
			System.out.println(preparedStatement.toString());
			e.printStackTrace();
			listaUsuarios = null;
		}
		
		return listaUsuarios;
	}
	
	public ArrayList<Grupo> cargaGrupos() {
		ArrayList<Grupo> listaGrupos = new ArrayList<Grupo>();
		String sql = "SELECT * FROM grupo";
		try {
			preparedStatement = JdbcConnection.getConnection().prepareStatement(sql);
			ResultSet rs = preparedStatement.executeQuery();
			
			while(rs.next()) {
				Grupo grupo = new Grupo();
				grupo.setId(rs.getString("id"));
				grupo.setNombre(rs.getString("nombre"));
				grupo.setMiembros(DaoEventos.getInstancia().listaMiembrosGrupo(rs.getString("id")));
				grupo.setAdmin(DaoEventos.getInstancia().adminGrupo(rs.getString("id")));
				listaGrupos.add(grupo);
			}
		}catch(SQLException e) {
			System.out.println(preparedStatement.toString());
			e.printStackTrace();
			listaGrupos = null;
		}
		
		return listaGrupos;
	}
}
