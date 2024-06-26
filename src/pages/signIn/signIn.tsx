import Logo from "../../assets/logo.png";
import { Input } from "../../components/Input/Input";
import { MainContainer } from "../../components/MainContainer/MainContainer";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../services/firebaseServices";
import { useEffect } from "react";
import toast from "react-hot-toast";

const schema = z.object({
  email: z
    .string()
    .email("Insira um email válido")
    .min(1, "O campo email é obrigatório!"),
  password: z.string().min(1, "O campo senha é obrigatório!"),
});

type FormData = z.infer<typeof schema>;

function SignIn() {
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

  function submitData(data: FormData) {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((user) => {
        console.log("Logado com sucesso!");
        console.log(user);
        toast.success("Logado com sucesso!");
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        console.log("Erro ao fazer login!");
        console.log(error);
        toast.error("Erro ao fazer login!");
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
            Acessar
          </button>
        </form>
        <Link to="/signUp">Ainda não criou sua conta?</Link>
      </section>
    </MainContainer>
  );
}

export default SignIn;
