import { AccountType } from "@/utils/types";
import { Card } from "../ui/card";
import { formatCurrency } from "@/utils/helpers";

const AccountCard = (props: AccountType) => (
    <Card className="rounded-md p-5 border-slate-300">
      <h2 className="text-2xl font-extralight">{props.currency}<br/>
        <small className="text-base font-semibold">{props.account_number}</small>
      </h2>
      <div className="mt-8" aria-label="hidden" />
      <div className="text-sm">Balance</div>
      <h1 className="font-bold text-xl">{formatCurrency(props.balance.toString())}</h1>
    </Card>
  );

  export default AccountCard;