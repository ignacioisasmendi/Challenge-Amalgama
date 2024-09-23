import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/AuthService";
import { toast } from "react-toastify";
import React from "react";

type ContextType = {
  token: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const AuthContext = createContext<ContextType>({} as ContextType);

export const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
    setIsReady(true);
    navigate("/home");
  }, []);

  
  const login = async (email: string, password: string) => {
    await loginService(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.token);
          setToken(res.token);
          toast.success("Login Success!");
          navigate("/home");
        }
      })
      .catch((e) => toast.warning("Server error occured"));
  };

  const isLoggedIn = () => {
    return !!token;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ login, token, logout, isLoggedIn }}
    >
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);