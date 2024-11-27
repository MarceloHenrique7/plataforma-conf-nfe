import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel } from "../../components/ui/form"
import { Input } from "../../components/ui/input"



type Props = {
    fieldName: string,
    accept: string
    label: string
}

const FormCodeNF = ({ label, fieldName, accept }: Props) => {
    const { control } = useFormContext()

    return (
        <div className="flex flex-col">
        <FormField 
            control={control}
            name={`${fieldName}`}
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>
                        {label}
                    </FormLabel>
                    <FormControl>
                        <Input type="file" 
                        accept={`${accept}`}
                        multiple
                        onChange={(event) => field.onChange(
                            event.target.files ? Array.from(event.target.files) : []
                        )} />
                    </FormControl>
                </FormItem>
            )}
        />
        </div>

    )

} 


export default FormCodeNF;