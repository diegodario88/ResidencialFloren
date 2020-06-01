import axios from 'axios'
import { OnCallGroup, Calendar } from '../entities/OnCallGroup'

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

  public static async post (url: string, date: object): Promise<Array<Calendar>>{
    const PathApi = `${this.baseUrl}${url}`
    const response = await axios.post(PathApi, date)
    return response.data
  }
}
