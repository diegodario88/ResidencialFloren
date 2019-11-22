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


    //função para formatar a data
    static dataAtualFormatada() {
        let data = new Date(), dia = data.getDate().toString(), diaF = (dia.length == 1) ? '0' + dia : dia, mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = (mes.length == 1) ? '0' + mes : mes, anoF = data.getFullYear();
        return diaF + "/" + mesF + "/" + anoF;
    }

    //Função para atualizar o plantão
    static atualizaPagina(grupo: string) {

        let listaPlantao: Array<Plantao> = seedPlantao.SeedPlantao();
        let plantaoAtual: Plantao | undefined;

        if (grupo != null) {
            listaPlantao.forEach(item => {
                if (item.nome == grupo) {
                    plantaoAtual = item;
                }
            })
        }


        //Atualiza a Farmácia Principal
        let textoPrincipal = document.querySelector('#textoPrincipal');
        let textoDataPrincipal = document.querySelector('#textoDataPrincipal');
        let textoEndPrincipal = document.querySelector('#textoEndPrincipal');
        let textoTelPrincipal = document.querySelector('#textoTelPrincipal');

        if (textoPrincipal != null && textoDataPrincipal != null && textoEndPrincipal != null
            && textoTelPrincipal != null && plantaoAtual != undefined) {


            textoPrincipal.innerHTML = "" + plantaoAtual.farmaciaPrincipal.nome;

            textoDataPrincipal.innerHTML = "Plantão dia: " + functions.dataAtualFormatada();

            textoEndPrincipal.innerHTML = plantaoAtual.farmaciaPrincipal.endereco;


            textoTelPrincipal.innerHTML = plantaoAtual.farmaciaPrincipal.telefone;
        }

        //Atualiza a Farmácia Secundária
        let textoSec = document.querySelector('#textoSecundario');
        let textoDataSec = document.querySelector('#textoDataSecundario');
        let textoEndSec = document.querySelector('#textoEndSecundario');
        let textoTelSec = document.querySelector('#textoTelSecundario');

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
        let data = new Date();
        let ano = data.getFullYear();
        let footer = document.querySelector('#footer');
        if (footer != null) {
            footer.innerHTML += "&copy " + ano + "  Diego Dario All Rights Reserved ";
        }

    }

}

