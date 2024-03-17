import Logo from "../../assets/logo.png";
import { FaCircleUser } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export function Header() {
  const signed = true;
  const loadingAuth = false;

  return (
    <div className="w-full flex items-center justify-center h-16 bg-white drop-shadow mb-4">
      <header className="w-full max-w-7xl flex items-center justify-between px-4 mx-auto">
        <Link to="/">
          <img src={Logo} alt="web car" width={150} />
        </Link>

        {!loadingAuth && signed && (
          <Link to="dashboard">
            <FaCircleUser size={24} color="#585858" />
          </Link>
        )}

        {!loadingAuth && !signed && (
          <Link to="signIn">
            <FaSignOutAlt size={24} color="#585858" />
          </Link>
        )}
      </header>
    </div>
  );
}
