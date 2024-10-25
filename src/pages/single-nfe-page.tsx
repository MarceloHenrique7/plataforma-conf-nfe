'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from "../components/ui/button"
import { 
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../components/ui/dialog';
import { ScrollArea } from "../components/ui/scroll-area"
import { INFe, Product } from "../types"
import { useGetmyNFe } from '../api/ApiMyNFe';



export default function SingleNFePage() {
  const { codNFe } = useParams<{ codNFe: string }>()


  const { nfe, isLoading } = useGetmyNFe(codNFe as string)

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!nfe) {
    return <div className="flex justify-center items-center h-screen">NFe not found</div>
  }

  return (
    <div className="flex flex-col gap-12 p-4">
      <h1 className="text-2xl font-bold">NFe Details</h1>
      <div className={`bg-gray-100 p-6 rounded-lg shadow-md flex flex-col gap-4 ${nfe.verified ? 'bg-gray-100' : 'bg-red-200'}`}>
        <div>
          <h2 className="text-xl font-bold">Cod.NFe: {nfe.codNFe}</h2>
          <p className="text-gray-600">Versão: {nfe.version}</p>
          <p className="text-gray-600">Criado: {new Date(nfe.createdAt).toLocaleString()}</p>
          {
            nfe.verified ? (
                <p className="text-gray-600">Verificado: {new Date(nfe.verifiedAt).toLocaleString()}</p>
            ) : (
                ''
            )
          }
          <p className="text-gray-600">N.Pedido: {nfe.products[0].xPed}</p>
          <p className="text-gray-600">Mesa: {nfe.table || 'S/M'}</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="self-start border-2 border-gray-800 hover:border-gray-800">
              Ver Produtos
            </Button>
          </DialogTrigger>
          <DialogContent className="w-auto max-w-[75%] max-h-[75%] flex">
            <ScrollArea className="p-4">
              {nfe.products.map((product: Product) => (
                <div key={product.cEAN} className="p-3">
                  <DialogHeader>
                    <DialogTitle>{product.xProd}</DialogTitle>
                  </DialogHeader>
                  <DialogDescription className="flex flex-col">
                    <span>Cod EAN: {product.cEAN}</span>
                    <span>Cod Prod: {product.cProd}</span>
                    <span>Qtd: {Number(product.qCom)}</span>
                  </DialogDescription>
                </div>
              ))}
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}