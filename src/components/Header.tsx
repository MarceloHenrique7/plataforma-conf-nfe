import { Link } from "react-router-dom";






const Header = () => {

    return (
        <div className="text-center p-8 bg-slate-900 text-white flex justify-between items-center">
            <div>
                <Link to={"/"} className="font-bold text-3xl">
                    Conferência de NFs
                </Link>
            </div>
            <div className="space-x-5 font-bold">
                <Link to={"/registrar-xml"} >
                    Cadastrar NFe
                </Link>
                <Link to={"/conf"} >
                    Conferir Nota
                </Link>
                <Link to={"/notas-fiscais-status"} >
                    NFe Status
                </Link>
            </div>

        </div>
    )

}



export default Header;