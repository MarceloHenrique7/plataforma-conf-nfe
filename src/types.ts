export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface User {
  id: string;              // ID único do usuário
  name: string;            // Nome do usuário
  email: string;           // Email do usuário
  password: string;        // Senha do usuário
  role: Role;              // Papel do usuário (ADMIN ou USER)
  createdAt: Date;         // Data de criação do usuário
  updatedAt: Date;         // Data de atualização do usuário
  nfe: INFe[];              // Lista de NFe associadas ao usuário
}

export interface Product {
  id: string;        // ID único do produto
  cEAN?: string;     // Código de barras
  cEANTrib?: string; // Código de barras tributário
  cProd?: string;    // Código do produto
  indTot?: string;   // Indicador total
  nItemPed?: string; // Número do item no pedido
  vProd?: string;    // Valor do produto
  vUnCom?: string;   // Valor unitário comercializado
  vUnTrib?: string;  // Valor unitário tributário
  xPed?: string;     // Código do pedido
  xProd?: string;    // Descrição do produto
  qCom?: string;     // Quantidade comercializada
  nfeId: string;     // ID da NFe associada
  verified: boolean; // Status de verificação (adicionado)

}

export interface INFe {
  id: string;                // ID único da NFe
  codNFe?: string;           // Código da NFe
  version?: string;          // Versão da NFe
  autXmlCpf?: string;        // CPF autorizado para XML
  verified: boolean;         // Status de verificação
  createdAt: Date;           // Data de criação
  verifiedAt?: Date;         // Data de verificação
  table?: number;            // Número da tabela
  orderCode?: number;        // Código do pedido
  emitName?: string;         // Nome do emitente
  emitCnpj?: string;         // CNPJ do emitente
  emitIE?: string;           // Inscrição estadual do emitente
  emitCRT?: string;          // Código do regime tributário do emitente
  enderEmitLgr?: string;     // Logradouro do emitente
  enderEmitNro?: string;     // Número do endereço do emitente
  enderEmitBairro?: string;  // Bairro do emitente
  enderEmitcMun?: string;    // Código do município do emitente
  enderEmitxMun?: string;    // Nome do município do emitente
  enderEmitUF?: string;      // Unidade federativa do emitente
  enderEmitCep?: string;     // Código postal do emitente
  enderEmitcPais?: string;   // Código do país do emitente
  enderEmitxPais?: string;   // Nome do país do emitente
  enderEmitFone?: string;    // Telefone do emitente
  destCpf?: string;          // CPF do destinatário
  destxNome?: string;        // Nome do destinatário
  destindIEDest?: string;    // Indicador de IE do destinatário
  destEmail?: string;        // Email do destinatário
  enderDestLgr?: string;     // Logradouro do destinatário
  enderDestNro?: string;     // Número do endereço do destinatário
  enderDestBairro?: string;  // Bairro do destinatário
  enderDestcMun?: string;    // Código do município do destinatário
  enderDestxMun?: string;    // Nome do município do destinatário
  enderDestUF?: string;      // Unidade federativa do destinatário
  enderDestCep?: string;     // Código postal do destinatário
  enderDestcPais?: string;   // Código do país do destinatário
  enderDestxPais?: string;   // Nome do país do destinatário
  enderDestFone?: string;    // Telefone do destinatário
  infCpl?: string;           // Informações complementares
  userId: string;            // ID do usuário associado
  user: User;                // Objeto do usuário associado
  products: Product[];       // Lista de produtos associados
}


export interface ResultSingleNFe {
  nfe: INFe;
  dealer: {
    _id: string;
    cpf_cnpj: string;
    responsibleStructure: string;
  };
}
