import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel } from "../../components/ui/form"
import { Input } from "../../components/ui/input"




const FormCodeNF = () => {
    const { control } = useFormContext()

    return (
        <div className="flex flex-col">
        <FormField 
            control={control}
            name="xmlFiles"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>
                        XML Files
                    </FormLabel>
                    <FormControl>
                        <Input type="file" 
                        accept=".xml"
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


export default FormCodeNF