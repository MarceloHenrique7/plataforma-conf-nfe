import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const useRegisterXlsx = () => {
    const registerXlsxSheet = async (formData: FormData): Promise<void> => {
      const response = await fetch(`${API_BASE_URL}/dealer/post`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.message || "Erro ao registrar a planilha.");
      }
  
      return response.json();
    };
  
    const { mutate: registerXlsx, isLoading, error, reset, isSuccess } = useMutation(registerXlsxSheet);

    useEffect(() => {
      if (isSuccess) {
        toast.success("Você registrou uma Planilha");
      }
  
      if (error instanceof Error) {
        toast.error(error.message);
        reset();
      }
    }, [isSuccess, error, reset]);
  
    return { registerXlsx, isLoading };
  };

export const useRegisterXlsxSupervisor = () => {
    const registerXlsxSheet = async (formData: FormData): Promise<void> => {
      const response = await fetch(`${API_BASE_URL}/supervisor/post`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.message || "Erro ao registrar a planilha.");
      }
  
      return response.json();
    };
  
    const { mutate: registerXlsx, isLoading, error, reset, isSuccess } = useMutation(registerXlsxSheet);

    useEffect(() => {
      if (isSuccess) {
        toast.success("Você registrou uma Planilha");
      }
  
      if (error instanceof Error) {
        toast.error(error.message);
        reset();
      }
    }, [isSuccess, error, reset]);
  
    return { registerXlsx, isLoading };
  };

interface IDealer  {
    orderCode: number;
    responsibleStructure: string,
    deliveryForecast: string | null
}
  
export const useGetmyDealer = (id: string) => {
  const getMyDealer = async (): Promise<IDealer> => {
    const response = await fetch(`${API_BASE_URL}/dealer/get/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json(); 
        throw new Error(errorData.message || "Erro ao buscar uma planilha");
    }

    return response.json();
  };

  const { data: dealer, isLoading, isError, isSuccess } = useQuery(
    ["fetchMyDealer", id],
    getMyDealer,
    {
      enabled: !!id,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      toast.success("NFe Encontrada");
    }

    if (isError) {
      toast.error("NFe não existe");
    }
  }, [isSuccess, isError]);

  return { dealer, isLoading };
};