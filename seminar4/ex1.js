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
    const firstEvenValue =
      initialValue % 2 === 0 ? initialValue : initialValue + 1;

    super(firstEvenValue, (value) => value + 2);
  }
}

const evenStreamFromOdd = new EvenStream(5);
console.log("Test  pornind de la 5:");
console.log(`Prima valoare: ${evenStreamFromOdd.value}`); // 6
for (let i = 0; i < 10; i++) {
  console.log(`evenFromOdd.next[${i}] = ${evenStreamFromOdd.next}`);
}

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
