
//cria uma lista com todas as farmácias e suas propriedades
const listaFarmacia =
    [
        {
            //0
            nome: "Farmácia Drogacenter",
            telefone: "(44) 3425-1367 ",
            endereco: "Av. Brasil, 1227 - Centro "

        },
        {
            //1
            nome: "Farmácia São Lucas",
            telefone: "(44) 3425-1011",
            endereco: "Rua Tókio, 343 - Centro "

        },
        {
            //2
            nome: "Farmácia Farma & Farma",
            telefone: "(44) 3425 - 3700",
            endereco: "Av.Pres.Get.Vargas, 1041 - Centro "

        },
        {
            //3
            nome: "Farmácia União",
            telefone: "(44) 3425-2555",
            endereco: "Av.Des.M.de Mello, 1437 - Centro "

        },
        {
            //4
            nome: "Farmácia Farma Útil",
            telefone: "(44) 3425-2539",
            endereco: "Av.Brasil, 1137 - Centro"

        },
        {
            //5
            nome: "Farmácia Rede Líder",
            telefone: "(44) 3425-5200",
            endereco: "Av.Paraná, 1165 - Centro"

        },
        {
            //6
            nome: "Farmácia Du Preço Popular",
            telefone: "(44) 3425 - 2921",
            endereco: "Rua Accioly Filho, 448 - Centro "

        },
        {
            //7
            nome: "Farmácia Preço Baixo",
            telefone: "(44) 3425 - 1388",
            endereco: "Avenida Paraná, 1198 Centro"

        },
        {
            //8
            nome: "Farmácia Sto Antônio",
            telefone: "(44) 3425-5725",
            endereco: "Av.Brasil, 819 - Centro "

        },
        {
            //9
            nome: "Farmácia Sta Terezinha",
            telefone: "(44) 3425-1323",
            endereco: "Av.Brasil, 1094 - Centro "

        },
        {
            //10
            nome: "Farmácia Drogaminas",
            telefone: "(44) 3425 - 1090",
            endereco: "Av.Paraná, 1147 - Vila Nova"
        },
        {
            //11
            nome: "Farmácia Droganova",
            telefone: "(44) 3425 - 1304",
            endereco: "Av.Paraná, 1952 - Vila Nova "

        },
        {
            //12
            nome: "Farmácia Do Paulo",
            telefone: "(44) 3425 - 1915",
            endereco: "Rua Accioly Filho, 584 - Centro"

        }
    ];

//função para formatar a data
function dataAtualFormatada() {
    var data = new Date(),
        dia = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0' + dia : dia,
        mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0' + mes : mes,
        anoF = data.getFullYear();
    return diaF + "/" + mesF + "/" + anoF;
}

//Função para atualizar o plantão
function atualizaPagina(farma1, farma2) {
    var plantao = document.querySelector('#textoPrincipal')
    var textoData = document.querySelector('#textoData')
    var textoEnd = document.querySelector('#textoEnd')
    var textoTel = document.querySelector('#textoTel')

    plantao.innerHTML = `${listaFarmacia[farma1].nome}`
    textoData.innerHTML = `Plantão dia: ${dataAtualFormatada()}`
    textoEnd.innerHTML = listaFarmacia[farma1].endereco
    textoTel.innerHTML = listaFarmacia[farma1].telefone

    textoSecundario.innerHTML = ` ${listaFarmacia[farma2].nome} `
    textoDataSecundario.innerText = `Plantão dia: ${dataAtualFormatada()}`
    textoTelSecundario.innerHTML = listaFarmacia[farma2].telefone
    textoEndSecundario.innerHTML = listaFarmacia[farma2].endereco

}

//altera o plantão 
switch (dataAtualFormatada()) {
    case "01/11/2019":
        atualizaPagina(2, 3)
        break;

    case "02/11/2019":
        atualizaPagina(11, 12)
        break;

    case "03/11/2019":
        atualizaPagina(9, 10)
        break;

    case "04/11/2019":
        atualizaPagina(4, 5)
        break;

    case "05/11/2019":
        atualizaPagina(6, 7)
        break;

    case "06/11/2019":
        atualizaPagina(8, 9)
        break;

    case "07/11/2019":
        atualizaPagina(0, 10)
        break;

    case "08/11/2019":
        atualizaPagina(1, 11)
        break;

    case "09/11/2019":
        atualizaPagina(2, 3)
        break;

    case "10/11/2019":
        atualizaPagina(0, 1)
        break;

    case "11/11/2019":
        atualizaPagina(12, 2)
        break;

    case "12/11/2019":
        atualizaPagina(3, 5)
        break;

    case "13/11/2019":
        atualizaPagina(4, 7)
        break;

    case "14/11/2019":
        atualizaPagina(6, 8)
        break;

    case "15/11/2019":
        atualizaPagina(9, 10)
        break;

    case "16/11/2019":
        atualizaPagina(5, 4)
        break;

    case "17/11/2019":
        atualizaPagina(11, 12)
        break;

    case "18/11/2019":
        atualizaPagina(0, 1)
        break;

    case "19/11/2019":
        atualizaPagina(11, 12)
        break;

    case "20/11/2019":
        atualizaPagina(2, 3)
        break;

    case "21/11/2019":
        atualizaPagina(5, 4)
        break;

    case "22/11/2019":
        atualizaPagina(7, 6)
        break;

    case "23/11/2019":
        atualizaPagina(7, 6)
        break;

    case "24/11/2019":
        atualizaPagina(2, 3)
        break;

    case "25/11/2019":
        atualizaPagina(8, 9)
        break;

    case "26/11/2019":
        atualizaPagina(0, 10)
        break;

    case "27/11/2019":
        atualizaPagina(1, 11)
        break;

    case "28/11/2019":
        atualizaPagina(12, 2)
        break;

    case "29/11/2019":
        atualizaPagina(3, 5)
        break;

    case "30/11/2019":
        atualizaPagina(8, 9)
        break;

    default:
        break;
}


//data no rodapé da página
const data = new Date();
const diaSemana = data.getDay();
const ano = data.getFullYear();
const footer = document.querySelector('#footer')
footer.innerHTML += `&copy ${ano}  Diego Dario All Rights Reserved `