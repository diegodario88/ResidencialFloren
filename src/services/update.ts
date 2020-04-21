import Api from "./api";
import dateHandler from "../shared/date-handler";
import stringUtils from "../shared/string-utils";
import Pharmacy from "../entities/Pharmacy";
import moment from "moment";
import calendar from "./calendar";

export default class UpdateOnCall {
  static async updateOnCallPharmacy() {
    
    const todayDate = moment(new Date()).format("YYYY-MM-DD");
    const currentMonth = dateHandler.months[moment(todayDate).month()];
    const localStorageMonth = localStorage.getItem(currentMonth) as any;
    const result = JSON.parse(localStorageMonth);
    let currentOnCallLocalDate = ''
    
    if (result) {
      currentOnCallLocalDate = result.find(
       (item: string[]) => item[0] === todayDate
     ) || '';
    }

    const { farmacias, name, escalaSemanal, escalaSabado, escalaDomingo } =
      currentOnCallLocalDate[1] || (await Api.get("plantoes/atual"));
    const scaleDates = [escalaSemanal, escalaSabado, escalaDomingo];
    //Adicionar lib offline para avisar app pwa
   // const onCallDate = moment(new Date(dateHandler.verifyDay(scaleDates)));
   // const currentInitialDate = moment().startOf("day");
    const { firstDate, secondDate } = calendar.getCurrentPeriod(
      `${dateHandler.currentYear}-${dateHandler.currentMonth}`
    );

    calendar.getFutureOnCallDates(firstDate || "", secondDate || "");
    
    
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
            <h1 class="card-title">${pharmacy.name}</h1>
                <div class="card-detail">
                    <p class="card-description">
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
                    </p>
                </div>
            </section>
        </div>
        `;
    };
    
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
        <div class="magictime spaceInUp">
           ${renderCard(mainPharma)}
            <br>
            ${renderCard(secPharma)}
            <br>
            <p class="card-date">
            Plantão dia: ${
                dateHandler.toDateFormated(new Date(dateHandler.verifyDay(scaleDates)))}
            </p>
            <p class="card-date">
            Aberto até: 22h00min
            </p>
            <p class="card-date">
            Escala: ${name}
            </p>
            <br>
            <hr id="espacoMagro">
            <br>
            ${renderButtons()}
        </div>`;
    }
  }
}
