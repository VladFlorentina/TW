// Implementarea metodei 'times'
Number.prototype.times = function (fn) {
  for (let i = 0; i < this; i++) {
    fn();
  }
};

(3).times(() => {
  console.log("Hello!");
});

console.log("---");

(5).times(() => {
  console.log("Salut");
});

// String.prototype.capitalizedWords = function () {
//     return this.replace(/\b[a-z]/g, match => match.toUpperCase())
// }

// console.log("these words will be calipalized".capitalizedWords())
