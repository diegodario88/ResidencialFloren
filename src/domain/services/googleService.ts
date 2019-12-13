import axios from 'axios';


export default class GoogleService {
    public static async get(parameters: Array<any>): Promise<any> {

        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const apiKey = 'AIzaSyBP4eTxM_meOsX3-AJ2rybb3U6FacEKeDM';
        const url =
            `https://maps.googleapis.com/maps/api/geocode/json?address=${parameters},+Loanda+PR&key=${apiKey}`

        const response = await axios.get(proxyurl + url);
        return response.data.results;
    }
}
