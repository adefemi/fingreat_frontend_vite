
import Transaction from "@/pages/Account/Transactions";
import useGoBack from "@/components/hooks/useGoBack";
import MainLayout from "@/components/layout/mainLayout";
import Accounts from "./Accounts";

const Accounting = () => {
    const {getGoBackButton} = useGoBack()
    return (
        <MainLayout>
            <div>
                {getGoBackButton()}
            </div>

            <Accounts />
            <Transaction />
        </MainLayout>
    );
};

export default Accounting;
