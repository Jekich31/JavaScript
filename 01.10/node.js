//task1
const car = {
    manufacturer: prompt("Введіть марку:"),
    model: prompt("Введіть модель: "),
    year: Number(prompt("Введіть рік випуску:")),
    averageSpeed: Number(prompt("Введіть середню швидкість:")),
    showInfo: function() {
        alert(`Автомобіль: ${this.manufacturer} ${this.model}\nРік випуску: ${this.year}\nСередня швидкість: ${this.averageSpeed} км/год`) 
    },

    calculateTime: function(distance) {
        const drivingTime = distance / this.averageSpeed;
        let breaks = Math.floor(drivingTime / 4);
        if (drivingTime % 4 === 0 && breaks > 0) {
            breaks -= 1;
        }

        const totalTime = drivingTime + breaks;

        alert(`Відстань: ${distance} км`);
        alert(`Чистий час у дорозі: ${drivingTime.toFixed(2)} год`);
        alert(`Кількість перерв: ${breaks} год`);
        alert(`Загальний час у дорозі з урахуванням перерв: ${totalTime.toFixed(2)} год`);
        
        return totalTime;
    }
};
car.showInfo();
const distance=Number(prompt("Введіть відстань, яку ви хочете подолати:"));
car.calculateTime(distance);

