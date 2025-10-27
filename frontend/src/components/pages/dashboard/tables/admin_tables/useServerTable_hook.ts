import type { SortingState } from "@tanstack/react-table";
import { useState, useEffect } from "react";

export function useServerTable<T>(fetchPage: (p: number, s: number, sorting: any) => Promise<{rows:T[]; pageCount:number;}>) {
  const [rows, setRows] = useState<T[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = useState<SortingState>([]);

  useEffect(() => {
    fetchPage(pagination.pageIndex, pagination.pageSize, sorting).then(({rows, pageCount}) => {
      setRows(rows); setPageCount(pageCount);
    });
  }, [pagination, sorting]);

  return { rows, pageCount, pagination, setPagination, sorting, setSorting };
}