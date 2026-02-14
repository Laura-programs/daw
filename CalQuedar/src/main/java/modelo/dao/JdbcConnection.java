package modelo.dao;

import java.sql.Connection;
import java.sql.DriverManager;

/**
 * Clase JdbcConnection.
 * Obtiene la conexión física a la base de datos.
 * @author Mario
 * @version 1.1
 */
public class JdbcConnection {
	//Conexión a la base de datos
	static Connection connection = null;

	/**
	 * Obtener la conexión a la base de datos.
	 * @return connection La conexión a la base de datos.
	 */
	public static Connection getConnection() {
		String db = "CALQUEDAR";
		String user = "gestor";
		String pass = "IiT19fb7khNWzU";
//		String url = "jdbc:mysql://localhost:3306/" + db;
		String url = System.getenv("JDBC_URL");
		
		try {
			//Esto es lo que importas
			// Cargar el conector de MySQL
			Class.forName("com.mysql.jdbc.Driver");
			
			// Crear conexión a la base de datos
			connection = (Connection) DriverManager.getConnection(url, user, pass);
		} catch (Exception e) {
			System.out.println(e);
		}		
		return connection;  
    }
}