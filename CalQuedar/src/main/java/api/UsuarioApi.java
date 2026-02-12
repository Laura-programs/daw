package api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Cookie;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.google.gson.Gson;

import modelo.bean.AmigoAnadidoException;
import modelo.bean.UsernameExisteException;
import modelo.bean.Usuario;
import modelo.dao.DaoUsuarios;

/**
 * @author Laura Mora Mulero
 * @version 1.2
 * @since 1.0
 */


/**
 * Endpoint donde llegan las solicitudes que devuelven usuarios
 */
@Path("/User")
public class UsuarioApi {
	
	Gson gson = new Gson();
	
	/**
	 * Endpoint para el registro. Recibe un usuario y lo añade a la BBDD
	 * @param userJSON
	 * @return Response con el estado de la respuesta de la bbdd. Si el username ya existe, conflict. Si da otro error distinto, Internal_server_error. Si todo bien, OK
	 */
	@POST
	@Path("/Registro")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response acceptUserJSON(String userJSON) {
		
		Usuario usuario = gson.fromJson(userJSON, Usuario.class);
		try {
			DaoUsuarios.getInstancia().anadirUsuario(usuario);
		} catch (UsernameExisteException exception) {
			return Response.status(Response.Status.CONFLICT).entity(exception.getMessage()).build();
		} catch (Exception exception) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(exception.getMessage()).build();
		}
		return Response.status(Response.Status.OK).entity("Registrado correctamente").build();

	}
	
	/**
	 * Endpoint para el login del usuario. Comprueba si el usuario se encuentra en la bbdd
	 * @param jsonLogin
	 * @return Respuesta NOT_FOUND si no encuentra el usuario con la combinación de username y contraseña. Respuesta OK si el usuario se encuentra en la BBDD
	 */
	
	@POST
	@Path("/Login")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response sendUserJSON(String jsonLogin, @Context HttpServletRequest peticion) {
		Usuario usuarioDTO = gson.fromJson(jsonLogin, Usuario.class);
		Usuario userLogin = DaoUsuarios.getInstancia().buscarUsuario(usuarioDTO.getUsername(), usuarioDTO.getContrasenya());
		if(userLogin == null) {
			return Response.status(Response.Status.NOT_FOUND).entity("El usuario no se ha encontrado").build();
		}else {
			HttpSession miSesion = peticion.getSession(true);
			miSesion.setAttribute("username", userLogin.getUsername());
			return Response.status(Response.Status.OK).entity("Usuario encontrado").build();
		}
	}
	
	@GET
	@Path("/Amigos")
	@Produces(MediaType.APPLICATION_JSON)
	public Response cargarAmigosJSON(@Context HttpServletRequest peticion) {
		ArrayList<Usuario> listaAmigos = new ArrayList<Usuario>();
		listaAmigos = DaoUsuarios.getInstancia().cargarAmigos((String) peticion.getSession(true).getAttribute("username"));
		if(listaAmigos == null) {
			return Response.status(Response.Status.NOT_FOUND).entity(new ArrayList<Usuario>()).build();
		} else {
			return Response.status(Response.Status.OK).entity(listaAmigos).build();
		}
	}
	
	@POST
	@Path("/AnadirAmigo")
	public Response anadirAmigo(@Context HttpServletRequest peticion, @QueryParam("amigo") String usernameAmigo) {
		try {
			DaoUsuarios.getInstancia().anadirAmigo((String) peticion.getSession(true).getAttribute("username"), usernameAmigo);
		}catch(AmigoAnadidoException exception) {
			return Response.status(Response.Status.CONFLICT).entity(exception.getMessage()).build();
		}catch (Exception exception) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(exception.getMessage()).build();
		}
		return Response.status(Response.Status.OK).entity("Amigo añadido").build();
	}
	
	@GET
	@Path("/InfoAmigo")
	public Response infoAmigoJSON(@QueryParam("amigo") String username) {
		Usuario usuario = DaoUsuarios.getInstancia().buscarUsername(username);
		if (usuario == null) {
			return Response.status(Response.Status.NOT_FOUND).entity("Usuario no encontrado").build();
		}else {
			return Response.status(Response.Status.OK).entity(usuario).build();
		}
	}
	
	@GET
	@Path("/EliminarAmigo")
	public Response eliminarAmigo(@Context HttpServletRequest peticion, @QueryParam("amigo") String usernameAmigo) {
		try {
			DaoUsuarios.getInstancia().eliminarAmigo((String) peticion.getSession(true).getAttribute("username"), usernameAmigo);
		} catch (Exception exception) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(exception.getMessage()).build();
		}
		return Response.status(Response.Status.OK).entity("Amigo eliminado").build();
	}
}