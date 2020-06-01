import { OnCallGroup, Calendar} from '../entities/OnCallGroup'
import Api from './api'
import Date from '../shared/date-handler'

export default class Storage {
    private static tomorrowDate = Date.tomorrowDay.format('YYYY-MM-DD')
    private static twoMonthsForwardDate = Date.twoMonthsForward.format('YYYY-MM-DD')
    private static localStorageContains = localStorage.length > 3 || localStorage.length < 2

    static findCurrentGroupInLocalStorage(): OnCallGroup | undefined {
      const localStorageMonth = localStorage.getItem(Date.currentMonthPTBR) as string
      const result: OnCallGroup[] | null = localStorageMonth ?
        Object.values(JSON.parse(localStorageMonth)) : null

      if (result) {
        const todayDateLocalStorage = result
          .find(({ day }: OnCallGroup) => day === Date.todayDate.format('YYYY-MM-DD'))
        const localStorageCurrentGroup: OnCallGroup | undefined = todayDateLocalStorage
        return localStorageCurrentGroup
      }
    }

    static async feedCalendarInLocalStorage(): Promise<void> {
      
      if (Storage.localStorageContains) {
        localStorage.clear()
        console.log('🤖 getting data from Api and feeding localStorage')
      
        const apiResponse = await Api.post('oncalls/future', {
          firstDate: Storage.tomorrowDate,
          secondDate: Storage.twoMonthsForwardDate
        })
      
        const calendarGroups = apiResponse.map((month: Calendar) => Object.values(month))

        apiResponse.forEach((month, index) => {
          if (month !== undefined) {
            const [monthName] = Object.keys(month)
            const [daysInMonth] = calendarGroups[index]
            localStorage.setItem(monthName, JSON.stringify(daysInMonth))
          }
        })
      }
    }

    static async feedCurrentGroupInLocalStorage(): Promise<void>{
      if (!this.findCurrentGroupInLocalStorage()) {
        const { pharmacies, name } = await Api.get('oncalls/today')
        const todayObjToSave = {
          day: Date.todayDate.format('YYYY-MM-DD'),
          pharmacies,
          group: name
        }
        const existing = localStorage.getItem(Date.currentMonthPTBR)
        const existingParsed: object[] = existing !== null ? Object.values(JSON.parse(existing)) : []

        existingParsed.unshift(todayObjToSave)
        const data = existingParsed ? existingParsed : todayObjToSave
        localStorage.setItem(`${Date.currentMonthPTBR}`, JSON.stringify(data))
        console.log('🤖 feeding today date')
      }
    }
}