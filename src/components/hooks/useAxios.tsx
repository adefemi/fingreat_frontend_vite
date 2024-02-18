import axios from "axios";
import { useLogout } from "./useLogout";
import { auth_token, session_active } from "@/utils/constants";
import { toast } from "sonner";
import { useState } from "react";

export default function useAxios() {
  const [loading, setLoading] = useState(false);
  const { handleLogout: logout } = useLogout();
  async function axiosHandler<T, D = unknown>(
    url: string,
    method: string,
    data?: D,
    isAuthorized?: boolean
  ): Promise<T | null> {
    const token = localStorage.getItem(auth_token);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const config = {
      headers: isAuthorized ? headers : {},
    };
    setLoading(true);
    const result = await axios<T>({
      method: method,
      url: url,
      data: data,
      ...config,
    }).catch((err) => {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 401) {
          if (!localStorage.getItem(session_active)) {
            localStorage.setItem(session_active, "true");
            // Redirect to sign-in page
            toast.error("Session expired. Please sign in again.");
            logout();
          }
        } else {
          const message =
            err.response.data.error ||
            "An error occurred while processing your request.";
          toast.error(`Error: ${message}`);
        }
      } else {
        // Handle non-Axios errors
        toast.error("An unexpected error occurred.");
      }
    });

    setLoading(false);

    if (!result) {
      return null;
    }

    return result.data || (true as T);
  }

  return {
    axiosHandler, loading
  };
}
