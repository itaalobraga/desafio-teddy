import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { COMPANIES_BASE_URL } from "../../apis/external-company";

interface CompanyForm {
  name: string;
  companyName: string;
  collaboratorsCount: string;
  isActive: string;
}

export function CompaniesForm() {
  const { id } = useParams<{ id?: string }>();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<CompanyForm>({
    mode: "all",
    defaultValues: {
      isActive: "true",
    },
  });

  const hasId = !!id;

  async function handleGetCompany() {
    if (!id) {
      return;
    }

    try {
      const { data } = await axios.get(`${COMPANIES_BASE_URL}/${id}`);

      reset({
        name: data.name,
        companyName: data.companyName,
        collaboratorsCount: data.collaboratorsCount,
        isActive: JSON.stringify(data.isActive),
      });
    } catch (error) {
      alert("Ocorreu um erro ao carregar os dados da empresa.");
    }
  }

  async function handleEditCompany(data: CompanyForm) {
    try {
      await axios.put(`${COMPANIES_BASE_URL}/${id}`, {
        ...data,
        isActive: JSON.parse(data.isActive),
      });

      alert("Empresa atualizada com sucesso!");

      navigate("/companies/");
    } catch (error) {
      alert("Ocorreu um erro ao atualizar a empresa.");
    }
  }

  async function handleCreateCompany(data: CompanyForm) {
    try {
      await axios.post(`${COMPANIES_BASE_URL}/`, {
        ...data,
        isActive: JSON.parse(data.isActive),
      });
      alert("Empresa criada com sucesso!");

      reset();

      navigate("/companies/");
    } catch (error) {
      alert("Ocorreu um erro ao criar a empresa.");
    }
  }

  async function onSubmit(data: CompanyForm) {
    id ? await handleEditCompany(data) : await handleCreateCompany(data);
  }

  useEffect(() => {
    handleGetCompany();
  }, []);

  return (
    <>
      <h1 className="text-[2.25rem] font-[500] mb-[3.5rem]">
        {hasId ? "Editar Empresa" : "Nova Empresa"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label
          htmlFor="name"
          className="flex flex-col gap-[0.5rem] text-[0.875rem] font-[500] mb-[1rem]"
        >
          Nome*
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
          htmlFor="companyName"
          className="flex flex-col gap-[0.5rem] text-[0.875rem] font-[500] mb-[1rem]"
        >
          Nome da empresa*
          <input
            type="text"
            id="companyName"
            placeholder="Digite o nome da empresa"
            className="appearance-none border border-[#D2D2D2] p-[0.5rem] rounded"
            {...register("companyName", { required: "Campo obrigatório*" })}
          />
          {errors.companyName && (
            <span className="text-red-500 text-[0.75rem]">
              {errors.companyName.message}
            </span>
          )}
        </label>

        <label
          htmlFor="collaboratorsCount"
          className="flex flex-col gap-[0.5rem] text-[0.875rem] font-[500] mb-[1rem]"
        >
          Número de colaboradores*
          <input
            type="number"
            id="collaboratorsCount"
            placeholder="Digite o número de colaboradores"
            className="appearance-none border border-[#D2D2D2] p-[0.5rem] rounded"
            {...register("collaboratorsCount", {
              required: "Campo obrigatório*",
            })}
          />
          {errors.collaboratorsCount && (
            <span className="text-red-500 text-[0.75rem]">
              {errors.collaboratorsCount.message}
            </span>
          )}
        </label>

        <label className="flex flex-col gap-[0.5rem] text-[0.875rem] font-[500] mb-[1rem]">
          Ativa?
          <div className="flex items-center gap-[0.5rem]">
            <label className="flex gap-[0.5rem] text-[0.875rem] font-[500] select-none">
              <input type="radio" value="true" {...register("isActive")} />
              Sim
            </label>

            <label className="flex gap-[0.5rem] text-[0.875rem] font-[500] select-none">
              <input type="radio" value="false" {...register("isActive")} />
              Não
            </label>
          </div>
        </label>

        <div className="flex items-center gap-[1rem] w-full justify-end mt-[2rem]">
          <button
            type="button"
            className="rounded basis-[12.5rem] bg-white text-[#575756] transition-colors flex justify-center items-center h-[3rem] font-[600] disabled:bg-[#AFAFAE]"
            onClick={() => navigate("/companies")}
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
