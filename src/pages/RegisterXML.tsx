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
                <FormCodeNF />
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