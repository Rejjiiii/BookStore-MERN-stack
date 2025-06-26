import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        const data = { email, password };

        axios
            .post("http://localhost:5555/auth/login", data)
            .then((response) => {
                const userData = response.data;
                // Save the user data (including token) in localStorage
                localStorage.setItem("user", JSON.stringify(userData));

                dispatch({ type: 'LOGIN', payload: userData });
                enqueueSnackbar('Login Successful!', { variant: 'success' });
                navigate('/');
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                let errorMessage = "Login Failed!";
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
            })
    };

    return { login, isLoading, error };
};