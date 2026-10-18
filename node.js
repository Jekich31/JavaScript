const addButton = document.querySelector(".add");
const inputWin = document.querySelector("input");
const errorMessage = document.querySelector("#error-message");
const goalList = document.querySelector("ul");
let tasks = [];

document.addEventListener("DOMContentLoaded", () => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        tasks.forEach(task => renderTask(task.text, task.completed));
        updateCounters();
        applyCurrentFilter();
    }
});

function saveTasksToStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask(text, isCompleted = false) {
    const newLi = document.createElement("li");
    if (isCompleted) {
        newLi.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = isCompleted;

    const span = document.createElement("span");
    span.textContent = text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Видалити";

    checkbox.addEventListener("change", () => {
        newLi.classList.toggle("completed", checkbox.checked);

        const taskObj = tasks.find(t => t.text === text);
        if (taskObj) {
            taskObj.completed = checkbox.checked;
            saveTasksToStorage();
        }
        
        updateCounters();
        applyCurrentFilter();
    });

    deleteBtn.addEventListener("click", () => {
        newLi.remove();

        tasks = tasks.filter(t => t.text !== text);
        saveTasksToStorage();
        
        updateCounters();
    });

    newLi.appendChild(checkbox);
    newLi.appendChild(span);
    newLi.appendChild(deleteBtn);

    goalList.appendChild(newLi);
}

addButton.addEventListener("click", (event) => {
    event.preventDefault();
    const text = inputWin.value.trim();

    if (text.length < 3 || text.length > 100) {
        errorMessage.textContent = "Довжина тексту повинна налічувати від 3 до 100 символів";
    } else {
        errorMessage.textContent = ""; 

        tasks.push({ text: text, completed: false });
        saveTasksToStorage();

        renderTask(text, false);

        const doneBtn = document.querySelector(".filter-done");
        if (doneBtn && doneBtn.classList.contains("active")) {
            const lastLi = goalList.lastChild;
            if (lastLi) lastLi.style.display = "none";
        }

        inputWin.value = "";
        inputWin.focus();
        updateCounters();
    }
});

function updateCounters() {
    const totalCount = document.querySelector("#total-count");
    const completedCount = document.querySelector("#completed-count");
    const emptyMessage = document.querySelector("#empty-message");

    const items = goalList.querySelectorAll("li");
    const completedItems = goalList.querySelectorAll("li.completed");

    totalCount.textContent = items.length;
    completedCount.textContent = completedItems.length;

    if (items.length > 0) {
        emptyMessage.style.display = "none";
    } else {
        emptyMessage.style.display = "block";
    }
}

function filterTasks(type) {
    const items = goalList.querySelectorAll("li");

    items.forEach(item => {
        const isCompleted = item.classList.contains("completed");

        if (type === "all") {
            item.style.display = "flex";
        } else if (type === "active") {
            item.style.display = isCompleted ? "none" : "flex";
        } else if (type === "completed") {
            item.style.display = isCompleted ? "flex" : "none";
        }
    });
}

function applyCurrentFilter() {
    const activeBtn = document.querySelector(".filter button.active");
    if (!activeBtn) return;

    if (activeBtn.classList.contains("filter-all") || activeBtn.textContent.includes("Всі")) {
        filterTasks("all");
    } else if (activeBtn.classList.contains("filter-active") || activeBtn.textContent.includes("Активні")) {
        filterTasks("active");
    } else if (activeBtn.classList.contains("filter-done") || activeBtn.textContent.includes("Виконані")) {
        filterTasks("completed");
    }
}

const filterButtons = document.querySelectorAll(".filter button");

filterButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");
        applyCurrentFilter();
    });
});