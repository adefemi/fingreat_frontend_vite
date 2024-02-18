import { FC } from "react";
import { useLogout } from "../hooks/useLogout";
import { Link } from "react-router-dom";
import { Logo } from "../common/logo";


const MainLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="px-6 pb-6">
      <Header />
      <div className="max-w-screen-lg mx-auto">{children}</div>
    </main>
  );
};


const Header = () => {
    const { getLogoutButton } = useLogout();

  return (
    <header className="flex items-center justify-between h-16 px-6">
      <Link className="brand" to="/">
        <Logo className="text-black" />
      </Link>
      <div className="logout">{getLogoutButton()}</div>
    </header>
  );
};

export default MainLayout;