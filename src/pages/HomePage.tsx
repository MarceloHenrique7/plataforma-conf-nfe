import React, { useState } from 'react';
import { ArrowBigRight } from "lucide-react";
import ShippingLabel from '../components/shipping-label'; // Certifique-se de que o caminho está correto
import { Link } from 'react-router-dom';

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrint = () => {
    window.print();
    setIsModalOpen(false); // Fecha o modal após a impressão
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="font-bold flex flex-col gap-5">
        <h1 className="text-xl">Primeira Etapa</h1>
        <Link to={"/registrar-xml"} className="flex items-center justify-between hover:bg-gray-800 hover:text-white transition-all 300-ms bg-gray-200 rounded-md p-2 inline-block">
          Cadastrar Nota Fiscal com XML<ArrowBigRight />
        </Link>
      </div>
      <div className="font-bold flex flex-col gap-5">
        <h1 className="text-xl">Segunda Etapa</h1>
        <Link to={"/conf"} className="flex items-center justify-between hover:bg-gray-800 hover:text-white transition-all 300-ms bg-gray-200 rounded-md p-2 inline-block">
          Buscar pela Nota Fiscal <ArrowBigRight />
        </Link>
      </div>
      <div className="font-bold flex flex-col gap-5">
        <h1 className="text-xl">Terceira Etapa</h1>
        <Link to={"/"} className="flex items-center justify-between hover:bg-gray-800 hover:text-white transition-all 300-ms bg-gray-200 rounded-md p-2 inline-block">
          Verificar Produtos <ArrowBigRight />
        </Link>
      </div>
      <div className="font-bold flex flex-col gap-5">
        <h1 className="text-xl">Imprimir Etiquetas</h1>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="flex items-center justify-between hover:bg-gray-800 hover:text-white transition-all 300-ms bg-gray-200 rounded-md p-2 inline-block"
        >
          Ver Etiquetas <ArrowBigRight />
        </button>
      </div>

      {/* Modal para Exibir Etiquetas */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <ShippingLabel
              type="DESTINATÁRIO"
              name="MARIA FRANCISCA MENDES ROCHA AZEVEDO"
              address="Rua Barão de Campinas, nº 400 - apto 39"
              location="Campos Elíseos - São Paulo - SP"
              zipCode="01201-000"
            />
            <ShippingLabel
              type="REMETENTE"
              name="JOÃO FRANCISCO MENDES ROCHA AZEVEDO"
              address="Rua Maria José, nº 470 - apto 19"
              location="Bela Vista - São Paulo - SP"
              zipCode="01324-010"
            />
            <div className="flex justify-between mt-4">
              <button 
                onClick={handlePrint} 
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Imprimir Etiquetas
              </button>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
