// src/components/PrintLabels.tsx
import React from 'react';
import ShippingLabel from './shipping-label';
import Barcode from 'react-barcode';

interface PrintLabelsProps {
  labels: {
    type: 'DESTINATÁRIO' | 'REMETENTE';
    name: string;
    address: string;
    location: string;
    zipCode: string;
    barcodeValue: string;
  }[];
}

const PrintLabels: React.FC<PrintLabelsProps> = ({ labels }) => {
  return (
    <div className="p-4">
      {labels.map((label, index) => (
        <div key={index} className="mb-4">
          <ShippingLabel
            type={label.type}
            name={label.name}
            address={label.address}
            location={label.location}
            zipCode={label.zipCode}
          />
          <div className="mt-2">
            <Barcode 
              value={label.barcodeValue} 
              width={2} 
              height={50} 
              fontSize={12} 
              margin={10} // Adicionando margem
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PrintLabels;
