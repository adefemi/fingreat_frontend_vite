import useAxios from "@/components/hooks/useAxios";
import useAddAccount from "@/pages/Account/hooks/useAddAccount";
import { accountUrl } from "@/utils/network";
import { useEffect, useState } from "react";
import useAddMoney from "./hooks/useAddMoney";
import { AccountType } from "@/utils/types";
import AccountCard from "@/components/common/accountCard";
import useSendMoney from "@/components/hooks/useSendMoney";

const Accounts = () => {
  const [state, setState] = useState({
    sendMoneyDialog: false,
    addMoneyDialog: false,
  });
  const { getAddAccount } = useAddAccount();
  const { getAddMoney } = useAddMoney();
  const { getSendMoney } = useSendMoney();
  const [accounts, setAccounts] = useState<AccountType[]>([]);
  const [loading, setLoading] = useState(true);
  const { axiosHandler } = useAxios();

  const getAccounts = async () => {
    setLoading(true);
    const res = await axiosHandler<AccountType[]>(
      accountUrl.list,
      "GET",
      null,
      true
    );
    setLoading(false);
    if (res) {
      setAccounts(res);
    }
  };

  useEffect(() => {
    getAccounts();
  }, []);

  const completeOperation = () => {
    setState({ ...state, sendMoneyDialog: false, addMoneyDialog: false });
    getAccounts();
  };

  const getContent = () => {
    if (loading) return "Loading accounts";
    if (accounts.length === 0) return "No accounts found";
    return (
      <div className="grid grid-cols-3 gap-5 my-5">
        {accounts.map((account, index) => (
          <AccountCard {...account} key={index} />
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mt-5">
        <h1 className="text-2xl font-light">Accounts</h1>
        {getAddAccount(completeOperation)}
      </div>

      {getContent()}

      <div className="">
        {accounts.length > 0 && (
          <div className="space-x-3">
            {getAddMoney(accounts, completeOperation)}
            {getSendMoney()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Accounts;
