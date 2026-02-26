package helper;

import java.util.Random;

public class utils {
	
	public String colorAleatorio() {
		Random random = new Random();
		int nextInt = random.nextInt(0xffffff + 1);
		String color = String.valueOf(nextInt);
		return color;
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
