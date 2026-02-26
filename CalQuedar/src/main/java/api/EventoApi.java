package api;

import java.sql.Timestamp;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import com.google.gson.Gson;
import modelo.bean.EventoPersonal;
import modelo.bean.EventosRespuesta;
import modelo.bean.Usuario;
import modelo.dao.DaoEventos;



/**
 * @author Laura Mora
 * @version 1.1
 * @since 1.1
 */
@Path("/Evento")
public class EventoApi {
	
	Gson gson = new Gson();
	
	@POST
	@Path("/Anadir/EventoPersonal")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response anadirEventoPersonalJSON(String eventoJSON, @Context HttpServletRequest peticion) {
		EventoPersonal evento = gson.fromJson(eventoJSON, EventoPersonal.class);
		try {
			DaoEventos.getInstancia().anadirEventoPersonal(evento, (String) peticion.getSession(true).getAttribute("username"));
		}catch (Exception exception) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(exception.getMessage()).build();
		}
		return Response.status(Response.Status.OK).entity("Registrado correctamente").build();
	}
	
	@GET
	@Path("/Cargar/Propios")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response cargarEventosPropiosJSON(@Context HttpServletRequest peticion) {
		EventosRespuesta todosEventos = new EventosRespuesta();
		todosEventos.setEventosPersonales(DaoEventos.getInstancia().cargarEventosPersonalesPropios((String) peticion.getSession(true).getAttribute("username")));
		todosEventos.setEventosGrupales(DaoEventos.getInstancia().cargarEventosGrupales((String) peticion.getSession(true).getAttribute("username")));
		if(todosEventos.getEventosGrupales() == null && todosEventos.getEventosPersonales() == null) {
			return Response.status(Response.Status.NOT_FOUND).entity(new EventosRespuesta()).build();
		}else {
			return Response.status(Response.Status.OK).entity(todosEventos).build();
		}
	}
	
	@GET
	@Path("/Cargar/PropiosProximos")
	public Response cargarEventosPropiosProximosJSON(@Context HttpServletRequest peticion) {
		EventosRespuesta todosEventos = new EventosRespuesta();
		todosEventos.setEventosPersonales(DaoEventos.getInstancia().cargarEventosPersonalesPropiosProximos((String) peticion.getSession(true).getAttribute("username")));
		todosEventos.setEventosGrupales(DaoEventos.getInstancia().cargarEventosGrupalesProximos((String) peticion.getSession(true).getAttribute("username")));
		if(todosEventos.getEventosGrupales() == null && todosEventos.getEventosPersonales() == null) {
			return Response.status(Response.Status.NOT_FOUND).entity(new EventosRespuesta()).build();
		}else {
			return Response.status(Response.Status.OK).entity(todosEventos).build();
		}
	}
	
	@GET
	@Path("/Cargar/Ajenos")
	public Response cargarEventosAjenosJSON(@QueryParam("amigo") String username) {
		ArrayList<EventoPersonal> listaEventos = null;
		listaEventos = DaoEventos.getInstancia().cargarEventosPersonalesAjenos(username);
		if(listaEventos.isEmpty() || listaEventos == null) {
			return Response.status(Response.Status.NOT_FOUND).entity(listaEventos = new ArrayList<EventoPersonal>()).build();
		}else {
			return Response.status(Response.Status.OK).entity(listaEventos).build();
		}
	}
	
	@GET
	@Path("/Cargar/AjenosProximos")
	public Response cargarEventosAjenosProximosJSON(@QueryParam("amigo") String username) {
		ArrayList<EventoPersonal> listaEventos = null;
		listaEventos = DaoEventos.getInstancia().cargarEventosPersonalesAjenosProximos(username);
		if(listaEventos.isEmpty() || listaEventos == null) {
			return Response.status(Response.Status.NOT_FOUND).entity(listaEventos = new ArrayList<EventoPersonal>()).build();
		}else {
			return Response.status(Response.Status.OK).entity(listaEventos).build();
		}
	}
	
	@GET
	@Path("/Buscar/EventoPersonal")
	public Response buscarEventoPropio(@QueryParam("id") int idEvento) {
		EventoPersonal evento = DaoEventos.getInstancia().buscarEventoPersonal(idEvento);
		if(evento == null) {
			return Response.status(Response.Status.NOT_FOUND).entity(new EventoPersonal()).build();
		}else {
			return Response.status(Response.Status.OK).entity(evento).build();
		}
	}
	
	@POST
	@Path("/Actualizar/EventoPersonal")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response actualizarEventoPropio(String eventoJSON) {
		EventoPersonal evento = gson.fromJson(eventoJSON, EventoPersonal.class);
		try {
			DaoEventos.getInstancia().editarEventoPersonal(evento);
		}catch (Exception exception) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(exception.getMessage()).build();
		}
		return Response.status(Response.Status.OK).entity("Evento actualizado :3").build();
	}
	
	@GET
	@Path("/Eliminar/EventoPersonal")
	public Response eliminarEventoPropio(@QueryParam("id") int idEvento) {
		try {
			DaoEventos.getInstancia().eliminarEventoPersonal(idEvento);
		}catch (Exception exception) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(exception.getMessage()).build();
		}
		return Response.status(Response.Status.OK).entity("Evento eliminado").build();
	}
}
