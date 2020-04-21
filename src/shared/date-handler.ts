import moment from "moment";

export default class DateHandler {
  private static monday: number = 1;
  private static friday: number = 5;
  private static saturday: number = 6;
  public static months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  public static tomorrowDay = moment().add(1, "day");
  public static currentYear = moment().format("YYYY");
  public static currentMonth = moment().format("MM");
  public static currentMonthNumber = moment().month();
  
  public static getLastDay = (y: number, m: number) =>
  new Date(y, m, 0).getDate().toString();

  static toDate(value: string): Date {
    let values = value.split("-");
    let year = parseInt(values[0]);
    let month = parseInt(values[1]) - 1;
    let day = parseInt(values[2]);
    return new Date(Date.UTC(year, month, day, 3, 0, 0));
  }

  static toDateFormated(date: Date): string {
    let day = this.addZeroIfNecessary(date.getDate());
    let month = this.addZeroIfNecessary(date.getMonth() + 1); //+1 pois no getMonth Janeiro começa com zero.
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  static getFullYear(): number {
    const date = new Date();
    const year = date.getFullYear();
    return year;
  }

  static getDayWeek(): number {
    const date = new Date();
    const day = date.getDay();
    return day;
  }

  private static addZeroIfNecessary(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }

  static verifyDay(date: Array<string>) {
    const currentDate = Object.freeze({
      weekDay: date[0],
      saturday: date[1],
      sunday: date[2],
    });
    const type = this.checkScaleType(
      this.getDayWeek()
    ) as keyof typeof currentDate;
    return currentDate[type];
  }

  private static checkScaleType(day: number): string {
    if (day >= this.monday && day <= this.friday) return "weekDay";
    if (day === this.saturday) return "saturday";
    return "sunday";
  }
}
