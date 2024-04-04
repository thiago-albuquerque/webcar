import Logo from "../../assets/logo.png";
import { Input } from "../../components/Input/Input";
import { MainContainer } from "../../components/MainContainer/MainContainer";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../services/firebaseServices";
import { useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

const schema = z.object({
  name: z.string().min(5, "Digite pelo menos 5 caracteres!"),
  email: z
    .string()
    .email("Insira um email válido")
    .min(1, "O campo email é obrigatório!"),
  password: z.string().min(6, "Digite pelo menos 6 caracteres!"),
});

type FormData = z.infer<typeof schema>;

function SignUp() {
  const { handleInfoUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    async function handleSignOut() {
      await signOut(auth);
    }

    handleSignOut();
  }, []);

  async function submitData(data: FormData) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (user) => {
        await updateProfile(user.user, {
          displayName: data.name,
        });

        handleInfoUser({
          uid: user.user.uid,
          name: data.name,
          email: data.email,
        });

        console.log("Cadastrado com sucesso!");
        toast.success("Cadastrado com sucesso!");
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        console.log("Erro ao cadastrar usuário!");
        console.log(error);
        toast.error("Erro ao cadastrar!");
      });
  }

  return (
    <MainContainer>
      <section className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
        <img src={Logo} alt="Web Car" className="w-72 " />

        <form
          className="bg-white max-w-lg w-full rounded-lg p-4"
          onSubmit={handleSubmit(submitData)}
        >
          <div className="mb-4">
            <label className="text-slate-600">Nome</label>
            <Input
              type="name"
              placeholder="Digite seu email..."
              name="name"
              errors={errors.name?.message}
              register={register}
            />
          </div>

          <div className="mb-4">
            <label className="text-slate-600">Email</label>
            <Input
              type="email"
              placeholder="Digite seu email..."
              name="email"
              errors={errors.email?.message}
              register={register}
            />
          </div>

          <div className="mb-4">
            <label className="text-slate-600">Senha</label>
            <Input
              type="password"
              placeholder="Digite sua senha..."
              name="password"
              errors={errors.password?.message}
              register={register}
            />
          </div>

          <button
            type="submit"
            className="bg-zinc-900 w-full rounded-md text-white h-12 font-medium"
          >
            Cadastrar
          </button>
        </form>
        <Link to="/signIn">Já tem uma conta?</Link>
      </section>
    </MainContainer>
  );
}

export default SignUp;
