// const orderCoffee = (type) => {
//   const types = {
//     REGULAR: "REGULAR",
//     SPECIAL: "SPECIAL",
//   };

//   if (Object.values(types).indexOf(type) === -1) {
//     throw new Error("coffee error");
//   } else {
//     console.log(`preparing ${type} coffee`);
//   }
// };

// try {
//   orderCoffee("REGULAR");
//   orderCoffee("SWEET_COFFEE_NO_SUGAR");
// } catch (err) {
//   console.log(err);
// }

function increaseSalary(salaries, percent) {
  if (!Array.isArray(salaries)) {
    throw new Error("nu e array");
  }

  if (typeof percent !== "number") {
    throw new Error("nu e numar");
  }

  return salaries.map((s) => s + (s * percent) / 100);
}

try {
  console.log(increaseSalary([1000, 2000, 3000], 10));
  console.log(increaseSalary("gresit", 10));
} catch (err) {
  console.log(err.message);
}
