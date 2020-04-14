import Api from "./api";
import dateHandler from "../shared/date-handler";
import stringUtils from "../shared/string-utils";
import Pharmacy from "../entities/Pharmacy";

export default class UpdateOnCall {
  static async updateOnCallPharmacy() {
    const { farmacias } = await Api.get("plantoes/atual");
    const mainPharma = new Pharmacy(
      farmacias[0].name,
      farmacias[0].telefone,
      farmacias[0].endereco
    );
    const secPharma = new Pharmacy(
      farmacias[1].name,
      farmacias[1].telefone,
      farmacias[1].endereco
    );
    const onCallDiv = document.getElementById("onCall");
    const renderCard = (pharmacy: Pharmacy): string => {
    return `
        <div class="container">
            <section class="card">
            <h1 class="card-title loading">${pharmacy.name}</h1>
                <p class="card-date loading">
                Plantão dia: ${dateHandler.toDateFormated(new Date())}
                </p>
                <div class="card-detail">
                    <p class="card-description loading">
                        <i class='far fa-building'></i>&nbsp;&nbsp; 
                        <a 
                        id="textoEndPrincipal" 
                        href="${stringUtils.makeUrl(pharmacy.name, pharmacy.adress)}">
                            ${pharmacy.adress}
                        </a>
                        <br>
                        <i id="fone" class='fas fa-phone'></i>&nbsp;&nbsp; 
                        <a class="phone-text" 
                        href="tel:0${stringUtils.normalize(pharmacy.phone)}">
                            ${pharmacy.phone}
                        </a>
                        <br>
                        <i id="clock" class='far fa-clock'></i>&nbsp;&nbsp; 
                        <a style="color: #dfe0e0;">
                        Aberto até: 22h00min
                        </a>
                    </p>
                </div>
            </section>
        </div>
        `;
    };
    const removeLoadingClass = () => {
        const cardTitle = document.querySelectorAll('.card-title');
        const cardDate = document.querySelectorAll('.card-date');
        const cardDesc = document.querySelectorAll('.card-description');
        cardTitle!.forEach(item => item.classList.remove('loading')) 
        cardDesc!.forEach(item => item.classList.remove('loading')) 
        cardDate!.forEach(item => item.classList.remove('loading')) 
    }
    const renderButtons = () => {
        return `
        <div class="buttons">
                <a href="#calendario" id="btnCalendario" class="animated bounceInLeft slow">
                    <i class="far fa-calendar-alt"></i>
                    <span>Gerar Calendário</span></a>
                <a href="#contato" id="btnContato" class="animated bounceInRight slow">
                    <i class="fas fa-wrench"></i>
                    <span>Relatar Problema</span></a>
        </div>`
    }
    if (onCallDiv !== null) {
      onCallDiv.innerHTML = `
        <div class="magictime vanishIn">
           ${renderCard(mainPharma)}
            <br>
            ${renderCard(secPharma)}
            <br>
            <hr id="espacoMagro">
            <br>
            ${renderButtons()}
        </div>`;
    removeLoadingClass()
    }
  }
}
