package helper;

import java.util.Random;

public class utils {
	
	public static String colorAleatorio() {
		Random random = new Random();
		int rgb = random.nextInt(0x1000000);
        return String.format("%06X", rgb);
	}
	
	public static boolean intToBool(int dato) {
		boolean respuesta;
		if(dato == 1) {
			respuesta = true;
		}else {
			respuesta = false;
		}
		
		return respuesta;
	}
}
