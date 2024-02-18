import { FC, FormEvent, useRef } from "react";
import { Logo } from "../common/logo";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { LabelCheckbox, LabelInput } from "../common/labelInput";
import { Button } from "../ui/button";

interface AuthType {
  title?: string;
  buttonTitle?: string;
  showRemembered?: boolean;
  loading: boolean;
  accountInfoText?: {
    initialText: string;
    actionText: string;
    actionLink: string;
  };
  onSubmit: (
    e: FormEvent<HTMLFormElement>,
    formRef: React.RefObject<HTMLFormElement>
  ) => void;
}

const Auth: FC<AuthType> = ({
  title = "Log In",
  buttonTitle = "Login",
  showRemembered,
  accountInfoText,
  loading,
  onSubmit,
}) => {
  const form = useRef<HTMLFormElement>(null);
  return (
    <div className="grid grid-cols-2 h-dvh w-full">
      <div
        className="flex bg-cover bg-no-repeat bg-center items-center justify-center"
        style={{ backgroundImage: `url('/auth_bg.jpg')` }}
      >
        <div className="">
          <Logo />
          <h1 className="text-4xl font-extralight text-white mt-7">
            Say goodbye to financial stress with <br />
            the help of FinGreat
          </h1>
          <p className="mt-5 text-sm font-medium text-white/70">
            Take control of your finance with FinGreat the fastest and simplest
            way
          </p>
          <div className="flex space-x-[0.35rem] mt-7">
            <div className="w-[0.65rem] h-[0.65rem] rounded-full bg-white" />
            <div className="w-[0.65rem] h-[0.65rem] rounded-full bg-white" />
            <div className="w-10 h-[0.65rem] rounded-full bg-white" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="min-w-[400px]">
          <h1 className="text-4xl font-extralight mb-10">{title}</h1>
          <form ref={form} onSubmit={(e) => onSubmit(e, form)}>
            <LabelInput
              labelProps={{ children: "Email Address" }}
              className="mb-5"
              id="email"
              inputProps={{ type: "email", name: "email", required: true }}
            />
            <LabelInput
              labelProps={{ children: "Password" }}
              className="mb-5"
              id="password"
              inputProps={{
                type: "password",
                name: "password",
                required: true,
              }}
            />

            {showRemembered && (
              <div className="flex items-center justify-between mb-10">
                <LabelCheckbox
                  labelProps={{ children: "Remember me" }}
                  id="rememberMe"
                  className=""
                  checkboxProps={{
                    name: "rememberMe",
                  }}
                />
                <Link to="/" className="text-sm">Forgot Password</Link>
              </div>
            )}
            <Button
              type="submit"
              disabled={loading}
              className="text-sm"
              loading={loading}
            >
              {buttonTitle}
              <ArrowRight size={16} className="ml-5"/>
            </Button>
            <div className="text-sm mt-3">
              <span>
                {accountInfoText?.initialText || "Don't have an account?"}
              </span>
              &nbsp;
              <Link  to={accountInfoText?.actionLink || "/signup"}>
                {accountInfoText?.actionText || "Sign up"}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
