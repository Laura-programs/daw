package api;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;

import helper.utils;
import modelo.bean.EventoPersonal;
import modelo.bean.EventosRespuesta;
import modelo.bean.Grupo;
import modelo.dao.DaoGrupos;

@Path("/Grupo")
public class GrupoApi {
	Gson gson = new Gson();

	@POST
	@Path("/Unirse")
	public Response unirAGrupo(@Context HttpServletRequest peticion, @QueryParam("grupo") String idGrupo) {
		try {
			DaoGrupos.getInstancia().anadirMiembroGrupo((String) peticion.getSession(true).getAttribute("username"),
					idGrupo);
		} catch (Exception exception) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(exception.getMessage()).build();
		}
		return Response.status(Response.Status.OK).entity("Miembro añadido").build();
	}
	
	@POST
	@Path("/Crear")
	public Response crearGrupo(@QueryParam("grupo") String nombreGrupo, @Context HttpServletRequest peticion) {
		boolean idExiste;
		String idGrupo;
		do {
			idGrupo = utils.colorAleatorio();
			idExiste = DaoGrupos.getInstancia().buscarIDGrupoRepetido(idGrupo);
		} while(idExiste);
		System.out.println(idGrupo);
		try {
			DaoGrupos.getInstancia().crearGrupo(idGrupo, nombreGrupo);
			DaoGrupos.getInstancia().anadirAdmin((String) peticion.getSession(true).getAttribute("username"), idGrupo);
		} catch (Exception e) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
		}
		return Response.status(Response.Status.OK).entity("Grupo creado").build();
	}
	
	@GET
	@Path("/CargarListado") 
	public Response cargarListadoGrupos(@Context HttpServletRequest peticion) {
		ArrayList<Grupo> listadoGrupos = null;
		listadoGrupos = DaoGrupos.getInstancia().cargarGrupos((String) peticion.getSession(true).getAttribute("username"));
		if(listadoGrupos.isEmpty() || listadoGrupos == null) {
			return Response.status(Response.Status.NOT_FOUND).entity(new EventosRespuesta()).build();
		}else {
			return Response.status(Response.Status.OK).entity(listadoGrupos).build();
		}
	}
	
	@GET
	@Path("/CargarInfo")
	public Response cargarInfoGrupo(@QueryParam("grupo") String idGrupo) {
		Grupo grupo = null;
		grupo = DaoGrupos.getInstancia().buscaGrupo(idGrupo);
		if(grupo == null) {
			return Response.status(Response.Status.NOT_FOUND).entity("Grupo no encontrado").build();
		} else {
			return Response.status(Response.Status.OK).entity(grupo).build();
		}
	}
	
	@GET
	@Path("/Eliminar")
	public Response eliminarGrupo(@QueryParam ("grupo") String idGrupo) {
		try {
			DaoGrupos.getInstancia().eliminarGrupo(idGrupo);
		}catch(Exception e) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
		}
		return Response.status(Response.Status.OK).entity("Grupo eliminado").build();
	}
	
	@GET
	@Path("/Abandonar")
	public Response abandonarGrupo(@QueryParam ("grupo") String idGrupo, @Context HttpServletRequest peticion) {
		try {
			DaoGrupos.getInstancia().abandonarGrupo(idGrupo, (String) peticion.getSession(true).getAttribute("username"));
		}catch(Exception e) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
		}
		return Response.status(Response.Status.OK).entity("Grupo eliminado").build();
	}
}
