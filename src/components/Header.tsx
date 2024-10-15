import { Link } from "react-router-dom";






const Header = () => {

    return (
        <div className="text-center p-8 bg-slate-900 text-white flex justify-between items-center">
            <div>
                <h1 className="font-bold text-3xl">
                    Conferência de NFs
                </h1>
            </div>
            <div className="space-x-5 font-bold">
                <Link to={"/conf"} >
                    Conferir Nota
                </Link>
                <Link to={"/registrar-xml"} >
                    Cadastrar NFe
                </Link>
            </div>

        </div>
    )

}



export default Header;