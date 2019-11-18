//Função Scroll
function scrollAppear() {
    var textoColeta = document.querySelector('.intro-text')
    var introPosition = textoColeta.getBoundingClientRect().top
    var screenPosition = window.innerHeight / 2;



    if (introPosition < screenPosition) {
        textoColeta.classList.add('intro-appear')
    } else {
        textoColeta.classList.remove('intro-appear')
    }

}

window.addEventListener('scroll', scrollAppear)