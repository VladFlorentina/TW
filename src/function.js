function checkDivisible(n, divisor)
{
    if(n%divisor){
        return false
    }else{
        return true
    }
  

}

console.log(checkDivisible(10, 2));
console.log(checkDivisible(10, 3));


//implementează o funcție care returnează numărul de 
//caractere diferite între două string-uri de aceeași 
//lungime primite ca parametri. Dacă string-urile primite 
//nu sunt de aceeași lungime, funcția va returna -1.

function nrCaractereDif(str1, str2)
{
    if (str1.length !== str2.length) return -1;
    let dif = 0;

    for (let i = 0; i < str1.length; i++)
        if (str1[i] !== str2[i]) dif++;

    return dif;
};

console.log(nrCaractereDif('abc', 'abx'));


//ex6
const sampleWords = 'the quick brown fox jumps over the lazy dog';

const getCounts = (text) => {
    const words = text.split(' ');
    const result = {};

    for(let word of words)
    {
        if(word in result)
            result[word]++;
        else
            result[word] = 1;
    }

    for(let word in result)
        result[word] /= words.length;

    return result;
}

// implementează o funcție care calculează frecvențele 
//relative de apariție a unor litere într-un text, 
//excluzând caracterul pentru spațiu.

const frecvente = (txt) => {
    const frecvente = {};
    let totalLitere = 0;

    for(let char of txt)
    {
        if(char !== ' ')
        {
            const litera = char.toLowerCase();
            frecvente[litera] = (frecvente[litera] || 0) + 1;
            totalLitere++;
        }
    }

    for(let litera in frecvente)
        frecvente[litera] /= totalLitere;

    return frecvente;
}

console.log(getCounts(sampleWords));
console.log(frecvente(sampleWords));