import Api from './api'
import Date from '../shared/date-handler'
import pdfService from './pdf'
import moment from 'moment'
import Swal from 'sweetalert2'
import {OnCallGroup, Calendar} from '../entities/OnCallGroup'

export default class CalendarOnCall {
  private static getCalendarElements () {
    const btnSubmit = document
      .getElementById('btnSubmit') as HTMLButtonElement
    const inputSelectedMonth = document
      .getElementById('selectMonth') as HTMLElement
    const calendarSection = document
      .getElementById('calendario') as HTMLElement

    return { btnSubmit, inputSelectedMonth, calendarSection }
  }

  private static setDefaultInputValue () {
    const { inputSelectedMonth } = this.getCalendarElements()

    inputSelectedMonth?.setAttribute(
      'min',
      `${Date.currentYear}-${Date.currentMonth}`
    )

    inputSelectedMonth?.setAttribute('max', `${Date.currentYear}-12`);
    (<HTMLInputElement>(
      inputSelectedMonth
    )).value = `${Date.currentYear}-${Date.currentMonth}`
  }

  private static handlePdfActionButton (
    daysInMonth: any[],
    onCallList: any[],
    currentMonth: string
  ) {
    const pdfButton = document.getElementById('pdfButton') as HTMLElement
    pdfButton.addEventListener('click', () => {
      Swal.fire({
        title: 'Baixar Escala?',
        text: 'O arquivo será salvo em seu dispositivo.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, download!',
        cancelButtonText: 'Não, cancela!',
        reverseButtons: true,
        allowOutsideClick: false
      }).then((result) => {
        if (result.value) {
          pdfService.downloadPdf(daysInMonth, onCallList, currentMonth)
          let timerInterval: any
          Swal.fire({
            title: 'Baixando!',
            html: 'Irá demorar <b></b> millisegundos.',
            timer: 2000,
            timerProgressBar: true,
            allowOutsideClick: false,
            onBeforeOpen: () => {
              Swal.showLoading()
              timerInterval = setInterval(() => {
                const content = Swal.getContent()
                if (content) {
                  const b: any = content.querySelector('b')
                  if (b) {
                    b.textContent = Swal.getTimerLeft()
                  }
                }
              }, 100)
            },
            onClose: () => {
              clearInterval(timerInterval)
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              Swal.fire('Feito!', 'Seu arquivo foi salvo.', 'success')
            }
          })
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire('Cancelado!', 'Deixa pra lá, voltemos... :)', 'error')
        }
      })
    })
  }

  private static getCurrentPeriod (selectedMonthAndYear: string) {
    const selectedMonthParsed = selectedMonthAndYear.split('-')
    const yearSelected = selectedMonthParsed[0]
    const monthSelected = selectedMonthParsed[1]
    const lastDayOfSelectedMonth = Date.getLastDay(
      +yearSelected,
      +monthSelected
    )

    if (selectedMonthParsed.length !== 2) {
      Swal.fire({
        title: 'Error!',
        text: 'Data incorreta, mês não pode ser vazio.',
        icon: 'error',
        confirmButtonText: 'Ok'
      })

      return { firstDate: undefined, secondDate: undefined }
    } else {
      const secondDate = moment(
        `${yearSelected}-${monthSelected}-${lastDayOfSelectedMonth}`
      ).format('YYYY-MM-DD')

      if (monthSelected === Date.currentMonth) {
        const firstDate = moment(
          `${yearSelected}-${monthSelected}-${Date.tomorrowDay.format(
            'DD'
          )}`
        ).format('YYYY-MM-DD')
        return { firstDate, secondDate }
      }
      const firstDate = moment(`${yearSelected}-${monthSelected}-01`).format(
        'YYYY-MM-DD'
      )
      return { firstDate, secondDate }
    }
  }

  private static async getFutureOnCallDates (
    firstDate: string, secondDate: string): Promise<OnCallGroup | Calendar>{
    const Month = Date.months[moment(firstDate).month()]
    const localStorageResult: string | null = localStorage.getItem(Month)
    const resultLocal: OnCallGroup = localStorageResult ? JSON.parse(localStorageResult) : null

    if (!resultLocal) {
      const apiResponse: Array<Calendar> = await Api.post('oncalls/future', 
        {firstDate, secondDate})
      console.log('getting data from Api 😆')
      if (apiResponse) {
        const [group] = apiResponse.map((month) => Object.values(month))
        return group[0] as any   
      } 
    }
      
    return resultLocal
    
  }

