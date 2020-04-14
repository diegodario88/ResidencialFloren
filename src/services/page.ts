import dateHandler from "../shared/date-handler";

export default class pageFunctions {
  //NavBar
  static navSlide = () => {
    const modal = document.getElementById('modalContainer');
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
      //Call Modal
      document.getElementById('modalContainer')?.classList.toggle('show')
      //Animate Links
      navLinks.forEach((link, index) => {
        removeStyleAnimationFromLinks(link, index);
      });
      //Burger Animation
      burger!.classList.toggle("toggle");
    };

    modal?.addEventListener("click", handleClikedLink)

    navLinks.forEach((link) => {
      link.addEventListener("click", handleClikedLink);
    });

    burger!.addEventListener("click", handleClikedLink);
  };

  //Scroll
  static scrollAppear() {
    const textAppear = (classToAdd: string, height: number) => {
      const text = document.querySelectorAll(classToAdd);
      text.forEach((item) => {
        const introPosition = item!.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / height;
        if (introPosition < screenPosition) {
          item!.classList.add("intro-appear");
        } else {
          item!.classList.remove("intro-appear");
        }
      });
    };
    textAppear(".intro-text", 1);
  }

  //Footer
  static rodape() {
    const footer = document.querySelector("#footer");
    if (footer != null) {
      footer.innerHTML = `&copy ${dateHandler.getFullYear()} Diego Dario All Rights Reserved `;
    }
  }
}
