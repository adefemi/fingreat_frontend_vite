import { auth_token, session_active } from "@/utils/constants";
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { PuffLoader } from "../common/spinners";
import { ActionTypes, useStore } from "./StoreProvider";
import useAxios from "../hooks/useAxios";
import { userUrl } from "@/utils/network";
import { UserType } from "@/utils/types";

const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const {state:{activeUser}, dispatch} = useStore()
  const {axiosHandler} = useAxios()
  const token = localStorage.getItem(auth_token);
  localStorage.removeItem(session_active);

  const getActiveUser = async () => {
    if(activeUser){
      setLoading(false)
      return
    }

    const res = await axiosHandler<UserType>(userUrl.me, "GET", null, true)
    if(res){
      dispatch({type:ActionTypes.UpdateUser, payload:res})
      setLoading(false)
    }
  }

  useEffect(() => {
    getActiveUser()
  }, [])

  if(loading){
    return <div className="w-full h-dvh flex items-center justify-center">
      <PuffLoader className="text-black" />
    </div>
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return (
    <Outlet />
  );
};

export default ProtectedRoute;
