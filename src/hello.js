//console.log("hello world")
let sayHello = (name) => {
  return "Hello,${name}!";
};
console.log(sayHello(process.argv[0]));



let exercitiu1 = (arr) => arr.join('');
console.log(exercitiu1(['Hello', ' ', 'Web', '!']));