import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "../../components/table";
import { createColumnHelper } from "@tanstack/react-table";
import { PARTNERS_BASE_URL } from "../../apis/partner";
import { useNavigate } from "react-router-dom";
import { PaginationResponse } from "../../types/pagination";
import { pagination } from "../../helpers/pagination";
import { FiTrash2, FiEdit } from "react-icons/fi";

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
          <div className="flex items-center gap-[1rem]">
            <button
              type="button"
              title="Editar"
              onClick={() => navigate(`/partners/${partner.id}`)}
              className="text-lg border border-neutral-500 p-[0.375rem] rounded bg-white hover:brightness-90"
            >
              <FiEdit />
            </button>
            <button
              type="button"
              title="Remover"
              className="text-lg text-red-600 border border-neutral-500 p-[0.375rem] rounded bg-white hover:brightness-90"
              onClick={() => handleDeletePartner(partner)}
            >
              <FiTrash2 />
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
      alert("Ocorreu um erro ao carregar os(as) parceiros(as).");
    }
  }

  async function handleDeletePartner(partner: Partner) {
    const confirmed = window.confirm(
      `Tem certeza que deseja remover "${partner.name}"?`
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

      alert("Parceiro(a) removido(a) com sucesso!");
    } catch (error) {
      alert("Ocorreu um erro ao tentar remover esse(a) parceiro(a).");
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
      <h1 className="text-[2.25rem] font-[500] mb-[1.5rem]">Parceiros</h1>

      <button
        type="button"
        className="rounded w-full self-end max-w-[12.5rem] mb-[1.5rem] hover:opacity-50 bg-[#575756] text-white transition-colors flex justify-center items-center h-[3rem] font-[600] disabled:bg-[#AFAFAE]"
        onClick={() => navigate("/partners/create")}
      >
        Novo(a) parceiro(a)
      </button>

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
