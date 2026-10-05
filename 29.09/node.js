//task1
const num1=Number(prompt("Enter the start number"));
const num2=Number(prompt("Enter the end number"));
let sum=0;
for(let i=num1;i<=num2;i++){
    sum+=i;
}
alert(`The sum of numbers from ${num1} to ${num2} is ${sum}`);
//task2
let a=Number(prompt("Enter first number"));
let b=Number(prompt("Enter second number"));
while (b) {
        let temp = b;
        b = a % b;
        a = temp;
    }
alert(`The GCD of the two numbers is ${a}`);
//task3
const num=Number(prompt("Enter a number"));
let arr=[];
for(let i=1;i<=num;i++){
    if(num%i==0){
        arr.push(i);
    }
}
alert(`The factors of ${num} are ${arr}`);
//task4
number=Number(prompt("Enter a number"));
  if (number === 0) alert("The number of digits in the number is 1");
  let count = 0;
  let n = Math.abs(number);
  while (n > 0) {
    count++;
    n = Math.floor(n / 10);
  }
alert(`The number of digits in ${number} is ${count}`);
//task5
let allnum=[];
let posnum=0;
let negnum=0;
let nullnum=0;
for(let i = 1; i <= 10; i++) {
    num=Number(prompt(`Enter number ${i}`));
    allnum.push(num);
    if(num>0){
        posnum++;
    }
    else if(num<0){
        negnum++;
    }
    else{
        nullnum++;
    }
}
alert(`List of numbers: ${allnum}`);
alert(`Positive numbers: ${posnum}`);
alert(`Negative numbers: ${negnum}`);
alert(`Zeroes: ${nullnum}`);
//task6
let agree;
do {
    const calcnum1 = Number(prompt("Enter first number"));
    const calcnum2 = Number(prompt("Enter second number"));
    const operation = prompt("Enter the operation (+, -, *, /)");

    let result;
    switch (operation) {
        case "+":
            result = calcnum1 + calcnum2;
            break;
        case "-":
            result = calcnum1 - calcnum2;
            break;
        case "*":
            result = calcnum1 * calcnum2;
            break;
        case "/":
            result = calcnum2 !== 0 ? calcnum1 / calcnum2 : "Error (division by zero)";
            break;
        default:
            result = "Invalid operation";
    }
    alert(`The result of ${calcnum1} ${operation} ${calcnum2} is ${result}`);
    agree = prompt("Do you want to perform another calculation? (yes/no)");
} while (agree === "yes");
//task7
const num7 = prompt("Enter a number");
const shift = Number(prompt("Enter how many digits to shift"));
let shiftedStr = num7.slice(shift) + num7.slice(0, shift);
alert(`The shifted number is ${shiftedStr}`);
//task8
const days = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота", "Неділя"];
let i = 0;
do {
    let continueGame = confirm(`${days[i % 7]}. Бажаєте побачити назву наступного дня тижня?`);
    if (!continueGame) break;
    i++;
} while (true);
//task9
let table = "";
for (let i = 2; i <= 9; i++) {
    for (let j = 1; j <= 10; j++) {
        table += `${i} * ${j} = ${i * j}\n`;
    }
    table += "\n";
}
alert(table);
//task10
let min = 0;
let max = 100;
let N;
let answer;

alert("Загадайте число від 0 до 100, а я спробую його вгадати!");

do {
    N = Math.floor((min + max) / 2);
    answer = prompt(`Ваше число більше за ${N}, менше за ${N} або дорівнює ${N}? (введіть більше(>), менше(<) або дорівнює(==)`);
    
    if (answer === ">") {
        min = N + 1;
    } else if (answer === "<") {
        max = N - 1;
    }
} while (answer !== "==");

alert(`Ура! Я вгадав ваше число: ${N}`);
//PART TWO
//task1
const base = Number(prompt("Enter base number"));
const exponent = Number(prompt("Enter exponent"));

function power(b, e) {
    if (e === 0) return 1;
    return b * power(b, e - 1);
}

alert(`${base} to the power of ${exponent} is ${power(base, exponent)}`);
//task2
const a2 = Number(prompt("Enter first number"));
const b2 = Number(prompt("Enter second number"));

function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
}

alert(`The GCD is ${gcd(a2, b2)}`);
//task3
const num3 = Number(prompt("Enter a number"));

function maxDigit(n) {
    n = Math.abs(n);
    if (n < 10) return n;
    let last = n % 10;
    let restMax = maxDigit(Math.floor(n / 10));
    return last > restMax ? last : restMax;
}

alert(`The maximum digit is ${maxDigit(num3)}`);
//task4
const primeNum = Number(prompt("Enter a number"));

function isPrime(n, d = 2) {
    if (n <= 2) return n === 2;
    if (n % d === 0) return false;
    if (d * d > n) return true;
    return isPrime(n, d + 1);
}

alert(`Is ${primeNum} prime? ${isPrime(primeNum)}`);
//task5
const factorNum = Number(prompt("Enter a number"));

function getFactors(n, d = 2, arr = []) {
    if (n < 2) return arr.join('*');
    if (n % d === 0) {
        arr.push(d);
        return getFactors(n / d, d, arr);
    }
    return getFactors(n, d + 1, arr);
}

alert(`Factors of ${factorNum}: ${getFactors(factorNum)}`);
//task6
const fibIndex = Number(prompt("Enter Fibonacci index"));

function fibonacci(n) {
    if (n <= 0) return 0;
    if (n === 1 || n === 2) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

alert(`Fibonacci number at index ${fibIndex} is ${fibonacci(fibIndex)}`);
//PART THREE
//task1
const comp1 = Number(prompt("Enter first number"));
const comp2 = Number(prompt("Enter second number"));

function compare(a, b) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}

alert(`Comparison result: ${compare(comp1, comp2)}`);
//task2
const factNum = Number(prompt("Enter a number for factorial"));

function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

alert(`Factorial is ${factorial(factNum)}`);
//task3
const d1 = Number(prompt("Enter first digit"));
const d2 = Number(prompt("Enter second digit"));
const d3 = Number(prompt("Enter third digit"));

function combineDigits(a, b, c) {
    return a * 100 + b * 10 + c;
}

alert(`Combined number: ${combineDigits(d1, d2, d3)}`);
//task4
const length = Number(prompt("Enter length"));
const widthPrompt = prompt("Enter width (leave blank for square)");
const width = widthPrompt ? Number(widthPrompt) : undefined;

function calculateArea(l, w) {
    if (w === undefined) return l * l;
    return l * w;
}

alert(`The area is ${calculateArea(length, width)}`);
//task5
const perfectNum = Number(prompt("Enter a number to check if it's perfect"));

function isPerfect(n) {
    if (n <= 1) return false;
    let sum = 0;
    for (let i = 1; i <= n / 2; i++) {
        if (n % i === 0) sum += i;
    }
    return sum === n;
}

alert(`Is ${perfectNum} perfect? ${isPerfect(perfectNum)}`);
//task6
const minRange = Number(prompt("Enter min range"));
const maxRange = Number(prompt("Enter max range"));

function isPerfectForRange(n) {
    if (n <= 1) return false;
    let sum = 0;
    for (let i = 1; i <= n / 2; i++) {
        if (n % i === 0) sum += i;
    }
    return sum === n;
}

let resultArr = [];
for (let i = minRange; i <= maxRange; i++) {
    if (isPerfectForRange(i)) {
        resultArr.push(i);
    }
}

alert(`Perfect numbers in range: ${resultArr.join(', ')}`);