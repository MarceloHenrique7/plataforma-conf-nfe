import { Product } from "../types";
import { ScrollArea } from "./ui/scroll-area";

type ProductListProps = {
  products: Product[];
  handleAddButton: (code: string) => void;
};

const ProductList = ({ products }: ProductListProps) => {
  return (
    <ScrollArea className="p-2 h-full w-full rounded-md border">
      <div className="w-full h-full flex max-h-96 flex-col gap-3">
        {products.map((prod, index) => (
          <div className="w-full flex items-center justify-between text-gray-800 font-bold rounded-sm border-slate-700 border-2 p-2 text-sm">
            <div key={index} >
              <h1>{prod.xProd || ""}</h1>
              <p>cEAN: {prod.cEAN || ""}</p>
              <p>cProd: {prod.cProd || ""}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ProductList;
