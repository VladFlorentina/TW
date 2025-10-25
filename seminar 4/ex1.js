class Stream {
  #value;
  #nextvalue;
  static #count = 0;

  constructor(value, nextValue) {
    this.#value = value;
    this.#nextvalue = nextValue;
    Stream.#count++;
  }

  get value() {
    return this.#value;
  }

  get next() {
    this.#value = this.#nextvalue(this.#value);
    return this.#value;
  }

  static get count() {
    return Stream.#count;
  }
}

class ConstantStream extends Stream {
  constructor(value) {
    super(value, (value) => value);
  }
}

class NextIntegerStream extends Stream {
  constructor() {
    super(0, (value) => value + 1);
  }
}

class EvenStream extends Stream {
  constructor(initialValue) {
    // Determinăm prima valoare pară >= initialValue
    const firstEvenValue =
      initialValue % 2 === 0 ? initialValue : initialValue + 1;

    // Inițializăm cu prima valoare pară
    super(firstEvenValue, (value) => value + 2);
  }
}

// Testare
const evenStreamFromOdd = new EvenStream(5);
console.log("Test EvenStream pornind de la 5:");
console.log(`Prima valoare: ${evenStreamFromOdd.value}`); // 6
for (let i = 0; i < 10; i++) {
  console.log(`evenFromOdd.next[${i}] = ${evenStreamFromOdd.next}`);
}

console.log("--------------------");

const evenStreamFromEven = new EvenStream(4);
console.log("Test EvenStream pornind de la 4:");
console.log(`Prima valoare: ${evenStreamFromEven.value}`); // 4
for (let i = 0; i < 10; i++) {
  console.log(`evenFromEven.next[${i}] = ${evenStreamFromEven.next}`);
}

console.log("--------------------");
console.log(`Total stream-uri create: ${Stream.count}`);

//exercitiu video
// class Stream {
//     #value;
//     #nextvalue

//     static #count = 0
//     constructor(value, nextValue) {
//         this.#value = value
//         this.#nextvalue = nextValue
//         Stream.#count++
//     }

//     get value() {
//         return this.#value
//     }

//     get next() {
//         this.#value = this.#nextvalue(this.#value)
//         return this.#value
//     }

//     static get count() {
//         return Stream.#count
//     }
// }

// class ConstantStream extends Stream {
//     constructor(value) {
//         super(value, value => value)
//     }
// }

// class NextIntegerStream extends Stream {
//     constructor() {
//         super(0, value => value + 1)
//     }
// }

// const constant = new ConstantStream(1)
// const nextInteger = new NextIntegerStream()

// for (let i = 0; i < 10; i++) {
//     console.log(`constant[${i}] = ${constant.next}`)
//     console.log(`nextInteger[${i}] = ${nextInteger.next}`)

// }

// console.log(Stream.count)
