function powGen() {
  const cache = {};

  const pow = (base, exp) => {
    if (exp === 0) return 1;

    const key = base + "^" + exp;

    if (cache[key]) {
      console.log("found " + key);
      return cache[key];
    }

    console.log("calculating " + key);
    cache[key] = base * pow(base, exp - 1);
    return cache[key];
  };

  return pow;
}

const pow = powGen();
console.log(pow(2, 3));
console.log(pow(2, 5));
console.log(pow(2, 3));

// function fibGen() {
//     const cache = [1, 1]
//     const fib = (index) => {
//         if (index < cache.length) {
//             console.log('found ' + index)
//             return cache[index]
//         } else {
//             console.log('calculated ' + index)
//             cache[index] = fib(index - 1) + fib(index - 2)
//             return cache[index]
//         }
//     }
//     return fib
// }

// const fib = fibGen()
// console.log(fib(1))
// console.log(fib(5))
// console.log(fib(3))
