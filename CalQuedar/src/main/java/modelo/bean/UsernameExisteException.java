package modelo.bean;

/**
 * @author Laura Mora
 * @version 1.0
 * @since 1.0
 * Excepción
 */

public class UsernameExisteException extends RuntimeException{

	/**
	 * Exepción customizada
	 */
	private static final long serialVersionUID = 1L;

	public UsernameExisteException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}
	
	

}
