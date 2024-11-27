import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetAllNFeNoOrder } from "../api/ApiMyNFe";
import PaginationSelector from "../components/PaginationSelector";
import { INFe } from "../types";

const ResultAllNFePage = () => {
  const [searchParams] = useSearchParams();

  const [searchState, setSearchState] = useState({
    currentPage: 1,
    sortOption: "bestMatch",
    startDate: searchParams.get("startDate"),
    endDate: searchParams.get("endDate"),
  });

  console.log(searchParams.get("startDate"))
  console.log(searchParams.get("endDate"))

  const { data: allNFeData, isLoading } = useGetAllNFeNoOrder(
    searchState.currentPage,
    10,
    searchParams.get("startDate") as string,
    searchParams.get("endDate") as string
  );

  if (isLoading) {
    return "Loading...";
  }

  const renderTable = (data: INFe[]) => (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-4">Todas as Notas Fiscais</h2>
      <table className="min-w-full rounded-md border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2">Cod.Pedido</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Data de Verificação</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((nfe: INFe) => (
              <tr key={nfe.codNFe}>
                <td className="border border-gray-300 px-4 py-2 text-center">{nfe.orderCode || "Não informado"}</td>
                <td className="border border-gray-300 px-4 py-2">{nfe?.destEmail?.toLocaleLowerCase() || "Não informado"}</td>
                <td className={`border border-gray-300 px-4 py-2 text-center`}>
                  {nfe.verified ? new Date(nfe.verifiedAt as Date).toLocaleString() : "N/V"}
                </td>
                <td
                  className={`border border-gray-300 px-4 py-2 text-center ${
                    nfe.verified ? "bg-green-200" : "bg-yellow-200"
                  }`}
                >
                  {nfe.verified ? "Verificado" : "Pendente"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center px-4 py-2">
                Nenhuma Nota Fiscal Encontrada
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="flex flex-col gap-12 p-4">
      {renderTable(allNFeData?.data || [])}
      <PaginationSelector
        onPageChange={(page) => setSearchState({ ...searchState, currentPage: page })}
        pages={Number(allNFeData?.totPages) || 1}
        page={searchState.currentPage}
      />
    </div>
  );
};

export default ResultAllNFePage;
