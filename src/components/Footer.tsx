import { Link } from "react-router-dom";


const Footer = () => {
    return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-gray-900">
        <p className="text-lg text-gray-100 dark:text-gray-400">© 2024 Conferência de NFs. Todos os direitos reservados a <Link target="_blank" to={'https://www.linkedin.com/in/henrique-oliveira-71a2bb275/'} className="underline">Marcelo Henrique Desenvolvedor</Link></p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6 text-lg">
          <Link to={"/"} className="text-lg hover:underline underline-offset-4">
            Termos de Serviço
          </Link>
          <Link to={"/"} className="text-lg hover:underline underline-offset-4" >
            Privacidade
          </Link>
        </nav>
      </footer>
    )

}



export default Footer;