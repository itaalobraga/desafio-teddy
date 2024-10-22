import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "../../components/table";
import { createColumnHelper } from "@tanstack/react-table";
import { PARTNERS_BASE_URL } from "../../apis/partner";
import { useNavigate } from "react-router-dom";
import { PaginationResponse } from "../../types/pagination";
import { pagination } from "../../helpers/pagination";

type Partner = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  repositoryGit: string;
  urlDoc: string;
  clients: (string | number)[];
  projects: (string | number)[];
};

export function Partners() {
  const [partners, setPartners] = useState<PaginationResponse<Partner>>({
    data: [],
    items: 0,
    pages: 0,
  });

  const [currentPage, setCurrentPage] = useState<number>(1);

  const navigate = useNavigate();

  const columnHelper = createColumnHelper<Partner>();

  const columns = [
    columnHelper.accessor("name", {
      header: "Nome",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("description", {
      header: "Descrição",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("createdAt", {
      header: "Data de criação",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.accessor("repositoryGit", {
      header: "Repositório Git",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("urlDoc", {
      header: "URL Doc",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("clients", {
      header: "Qtd. Clientes",
      cell: (info) => info.getValue().length,
    }),
    columnHelper.accessor("projects", {
      header: "Qtd. Projetos",
      cell: (info) => info.getValue().length,
    }),
    columnHelper.display({
      id: "actions",
      header: "Ações",
      cell: (info) => {
        const partner = info.row.original;

        return (
          <div className="flex items-center gap-[0.5rem]">
            <button type="button">Editar</button>
            <button type="button" onClick={() => handleDeletePartner(partner)}>
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
      const { data } = await axios.get<Partner[]>(PARTNERS_BASE_URL);

      setPartners(pagination(data, { limit: 10, page }));
    } catch (error) {
      alert("Failed to fetch partners");
    }
  }

  async function handleDeletePartner(partner: Partner) {
    const confirmed = window.confirm(
      `Tem certeza que deseja remover o(a) parceiro(a) "${partner.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`${PARTNERS_BASE_URL}/${partner.id}`);
      setPartners((state) => ({
        ...state,
        data: state.data.filter(({ id }) => id !== partner.id),
      }));
    } catch (error) {
      alert("Failed to delete partner");
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
      <h1 className="text-[2.25rem] font-[500] mb-[3.5rem]">Parceiros</h1>

      <Table
        data={partners.data}
        columns={columns}
        currentPage={currentPage}
        totalPages={partners.pages}
        onPageChange={handlePageChange}
      />
    </>
  );
}
