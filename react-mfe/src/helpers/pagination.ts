import { PaginationParams, PaginationResponse } from "../types/pagination";

export const pagination = <T>(
  raw: T[],
  { page, limit }: PaginationParams
): PaginationResponse<T> => {
  const data = raw.slice((page - 1) * limit, page * limit);

  return {
    data,
    items: raw.length,
    pages: Math.ceil(raw.length / limit),
  };
};
