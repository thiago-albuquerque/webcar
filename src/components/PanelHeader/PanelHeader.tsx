import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseServices";

function PanelHeader() {
  async function handleLogOut() {
    await signOut(auth);
  }

  return (
    <nav className="w-full items-center flex h-10 bg-red-500 rounded-lg px-4 gap-4 text-white font-medium mb-8">
      <Link to="/dashboard">Meus carros</Link>
      <Link to="/dashboard/newcar">Novo carro</Link>

      <button className="ml-auto" onClick={handleLogOut}>
        Sair da conta
      </button>
    </nav>
  );
}

export default PanelHeader;
