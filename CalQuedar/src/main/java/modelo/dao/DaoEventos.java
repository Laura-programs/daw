package modelo.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;

import modelo.bean.EventoGrupal;
import modelo.bean.EventoPersonal;
import modelo.bean.Grupo;
import modelo.bean.Usuario;

public class DaoEventos {
	private static DaoEventos instance;
	
	private static Connection connection = null;
	
	private static Statement statement;
	
	private static PreparedStatement preparedStatement;
	
	private DaoEventos() {
		super();
	}
	
	private synchronized static void crearInstancia() {
		if (instance == null) {
			instance = new DaoEventos();
		}
	}
	
	public static DaoEventos getInstancia() {
        crearInstancia();

        return instance;
    }
	
	public void anadirEventoPersonal (EventoPersonal evento, String usuario) {
		String sql = "INSERT INTO evento_personal(titulo, visibilidad, etiqueta, fechaInicio, fechaFin, descripcion, creador) VALUES (?, ?, ? , ?, ?, ?, ?)";
		try {
			preparedStatement = JdbcConnection.getConnection().prepareStatement(sql);
			preparedStatement.setString(1, evento.getTitulo());
			preparedStatement.setString(2, evento.getVisibilidad());
			preparedStatement.setString(3, evento.getEtiqueta());
			preparedStatement.setString(4, evento.getFechaInicio().toString());
			if(evento.getFechaFin() != null) {
				preparedStatement.setString(5, evento.getFechaFin().toString());
			}else {
				preparedStatement.setString(5, null);
			}
			preparedStatement.setString(6, evento.getDescripcion());
			preparedStatement.setString(7, usuario);
			preparedStatement.executeUpdate();
    	    preparedStatement.close();
		} catch(SQLException e) {
			System.out.println(preparedStatement.toString());
			throw new RuntimeException();
		}
	}
	
	public ArrayList<EventoPersonal> cargarEventosPersonalesPropios(String usuario) {
		ArrayList<EventoPersonal> eventosPersonales = new ArrayList<EventoPersonal>();
		String sql = "SELECT * FROM evento_personal WHERE creador = ?";
		try {
			preparedStatement = JdbcConnection.getConnection().prepareStatement(sql);
			preparedStatement.setString(1, usuario);
			ResultSet rs = preparedStatement.executeQuery();
			
			while(rs.next()) {
				EventoPersonal evento = new EventoPersonal();
				evento.setId(rs.getInt("id"));
				evento.setTitulo(rs.getString("titulo"));
				evento.setVisibilidad(rs.getString("visibilidad"));
				evento.setEtiqueta(rs.getString("etiqueta"));
				evento.setFechaInicio(rs.getTimestamp("fechaInicio"));
				evento.setFechaFin(rs.getTimestamp("fechaFin"));
				evento.setDescripcion(rs.getString("descripcion"));
				evento.setCreador(DaoUsuarios.getInstancia().buscarUsername(rs.getString("creador")));
				eventosPersonales.add(evento);
			}
			preparedStatement.close();
		}catch (SQLException e) {
			System.out.println(preparedStatement.toString());
			e.printStackTrace();
		}
		return eventosPersonales;
	}
	
	public ArrayList<EventoPersonal> cargarEventosPersonalesPropiosProximos(String usuario) {
		ArrayList<EventoPersonal> eventosPersonales = new ArrayList<EventoPersonal>();
		String sql = "SELECT * FROM evento_personal WHERE creador = ? AND DATE(fechaInicio) > CURRENT_DATE()";
		try {
			preparedStatement = JdbcConnection.getConnection().prepareStatement(sql);
			preparedStatement.setString(1, usuario);
			ResultSet rs = preparedStatement.executeQuery();
			
			while(rs.next()) {
				EventoPersonal evento = new EventoPersonal();
				evento.setId(rs.getInt("id"));
				evento.setTitulo(rs.getString("titulo"));
				evento.setVisibilidad(rs.getString("visibilidad"));
				evento.setEtiqueta(rs.getString("etiqueta"));
				evento.setFechaInicio(rs.getTimestamp("fechaInicio"));
				evento.setFechaFin(rs.getTimestamp("fechaFin"));
				evento.setDescripcion(rs.getString("descripcion"));
				evento.setCreador(DaoUsuarios.getInstancia().buscarUsername(rs.getString("creador")));
				eventosPersonales.add(evento);
			}
			preparedStatement.close();
		}catch (SQLException e) {
			System.out.println(preparedStatement.toString());
			e.printStackTrace();
		}
		return eventosPersonales;
	}
	
