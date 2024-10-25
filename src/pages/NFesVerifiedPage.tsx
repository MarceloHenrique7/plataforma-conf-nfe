import { useState } from "react";
import { Button } from "../components/ui/button";

import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
 } from "../components/ui/dialog";
import { Product } from "../types";
import { ScrollArea } from "../components/ui/scroll-area";
import DropDownOption from "../components/DropDownOption";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import SearchBar from "../components/SearchBar";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useGetAllNFe } from "../api/ApiMyNFe";
import PaginationSelector from "../components/PaginationSelector";

export type SearchState = {
    searchQuery: string;
    currentPageVerified: number; 
    currentPageNotVerified: number; 
    sortOption: string; 
} 

const formSchema = z.object({
    searchQuery: z.string({ 
        required_error: "NFe cod is required" 
    }),
})


export type SearchForm = z.infer<typeof formSchema>

const NFesVerifiedPage = () => {
    const [searchState, setSearchState] = useState<SearchState>({
      searchQuery: "",
      currentPageVerified: 1,
      currentPageNotVerified: 1,
      sortOption: "bestMatch",
    });
  
    const [products, setProducts] = useState(Array<Product>)

    const navigate = useNavigate();
  
    // Para NF-es verificadas
    const { data: dataVerified, isLoading: isLoadingVerified } = useGetAllNFe(
      searchState.currentPageVerified, 
      10, 
      searchState.searchQuery
    );
  
    // Para NF-es não verificadas
    const { data: dataNotVerified, isLoading: isLoadingNotVerified } = useGetAllNFe(
      searchState.currentPageNotVerified, 
      10, 
      searchState.searchQuery
    );
  
    const setSortOption = (sortOption: string) => {
      setSearchState((prevState) => ({
        ...prevState,
        sortOption,
        currentPageVerified: 1, // Reiniciar a página ao mudar o filtro
        currentPageNotVerified: 1,
      }));
    };
  
    const handleOnClick = (codNFe: string) => {
      const nfe = dataVerified?.data.resVerified.find((nfe) => nfe.codNFe === codNFe);
      const nfeD = dataNotVerified?.data.resNotVerified.find((nfe) => nfe.codNFe === codNFe);
      if (nfe) {
        setProducts(nfe?.products); // Atualiza os produtos da NF-e
      } else if (nfeD) {
        setProducts(nfeD?.products); // Atualiza os produtos da NF-e
      }
    };
  
    const setPageVerified = (page: number) => {
      setSearchState((prevState) => ({
        ...prevState,
        currentPageVerified: page, // Atualiza somente a página de NF-es verificadas
      }));
    };
  
    const setPageNotVerified = (page: number) => {
      setSearchState((prevState) => ({
        ...prevState,
        currentPageNotVerified: page, // Atualiza somente a página de NF-es não verificadas
      }));
    };
  
    const handleSearchSubmit = (searchForm: SearchForm) => {
      setSearchState((prevState) => ({
        ...prevState,
        searchQuery: searchForm.searchQuery,
        currentPageVerified: 1, // Reiniciar página ao buscar
        currentPageNotVerified: 1,
      }));
      navigate({
        pathname: `/search/nfe/${searchForm.searchQuery}`,
      });
    };
  
    if (isLoadingVerified || isLoadingNotVerified) {
      return "Loading...";
    }
  
    return (
      <div className="flex flex-col gap-12 p-4">
        <Tabs defaultValue="verified" className="flex flex-col items-center justify-center gap-10 w-full">
          <div className="w-full">
            <TabsList className="w-full flex items-center justify-around mb-5 mt-5 border-b-2 border-gray-200">
              <TabsTrigger value="verified" className="w-full text-center">
                Verificadas
              </TabsTrigger>
              <TabsTrigger value="not-verified" className="w-full text-center">
                Não Verificadas
              </TabsTrigger>
            </TabsList>
            <div className="flex gap-12">
              <SearchBar searchQuery={searchState.searchQuery} onSubmit={handleSearchSubmit} placeHolder="Procure por uma nota fiscal" />
              <DropDownOption sortOption={searchState.sortOption} onChange={(value) => setSortOption(value)} />
            </div>
          </div>
  
          {/* Conteúdo da aba de NF-es Verificadas */}
          <TabsContent value="verified" className="w-full">
            <div className="grid grid-cols-1 gap-10">
              {dataVerified?.data.resVerified?.map((nfe) => (
                <div key={nfe.codNFe} className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col gap-4">
                  <div>
                    <h1 className="text-xl font-bold">Cod.NFe: {nfe.codNFe}</h1>
                    <p className="text-gray-600">Versão: {nfe.version}</p>
                    <p className="text-gray-600">Criado: {nfe?.createdAt ? new Date(nfe.createdAt).toLocaleString() : "N/A"}</p>
                    <p className="text-gray-600">Verificado: {nfe?.verifiedAt ? new Date(nfe.verifiedAt).toLocaleString() : "N/A"}</p>
                    <p className="text-gray-600">N.Pedido: {nfe.products[0].xPed || nfe?.orderCode}</p>
                    <p className="text-gray-600">Mesa: {nfe?.table ? nfe.table : "S/M"}</p>
                  </div>
                  <Dialog>
                    <DialogTrigger className="self-start">
                      <Button variant="outline" className="border-2 border-gray-800 hover:border-gray-800" onClick={() => handleOnClick(nfe.codNFe)}>
                        Ver Produtos
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-auto max-w-[75%] max-h-[75%] flex">
                      <ScrollArea className="p-4">
                        {products?.map((product: any) => (
                          <div key={product.cEAN} className="p-3">
                            <DialogHeader>
                              <DialogTitle>{product.xProd}</DialogTitle>
                            </DialogHeader>
                            <DialogDescription className="flex flex-col">
                              <span>Cod EAN: {product.cEAN}</span>
                              <span>Cod Prod: {product.cProd}</span>
                              <span>Qtd: {Number(product.qCom)}</span>
                            </DialogDescription>
                          </div>
                        ))}
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </div>
            <PaginationSelector onPageChange={setPageVerified} pages={Number(dataVerified?.totPagesVerified)} page={Number(dataVerified?.currentPage)} />
          </TabsContent>
  
          {/* Conteúdo da aba de NF-es Não Verificadas */}
          <TabsContent value="not-verified" className="w-full">
            <div className="grid grid-cols-1 gap-10">
              {dataNotVerified?.data.resNotVerified?.map((nfe) => (
                <div key={nfe.codNFe} className="bg-red-100 p-6 rounded-lg shadow-md flex flex-col gap-4">
                  <div>
                    <h1 className="text-xl font-bold">Cod.NFe: {nfe.codNFe}</h1>
                    <p className="text-gray-600">Versão: {nfe.version}</p>
                    <p className="text-gray-600">Criado: {nfe?.createdAt ? new Date(nfe.createdAt).toLocaleString() : "N/A"}</p>
                    <p className="text-gray-600">N.Pedido: {nfe.products[0].xPed || nfe?.orderCode}</p>
                    <p className="text-gray-600">Mesa: {nfe?.table ? nfe.table : "S/M"}</p>
                  </div>
                  <Dialog>
                    <DialogTrigger className="self-start">
                      <Button variant="outline" className="border-2 border-gray-800 hover:border-gray-800" onClick={() => handleOnClick(nfe.codNFe)}>
                        Ver Produtos
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-auto max-w-[75%] max-h-[75%] flex">
                      <ScrollArea className="p-4">
                        {products?.map((product) => (
                          <div key={product.cEAN} className="p-3">
                            <DialogHeader>
                              <DialogTitle>{product.xProd}</DialogTitle>
                            </DialogHeader>
                            <DialogDescription className="flex flex-col">
                              <span>Cod EAN: {product.cEAN}</span>
                              <span>Cod Prod: {product.cProd}</span>
                              <span>Qtd: {Number(product.qCom)}</span>
                            </DialogDescription>
                          </div>
                        ))}
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
            </div>
            <PaginationSelector onPageChange={setPageNotVerified} pages={Number(dataNotVerified?.totPagesNotVerified)} page={Number(dataNotVerified?.currentPage)} />
          </TabsContent>
        </Tabs>
      </div>
    );
  };
  
  export default NFesVerifiedPage;
  