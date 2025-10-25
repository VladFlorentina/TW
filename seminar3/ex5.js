const sampleDictionary = [
  "the",
  "quick",
  "brown",
  "fox",
  "jumps",
  "over",
  "lazy",
  "dog",
];

const sampleText = `
    best
    read
    on
    windy
    nights
`;
const checkAcrostic = (text, dictionary) => {
  const candidate = text
    .split("\n")
    .filter((e) => e)
    .map((e) => e.trim())
    .map((e) => e[0])
    .join("");

  return dictionary.indexOf(candidate) !== -1;
};

console.log(checkAcrostic(sampleText, sampleDictionary));

//implementați cenzurarea unui text printr-o funcție. Funcția primește un șir de caractere și un dicționar sub forma unui array.
//De exemplu pentru șirul "javascript este minunat" și dicționarul ["este"] funcția va produce "javascript e**e minunat".

// const cenzureaza = (text, dictionar) => {
//   let rez = text;

//   for (let cuvant of dictionar) {
//     let cenzurat = cuvant[0];
//     for (let i = 1; i < cuvant.length - 1; i++) {
//       cenzurat += "*";
//     }
//     cenzurat += cuvant[cuvant.length - 1];
//     while (rez.includes(cuvant)) {
//       rez = rez.replace(cuvant, cenzurat);
//     }
//   }

//   return rez;
// };

const sampleDictionary2 = ["este"];
const sampleText2 = `javascript este minunat`;

const checkCensor = (text2, dictionary2) => {
  const dictionarySet = new Set(
    dictionary2.map((cuvant) => cuvant.toLowerCase())
  );
  const censorMask = (cuvant) => {
    if (cuvant.length < 2) {
      return cuvant;
    }
    return (
      cuvant[0] + "*".repeat(cuvant.length - 2) + cuvant[cuvant.length - 1]
    );
  };
  const candidate = text2
    .split(" ")
    .map((cuvant) => {
      if (cuvant.length === 0) return cuvant;

      if (dictionarySet.has(cuvant.toLowerCase())) {
        return censorMask(cuvant);
      }
      return cuvant;
    })
    .join(" ");

  return candidate;
};

console.log(checkCensor(sampleText2, sampleDictionary2));
