/**
 * Comprueba si los valores ingresados son correctos y realiza el cálculo del IMC.
 */
function calcularIMC() {
    let peso = document.getElementById("peso").value;
    let altura = document.getElementById("altura").value;

    if (peso === "" || altura === "") {
        alert("Por favor, ingrese su peso y altura correctamente.");
        document.getElementById("peso").value = "";
        document.getElementById("altura").value = "";
        return;
    }

    peso = parseFloat(peso);
    altura = parseFloat(altura);

    if (isNaN(peso) || isNaN(altura) || peso < 0 || altura < 0) {
        alert("Por favor, ingrese valores numéricos válidos para el peso y la altura.");
        document.getElementById("peso").value = "";
        document.getElementById("altura").value = "";
        return;
    }

    let imc = peso / (altura * altura);
    let mensaje = obtenerMensajeIMC(imc);
    let color = obtenerColorIMC(imc);

    document.getElementById("resultado").value = imc.toFixed(2);
    document.getElementById("mensaje").textContent = mensaje;

    dibujarGraficoIMC(imc, color);
}

/**
 * Retorna el mensaje correspondiente según el IMC.
 * @param {number} imc - Índice de masa corporal.
 * @returns {string} - Mensaje correspondiente al IMC.
 */
function obtenerMensajeIMC(imc) {
    if (imc < 18.5) {
        return "Bajo peso";
    } else if (imc < 25) {
        return "Peso saludable";
    } else if (imc < 30) {
        return "Sobrepeso";
    } else {
        return "Obesidad";
    }
}

/**
 * Retorna el color correspondiente según el IMC.
 * @param {number} imc - Índice de masa corporal.
 * @returns {string} - Color correspondiente al IMC.
 */
function obtenerColorIMC(imc) {
    if (imc < 18.5) {
        return "#6BBF4E"; // Verde
    } else if (imc < 25) {
        return "#FEDB5E"; // Amarillo
    } else if (imc < 30) {
        return "#FFA500"; // Naranja
    } else {
        return "#FF4F4F"; // Rojo
    }
}

/**
 * Dibuja la barra de progreso del IMC en el canvas.
 * @param {number} imc - Índice de masa corporal.
 * @param {string} color - Color de la barra de progreso.
 */
function dibujarGraficoIMC(imc, color) {
    const canvas = document.getElementById("grafico");
    const ctx = canvas.getContext("2d");

    const targetWidth = canvas.width * (imc / 40);
    const barHeight = canvas.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;

    let currentWidth = 0;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (currentWidth < targetWidth) {
            currentWidth += 1; // Ajusta la velocidad de progreso de la barra cambiando el valor de incremento

            ctx.fillRect(0, 0, currentWidth, barHeight);
        } else {
            ctx.fillRect(0, 0, targetWidth, barHeight);
        }

        if (currentWidth < targetWidth) {
            requestAnimationFrame(draw);
        }
    }

    draw();
}
