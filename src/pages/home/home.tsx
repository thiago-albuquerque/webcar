import { MainContainer } from "../../components/MainContainer/MainContainer";

function Home() {
  return (
    <MainContainer>
      <section className="w-full max-w-3xl mx-auto flex p-4 rounded-lg bg-white justify-between items-center gap-2">
        <input
          placeholder="Digite o nome do carro que você quer encontrar"
          className="w-full outline-none border-2 rounded-lg px-4 h-12"
        />

        <button className="bg-red-500 rounded-lg px-8 px-4 h-12 text-white font-medium">
          Buscar
        </button>
      </section>

      <h1 className="font-bold text-center text-2xl my-8">
        Carros novos e usados em todo Brasil
      </h1>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        <article className="w-full bg-white rounded-lg hover:scale-105 transition-all cursor-pointer">
          <img
            src="https://img.olx.com.br/images/15/155441483778514.jpg"
            alt="Nissan Frontier Pro 4x 2023 branca"
            className="w-full rounded-lg max-h-60 object-cover"
          />
          <h2 className="font-bold mx-2 mt-2">Nissan Frontier Pro 4x</h2>
          <div>
            <p className="mx-2 mb-2 text-slate-500">Ano 2023/2024 | 7.000 km</p>
            <h1 className="font-bold mx-2 mb-2 text-xl">R$ 305.000,00</h1>
          </div>
          <hr className="mx-2" />
          <div>
            <p className="font-bold mx-2 my-2 text-slate-500">
              Campo Grande - MS
            </p>
          </div>
        </article>
        <article className="w-full bg-white rounded-lg hover:scale-105 transition-all cursor-pointer">
          <img
            src="https://img.olx.com.br/images/15/155441483778514.jpg"
            alt="Nissan Frontier Pro 4x 2023 branca"
            className="w-full rounded-lg max-h-60 object-cover"
          />
          <h2 className="font-bold mx-2 mt-2">Nissan Frontier Pro 4x</h2>
          <div>
            <p className="mx-2 mb-2 text-slate-500">Ano 2023/2024 | 7.000 km</p>
            <h1 className="font-bold mx-2 mb-2 text-xl">R$ 305.000,00</h1>
          </div>
          <hr className="mx-2" />
          <div>
            <p className="font-bold mx-2 my-2 text-slate-500">
              Campo Grande - MS
            </p>
          </div>
        </article>
        <article className="w-full bg-white rounded-lg hover:scale-105 transition-all cursor-pointer">
          <img
            src="https://img.olx.com.br/images/15/155441483778514.jpg"
            alt="Nissan Frontier Pro 4x 2023 branca"
            className="w-full rounded-lg max-h-60 object-cover"
          />
          <h2 className="font-bold mx-2 mt-2">Nissan Frontier Pro 4x</h2>
          <div>
            <p className="mx-2 mb-2 text-slate-500">Ano 2023/2024 | 7.000 km</p>
            <h1 className="font-bold mx-2 mb-2 text-xl">R$ 305.000,00</h1>
          </div>
          <hr className="mx-2" />
          <div>
            <p className="font-bold mx-2 my-2 text-slate-500">
              Campo Grande - MS
            </p>
          </div>
        </article>
        <article className="w-full bg-white rounded-lg hover:scale-105 transition-all cursor-pointer">
          <img
            src="https://img.olx.com.br/images/15/155441483778514.jpg"
            alt="Nissan Frontier Pro 4x 2023 branca"
            className="w-full rounded-lg max-h-60 object-cover"
          />
          <h2 className="font-bold mx-2 mt-2">Nissan Frontier Pro 4x</h2>
          <div>
            <p className="mx-2 mb-2 text-slate-500">Ano 2023/2024 | 7.000 km</p>
            <h1 className="font-bold mx-2 mb-2 text-xl">R$ 305.000,00</h1>
          </div>
          <hr className="mx-2" />
          <div>
            <p className="font-bold mx-2 my-2 text-slate-500">
              Campo Grande - MS
            </p>
          </div>
        </article>
        <article className="w-full bg-white rounded-lg hover:scale-105 transition-all cursor-pointer">
          <img
            src="https://img.olx.com.br/images/15/155441483778514.jpg"
            alt="Nissan Frontier Pro 4x 2023 branca"
            className="w-full rounded-lg max-h-60 object-cover"
          />
          <h2 className="font-bold mx-2 mt-2">Nissan Frontier Pro 4x</h2>
          <div>
            <p className="mx-2 mb-2 text-slate-500">Ano 2023/2024 | 7.000 km</p>
            <h1 className="font-bold mx-2 mb-2 text-xl">R$ 305.000,00</h1>
          </div>
          <hr className="mx-2" />
          <div>
            <p className="font-bold mx-2 my-2 text-slate-500">
              Campo Grande - MS
            </p>
          </div>
        </article>
        <article className="w-full bg-white rounded-lg hover:scale-105 transition-all cursor-pointer">
          <img
            src="https://img.olx.com.br/images/15/155441483778514.jpg"
            alt="Nissan Frontier Pro 4x 2023 branca"
            className="w-full rounded-lg max-h-60 object-cover"
          />
          <h2 className="font-bold mx-2 mt-2">Nissan Frontier Pro 4x</h2>
          <div>
            <p className="mx-2 mb-2 text-slate-500">Ano 2023/2024 | 7.000 km</p>
            <h1 className="font-bold mx-2 mb-2 text-xl">R$ 305.000,00</h1>
          </div>
          <hr className="mx-2" />
          <div>
            <p className="font-bold mx-2 my-2 text-slate-500">
              Campo Grande - MS
            </p>
          </div>
        </article>
      </section>
    </MainContainer>
  );
}

export default Home;
