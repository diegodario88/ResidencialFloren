import Api from './api'
import Date from '../shared/date-handler'
import Utils from '../shared/string-utils'

export default class UpdateOnCall {
  private static tomorrowDate = Date.tomorrowDay.format('YYYY-MM-DD')
  private static totalMonthsLocal = (Date.months.length - Date.currentMonthNumber)

  private static findCurrentGroupInLocalStorage(){
    const localStorageMonth = localStorage.getItem(Date.currentMonthPTBR) as string
    const result : any[] | null = localStorageMonth ? Object.values(JSON.parse(localStorageMonth)) : null
    let localStorageData = null
    if (result) {
      const todayDateLocalStorage = result
        .find(({ day }) => day === Date.todayDate.format('YYYY-MM-DD'))
      localStorageData = todayDateLocalStorage
    }
    return localStorageData
  }

  private static async feedCalendarInLocalStorage(){
    if (localStorage.length < this.totalMonthsLocal) {
      localStorage.clear()
      console.log('🤖 getting data from Api and feeding localStorage')
      const fullCalendarFromApi = await Api.post('plantoes/future', {
        firstDate: this.tomorrowDate,
        secondDate: '2020-12-31'
      })
      const fullCalendarMonths = fullCalendarFromApi
        .map((month: string ) => Object.values(month))

      fullCalendarFromApi.forEach((item: string, index: string | number) => {
        if (item !== undefined) {
          const [monthName] = Object.keys(item)
          const [daysInMonth] = fullCalendarMonths[index]
          localStorage.setItem(monthName, JSON.stringify(daysInMonth))
        }
      })
    }

    if (!this.findCurrentGroupInLocalStorage()) {
      const { farmacias, name } = await Api.get('plantoes/atual')
      const todayObjToSave = {
        day: Date.todayDate.format('YYYY-MM-DD'),
        pharmacys: farmacias,
        group: name
      }
      const existing = localStorage.getItem(Date.currentMonthPTBR)
      const existingParsed : any[] = existing !== null ? Object.values(JSON.parse(existing)) : []

      existingParsed.unshift(todayObjToSave)
      const data = existingParsed ? existingParsed : todayObjToSave
      localStorage.setItem(`${Date.currentMonthPTBR}`, JSON.stringify(data))
      console.log('🤖 feeding today date')
    }
  }

  static async updateOnCallPharmacy () {
    const elementOnCall = document.getElementById('onCall')
    
    await this.feedCalendarInLocalStorage()

    interface Pharmacy {
      name: string,
      telefone: string,
      endereco: string
    }

    interface OnCallGroup {
      day: string,
      pharmacys: Pharmacy[],
      group: string
    }
  
    const renderCard = ({ name, telefone, endereco} : Pharmacy ): string => `
        <div class="container">
            <section class="card">
            <h1 class="card-title">${name}</h1>
                <div class="card-detail">
                    <p>
                        <i class='far fa-building'></i>&nbsp;&nbsp; 
                        <a 
                        id="textoEndPrincipal" 
                        href="${Utils.makeUrl(name, endereco)}">
                            ${endereco}
                        </a>
                        <br>
                        <i id="fone" class='fas fa-phone'></i>&nbsp;&nbsp; 
                        <a class="phone-text" 
                        href="tel:0${Utils.normalize(telefone)}">
                            ${telefone}
                        </a>
                        <br>
                    </p>
                </div>
            </section>
        </div>
        `

    const renderButtons = (): string => `
        <div class="buttons">
                <a href="#calendario" id="btnCalendario" class="animated bounceInLeft slow">
                    <i class="far fa-calendar-alt"></i>
                    <span>Gerar Calendário</span></a>
                <a href="#contato" id="btnContato" class="animated bounceInRight slow">
                    <i class="fas fa-wrench"></i>
                    <span>Relatar Problema</span></a>
        </div>`
     
    const renderOnCallGroup = (OnCallToday: OnCallGroup): string => {
      const { day, group, pharmacys: [mainPharma, secPharma] } = OnCallToday
      
      return elementOnCall!.innerHTML = `
        <div class="animated fadeIn">
           ${renderCard(mainPharma)}
            <p class="card-detail-scale">
            Escala ${group}
            </p>
            ${renderCard(secPharma)}
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
            ${renderButtons()}
        </div>`
    }

    const mainGroup: OnCallGroup = this.findCurrentGroupInLocalStorage()
    elementOnCall !== null ? renderOnCallGroup(mainGroup) : null
  }
}
