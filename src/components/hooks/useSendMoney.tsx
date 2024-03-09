import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { LabelInput } from "../common/labelInput";
import { useEffect, useRef, useState } from "react";
import useAxios from "./useAxios";
import { accountUrl } from "@/utils/network";
import { VerifyAccountType } from "@/utils/types";
import LoadingSpinner from "../common/loadingSpinner";

const useSendMoney = () => {
  const [data, setData] = useState<{
    accountNumber: string;
    amount: string;
  }>({
    accountNumber: "",
    amount: "",
  });
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

  const getSendMoney = () => {
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

          <form>
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
                className="mt-5"
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
