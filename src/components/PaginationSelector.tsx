import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

type Props = { 
    page: number; 
    pages: number; 
    onPageChange: (page: number) => void; 
}

const PaginationSelector = ({ page, pages, onPageChange }: Props) => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Número máximo de páginas a serem exibidas

    // Calcular o intervalo de páginas a serem exibidas
    const startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(pages, startPage + maxVisiblePages - 1);
    const adjustedStartPage = Math.max(1, endPage - maxVisiblePages + 1);

    // Gerar números de página com `...`
    for (let i = adjustedStartPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <Pagination>
                <PaginationContent className="m-10">
                    {page !== 1 && (
                        <PaginationItem className="p-2">
                            <PaginationPrevious 
                                className="p-2 bg-gray-800 text-white hover:bg-gray-600 hover:text-white" 
                                size={"lg"} 
                                href="#" 
                                onClick={() => onPageChange(page - 1)} 
                            />
                        </PaginationItem>
                    )}

                    {adjustedStartPage > 1 && (
                        <PaginationItem>
                            <PaginationLink className="p-2" size={"lg"} href="#" onClick={() => onPageChange(1)}>
                                1
                            </PaginationLink>
                        </PaginationItem>
                    )}

                    {adjustedStartPage > 2 && (
                        <PaginationItem>
                            <span className="p-2">...</span>
                        </PaginationItem>
                    )}

                    {pageNumbers.map((number) => (
                        <PaginationItem key={number}>
                            <PaginationLink 
                                className="p-2" 
                                size={"lg"} 
                                href="#" 
                                onClick={() => onPageChange(number)} 
                                isActive={page === number}
                            >
                                {number}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {endPage < pages - 1 && (
                        <PaginationItem>
                            <span className="p-2">...</span>
                        </PaginationItem>
                    )}

                    {endPage < pages && (
                        <PaginationItem>
                            <PaginationLink className="p-2" size={"lg"} href="#" onClick={() => onPageChange(pages)}>
                                {pages}
                            </PaginationLink>
                        </PaginationItem>
                    )}

                    {page !== pages && (
                        <PaginationItem className="p-2">
                            <PaginationNext 
                                className="p-2 bg-gray-800 text-white hover:bg-gray-600 hover:text-white" 
                                size={"lg"} 
                                href="#" 
                                onClick={() => onPageChange(page + 1)} 
                            />
                        </PaginationItem>
                    )}
                </PaginationContent>
            </Pagination>
        </div>
    );
}

export default PaginationSelector;
