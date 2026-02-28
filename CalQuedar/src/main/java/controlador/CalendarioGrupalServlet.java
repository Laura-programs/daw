package controlador;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Servlet implementation class CalendarioGrupalServlet
 */
@WebServlet("/CalendarioGrupalServlet")
public class CalendarioGrupalServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CalendarioGrupalServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String grupoVisita = request.getParameter("grupo");
		HttpSession sesion = request.getSession();
		String usernameSesionado = (String) sesion.getAttribute("username");
		if(usernameSesionado != null && !usernameSesionado.isBlank()) {
			response.sendRedirect("./calendarioGrupo/grupo.html?grupo=" + grupoVisita);
		}else {
			response.sendRedirect("/CalQuedar/Login");
		}
	}

	

}
