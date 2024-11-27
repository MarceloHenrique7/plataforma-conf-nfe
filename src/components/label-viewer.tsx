import { useRef, useEffect } from 'react';
import { Button } from './ui/button';
import JsBarcode from 'jsbarcode';
import { PrinterIcon } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

type Props = {
  name: string;
  address: string;
  orderCode: number;
  dealer: string;
};

export default function LabelViewer({ name, address, orderCode, dealer }: Props) {
  const labelRef = useRef<HTMLDivElement | null>(null);
  const barcodeRef = useRef<SVGSVGElement | null>(null);

  const handlePrintAsPDF = async () => {
    if (labelRef.current) {
      labelRef.current.classList.remove('hidden');
    }

    try {
      const canvas = await html2canvas(labelRef.current!, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'cm',
        format: [16, 12],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, 16, 11);
      
      const pdfBlob = pdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl, '_blank');
    } catch (error) {
      console.error("Error generating PDF: ", error);
      alert("An error occurred while generating the PDF. Please try again.");
    } finally {
      if (labelRef.current) {
        labelRef.current.classList.add('hidden');
      }
    }
  };

  useEffect(() => {
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, `${orderCode}`, {
        format: "CODE128",
        displayValue: true,
        fontSize: 40,
        lineColor: "#000",
        width: 10,
        height: 100,
      });
    }
  }, [orderCode]);

  const supervisor = dealer.split(" ")
  const supervisorUp = supervisor[supervisor.length - 1]


  console.log(supervisorUp)

  return (
    <div>
      <Button onClick={handlePrintAsPDF} className="mb-4">
        Imprimir Etiqueta <PrinterIcon />
      </Button>

      {/* Conteúdo da etiqueta (inicialmente oculto) */}
      <div className="hidden" ref={labelRef}>
        <div className="w-full h-full p-6 bg-white" id="printable-label">
          <div className="flex flex-col gap-20 text-sm">
            <p className="text-7xl">{name} {address}</p>
            <div className='flex text-3xl justify-between'>
              <span>Cd Pedido: {orderCode}</span>
              <span >S(a): <span className='text-4xl'>{supervisorUp}</span></span>
            </div>
            <div className="mt-2 text-3xl text-left">
              <p>Referência:</p>
              <p>Em caso de ausência entregar para o vizinho ( ) Esquerda ( ) Direita</p>
            </div>
            <div className="flex items-center justify-center" style={{ width: 'auto' }}>
              <svg ref={barcodeRef} />
            </div>
            <div className="flex justify-between mt-4 text-5xl text-start gap-2">
              <p className="font-bold self-end">O BOTICÁRIO</p>
              <p className="flex flex-col font-bold self-end">
                <span className='text-sm'>
                  GRUPO
                </span>
                <span className='text-md'>
                  Dina Simão
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
