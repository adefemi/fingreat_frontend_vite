import { FormEvent, useRef, useState } from "react";
import useAxios from "./useAxios";
import { ActionTypes, useStore } from "../hoc/StoreProvider";
import { UserType } from "@/utils/types";
import { userUrl } from "@/utils/network";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { LabelInput } from "../common/labelInput";

const useUpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [dialogState, setDialogState] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const { axiosHandler } = useAxios();
  const { dispatch } = useStore();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    let arg = {
      username: form.current?.username.value,
    };

    const res = await axiosHandler<UserType>(
      userUrl.updateUsername,
      "PATCH",
      arg,
      true
    );

    setLoading(false);

    if (res) {
      toast.success("Updated username");
      dispatch({ type: ActionTypes.UpdateUser, payload: res });
      setTimeout(() => {
        setDialogState(false);
      }, 500);
    }
  };

  const getUpdateUser = () => {
    return (
      <Dialog open={dialogState}>
        <DialogContent className="sm:max-w-[425px]" closeIcon={false}>
          <DialogHeader>
            <DialogTitle>Add Username</DialogTitle>
          </DialogHeader>
          <form ref={form} onSubmit={onSubmit}>
            <LabelInput
              labelProps={{ children: "Username" }}
              id="username"
              className="mb-10"
              inputProps={{ name: "username", required: true }}
            />
            <DialogFooter>
              <Button disabled={loading} loading={loading} type="submit">
                Update
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  };

  return { getUpdateUser, setDialogState };
};

export default useUpdateUser;
