// AutomataPila.js
class AutomataPila {
    constructor() {
        this.m = 0;  // Longitud de la subcadena central
        this.n = 0;  // Longitud de la secuencia inicial de 'a' y final de 'd'
        this.simulaciones = []; // Array para simular la pila
        this.estado = "Inicial";  // Estado actual del autómata
    }

    cambiarEstado(nuevoEstado) {
        this.estado = nuevoEstado;
    }

    contarSubcadenas(w) {
        const longitudW = w.length;
        const mitadW = longitudW / 2;
        const primeraMitad = w.slice(0, mitadW);
        const segundaMitad = w.slice(mitadW);

        // Verificar que la segunda mitad sea la inversa de la primera mitad
        if (segundaMitad === primeraMitad.split('').reverse().join('')) {
            this.m = mitadW; // Longitud de la subcadena w es la mitad
            this.cambiarEstado('Cadena central válida');
        } else {
            this.m = 0;
            this.cambiarEstado('Cadena central inválida');
        }
    }

    esAceptada(cadena) {
        this.cambiarEstado('Verificando estructura a^n w^m d^n');

        const matchA = cadena.match(/^a+/);
        const matchD = cadena.match(/d+$/);

        if (!matchA || !matchD) {
            this.cambiarEstado('Rechazada');
            return false;
        }

        this.n = matchA[0].length;
        const countD = matchD[0].length;

        if (this.n !== countD) {
            this.cambiarEstado('Rechazada');
            return false;
        }

        // Extraer la cadena central w
        const parteMedia = cadena.slice(this.n, -this.n);

        // La longitud de la parte media debe ser par
        if (parteMedia.length % 2 !== 0) {
            this.cambiarEstado('Rechazada');
            return false;
        }

        this.contarSubcadenas(parteMedia);

        if (this.m > 0) {
            this.cambiarEstado('Aceptada');
            return true;
        } else {
            this.cambiarEstado('Rechazada');
            return false;
        }
    }

    agregarSimulacion(simbolo) {
        this.simulaciones.push(simbolo);
    }
}
