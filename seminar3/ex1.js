const words = [
  "fox",
  "wolf",
  "snake",
  "crocodile",
  "lion",
  "cat",
  "crocodile",
  "horse",
];

const forbiddenWord = "crocodile";
const minLength = 4;

const filterWords = (words, forbiddenWord, minLength) => {
  const result = words.filter((word) => {
    if (word !== forbiddenWord && word.length >= minLength) {
      return true;
    }
    return false;
  });
  return result;
};

console.log(filterWords(words, forbiddenWord, minLength));

//metodele map și filter pentru a procesa un array de numere reprezentând ani de naștere obținând vârstele peste 18 ani.
const anCurent = new Date().getFullYear();
const anNastere = [1966, 1974, 2004, 2007, 2010, 2015];
const varste = anNastere.map((year) => anCurent - year);
const major = varste.filter((age) => age >= 18);

console.log("ani de nastere array:", anNastere);
console.log("calcul varsta:", varste);
console.log("varste +18 ani :", major);
