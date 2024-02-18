import ProcessCard from "@/components/common/ProcessCard";
import { useStore } from "@/components/hoc/StoreProvider";
import useUpdateUser from "@/components/hooks/useUpdateUser";
import MainLayout from "@/components/layout/mainLayout";
import { Landmark } from "lucide-react";
import { useEffect } from "react";

const Home = () => {
  const { getUpdateUser, setDialogState } = useUpdateUser();
  const {
    state: { activeUser },
  } = useStore();
  useEffect(() => {
    if (!activeUser?.username) {
      setDialogState(true);
    }
  }, []);
  return (
    <MainLayout>
      <main>
        <h1 className="text-4xl font-extralight mt-7">
          Welcome, <span className="font-normal capitalize">{activeUser?.username || "user"}</span>
        </h1>
        <div className="mt-10 grid grid-cols-3 gap-2">
          <ProcessCard
            icon={<Landmark className="text-amber-600" size={30} />}
            title="Accounting"
            linkTo="/accounting"
            description="Manager account, send and receive money"
          />
        </div>
        {getUpdateUser()}
      </main>
    </MainLayout>
  );
};

export default Home;
