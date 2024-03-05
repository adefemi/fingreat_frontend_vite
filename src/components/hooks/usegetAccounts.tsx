import { useEffect, useState } from "react";
import useAxios from "./useAxios";
import { accountUrl } from "@/utils/network";
import { AccountType } from "@/utils/types";

const usegetAccounts = () => {

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

  return { getAccounts, accounts, loading };
};
export default usegetAccounts;
