document.addEventListener('DOMContentLoaded', function() {
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
})
