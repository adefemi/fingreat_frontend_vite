import { usePaystackPayment } from "react-paystack";
import { useStore } from "../hoc/StoreProvider";
import { useEffect, useState } from "react";

const TestPublicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

export type Currency = "USD" | "NGN";

export interface MyPaystackProps {
  amount: number;
  currency: Currency;
  callBack: (res: any) => void;
}

const usePaystack = () => {
  const {
    state: { activeUser },
  } = useStore();
  const [data, setData] = useState<MyPaystackProps>({
    amount: 0,
    currency: "NGN",
    callBack: () => {},
  });

  const initTransaction = usePaystackPayment({
    email: activeUser?.email as string,
    amount: data.amount * 100,
    currency: data.currency,
    publicKey: TestPublicKey as string,
    label: "Fingreat Payment",
  });

  const getInitTransaction = (
    amount: number,
    currency: Currency,
    callBack: (res: any) => void
  ) => {
    setData({ amount, currency, callBack });
  };

  useEffect(() => {
    if (data.amount > 0) {
      initTransaction({
        onSuccess: (res) => {
            data.callBack(res);
        }
      });
    }
  }, [data]);

  return {
    getInitTransaction,
  };
};

export default usePaystack;
