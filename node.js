
const DEFAULT_COLORS = [
{ name: "YELLOWGREEN", type: "RGB", code: "154, 205, 50" },
{ name: "DARKCYAN", type: "RGBA", code: "0, 139, 139, 1" },
{ name: "ORANGERED", type: "HEX", code: "#FF4500" }
]

function setCookie(name, value, hours = 3) {
const jsonValue = JSON.stringify(value)
const maxAge = hours * 60 * 60
document.cookie = `${name}=${encodeURIComponent(jsonValue)} max-age=${maxAge} path=/`
}

function getCookie(name) {
const cookies = document.cookie.split('')
for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim()
    if (cookie.startsWith(name + '=')) {
        const cookieValue = cookie.substring(name.length + 1)
        try {
            const parsed = JSON.parse(decodeURIComponent(cookieValue))
            if (Array.isArray(parsed)) {
                return parsed
            }
        } 
        catch (error) {
            console.warn("Could not parse cookie, returning default values:", error)
        }
    }
}

setCookie(name, DEFAULT_COLORS, 3)
return DEFAULT_COLORS
}

function renderColors() {
const paletteContainer = document.getElementById("colors-palette")
if (!paletteContainer) return

paletteContainer.innerHTML = ""
const colors = getCookie("colors")

if (colors.length === 0) {
    paletteContainer.innerHTML = '<div class="no-colors">No colors created yet.</div>'
    return
}

colors.forEach(item => {
    const card = document.createElement("div")
    card.classList.add("color-card")

    if (item.type === "RGB") {
        card.style.backgroundColor = `rgb(${item.code})`
    } 
    else if (item.type === "RGBA") {
        card.style.backgroundColor = `rgba(${item.code})`
    } 
    else if (item.type === "HEX") {
        card.style.backgroundColor = item.code
    }

    card.innerHTML = `
        <h3>${item.name.toUpperCase()}</h3>
        <p>${item.type}</p>
        <p>${item.code}</p>
    `

    paletteContainer.appendChild(card)
})
}

document.addEventListener("DOMContentLoaded", () => {
const form = document.getElementById("color-form")
const nameInput = document.getElementById("color-name")
const typeSelect = document.getElementById("color-type")
const codeInput = document.getElementById("color-code")
const nameError = document.getElementById("name-error")
const codeError = document.getElementById("code-error")

renderColors()

nameInput.addEventListener("input", () => { nameError.textContent = "" })
codeInput.addEventListener("input", () => { codeError.textContent = "" })

form.addEventListener("submit", (event) => {
    event.preventDefault()

    const colorName = nameInput.value.trim()
    const colorType = typeSelect.value
    const colorCode = codeInput.value.trim()

    let isValid = true
    const currentColors = getCookie("colors")

    if (colorName === "") {
        nameError.textContent = "Color name is required"
        isValid = false
    } 
    else if (!/^[A-Za-zА-Яа-яЁёІіЇїЄє]+$/.test(colorName)) {
        nameError.textContent = "Color can only contain letters"
        isValid = false
    } 
    else {
        const isDuplicate = currentColors.some(
            item => item.name.toLowerCase() === colorName.toLowerCase()
        )
        if (isDuplicate) {
            nameError.textContent = "Color name must be unique"
            isValid = false
        } 
        else {
            nameError.textContent = ""
        }
    }


    if (colorType === "RGB") {

        const rgbPattern = /^([0-1]?[0-9]?[0-9]|2[0-4][0-9]|25[5]),\s*([0-1]?[0-9]?[0-9]|2[0-4][0-9]|25[5]),\s*([0-1]?[0-9]?[0-9]|2[0-4][0-9]|25[5])$/
        if (!rgbPattern.test(colorCode)) {
            codeError.textContent = "RGB code must match the pattern [0-255], [0-255], [0-255]"
            isValid = false
        } 
        else {
            codeError.textContent = ""
        }
    } 
    else if (colorType === "RGBA") {

        const rgbaPattern = /^([0-1]?[0-9]?[0-9]|2[0-4][0-9]|25[5]),\s*([0-1]?[0-9]?[0-9]|2[0-4][0-9]|25[5]),\s*([0-1]?[0-9]?[0-9]|2[0-4][0-9]|25[5]),\s*(0|1|0?\.\d+)$/
        if (!rgbaPattern.test(colorCode)) {
            codeError.textContent = "RGBA code must match the pattern [0-255], [0-255], [0-255], [0-1]"
            isValid = false
        } 
        else {
            codeError.textContent = ""
        }
    } 
    else if (colorType === "HEX") {

        const hexPattern = /^#[0-9A-Fa-f]{6}$/
        if (!hexPattern.test(colorCode)) {
            codeError.textContent = "HEX code must match the pattern #XXXXXX"
            isValid = false
        } 
        else {
            codeError.textContent = ""
        }
    }

    if (isValid) {
        const newColor = {
            name: colorName,
            type: colorType,
            code: colorCode
        }

        currentColors.push(newColor)
        setCookie("colors", currentColors, 3)
        
        form.reset()
        renderColors()
    }
})
})