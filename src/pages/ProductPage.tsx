import { ScrollArea } from "../components/ui/scroll-area";
import { useGetmyNFe, useUpdateNFe } from "../api/ApiMyNFe";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/button";
import LabelViewer from "../components/label-viewer";
import InputProduct from "../components/InputProductPage";
import ProductDetails from "../components/ProductsDetails";
import ProductList from "../components/ProductsList";
import { Product } from "../types";

const Popover = ({ data, endVerified, message, msgBtn, onClose }: { data: any, endVerified: boolean, message: string; msgBtn: string; onClose: () => void }) => {


  const adressOfDest = `
    ${data.nfe.enderDestLgr}, 
    ${data.nfe.enderDestBairro}, 
    ${data.nfe.enderDestNro}, 
    CEP: ${data.nfe.enderDestCep?.slice(0, 5)}-${data.nfe.enderDestCep?.slice(5)}, 
    ${data.nfe.enderDestxMun} -
    ${data.nfe.enderDestUF}, 
  `

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      tabIndex={0}
    >
      <div className="flex flex-col gap-2 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="font-bold text-lg">{message}</h2>
        <div className="flex items-center justify-between ">
            <Button
              onClick={onClose}
              className="text-white rounded"
            >
              {msgBtn}
            </Button>
            {
            endVerified && (
            <div>
              <LabelViewer
                name={data.nfe.destxNome?.toString() || '(Sem Nome Informado)'}
                address={adressOfDest}
                orderCode={data.nfe.orderCode}
                dealer={''}
              />
            </div>
            )
          }
        </div>

      </div>

      
    </div>
  );
};


interface QtdProductFound {
  id: string;
  name: string;
  cProd: string;
  qtd: number;
}

