import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

const useGoBack = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const getGoBackButton = () => {
    return (
      <Button
        className="rounded-full -ml-2"
        size="icon"
        variant="ghost"
        onClick={handleGoBack}
      >
        <ArrowLeft className="w-10" />
      </Button>
    );
  };

  return {
    getGoBackButton,
    handleGoBack,
  };
};

export default useGoBack;
