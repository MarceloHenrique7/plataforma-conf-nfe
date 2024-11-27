import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SearchState } from "./NFesVerifiedPage";

import { SearchForm } from "../form/searchForm/SearchFormAllNFe";
import SearchFormAllNFe from "../form/searchForm/SearchFormAllNFe";

interface ExtendedSearchState extends SearchState {
    startDate: string | null;
    endDate: string | null;
}

const FindToLabelPage = () => {
    
    const [searchState, setSearchState] = useState<ExtendedSearchState>({
        searchQuery: "",
        currentPageVerified: 1,
        currentPageNotVerified: 1,
        sortOption: "bestMatch",
        startDate: null,
        endDate: null,
    });
    
    useEffect(() => {
        console.log("Updated searchState:", searchState);
    }, [searchState]);
    
    const navigate = useNavigate();

    const handleSearchSubmit = (searchForm: SearchForm) => {
        const startDateFormat = searchForm?.startDate?.toISOString() || null;
        const endDateFormat = searchForm?.endDate?.toISOString() || null;
    
        const queryParameters = new URLSearchParams({
            ...(startDateFormat ? { startDate: startDateFormat } : {}),
            ...(endDateFormat ? { endDate: endDateFormat } : {}),
        });
        

        if (searchForm.searchQuery) {
            navigate(`/procurar/nfe/${searchForm.searchQuery}`);
        } else {
            navigate(`/procurar/nfe/all?${queryParameters.toString()}`);
        }
        // Navegando para a rota
    };
    

    const handleOnChangeStartDate = (date: Date | null) => {
        const dateString = date ? date.toISOString() : null;
        console.log(dateString);
        setSearchState((prevState) => ({
            ...prevState,
            startDate: dateString,
        }));
    };

    const handleOnChangeEndDate = (date: Date | null) => {
        const dateString = date ? date.toISOString() : null;
        setSearchState((prevState) => ({
            ...prevState,
            endDate: dateString,
        }));
    };

    return (
        <div className="flex flex-col gap-10">
            <div>
                <h1 className="text-4xl font-bold">Procure por uma nota Fiscal</h1>
            </div>
            <div>
            <SearchFormAllNFe 
                onChangeStartDate={handleOnChangeStartDate}
                onChangeEndDate={handleOnChangeEndDate}
                onSubmit={handleSearchSubmit}
                placeHolder="Cod. da nota fiscal ou número do pedido"
            />
            </div>
        </div>
    );
};

export default FindToLabelPage;
