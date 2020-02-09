import Farmacia from "./Farmacia";

export default class Plantao {

    farmacias?: Array<Farmacia>;
    _id?: string;
    name?: string;

    constructor(obj: any) {
        this.farmacias = obj.farmacias;
        this._id = obj._id
        this.name = obj.name;

    }
}