const ProductPage = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetmyNFe(id as string); 
  const { updateNFe } = useUpdateNFe(); 
  const [products, setProducts] = useState<Product[]>([]);
  const [productCode, setProductCode] = useState(""); 
  const [productFound, setProductFound] = useState<Product | null>(null); 
  const [showPopoverNotF, setShowPopoverNotF] = useState(false); 
  const [showPopoverNFeVerified, setShowPopoverNFeVerified] = useState(true); 
  const [totalProdRead, setTotalProdRead] = useState<number>(0)
  const navigate = useNavigate()
  
  const [qtdProductFound, setqtdProductFound] = useState< QtdProductFound[]>([]); 

  console.log(data)

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const table = queryParams.get("table");
  const inputRef = useRef<HTMLInputElement>(null);

  
  useEffect(() => {
    if (data?.nfe?.products) {
      setProducts(data.nfe.products);
    }
  }, [data]);
  
  const handleSearchProduct = (code: string) => {
    const foundProductIndex = products.findIndex(
      (prod) => prod.cEAN === code || prod.cProd === code
    );
  
    if (foundProductIndex !== -1) {
      const foundProduct = products[foundProductIndex];
      setProductFound(foundProduct);
  
      const indexExistInQtdArr = qtdProductFound.findIndex(
        (prevQtd) => prevQtd.id === code
      );
  
      if (indexExistInQtdArr !== -1) {
        const updatedQtdProductFound = [...qtdProductFound];
        updatedQtdProductFound[indexExistInQtdArr].qtd += 1;
        setqtdProductFound(updatedQtdProductFound);
      } else {
        setqtdProductFound((prev: any) => [...prev, { id: code, qtd: 1, name: foundProduct.xProd, cProd: foundProduct.cProd }]);
      }
  
      const updatedProducts = products.filter((_, index) => index !== foundProductIndex);
      setProducts(updatedProducts);
  
      setProductCode("");
  
      if (updatedProducts.length === 0) {
        setTotalProdRead(0);
        updateNFe({
          codNFe: data?.nfe?.codNFe as string,
          verified: true,
          table: Number(table as number | null),
        });
      }
  
      // Incrementa a contagem total de produtos verificados
      setTotalProdRead((prevNumber) => prevNumber + 1);
    } else {
      setShowPopoverNotF(true);
      setProductFound(null); // Se não encontrado, limpa o estado
    }
  };
  
  
  const handleAddButton = (code: string): void => {
    handleSearchProduct(code)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;
    setProductCode(code); 
    handleSearchProduct(code); 
  };


  const handleClosePopover = () => {
    setShowPopoverNotF(false); 
    setShowPopoverNFeVerified(false)
    setProductCode("")
    inputRef.current?.focus()
  };

  const handleClosePopoverNFeVerified = () => {
    setShowPopoverNFeVerified(false)
    navigate({
      pathname: '/conf'
    })
    inputRef.current?.focus()
  };

  
  if (isLoading) {
    return "Carregando...";
  }

  if (!data?.nfe) {
    return <div className="flex justify-center items-center h-screen">NFe not found</div>;
  }

  const adressOfDest = `
    ${data.nfe.enderDestLgr}, 
    ${data.nfe.enderDestBairro}, 
    ${data.nfe.enderDestNro}, 
    CEP: ${data.nfe.enderDestCep?.slice(0, 5)}-${data.nfe.enderDestCep?.slice(5)}, 
    ${data.nfe.enderDestxMun} -
    ${data.nfe.enderDestUF}, 
  `

  return (
    <div className="flex flex-col gap-20">
      <div>
        <h1 className="font-bold text-slate-800 text-3xl">Conferir Produtos</h1>
      </div>
      {
        data?.nfe?.verified === false ? (
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex flex-col gap-4 w-[50%]">
              <InputProduct inputRef={inputRef} productCode={productCode} handleInputChange={handleInputChange}/>

              {productFound ? (
                <ProductDetails productFound={productFound}/>
              ) : productCode.length >= 5 && !productFound && showPopoverNotF ? (
                <Popover
                data={data}
                endVerified={false}
                message="Material não existe nessa Nota Fiscal"
                msgBtn="Ok"
                onClose={handleClosePopover}
              />
              ) : null}
              <div className="w-full md:w-auto flex-1 p-10 rounded-md bg-gray-100 md:p-2">
                <ScrollArea className="p-2 h-full w-full rounded-md border">
                <div className="flex flex-col gap-8 w-full h-full max-h-96 ">
                  {qtdProductFound?.map((prod) => {
                      return (
                      <div className="transition 600ms hover:bg-gray-800 hover:text-white border-2 border-gray-800 rounded-md p-2 flex flex-col text-gray-700 font-bold">
                        <h1>{prod.name}</h1>
                        <h1>cProd: {prod.cProd}</h1>
                        <h1>Gravados: {prod.qtd}</h1>
                      </div>
                      )
                    })} 
                </div>
                </ScrollArea>
              </div>

              </div>

            <div className="w-full h-full p-10 flex flex-col gap-8 rounded-md bg-gray-100">
              <div className="font-bold text-center text-2xl">
                <h1>Produtos Localizados</h1>
              </div>
              <div className="flex flex-col flex-1 p-2 text-gray-600 flex-wrap gap-2 font-bold justify-between">
                <h1>
                  Nfe{data.nfe?.codNFe}
                </h1>

                  <div className="flex justify-between">
                    <p className="flex items-center gap-2">
                      <span className="text-lg">
                        Restante 
                      </span>
                      <span className="px-2 bg-gray-200 border-2 border-blue-600  rounded-lg">
                        {products.length}
                      </span>
                    </p>
                    <p>
                    <p className="flex items-center gap-2">
                      <span className="text-lg">
                        Gravados 
                      </span>
                      <span className="px-2 bg-gray-200 border-2 border-blue-600 rounded-lg">
                        {totalProdRead}
                      </span>
                    </p>
                    </p>
                </div>
              </div>
              <div className="w-full md:w-auto flex-1 p-10 rounded-md bg-gray-100 md:p-2">
                  <ProductList handleAddButton={handleAddButton} products={products}/>
              </div>
              <LabelViewer name={data?.nfe?.destxNome?.toString() || '(Sem Nome Informado) '} address={adressOfDest} orderCode={Number(data.nfe.orderCode)} dealer={''}/>

            </div>
            {products.length === 0 && (
            <Popover
              data={data}
              endVerified={true}
              message={`Nota fiscal: ${data.nfe.codNFe} - verificada com sucesso.`}
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
                data={data}
                endVerified={false}
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
