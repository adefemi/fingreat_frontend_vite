import { auth_token } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";

export const useLogout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem(auth_token);
    navigate("/login");
  };

  const getLogoutButton = () => {
    return <Button
    className="rounded-full"
    size="icon"
    variant="ghost"
    onClick={handleLogout}
  >
    <LogOutIcon className="w-4 h-4" />
    <span className="sr-only">Logout</span>
  </Button>
  }

  return {
    handleLogout,
    getLogoutButton
  };
};
