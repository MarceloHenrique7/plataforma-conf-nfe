import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../components/ui/form';
import { CalendarIcon, Search } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
import { cn } from '../../lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar } from '../../components/ui/calendar';

const formSchema = z.object({
    searchQuery: z.string(),
    startDate: z.date().optional(),
    endDate: z.date().optional(),
});

export type SearchForm = z.infer<typeof formSchema>;

type Props = {
    onSubmit: (formData: SearchForm) => void;
    placeHolder: string;
    onReset?: () => void;
    searchQuery?: string;
    onChangeStartDate: (date: Date | null) => void; // Define o tipo como Date ou null
    onChangeEndDate: (date: Date | null) => void;    // Define o tipo como Date ou null
};

const SearchFormAllNFe = ({ onChangeStartDate, onChangeEndDate, onSubmit, placeHolder, onReset, searchQuery }: Props) => {
  
    const form = useForm<SearchForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            searchQuery: ""
        }
    });

    useEffect(() => {
        form.reset({ searchQuery });
    }, [form, searchQuery]);

    const handleReset = () => {
        form.reset({
            searchQuery: ""
        });

        if (onReset) {
            onReset();
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-8'>
                <div className={`flex flex-1 items-center gap-3 justify-between flex-row border-2 w-full rounded-full p-3 ${form.formState.errors.searchQuery && "border-red-500"}`}>
                    <Search strokeWidth={2.5} size={30} className='ml-1 hidden md:block'/>
                    <FormField
                        control={form.control}
                        name="searchQuery"
                        render={({ field }) => 
                        <FormItem className="flex-1">
                            <FormControl>
                                <Input {...field} className={`border-none w-full shadow-none text-x1 focus-visible:ring-0`} placeholder={placeHolder}/>
                            </FormControl>
                        </FormItem>}
                    />
                    <Button onClick={handleReset} type="button" variant="outline" className="rounded-full">
                        Limpar
                    </Button>
                    <Button type="submit" className='rounded-full'>
                        Procurar
                    </Button>
                </div>
                <div className='flex gap-5'>
                    <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>De: </FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP", { locale: ptBR })
                                                ) : (
                                                    <span>Escolher data</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            locale={ptBR}
                                            mode="single"
                                            selected={field.value}
                                            onSelect={(date) => {
                                                field.onChange(date); 
                                                onChangeStartDate(date as Date); 
                                            }}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Ate: </FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                            
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP", { locale: ptBR })
                                                ) : (
                                                    <span>Escolher data</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            locale={ptBR}
                                            mode="single"
                                            selected={field.value}
                                            onSelect={(date) => {
                                                field.onChange(date); // Atualiza o campo no formulário
                                                onChangeEndDate(date as Date); // Chama a função passada como prop
                                            }}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </form>
        </Form>
    );
};

export default SearchFormAllNFe;
