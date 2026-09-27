//task1
const name=prompt("Введіть своє ім'я: ");
alert(`Привіт, ${name}`);
//task2
const today=2026;
const year=Number(prompt("Введіть свій рік народження"));
const age=today-year;
alert(`Зараз вам ${age} років`);
//task3
const side=Number(prompt("Введіть сторону квадрата: "));
const sum=4*side;
alert(`Периметр квадрата зі стороною ${side}см дорівнює ${sum}см`);
//task4
const rad=Number(prompt("Введіть радіус кола:"));
const square=3.14*(rad**2);
alert(`Площа кола з радіусом ${rad}см дорівнює ${square}см`);
//task5
const kilo=Number(prompt("Введіть відстань, яку вам потрібно подолати:"));
const time=Number(prompt(`Введіть час, за який ви хочете подолати ${kilo}км`));
const speed=kilo/time;
alert(`Щоб проїхати ${kilo}км за ${time} годин вам потрібно рухатися зі швидкістю ${speed}км/год`);
//task6
const dollar=Number(prompt("Введіть кількість долларів:"));
const euroToDollar=0.88;
const euro=dollar*euroToDollar;
alert(`Ви внесли ${dollar} долларів. Ви отримали ${euro} євро`);
//task7
const flash=Number(prompt("Введіть обсяг флешки у ГБ:"));
const flashToMB=flash*1000;
const file=820;
const capacity=Math.trunc(flashToMB/file);
alert(`На флешку, обсягом ${flash}ГБ ви зможете завантажити ${capacity} файлів, обсягом ${file}МБ`);
//task8
const money=Number(prompt("Введіть кількість грошей:"));
const chocolate=Number(prompt("Введіть вартість однієї плитки шоколаду:"));
const plates=Math.trunc(money/chocolate);
const change=money-(plates*chocolate);
alert(`Ви можете купити ${plates} плиток шоколаду на ${money}грн. Ваша решта становить ${change}грн`);
//task9
const number=Number(prompt("Введіть тризначне число:"));
let number1=number;
const first=number1%10;
const second=Math.trunc(number1/10)%10;
const third=Math.trunc(number1/100)%10;
const num=''+first+second+third;
alert(`Паліндром з ${number} - це ${num}`);
task10
const input=Number(prompt("Введіть число:"));
const messages = [`Число ${input} є парним`, `Число ${input} не є парним`];
alert(messages[input % 2]);