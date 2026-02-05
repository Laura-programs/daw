package controlador;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class RUDEventoPersonalServlet
 */
@WebServlet("/RUDEventoPersonalServlet")
public class RUDEventoPersonalServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public RUDEventoPersonalServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String idEvento = request.getParameter("id");
		HttpSession sesion = request.getSession();
		String usernameSesionado = (String) sesion.getAttribute("username");
		if(usernameSesionado != null && !usernameSesionado.isBlank()) {
			response.sendRedirect("./RUDEventoPersonal/rudPersonal.html?id=" + idEvento);
		}else {
			response.sendRedirect("/CalQuedar/Login");
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