	public ArrayList<EventoPersonal> cargarEventosPersonalesAjenos(String usuario) {
		ArrayList<EventoPersonal> eventosPersonales = new ArrayList<EventoPersonal>();
		String sql = "SELECT * FROM evento_personal WHERE creador = ? AND visibilidad = 'publico'";
		try {
			preparedStatement = JdbcConnection.getConnection().prepareStatement(sql);
			preparedStatement.setString(1, usuario);
			ResultSet rs = preparedStatement.executeQuery();
			
			while(rs.next()) {
				EventoPersonal evento = new EventoPersonal();
				evento.setId(rs.getInt("id"));
				evento.setTitulo(rs.getString("titulo"));
				evento.setVisibilidad(rs.getString("visibilidad"));
				evento.setEtiqueta(rs.getString("etiqueta"));
				evento.setFechaInicio(rs.getTimestamp("fechaInicio"));
				evento.setFechaFin(rs.getTimestamp("fechaFin"));
				evento.setDescripcion(rs.getString("descripcion"));
				evento.setCreador(DaoUsuarios.getInstancia().buscarUsername(rs.getString("creador")));
				eventosPersonales.add(evento);
			}
			preparedStatement.close();
		}catch (SQLException e) {
			System.out.println(preparedStatement.toString());
			e.printStackTrace();
		}
		return eventosPersonales;
	}
	
	public ArrayList<EventoPersonal> cargarEventosPersonalesAjenosProximos(String usuario) {
		ArrayList<EventoPersonal> eventosPersonales = new ArrayList<EventoPersonal>();
		String sql = "SELECT * FROM evento_personal WHERE creador = ? AND visibilidad = 'publico' AND DATE(fechaInicio) > CURRENT_DATE()";
		try {
			preparedStatement = JdbcConnection.getConnection().prepareStatement(sql);
			preparedStatement.setString(1, usuario);
			ResultSet rs = preparedStatement.executeQuery();
			
			while(rs.next()) {
				EventoPersonal evento = new EventoPersonal();
				evento.setId(rs.getInt("id"));
				evento.setTitulo(rs.getString("titulo"));
				evento.setVisibilidad(rs.getString("visibilidad"));
				evento.setEtiqueta(rs.getString("etiqueta"));
				evento.setFechaInicio(rs.getTimestamp("fechaInicio"));
				evento.setFechaFin(rs.getTimestamp("fechaFin"));
				evento.setDescripcion(rs.getString("descripcion"));
				evento.setCreador(DaoUsuarios.getInstancia().buscarUsername(rs.getString("creador")));
				eventosPersonales.add(evento);
			}
			preparedStatement.close();
		}catch (SQLException e) {
			System.out.println(preparedStatement.toString());
			e.printStackTrace();
		}
		return eventosPersonales;
	}
	
	public EventoPersonal buscarEventoPersonal(int id) {
		EventoPersonal evento = null;
		String sql = "SELECT * FROM evento_personal WHERE id = ?";
		try {
			preparedStatement = JdbcConnection.getConnection().prepareStatement(sql);
			preparedStatement.setInt(1, id);
			ResultSet rs = preparedStatement.executeQuery();
			
			while(rs.next()) {
				evento = new EventoPersonal();
				evento.setId(rs.getInt("id"));
				evento.setTitulo(rs.getString("titulo"));
				evento.setVisibilidad(rs.getString("visibilidad"));
				evento.setEtiqueta(rs.getString("etiqueta"));
				evento.setFechaInicio(rs.getTimestamp("fechaInicio"));
				evento.setFechaFin(rs.getTimestamp("fechaFin"));
				evento.setDescripcion(rs.getString("descripcion"));
				evento.setCreador(DaoUsuarios.getInstancia().buscarUsername(rs.getString("creador")));
			}
			preparedStatement.close();
		}catch (SQLException e) {
			System.out.println(preparedStatement.toString());
			e.printStackTrace();
		}
		return evento;
	}
	
	public ArrayList<Usuario> cargarParticipantes(int id) {
		ArrayList<Usuario> listaParticipantes = new ArrayList<Usuario>();
		String sql = "SELECT * FROM usuario WHERE usuario.username IN (SELECT usuario FROM participantes_evento WHERE id = ?";
		try {
			preparedStatement = JdbcConnection.getConnection().prepareStatement(sql);
			preparedStatement.setInt(1, id);
			ResultSet rs = preparedStatement.executeQuery();
			
			while(rs.next()) {
				Usuario usuario = new Usuario();
				usuario.setNombre(rs.getString("nombre"));
				usuario.setUsername(rs.getString("username"));
				listaParticipantes.add(usuario);
			}
			preparedStatement.close();
		}catch (SQLException e) {
			System.out.println(preparedStatement.toString());
			e.printStackTrace();
		}
		
		return listaParticipantes;
	}
	
