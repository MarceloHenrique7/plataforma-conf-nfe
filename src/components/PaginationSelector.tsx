import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

type Props = { 
    page:number; 
    pages: number; 
    onPageChange: (page: number) => void; 
}


const PaginationSelector = ({ page, pages, onPageChange }: Props) => {

    const pageNumbers = []


    for (let i = 1; i <=pages; i++) {
        pageNumbers.push(i);
    }


    return (
    <div>
        <Pagination >
            <PaginationContent className="m-10">
                
                {page !== 1 && 
                    
                    <PaginationItem className="p-2">
                    <PaginationPrevious className="p-2 bg-gray-800 text-white hover:bg-gray-600 hover:text-white" size={10} href="#" onClick={() => onPageChange(page-1)}/>

                    </PaginationItem>
                }

            
                {pageNumbers.map((number)=>(
                  <PaginationItem>
                        <PaginationLink className="p-2" size={10} href="#" onClick={() => onPageChange(number)} isActive={page === number}>
                            {number}
                        </PaginationLink>
                  </PaginationItem>  
                ))}


                {page !== pageNumbers.length && (
                    <PaginationItem className="p-2 ">
                        <PaginationNext className="p-2 bg-gray-800 text-white hover:bg-gray-600 hover:text-white" size={12} href="#" onClick={() => onPageChange(page+1)}/>
                    </PaginationItem>
                )}

            </PaginationContent>
        </Pagination>
    </div>
  )
}

export default PaginationSelector
