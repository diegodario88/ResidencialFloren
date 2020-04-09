export default class UtilHandler {

    static toDate(value: string): Date {
        let values = value.split('-');
        let year = parseInt(values[0]);
        let month = parseInt(values[1]) - 1;
        let day = parseInt(values[2]);
        return new Date(Date.UTC(year, month, day, 3, 0, 0));
    }

    static toDateFormated(date: Date): string {
        let day = this.addZeroIfNecessary(date.getDate() + 1);
        let month = this.addZeroIfNecessary(date.getMonth() + 1);
        let year = date.getFullYear();
        return `${year}-${month}-${day}`
    }

    private static addZeroIfNecessary(value: number): string {
        return value < 10 ? `0${value}` : value.toString();
    }

    static getBase64ImageFromURL(url : any) {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.setAttribute("crossOrigin", "anonymous");
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx!.drawImage(img, 0, 0);
            var dataURL = canvas.toDataURL("image/png");
            resolve(dataURL);
          };
          img.onerror = error => {
            reject(error);
          };
          img.src = url;
        });
      }
}