import React from 'react';
import Barcode from 'react-barcode';

interface EtiquetaProps {
    nome: string;
    endereco: string;
    numeroPedido: number;
  }
  
 export const Etiqueta: React.FC<EtiquetaProps> = ({ nome, endereco, numeroPedido }) => {
    const codigoBarras = numeroPedido.toString(); // Utilize o número do pedido como código de barras
  
    return (
      <div style={{ border: '1px solid black', padding: '10px', width: '200px', margin: '10px' }}>
        <h4>Etiqueta de Caixa</h4>
        <p>Nome: {nome}</p>
        <p>Endereço: {endereco}</p>
        <p>Número do Pedido: {numeroPedido}</p>
        <Barcode value={codigoBarras} />
      </div>
    );
  };