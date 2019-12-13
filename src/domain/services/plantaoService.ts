import axios from 'axios';
import Plantao from '../entities/Plantao';

export default class PlantaoService {
    public static async get(): Promise<Plantao> {
        const response = await axios
            .get('https://floren-api.appspot.com/api/v1/plantoes/atual');
        return response.data;
    }
}