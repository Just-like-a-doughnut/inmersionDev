let cantidad = document.getElementById('cantidad');
let boton = document.getElementById('generar');
let contrasena = document.getElementById('contrasena');
let copia = document.getElementById('copiar');

const cadenaDeCaracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';

function generar() {
    let numeroDigitado = parseInt(cantidad.value);
    if (numeroDigitado < 8) {
        alert("La cantidad de caracteres debe ser mayor que 8");
    } else {
        let password = '';
        for (let i = 0; i < numeroDigitado; i++) {
            let caracterAleatorio = cadenaDeCaracteres[Math.floor(Math.random() * cadenaDeCaracteres.length)];
            password += caracterAleatorio;
        }
        contrasena.value = password;
        verificarSeguridad(password);
    }
}

function verificarSeguridad(password) {
    const tieneMayuscula = /[A-Z]/.test(password);
    const tieneMinuscula = /[a-z]/.test(password);
    const tieneNumero = /[0-9]/.test(password);
    const tieneCaracter = /[!@#$%^&*()]/.test(password);

    if(tieneMayuscula && tieneCaracter && tieneMinuscula && tieneNumero){
        alert("La contraseña es segura.");
    } else{
        alert("¡Cuidado! Al parecer esta contraseña no es segura. Puede generar una nueva.");
    }
}

function copiar() {
    navigator.clipboard.writeText(contrasena.value);
    alert("Contraseña Copiada");
}

function limpiarContrasena() {
    contrasena.value = '';
    cantidad.value = '';
}
copia.addEventListener("click", copiar);
