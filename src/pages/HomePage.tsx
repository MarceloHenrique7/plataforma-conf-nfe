import { ArrowBigRight } from "lucide-react"
import { Link } from "react-router-dom"


function HomePage() {

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="font-bold flex flex-col gap-5">
          <h1 className="text-xl">Primeira Etapa</h1>
          <Link to={"/registrar-xml"} className="flex items-center justify-between hover:bg-gray-800 hover:text-white transition-all 300-ms bg-gray-200 rounded-md p-2 inline-block">
            Cadastrar Nota Fiscal com XML<ArrowBigRight/>
          </Link>
        </div>
        <div className="font-bold flex flex-col gap-5">
          <h1 className="text-xl">Segunda Etapa</h1>
          <Link to={"/conf"} className="flex items-center justify-between hover:bg-gray-800 hover:text-white transition-all 300-ms bg-gray-200 rounded-md p-2 inline-block">
            Buscar pela Nota Fiscal <ArrowBigRight/>
          </Link>
        </div>
        <div className="font-bold flex flex-col gap-5">
          <h1 className="text-xl">Terceira Etapa</h1>
          <Link to={"/"} className="flex items-center justify-between hover:bg-gray-800 hover:text-white transition-all 300-ms bg-gray-200 rounded-md p-2 inline-block">
            Verificar Produtos <ArrowBigRight/>
          </Link>
        </div>
      </div>
    </>
  )
}

export default HomePage
