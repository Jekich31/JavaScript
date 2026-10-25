
let currentSearch = {
    title: '',
    type: '',
    page: 1,
    totalResults: 0
}

const searchForm = document.getElementById('search-form')
const apiKeyInput = document.getElementById('api-key')
const titleInput = document.getElementById('title')
const typeSelect = document.getElementById('type')

const statusMessage = document.getElementById('status-message')
const filmsSection = document.getElementById('films-section')
const filmsList = document.getElementById('films-list')
const pagination = document.getElementById('pagination')
const detailsSection = document.getElementById('details-section')
const detailsContent = document.getElementById('details-content')

searchForm.addEventListener('submit', function(e) {
    e.preventDefault()
    
    const title = titleInput.value.trim()
    const type = typeSelect.value

    if (!title) return

    currentSearch.title = title
    currentSearch.type = type
    currentSearch.page = 1

    detailsSection.classList.add('hidden')
    
    fetchMovies(currentSearch.title, currentSearch.type, currentSearch.page)
})

function fetchMovies(title, type, page) {
    const apiKey = apiKeyInput.value.trim()
    if (!apiKey) {
    statusMessage.textContent = 'Будь ласка, вкажіть API Key!'
    return
    }

    statusMessage.textContent = 'Завантаження...'
    filmsSection.classList.add('hidden')

    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(title)}&type=${type}&page=${page}`

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.Response === "True") {
        statusMessage.textContent = ''
        currentSearch.totalResults = parseInt(data.totalResults, 10)
        renderFilms(data.Search)
        renderPagination()
        filmsSection.classList.remove('hidden')
        } 
        else {
        statusMessage.textContent = 'Movie not found!'
        filmsSection.classList.add('hidden')
        }
    })
    .catch(error => {
        console.error('Помилка запиту:', error)
        statusMessage.textContent = 'Помилка при виконанні запиту!'
        filmsSection.classList.add('hidden')
    })
}

function renderFilms(films) {
    filmsList.innerHTML = ''

    films.forEach(film => {
    const posterUrl = (film.Poster && film.Poster !== 'N/A') 
        ? film.Poster 
        : 'https://via.placeholder.com/90x130?text=No+Image'

    const card = document.createElement('div')
    card.className = 'film-card'
    card.innerHTML = `
        <img class="film-poster" src="${posterUrl}" alt="${film.Title}">
        <div class="film-info">
        <div>
            <div class="film-type">${film.Type}</div>
            <div class="film-title">${film.Title}</div>
            <div class="film-year">${film.Year}</div>
        </div>
        <button class="btn btn-details" onclick="fetchMovieDetails('${film.imdbID}')">Details</button>
        </div>
    `
    filmsList.appendChild(card)
    })
}

function renderPagination() {
    pagination.innerHTML = ''
    const totalPages = Math.ceil(currentSearch.totalResults / 10)

    if (totalPages <= 1) return

    const prevBtn = document.createElement('button')
    prevBtn.textContent = '<<'
    prevBtn.disabled = currentSearch.page === 1
    prevBtn.addEventListener('click', () => goToPage(currentSearch.page - 1))
    pagination.appendChild(prevBtn)

    let startPage = Math.max(1, currentSearch.page - 2)
    let endPage = Math.min(totalPages, startPage + 5)
    if (endPage - startPage < 5) {
    startPage = Math.max(1, endPage - 5)
    }

    for (let i = startPage; i <= endPage; i++) {
    const pageBtn = document.createElement('button')
    pageBtn.textContent = i
    if (i === currentSearch.page) {
        pageBtn.classList.add('active')
    }
    pageBtn.addEventListener('click', () => goToPage(i))
    pagination.appendChild(pageBtn)
    }

    const nextBtn = document.createElement('button')
    nextBtn.textContent = '>>'
    nextBtn.disabled = currentSearch.page === totalPages
    nextBtn.addEventListener('click', () => goToPage(currentSearch.page + 1))
    pagination.appendChild(nextBtn)
}

function goToPage(page) {
    currentSearch.page = page
    fetchMovies(currentSearch.title, currentSearch.type, currentSearch.page)
}

function fetchMovieDetails(imdbID) {
    const apiKey = apiKeyInput.value.trim()
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.Response === "True") {
        renderDetails(data)
        detailsSection.classList.remove('hidden')
        detailsSection.scrollIntoView({ behavior: 'smooth' })
        }
    })
    .catch(error => {
        console.error('Помилка завантаження деталей:', error)
    })
}

function renderDetails(film) {
    const posterUrl = (film.Poster && film.Poster !== 'N/A') 
    ? film.Poster 
    : 'https://via.placeholder.com/220x320?text=No+Image'

    detailsContent.innerHTML = `
    <img class="details-poster" src="${posterUrl}" alt="${film.Title}">
    <table class="details-table">
        <tr>
        <td class="label">Title:</td>
        <td>${film.Title}</td>
        </tr>
        <tr>
        <td class="label">Released:</td>
        <td>${film.Released}</td>
        </tr>
        <tr>
        <td class="label">Genre:</td>
        <td>${film.Genre}</td>
        </tr>
        <tr>
        <td class="label">Country:</td>
        <td>${film.Country}</td>
        </tr>
        <tr>
        <td class="label">Director:</td>
        <td>${film.Director}</td>
        </tr>
        <tr>
        <td class="label">Writer:</td>
        <td>${film.Writer}</td>
        </tr>
        <tr>
        <td class="label">Actors:</td>
        <td>${film.Actors}</td>
        </tr>
        <tr>
        <td class="label">Awards:</td>
        <td>${film.Awards}</td>
        </tr>
    </table>
    `
}