import { FiUpload } from "react-icons/fi";
import { MainContainer } from "../../../components/MainContainer/MainContainer";
import PanelHeader from "../../../components/PanelHeader/PanelHeader";

import { useForm } from "react-hook-form";
import { Input } from "../../../components/Input/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1, "Digite o nome da marca!"),
  model: z.string().min(1, "Digite o nome do modelo do carro!"),
  year: z.string().min(1, "Digite o ano do carro!"),
  km: z.string().min(1, "Digite os km do carro!"),
  price: z.string().min(1, "Digite os números sem pontos!"),
  city: z.string().min(1, "Digite a cidade do carro!"),
  whatsapp: z
    .string()
    .min(1, "Digite os números sem pontos!")
    .refine((value) => /^(\d{11,12})$/.test(value), {
      message: "Número de telefone inválido!",
    }),
  description: z.string().min(1, "Descreva com detalhes sobre o carro!"),
});

type FormData = z.infer<typeof schema>;

function newCar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  async function submitData(data: FormData) {
    console.log(data);
  }

  return (
    <MainContainer>
      <PanelHeader />

      <section className="w-full bg-white p-4 rounded-lg flex flex-col sm:flex-row items-center justify-center gap-2">
        <button className="border-2 w-52 rounded-lg flex items-center justify-center border-gray-200 h-32">
          <div className="absolute cursor-pointer">
            <FiUpload size={30} color="#000" />
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              className="opacity-0 cursor-pointer"
            />
          </div>
        </button>
      </section>

      <section className="w-full bg-white p-4 rounded-lg flex flex-col sm:flex-row items-center justify-center gap-2 my-8">
        <form className="w-full" onSubmit={handleSubmit(submitData)}>
          <div className="mb-4">
            <label className="text-slate-600">Nome</label>
            <Input
              type="name"
              placeholder="Ex.: Nissan"
              name="name"
              errors={errors.name?.message}
              register={register}
            />
          </div>

          <div className="mb-4">
            <label className="text-slate-600">Modelo</label>
            <Input
              type="model"
              placeholder="Ex.: Frontier Pro 4x 2.0"
              name="model"
              errors={errors.model?.message}
              register={register}
            />
          </div>

          <div className="w-full flex gap-4">
            <div className="w-full mb-4">
              <label className="text-slate-600">Ano</label>
              <Input
                type="year"
                placeholder="Ex.: 2023"
                name="year"
                errors={errors.year?.message}
                register={register}
              />
            </div>
            <div className="w-full mb-4">
              <label className="text-slate-600">Km</label>
              <Input
                type="km"
                placeholder="Ex.: 4.200"
                name="km"
                errors={errors.km?.message}
                register={register}
              />
            </div>
          </div>

          <div className="w-full flex gap-4">
            <div className="w-full mb-4">
              <label className="text-slate-600">Preço</label>
              <Input
                type="price"
                placeholder="Ex.: 290.000"
                name="price"
                errors={errors.price?.message}
                register={register}
              />
            </div>
            <div className="w-full mb-4">
              <label className="text-slate-600">Whatsapp</label>
              <Input
                type="whatsapp"
                placeholder="Ex.: 21910351035"
                name="whatsapp"
                errors={errors.whatsapp?.message}
                register={register}
              />
            </div>
          </div>

          <div className="w-full mb-4">
            <label className="text-slate-600">Cidade</label>
            <Input
              type="city"
              placeholder="Ex.: Rio de Janeiro - RJ"
              name="city"
              errors={errors.city?.message}
              register={register}
            />
          </div>

          <div className="w-full mb-4">
            <label className="text-slate-600">Descrição</label>
            <textarea
              className="w-full border-2 rounded-mg h-24 px-2"
              name="description"
              id="description"
              placeholder="Ex.: Completo, IPVA 2024 pago, vistoria em dia..."
              {...register("description")}
            />
            {errors && (
              <p className="my-1 text-red-500">{errors.description?.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-zinc-900 w-full rounded-md text-white h-12 font-medium"
          >
            Cadastrar
          </button>
        </form>
      </section>
    </MainContainer>
  );
}

export default newCar;
