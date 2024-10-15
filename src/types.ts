



export interface INFe {
    codNFe: string,
    version: string,
    autXML: {
      cpf: string,
    },
    products: Array<{
      
        cEAN: string,
        cEANTrib: string,
        cProd: string,
        indTot: string,
        nItemPed: string,
        vProd: string,
        vUnCom: string,
        vUnTrib: string,
        xPed: string,
        xProd: string,
      }>;
      verified: boolean,
  }