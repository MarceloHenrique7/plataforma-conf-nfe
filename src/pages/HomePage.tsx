import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Search, CheckSquare, Upload, ArrowBigRight } from "lucide-react"
import { Link } from "react-router-dom"

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Conferência de NFs
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Simplifique o processo de conferência de notas fiscais com nossa plataforma intuitiva e eficiente.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Começar</Button>
                <Button variant="outline">Saiba mais</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <Upload className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Cadastro de Notas</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col gap-2'>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Faça o upload de arquivos XML para cadastrar novas notas fiscais de forma rápida e fácil.
                  </p>
                    <Link to={"/registrar-xml"} >
                      <Button className='w-full flex items-center justify-between'>
                          Cadastrar
                        <ArrowBigRight/>
                      </Button>
                    </Link>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Search className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Busca Avançada</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col gap-2'>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Encontre facilmente as notas fiscais que você precisa com nossa ferramenta de busca poderosa.
                  </p>
                    <Link to={"/buscar-nfe"}>
                      <Button className='w-full flex items-center justify-between'>
                          Buscar
                        <ArrowBigRight/>
                      </Button>
                    </Link>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CheckSquare className="h-10 w-10 mb-2 text-primary" />
                  <CardTitle>Verificação de Produtos</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col gap-2'>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Confira e valide os produtos listados em cada nota fiscal com precisão e eficiência.
                  </p>
                  <Link to={"/conf"} >
                    <Button className='w-full flex items-center justify-between'>
                        Conferir Notas
                      <ArrowBigRight/>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Comece a usar hoje</h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Junte-se a milhares de empresas que já otimizaram seu processo de conferência de notas fiscais.
                </p>
              </div>
              <Button size="lg">Criar uma conta gratuita</Button>
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}

export default HomePage