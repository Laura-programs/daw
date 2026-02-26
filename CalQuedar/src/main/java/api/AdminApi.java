package api;

import java.util.ArrayList;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;

import modelo.bean.EventoPersonal;
import modelo.bean.Grupo;
import modelo.bean.Usuario;
import modelo.dao.DaoAdmin;

@Path("/Admin")
public class AdminApi {
	
	Gson gson = new Gson();
	
	@GET
	@Path("/Conteo/Usuarios")
	public Response conteoUsuarios() {
		int totalUsuarios = 0;
		totalUsuarios = DaoAdmin.getInstancia().conteoUsuarios();
		if(totalUsuarios == -1) {
			return Response.status(Response.Status.NOT_FOUND).entity(totalUsuarios).build();
		}else {
			return Response.status(Response.Status.OK).entity(totalUsuarios).build();
		}
	}
	
	@GET
	@Path("/Conteo/Grupos")
	public Response conteoGrupos() {
		int totalGrupos = 0;
		totalGrupos = DaoAdmin.getInstancia().conteoGrupos();
		if(totalGrupos == -1) {
			return Response.status(Response.Status.NOT_FOUND).entity(totalGrupos).build();
		}else {
			return Response.status(Response.Status.OK).entity(totalGrupos).build();
		}
	}
	
	@GET
	@Path("/Conteo/Eventos")
	public Response conteoEventos() {
		int totalEventos = 0;
		totalEventos = DaoAdmin.getInstancia().conteoEventos();
		if(totalEventos == -1) {
			return Response.status(Response.Status.NOT_FOUND).entity(totalEventos).build();
		}else {
			return Response.status(Response.Status.OK).entity(totalEventos).build();
		}
	}
	
	@GET
	@Path("/Listado/Usuarios")
	public Response listadoUsuarios() {
		ArrayList<Usuario> listaUsuarios = null;
		listaUsuarios = DaoAdmin.getInstancia().cargaUsuarios();
		if(listaUsuarios == null) {
			return Response.status(Response.Status.NOT_FOUND).entity(listaUsuarios = new ArrayList<Usuario>()).build();
		}else {
			return Response.status(Response.Status.OK).entity(listaUsuarios).build();
		}
	}
	
	@GET
	@Path("/Listado/Grupos")
	public Response listadoGrupos() {
		ArrayList<Grupo> listaGrupos = null;
		listaGrupos = DaoAdmin.getInstancia().cargaGrupos();
		if(listaGrupos == null) {
			return Response.status(Response.Status.NOT_FOUND).entity(listaGrupos = new ArrayList<Grupo>()).build();
		}else {
			return Response.status(Response.Status.OK).entity(listaGrupos).build();
		}
	}
}
