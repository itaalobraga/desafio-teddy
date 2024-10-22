import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

type Props<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Table<T>({
  data,
  columns,
  currentPage,
  totalPages,
  onPageChange,
}: Props<T>) {
  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex flex-col rounded overflow-hidden items-center">
      <table className="w-full border-separate border-spacing-0 table-fixed">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="gap-[0.25rem] bg-white px-[1.5rem] text-left text-[0.875rem] font-medium h-[3rem] border-r last:border-r-0 border-b"
                  >
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => {
            return (
              <tr key={row.id} className="odd:bg-[#DFDFDF] even:bg-[#EEE]">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className="overflow-ellipsis overflow-clip px-[1.5rem] h-[3.5rem] text-left text-[0.875rem] font-medium border-b group-last:border-b-0 last:border-r-0 py-0 whitespace-nowrap opacity-90"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <footer className="flex w-full px-[1.5rem] py-[0.75rem] h-[2.5rem] bg-white rounded-b" />

      <div className="flex items-center gap-2 mt-[1.5rem]">
        <button
          type="button"
          className="bg-white h-[2.5rem] w-[2.5rem] rounded flex items-center justify-center hover:opacity-50 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          <FiChevronLeft size={18} />
        </button>

        <span className="flex items-center gap-1">
          Página {currentPage} de {totalPages}
        </span>

        <button
          type="button"
          className="bg-white h-[2.5rem] w-[2.5rem] rounded flex items-center justify-center hover:opacity-50 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <FiChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
