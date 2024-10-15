import { useForm } from "react-hook-form"
import { Form, FormField } from "../components/ui/form"




import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import InputSearchForm from "../form/searchForm/InputSearchForm"
import { Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom"


const formSchema = z.object({
    searchQuery: z.string().optional()
})

type FormDataSearch = z.infer<typeof formSchema>


const ConfPage = () => {

    const navigate = useNavigate()

    const form = useForm<FormDataSearch>({
        resolver: zodResolver(formSchema),
    })



    const onSubmit = (data: FormDataSearch) => {
        console.log(data)
        navigate({
            pathname: `/conf/${data.searchQuery}`
        })
    }

    return (
        <div className="flex flex-col gap-20">
            <div>
                <h1 className="font-bold text-slate-800 text-3xl">
                    Conferir Nota
                </h1>
            </div>

            <div className="flex flex-col md:flex-row justify-around gap-12">
            <div className="flex-1">
                <Form {...form}>
                    <form className="flex flex-col gap-8" onSubmit={form.handleSubmit(onSubmit)}>
                        <InputSearchForm />
                        <Button type="submit">
                            Buscar
                        </Button>
                    </form>
                </Form>
            </div>
                    
                

            </div>

        </div>
    )

}


export default ConfPage


