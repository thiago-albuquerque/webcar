import { ChangeEvent, useContext, useState } from "react";
import { FiTrash2, FiUpload } from "react-icons/fi";
import { MainContainer } from "../../../components/MainContainer/MainContainer";
import PanelHeader from "../../../components/PanelHeader/PanelHeader";

import { useForm } from "react-hook-form";
import { Input } from "../../../components/Input/Input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "../../../contexts/AuthContext";
import { v4 as uuidV4 } from "uuid";
import { storage, dataBase } from "../../../services/firebaseServices";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import toast from "react-hot-toast";

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

interface ImageItemsProps {
  uid: string;
  name: string;
  previewUrl: string;
  url: string;
}

function newCar() {
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const [carImage, setCarImage] = useState<ImageItemsProps[]>([]);

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      const image = event.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        await handleUpload(image);
      } else {
        alert("Envie uma imagem jpeg ou png!");
        return;
      }

      console.log(image);
    }
  }

  async function handleUpload(image: File) {
    if (!user?.uid) {
      return;
    }

    const currentUid = user?.uid;
    const uidImage = uuidV4();
    const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`);

    uploadBytes(uploadRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadUrl) => {
        const imageItem = {
          uid: currentUid,
          name: uidImage,
          previewUrl: URL.createObjectURL(image),
          url: downloadUrl,
        };

        setCarImage((images) => [...images, imageItem]);
      });
    });
  }

  async function submitData(data: FormData) {
    if (carImage.length === 0) {
      toast.error("Envie alguma imagem deste carro!");
      return;
    }

    const carListImages = carImage.map((car) => {
      return {
        uid: car.uid,
        name: car.name,
        url: car.url,
      };
    });

    addDoc(collection(dataBase, "cars"), {
      name: data.name.toUpperCase(),
      model: data.model.toUpperCase(),
      year: data.year,
      km: data.km,
      price: data.price,
      city: data.city,
      whatsapp: data.whatsapp,
      description: data.description,
      created: new Date(),
      owner: user?.name,
      uid: user?.uid,
      images: carListImages,
    })
      .then(() => {
        reset();
        setCarImage([]);
        console.log("Carro cadastrado com sucesso!");
        toast.success("Carro cadastrado com sucesso!");
      })
      .catch((error) => {
        console.log("Erro ao cadastrar carro!: ", error);
        toast.error("Erro ao cadastrar carro!");
      });
  }

  async function handleDeleteImage(item: ImageItemsProps) {
    const imagePath = `images/${item.uid}/${item.name}`;
    const imageRef = ref(storage, imagePath);

    try {
      await deleteObject(imageRef);
      setCarImage(carImage.filter((car) => car.url !== item.url));
    } catch (error) {
      console.log("Erro ao deletar: ", error);
    }
  }

  return (
    <MainContainer>
      <PanelHeader />

      <section className="w-full bg-white p-4 rounded-lg flex flex-col sm:flex-row items-center gap-2">
        <button className="border-2 w-52 rounded-lg flex items-center justify-center border-gray-200 h-32">
          <div className="absolute cursor-pointer">
            <FiUpload size={30} color="#000" />
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="opacity-0 cursor-pointer"
            />
          </div>
        </button>

        {carImage.map((item) => (
          <div
            key={item.name}
            className="w-full h-32 flex items-center justify-center "
          >
            <button
              className="absolute"
              onClick={() => handleDeleteImage(item)}
            >
              <FiTrash2 size={28} color="#fff" />
            </button>
            <img
              src={item.previewUrl}
              alt="WebCar"
              className="w-full rounded-lg h-32 object-cover"
            />
          </div>
        ))}
      </section>

      <section className="w-full bg-white p-4 rounded-lg flex flex-col sm:flex-row items-center justify-center gap-2 my-8">
        <form className="w-full" onSubmit={handleSubmit(submitData)}>
          <div className="mb-4">
            <label className="text-slate-600">Nome</label>
            <Input
              type="name"
              placeholder="Ex.: Nissan Frontier"
              name="name"
              errors={errors.name?.message}
              register={register}
            />
          </div>

          <div className="mb-4">
            <label className="text-slate-600">Modelo</label>
            <Input
              type="model"
              placeholder="Ex.: Pro 4x 2.0"
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
