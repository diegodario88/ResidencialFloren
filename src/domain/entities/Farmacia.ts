export default class Farmacia {

    name: string;
    telefone: string;
    endereco: string;
    geoloc: {
        lat: object,
        lng: object

    };
    place_id: string;

    constructor(name: string, telefone: string, endereco: string, geoloc: any, place_id: string) {
        this.name = name;
        this.telefone = telefone;
        this.endereco = endereco;
        this.geoloc = geoloc;
        this.place_id = place_id;

    }
}