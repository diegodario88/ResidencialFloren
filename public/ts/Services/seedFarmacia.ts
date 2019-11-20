import { Farmacia } from "../Entities/Farmacia";

export class seedFarmacia {


    static SeedFarmacias() {

        let listaFarmacia: Array<Farmacia> = [
            new Farmacia(
                //0
                "Farmácia Drogacenter",
                "(44) 3425-1367 ",
                "Av. Brasil, 1227 - Centro "
            ),
            new Farmacia(
                //1
                "Farmácia São Lucas",
                "(44) 3425-1011",
                "Rua Tókio, 343 - Centro "
            ),
            new Farmacia(
                //2
                "Farmácia Farma & Farma",
                "(44) 3425 - 3700",
                "Av.Pres.Get.Vargas, 1041 - Centro "
            ),
            new Farmacia(
                //3
                "Farmácia União",
                "(44) 3425-2555",
                "Av.Des.M.de Mello, 1437 - Centro "
            ),
            new Farmacia(
                //4
                "Farmácia Farma Útil",
                "(44) 3425-2539",
                "Av.Brasil, 1137 - Centro"
            ),
            new Farmacia(
                //5
                "Farmácia Rede Líder",
                "(44) 3425-5200",
                "Av.Paraná, 1165 - Centro"
            ),
            new Farmacia(
                //6
                "Farmácia Du Preço Popular",
                "(44) 3425 - 2921",
                "Rua Accioly Filho, 448 - Centro "
            ),
            new Farmacia(
                //7
                "Farmácia Preço Baixo",
                "(44) 3425 - 1388",
                "Avenida Paraná, 1198 Centro"
            ),
            new Farmacia(
                //8
                "Farmácia Sto.Antônio",
                "(44) 3425-5725",
                "Av.Brasil, 819 - Centro "
            ),
            new Farmacia(
                //9
                "Farmácia Sta.Terezinha",
                "(44) 3425-1323",
                "Av.Brasil, 1094 - Centro "
            ),
            new Farmacia(
                //10
                "Farmácia Drogaminas",
                "(44) 3425 - 1090",
                "Av.Paraná, 1147 - Vila Nova"
            ),
            new Farmacia(
                //11
                "Farmácia Droganova",
                "(44) 3425 - 1304",
                "Av.Paraná, 1952 - Vila Nova "
            ),
            new Farmacia(
                //12
                "Farmácia Do Paulo",
                "(44) 3425 - 1915",
                "Rua Accioly Filho, 584 - Centro"
            )
        ];

        return listaFarmacia;
    }


}