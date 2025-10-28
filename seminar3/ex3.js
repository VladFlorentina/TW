const formatString = (s, ...format) => {
  let modified = s;
  for (let i = 0; i < format.length; i++) {
    if (modified.indexOf("{" + i + "}") !== -1) {
      modified = modified.replace("{" + i + "}", format[i]);
    }
  }
  return modified;
};

console.log(
  formatString("this is a {0} string  and we've {1} it ", "nice", "modified")
);

//funcție de formatare a unui string care suportă parametrii numiți; de exemplu "un {substantiv} este {adjectiv}" să poată fi formatat în "un căluț este drăguț".
function formatString2(text, cuvinte) {
  let rez = text;
  rez = rez.replace("{substantiv}", cuvinte.substantiv);
  rez = rez.replace("{adjectiv}", cuvinte.adjectiv);
  return rez;
}
const cuvinte = {
  substantiv: "calut",
  adjectiv: "dragut",
};
const rez = formatString2("un {substantiv} este {adjectiv}", cuvinte);
console.log(rez);
