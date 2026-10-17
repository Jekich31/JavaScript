//task1
class Marker {
  constructor(color, inkPercentage = 100.0) {
    this.color = color;
    this.inkPercentage = inkPercentage;
  }
  printText(text) {
    let output = "";
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (this.inkPercentage <= 0) break;
      
      if (char.trim() === "") {
        output += char;
      } else {
        if (this.inkPercentage >= 0.5) {
          this.inkPercentage -= 0.5;
          output += char;
        } else {
          break;
        }
      }
    }
    return `Колір маркеру [${this.color}]: ${output}<br>Залишку чорнил: ${this.inkPercentage}%<br>`;
  }
}

class RefillableMarker extends Marker {
  refill(amount = 100.0) {
    this.inkPercentage = Math.min(100.0, this.inkPercentage + amount);
    return `Маркер успішно заправлено. Рівень чорнил становить: ${this.inkPercentage}%<br>`;
  }
}
//task2
class ExtendedDate extends Date {
  toText() {
    const months = [
      "січня", "лютого", "березня", "квітня", 
      "травня", "червня", "липня", "серпня", 
      "вересня", "жовтня", "листопада", "грудня"
    ];
    return `${this.getDate()} ${months[this.getMonth()]}`;
  }

  isFutureOrCurrent() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentObj = new Date(this);
    currentObj.setHours(0, 0, 0, 0);
    return currentObj >= today;
  }

  isLeap() {
    const year = this.getFullYear();
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  nextDate() {
    const next = new Date(this);
    next.setDate(next.getDate() + 1);
    return new ExtendedDate(next.getFullYear(), next.getMonth(), next.getDate());
  }
}

//task3
class Employee {
  constructor(name, position, salary) {
    this.name = name;
    this.position = position;
    this.salary = salary;
  }
}

class EmpTable {
  constructor(employees) {
    this.employees = employees;
  }

  getHtml() {
    let html = "<table>\n";
    html += "  <tr><th>Ім'я</th><th>Посада</th><th>Зарплата (грн)</th></tr>\n";
    for (const emp of this.employees) {
      html += `  <tr><td>${emp.name}</td><td>${emp.position}</td><td>${emp.salary}</td></tr>\n`;
    }
    html += "</table>";
    return html;
  }
}
//task4
class StyledEmpTable extends EmpTable {
  getStyles() {
    return `<style>
    table {
        border-collapse: collapse;
        width: 100%;
        font-family: Arial, sans-serif;
        margin-top: 20px;
    }
    th, td {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 10px;
    }
    th {
        background-color: #f2f2f2;
        color: #333333;
    }
    tr:nth-child(even) {
        background-color: #f9f9f9;
    }
    </style>`;
  }

  getHtml() {
    const baseHtml = super.getHtml();
    const styles = this.getStyles();
    return `${styles}\n${baseHtml}`;
  }
}

//task1(TEST)
const markerColor = prompt("Введіть колір маркера:", "синій");
const markerInk = parseFloat(prompt("Введіть початковий рівень чорнил (у %):", "50"));
const textToPrint = prompt("Введіть текст для друку маркером:", "Привіт! Це тестування кількості чорнил.");

let markerLogs = "<h3>Результати Завдання 1 (Маркер):</h3>";

if (markerColor) {
  const marker = new RefillableMarker(markerColor, isNaN(markerInk) ? 100 : markerInk);
  markerLogs += marker.printText(textToPrint || "");
  
  if (confirm("Бажаєте заправити маркер?")) {
    const refillAmount = parseFloat(prompt("Скільки відсотків чорнил додати?", "50"));
    markerLogs += marker.refill(isNaN(refillAmount) ? 100 : refillAmount);
  }
}

const markerContainer = document.getElementById("marker-output");
if (markerContainer) {
  markerContainer.innerHTML = markerLogs;
}

//task2(TEST)
const userInput = prompt("Введіть дату в форматі: РРРР-ММ-ДД");
if (userInput) {
  const extDate = new ExtendedDate(userInput);
  if (isNaN(extDate.getTime())) {
    alert("Помилка! Ви ввели некоректну дату.");
  } else {
    alert(`Дата текстом: ${extDate.toText()}`);
    alert(`Чи є майбутньою: ${extDate.isFutureOrCurrent()}`);
    alert(`Чи є рік високосним: ${extDate.isLeap()}`);
    alert(`Наступна дата (об'єкт): ${extDate.nextDate().toDateString()}`);
  }
}
//task3and4(TEST)
const employeesList = [];
let addMore = true;
while (addMore) {
  const name = prompt("Введіть ПІБ працівника:");
  const position = prompt("Введіть посаду працівника:");
  const salary = parseFloat(prompt("Введіть зарплату (грн):"));

  if (name && position && !isNaN(salary)) {
    employeesList.push(new Employee(name, position, salary));
  } else {
    alert("Було введено не всі дані або помилка у зарплаті. Працівника не додано.");
  }

  addMore = confirm("Бажаєте додати ще одного працівника?");
}
if (employeesList.length === 0) {
  employeesList.push(new Employee("Олександр Петренко", "Менеджер", 35000));
}

const styledTable = new StyledEmpTable(employeesList);
const container = document.getElementById("table-container");
if (container) {
  container.innerHTML = styledTable.getHtml();
} else {
  const div = document.createElement("div");
  div.innerHTML = styledTable.getHtml();
  document.body.appendChild(div);
}