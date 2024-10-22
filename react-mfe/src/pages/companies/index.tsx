import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "../../components/table";
import { createColumnHelper } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { PaginationResponse } from "../../types/pagination";
import { pagination } from "../../helpers/pagination";
import { COMPANIES_BASE_URL } from "../../apis/external-company";

type Company = {
  id: string;
  name: string;
  companyName: string;
  collaboratorsCount: number;
  isActive: boolean;
  lastSubmit: Date;
  createdAt: Date;
};

export function Companies() {
  const [companies, setCompanies] = useState<PaginationResponse<Company>>({
    data: [],
    items: 0,
    pages: 0,
  });

  const [currentPage, setCurrentPage] = useState<number>(1);

  const navigate = useNavigate();

  const columnHelper = createColumnHelper<Company>();

  const columns = [
    columnHelper.accessor("name", {
      header: "Nome",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("companyName", {
      header: "Nome da empresa",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("collaboratorsCount", {
      header: "Colaboradores",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("isActive", {
      header: "Ativa",
      cell: (info) => (info.getValue() ? "Sim" : "Não"),
    }),
    columnHelper.accessor("lastSubmit", {
      header: "Última Submissão",
      cell: (info) => new Date(info.getValue().toString()).toLocaleDateString(),
    }),

    columnHelper.display({
      id: "actions",
      header: "Ações",
      cell: (info) => {
        const company = info.row.original;

        return (
          <div className="flex items-center gap-[0.5rem]">
            <button
              type="button"
              onClick={() => navigate(`/companies/${company.id}`)}
            >
              Editar
            </button>
            <button
              type="button"
              className="text-red-500"
              onClick={() => handleDeleteCompany(company)}
            >
              Remover
            </button>
          </div>
        );
      },
    }),
  ];

  function handleUpdateSearchParams(page: number) {
    const params = new URLSearchParams(location.search);

    params.set("page", page.toString());

    navigate(`?${params.toString()}`, { replace: true });
  }

  function handlePageChange(newPage: number) {
    setCurrentPage(newPage);

    handleUpdateSearchParams(newPage);
  }

  async function handleGetPartners(page: number) {
    try {
      const { data } = await axios.get<Company[]>(COMPANIES_BASE_URL);

      setCompanies(pagination(data, { limit: 10, page }));
    } catch (error) {
      alert("Failed to fetch companies");
    }
  }

  async function handleDeleteCompany(company: Company) {
    const confirmed = window.confirm(
      `Tem certeza que deseja remover "${company.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`${COMPANIES_BASE_URL}/${company.id}`);
      setCompanies((state) => ({
        ...state,
        data: state.data.filter(({ id }) => id !== company.id),
      }));
    } catch (error) {
      alert("Failed to delete company");
    }
  }

  useEffect(() => {
    handleGetPartners(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get("page");

    if (page) {
      setCurrentPage(parseInt(page));
    }
  }, [location.search]);

  return (
    <>
      <h1 className="text-[2.25rem] font-[500] mb-[3.5rem]">Empresas</h1>

      <button
        type="button"
        className="rounded w-full self-end max-w-[12.5rem] mb-[1.5rem] bg-[#575756] text-white transition-colors flex justify-center items-center h-[3rem] font-[600] disabled:bg-[#AFAFAE]"
        onClick={() => navigate("/companies/create")}
      >
        Nova empresa
      </button>

      <Table
        data={companies.data}
        columns={columns}
        currentPage={currentPage}
        totalPages={companies.pages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
