import { Input } from "./ui/input";

type Props = {
  productCode: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  
};

const InputProduct = ({ productCode, handleInputChange, inputRef }: Props) => {
  
  
  return (
    <Input
      type="text"
      placeholder="Insira o código do produto (cEAN ou cProd)"
      value={productCode}
      onChange={handleInputChange}
      className="border p-2 rounded"
      ref={inputRef}
    />
  );
};

export default InputProduct;
