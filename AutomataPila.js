// AutomataPila.js
class AutomataPila {
    constructor() {
        this.m = 0;  // Contador de pares (b, c)
        this.n = 0;  // Contador de pares (a, d)
        this.simulaciones = []; // Guardar simulaciones para el proceso de apilamiento
    }

    contarSubcadenas(subcadena) {
        if (subcadena.length === 0) {
            // Si no hay subcadena entre a^n y d^n, m = 0
            this.m = 0;
            return;
        }

        // Verificamos que la subcadena tenga un número par de caracteres
        if (subcadena.length % 2 !== 0) {
            this.m = 0;
            return;
        }

        const mid = subcadena.length / 2;
        const primeraMitad = subcadena.slice(0, mid);
        const segundaMitad = subcadena.slice(mid);

        const countBPrimera = primeraMitad.split('b').length - 1;
        const countCPrimera = primeraMitad.split('c').length - 1;
        const countCSegunda = segundaMitad.split('c').length - 1;
        const countBSegunda = segundaMitad.split('b').length - 1;

        // Para que sea válido, el número de 'b' en la primera mitad debe ser igual al número de 'b' en la segunda mitad,
        // y lo mismo debe ocurrir con 'c'.
        if (countBPrimera === countBSegunda && countCPrimera === countCSegunda) {
            this.m = countBPrimera;  // Actualizamos el valor de m correctamente
        } else {
            this.m = 0;
        }
    }

    esAceptada(cadena) {
        // Verificamos la existencia de la parte a^n y d^n, permitiendo que n y m sean 0
        const matchA = cadena.match(/^a*/);  // Puede tener 0 o más 'a'
        const matchD = cadena.match(/d*$/);  // Puede tener 0 o más 'd'

        this.n = matchA[0].length;  // n es la cantidad de 'a'
        const countD = matchD[0].length;  // Cantidad de 'd'

        // Aceptamos que tanto n como d sean 0
        if (this.n !== countD) {
            return false;  // Si n y d no son iguales, no es aceptada
        }

        // Extraemos la parte media, la cual es w^m w^-m
        const parteMedia = cadena.slice(this.n, cadena.length - this.n);

        // Contamos las subcadenas b^m c^m en la parte media
        this.contarSubcadenas(parteMedia);

        // La cadena es aceptada si la parte a^n y d^n coinciden (o no existen), y si m >= 0
        return (this.m >= 0 && this.n >= 0);
    }

    agregarSimulacion(simbolo) {
        this.simulaciones.push(simbolo);
    }
}
