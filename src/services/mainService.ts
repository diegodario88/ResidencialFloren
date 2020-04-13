export default class mainService {
  //Função NavBar
  static navSlide = () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = <HTMLElement[]>(
      (<any>document.querySelectorAll(".nav-links li"))
    );
    const removeStyleAnimationFromLinks = (
      link: HTMLElement,
      index: number
    ) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFadeIn 0.5s ease forwards ${
          index / 7 + 0.3
        }s`;
      }
    };
    const handleClikedLink = () => {
      //Toggle Nav
      nav!.classList.toggle("nav-active");
      //Animate Links
      navLinks.forEach((link, index) => {
        removeStyleAnimationFromLinks(link, index);
      });
      //Burger Animation
      burger!.classList.toggle("toggle");
    };

    navLinks.forEach((link) => {
      link.addEventListener("click", handleClikedLink);
    });

    burger!.addEventListener("click", handleClikedLink);
  };

  //Função Scroll
  static scrollAppear() {
    const textAppear = (classToAdd: string, height: number) => { 
        const text = document.querySelectorAll(classToAdd);
        text.forEach(item => {
            const introPosition = item!.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / height;
            if (introPosition < screenPosition) {
              item!.classList.add("intro-appear");
            } else {
              item!.classList.remove("intro-appear");
            }
        })
    }
    textAppear(".intro-text", 1)  
  }
  
  //Formatar a data
  static dataAtualFormatada() {
    const data = new Date(),
      dia = data.getDate().toString(),
      diaF = dia.length == 1 ? "0" + dia : dia,
      mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
      mesF = mes.length == 1 ? "0" + mes : mes,
      anoF = data.getFullYear();
    return diaF + "/" + mesF + "/" + anoF;
  }

  //Atualizar a data no rodapé da página
  static rodape(): void {
    const data = new Date();
    const ano = data.getFullYear();
    const footer = document.querySelector("#footer");
    if (footer != null) {
      footer.innerHTML += "&copy " + ano + "  Diego Dario All Rights Reserved ";
    }
  }
}
