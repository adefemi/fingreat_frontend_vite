import { AccountType, TransactionType } from "@/utils/types";
import TransactionTable from "../../components/common/myTable";
import { useEffect, useState } from "react";
import useAxios from "@/components/hooks/useAxios";
import { accountUrl } from "@/utils/network";
import LoadingSpinner from "@/components/common/loadingSpinner";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/utils/helpers";

type props = {
  account: AccountType;
};

const Transaction = ({ account }: props) => {
  const [loading, setLoading] = useState(true);
  const { axiosHandler } = useAxios();
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  const getTransactions = async () => {
    const res = await axiosHandler<TransactionType[]>(
      accountUrl.transactions,
      "POST",
      { account_id: account.id },
      true
    );
    setLoading(false);
    if (res) {
      setTransactions(res);
    }
  };

  useEffect(() => {
    setLoading(true);
    getTransactions();
  }, [account]);

  const getTransactionList = () => {
    const result = [];
    for (const transaction of transactions) {
      const _type =
        transaction.amount > 0 ? (
          <Badge className="bg-green-500">CR</Badge>
        ) : (
          <Badge className="bg-red-500">DR</Badge>
        );
      result.push([
        _type,
        formatCurrency(transaction.amount.toString()),
        transaction.created_at,
      ]);
    }
    return result;
  };

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-light mb-5">Transaction History</h1>
      {loading ? (
        <LoadingSpinner className="text-orange-500" />
      ) : (
        <TransactionTable
          body={getTransactionList()}
          heading={["Type", "Amount", "Created_at"]}
        />
      )}
    </div>
  );
};

export default Transaction;
