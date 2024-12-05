window.addEventListener('DOMContentLoaded', () => {
    renderRecipes()
    handleHamburgerClick()
    progreBar()
    copyrightYear()
})

async function renderRecipes() {
    const recipesList = document.querySelector(".recipes__list")

    fetch('./data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON')
            }
            return response.json()
        })
        .then(data => {
            const { recetas } = data

            recetas.forEach(receta => {
                const recetaItem = document.createElement('a')
                recetaItem.href = receta.href
                recetaItem.target = '_blank'
                recetaItem.className = 'recipes__item'

                recetaItem.innerHTML = `
                    <img src="${receta.image}" alt="${receta.title}" class="recipes__item--image">
                    <h3 class="recipes__item--title">${receta.title}</h3>
                `

                recipesList.appendChild(recetaItem)
            })
        })
        .catch(error => {
            console.error('Hubo un problema al cargar las recetas:', error)
        })
}

function handleHamburgerClick() {
    let hamBurger = document.getElementById('ham-burger')
    let header = document.querySelector('.header')
    
    hamBurger.addEventListener('click', function() {
        header.classList.toggle('menu')
        this.classList.toggle('open')

        if (header.classList.contains('menu')) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
    })
}

function copyrightYear() {
    const yearElements = document.querySelectorAll('.currentYear')
    const currentYear = new Date().getFullYear()

    yearElements.forEach(element => {
        element.innerHTML = currentYear
    })
}

function progreBar() {
    let progress = 0
    let interval = setInterval(() => {
        if (progress < 100) {
            progress += Math.random() * 10
            if (progress > 100) progress = 100
            document.getElementById('progressBar').style.width = progress + '%'
        } else {
            clearInterval(interval)
            document.getElementById('content-dilvant').style.display = 'block'
            document.getElementById('loading').remove()
        }
    }, 300)
}
