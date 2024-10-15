import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <div className="flex flex-col gap-12 w-full p-8 bg-slate-900 text-white flex justify-between items-center">
            <div>
                <h1 className="text-xl font-bold text-center">
                    Conferência de produtos de Notas Fiscais
                </h1>
            </div>
            <div>
                <p className="flex flex-wrap gap-2">
                    <span>
                        ©All rights reserved to 
                    </span>
                    <Link to={"https://portfolio-work-f4nv.onrender.com/"} target="_blank" className="font-bold underline">
                        Marcelo Henrique Developer
                    </Link>
                </p>
            </div>
        </div>
    )

}



export default Footer;