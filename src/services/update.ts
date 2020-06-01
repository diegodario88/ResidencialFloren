import Storage from './storage'
import Date from '../shared/date-handler'
import Utils from '../shared/string-utils'
import { OnCallGroup, Pharmacy } from '../entities/OnCallGroup'

export default class UpdateOnCall {
 
  private static renderCard = ({ name, phone, address}: Pharmacy ): string => `
        <div class="container">
            <section class="card">
            <h1 class="card-title">${name}</h1>
                <div class="card-detail">
                    <p>
                        <i class='far fa-building'></i>&nbsp;&nbsp; 
                        <a 
                        id="textoEndPrincipal" 
                        href="${Utils.makeUrl(name, address)}">
                            ${address}
                        </a>
                        <br>
                        <i id="fone" class='fas fa-phone'></i>&nbsp;&nbsp; 
                        <a class="phone-text" 
                        href="tel:0${Utils.normalize(phone)}">
                            ${phone}
                        </a>
                        <br>
                    </p>
                </div>
            </section>
        </div>
        `

  private static renderButtons = (): string => `
        <div class="buttons">
                <a href="#calendario" id="btnCalendario" class="animated bounceInLeft slow">
                    <i class="far fa-calendar-alt"></i>
                    <span>Gerar Calendário</span></a>
                <a href="#contato" id="btnContato" class="animated bounceInRight slow">
                    <i class="fas fa-wrench"></i>
                    <span>Relatar Problema</span></a>
        </div>`

  private static renderOnCallGroup = (OnCallToday: OnCallGroup | undefined): string | undefined => {
    if (OnCallToday !== undefined) {
      const { day, group, pharmacies: [mainPharma, secPharma] } = OnCallToday
          
      return  `
            <div class="animated fadeIn">
               ${UpdateOnCall.renderCard(mainPharma)}
                <p class="card-detail-scale">
                Escala ${group}
                </p>
                ${UpdateOnCall.renderCard(secPharma)}
                <br>
                <p class="card-detail card-detail-date">
                Plantão dia: ${Date.toDateFormated(Date.toDate(day))}
                </p>
                <p>
                Aberto até: 22h00min
                </p>
                <br>
                <hr id="espacoMagro">
                <br>
                ${UpdateOnCall.renderButtons()}
            </div>`
    }
  }

  static async updateOnCallPharmacy(): Promise<void> {
    const elementOnCall = document.getElementById('onCall')
    
    await Storage.feedCalendarInLocalStorage()
    await Storage.feedCurrentGroupInLocalStorage()
    
    const currentGroup: OnCallGroup | undefined = Storage.findCurrentGroupInLocalStorage()

    elementOnCall ? elementOnCall.innerHTML = this.renderOnCallGroup(currentGroup) || '' 
      : null
  }
}
