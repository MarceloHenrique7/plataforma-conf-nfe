import { useForm } from "react-hook-form";
import { Form } from "../components/ui/form";
import FormCodeNF from "../form/codeNF-form/FormCodeNF";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../components/ui/button";

import LoadingButton from "../components/LoadingButton";
import { useRegisterXlsx } from "../api/ApiMySheet";
 

import SheetDealer from '../assets/planilha-dealer.png'

const formSchema = z.object({
  xlsxFile: z.array(z.instanceof(File))
})


type FormDataXML = z.infer<typeof formSchema>


const RegisterXlsx = () => {

    const { registerXlsx, isLoading } = useRegisterXlsx()

    const form = useForm<FormDataXML>({
        resolver: zodResolver(formSchema),
    })



    const onSubmit = (data: FormDataXML) => {
        const formData = new FormData()

        data.xlsxFile.forEach((file) => {
          formData.append("xlsxFile", file)
        })

        registerXlsx(formData)
    }


    return (    
        <div>
        <Form {...form}>
            <form className="flex flex-col gap-20" encType="multipart/form-data" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col">
                  <h1 className="text-4xl font-bold">Cadastrar Planilha de Supervisor</h1>
                  <p className="text-sm text-gray-500">Para cadastrar uma planilha basta apenas clicar em "Escolher arquivos", selecionar o arquivo desejado, após isso clicar em "Cadastrar Planilha"</p>
                </div>
                <div className="bg-yellow-100 flex flex-col gap-2 p-10 rounded-md">
                  <h1 className="font-bold">AVISO</h1>
                  <p>A planilha deve conter as seguintes colunas: "CodigoPedido", "PrevisãoEntrega", "Responsável Estrutura", "Lote de separação"</p>
                  <img className="w-full h-full object-cover" src={SheetDealer}/>
                </div>
                <FormCodeNF label="Arquivos Xlsx" fieldName="xlsxFile" accept=".xlsx"/>
                <div>
                  {
                    isLoading ? (
                      <LoadingButton />
                    ) : (
                      <Button type="submit">
                        Cadastrar Planilha
                      </Button>
                    )
                  }
                    
                </div>
            </form>
        </Form>
        </div>
    )
}


export default RegisterXlsx;