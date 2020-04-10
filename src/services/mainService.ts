export default class mainService {

    //Função NavBar
    static navSlide = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav-links');
        const navLinks = <HTMLElement[]><any>document.querySelectorAll('.nav-links li')

        burger!.addEventListener('click', () => {
            //Toggle Nav
            nav!.classList.toggle('nav-active');

            //Animate Links
            navLinks.forEach((link, index) => {

                if (link.style.animation) {
                    link.style.animation = '';

                } else {
                    link.style.animation = `navLinkFadeIn 0.5s ease forwards ${index / 7 + 0.3}s`;
                }

            });

            //Burger Animation
            burger!.classList.toggle('toggle');
        });
    }

    //Função Scroll
    static scrollAppear() {
        const textoColeta = document.querySelector('.intro-text')
        const introPosition = textoColeta!.getBoundingClientRect().top
        const screenPosition = window.innerHeight / 2;

        if (introPosition < screenPosition) {
            textoColeta!.classList.add('intro-appear')

        } else {
            textoColeta!.classList.remove('intro-appear')
        }

    }
    //Formatar a data
    static dataAtualFormatada() {
        const data = new Date(), dia = data.getDate().toString(), diaF = (dia.length == 1) ? '0' + dia : dia, mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length == 1) ? '0' + mes : mes, anoF = data.getFullYear();
        return diaF + "/" + mesF + "/" + anoF;
    }

    //Atualizar a data no rodapé da página
    static rodape(): void {
        const data = new Date();
        const ano = data.getFullYear();
        const footer = document.querySelector('#footer');
        if (footer != null) {
            footer.innerHTML += "&copy " + ano + "  Diego Dario All Rights Reserved ";
        }
    }

}

