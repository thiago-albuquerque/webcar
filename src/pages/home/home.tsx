import { useState, useEffect } from "react";
import { MainContainer } from "../../components/MainContainer/MainContainer";
import { collection, query, getDocs, orderBy, where } from "firebase/firestore";
import { dataBase } from "../../services/firebaseServices";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

interface CarsProps {
  id: string;
  name: string;
  model: string;
  year: string;
  uid: string;
  price: string | number;
  city: string;
  km: string | number;
  images: CarImageProps[];
}

interface CarImageProps {
  name: string;
  uid: string;
  url: string;
}

function Home() {
  const [cars, setCars] = useState<CarsProps[]>([]);
  const [loadImages, setLoadImages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    loadCars();
  }, []);

  function loadCars() {
    const carsRef = collection(dataBase, "cars");
    const queryRef = query(carsRef, orderBy("created", "desc"));

    getDocs(queryRef).then((snapshot) => {
      const listCars = [] as CarsProps[];

      snapshot.forEach((doc) => {
        listCars.push({
          id: doc.id,
          name: doc.data().name,
          model: doc.data().model,
          year: doc.data().year,
          km: doc.data().km,
          price: doc.data().price,
          city: doc.data().city,
          images: doc.data().images,
          uid: doc.data().uid,
        });
      });

      setCars(listCars);
    });
  }

  function handleImageLoad(id: string) {
    setLoadImages((prevImageLoaded) => [...prevImageLoaded, id]);
  }

  async function handleSearchCar() {
    if (input === "") {
      loadCars();
      return;
    }
    setCars([]);
    setLoadImages([]);

    const q = query(
      collection(dataBase, "cars"),
      where("name", ">=", input.toUpperCase()),
      where("name", "<=", input.toUpperCase() + "\uf8ff")
    );

    const querySnapshot = await getDocs(q);

    const searchCars = [] as CarsProps[];

    querySnapshot.forEach((doc) => {
      searchCars.push({
        id: doc.id,
        name: doc.data().name,
        model: doc.data().model,
        year: doc.data().year,
        km: doc.data().km,
        price: doc.data().price,
        city: doc.data().city,
        images: doc.data().images,
        uid: doc.data().uid,
      });
    });

    setCars(searchCars);
  }

  return (
    <MainContainer>
      <section className="w-full max-w-3xl mx-auto flex p-4 rounded-lg bg-white justify-between items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite o nome do carro que você quer encontrar"
          className="w-full outline-none border-2 rounded-lg px-4 h-12"
        />

        <button
          onClick={handleSearchCar}
          className="bg-red-500 rounded-lg px-8 px-4 h-12 text-white font-medium"
        >
          Buscar
        </button>
      </section>

      <h1 className="font-bold text-center text-2xl my-8">
        Carros novos e usados em todo Brasil
      </h1>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {cars.map((car) => (
          <Link key={car.id} to={`/car/${car.id}`}>
            <div
              className="w-full bg-white rounded-lg"
              style={{
                display: loadImages.includes(car.id) ? "none" : "block",
              }}
            >
              <img src={Logo} alt="Web Car" className="w-full object-cover" />
            </div>

            <article className="w-full bg-white rounded-lg hover:scale-105 transition-all cursor-pointer">
              <img
                src={car.images[0].url}
                alt={car.name}
                onLoad={() => handleImageLoad(car.id)}
                className="w-full rounded-lg max-h-60 object-cover"
                style={{
                  display: loadImages.includes(car.id) ? "block" : "none",
                }}
              />
              <h2 className="font-bold mx-2 mt-2">
                {car.name} {car.model}
              </h2>
              <div>
                <p className="mx-2 mb-2 text-slate-500">
                  Ano {car.year} | {car.km} km
                </p>
                <h1 className="font-bold mx-2 mb-2 text-xl">R$ {car.price}</h1>
              </div>
              <hr className="mx-2" />
              <div>
                <p className="font-bold mx-2 my-2 text-slate-500">{car.city}</p>
              </div>
            </article>
          </Link>
        ))}
      </section>
    </MainContainer>
  );
}

export default Home;
