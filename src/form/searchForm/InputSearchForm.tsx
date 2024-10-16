import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

const InputSearchForm = () => {
    const { control } = useFormContext();

    return (
        <>
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

            <FormField 
                name="mesa"
                control={control}
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormLabel>
                            Numero. Mesa
                        </FormLabel>
                        <FormControl>
                            <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Mesa de conferência" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">Mesa 1</SelectItem>
                                <SelectItem value="2">Mesa 2</SelectItem>
                                <SelectItem value="3">Mesa 3</SelectItem>
                            </SelectContent>
                            </Select>
                        </FormControl>
                    </FormItem>
                )}
            />
        </>
    );
}

export default InputSearchForm;
