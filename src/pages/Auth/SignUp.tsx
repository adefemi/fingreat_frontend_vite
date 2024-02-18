
import Auth from "@/components/auth/AuthForm";
import useAxios from "@/components/hooks/useAxios";
import { session_active } from "@/utils/constants";
import { authUrl } from "@/utils/network";
import { SignInResponseType } from "@/utils/types";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


const Register = () => {
    const [loading, SetLoading] = useState(false);
    const navigate = useNavigate()
    const { axiosHandler } = useAxios();

    const onSubmit = async (
        e: FormEvent<HTMLFormElement>,
        formRef: React.RefObject<HTMLFormElement>
    ) => {
        e.preventDefault();
        SetLoading(true);
        let arg = {
            email: formRef.current?.email.value,
            password: formRef.current?.password.value,
        };
        const response = await axiosHandler<SignInResponseType, typeof arg>(authUrl.register, "post", arg)
        SetLoading(false);

        if (response) {
            localStorage.setItem("auth_token", response.token);
            localStorage.removeItem(session_active)
            toast.success("User created successfully");
            navigate("/login");
        }
    };

    return (
        <Auth
            onSubmit={onSubmit}
            title="Sign Up"
            loading={loading}
            buttonTitle="Register"
            accountInfoText={{
                initialText: "Have an account?",
                actionLink: "/login",
                actionText: "login",
            }}
        />
    );
};

export default Register;
