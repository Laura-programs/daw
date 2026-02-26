package api;

import java.util.ArrayList;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;

import modelo.bean.EventoPersonal;
import modelo.bean.Grupo;
import modelo.bean.UsernameExisteException;
import modelo.bean.Usuario;
import modelo.dao.DaoAdmin;
import modelo.dao.DaoUsuarios;

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
		ArrayList<Usuario> listaUsuarios = new ArrayList<Usuario>();
		listaUsuarios = DaoAdmin.getInstancia().cargaUsuarios();
		if(listaUsuarios == null) {
			return Response.status(Response.Status.NOT_FOUND).entity(listaUsuarios).build();
		}else {
			return Response.status(Response.Status.OK).entity(listaUsuarios).build();
		}
	}
	
	@GET
	@Path("/Listado/UsuariosNormales")
	public Response listadoUsuariosNormales() {
		ArrayList<Usuario> listaUsuarios = null;
		listaUsuarios = DaoAdmin.getInstancia().cargaUsuariosNormales();
		if(listaUsuarios == null) {
			return Response.status(Response.Status.NOT_FOUND).entity(listaUsuarios = new ArrayList<Usuario>()).build();
		}else {
			return Response.status(Response.Status.OK).entity(listaUsuarios).build();
		}
	}
	
	@GET
	@Path("/Listado/UsuariosAdmin")
	public Response listadoUsuariosAdmin() {
		ArrayList<Usuario> listaUsuarios = null;
		listaUsuarios = DaoAdmin.getInstancia().cargaUsuariosAdmin();
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
	
	@POST
	@Path("/Registro")
	public Response registroAdmin(String adminJSON) {
		Usuario usuario = gson.fromJson(adminJSON, Usuario.class);
		try {
			DaoAdmin.getInstancia().anadirAdmin(usuario);
		} catch (UsernameExisteException exception) {
			return Response.status(Response.Status.CONFLICT).entity(exception.getMessage()).build();
		} catch (Exception exception) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(exception.getMessage()).build();
		}
		return Response.status(Response.Status.OK).entity("Registrado correctamente").build();

	}
}
