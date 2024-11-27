import { Link } from "react-router-dom";
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator, 
    DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ArrowBigDown, FileSpreadsheet, PlusCircle, StickyNote } from "lucide-react";




const DropDownCreate = () => {
    return (
        <DropdownMenu>
                <DropdownMenuTrigger className=" text-gray-200 hover:text-black flex gap-1 flex-col items-center justify-between transition 500-ms hover:text-black hover:bg-white p-2 rounded-md">
                    <PlusCircle size={30}/>
                    <h1 className="text-sm">
                        Criar
                    </h1>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-w-56 mr-12">
                    <DropdownMenuItem className="outfit  bg-gray-800 text-white font-bold text-center">
                        <h1 className="w-full flex gap-2 items-center justify-between">
                            <span>
                                Área de Criação
                            </span>
                            <span>
                                <ArrowBigDown size={18}/>
                            </span>
                        </h1>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem className="border-2 border-gray-100">
                        <Link to={"/registrar-xml"} className="w-full flex items-center justify-between gap-2">
                            <span>
                                Cadastrar NFe
                            </span>
                            <span>
                                <StickyNote size={18}/>
                            </span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem className="border-2 border-gray-100">
                        <Link to={"/registrar-supervisor-m1"} className="w-full flex items-center justify-between gap-2">
                            <span>
                                Cadastrar Supervisor - M1
                            </span>
                            <span>
                                <FileSpreadsheet size={18}/>
                            </span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem className="border-2 border-gray-100">
                        <Link to={"/registrar-supervisor"} className="w-full flex items-center justify-between gap-2">
                            <span>
                                Cadastrar Supervisor - M2
                            </span>
                            <span>
                                <FileSpreadsheet size={18}/>
                            </span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                </DropdownMenuContent>


            </DropdownMenu>
    )
}



export default DropDownCreate;



