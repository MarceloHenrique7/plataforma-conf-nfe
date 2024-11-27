import { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

const PrintComponent = () => {
    const barcodeRef = useRef(null);

    useEffect(() => {
        if (barcodeRef.current) {
            JsBarcode(barcodeRef.current, '1199728989', {
                format: "CODE128",
                lineColor: "#000",
                width: 2,
                height: 40,
                displayValue: true,
            });
        }

        // Add print-specific styles
        const style = document.createElement('style');
        style.textContent = `
            @media print {
                @page {
                    size: A4;
                    margin: 0;
                }
                button {
                    display: none;
                }
                body * {
                    visibility: hidden;
                }
                #content, #content * {
                    visibility: visible;
                }
                #content {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    padding: 10mm;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: flex-start;
                }
            }
        `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    const printPage = () => {
        window.print();
    };

    return (
        <div className="w-full min-h-screen p-5 flex flex-col items-center justify-center bg-gray-100 box-border print:p-0 print:bg-white">
            <div id="content" className="w-full flex flex-col items-center justify-center max-w-2xl mx-auto p-8 bg-white box-border rounded-lg shadow-md print:shadow-none print:rounded-none">
                <div className="border border-gray-300 p-4 mb-6 text-sm space-y-1">
                    <p><span className="font-semibold">Destinatário:</span> 12848654 - Platina</p>
                    <p className="font-semibold">MÔNICA FERREIRA BRITO COSTA DE OLIV</p>
                    <p>RUA QUINZE (LOT.GUARARAPES), 661 CAS</p>
                    <p>COHAB VI CEP: 56309-412</p>
                    <p>PETROLINA - PE</p>
                    <div className="flex justify-between text-xs mt-2">
                        <p><span className="font-semibold">Cód Pedido:</span> 414457077</p>
                        <p><span className="font-semibold">Cód Caixa:</span> 1199728989</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                    <div>
                        <p><span className="font-semibold">No Caixa:</span> 1</p>
                        <p><span className="font-semibold">Qd:</span> 1</p>
                        <p><span className="font-semibold">Qt Item:</span> 92</p>
                    </div>
                    <div>
                        <p><span className="font-semibold">Data Pedido:</span> 20/10/2024</p>
                        <p><span className="font-semibold">Previsão Entrega:</span> 24/10/2024</p>
                        <p><span className="font-semibold">Data Separação:</span> 22/10/2024</p>
                    </div>
                </div>

                <div className="text-sm mb-6">
                    <p><span className="font-semibold">Referência:</span> CONDOMINIO VALLE DAS MANGUEIRAS</p>
                    <p className="text-xs mt-1">Em caso de ausência entregar para o vizinho ( ) Esquerda ( ) Direita</p>
                </div>

                <div className="flex justify-between items-center mb-6">
                    <p className="text-xl font-bold italic">Tainá</p>
                    <p className="text-lg font-semibold">O BOTICÁRIO</p>
                </div>

                <div className="flex justify-center mb-6">
                    <svg ref={barcodeRef}></svg>
                </div>
            </div>
            <button 
                onClick={printPage} 
                className="mt-8 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg cursor-pointer hover:bg-green-700 transition-colors duration-300"
            >
                Imprimir
            </button>
        </div>
    );
};

export default PrintComponent;