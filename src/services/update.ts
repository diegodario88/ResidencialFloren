import Api from './api'
import Date from '../shared/date-handler'
import Utils from '../shared/string-utils'
import Pharmacy from '../entities/Pharmacy'

export default class UpdateOnCall {

  static async updateOnCallPharmacy () {
    const tomorrowDate = Date.tomorrowDay.format('YYYY-MM-DD')
    const totalMonthsLocal = Date.months.length - Date.currentMonthNumber

    if (localStorage.length < totalMonthsLocal) {
      localStorage.clear()
      console.log('getting data from Api and feeding localStorage')
      const fullCalendarFromApi = await Api.post('plantoes/future', {
        firstDate: tomorrowDate,
        secondDate: '2020-12-31'
      })
      const fullCalendar = fullCalendarFromApi.map(month => Object.values(month))
      console.log(fullCalendar)

      fullCalendarFromApi.forEach((item: string, index: string | number) => {
        if (item !== undefined) {
          const [monthName] = Object.keys(item)
          const [daysInMonth] = fullCalendar[index]
          localStorage.setItem(monthName,JSON.stringify(daysInMonth))
        }
      })
    }
    const localStorageMonth = localStorage.getItem(Date.currentMonthPTBR) as string
    const result : any[] = Object.values(JSON.parse(localStorageMonth)) 
    
    let localStorageData = null

    if (result) {
      const todayDateLocalStorage = result.find(({ day }) => day === Date.todayDate.format('YYYY-MM-DD'))
      todayDateLocalStorage ? (localStorageData = todayDateLocalStorage) : null
    }

    if (!localStorageData) {
      localStorageData = false
      var { farmacias, name } = await Api.get('plantoes/atual')
      console.log('feeding today date')
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
    }

    const { pharmacys = false, group = false, day = false } = localStorageData
    const mainPharma = new Pharmacy(
      pharmacys ? pharmacys[0].name : farmacias[0].name,
      pharmacys ? pharmacys[0].telefone : farmacias[0].telefone,
      pharmacys ? pharmacys[0].endereco : farmacias[0].endereco
    )
    const secPharma = new Pharmacy(
      pharmacys ? pharmacys[1].name : farmacias[1].name,
      pharmacys ? pharmacys[1].telefone : farmacias[1].telefone,
      pharmacys ? pharmacys[1].endereco : farmacias[1].endereco
    )

    const onCallDiv = document.getElementById('onCall')
    const renderCard = (pharmacy: Pharmacy): string => {
      return `
        <div class="container">
            <section class="card">
            <h1 class="card-title">${pharmacy.name}</h1>
                <div class="card-detail">
                    <p>
                        <i class='far fa-building'></i>&nbsp;&nbsp; 
                        <a 
                        id="textoEndPrincipal" 
                        href="${Utils.makeUrl(pharmacy.name, pharmacy.adress)}">
                            ${pharmacy.adress}
                        </a>
                        <br>
                        <i id="fone" class='fas fa-phone'></i>&nbsp;&nbsp; 
                        <a class="phone-text" 
                        href="tel:0${Utils.normalize(pharmacy.phone)}">
                            ${pharmacy.phone}
                        </a>
                        <br>
                    </p>
                </div>
            </section>
        </div>
        `
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
        <div class="animated fadeIn">
           ${renderCard(mainPharma)}
            <p class="card-detail-scale">
            Escala ${name || group}
            </p>
            ${renderCard(secPharma)}
            <br>
            <p class="card-detail card-detail-date">
            Plantão dia: ${Date.toDateFormated(
    Date.toDate(day || Date.todayDate.format('YYYY-MM-DD'))
  )}
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
  }
}
