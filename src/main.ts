import mainService from './services/mainService';
import updateService from './services/updateService';
import calendarService from './services/calendar';

window.addEventListener('scroll', mainService.scrollAppear);
mainService.navSlide();
mainService.rodape();
updateService.updatePlantao();
calendarService.calendarOnCall();


