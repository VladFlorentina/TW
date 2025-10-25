function addToArray(array, ...args)
{
    for(var i = 0; i < args.length; i++)
        array.push(args[i]);

    return array;
}

let array = ["a"];
console.log(addToArray(array, "b", "c").join(", "));



//implementează o funcție care primește ca parametrii două 
//array-uri de aceeași lungime și returnează un array cu elementele din 
//cele două surse intercalate.
function intercaleaza(array1, array2) {
    if(array1.length == array2.length)
    {
        const rezultat = [];

        for (let i = 0; i < array1.length; i++)
            rezultat.push(array1[i], array2[i]);

        return rezultat;
    }
}

console.log(intercaleaza([1, 2, 3], ['a', 'b', 'c']).join(', '));

