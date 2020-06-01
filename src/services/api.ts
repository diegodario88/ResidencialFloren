import axios from 'axios'
import { OnCallGroup } from '../entities/OnCallGroup'
export default class Api {
  // production
  static baseUrl = 'https://floren-api.appspot.com/api/v2/';

  // dev
  // static baseUrl = "http://localhost:1337/api/v2/";

  public static async get (url: string): Promise<OnCallGroup> {
    const PathApi = `${this.baseUrl}${url}`
    const response = await axios.get(PathApi)
    return response.data
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static async post (url: string, data: object): Promise<any> {
    const PathApi = `${this.baseUrl}${url}`
    const response = await axios.post(PathApi, data)
    return response.data
  }
}
