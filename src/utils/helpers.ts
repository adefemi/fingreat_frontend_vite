import { AccountType } from "./types";

export function formatCurrency(input: string): string {
    return  `${parseInt(input).toLocaleString("en-US")}.00`
  }

export function formatAccountFormat(currency: string, balance: number): string {
  return `${currency} - ${formatCurrency(balance.toString())}`
}

export const getAccountSelect = (accounts: AccountType[], moneyInfo=false) => {
  return accounts.map((account) => {
    const _temp = moneyInfo ? formatAccountFormat(account.currency, account.balance) : account.currency;
    return (
      {
        key: _temp,
        value: _temp,
      }
    )
  });
};