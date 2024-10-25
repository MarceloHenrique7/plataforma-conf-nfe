import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

interface Product {
    name: string;
    description: string;
    manufactureDate: string;
    code: string; // Adicione outros campos conforme necessário
}

const EtiquetaGerador: React.FC<{ product: Product }> = ({ product }) => {
    // Especificar o tipo do useRef como SVGSVGElement | null
    const barcodeRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        if (barcodeRef.current) {
            JsBarcode(barcodeRef.current, product.code, {
                format: "CODE39", // Tipo de código de barras
                lineColor: "#000",
                width: 2,
                height: 100,
                displayValue: true
            });
        }
    }, [product.code]);

    return (
        <div>
            <h2>{product.name}</h2>
            <p>Descrição: {product.description}</p>
            <p>Data de Fabricação: {product.manufactureDate}</p>
            <svg ref={barcodeRef}></svg>
        </div>
    );
};

export default EtiquetaGerador;
