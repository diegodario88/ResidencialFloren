import updater from './services/update';
import calendar from './services/calendar';
import page from './services/page';


page.navSlide()
page.rodape()
updater.updateOnCallPharmacy() 
calendar.calendarOnCall()
window.addEventListener('scroll', page.scrollAppear);




