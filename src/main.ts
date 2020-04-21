
import('./services/update').then(item => item.default.updateOnCallPharmacy())
import('./services/calendar').then(item => item.default.calendarOnCall())
import('./services/page').then(item => {
    item.default.navSlide()
    item.default.rodape()
    window.addEventListener('scroll', item.default.scrollAppear);
})



