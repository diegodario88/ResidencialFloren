import { OnCallGroup } from '../entities/OnCallGroup'
import Api from './api'
import Date from '../shared/date-handler'

export default class Storage {
    private static tomorrowDate = Date.tomorrowDay.format('YYYY-MM-DD')
    private static totalMonthsLocal = (Date.months.length - Date.currentMonthNumber)

    static findCurrentGroupInLocalStorage(): OnCallGroup | undefined {
      const localStorageMonth = localStorage.getItem(Date.currentMonthPTBR) as string
      const result: OnCallGroup[] | null = localStorageMonth ?
        Object.values(JSON.parse(localStorageMonth)) : null

      if (result) {
        const todayDateLocalStorage = result
          .find(({ day }: OnCallGroup) => day === Date.todayDate.format('YYYY-MM-DD'))
        const localStorageData: OnCallGroup | undefined = todayDateLocalStorage
        return localStorageData
      }
    }

    static async feedCalendarInLocalStorage(): Promise<void> {
      if (localStorage.length < this.totalMonthsLocal) {
        localStorage.clear()
        console.log('🤖 getting data from Api and feeding localStorage')
        const fullCalendarFromApi = await Api.post('oncalls/future', {
          firstDate: this.tomorrowDate,
          secondDate: '2020-12-30'
        })
        const fullCalendarMonths = fullCalendarFromApi
          .map((month: string) => Object.values(month))

        fullCalendarFromApi.forEach((item: string, index: number) => {
          if (item !== undefined) {
            const [monthName] = Object.keys(item)
            const [daysInMonth] = fullCalendarMonths[index]
            localStorage.setItem(monthName, JSON.stringify(daysInMonth))
          }
        })
      }

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