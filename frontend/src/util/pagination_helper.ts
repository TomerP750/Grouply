

export function extractPageCount(res: any, pageSize: number): number {
  // Shape A: { totalPages: number, totalElements: number, ... }
  if (typeof res?.totalPages === "number" && res.totalPages > 0) {
    return res.totalPages;
  }

  // Shape B: { page: { totalPages, totalElements, ... }, content: [...] }
  const page = res?.page;
  if (typeof page?.totalPages === "number" && page.totalPages > 0) {
    return page.totalPages;
  }

  // Fallback: derive from totalElements if present
  const totalElements =
    typeof res?.totalElements === "number"
      ? res.totalElements
      : typeof page?.totalElements === "number"
      ? page.totalElements
      : undefined;

  if (typeof totalElements === "number") {
    return Math.max(1, Math.ceil(totalElements / pageSize));
  }

  // Very last resort
  return 1;
}