//task2
function gcd(a, b) {
    return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

function createFraction(numerator, denominator) {
    if (denominator === 0) {
        throw new Error("Знаменник не може дорівнювати нулю!");
    }
    const common = gcd(numerator, denominator);
    return {
        numerator: numerator / common,
        denominator: denominator / common,

        add(other) {
            const num = this.numerator * other.denominator + other.numerator * this.denominator;
            const den = this.denominator * other.denominator;
            return createFraction(num, den);
        },

        subtract(other) {
            const num = this.numerator * other.denominator - other.numerator * this.denominator;
            const den = this.denominator * other.denominator;
            return createFraction(num, den);
        },

        multiply(other) {
            const num = this.numerator * other.numerator;
            const den = this.denominator * other.denominator;
            return createFraction(num, den);
        },

        divide(other) {
            if (other.numerator === 0) throw new Error("На нуль ділити не можна!");
            const num = this.numerator * other.denominator;
            const den = this.denominator * other.numerator;
            return createFraction(num, den);
        },

        toString() {
            return `${this.numerator}/${this.denominator}`;
        }
    };
}

let str1 = prompt("Введіть через пробіл чисельник та знаменник першого дробу:");
let num1frac = str1.split(" ");
let val1 = Number(num1frac[0]);
let val2 = Number(num1frac[1]);

let str2 = prompt("Введіть через пробіл чисельник та знаменник другого дробу:");
let num2frac = str2.split(" ");
let val3 = Number(num2frac[0]);
let val4 = Number(num2frac[1]);

const f1 = createFraction(val1, val2);
const f2 = createFraction(val3, val4);

alert(
    "Результати:\n" +
    `Додавання: ${f1.add(f2).toString()}\n` +
    `Віднімання: ${f1.subtract(f2).toString()}\n` +
    `Множення: ${f1.multiply(f2).toString()}\n` +
    `Ділення: ${f1.divide(f2).toString()}`
);


//task3
const timeObj = {
    hours: Number(prompt("Введіть години (0-23):")),
    minutes: Number(prompt("Введіть хвилини (0-59):")),
    seconds: Number(prompt("Введіть секунди (0-59):")),

    showTime() {
        const format = (val) => String(val).padStart(2, '0');
       alert(`Поточний час: ${format(this.hours)}:${format(this.minutes)}:${format(this.seconds)}`);
    },

    addSeconds(sec) {
        let totalSeconds = this.hours * 3600 + this.minutes * 60 + this.seconds + sec;
        totalSeconds = (totalSeconds % 86400 + 86400) % 86400;
        this.hours = Math.floor(totalSeconds / 3600);
        this.minutes = Math.floor((totalSeconds % 3600) / 60);
        this.seconds = totalSeconds % 60;
        return this;
    },

    addMinutes(min) { return this.addSeconds(min * 60); },
    addHours(hrs) { return this.addSeconds(hrs * 3600); }
};

timeObj.showTime();
timeObj.addSeconds(Number(prompt("Скільки секунд додати до часу?")));
alert("Після додавання секунд:");
timeObj.showTime();

timeObj.addMinutes(Number(prompt("Скільки хвилин додати до часу?")));
alert("Після додавання хвилин:");
timeObj.showTime();

timeObj.addHours(Number(prompt("Скільки годин додати до часу?")));
alert("Після додавання годин:");
timeObj.showTime();

//PART TWO


//task1
const shoppingList = [
    { name: "Хліб", count: 2, isBought: true },
    { name: "Молоко", count: 1, isBought: false }
];

function printShoppingList(list) {
     alert("Список покупок:");
    const sorted = [...list].sort((a, b) => a.isBought - b.isBought);
    sorted.forEach(item => {
        const status = item.isBought ? "[Куплено]" : "[Не куплено]";
         alert(`${status} ${item.name} — ${item.count} шт.`);
    });
}

function addProduct(list) {
    const name = prompt("Введіть назву товару для додавання:");
    const count = Number(prompt("Введіть кількість:"));
    const existing = list.find(item => item.name.toLowerCase() === name.toLowerCase());
    if (existing) {
        existing.count += count;
    } else {
        list.push({ name, count, isBought: false });
    }
}

function buyProduct(list) {
    const name = prompt("Введіть назву товару, який ви купили:");
    const item = list.find(i => i.name.toLowerCase() === name.toLowerCase());
    if (item) {
        item.isBought = true;
         alert(`Товар "${item.name}" позначено як куплений.`);
    } else {
         alert("Товар не знайдено у списку.");
    }
}

printShoppingList(shoppingList);
addProduct(shoppingList);
buyProduct(shoppingList);
printShoppingList(shoppingList);

//task2
const receipt = [
    { name: "Молоко", count: 2, pricePerUnit: 35 },
    { name: "Хліб", count: 1, pricePerUnit: 20 },
    { name: "Сир", count: 1, pricePerUnit: 120 }
];

function printReceipt(arr) {
     alert(" Чек з магазину ");
    arr.forEach(item => {
         alert(`${item.name}: ${item.count} шт. по ${item.pricePerUnit} грн = ${item.count * item.pricePerUnit} грн`);
    });
}

function getTotalSum(arr) {
    return arr.reduce((sum, item) => sum + item.count * item.pricePerUnit, 0);
}

function getMostExpensive(arr) {
    if (arr.length === 0) return null;
    return arr.reduce((prev, curr) => 
        (curr.count * curr.pricePerUnit > prev.count * prev.pricePerUnit) ? curr : prev
    );
}

function getAveragePrice(arr) {
    const totalItems = arr.reduce((sum, item) => sum + item.count, 0);
    const totalSum = getTotalSum(arr);
    return totalItems === 0 ? 0 : totalSum / totalItems;
}

printReceipt(receipt);
 alert(`Загальна сума: ${getTotalSum(receipt)} грн`);
const expensive = getMostExpensive(receipt);
 alert(`Найдорожча покупка: ${expensive.name} (${expensive.count * expensive.pricePerUnit} грн)`);
 alert(`Середня вартість 1 товару: ${getAveragePrice(receipt).toFixed(2)} грн`);

//task3
const styles = [
    { name: "color", value: prompt("Введіть колір тексту (наприклад, blue або red):") },
    { name: "font-size", value: prompt("Введіть розмір шрифту (наприклад, 24px):") },
    { name: "text-decoration", value: prompt("Введіть оформлення тексту (наприклад, underline):") }
];

function printStyledText(stylesArr, text) {
    const styleString = stylesArr.map(s => `${s.name}: ${s.value}`).join("; ");
    document.write(`<p style="${styleString}">${text}</p>`);
}

const userText = prompt("Введіть текст, який потрібно вивести на сторінку зі стилями:");
printStyledText(styles, userText);

//task4
const classrooms = [
    { name: "Ауд. 101", seats: 15, department: "Програмування" },
    { name: "Ауд. 102", seats: 12, department: "Дизайн" },
    { name: "Ауд. 103", seats: 18, department: "Програмування" },
    { name: "Ауд. 104", seats: 10, department: "Маркетинг" }
];

function showAllClassrooms(arr) {
    arr.forEach(c =>  alert(`${c.name} (місць: ${c.seats}), кафедра: ${c.department}`));
}

 alert(" Усі аудиторії ");
showAllClassrooms(classrooms);

 alert("\n Фільтр за кафедрою ");
const deptInput = prompt("Введіть назву кафедри для пошуку аудиторій (наприклад: Програмування):");
const filteredDept = classrooms.filter(c => c.department.toLowerCase() === deptInput.toLowerCase());
showAllClassrooms(filteredDept);

alert("\n Сортування за кількістю місць ");
const sortedBySeats = [...classrooms].sort((a, b) => a.seats - b.seats);
showAllClassrooms(sortedBySeats);

 alert("\n Сортування за назвою ");
const sortedByName = [...classrooms].sort((a, b) => a.name.localeCompare(b.name));
showAllClassrooms(sortedByName);