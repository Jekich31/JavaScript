//task1
function doubleElement(element) {
  return element * 2
}

function reverseElement(element) {
  return String(element).split("").reverse().join("")
}

function processArray(array, callback) {
  const result = []
  for (let i = 0; i < array.length; i++) {
    result.push(callback(array[i]))
  }
  return result
}

console.log(processArray([1, 2, 3, 4, 5], doubleElement)) // [2, 4, 6, 8, 10] 
console.log(processArray(["hello", "world"], reverseElement))// ["olleh", "dlrow"]

//task2
function isEven(number) {
  return number % 2 === 0
}

function isShortWord(word) {
  return word.length <= 4
}

function filterArray(array, callback) {
  const result = []
  for (let i = 0; i < array.length; i++) {
    if (callback(array[i])) {
      result.push(array[i])
    }
  }
  return result
}

console.log(filterArray([1, 2, 3, 4, 5], isEven))
console.log(filterArray(["cat", "elephant", "dog", "bird"], isShortWord))

//task3
function washDishes() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Посуд вимито")
    }, 2000)
  })
}

function cleanRoom() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Кімнату прибрано")
    }, 4000)
  })
}

function makeDinner() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Вечеря приготована")
    }, 7000)
  })
}

washDishes()
  .then((result1) => {
    console.log(result1)
    return cleanRoom()
  })
  .then((result2) => {
    console.log(result2)
    return makeDinner()
  })
  .then((result3) => {
    console.log(result3)
  })
  .catch((error) => {
    console.error("Сталася помилка:", error)
  })

//task4

function sortArray(array) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(array) || array.length === 0) {
      reject("Масив порожній")
      return
    }

    setTimeout(() => {
      const sorted = [...array].sort((a, b) => a - b)
      resolve(sorted)
    }, 2000)
  })
}

sortArray([5, 2, 9, 1, 7])
  .then((res) => console.log("Відсортовано:", res))
  .catch((err) => console.error(err))

sortArray([])
  .then((res) => console.log("Відсортовано:", res))
  .catch((err) => console.error(err))

//task5

function multiplyAsync(a, b) {
  return new Promise((resolve, reject) => {
    if (typeof a !== "number" || typeof b !== "number" || isNaN(a) || isNaN(b)) {
      reject("Некоректні значення")
      return
    }

    setTimeout(() => {
      resolve(a * b)
    }, 2000)
  })
}

async function main() {
  try {
    const result = await multiplyAsync(6, 9)
    console.log("Результат множення:", result)
  } catch (error) {
    console.error("Помилка:", error)
  }
}

main()


//task6

function sortArrayAsync(array) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(array) || array.length === 0) {
      reject(new Error("Масив порожній"))
      return
    }

    setTimeout(() => {
      const sorted = [...array].sort((a, b) => a - b)
      resolve(sorted)
    }, 2000)
  })
}

async function main() {
  try {
    const numbers = [42, 7, 19, 3, 88, 1]
    console.log("Починаємо сортування...")
    
    const result = await sortArrayAsync(numbers)
    console.log("Відсортований масив:", result)
  } catch (error) {
    console.error("Помилка:", error.message)
  }
}

main()