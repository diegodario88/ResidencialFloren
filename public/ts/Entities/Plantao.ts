import { Farmacia } from "./Farmacia";

export class Plantao {
    nome: string;
    farmaciaPrincipal: Farmacia;
    farmaciaSecundaria: Farmacia;
    plantao?: Date;


    constructor(nome: string, principal: Farmacia, secundaria: Farmacia, plantao?: Date) {

        this.nome = nome;
        this.farmaciaPrincipal = principal;
        this.farmaciaSecundaria = secundaria;


    }

}