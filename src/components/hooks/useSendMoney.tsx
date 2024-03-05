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

const useSendMoney = () => {
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
              inputProps={{ name: "account_number" }}
              id="account_number"
            />
            <Button className="mt-7 w-full">Send</Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

  return {
    getSendMoney,
  }
};

export default useSendMoney;
