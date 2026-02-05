package helper;

import java.util.Random;

public class utils {
	
	public String colorAleatorio() {
		Random random = new Random();
		int nextInt = random.nextInt(0xffffff + 1);
		String color = String.valueOf(nextInt);
		return color;
	}
}
