import axios from "axios";
import Plantao from "../entities/Plantao";

export default class PlantaoService {
  //production
  static baseUrl : string = 'https://floren-api.appspot.com/api/v1/'

  //dev
  //static baseUrl: string = "http://localhost:1337/api/v1/";

  public static async get(url: string): Promise<Plantao> {
    const PathApi: string = `${this.baseUrl}${url}`;
    const response = await axios.get(PathApi);
    return response.data;
  }

  public static async post(url: string, data: object): Promise<any> {
    const PathApi: string = `${this.baseUrl}${url}`;
    const response = await axios.post(PathApi, data);
    return response.data;
  }
}
