import { formatCurrency } from "@/utils/helpers"
import { AccountType, VerifyAccountType } from "@/utils/types"
import { Button } from "../ui/button"

type props = {
    toAccount: VerifyAccountType
    fromAccount: AccountType
    amount: string
    onComplete: () => void
}

const ContextViewer = ({title, info}: {title: string, info: string}) => {
    return (
        <div className="grid grid-cols-2">
            <p className="text-sm text-slate-700">{title}</p>
            <h4>{info}</h4>
        </div>
    )
}

const SendMoneyConfirmation = ({toAccount, fromAccount, amount, onComplete}:props) => {
  return (
    <div className="space-y-3">
        <ContextViewer title="From" info={fromAccount.currency} />
        <ContextViewer title="To Account Number" info={toAccount.account_number} />
        <ContextViewer title="To Account Identifier" info={toAccount.email} />
        <ContextViewer title="To Account Currency" info={toAccount.currency} />
        <ContextViewer title="Amount" info={formatCurrency(amount)} />
        <Button onClick={onComplete} className="w-full">Confirm</Button>
    </div>
  )
}

export default SendMoneyConfirmation