import { useState } from "react";
import { useGetAllNFe } from "../api/ApiMyNFe";
import { Button } from "../components/ui/button";

import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
 } from "../components/ui/dialog";
import { INFe, Product } from "../types";
import { ScrollArea } from "../components/ui/scroll-area";


const NFesVerifiedPage = () => {

    const { nfes, isLoading } = useGetAllNFe()

    const [products, setProducts] = useState<Product[]>([]);

    const nfesVerified = nfes?.filter((nfe) => nfe.verified === true)
    const nfesNotVerified = nfes?.filter((nfe) => nfe.verified === false)

    const handleOnClick = (codNFe: string) => {
        const nfe = nfes?.find((nfe) => nfe.codNFe === codNFe);
        if (nfe) {
          setProducts(nfe?.products); // Agora isso deve funcionar corretamente
        }
    }

    if (isLoading) {
        return "Loading..."
    }

    return (
        <div className="flex flex-col gap-12">
            <div className="flex flex-col font-bold text-2xl">
                <h1>Notas Verificadas</h1>
            </div>

            {nfesVerified?.map((nfe) => (
            <div className="bg-green-200 rounded-md p-8 flex justify-between">
                <div >
                    <h1 className="flex gap-2">
                        <span className="font-bold">
                            Cod.NFe:
                        </span>
                        <span>
                            {nfe.codNFe}
                        </span>
                    </h1>
                    <p className="text-gray-700 flex gap-2">
                        <span className="font-bold">
                            versão: 
                        </span>
                        <span>
                            {nfe.version}
                        </span>
                    </p>
                    <p className="text-gray-700 flex gap-2">
                        <span className="font-bold">
                            Data/Hora:
                        </span>
                        <span>
                            {nfe?.verifiedAt ? new Date(nfe.verifiedAt).toLocaleString() : 'N/A'}
                        </span>
                    </p>
                </div>
                <Dialog>
                    <DialogTrigger>
                        <Button variant={"outline"} className="border-2 border-gray-800 hover:border-gray-800" onClick={() => handleOnClick(nfe.codNFe)}>Ver Produtos</Button>
                    </DialogTrigger>
                    <DialogContent className="w-auto max-w-[75%] max-h-[75%] flex">
                        <ScrollArea className="">
                        {
                            products.map((product) => (
                                <div className="flex flex-col gap-2 p-3">
                                    <DialogHeader>
                                        <DialogTitle>
                                            {product.xProd}
                                        </DialogTitle>
                                    </DialogHeader>
                                    <DialogDescription className="flex flex-col">
                                        <span>
                                            Cod EAN: {product.cEAN}
                                        </span>
                                        <span>
                                            Cod Prod: {product.cProd}
                                        </span>
                                    </DialogDescription>
                                </div>
                            ))
                        }
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
                
            </div>
            ))}

            <div className="flex flex-col font-bold text-2xl">
                <h1>Notas Não Verificadas</h1>
            </div>
            {nfesNotVerified?.map((nfe) => (
            <div className="bg-red-200 rounded-md p-8 flex justify-between">
                <div >
                    <h1 className="flex gap-2">
                        <span className="font-bold">
                            Cod.NFe:
                        </span>
                        <span>
                            {nfe.codNFe}
                        </span>
                    </h1>
                    <p className="text-gray-700 flex gap-2">
                        <span className="font-bold">
                            versão: 
                        </span>
                        <span>
                            {nfe.version}
                        </span>
                    </p>
                    <p className="text-gray-700 flex gap-2">
                        <span className="font-bold">
                            Data/Hora:
                        </span>
                        <span>
                            {nfe?.verifiedAt ? new Date(nfe.verifiedAt).toLocaleString() : 'N/A'}
                        </span>
                    </p>
                </div>
                <Dialog>
                    <DialogTrigger>
                        <Button variant={"outline"} className="border-2 border-gray-800 hover:border-gray-800" onClick={() => handleOnClick(nfe.codNFe)}>Ver Produtos</Button>
                    </DialogTrigger>
                    <DialogContent className="w-auto max-w-[75%] max-h-[75%] flex">
                        <ScrollArea className="">
                        {
                            products.map((product) => (
                                <div className="flex flex-col gap-2 p-3">
                                    <DialogHeader>
                                        <DialogTitle>
                                            {product.xProd}
                                        </DialogTitle>
                                    </DialogHeader>
                                    <DialogDescription className="flex flex-col">
                                        <span>
                                            Cod EAN: {product.cEAN}
                                        </span>
                                        <span>
                                            Cod Prod: {product.cProd}
                                        </span>
                                    </DialogDescription>
                                </div>
                            ))
                        }
                        </ScrollArea>
                    </DialogContent>
                </Dialog>
            </div>
            ))}
        </div>
    )
}


export default NFesVerifiedPage;