	public ArrayList<String> cargarSugerencias(int id) {
		ArrayList<String> listaSugerencias = new ArrayList<String>();
		String sql = "SELECT sugerencia FROM participantes_evento WHERE id = ?";
		try {
			preparedStatement = JdbcConnection.getConnection().prepareStatement(sql);
			preparedStatement.setInt(1, id);
			ResultSet rs = preparedStatement.executeQuery();
			
			while(rs.next()) {
				listaSugerencias.add(rs.getString("sugerencia"));
			}
			preparedStatement.close();
		}catch (SQLException e) {
			System.out.println(preparedStatement.toString());
			e.printStackTrace();
		}
		
		return listaSugerencias;
	}
	
	/*
	 * public ArrayList<EventoGrupal> cargarEventosGrupales(String usuario) {
	 * ArrayList<EventoGrupal> eventosGrupales = new ArrayList<EventoGrupal>();
	 * String sql =
	 * "SELECT * FROM evento_grupal WHERE evento_grupal.id IN (SELECT id FROM participantes_evento WHERE usuario = ?)"
	 * ; try { preparedStatement =
	 * JdbcConnection.getConnection().prepareStatement(sql);
	 * preparedStatement.setString(1, usuario); ResultSet rs =
	 * preparedStatement.executeQuery();
	 * 
	 * while (rs.next()) { EventoGrupal evento = new EventoGrupal();
	 * evento.setId(rs.getInt("id")); evento.setTitulo(rs.getString("titulo"));
	 * evento.setPlanFinal(rs.getString("planFinal"));
	 * evento.setFecha(rs.getString("fecha"));
	 * evento.setGrupo(buscaGrupo(rs.getString("grupo")));
	 * evento.setSugerencias(cargarSugerencias(rs.getInt("id")));
	 * eventosGrupales.add(evento); } preparedStatement.close(); }catch(SQLException
	 * e) { System.out.println(preparedStatement.toString()); e.printStackTrace(); }
	 * return eventosGrupales; }
	 */
	
	/* Comentado puesto que no se implementa su uso y da problemas al haber movido funciones de las que dependen estos métodos
	 * 
	 * public ArrayList<EventoGrupal> cargarEventosGrupalesProximos(String usuario)
	 * { ArrayList<EventoGrupal> eventosGrupales = new ArrayList<EventoGrupal>();
	 * String sql =
	 * "SELECT * FROM evento_grupal WHERE evento_grupal.id IN (SELECT id FROM participantes_evento WHERE usuario = ? AND DATE(fecha) > CURRENT_DATE())"
	 * ; try { preparedStatement =
	 * JdbcConnection.getConnection().prepareStatement(sql);
	 * preparedStatement.setString(1, usuario); ResultSet rs =
	 * preparedStatement.executeQuery();
	 * 
	 * while (rs.next()) { EventoGrupal evento = new EventoGrupal();
	 * evento.setId(rs.getInt("id")); evento.setTitulo(rs.getString("titulo"));
	 * evento.setPlanFinal(rs.getString("planFinal"));
	 * evento.setFecha(rs.getString("fecha"));
	 * evento.setGrupo(buscaGrupo(rs.getString("grupo")));
	 * evento.setSugerencias(cargarSugerencias(rs.getInt("id")));
	 * eventosGrupales.add(evento); } preparedStatement.close(); }catch(SQLException
	 * e) { System.out.println(preparedStatement.toString()); e.printStackTrace(); }
	 * return eventosGrupales; }
	 * 
	 * public void editarEventoPersonal (EventoPersonal evento) { String sql =
	 * "UPDATE evento_personal SET titulo = ?, visibilidad = ?, etiqueta = ?, fechaInicio = ?, fechaFin = ?, descripcion = ? WHERE id = ?"
	 * ; try { preparedStatement =
	 * JdbcConnection.getConnection().prepareStatement(sql);
	 * preparedStatement.setString(1, evento.getTitulo());
	 * preparedStatement.setString(2, evento.getVisibilidad());
	 * preparedStatement.setString(3, evento.getEtiqueta());
	 * preparedStatement.setString(4, evento.getFechaInicio().toString());
	 * if(evento.getFechaFin() != null) { preparedStatement.setString(5,
	 * evento.getFechaFin().toString()); }else { preparedStatement.setString(5,
	 * null); } preparedStatement.setString(6, evento.getDescripcion());
	 * preparedStatement.setInt(7, evento.getId());
	 * preparedStatement.executeUpdate(); preparedStatement.close(); }
	 * catch(SQLException e) { System.out.println(preparedStatement.toString());
	 * throw new RuntimeException(); } }
	 */
	
	public void eliminarEventoPersonal (int idEvento) {
		String sql = "DELETE FROM evento_personal WHERE id = ?";
		try {
			preparedStatement = JdbcConnection.getConnection().prepareStatement(sql);
			preparedStatement.setInt(1, idEvento);
			preparedStatement.executeUpdate();
    	    preparedStatement.close();
		}catch(SQLException e) {
			System.out.println(preparedStatement.toString());
			throw new RuntimeException();
		}
	}
}
