
import { Button } from "../components/ui/button";

import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
 } from "../components/ui/dialog";
import { ScrollArea } from "../components/ui/scroll-area";

import { Link } from "react-router-dom";
import { INFe, Product } from "../types";

type Props = {
    nfe: INFe;
    products: Product[];
    isVerified: boolean;
    handleOnClick: (code: string) => void;
}

const CardNFe = ({ handleOnClick, isVerified, nfe, products }: Props) => {

    return (
        <div key={nfe.codNFe} className={`${isVerified ? 'bg-green-100' : 'bg-red-100'} p-6 rounded-lg shadow-md flex flex-col gap-4`}>
            <div>
            <h1 className="text-xl font-bold">Cod.NFe: {nfe.codNFe}</h1>
            <p className="text-gray-600 font-bold">Versão: {nfe.version}</p>
            <p className="text-gray-600 font-bold">Criado: {nfe?.createdAt ? new Date(nfe.createdAt).toLocaleString() : "N/A"}</p>
            <p className="text-gray-600 font-bold">N.Pedido: {nfe.products[0].xPed || nfe?.orderCode}</p>
            {isVerified && (
                <p className="text-gray-600 font-bold">Verificado em : {nfe.verifiedAt ? new Date(nfe.verifiedAt).toLocaleString() : "Data não disponível"}</p>
            )}
            <p className="text-gray-600 font-bold">Mesa: {nfe?.table ? nfe.table : "S/M"}</p>
            </div>
            <Dialog>
            <DialogTrigger className="self-start">
                <Button variant="outline" className="border-2 border-gray-800 hover:border-gray-800" onClick={() => handleOnClick(nfe.codNFe?.toString() as string)}>
                Ver Produtos
                </Button>
            </DialogTrigger>
            <DialogContent className="w-auto max-w-[75%] max-h-[75%] flex">
                <ScrollArea className="p-4">
                {products?.map((product) => (
                    <div key={product.cEAN} className="p-3">
                    <DialogHeader>
                        <DialogTitle>{product.xProd}</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="flex flex-col">
                        <span>Cod EAN: {product.cEAN}</span>
                        <span>Cod Prod: {product.cProd}</span>
                    </DialogDescription>
                    </div>
                ))}
                </ScrollArea>
            </DialogContent>
            <div>
                <Link to={`/procurar/nfe/${nfe.codNFe}`} className="font-bold">
                    Mais Detalhes
                </Link>
            </div>
            </Dialog>
        </div>
    )
}




export default CardNFe