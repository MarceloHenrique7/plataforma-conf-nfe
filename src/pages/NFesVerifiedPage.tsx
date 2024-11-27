import { useState } from "react";
import { Product } from "../types";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import SearchBar from "../components/SearchBar";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useGetAllNFe } from "../api/ApiMyNFe";
import PaginationSelector from "../components/PaginationSelector";
import CardNFe from "../components/CardNFe";

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
  
    const [products, setProducts] = useState<Array<Product>>([]);

    const navigate = useNavigate();
  
    const { data: dataVerified, isLoading: isLoadingVerified } = useGetAllNFe(
      searchState.currentPageVerified, 
      10, 
      searchState.searchQuery
    );
  
    const { data: dataNotVerified, isLoading: isLoadingNotVerified } = useGetAllNFe(
      searchState.currentPageNotVerified, 
      10, 
      searchState.searchQuery
    );
  
    const handleOnClick = (codNFe: string) => {
      const nfe = dataVerified?.data.resVerified.find((nfe) => nfe.codNFe === codNFe);
      const nfeD = dataNotVerified?.data.resNotVerified.find((nfe) => nfe.codNFe === codNFe);
      if (nfe) {
        setProducts(nfe?.products);
      } else if (nfeD) {
        setProducts(nfeD?.products);
      }
    };
  
    const setPageVerified = (page: number) => {
      setSearchState((prevState) => ({
        ...prevState,
        currentPageVerified: page,
      }));
    };
  
    const setPageNotVerified = (page: number) => {
      setSearchState((prevState) => ({
        ...prevState,
        currentPageNotVerified: page,
      }));
    };
  
    const handleSearchSubmit = (searchForm: SearchForm) => {
      setSearchState((prevState) => ({
        ...prevState,
        searchQuery: searchForm.searchQuery,
        currentPageVerified: 1,
        currentPageNotVerified: 1,
      }));
      navigate({
        pathname: `/procurar/nfe/${searchForm.searchQuery}`,
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
            </div>
          </div>
  
          <TabsContent value="verified" className="w-full">
            <div className="grid grid-cols-1 gap-10">
              {dataVerified?.data.resVerified?.map((nfe) => (
                <CardNFe key={nfe.codNFe} handleOnClick={handleOnClick} nfe={nfe} products={products} isVerified={nfe.verified}/>
              ))}
            </div>
            {
              Number(dataVerified?.data.resVerified.length) > 0 ? (
                <PaginationSelector 
                  onPageChange={setPageVerified} 
                  pages={Number(dataVerified?.totPagesVerified)} // Usando totPagesVerified
                  page={searchState.currentPageVerified} 
                />
              ) : (
                <div>
                  <h1>Nenhuma Nota Fiscal Encontrada</h1>
                </div>
              )
            }
          </TabsContent>
  
          <TabsContent value="not-verified" className="w-full">
            <div className="grid grid-cols-1 gap-10">
              {dataNotVerified?.data.resNotVerified?.map((nfe) => (
                <CardNFe key={nfe.codNFe} handleOnClick={handleOnClick} nfe={nfe} products={products} isVerified={nfe.verified}/>
              ))}
            </div>
            {
              Number(dataNotVerified?.data.resNotVerified.length) > 0 ? (
                <PaginationSelector 
                  onPageChange={setPageNotVerified} 
                  pages={Number(dataNotVerified?.totPagesNotVerified)} // Usando totPagesNotVerified
                  page={searchState.currentPageNotVerified} 
                />
              ) : (
                <div>
                  <h1>Nenhuma Nota Fiscal Encontrada</h1>
                </div>
              )
            }
          </TabsContent>
        </Tabs>
      </div>
    );
  };
  
export default NFesVerifiedPage;
