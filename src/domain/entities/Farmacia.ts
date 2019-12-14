export default class Farmacia {

    name: string;
    telefone: string;
    endereco: string;
    geoloc: {
        lat: object,
        lng: object

    };

    constructor(name: string, telefone: string, endereco: string, geoloc: any) {
        this.name = name;
        this.telefone = telefone;
        this.endereco = endereco;
        this.geoloc = geoloc;

    }
}