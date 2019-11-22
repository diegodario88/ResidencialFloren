import { functions } from "./Services/functions";

functions.navSlide();

switch (functions.dataAtualFormatada()) {
    case "01/12/2019":
        functions.atualizaPagina("G12");
        break;
    case "02/12/2019":
        functions.atualizaPagina("G6");
        break;
    case "03/12/2019":
        functions.atualizaPagina("G7");
        break;
    case "04/12/2019":
        functions.atualizaPagina("G8");
        break;
    case "05/12/2019":
        functions.atualizaPagina("G9");
        break;
    case "06/12/2019":
        functions.atualizaPagina("G10");
        break;
    case "07/12/2019":
        functions.atualizaPagina("G2");
        break;
    case "08/12/2019":
        functions.atualizaPagina("G13");
        break;
    case "09/12/2019":
        functions.atualizaPagina("G11");
        break;
    case "10/12/2019":
        functions.atualizaPagina("G12");
        break;
    case "11/12/2019":
        functions.atualizaPagina("G13");
        break;
    case "12/12/2019":
        functions.atualizaPagina("G1");
        break;
    case "13/12/2019":
        functions.atualizaPagina("G2");
        break;
    case "14/12/2019":
        functions.atualizaPagina("G3");
        break;
    case "15/12/2019":
        functions.atualizaPagina("G1");
        break;
    case "16/12/2019":
        functions.atualizaPagina("G3");
        break;
    case "17/12/2019":
        functions.atualizaPagina("G4");
        break;
    case "18/12/2019":
        functions.atualizaPagina("G5");
        break;
    case "19/11/2019":
        functions.atualizaPagina("G10");
        break;
    case "20/11/2019":
        functions.atualizaPagina("G11");
        break;
    case "21/11/2019":
        functions.atualizaPagina("G12");
        break;
    case "22/11/2019":
        functions.atualizaPagina("G13");
        break;
    case "23/11/2019":
        functions.atualizaPagina("G13");
        break;
    case "24/11/2019":
        functions.atualizaPagina("G11");
        break;
    case "25/11/2019":
        functions.atualizaPagina("G1");
        break;
    case "26/11/2019":
        functions.atualizaPagina("G2");
        break;
    case "27/11/2019":
        functions.atualizaPagina("G3");
        break;
    case "28/11/2019":
        functions.atualizaPagina("G4");
        break;
    case "29/11/2019":
        functions.atualizaPagina("G5");
        break;
    case "30/11/2019":
        functions.atualizaPagina("G1");
        break;
    default:
        break;
}

functions.rodape();
