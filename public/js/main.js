!function(a){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return a[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=a,n.c=e,n.d=function(a,e,i){n.o(a,e)||Object.defineProperty(a,e,{enumerable:!0,get:i})},n.r=function(a){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(a,"__esModule",{value:!0})},n.t=function(a,e){if(1&e&&(a=n(a)),8&e)return a;if(4&e&&"object"==typeof a&&a&&a.__esModule)return a;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:a}),2&e&&"string"!=typeof a)for(var r in a)n.d(i,r,function(e){return a[e]}.bind(null,r));return i},n.n=function(a){var e=a&&a.__esModule?function(){return a.default}:function(){return a};return n.d(e,"a",e),e},n.o=function(a,e){return Object.prototype.hasOwnProperty.call(a,e)},n.p="",n(n.s=0)}([function(a,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(1);switch(i.functions.navSlide(),window.addEventListener("scroll",i.functions.scrollAppear),i.functions.dataAtualFormatada()){case"01/12/2019":i.functions.atualizaPagina("G12");break;case"02/12/2019":i.functions.atualizaPagina("G6");break;case"03/12/2019":i.functions.atualizaPagina("G7");break;case"04/12/2019":i.functions.atualizaPagina("G8");break;case"05/12/2019":i.functions.atualizaPagina("G9");break;case"06/12/2019":i.functions.atualizaPagina("G10");break;case"07/12/2019":i.functions.atualizaPagina("G2");break;case"08/12/2019":i.functions.atualizaPagina("G13");break;case"09/12/2019":i.functions.atualizaPagina("G11");break;case"10/12/2019":i.functions.atualizaPagina("G12");break;case"11/12/2019":i.functions.atualizaPagina("G13");break;case"12/12/2019":i.functions.atualizaPagina("G1");break;case"13/12/2019":i.functions.atualizaPagina("G2");break;case"14/12/2019":i.functions.atualizaPagina("G3");break;case"15/12/2019":i.functions.atualizaPagina("G1");break;case"16/12/2019":i.functions.atualizaPagina("G3");break;case"17/12/2019":i.functions.atualizaPagina("G4");break;case"18/12/2019":i.functions.atualizaPagina("G5");break;case"19/11/2019":i.functions.atualizaPagina("G10");break;case"20/11/2019":i.functions.atualizaPagina("G11");break;case"21/11/2019":i.functions.atualizaPagina("G12");break;case"22/11/2019":case"23/11/2019":i.functions.atualizaPagina("G13");break;case"24/11/2019":i.functions.atualizaPagina("G11");break;case"25/11/2019":i.functions.atualizaPagina("G1");break;case"26/11/2019":i.functions.atualizaPagina("G2");break;case"27/11/2019":i.functions.atualizaPagina("G3");break;case"28/11/2019":i.functions.atualizaPagina("G4");break;case"29/11/2019":i.functions.atualizaPagina("G5");break;case"30/11/2019":i.functions.atualizaPagina("G1")}i.functions.rodape()},function(a,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(2),r=function(){function a(){}return a.scrollAppear=function(){var a=document.querySelector(".intro-text");a.getBoundingClientRect().top<window.innerHeight/2?a.classList.add("intro-appear"):a.classList.remove("intro-appear")},a.dataAtualFormatada=function(){var a=new Date,e=a.getDate().toString(),n=1==e.length?"0"+e:e,i=(a.getMonth()+1).toString();return n+"/"+(1==i.length?"0"+i:i)+"/"+a.getFullYear()},a.atualizaPagina=function(e){var n,r=i.seedPlantao.SeedPlantao();null!=e&&r.forEach((function(a){a.nome==e&&(n=a)}));var t=document.querySelector("#textoPrincipal"),c=document.querySelector("#textoDataPrincipal"),o=document.querySelector("#textoEndPrincipal"),u=document.querySelector("#textoTelPrincipal");null!=t&&null!=c&&null!=o&&null!=u&&null!=n&&(t.innerHTML=""+n.farmaciaPrincipal.nome,c.innerHTML="Plantão dia: "+a.dataAtualFormatada(),o.innerHTML=n.farmaciaPrincipal.endereco,u.innerHTML=n.farmaciaPrincipal.telefone);var s=document.querySelector("#textoSecundario"),l=document.querySelector("#textoDataSecundario"),d=document.querySelector("#textoEndSecundario"),m=document.querySelector("#textoTelSecundario");null!=s&&null!=l&&null!=d&&null!=m&&null!=n&&(s.innerHTML=""+n.farmaciaSecundaria.nome,l.innerHTML="Plantão dia: "+a.dataAtualFormatada(),d.innerHTML=n.farmaciaSecundaria.endereco,m.innerHTML=n.farmaciaSecundaria.telefone)},a.rodape=function(){var a=(new Date).getFullYear(),e=document.querySelector("#footer");null!=e&&(e.innerHTML+="&copy "+a+"  Diego Dario All Rights Reserved ")},a.navSlide=function(){var a=document.querySelector(".burger"),e=document.querySelector(".nav-links"),n=document.querySelectorAll(".nav-links li");a.addEventListener("click",(function(){e.classList.toggle("nav-active"),n.forEach((function(a,e){a.style.animation?a.style.animation="":a.style.animation="navLinkFadeIn 0.5s ease forwards "+(e/7+.3)+"s"})),a.classList.toggle("toggle")}))},a}();e.functions=r},function(a,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(3),r=n(4),t=function(){function a(){}return a.SeedPlantao=function(){return[new i.Plantao("G1",r.seedFarmacia.SeedFarmacias()[8],r.seedFarmacia.SeedFarmacias()[9]),new i.Plantao("G2",r.seedFarmacia.SeedFarmacias()[0],r.seedFarmacia.SeedFarmacias()[10]),new i.Plantao("G3",r.seedFarmacia.SeedFarmacias()[1],r.seedFarmacia.SeedFarmacias()[11]),new i.Plantao("G4",r.seedFarmacia.SeedFarmacias()[12],r.seedFarmacia.SeedFarmacias()[2]),new i.Plantao("G5",r.seedFarmacia.SeedFarmacias()[3],r.seedFarmacia.SeedFarmacias()[5]),new i.Plantao("G6",r.seedFarmacia.SeedFarmacias()[4],r.seedFarmacia.SeedFarmacias()[7]),new i.Plantao("G7",r.seedFarmacia.SeedFarmacias()[6],r.seedFarmacia.SeedFarmacias()[8]),new i.Plantao("G8",r.seedFarmacia.SeedFarmacias()[9],r.seedFarmacia.SeedFarmacias()[10]),new i.Plantao("G9",r.seedFarmacia.SeedFarmacias()[0],r.seedFarmacia.SeedFarmacias()[1]),new i.Plantao("G10",r.seedFarmacia.SeedFarmacias()[11],r.seedFarmacia.SeedFarmacias()[12]),new i.Plantao("G11",r.seedFarmacia.SeedFarmacias()[2],r.seedFarmacia.SeedFarmacias()[3]),new i.Plantao("G12",r.seedFarmacia.SeedFarmacias()[5],r.seedFarmacia.SeedFarmacias()[4]),new i.Plantao("G13",r.seedFarmacia.SeedFarmacias()[7],r.seedFarmacia.SeedFarmacias()[6])]},a}();e.seedPlantao=t},function(a,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(a,e,n){this.nome=a,this.farmaciaPrincipal=e,this.farmaciaSecundaria=n};e.Plantao=i},function(a,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n(5),r=function(){function a(){}return a.SeedFarmacias=function(){return[new i.Farmacia("Farmácia Drogacenter","(44) 3425-1367 ","Av. Brasil, 1227 - Centro "),new i.Farmacia("Farmácia São Lucas","(44) 3425-1011","Rua Tókio, 343 - Centro "),new i.Farmacia("Farmácia Farma & Farma","(44) 3425 - 3700","Av.Pres.Get.Vargas, 1041 - Centro "),new i.Farmacia("Farmácia União","(44) 3425-2555","Av.Des.M.de Mello, 1437 - Centro "),new i.Farmacia("Farmácia Farma Útil","(44) 3425-2539","Av.Brasil, 1137 - Centro"),new i.Farmacia("Farmácia Rede Líder","(44) 3425-5200","Av.Paraná, 1165 - Centro"),new i.Farmacia("Farmácia Du Preço Popular","(44) 3425 - 2921","Rua Accioly Filho, 448 - Centro "),new i.Farmacia("Farmácia Preço Baixo","(44) 3425 - 1388","Avenida Paraná, 1198 Centro"),new i.Farmacia("Farmácia Sto.Antônio","(44) 3425-5725","Av.Brasil, 819 - Centro "),new i.Farmacia("Farmácia Sta.Terezinha","(44) 3425-1323","Av.Brasil, 1094 - Centro "),new i.Farmacia("Farmácia Drogaminas","(44) 3425 - 1090","Av.Paraná, 1147 - Vila Nova"),new i.Farmacia("Farmácia Droganova","(44) 3425 - 1304","Av.Paraná, 1952 - Vila Nova "),new i.Farmacia("Farmácia Do Paulo","(44) 3425 - 1915","Rua Accioly Filho, 584 - Centro")]},a}();e.seedFarmacia=r},function(a,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(a,e,n){this.nome=a,this.telefone=e,this.endereco=n};e.Farmacia=i}]);