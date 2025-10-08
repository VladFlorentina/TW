function occurencies(text, character)
{
    return text.split(character).length - 1;
}

console.log(occurencies('hello web', 'e'));

//implementează o funcție care primește ca parametru
// o listă de numere și returnează un array conținând acele
// numere.

function addToArray(...args) {
    // initializam un array gol

    const array = [];

    // parcurgem argumentele primite si le si adaugam

    for (let i=0; i < args.length; i++) {
        array.push(args[i]);
    }

    // returnam array-ul

    return array;
}

console.log(addToArray(10, 20, 30));