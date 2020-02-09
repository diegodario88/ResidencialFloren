import PlantaoService from "./plantaoService";
import Plantao from "../entities/Plantao";
import mainService from "./mainService";

export default class updateService {

    static async updatePlantao() {

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

            //Cria URL para busca no Google Places
            const name = plantaoAtual.farmacias![0].name;
            const end = plantaoAtual.farmacias![0].endereco;

            const nameParsed = name.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z\s])/g, '');
            const url =
                `https://www.google.com/maps/search/?api=1&query=${nameParsed},${end} - Loanda - PR`;

            textoEndPrincipal.setAttribute("href", url);

            //Atualiza TEL, e normalize para protocolo mobile
            textoTelPrincipal.innerHTML = plantaoAtual.farmacias![0].telefone;
            const tel = plantaoAtual.farmacias![0].telefone;
            const telparsed = tel.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');
            textoTelPrincipal.setAttribute("href", `tel:0${telparsed}`)

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

            //Cria URL para busca no Google Places
            const name = plantaoAtual.farmacias![1].name;
            const end = plantaoAtual.farmacias![1].endereco;

            const nameParsed = name.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z\s])/g, '');
            const url =
                `https://www.google.com/maps/search/?api=1&query=${nameParsed},${end} - Loanda - PR`;

            textoEndSec.setAttribute("href", url);

            //Atualiza TEL, e normalize para protocolo mobile
            textoTelSec.innerHTML = plantaoAtual.farmacias![1].telefone;
            const tel = plantaoAtual.farmacias![1].telefone;
            const telparsed = tel.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');
            textoTelSec.setAttribute("href", `tel:0${telparsed}`)

            relogioSecundario.textContent = "Aberto até: 22h00min";
        }

    }

}