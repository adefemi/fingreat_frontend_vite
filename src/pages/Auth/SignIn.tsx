import Auth from "@/components/auth/AuthForm";
import { ActionTypes, useStore } from "@/components/hoc/StoreProvider";
import useAxios from "@/components/hooks/useAxios";
import { auth_token } from "@/utils/constants";
import { authUrl } from "@/utils/network";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";


interface LoginType {
    token: string
}

const Login = () => {
    const [loading, SetLoading] = useState(false);
    const {dispatch} = useStore()
    const { axiosHandler } = useAxios()
    const navigate = useNavigate()

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

        const response = await axiosHandler<LoginType>(authUrl.login, "post", arg)

        SetLoading(false);

        if (response) {
            localStorage.setItem(auth_token, response.token)
            dispatch({type: ActionTypes.UpdateUser, payload: null})
            navigate("/");
        }
    };

    return <Auth loading={loading} showRemembered onSubmit={onSubmit} />;
};

export default Login;
