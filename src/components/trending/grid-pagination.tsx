import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "~/components/ui/button"

interface GridPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function GridPagination({ currentPage, totalPages, onPageChange }: GridPaginationProps) {
  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-purple-600 hover:bg-purple-50 hover:text-purple-700"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            type="button"
            key={page}
            onClick={() => onPageChange(page)}
            className={`h-2 w-2 rounded-full transition-all ${
              currentPage === page ? "bg-purple-600" : "bg-purple-200 hover:bg-purple-300"
            }`}
          >
            <span className="sr-only">Page {page}</span>
          </button>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-purple-600 hover:bg-purple-50 hover:text-purple-700"
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </div>
  )
}

