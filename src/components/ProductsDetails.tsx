import { Product } from "../types";

type ProductDetailsProps = {
    productFound: Product | null;
  };
  
  const ProductDetails = ({ productFound }: ProductDetailsProps) => {
    if (!productFound) return null;
  
    return (
      <div className="bg-green-100 p-4 rounded">
        <h2>Produto Encontrado:</h2>
        <p>Nome: {productFound.xProd}</p>
        <p>Código de Barras (cEAN): {productFound.cEAN}</p>
        <p>Código do Produto (cProd): {productFound.cProd}</p>
      </div>
    );
  };
  
  export default ProductDetails;
  