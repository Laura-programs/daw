export function validarUsername(username) {
    const patron = /^[a-zA-Z0-9_]{6,36}$/;
    return patron.test(username);
}

export function validarContrasenya(contrasenya) {
    const patron = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return patron.test(contrasenya);
}

export function contrasenyaIgual(contrasenyaOriginal, contrasenyaRepetida) {
        if(contrasenyaOriginal === contrasenyaRepetida) {
            return true;
        }else {
            return false;
        }
    }

export function soloLetras(texto) {
    const patron = /^[A-Za-záéíóúÁÉÍÓÚñÑ]+(?: [A-Za-záéíóúÁÉÍÓÚñÑ]+)*$/;
    return patron.test(texto);
}