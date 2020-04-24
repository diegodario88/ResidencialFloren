import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import moment from 'moment';
import utils from '../shared/image-handler';
import dateHandler from '../shared/date-handler';

export default class PdfMaker {
  public static async downloadPdf(periodList: any[], onCallList: any[], groupNames: any[], currentMonth: string) {
    
    function fetchTable(){
      const firstDay = moment(periodList[0]).day();
      const lastDay = moment(periodList[periodList.length - 1]).date()
      let date = moment(periodList[0]).date();
      let dateCounter = 0;
      const body: any = [
        [
          { text: "DOMINGO", alignment: "center" },
          { text: "SEGUNDA", alignment: "center" },
          { text: "TERÇA", alignment: "center" },
          { text: "QUARTA", alignment: "center" },
          { text: "QUINTA", alignment: "center" },
          { text: "SEXTA", alignment: "center" },
          { text: "SÁBADO", alignment: "center" },
        ],
      ];
      for (let i = 0; i < 6; i++) {
        // creates a table row
        let row: any = []
        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
          if ((i === 0 && j < firstDay) || (date > lastDay)) {
            let cell = {
                image: 'logo',
                width: 70,
                opacity: 0.5,
                alignment: 'center'
            };
            row.push(cell);
          } else if (date > lastDay) {
            break;
          } else {
            let cell = {
              text: [
                { text: `${moment(periodList[dateCounter]).date()}\n`, alignment: 'center', fontSize: 11,},
                { text: `${onCallList[dateCounter][0].name}\n`, alignment: 'center', bold: true, italics: true},
                { text: `${groupNames[dateCounter]}\n`, alignment: 'center', color: 'gray', bold: true, fontSize: 11},
                { text: `${onCallList[dateCounter][1].name}`, alignment: 'center', bold: true, italics: true},
              ], fillColor: '#eeffee'
            }; 
            row.push(cell);
            date++;
            dateCounter++;
          }
        } 
        body.push(row) // appending each row into calendar body.
      }
      return body
    }
    
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const docDefinition = {
      pageSize: "A4",
      pageOrientation: "landscape",
      // margin: [left, top, right, bottom]
      pageMargins: [20, 5, 20, 5],
      info: {
        title: `Escala-${currentMonth}.pdf`,
        author: 'Diego Dario',
        subject: 'Escala-Plantão de farmácias',
        keywords: 'farmacia',
        },
      content: [
        {
          text: `Escala ${currentMonth} de ${dateHandler.getFullYear()}.`,
          style: "header",
        },
        {
          style: "escala",
          table: {
            widths: ["auto", "auto", "auto", "auto", "auto", "auto", "auto"],
            body: fetchTable(),
          },
          layout: {
            fillColor: function (
              rowIndex: number,
              node: any,
              columnIndex: any
            ) {
              return rowIndex === 0 ? "#CCCCCC" : null;
            },
          },
        },
        {
          text:
            "Escala gerada através do aplicativo FlorenApp disponível em (https://floren.app). É possível acompanhar o plantão diário através do App ou pelo Twitter, publicado todos os dias após as 18:00 horas no @PlantaoFarmacia.",
          link: "https://floren.app",
        },
      ],
      images: {
        logo: await utils.getBase64ImageFromURL(
          "https://i.ibb.co/PGdyHbN/florence-format.png"
        ),
      },
      styles: {
        header: {
          fontSize: 16,
          bold: true,
          margin: [0, 0, 0, 0],
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        escala: {
          margin: [0, 0, 0, 0],
        },
        tableOpacityExample: {
          margin: [0, 5, 0, 15],
          fillColor: "blue",
          fillOpacity: 0.3,
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: "black",
        },
      },
      defaultStyle: {
        // alignment: 'justify'
      },
    };
    pdfMake.createPdf(docDefinition as any).download(`Escala-${currentMonth}.pdf`);
  }
}