  private static renderCalendarMonth (currentMonthSelected: string) {
    const calendarMonth = document.getElementById(
      'calendarMonthHeader'
    ) as HTMLElement

    calendarMonth.innerHTML =
      Date.months[moment(currentMonthSelected).month()]
  }

  private static renderCalendar (animation: string) {
    const { calendarSection } = this.getCalendarElements()
    calendarSection.innerHTML = `
    <div class="calendar-container magictime ${animation}">
  
      <header class="calendar-header" id="calendar-header">
      <div class="onCallThatDay pharmacy-one magictime ${animation}" id="pharmacyOne"><i class="fas fa-notes-medical fa-xs"></i> 
      Plantão Futuro
      </div>
      <div class="onCallThatDay pharmacy-two magictime ${animation}" id="pharmacyTwo">
      <img class="calendar-header-img" src="./img/select.svg" alt="calendar with dates" height="100%" width="100%"
                  class="calendar-svg" />
      </div>
      <div class="calendar-month magictime vanishIn" id="calendarMonthHeader"></div>

      </header>
      
      <table class="calendar" id="calendar">
        
        <thead>
  
          <tr>
  
            <td>Dom</td>
            <td>Seg</td>
            <td>Ter</td>
            <td>Qua</td>
            <td>Qui</td>
            <td>Sex</td>
            <td>Sab</td>
  
          </tr>
  
        </thead>
  
        <tbody id="calendar-body">
  
        </tbody>
  
      </table>
      <br>
      <div id="prev-and-next-container" class="prev-and-next-container">
      <button class="prev-and-next-buttons" id="prevBtn">⏮ Anterior</button> 
      <button class="prev-and-next-buttons" id="nextBtn">Próximo ⏭</button>
      </div>
      <br>
      <div id="pdfContainer" class="pdf-container">
      <button id="pdfButton" class="make-pdf-button">
        <span style="color: #ff2115;";>
          <i class="far fa-file-pdf"></i>
        </span>
      Gerar PDF desta Escala
      </button> 
      </div>
    </div> <!-- end calendar-container -->
        
    `
  }

  private static removeColorToSelectedDay () {
    const calendarTable = document.getElementById('calendar') as HTMLElement
    const td = calendarTable.getElementsByClassName('current-day')[0]
    if (td !== undefined) {
      td.classList.remove('current-day')
    }
  }

  private static renderCalendarHeader (data: any) {
    const { onCallPharmacyOne, onCallPharmacyTwo, onCallPharmacyScale } = data
    const pharmacyOneContainer = document.getElementById(
      'pharmacyOne'
    ) as HTMLElement
    const pharmacyTwoContainer = document.getElementById(
      'pharmacyTwo'
    ) as HTMLElement

    const scale = document.createElement('h6')
    scale.innerHTML = `${onCallPharmacyScale}`
    scale.classList.add('card-detail-scale-header', 'magictime', 'vanishIn')

    // Clean previous text and sets new one
    pharmacyOneContainer.innerHTML = `<section class="magictime vanishIn"><i class="fas fa-notes-medical fa-xs"></i> 
    ${onCallPharmacyOne}</section>`

    pharmacyOneContainer.appendChild(scale)

    pharmacyTwoContainer.innerHTML = `<section class="magictime vanishIn"><i class="fas fa-notes-medical fa-xs"></i> 
    ${onCallPharmacyTwo}</section>`
  }

  private static handleDayClick (event: Event) {
    const clickedElement = event.target as HTMLElement
    CalendarOnCall.removeColorToSelectedDay()

    if (clickedElement.tagName === 'TD') {
      const onCallPharmacyOne = clickedElement.getAttribute(
        'on-callPharmacy-one'
      )
      const onCallPharmacyTwo = clickedElement.getAttribute(
        'on-callPharmacy-two'
      )
      const onCallPharmacyScale = clickedElement.getAttribute(
        'on-callPharmacy-scale'
      )
      CalendarOnCall.renderCalendarHeader({
        onCallPharmacyOne,
        onCallPharmacyTwo,
        onCallPharmacyScale
      })
      clickedElement.classList.add('current-day')
    }
  }

