import mainService from '../domain/services/mainService';
import updateService from '../domain/services/updateService';

window.addEventListener('scroll', mainService.scrollAppear);
mainService.navSlide();
mainService.rodape();
updateService.updatePlantao();


