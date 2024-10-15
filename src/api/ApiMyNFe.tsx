import { useMutation, useQuery } from "react-query";
import { INFe } from "../types";
import { toast } from "sonner";
import { useEffect } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useUpdateNFe = () => {
  const updateXMLNFe = async (data: { codNFe: string; verified: boolean }): Promise<void> => {
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
      throw new Error("Failed to create a recipe");
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
  const getMyNFe = async (): Promise<INFe> => {
    const response = await fetch(`${API_BASE_URL}/nfe/get/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch NFe");
    }

    return response.json();
  };

  const { data: nfe, isLoading, isError, isSuccess } = useQuery(
    ["fetchMyNFe", id],
    getMyNFe,
    {
      enabled: !!id,
    }
  );

  // Mensagem de toast exibida ao buscar a NFe
  useEffect(() => {
    if (isSuccess) {
      toast.success("NFe Encontrada");
    }

    if (isError) {
      toast.error("NFe não existe");
    }
  }, [isSuccess, isError]);

  return { nfe, isLoading };
};
