import Api from './api'
import dateHandler from '../shared/date-handler'
import stringUtils from '../shared/string-utils'
import Pharmacy from '../entities/Pharmacy'
import moment from 'moment'

export default class UpdateOnCall {
  static async updateOnCallPharmacy () {
    const todayDate = moment(new Date())
    const tomorrowDate = moment(todayDate).add(1, 'd').format('YYYY-MM-DD')
    const totalMonthsLocal = dateHandler.months.length - todayDate.month()

    if (localStorage.length < totalMonthsLocal) {
      localStorage.clear()
      console.log('getting data from Api and feeding localStorage')
      const fullCalendar = await Api.post('plantoes/future', {
        firstDate: tomorrowDate,
        secondDate: '2020-12-31'
      })

      fullCalendar.forEach((element: string) =>
        element !== undefined
          ? localStorage.setItem(
            `${Object.keys(element)}`,
            JSON.stringify(element)
          )
          : null
      )
    }

    const currentMonth = dateHandler.months[moment(todayDate).month()] as any
    const localStorageMonth = localStorage.getItem(currentMonth) as any
    const result = JSON.parse(localStorageMonth) as any[]
    let localStorageData = null

    if (result) {
      for (const item of result[currentMonth]) {
        if (item.day === todayDate.format('YYYY-MM-DD')) {
          localStorageData = item
        }
      }
    }

    if (!localStorageData) {
      localStorageData = false
      var { farmacias, name } = await Api.get('plantoes/atual')
      const todayObjToSave = {
        [currentMonth]: [{
          day: todayDate.format('YYYY-MM-DD'),
          group: name,
          pharmacys: farmacias
        }]
      }
      localStorage.setItem(`${currentMonth}`, JSON.stringify(todayObjToSave))
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
                        href="${stringUtils.makeUrl(
    pharmacy.name,
    pharmacy.adress
  )}">
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
            Plantão dia: ${dateHandler.toDateFormated(
    dateHandler.toDate(day || moment().format('YYYY-MM-DD'))
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