  private static handlePrevAndNextButtons (currentMonthSelected: string) {
    const prevBtn = document.getElementById('prevBtn') as HTMLElement
    const nextBtn = document.getElementById('nextBtn') as HTMLElement

    const prevMonthAndYear = moment(currentMonthSelected)
      .subtract(1, 'M')
      .format('YYYY-MM')
    const prevMonth = moment(currentMonthSelected).subtract(1, 'M').month()

    const nextMonthAndYear = moment(currentMonthSelected)
      .add(1, 'M')
      .format('YYYY-MM')
    const nextMonth = moment(currentMonthSelected).add(1, 'M').month()

    prevBtn.addEventListener('click', async () => {
      if (prevMonth !== Date.currentMonthNumber - 1) {
        const { firstDate, secondDate } = this.getCurrentPeriod(
          prevMonthAndYear
        )
        if (firstDate !== undefined && secondDate !== undefined) {
          const result = await this.getFutureOnCallDates(firstDate, secondDate)
          if (result) {
            this.renderCalendar('slideLeftReturn')
            this.fetchTableOnCallPeriod(firstDate, result as any)
          }
          return
        }
      }
      Swal.fire({
        title: 'Error!',
        text: 'O mês atual é o menor periódo de data selecionável',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    })

    nextBtn.addEventListener('click', async () => {
      if (nextMonth !== 0) {
        const { firstDate, secondDate } = this.getCurrentPeriod(
          nextMonthAndYear
        )
        if (firstDate !== undefined && secondDate !== undefined) {
          const result = await this.getFutureOnCallDates(firstDate, secondDate)
          if (result !== null) {
            this.renderCalendar('slideRightReturn')
            this.fetchTableOnCallPeriod(firstDate, result as any)
          }
          return
        }
      }
      Swal.fire({
        title: 'Error!',
        text: 'O mês atual é o maior periódo de data selecionável',
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    })
  }

  private static fetchTableOnCallPeriod (firstDate: string, result: any[]) {
    
    const daysInMonth = Array.from(result, item => (item.day))
    const oncallList = Array.from(result, item => ({group: item.group, pharmacies: item.pharmacies}))
    const firstDay = moment(daysInMonth[0]).day()
    const tableBody = document.getElementById('calendar-body')
    const currentMonthString = Date.months[moment(firstDate).month()]

    // creating all cells
    let date = moment(daysInMonth[0]).date()
    let dateCounter = 0
    for (let i = 0; i < 6; i++) {
      // creates a table row
      const row = document.createElement('tr')
      // creating individual cells, filing them up with data.
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          const cell = document.createElement('td')
          cell.classList.add('prev-month')
          const cellText = document.createTextNode('')
          cell.appendChild(cellText)
          row.appendChild(cell)
        } else if (date > moment(daysInMonth[daysInMonth.length - 1]).date()) {
          break
        } else {
          const cell = document.createElement('td')
          cell.setAttribute(
            'on-callPharmacy-one',
            oncallList[dateCounter].pharmacies[0].name
          )
          cell.setAttribute(
            'on-callPharmacy-two',
            oncallList[dateCounter].pharmacies[1].name
          )
          cell.setAttribute('on-callPharmacy-scale', oncallList[dateCounter].group)
          cell.addEventListener('click', this.handleDayClick)
          const cellText = document.createTextNode(
            moment(daysInMonth[dateCounter]).date().toString()
          )
          cell.appendChild(cellText)
          row.appendChild(cell)
          date++
          dateCounter++
        }
      }
      tableBody!.appendChild(row) // appending each row into calendar body.
    }
    this.renderCalendarMonth(firstDate)
    this.handlePrevAndNextButtons(firstDate)
    this.handlePdfActionButton(daysInMonth, oncallList, currentMonthString)
  }

  public static async calendarOnCall () {
    const { btnSubmit, inputSelectedMonth } = this.getCalendarElements()
    
    this.setDefaultInputValue()

    async function handleSubmitClick (event: Event) {
      event.preventDefault()
      const { firstDate, secondDate } = CalendarOnCall.getCurrentPeriod(
        (<HTMLInputElement>inputSelectedMonth).value
      )

      if (firstDate !== undefined && secondDate !== undefined) {
        const result = await CalendarOnCall.getFutureOnCallDates(
          firstDate,
          secondDate
        )
        if (result !== undefined) {
          CalendarOnCall.renderCalendar('slideUpReturn')
          CalendarOnCall.fetchTableOnCallPeriod(firstDate, result as any)
        }
      }
    }

    btnSubmit?.addEventListener('click', handleSubmitClick)

  }
}
