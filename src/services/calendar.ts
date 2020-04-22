import apiService from "./api";
import dateHandler from "../shared/date-handler";
import pdfService from "./pdf";
import moment from "moment";
import Swal from 'sweetalert2'

export default class CalendarOnCall {
  
  public static async calendarOnCall() {
    const btnSubmit = document.getElementById("btnSubmit");
    const inputSelectedMonth = document.getElementById("selectMonth");
    const calendarSection = document.getElementById(
      "calendario"
    ) as HTMLElement;

    //Default values and Min selectable date
    inputSelectedMonth?.setAttribute("min", `${dateHandler.currentYear}-${dateHandler.currentMonth}`);
    inputSelectedMonth?.setAttribute("max", `${dateHandler.currentYear}-12`);
    (<HTMLInputElement>(
      inputSelectedMonth
    )).value = `${dateHandler.currentYear}-${dateHandler.currentMonth}`;

    //Submit Action
    btnSubmit?.addEventListener("click", handleSubmitClick);
    
    async function handleSubmitClick(event: Event) {
      event.preventDefault();
      const { firstDate, secondDate }  = CalendarOnCall.getCurrentPeriod(
        (<HTMLInputElement>inputSelectedMonth).value
      );
      
      if (firstDate !== undefined && secondDate !== undefined) {
        const result = await CalendarOnCall.getFutureOnCallDates(firstDate, secondDate);
        if (result !== undefined) {
          renderCalendar("slideUpReturn");
          fetchTableOnCallPeriod(firstDate, result);
          return;
        }
      }
       
    }
    
    function handleDayClick(event: Event) {
      const clickedElement = event.target as HTMLElement;
      removeColorToSelectedDay();

      if (clickedElement.tagName === "TD") {
        const onCallPharmacyOne = clickedElement.getAttribute(
          "on-callPharmacy-one"
        );
        const onCallPharmacyTwo = clickedElement.getAttribute(
          "on-callPharmacy-two"
        );
        const onCallPharmacyScale = clickedElement.getAttribute(
          "on-callPharmacy-scale"
        );
        renderCalendarHeader({ onCallPharmacyOne, onCallPharmacyTwo, onCallPharmacyScale });
        clickedElement.classList.add("current-day");
      }
    }

    function removeColorToSelectedDay() {
      const calendarTable = document.getElementById("calendar") as HTMLElement;
      const td = calendarTable.getElementsByClassName("current-day")[0];
      if (td !== undefined) {
        td.classList.remove("current-day");
      }
    }

    function handlePrevAndNextButtons(currentMonthSelected: string) {
      const prevBtn = document.getElementById("prevBtn") as HTMLElement;
      const nextBtn = document.getElementById("nextBtn") as HTMLElement;
      
      const prevMonthAndYear = moment(currentMonthSelected).subtract(1, "M").format('YYYY-MM')
      const prevMonth = moment(currentMonthSelected).subtract(1, "M").month()

      const nextMonthAndYear = moment(currentMonthSelected).add(1, "M").format('YYYY-MM')
      const nextMonth = moment(currentMonthSelected).add(1, "M").month()
      
      prevBtn.addEventListener("click",async () => {
        if (prevMonth !== dateHandler.currentMonthNumber - 1) {
          const { firstDate, secondDate } = CalendarOnCall.getCurrentPeriod(prevMonthAndYear);
          if (firstDate !== undefined && secondDate !== undefined) {
            const result = await CalendarOnCall.getFutureOnCallDates(firstDate, secondDate);
            if (result !== undefined) {
              renderCalendar('slideLeftReturn');
              fetchTableOnCallPeriod(firstDate, result);
              return;
            }
          }
        }
        Swal.fire({
          title: "Error!",
          text: `O mês atual é o menor periódo de data selecionável`,
          icon: "error",
          confirmButtonText: "Ok",
        });
      })
      
      nextBtn.addEventListener("click", async () =>{
        if (nextMonth !== 0) {
          const { firstDate, secondDate } = CalendarOnCall.getCurrentPeriod(nextMonthAndYear);
          if (firstDate !== undefined && secondDate !== undefined) {
            const result = await CalendarOnCall.getFutureOnCallDates(firstDate, secondDate);
            if (result !== null) {
              renderCalendar('slideRightReturn');
              fetchTableOnCallPeriod(firstDate, result);
              return;
            }
          }
        }
        Swal.fire({
          title: "Error!",
          text: `O mês atual é o maior periódo de data selecionável`,
          icon: "error",
          confirmButtonText: "Ok",
        });
      })

    }

    function renderCalendar(animation : string) {
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
        <div class="calendar-month magictime vanishIn" id="calendarMonth"></div>

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
          
      `;
    }

    function renderCalendarHeader(data: any) {
      const { onCallPharmacyOne, onCallPharmacyTwo, onCallPharmacyScale } = data;
      const pharmacyOneContainer = document.getElementById(
        "pharmacyOne"
      ) as HTMLElement;
      const pharmacyTwoContainer = document.getElementById(
        "pharmacyTwo"
      ) as HTMLElement;

      const scale = document.createElement('h6')
      scale.innerHTML = `${onCallPharmacyScale}`;
      scale.classList.add('card-detail-scale-header', 'magictime', 'vanishIn');

      //Clean previous text and sets new one
      pharmacyOneContainer.innerHTML = `<section class="magictime vanishIn"><i class="fas fa-notes-medical fa-xs"></i> ${onCallPharmacyOne}</section>`;
      pharmacyOneContainer.appendChild(scale)
      pharmacyTwoContainer.innerHTML = `<section class="magictime vanishIn"><i class="fas fa-notes-medical fa-xs"></i> ${onCallPharmacyTwo}</section>`;
    }

    function renderCalendarMonth(currentMonthSelected: string){
      const calendarMonth = document.getElementById(
        "calendarMonth"
      ) as HTMLElement;

      calendarMonth.innerHTML = dateHandler.months[moment(currentMonthSelected).month()];
    }

    function fetchTableOnCallPeriod(firstDate: string, result: Array<any>) {
      const periodList = result.map((item) => item[0]);
      const onCallList = result.map((item) => item[1]);
      const firstDay = moment(periodList[0]).day();
      const tableBody = document.getElementById("calendar-body");
      const currentMonthString = dateHandler.months[moment(firstDate).month()]
      // creating all cells
      let date = moment(periodList[0]).date();
      let dateCounter = 0;
      for (let i = 0; i < 6; i++) {
        // creates a table row
        const row = document.createElement("tr");
        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
          if (i === 0 && j < firstDay) {
            let cell = document.createElement("td");
            cell.classList.add("prev-month");
            let cellText = document.createTextNode("");
            cell.appendChild(cellText);
            row.appendChild(cell);
          } else if (date > moment(periodList[periodList.length - 1]).date()) {
            break;
          } else {
            let cell = document.createElement("td");
            cell.setAttribute(
              "on-callPharmacy-one",
              onCallList[dateCounter].farmacias[0].name
            );
            cell.setAttribute(
              "on-callPharmacy-two",
              onCallList[dateCounter].farmacias[1].name
            );
            cell.setAttribute(
              "on-callPharmacy-scale",
              onCallList[dateCounter].name
            );
            cell.addEventListener("click", handleDayClick);
            let cellText = document.createTextNode(
              moment(periodList[dateCounter]).date().toString()
            );
            cell.appendChild(cellText);
            row.appendChild(cell);
            date++;
            dateCounter++;
          }
        }
        tableBody!.appendChild(row); // appending each row into calendar body.
      }
      renderCalendarMonth(firstDate)
      handlePrevAndNextButtons(firstDate)
      handlePdfActionButton(periodList, onCallList, currentMonthString)
    }

    function handlePdfActionButton(periodList: Array<any>, onCallList: Array<any>, currentMonth: string){
      const pdfButton = document.getElementById('pdfButton') as HTMLElement
      pdfButton.addEventListener('click', () => {
        
        Swal.fire({
          title: 'Baixar Escala?',
          text: "O arquivo será salvo em seu dispositivo.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Sim, download!',
          cancelButtonText: 'Não, cancela!',
          reverseButtons: true,
          allowOutsideClick: false
          
        }).then((result) => {
          if (result.value) {
            pdfService.downloadPdf(periodList, onCallList, currentMonth)
            let timerInterval : any;
            Swal.fire({
              title: "Baixando!",
              html: "Irá demorar <b></b> millisegundos.",
              timer: 2000,
              timerProgressBar: true,
              allowOutsideClick: false,
              onBeforeOpen: () => {
                Swal.showLoading();
                timerInterval = setInterval(() => {
                  const content = Swal.getContent();
                  if (content) {
                    const b: any = content.querySelector("b");
                    if (b) {
                      b.textContent = Swal.getTimerLeft();
                    }
                  }
                }, 100);
              },
              onClose: () => {
                clearInterval(timerInterval);
              },
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
                Swal.fire("Feito!", "Seu arquivo foi salvo.", "success");
              }
            });
            
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            Swal.fire("Cancelado!", "Deixa pra lá, voltemos... :)", "error");
          }
        })
      })
      
    }
  }

  public static getCurrentPeriod(selectedMonthAndYear: string) {
    const selectedMonthParsed = selectedMonthAndYear.split("-");
    const yearSelected = selectedMonthParsed[0];
    const monthSelected = selectedMonthParsed[1];
    const lastDayOfSelectedMonth = dateHandler.getLastDay(+yearSelected, +monthSelected);

    if (selectedMonthParsed.length !== 2) {
      Swal.fire({
        title: "Error!",
        text: `Data incorreta, mês não pode ser vazio.`,
        icon: "error",
        confirmButtonText: "Ok",
      });

      return {firstDate: undefined, secondDate: undefined}
    } else {
      const secondDate = moment(
        `${yearSelected}-${monthSelected}-${lastDayOfSelectedMonth}`
      )
        .utcOffset("-03:00")
        .format("YYYY-MM-DD");

      if (monthSelected === dateHandler.currentMonth) {
        const firstDate = moment(
          `${yearSelected}-${monthSelected}-${dateHandler.tomorrowDay.format('DD')}`
        )
          .utcOffset("-03:00")
          .format("YYYY-MM-DD");
        return { firstDate, secondDate };
      }
      const firstDate = moment(`${yearSelected}-${monthSelected}-01`)
        .utcOffset("-03:00")
        .format("YYYY-MM-DD");
      return { firstDate, secondDate };
    }
  } 

  public static async getFutureOnCallDates(firstDate: string, secondDate: string){
    if (firstDate !== undefined && secondDate !== undefined) {
      const Month = dateHandler.months[moment(firstDate).month()]
      const localStorageResult = localStorage.getItem(Month) as any
      let resultLocal = JSON.parse(localStorageResult)

      if (!resultLocal) {
        resultLocal = await apiService.post("plantoes/future", {
          firstDate,
          secondDate,
        });
        console.log("getting data from Api 😆");
        resultLocal !== null ?
        localStorage.setItem(Month, JSON.stringify(resultLocal)) : null
      } 
      return resultLocal
    }
    return null
  }
}
