interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination({
    page,
    totalPages,
    onPageChange,
}: PaginationProps) {

    return (
        <div className="flex gap-2 items-center">
            <button
                disabled={page === 0}
                onClick={() => onPageChange(page - 1)}
            >
                Prev
            </button>

            <span>
                {page + 1} / {totalPages}
            </span>

            <button
                disabled={page + 1 >= totalPages}
                onClick={() => onPageChange(page + 1)}
            >
                Next
            </button>
        </div>
    );
}