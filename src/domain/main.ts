import mainService from '../domain/services/mainService';

window.addEventListener('scroll', mainService.scrollAppear);
mainService.navSlide();
mainService.rodape();
mainService.atualizaPlantao();


