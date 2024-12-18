import { useForm } from "react-hook-form";
import { Form } from "../components/ui/form";
import FormCodeNF from "../form/codeNF-form/FormCodeNF";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../components/ui/button";

import { useRegisterXML } from "../api/ApiMyNFe";
import LoadingButton from "../components/LoadingButton";
 



const formSchema = z.object({
    xmlFiles: z.array(z.instanceof(File))
})


type FormDataXML = z.infer<typeof formSchema>


const RegisterXML = () => {

    const { registerNFe, isLoading } = useRegisterXML()
    const form = useForm<FormDataXML>({
        resolver: zodResolver(formSchema),
    })



    const onSubmit = (data: FormDataXML) => {
        const formData = new FormData()

        data.xmlFiles.forEach((file) => {
          formData.append("xmlFiles", file)
        })

        registerNFe(formData)
    }


    return (    
        <div>
        <Form {...form}>
            <form className="flex flex-col gap-20" encType="multipart/form-data" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col">
                  <h1 className="text-4xl font-bold">Cadastrar Notas Fiscais</h1>
                  <p className="text-sm text-gray-500">Para cadastrar uma ou mais Notas Fiscais basta apenas clicar em "Escolher arquivos", selecionar os arquivos, após isso clicar em "Cadastrar Nota(s) Fiscal"</p>
                </div>
                <FormCodeNF label="Arquivos XML" fieldName="xmlFiles" accept=".xml"/>
                <div>
                  {
                    isLoading ? (
                      <LoadingButton />
                    ) : (
                      <Button type="submit">
                        Cadastrar Nota(s) Fiscal
                      </Button>
                    )
                  }
                    
                </div>
            </form>
        </Form>
        </div>
    )
}


export default RegisterXML;