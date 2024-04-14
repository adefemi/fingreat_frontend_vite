
import Transaction from "@/pages/Account/Transactions";
import useGoBack from "@/components/hooks/useGoBack";
import MainLayout from "@/components/layout/mainLayout";
import Accounts from "./Accounts";
import { useState } from "react";
import { AccountType } from "@/utils/types";

const Accounting = () => {
    const {getGoBackButton} = useGoBack()
    const [defaultAccount, setDefaultAccount] = useState<AccountType | null>(null);
    return (
        <MainLayout>
            <div>
                {getGoBackButton()}
            </div>

            <Accounts updateDefaultAccount={setDefaultAccount} />
            {defaultAccount && <Transaction account={defaultAccount} />}
        </MainLayout>
    );
};

export default Accounting;
