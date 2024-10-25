import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from './ui/dropdown-menu'
import { Button } from './ui/button';

type Props = {
    onChange: (value: string) => void;
    sortOption: string;
}

const SORT_OPTIONS = [
    {
        label: "Melhores Resultados",
        value: "bestMatch"
    },
    {
        label: "Data de Registro",
        value: "createdAt"
    },
    {
        label: "Data de Verificação",
        value: "updatedAt"
    },

]

const DropDownOption = ({ onChange, sortOption }: Props) => {

    const SORT_LABEL = SORT_OPTIONS.find((option) => option.value === sortOption)?.label || SORT_OPTIONS[0].label

  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Button variant={'outline'}>
                Filtrar Por: {SORT_LABEL}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
        {SORT_OPTIONS.map((option) => (
            <><DropdownMenuItem className='cursor-pointer' onClick={() => onChange(option.value)}>
                {option.label}
            </DropdownMenuItem>
            <DropdownMenuSeparator /></>
        ))
        }
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropDownOption