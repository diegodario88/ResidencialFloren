export default class UtilHandler {
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

  static getFullYear(){
    const date = new Date();
    const year = date.getFullYear();
    return year;
  }

  private static addZeroIfNecessary(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }
}
