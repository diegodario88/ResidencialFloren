import { Plantao } from "../Entities/Plantao";
import { seedPlantao } from "./seedPlantao";

export class functions {
    constructor() {

    }

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
    static atualizaPagina(grupo: string) {

        const plantaoAtual: Plantao = functions.verificaPlantao(grupo);

        //Atualiza a Farmácia Principal
        const textoPrincipal = document.querySelector('#textoPrincipal');
        const textoDataPrincipal = document.querySelector('#textoDataPrincipal');
        const textoEndPrincipal = document.querySelector('#textoEndPrincipal');
        const textoTelPrincipal = document.querySelector('#textoTelPrincipal');

        if (textoPrincipal != null && textoDataPrincipal != null && textoEndPrincipal != null
            && textoTelPrincipal != null && plantaoAtual != undefined) {

            textoPrincipal.innerHTML = "" + plantaoAtual.farmaciaPrincipal.nome;

            textoDataPrincipal.innerHTML = "Plantão dia: " + functions.dataAtualFormatada();

            textoEndPrincipal.innerHTML = plantaoAtual.farmaciaPrincipal.endereco;

            textoTelPrincipal.innerHTML = plantaoAtual.farmaciaPrincipal.telefone;


        }

        //Atualiza a Farmácia Secundária
        const textoSec = document.querySelector('#textoSecundario');
        const textoDataSec = document.querySelector('#textoDataSecundario');
        const textoEndSec = document.querySelector('#textoEndSecundario');
        const textoTelSec = document.querySelector('#textoTelSecundario');

        if (textoSec != null && textoDataSec != null && textoEndSec != null
            && textoTelSec != null && plantaoAtual != undefined) {

            textoSec.innerHTML = "" + plantaoAtual.farmaciaSecundaria.nome;

            textoDataSec.innerHTML = "Plantão dia: " + functions.dataAtualFormatada();

            textoEndSec.innerHTML = plantaoAtual.farmaciaSecundaria.endereco;

            textoTelSec.innerHTML = plantaoAtual.farmaciaSecundaria.telefone;
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

    //Funcão verifica plantão
    static verificaPlantao(nome: string): Plantao {
        const data = new Date();
        const dia = data.getDay();
        let plantao: Plantao;

        if (dia > 0 && dia < 6) {
            //chama plantao semanal
            let listaPlantaoSemanal: Array<Plantao> = seedPlantao.SeedPlantaoSemanal();
            listaPlantaoSemanal.forEach(item => {
                if (item.nome == nome) {
                    plantao = item;
                    plantao.plantao = data;

                }
            });
            return plantao!;

        } else if (dia == 6) {
            //chama plantao de sábado
            let listaPlantaoSabado: Array<Plantao> = seedPlantao.SeedPlantaoSabado();
            listaPlantaoSabado.forEach(item => {
                if (item.nome === nome) {
                    plantao = item;
                    plantao.plantao = data;

                }
            });
            return plantao!;

        } else {
            //chama plantao de domingo
            let listaPlantaoDomingo: Array<Plantao> = seedPlantao.SeedPlantaoDomingo();
            listaPlantaoDomingo.forEach(item => {
                if (item.nome == nome) {
                    plantao = item;
                    plantao.plantao = data;

                }
            });
            return plantao!;
        }

    }

}

