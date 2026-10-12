class Circle {
    constructor(radius) {
        this._radius = radius;
    }
    get radius() {
        return this._radius;
    }
    set radius(value) {
        if (value <= 0) {
            throw new Error("Радіус має бути більшим за нуль.");
        }
        this._radius = value;
    }
    get diameter() {
        return this._radius * 2;
    }
    getArea() {
        return Math.PI * Math.pow(this._radius, 2);
    }
    getCircumference() {
        return 2 * Math.PI * this._radius;
    }
}

const answer=Number(prompt("Введіть радіус кола:"))
    const userRadius = Number(answer);
    const myCircle = new Circle(userRadius);

    alert(`Радіус: ${myCircle.radius}`);
    alert(`Діаметр: ${myCircle.diameter}`);
    alert(`Площа: ${myCircle.getArea().toFixed(2)}`);
    alert(`Довжина кола: ${myCircle.getCircumference().toFixed(2)}`);

const answer2=Number(prompt("Введіть новий радіус кола:"))
    myCircle.radius = Number(answer2);
    alert(`Новий діаметр після зміни радіуса: ${myCircle.diameter}`);
    readline.close()