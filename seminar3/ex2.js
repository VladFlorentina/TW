const getTotalArea = (squareDimensions) => {
  return squareDimensions
    .map((side) => {
      return side * side;
    })
    .reduce((prev, current) => {
      return prev + current;
    }, 0);
};

const squareDimensions = [3, 5, 12, 3, 5, 3];

const result = getTotalArea(squareDimensions);
console.log("result: ", result);

//funcție care primește ca parametrii un array de numere și un număr și returnează suma tuturor numerelor din array divizibile cu cel de-al doilea parametru.
function sumNrDiv(nr, divisor) {
  if (divisor === 0) {
    console.log("divizorul nu poate fi 0");
    return 0;
  }

  const sum = nr.reduce((prev, curent) => {
    if (curent % divisor === 0) {
      return prev + curent;
    } else {
      return prev;
    }
  }, 0);

  return sum;
}

const nr = [15, 21, 3, 5, 33, 30, 6, 12];
const divisor = 3;

console.log(sumNrDiv(nr, divisor));
