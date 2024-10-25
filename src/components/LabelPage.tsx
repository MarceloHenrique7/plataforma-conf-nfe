
import ShippingLabel from './shipping-label';

export default function LabelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
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
      <button 
        onClick={() => window.print()} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded no-print"
      >
        Print Labels
      </button>
    </div>
  );
}
