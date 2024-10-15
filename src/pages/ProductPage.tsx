import { ScrollArea } from "../components/ui/scroll-area";
import { useGetmyNFe, useUpdateNFe } from "../api/ApiMyNFe";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

// Definindo a interface do produto
interface Product {
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

// Componente de Popover
const Popover = ({ message, msgBtn, onClose }: { message: string; msgBtn: string; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="font-bold text-lg">{message}</h2>
        <Button
          onClick={onClose}
          className="mt-4 text-white p-2 rounded"
        >
          {msgBtn}
        </Button>
      </div>
    </div>
  );
};

const ProductPage = () => {
  const { id } = useParams(); // Pega o ID da NF-e a partir da URL

  const { nfe, isLoading } = useGetmyNFe(id as string); // Busca os produtos da NF-e
  const { updateNFe } = useUpdateNFe(); 
  const [products, setProducts] = useState<Product[]>([]); // Estado para armazenar os produtos
  const [productCode, setProductCode] = useState(""); // Estado para o valor do código do produto
  const [productFound, setProductFound] = useState<Product | null>(null); // Estado para o produto encontrado
  const [showPopoverNotF, setShowPopoverNotF] = useState(false); // Estado para controlar a visibilidade do popover
  const [showPopoverNFeVerified, setShowPopoverNFeVerified] = useState(true); // Estado para controlar a visibilidade do popover
  const navigate = useNavigate()


  useEffect(() => {
    if (nfe && nfe.products) {
      // Adiciona a propriedade verified a cada produto, assumindo que seja false por padrão
      const productsWithVerifiedStatus = nfe.products.map(product => ({
        ...product,
        verified: product.verified ?? false, // Se a propriedade não existir, inicializa como false
      }));
      setProducts(productsWithVerifiedStatus); // Atualiza o estado com os produtos da NF-e
    }
  }, [nfe]);
  
  // Função para verificar se o produto existe, considerando cEAN e cProd
  const handleSearchProduct = (code: string) => {
    const foundProduct = products.find((prod) => 
      prod.cEAN === code || prod.cProd === code // Verifica se o cEAN ou cProd é igual ao código inserido
    );
  
    if (foundProduct) {
      setProductFound(foundProduct); // Atualiza o estado com o produto encontrado
      setProducts((prevProducts) => 
        prevProducts.filter((prod) => prod.cEAN !== foundProduct.cEAN) // Remove o produto da lista
      );
      setProductCode(""); // Limpa o campo de entrada
  
      // Verifica se todos os produtos foram verificados
      if (products.length === 1) { // Se o produto encontrado era o último
        // Passando a estrutura correta para updateNFe
        updateNFe({ codNFe: nfe?.codNFe as string, verified: true }); // Atualiza a NFe
      }
    } else {
      setShowPopoverNotF(true)
      setProductFound(null); // Se não encontrado, limpa o estado
    }
  };
  

  // Função chamada enquanto o usuário digita
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;
    setProductCode(code); // Atualiza o valor do input
    handleSearchProduct(code); // Tenta buscar o produto conforme o código é digitado
  };

  // Função para fechar o popover
  const handleClosePopover = () => {
    setShowPopoverNotF(false); // Fecha o popover
    setShowPopoverNFeVerified(false)
    setProductCode("")
  };

  const handleClosePopoverNFeVerified = () => {
    setShowPopoverNFeVerified(false)
    navigate({
      pathname: '/conf'
    })
  };

  if (isLoading) {
    return "Carregando...";
  }

  return (
    <div className="flex flex-col gap-20">
      <div>
        <h1 className="font-bold text-slate-800 text-3xl">Conferir Produtos</h1>
      </div>
      {
        nfe?.verified === false ? (
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex flex-col gap-4 w-[50%]">
              <Input
                type="text"
                placeholder="Insira o código do produto (cEAN ou cProd)"
                value={productCode} // Valor do input controlado
                onChange={handleInputChange} // Chama a função para verificar o produto enquanto digita
                className="border p-2 rounded"
              />

              {productFound ? (
                <div className="bg-green-100 p-4 rounded">
                  <h2>Produto Encontrado:</h2>
                  <p>Nome: {productFound.xProd}</p>
                  <p>Código de Barras (cEAN): {productFound.cEAN}</p>
                  <p>Código do Produto (cProd): {productFound.cProd}</p>
                </div>
              ) : productCode.length >= 5 && !productFound && showPopoverNotF ? (
                <Popover 
                message="Material não existe nessa Nota Fiscal"
                msgBtn="Ok"
                onClose={handleClosePopover}
              />
              ) : null}
            </div>

            <div className="w-full h-full p-10 flex flex-col gap-8 rounded-md bg-gray-100">
              <div className="font-bold text-center text-2xl">
                <h1>Produtos Localizados</h1>
              </div>
              <div className="flex flex-1 p-2 text-gray-600 flex-wrap gap-2 font-bold justify-between">
                <h1>
                  Nfe{nfe?.codNFe}
                </h1>
                <p>
                  Restante: {products.length}
                </p>
              </div>
              <div className="w-full md:w-auto flex-1 p-10 rounded-md bg-gray-100 md:p-2">
                <ScrollArea className="p-2 h-full w-full rounded-md border">
                <div className="w-full h-full flex max-h-96 flex-col gap-3">
                    {products.filter(prod => !prod.verified).map((prod) => (
                      <div key={prod.cEAN} className="w-full text-gray-800 font-bold rounded-sm border-slate-700 border-2 p-2 text-sm">
                        <h1>{prod.xProd || ""}</h1>
                        <p>cEAN: {prod.cEAN || ""}</p>
                        <p>cProd: {prod.cProd || ""}</p>
                      </div>
                    ))}
                
                  </div>
                  </ScrollArea>
              </div>
            </div>
            {products.length === 0 && (
            <Popover 
              message={`Nota fiscal: ${nfe.codNFe} - verificada com sucesso.`}
              msgBtn="Finalizar"
              onClose={handleClosePopoverNFeVerified}
            />
          )}
          </div>

        ) : (
          <div>
            {
              showPopoverNFeVerified && (
                <Popover 
                message="Nota já verificada."
                msgBtn="OK"
                onClose={handleClosePopoverNFeVerified}
              />
              )
            }

          </div>
        )
      }
    </div>
      
  );
};

export default ProductPage;
