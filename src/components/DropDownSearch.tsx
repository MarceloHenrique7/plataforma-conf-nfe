import { Link } from "react-router-dom";
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator, 
    DropdownMenuTrigger } from "./ui/dropdown-menu";
import {  ArrowBigDown, PackageSearch, Search } from "lucide-react";




const DropDownSearch = () => {
    return (
        <DropdownMenu>
                <DropdownMenuTrigger className=" text-gray-200 hover:text-black flex flex-col gap-1 items-center justify-between transition 500-ms hover:text-black hover:bg-white p-2 rounded-md">
                    <Search size={30}/>
                    <h1 className="text-sm ">
                        Procurar
                    </h1>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="max-w-56 mr-12">
                    <DropdownMenuItem className="outfit  bg-gray-800 text-white font-bold text-center">
                        <h1 className="w-full gap-2 flex items-center justify-between">
                            <span>
                                Área de Pesquisas
                            </span>
                            <span>
                                <ArrowBigDown size={18}/>
                            </span>
                        </h1>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem className="border-2 border-gray-100">
                        <Link to={"/buscar-nfe"} className="w-full flex items-center justify-between gap-2">
                            <span>
                                Procurar Pedido
                            </span>
                            <span>
                                <PackageSearch size={18}/>
                            </span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>


            </DropdownMenu>
    )
}



export default DropDownSearch;



