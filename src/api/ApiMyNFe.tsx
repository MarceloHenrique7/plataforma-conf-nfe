import { useMutation, useQuery } from "react-query";
import { INFe, ResultSingleNFe } from "../types";
import { toast } from "sonner";
import { useEffect } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useUpdateNFe = () => {
  const updateXMLNFe = async (data: { codNFe: string; verified: boolean, table: number | null }): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/nfe/put`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Adicione o cabeçalho para JSON
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update NFe");
    }

    return response.json();
  };

  const { mutate: updateNFe, isLoading, error, reset, isSuccess } = useMutation(updateXMLNFe);

  // Exibe toast de sucesso
  useEffect(() => {
    if (isSuccess) {
      toast.success("Produtos verificados com sucesso");
    }

    if (error) {
      toast.error("A atualização da NFe falhou");
      reset();
    }
  }, [isSuccess, error, reset]); // Dependências para re-executar o efeito quando isSuccess ou error mudam

  return { updateNFe, isLoading };
};

export const useRegisterXML = () => {
  const registerXMLNFe = async (formData: FormData): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/nfe/post`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.message || "Erro ao registrar arquivos XML.");
    }

    return response.json();
  };

  const { mutate: registerNFe, isLoading, error, reset, isSuccess } = useMutation(registerXMLNFe);

  // Exibe toast de sucesso ou erro
  useEffect(() => {
    if (isSuccess) {
      toast.success("Você registrou uma NFe");
    }

    if (error) {
      toast.error("O registro da NFe falhou");
      reset();
    }
  }, [isSuccess, error, reset]);

  return { registerNFe, isLoading };
};

export const useGetmyNFe = (id: string) => {
  const getMyNFe = async (): Promise<ResultSingleNFe> => {
    const response = await fetch(`${API_BASE_URL}/nfe/get/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json(); 
      throw new Error(errorData.message || "Erro ao buscar pela NFe");
    }

    return response.json();
  };

  const { data, isLoading, isError, isSuccess, error } = useQuery(
    ["fetchMyNFe", id],
    getMyNFe,
    {
      enabled: !!id,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success("NFe Encontrada");
    }

      if (error instanceof Error) {
        toast.error(error.message);
      }
  }, [isSuccess, isError]);

  return { data, isLoading };
};

export type ResultSearchNFe = {
  totDocVerified: number,
  totDocNotVerified: number,
  totPagesVerified: number,
  totPagesNotVerified: number,
  currentPage: 1,
  data: {
    resVerified: Array<INFe>,
    resNotVerified: Array<INFe>,
  },
  totalDocuments: Array<INFe>,
} 
export const useGetAllNFe = (
  page: number = 1,
  limit: number = 10,
  searchQuery: string = "",
  startDate: string = "",
  endDate: string = ""
) => {
  // Função para buscar dados da API
  const getAllNFe = async (): Promise<ResultSearchNFe> => {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(searchQuery && { searchQuery }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
    });

    const response = await fetch(`${API_BASE_URL}/nfe/get/all?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Falha ao buscar NFes");
    }

    return response.json();
  };

  // Configuração da consulta usando react-query
  const { data, isLoading, isError, isSuccess } = useQuery(
    ["fetchAllNFe", page, limit, searchQuery, startDate, endDate],
    getAllNFe,
    {
      keepPreviousData: true, // Mantém os dados anteriores enquanto carrega os novos
      staleTime: 300000, // Tempo para considerar os dados frescos (5 minutos)
    }
  );

  // Notificações com base no estado da consulta
  useEffect(() => {
    if (isSuccess) {
      toast.success("Notas Fiscais Encontradas");
    }
    if (isError) {
      toast.error("Erro ao buscar as Notas Fiscais");
    }
  }, [isSuccess, isError]);

  return { data, isLoading, isError };
};


type ResultAllNFeNoOrder = {
  totDoc: number,
  totPages: number,
  currentPage: number,
  data: Array<INFe>
}

export const useGetAllNFeNoOrder = (
  page: number = 1,
  limit: number = 10,
  startDate: string = "",
  endDate: string = ""
) => {
  // Função para buscar dados da API
  console.log("start " + startDate)
  console.log("emd " + endDate)
  const getAllNFeNoOrder = async (): Promise<ResultAllNFeNoOrder> => {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      startDate: startDate,
      endDate: endDate,
   });

   console.log(queryParams)

    const response = await fetch(`${API_BASE_URL}/nfe/get/all/no-order?${queryParams}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Falha ao buscar NFes");
    }

    return response.json();
  };

  const { data, isLoading, isError, isSuccess } = useQuery(
    ["fetchAllNFeNoOrder", page, limit, startDate, endDate],
    getAllNFeNoOrder,
    {
      keepPreviousData: true, // Mantém os dados anteriores enquanto carrega os novos
      staleTime: 300000, // Tempo para considerar os dados frescos (5 minutos)
    }
  );

  // Notificações com base no estado da consulta
  useEffect(() => {
    if (isSuccess) {
      toast.success("Notas Fiscais Encontradas");
    }
    if (isError) {
      toast.error("Erro ao buscar as Notas Fiscais");
    }
  }, [isSuccess, isError]);

  return { data, isLoading, isError };
};

export type SearchState = {
  searchQuery: string; 
  page: number; 
  sortOption: string; 
} 


export type ResponseSearch = {
  data: INFe[],
  pagination: {
    total: number,
    page: number,
    pages: number
  }
}
