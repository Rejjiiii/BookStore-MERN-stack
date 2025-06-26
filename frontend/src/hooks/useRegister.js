import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";
import { useSnackbar } from "notistack";

export const useRegister = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();
    const { enqueueSnackbar } = useSnackbar();

    const register = async (username, email, password) => {
        setIsLoading(true);
        setError(null);

        const data = { username, email, password };

        axios
            .post("http://localhost:5555/auth/register", data)
            .then((response) => {
                const userData = response.data;
                // Save the user data (including token) in localStorage
                localStorage.setItem("user", JSON.stringify(userData));

                // Update the auth context
                dispatch({ type: "LOGIN", payload: userData });

                // Show success notification
                enqueueSnackbar("Registration successful!", { variant: "success" });
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                let errorMessage = "Registration failed";
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.message
                ) {
                    errorMessage = error.response.data.message;
                }
                enqueueSnackbar(errorMessage, { variant: "error" });
                setError(errorMessage);
                console.error(error);
            });
    };

    return { register, isLoading, error };
};
