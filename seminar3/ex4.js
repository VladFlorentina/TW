const sampleArray = [1, 2, 3, 4, 5];

const map = (array, transformation) => {
  const result = [];
  for (const element of array) {
    result.push(transformation(element));
  }
  return result;
};
console.log(map(sampleArray, (x) => x * 2));

//metoda reduce(reduceleft) ca o funcție globală.
const sampleArray2 = [1, 2, 3, 4, 5];

const reduce = (array2, transformation2, initialValue) => {
  let prev = initialValue;
  for (let i = 0; i < array2.length; i++) {
    const curent = array2[i];

    if (i in array2) {
      prev = transformation2(prev, curent, i, array2);
    }
  }
  return prev;
};

console.log(reduce(sampleArray, (prev, curent) => prev + curent, 0));
