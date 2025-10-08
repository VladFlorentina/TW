const checkPrime = (n) => {
    for(let i = 2; i <= Math.sqrt(n); i++)
    {
        if(!(n % i))
            return false;
    }

    return true;
}



const fibonacci = (n) => {
    if (n < 2) {
        return n;
    }

    let a = 0; 
    let b = 1; 
    for (let i = 1; i < n; i++) {
        [a, b] = [b, a + b];
    }

    return b;
};

if(process.argv.length < 3)
    console.log("Please provide a number as argument");
else
    console.log(fibonacci(parseInt(process.argv[2])));





