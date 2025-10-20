const getFilteredObjects = (array, object) => {
  return array.filter((element) => {
    let result = false;
    Object.keys(object).forEach((key) => {
      if (!element[key] || element[key] !== object[key]) {
        result = true;
      }
    });
    return result;
  });
};

const laptops = [
  {
    brand: "HP",
    processor: "i5",
    ram: 8,
  },
  {
    brand: "Lenovo",
    processor: "i5",
    ram: 16,
  },
  {
    brand: "Acer",
    processor: "i5",
    ram: 8,
  },
  {
    brand: "Asus",
    processor: "i7",
    ram: 8,
  },
];

const result = getFilteredObjects(laptops, { processor: "i5", ram: 8 });
console.log("result ", result);

//funcție care primește un array de obiecte și un string și returnează array-ul sortat după cheia specificată prin string.
const sortByKey = (array, key) => {
  const copyArray = [...array];

  copyArray.sort((x, y) => {
    let element1 = x[key];
    let element2 = y[key];
    if (typeof element1 === "string") element1 = element1.toLowerCase();
    if (typeof element2 === "string") element2 = element2.toLowerCase();
    return element1 < element2 ? -1 : element1 > element2 ? 1 : 0;
  });
  return copyArray;
};
const users = [
  { nume: "flori", varsta: 20, oras: "focsani" },
  { nume: "dragos", varsta: 22, oras: "bacau" },
  { nume: "madalina", varsta: 23, oras: "bucuresti" },
  { nume: "andrei", varsta: 21, oras: "galati" },
];

console.log("Sortare dupa varsta:");
console.log(sortByKey(users, "varsta"));

console.log("\nSortare dupa oras:");
console.log(sortByKey(users, "oras"));

console.log("\nSortare dupa nume:");
console.log(sortByKey(users, "nume"));
