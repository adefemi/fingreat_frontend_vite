import { useStore } from "@/components/hoc/StoreProvider";
import useAxios from "@/components/hooks/useAxios";
import { accountUrl } from "@/utils/network";
import { FormEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { AccountType } from "./Accounts";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LabelInput, LabelSelect } from "@/components/common/labelInput";
import { Button } from "@/components/ui/button";

interface SendMoneyType {
  completeOperation: () => void;
  accounts: AccountType[];
  visible: boolean;
}

const SendMoney = ({ completeOperation, accounts, visible }: SendMoneyType) => {
  const [loading, setLoading] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const { dispatch } = useStore();
  const { axiosHandler } = useAxios();
  const [dialogState, setDialogState] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    let arg = {
      from_account_id: parseInt(form.current?.from_account_id.value),
      to_account_id: parseInt(form.current?.to_account_id.value),
      amount: parseFloat(form.current?.amount.value),
    };

    const res = await axiosHandler(accountUrl.transfer, "POST", arg, true);

    setLoading(false);

    if (res) {
      toast.success("Transfer successful");
      completeOperation();
    }
  };

  const fromAccountOptions: any = () => {
    accounts.map((account, index) => (
      <option key={index} value={account.id}>{`${
        account.currency
      } - ${account.balance.toFixed(2)}`}</option>
    ));
  };

  return (
    <Dialog open={visible}>
      <DialogContent className="sm:max-w-[425px]" closeIcon={true}>
        <DialogHeader>
          <DialogTitle>Send Money</DialogTitle>
        </DialogHeader>
        <form ref={form} onSubmit={onSubmit}>
          <div className="modalBody userUpdate">
            <div className="w-full mb-10">
              <LabelSelect
                labelProps={{ children: "From Account" }}
                id="from_account_id"
                className="mb-10"
                selectProps={{
                  placeholder: "Select Account",
                  name: "from_account_id",
                  required: true,
                  items: accounts,
                }}
              />
            </div>
            <div className="w-full mb-10">
              <LabelInput
                labelProps={{ children: "To Account" }}
                inputProps={{
                  name: "to_account_id",
                  required: true,
                  type: "number",
                  placeholder: "Specify the account to send to",
                }}
                id={"to_account_id"}
              />
            </div>

            <div className="w-full mb-10">
              <LabelInput
                labelProps={{ children: "Amount" }}
                inputProps={{
                  name: "amount",
                  required: true,
                  type: "number",
                  placeholder: "Specify the amount to send",
                }}
                id={"amount"}
              />
            </div>
          </div>
          <DialogFooter className="flex items-center justify-center p-4">
            <Button type="submit" disabled={loading}>
              Submit{loading && "..."}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SendMoney;
