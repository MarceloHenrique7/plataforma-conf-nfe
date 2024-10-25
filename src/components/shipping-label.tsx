import React from 'react';
import Barcode from 'react-barcode';
import { Card, CardContent } from "./ui/card";

interface LabelProps {
  type: 'DESTINATÁRIO' | 'REMETENTE';
  name: string;
  address: string;
  location: string;
  zipCode: string;
}

const ShippingLabel: React.FC<LabelProps> = ({ type, name, address, location, zipCode }) => {
  return (
    <div>
      <Card className="w-[400px] h-[200px] p-4 m-2 border border-black">
        <CardContent className="p-0">
          <h2 className="text-xl font-bold mb-2">{type}</h2>
          <p className="font-bold">{name}</p>
          <p>{address}</p>
          <p>{location}</p>
          <p>Cep: {zipCode}</p>
          {type === 'DESTINATÁRIO' && (
            <div className="mt-2">
              <Barcode value={zipCode} width={2} height={50} fontSize={12} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ShippingLabel;
