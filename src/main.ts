import page from './services/page';
import update from './services/update';
import calendar from './services/calendar';

update.updateOnCallPharmacy();
page.navSlide();
page.rodape();
calendar.calendarOnCall();
window.addEventListener('scroll', page.scrollAppear);


