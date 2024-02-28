import useAxios from "@/components/hooks/useAxios";
import { Card } from "@/components/ui/card";
import useAddAccount from "@/pages/Account/hooks/useAddAccount";
import { accountUrl } from "@/utils/network";
import { useEffect, useState } from "react";
import useAddMoney from "./hooks/useAddMoney";
import { formatCurrency } from "@/utils/helpers";

export interface AccountType {
  id: string;
  balance: number;
  amount?: string;
  created_at: string;
  currency: string;
  account_number: {
    String: string;
  };
}

const Accounts = () => {
  const [state, setState] = useState({
    sendMoneyDialog: false,
    addMoneyDialog: false,
  });
  const { getAddAccount } = useAddAccount();
  const {getAddMoney} = useAddMoney()
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
          <AccountCard
            {...account}
            key={index}
            amount={account.balance.toFixed(2).toString()}
          />
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
            {/* <Button
              className="bg-[#0941AE] hover:bg-blue-900"
              onClick={sendMoney}
            >
              Send Money
            </Button> */}
          </div>
        )}
      </div>
    </div>
  );
};

const AccountCard = (props: AccountType) => (
  <Card className="rounded-md p-5 border-slate-300">
    <h2 className="text-2xl font-extralight">{props.currency}<br/>
      <small className="text-base font-semibold">{props.account_number.String}</small>
    </h2>
    <div className="mt-8" aria-label="hidden" />
    <div className="text-sm">Balance</div>
    <h1 className="font-bold text-xl">{formatCurrency(props.amount || "0")}</h1>
  </Card>
);

export default Accounts;
