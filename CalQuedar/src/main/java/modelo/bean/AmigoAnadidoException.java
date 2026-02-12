package modelo.bean;

/**
 * Excepción customizada
 * @author user
 *
 */
public class AmigoAnadidoException extends RuntimeException{
	/**
	 * Excepción customizada
	 */
	private static final long serialVersionUID = 1L;

	public AmigoAnadidoException(String message) {
		super(message);
	}
}
