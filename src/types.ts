export interface Product {
  cEAN: string;       // Código de barras
  cEANTrib: string;
  cProd: string;      // Código do produto
  indTot: string;
  nItemPed: string;
  vProd: string;
  vUnCom: string;
  vUnTrib: string;
  xPed: string;
  xProd: string;      // Nome do produto
  verified: boolean;  // Propriedade para indicar se o produto foi verificado
}

export interface INFe {
  codNFe: string;
  version: string;
  autXML: {
    cpf: string;
  };
  verified: boolean;
  products: Product[]; // Use o tipo Product aqui
  createdAt: Date;
  verifiedAt: string;
}