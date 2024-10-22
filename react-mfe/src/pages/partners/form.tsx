import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { PARTNERS_BASE_URL } from "../../apis/partner";
import { useEffect } from "react";

interface PartnerForm {
  name: string;
  description: string;
  repositoryGit: string;
  urlDoc: string;
  clients: string[];
  projects: string[];
}

export function PartnersForm() {
  const { id } = useParams<{ id?: string }>();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<PartnerForm>({
    mode: "all",
  });

  const hasId = !!id;

  async function handleGetPartner() {
    if (!id) {
      return;
    }

    try {
      const { data } = await axios.get(`${PARTNERS_BASE_URL}/${id}`);

      reset({
        name: data.name,
        description: data.description,
        repositoryGit: data.repositoryGit,
        urlDoc: data.urlDoc,
        clients: data.clients.join(", "),
        projects: data.projects.join(", "),
      });
    } catch (error) {
      alert("Ocorreu um erro ao carregar os dados do(a) parceiro(a).");
    }
  }

  async function handleEditPartner(data: PartnerForm) {
    try {
      await axios.put(`${PARTNERS_BASE_URL}/${id}`, {
        ...data,
        clients: data.clients.map((client) => client.trim()),
        projects: data.projects.map((project) => project.trim()),
      });

      alert("Parceiro(a) atualizado(a) com sucesso!");

      navigate("/partners/");
    } catch (error) {
      alert("Ocorreu um erro ao atualizar o(a) parceiro(a).");
    }
  }

  async function handleCreatePartner(data: PartnerForm) {
    try {
      await axios.post(`${PARTNERS_BASE_URL}/`, data);
      alert("Parceiro(a) criado(a) com sucesso!");

      reset();

      navigate("/partners/");
    } catch (error) {
      alert("Ocorreu um erro ao criar o(a) parceiro(a).");
    }
  }

  async function onSubmit(data: PartnerForm) {
    id ? await handleEditPartner(data) : await handleCreatePartner(data);
  }

  useEffect(() => {
    handleGetPartner();
  }, []);

  return (
    <>
      <h1 className="text-[2.25rem] font-[500] mb-[3.5rem]">
        {hasId ? "Editar Parceiro" : "Novo Parceiro"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label
          htmlFor="name"
          className="flex flex-col gap-[0.5rem] text-[0.875rem] font-[500] mb-[1rem]"
        >
          Nome
          <input
            type="text"
            id="name"
            placeholder="Digite o nome"
            className="appearance-none border border-[#D2D2D2] p-[0.5rem] rounded"
            {...register("name", { required: "Campo obrigatório*" })}
          />
          {errors.name && (
            <span className="text-red-500 text-[0.75rem]">
              {errors.name.message}
            </span>
          )}
        </label>

        <label
          htmlFor="repositoryGit"
          className="flex flex-col gap-[0.5rem] text-[0.875rem] font-[500] mb-[1rem]"
        >
          Repositório GIT
          <input
            type="text"
            id="repositoryGit"
            placeholder="https://github.com/example"
            className="appearance-none border border-[#D2D2D2] p-[0.5rem] rounded"
            {...register("repositoryGit", { required: "Campo obrigatório*" })}
          />
          {errors.repositoryGit && (
            <span className="text-red-500 text-[0.75rem]">
              {errors.repositoryGit.message}
            </span>
          )}
        </label>

        <label
          htmlFor="urlDoc"
          className="flex flex-col gap-[0.5rem] text-[0.875rem] font-[500] mb-[1rem]"
        >
          URL Doc
          <input
            type="text"
            id="urlDoc"
            placeholder="https://example.com"
            className="appearance-none border border-[#D2D2D2] p-[0.5rem] rounded"
            {...register("urlDoc", { required: "Campo obrigatório*" })}
          />
          {errors.urlDoc && (
            <span className="text-red-500 text-[0.75rem]">
              {errors.urlDoc.message}
            </span>
          )}
        </label>

        <label
          htmlFor="clients"
          className="flex flex-col gap-[0.5rem] text-[0.875rem] font-[500] mb-[1rem]"
        >
          Clientes (Separe os ID's por vírgula)
          <input
            type="text"
            id="clients"
            placeholder="Exemplo: 01, 02, 03"
            className="appearance-none border border-[#D2D2D2] p-[0.5rem] rounded"
            {...register("clients", {
              required: "Campo obrigatório*",
              setValueAs: (v) =>
                v.split(",").map((item: string) => item.trim()),
            })}
          />
          {errors.clients && (
            <span className="text-red-500 text-[0.75rem]">
              {errors.clients.message}
            </span>
          )}
        </label>

        <label
          htmlFor="projects"
          className="flex flex-col gap-[0.5rem] text-[0.875rem] font-[500] mb-[1rem]"
        >
          Projetos (Separe os ID's por vírgula)
          <input
            type="text"
            id="projects"
            placeholder="Exemplo: 01, 02, 03"
            className="appearance-none border border-[#D2D2D2] p-[0.5rem] rounded"
            {...register("projects", {
              required: "Campo obrigatório*",
              setValueAs: (v) =>
                v.split(",").map((item: string) => item.trim()),
            })}
          />
          {errors.projects && (
            <span className="text-red-500 text-[0.75rem]">
              {errors.projects.message}
            </span>
          )}
        </label>

        <label
          htmlFor="description"
          className="flex flex-col gap-[0.5rem] text-[0.875rem] font-[500] mb-[1rem]"
        >
          Descrição
          <textarea
            id="description"
            placeholder="Digite a descrição"
            className="appearance-none border min-h-[8rem] border-[#D2D2D2] p-[0.5rem] rounded"
            {...register("description", { required: "Campo obrigatório*" })}
          />
          {errors.description && (
            <span className="text-red-500 text-[0.75rem]">
              {errors.description.message}
            </span>
          )}
        </label>

        <div className="flex items-center gap-[1rem] w-full justify-end mt-[2rem]">
          <button
            type="button"
            className="rounded basis-[12.5rem] bg-white text-[#575756] transition-colors flex justify-center items-center h-[3rem] font-[600] disabled:bg-[#AFAFAE]"
            onClick={() => navigate("/partners")}
          >
            Voltar
          </button>

          <button
            type="submit"
            className="rounded basis-[12.5rem] bg-[#575756] text-white transition-colors flex justify-center items-center h-[3rem] font-[600] disabled:bg-[#AFAFAE]"
            disabled={!isValid}
          >
            Salvar
          </button>
        </div>
      </form>
    </>
  );
}
