export default class StringUtils {
  static normalize(text: string): string {
    const normalizeText = text
      .normalize("NFD")
      .replace(/([\u0300-\u036f]|[^0-9a-zA-Z\s])/g, "");
    return normalizeText;
  }

  //Makes a URL for Google Places search
  static makeUrl(name: string, adress: string): string {
    const nameNormalize = this.normalize(name);
    const url = `https://www.google.com/maps/search/?api=1&query=${nameNormalize},${adress} - Loanda - PR`;
    return url;
  }
}
