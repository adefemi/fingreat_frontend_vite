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
import React, { useEffect, useRef, useState } from "react";
import useAxios from "./useAxios";
import { accountUrl } from "@/utils/network";
import { AccountType, VerifyAccountType } from "@/utils/types";
import LoadingSpinner from "../common/loadingSpinner";
import { formatAccountFormat, getAccountSelect } from "@/utils/helpers";
import { useStore } from "../hoc/StoreProvider";
import { toast } from "sonner";
import SendMoneyConfirmation from "../common/sendMoneyConfirmation";
import { ChevronLeft } from "lucide-react";

const useSendMoney = () => {
  const {
    state: { activeUser },
  } = useStore();
  const [data, setData] = useState<{
    accountNumber: string;
    amount: string;
  }>({
    accountNumber: "",
    amount: "",
  });
  const [account, setAccount] = useState<AccountType | null>(null);
  const [stage, setStage] = useState(0);
  const [modalState, setModalState] = useState(false);
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
      if (res.user_id === activeUser?.id) {
        return toast.error("You can't send money to yourself");
      }

      if (res.currency !== account?.currency) {
        return toast.error("Currency mismatch");
      }

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

  const closeModal = () => {
    setModalState(false);
    setData({
      accountNumber: "",
      amount: "",
    });
    setAccount(null);
    setVerifiedAccount(null);
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStage(1);
  };

  const confirmPayment = async (onComplete: () => void) => {
    const payload = {
      to_account_number: data.accountNumber,
      amount: parseFloat(data.amount),
      from_account_id: account?.id,
    };

    const res = await axiosHandler(accountUrl.transfer, "post", payload, true);

    if (res) {
      toast.success("Money sent successfully");
      setStage(0);
      onComplete();
      closeModal();
    }
  };

  const getSendMoney = (accounts: AccountType[], onComplete: () => void) => {
    return (
      <Dialog open={modalState}>
        <DialogTrigger onClick={() => setModalState(true)}>
          <Button>Send Money</Button>
        </DialogTrigger>
        <DialogContent customClose={closeModal}>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              {stage === 1 && (
                <div className="mr-3" onClick={() => setStage(0)}>
                  <ChevronLeft />
                </div>
              )}
              {stage === 0 ? "Send Money" : "Confirm Payment"}
            </DialogTitle>
            <DialogDescription>Sending money made easy</DialogDescription>
          </DialogHeader>

          {stage === 0 && (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <LabelSelect
                labelProps={{ children: "From Account" }}
                id="from_account_id"
                selectProps={{
                  placeholder: "Select Account",
                  name: "from_account_id",
                  required: true,
                  value: account
                    ? formatAccountFormat(account?.currency, account?.balance)
                    : "",
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
              {loading && !verifiedAccount ? (
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
              <Button
                className="mt-7 w-full"
                disabled={loading || !data.amount}
                loading={loading}
              >
                Send
              </Button>
            </form>
          )}

          {stage === 1 && (
            <SendMoneyConfirmation
              toAccount={verifiedAccount as VerifyAccountType}
              fromAccount={account as AccountType}
              amount={data.amount}
              onComplete={() => confirmPayment(onComplete)}
            />
          )}
        </DialogContent>
      </Dialog>
    );
  };

  return {
    getSendMoney,
  };
};

export default useSendMoney;
