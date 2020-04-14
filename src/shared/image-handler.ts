export default class ImageUtils {
  static getBase64ImageFromURL(url: any) {
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
      img.onerror = (error) => {
        reject(error);
      };
      img.src = url;
    });
  }
}
