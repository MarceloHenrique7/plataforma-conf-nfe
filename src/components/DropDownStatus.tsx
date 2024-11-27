import { Link } from "react-router-dom";
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator, 
    DropdownMenuTrigger } from "./ui/dropdown-menu";
import {  ArrowBigDown, Info, ListTodo } from "lucide-react";




const DropDownStatus = () => {
    return (
        <DropdownMenu>
                <DropdownMenuTrigger className="flex text-gray-200 hover:text-black flex-col gap-1 items-center justify-between transition 500-ms hover:text-black hover:bg-gray-200 p-2 rounded-md">
                    <Info size={30}/>
                    <h1 className="text-sm ">
                        Status
                    </h1>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-w-56 mr-12">
                    <DropdownMenuItem className="outfit bg-gray-800 text-white font-bold text-center">
                        <h1 className="w-full gap-2 flex items-center justify-between">
                            <span>
                                Área de Status
                            </span>
                            <span>
                                <ArrowBigDown size={18}/>
                            </span>
                        </h1>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem className="border-2 border-gray-100">
                        <Link to={"/notas-fiscais-status"} className="w-full flex items-center justify-between gap-2">
                            <span>
                                Verificar Status
                            </span>
                            <span>
                                <ListTodo size={18}/>
                            </span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>


            </DropdownMenu>
    )
}



export default DropDownStatus;



