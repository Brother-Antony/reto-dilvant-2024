window.addEventListener('DOMContentLoaded', () => {
    renderRecipes()
    handleHamburgerClick()
    progreBar()
    copyrightYear()
    dropdownMenu()
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
    const hamBurger = document.getElementById('ham-burger')
    const header = document.querySelector('.header')
    const dropdownMenu = document.querySelector('.dropdown__menu')
    const bodyBlur = document.getElementById('body-blur')
    const chevron = document.querySelector('.header__nav--chevron')
    const closeDropdown = document.getElementById('close-dropdown')
    
    hamBurger.addEventListener('click', function() {
        header.classList.toggle('menu')
        this.classList.toggle('open')

        if (header.classList.contains('menu')) {
            document.body.classList.add('menu-overflow-hidden')
        } else {
            document.body.classList.remove("menu-overflow-hidden")
            dropdownMenu.classList.remove('show')
            chevron.classList.remove('rotate')
            bodyBlur.classList.remove('show')
            closeDropdown.classList.remove('active')
            header.classList.remove('prev')
            document.body.style.overflow = ''
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

function dropdownMenu() {
    const header = document.querySelector('.header')
    const dropdownToggle = document.querySelectorAll('.dropdown-toggle')
    const closeDropdown = document.getElementById('close-dropdown')
    const dropdownMenu = document.querySelector('.dropdown__menu')
    const bodyBlur = document.getElementById('body-blur')
    const chevron = document.querySelector('.header__nav--chevron')

    dropdownToggle.forEach((btn) => {
        btn.addEventListener('click', () => {
            dropdownMenu.classList.toggle('show')
            chevron.classList.toggle('rotate')
            closeDropdown.classList.toggle('active')
            header.classList.toggle('prev')

            if (dropdownMenu.classList.contains('show')) {
                bodyBlur.classList.add('show')
                document.body.style.overflow = 'hidden'
            } else {
                bodyBlur.classList.remove('show')
                document.body.style.overflow = ''
            }
        })
    })

    bodyBlur.addEventListener('click', () => {
        dropdownMenu.classList.remove('show')
        chevron.classList.remove('rotate')
        bodyBlur.classList.remove('show')
        closeDropdown.classList.remove('active')
        header.classList.remove('prev')
        document.body.style.overflow = ''
    })

    closeDropdown.addEventListener('click', () => {
        dropdownMenu.classList.remove('show')
        chevron.classList.remove('rotate')
        bodyBlur.classList.remove('show')
        closeDropdown.classList.remove('active')
        header.classList.remove('prev')
        document.body.style.overflow = ''
    })
}
