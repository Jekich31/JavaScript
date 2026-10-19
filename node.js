    const products = [
        { id: 1, name: "Ноутбук", price: 1200 },
        { id: 2, name: "Телефон", price: 800 },
        { id: 3, name: "Навушники", price: 200 }
    ]
    let cart = []

    const productsContainer = document.getElementById("productsContainer")
    const cartContainer = document.getElementById("cartContainer")
    const cartCountEl = document.getElementById("cartCount")
    const cartTotalEl = document.getElementById("cartTotal")
    const searchInput = document.getElementById("searchInput")
    const themeToggleBtn = document.getElementById("themeToggleBtn")
    const emptyCartBtn = document.getElementById("emptyCartBtn")

    function renderProducts(items) {
        productsContainer.textContent = ""

        if (items.length === 0) {
            const p = document.createElement("p")
            p.textContent = "Нічого не знайдено"
            productsContainer.appendChild(p)
            return
        }

        items.forEach(product => {
            const card = document.createElement("div")
            card.className = "card"

            const info = document.createElement("div")
            const title = document.createElement("strong")
            title.textContent = product.name
            const price = document.createElement("div")
            price.textContent = `$${product.price}`

            info.appendChild(title)
            info.appendChild(price)

            const btn = document.createElement("button")
            btn.className = "btn-primary"
            btn.textContent = "Додати в кошик"
            btn.setAttribute("data-product-id", product.id)

            card.appendChild(info)
            card.appendChild(btn)
            productsContainer.appendChild(card)
        })
    }

    function renderCart() {
        cartContainer.textContent = ""

        if (cart.length === 0) {
            cartContainer.textContent = "Кошик порожній"
            cartCountEl.textContent = "0"
            cartTotalEl.textContent = "0"
            return
        }

        let totalCount = 0
        let totalPrice = 0

        cart.forEach(item => {
            totalCount += item.quantity
            totalPrice += item.price * item.quantity

            const cartItemEl = document.createElement("div")
            cartItemEl.className = "cart-item"

            const textSpan = document.createElement("span")
            textSpan.textContent = `${item.name} (${item.quantity} шт.) - $${item.price * item.quantity}`

            const removeBtn = document.createElement("button")
            removeBtn.className = "btn-danger"
            removeBtn.textContent = "Видалити"
            removeBtn.setAttribute("data-cart-id", item.id)

            cartItemEl.appendChild(textSpan)
            cartItemEl.appendChild(removeBtn)
            cartContainer.appendChild(cartItemEl)
        })

        cartCountEl.textContent = totalCount
        cartTotalEl.textContent = totalPrice
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === Number(productId))
        if (!product) return

        const existingItem = cart.find(item => item.id === product.id)
        if (existingItem) {
            existingItem.quantity += 1
        } else {
            cart.push({ ...product, quantity: 1 })
        }

        renderCart()
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== Number(productId))
        renderCart()
    }

    function emptyCart() {
        cart = []
        renderCart()
    }

    productsContainer.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-product-id]")
        if (button) {
            const productId = button.getAttribute("data-product-id")
            addToCart(productId)
        }
    })

    cartContainer.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-cart-id]")
        if (button) {
            const productId = button.getAttribute("data-cart-id")
            removeFromCart(productId)
        }
    })

    emptyCartBtn.addEventListener("click", emptyCart)

    searchInput.addEventListener("input", (event) => {
        const query = event.target.value.toLowerCase().trim()
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(query)
        )
        renderProducts(filteredProducts)
    })

    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode")
        const isDark = document.body.classList.contains("dark-mode")
        themeToggleBtn.textContent = isDark ? "Світла тема" : "Темна тема"
    })

    renderProducts(products)