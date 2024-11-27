'use client';

import { useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { 
    Dialog,
    DialogContent,
    DialogTrigger,
} from '../components/ui/dialog';
import { ScrollArea } from '../components/ui/scroll-area';
import { Product } from '../types';
import { useGetmyNFe } from '../api/ApiMyNFe';
import LabelViewer from '../components/label-viewer';

export default function SingleNFePage() {
  const { codNFe } = useParams<{ codNFe: string }>();
  const { data, isLoading } = useGetmyNFe(codNFe as string);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!data?.nfe) {
    return <div className="flex justify-center items-center h-screen">NFe not found</div>;
  }

  console.log(data)

  const adressOfDest = `
    ${data.nfe.enderDestLgr}, 
    ${data.nfe.enderDestBairro}, 
    ${data.nfe.enderDestNro}, 
    CEP: ${data.nfe.enderDestCep?.slice(0, 5)}-${data.nfe.enderDestCep?.slice(5)}, 
    ${data.nfe.enderDestxMun} -
    ${data.nfe.enderDestUF}, 
  `

  return (
    <div className="flex flex-col gap-12 p-4">
      <h1 className="text-4xl font-bold">Detalhes da nota fiscal</h1>
      <div className={`${data.nfe.verified ? 'bg-green-100' : 'bg-red-100'} p-6 rounded-lg shadow-md flex flex-col gap-4 ${data.nfe.verified ? 'bg-gray-100' : 'bg-red-200'}`}>
        <div>
          <h2 className="text-xl font-bold">Cod.NFe: {data.nfe.codNFe}</h2>
          <p className="text-gray-600">Versão: {data.nfe.version}</p>
          <p className="text-gray-600">Criado: {new Date(data.nfe.createdAt).toLocaleString()}</p>
          {data.nfe.verified && <p className="text-gray-600 font-bold">Verificado em: {new Date(data?.nfe?.verifiedAt || '').toLocaleString()}</p>}
          <p className="text-gray-600">N.Pedido: {data.nfe.orderCode}</p>
          <p className="text-gray-600">Mesa: {data.nfe.table || 'S/M'}</p>
        </div>
        <div className='flex flex-col'>
          <h1 className="text-xl font-bold">Dados do destinatário</h1>
          <p className="text-gray-600">CPF: {data.nfe.destCpf || ''}</p>
          <p className="text-gray-600">E-Mail: {data.nfe.destEmail || ''}</p>
          <p className="text-gray-600">Nome: {data.nfe.destxNome || ''}</p>
          <p className="text-gray-600">Endereço: {`${adressOfDest} ` || ''}</p>
          <p className="text-gray-600">Telefone: {`(${data.nfe.enderDestFone?.slice(0,2)}) ${data.nfe.enderDestFone?.slice(2)}` || ''}</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="self-start border-2 border-gray-800 hover:border-gray-800">
              Ver Produtos
            </Button>
          </DialogTrigger>
          <DialogContent className="w-auto max-w-[75%] max-h-[75%] flex">
            <ScrollArea className="p-4">
              {data.nfe.products?.map((product: Product) => (
                <div key={product.cEAN} className="p-3">
                  <h3 className="text-lg font-bold">{product.xProd}</h3>
                  <p>Cod EAN: {product.cEAN}</p>
                  <p>Cod Prod: {product.cProd}</p>
                </div>
              ))}
            </ScrollArea>
          </DialogContent>
          <LabelViewer
            name={data.nfe.destxNome?.toString() || '(Sem Nome Informado)'}
            address={adressOfDest}
            orderCode={Number(data.nfe.orderCode)}
            dealer={data.dealer.responsibleStructure}
          />
        </Dialog>
      </div>
    </div>
  );
}
