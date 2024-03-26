import { FiTrash2 } from "react-icons/fi";
import { MainContainer } from "../../components/MainContainer/MainContainer";
import PanelHeader from "../../components/PanelHeader/PanelHeader";
import {
  collection,
  query,
  getDocs,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { dataBase } from "../../services/firebaseServices";
import { AuthContext } from "../../contexts/AuthContext";
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

function Dashboard() {
  const [cars, setCars] = useState<CarsProps[]>([]);
  const [loadImages, setLoadImages] = useState<string[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    function loadCars() {
      if (!user?.uid) {
        return;
      }
      const carsRef = collection(dataBase, "cars");
      const queryRef = query(carsRef, where("uid", "==", user.uid));

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

    loadCars();
  }, [user]);

  function handleImageLoad(id: string) {
    setLoadImages((prevImageLoaded) => [...prevImageLoaded, id]);
  }

  async function handleDeleteCar(id: string) {
    const docRef = doc(dataBase, "cars", id);

    await deleteDoc(docRef);

    setCars(cars.filter((car) => car.id !== id));
  }

  return (
    <MainContainer>
      <PanelHeader />
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {cars.map((car) => (
          <div key={car.id}>
            <div
              className="w-full bg-white rounded-lg"
              style={{
                display: loadImages.includes(car.id) ? "none" : "block",
              }}
            >
              <img src={Logo} alt="Web Car" className="w-full object-cover" />
            </div>

            <article className="w-full bg-white rounded-lg hover:scale-105 transition-all cursor-pointer relative">
              <button
                onClick={() => handleDeleteCar(car.id)}
                className="absolute rounded-full bg-white p-2 right-4 top-4 drop-shadow"
              >
                <FiTrash2 size={24} color="#000" />
              </button>
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
          </div>
        ))}
      </section>
    </MainContainer>
  );
}

export default Dashboard;
