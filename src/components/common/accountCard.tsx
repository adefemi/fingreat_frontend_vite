import { AccountType } from "@/utils/types";
import { Card } from "../ui/card";
import { formatCurrency } from "@/utils/helpers";

type props = AccountType & {
  isDefault?: boolean;
  onClick?: () => void;
}

const AccountCard = (props: props) => (
    <Card className="rounded-md p-5 border-slate-300 relative cursor-pointer transition-all duration-500 hover:scale-105" onClick={props.onClick}>
      <h2 className="text-2xl font-extralight">{props.currency}<br/>
        <small className="text-base font-semibold">{props.account_number}</small>
      </h2>
      <div className="mt-8" aria-label="hidden" />
      <div className="text-sm">Balance</div>
      <h1 className="font-bold text-xl">{formatCurrency(props.balance.toString())}</h1>
      {props.isDefault && (
        <div className="absolute top-0 right-0 -mt-2 -mr-2">
          <span className="bg-green-500 text-white px-2 py-1 rounded-full">
            Default
          </span>
        </div>
      )}
    </Card>
  );

  export default AccountCard;