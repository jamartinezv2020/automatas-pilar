// main.js
let simulacionActiva = true;
let simulacionPausada = false;

document.getElementById('simular-btn').addEventListener('click', iniciarSimulacion);
document.getElementById('pausar-btn').addEventListener('click', pausarSimulacion);
document.getElementById('reanudar-btn').addEventListener('click', reanudarSimulacion);
document.getElementById('cerrar-btn').addEventListener('click', cerrarSimulacion);

async function iniciarSimulacion() {
    const cadena = document.getElementById('cadena').value;
    const automata = new AutomataPila();
    const resultadoDiv = document.getElementById('resultado');
    const pilaSVG = document.getElementById('pila');
    pilaSVG.innerHTML = "";

    simulacionActiva = true;
    simulacionPausada = false;

    // Ajustar la altura del SVG
    const alturaPorSimbolo = 50;
    const alturaSVG = alturaPorSimbolo * cadena.length + 20;
    pilaSVG.setAttribute("height", alturaSVG);

    if (automata.esAceptada(cadena)) {
        resultadoDiv.innerHTML = `La cadena '${cadena}' es aceptada (m = ${automata.m}, n = ${automata.n}).`;
        resultadoDiv.style.color = 'green';
    } else {
        resultadoDiv.innerHTML = `La cadena '${cadena}' no es aceptada.`;
        resultadoDiv.style.color = 'red';
    }

    await simularApilamiento(cadena, automata);
}

async function simularApilamiento(cadena, automata) {
    let delay = 1000;
    for (let i = 0; i < cadena.length; i++) {
        if (!simulacionActiva) break;

        if (simulacionPausada) {
            await new Promise(resolve => {
                const interval = setInterval(() => {
                    if (!simulacionPausada) {
                        clearInterval(interval);
                        resolve();
                    }
                }, 500);
            });
        }

        const simbolo = cadena[i];
        automata.agregarSimulacion(simbolo);

        // Mostrar la pila actualizada
        mostrarSimbolosEnPila(automata.simulaciones, i === cadena.length - 1);

        await new Promise(resolve => setTimeout(resolve, delay));
    }
}

function mostrarSimbolosEnPila(simulaciones, esUltimo) {
    const pilaSVG = document.getElementById('pila');
    pilaSVG.innerHTML = "";

    const alturaPorSimbolo = 50;
    simulaciones.forEach((simbolo, index) => {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", 10);
        rect.setAttribute("y", pilaSVG.getAttribute("height") - (index + 1) * alturaPorSimbolo);
        rect.setAttribute("width", 80);
        rect.setAttribute("height", alturaPorSimbolo);
        rect.setAttribute("fill", esUltimo ? "green" : "blue");

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", 50);
        text.setAttribute("y", pilaSVG.getAttribute("height") - (index + 1) * alturaPorSimbolo + 30);
        text.setAttribute("fill", "white");
        text.setAttribute("text-anchor", "middle");
        text.textContent = simbolo;

        pilaSVG.appendChild(rect);
        pilaSVG.appendChild(text);
    });
}

function pausarSimulacion() {
    simulacionPausada = true;
}

function reanudarSimulacion() {
    simulacionPausada = false;
}

function cerrarSimulacion() {
    simulacionActiva = false;
    document.getElementById('resultado').innerHTML = "Simulación finalizada.";
}
