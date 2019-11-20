import { Farmacia } from "./Farmacia";

export class Plantao {
    nome: string;
    farmaciaPrincipal: Farmacia;
    farmaciaSecundaria: Farmacia;

    constructor(nome: string, principal: Farmacia, secundaria: Farmacia) {

        this.nome = nome;
        this.farmaciaPrincipal = principal;
        this.farmaciaSecundaria = secundaria;

    }

}