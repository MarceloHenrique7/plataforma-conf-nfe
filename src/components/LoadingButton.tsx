import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";


const LoadingButton = () => {
  return (
    <div>
        <Button disabled>
            <Loader2 className="mr-2 h-2 animate-spin"/>
            Aguarde...
        </Button>
    </div>
  )
}

export default LoadingButton;