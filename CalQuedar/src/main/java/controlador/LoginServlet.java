package controlador;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * @author Laura Mora Mulero
 * @version 1.0
 * @since 1.0
 * Servlet para el inicio de sesión
 */
@WebServlet("/Login")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public LoginServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * Al cargar el servlet redirige al usuario al html correspondiente
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.sendRedirect("./login/login.html");
	}

	/**
	 * Si al enviar el formulario todo es correcto, recibe la solicitud al post y redirige a la página principal
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		HttpSession sesion = request.getSession();
		String rol = (String) sesion.getAttribute("admin");
		if(rol.contentEquals("1")) {
			response.sendRedirect("./DashboardAdmin");
		}else {
			response.sendRedirect("/CalQuedar/UserCalendarServlet");
		}
	}

}
