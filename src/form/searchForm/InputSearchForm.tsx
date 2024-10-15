import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel } from "../../components/ui/form"
import { Input } from "../../components/ui/input"










const InputSearchForm = () => {
    
    const { control } = useFormContext()
    
    return (
        <FormField 
        name="searchQuery"
        control={control}
        render={({ field }) => (
            <FormItem className="flex flex-col">
                <FormLabel>
                    Cod. Nota Fiscal
                </FormLabel>
                <FormControl>
                    <Input 
                        {...field}
                        type="text"
                        className={`w-full text-x1 focus-visible:ring-0`}
                     />
                </FormControl>
            </FormItem>
        )}
        />
    )
}


export default InputSearchForm