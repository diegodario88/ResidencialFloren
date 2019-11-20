import { Plantao } from "../Entities/Plantao";
import { seedFarmacia } from "./seedFarmacia";

export class seedPlantao {

    static SeedPlantao(): Array<Plantao> {
        let listaPlantao: Array<Plantao> = [
            new Plantao(
                "G1",
                seedFarmacia.SeedFarmacias()[8],
                seedFarmacia.SeedFarmacias()[9]
            ),
            new Plantao(
                "G2",
                seedFarmacia.SeedFarmacias()[0],
                seedFarmacia.SeedFarmacias()[10]
            ),
            new Plantao(
                "G3",
                seedFarmacia.SeedFarmacias()[1],
                seedFarmacia.SeedFarmacias()[11]
            ),
            new Plantao(
                "G4",
                seedFarmacia.SeedFarmacias()[12],
                seedFarmacia.SeedFarmacias()[2]
            ),
            new Plantao(
                "G5",
                seedFarmacia.SeedFarmacias()[3],
                seedFarmacia.SeedFarmacias()[5]
            ),
            new Plantao(
                "G6",
                seedFarmacia.SeedFarmacias()[4],
                seedFarmacia.SeedFarmacias()[7]
            ),
            new Plantao(
                "G7",
                seedFarmacia.SeedFarmacias()[6],
                seedFarmacia.SeedFarmacias()[8]
            ),
            new Plantao(
                "G8",
                seedFarmacia.SeedFarmacias()[9],
                seedFarmacia.SeedFarmacias()[10]
            ),
            new Plantao(
                "G9",
                seedFarmacia.SeedFarmacias()[0],
                seedFarmacia.SeedFarmacias()[1]
            ),
            new Plantao(
                "G10",
                seedFarmacia.SeedFarmacias()[11],
                seedFarmacia.SeedFarmacias()[12]
            ),
            new Plantao(
                "G11",
                seedFarmacia.SeedFarmacias()[2],
                seedFarmacia.SeedFarmacias()[3]
            ),
            new Plantao(
                "G12",
                seedFarmacia.SeedFarmacias()[5],
                seedFarmacia.SeedFarmacias()[4]
            ),
            new Plantao(
                "G13",
                seedFarmacia.SeedFarmacias()[7],
                seedFarmacia.SeedFarmacias()[6]
            ),

        ];

        return listaPlantao;

    }

}