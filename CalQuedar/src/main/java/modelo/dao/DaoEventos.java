package modelo.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import modelo.bean.EventoPersonal;

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
	
	
}
