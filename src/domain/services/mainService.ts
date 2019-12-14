import PlantaoService from "./plantaoService";
import Plantao from "../entities/Plantao";

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
    //função para formatar a data
    static dataAtualFormatada() {
        const data = new Date(), dia = data.getDate().toString(), diaF = (dia.length == 1) ? '0' + dia : dia, mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length == 1) ? '0' + mes : mes, anoF = data.getFullYear();
        return diaF + "/" + mesF + "/" + anoF;
    }

    //Função para atualizar o plantão
    static async atualizaPlantao() {

        const resultApiFloren = await PlantaoService.get();
        const plantaoAtual: Plantao = new Plantao(resultApiFloren);

        //Atualiza a Farmácia Principal
        const textoPrincipal = document.querySelector('#textoPrincipal');
        const textoDataPrincipal = document.querySelector('#textoDataPrincipal');
        const textoEndPrincipal = document.querySelector('#textoEndPrincipal');
        const textoTelPrincipal = document.querySelector('#textoTelPrincipal');
        const relogioPrincipal = document.querySelector('#relogioPrincipal');

        if (textoPrincipal != null && textoDataPrincipal != null && textoEndPrincipal != null
            && textoTelPrincipal != null && plantaoAtual != undefined && relogioPrincipal != null) {

            textoPrincipal.innerHTML = plantaoAtual.farmacias![0].name;

            textoDataPrincipal.innerHTML = "Plantão dia: " + mainService.dataAtualFormatada();

            textoEndPrincipal.innerHTML = plantaoAtual.farmacias![0].endereco;
            textoEndPrincipal.setAttribute("href",
                `geo: ${plantaoAtual.farmacias![0].geoloc.lat}, ${plantaoAtual.farmacias![0].geoloc.lng}`);


            textoTelPrincipal.innerHTML = plantaoAtual.farmacias![0].telefone;
            textoTelPrincipal.setAttribute('href', `tel:+55 ${plantaoAtual.farmacias![0].telefone}`)

            relogioPrincipal.textContent = "Aberto até: 22h00min";

        }

        //Atualiza a Farmácia Secundária
        const textoSec = document.querySelector('#textoSecundario');
        const textoDataSec = document.querySelector('#textoDataSecundario');
        const textoEndSec = document.querySelector('#textoEndSecundario');
        const textoTelSec = document.querySelector('#textoTelSecundario');
        const relogioSecundario = document.querySelector('#relogioSecundario');

        if (textoSec != null && textoDataSec != null && textoEndSec != null
            && textoTelSec != null && plantaoAtual != undefined && relogioSecundario != undefined) {

            textoSec.innerHTML = plantaoAtual.farmacias![1].name;

            textoDataSec.innerHTML = "Plantão dia: " + mainService.dataAtualFormatada();

            textoEndSec.innerHTML = plantaoAtual.farmacias![1].endereco;
            textoEndSec.setAttribute("href",
                `geo: ${plantaoAtual.farmacias![1].geoloc.lat}, ${plantaoAtual.farmacias![1].geoloc.lng}`);
            textoTelSec.innerHTML = plantaoAtual.farmacias![1].telefone;
            textoTelSec.setAttribute('href', `tel:+55 ${plantaoAtual.farmacias![1].telefone}`)
            relogioSecundario.textContent = "Aberto até: 22h00min";
        }

    }

    //Função para atualizar a data no rodapé da página
    static rodape(): void {
        const data = new Date();
        const ano = data.getFullYear();
        const footer = document.querySelector('#footer');
        if (footer != null) {
            footer.innerHTML += "&copy " + ano + "  Diego Dario All Rights Reserved ";
        }
    }

}

