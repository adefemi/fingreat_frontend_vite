import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { LabelInput, LabelSelect } from "../common/labelInput";
import { useEffect, useRef, useState } from "react";
import useAxios from "./useAxios";
import { accountUrl } from "@/utils/network";
import { AccountType, VerifyAccountType } from "@/utils/types";
import LoadingSpinner from "../common/loadingSpinner";
import { formatAccountFormat, getAccountSelect } from "@/utils/helpers";

const useSendMoney = () => {
  const [data, setData] = useState<{
    accountNumber: string;
    amount: string;
  }>({
    accountNumber: "",
    amount: "",
  });
  const [account, setAccount] = useState<AccountType | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [verifiedAccount, setVerifiedAccount] =
    useState<VerifyAccountType | null>(null);
  const { axiosHandler, loading } = useAxios();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const verifyAccountNumber = async () => {
    const res = await axiosHandler<VerifyAccountType>(
      accountUrl.verifyAccountNumber,
      "post",
      {
        account_number: data.accountNumber,
      },
      true
    );

    if (res) {
      setVerifiedAccount(res);
    }
  };

  const trackAccountNumberChanges = () => {
    if (data.accountNumber.length === 10) {
      inputRef.current?.blur();
      setVerifiedAccount(null);
      verifyAccountNumber();
    }
  };

  useEffect(() => {
    trackAccountNumberChanges();
  }, [data.accountNumber]);

  const onAccountSelect = (accounts: AccountType[], key: string) => {
    const account = accounts.find(
      (account) =>
        formatAccountFormat(account.currency, account.balance) === key
    );
    if (account) setAccount(account);
  };

  const getSendMoney = (accounts: AccountType[], onComplete: () => void) => {
    return (
      <Dialog>
        <DialogTrigger>
          <Button>Send Money</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Money</DialogTitle>
            <DialogDescription>Sending money made easy</DialogDescription>
          </DialogHeader>

          <form className="space-y-5">
            <LabelSelect
              labelProps={{ children: "From Account" }}
              id="from_account_id"
              selectProps={{
                placeholder: "Select Account",
                name: "from_account_id",
                required: true,
                items: getAccountSelect(accounts, true),
                onValueChange: (value) => onAccountSelect(accounts, value),
              }}
            />
            {account && (
              <LabelInput
                labelProps={{ children: "Account Number" }}
                inputProps={{
                  name: "accountNumber",
                  value: data.accountNumber,
                  onChange: handleChange,
                  ref: inputRef,
                }}
                id="account_number"
              />
            )}
            {loading ? (
              <LoadingSpinner className="text-blue-500 mt-2" />
            ) : (
              verifiedAccount && (
                <p className="mt-2 text-blue-500 text-sm">
                  Account Name: {verifiedAccount.email}
                </p>
              )
            )}

            {verifiedAccount && (
              <LabelInput
                labelProps={{ children: "Amount" }}
                inputProps={{
                  name: "amount",
                  value: data.amount,
                  placeholder: "Enter amount",
                  onChange: handleChange,
                }}
                id="amount"
              />
            )}
            <Button className="mt-7 w-full">Send</Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

  return {
    getSendMoney,
  };
};

export default useSendMoney;
