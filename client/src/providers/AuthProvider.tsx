import { type ReactNode, useEffect, useState } from "react";
import { AuthContext, type User } from "../contexts/AuthContext";
import api from "../services/apiService";
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Começa carregando

  useEffect(() => {
    const loadUserFromToken = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        try {
          // AQUI ESTÁ A MUDANÇA: Buscamos o usuário na API
          const response = await api.get("/users/me");
          setUser(response.data);
        } catch (error) {
          console.error("Sessão inválida. Removendo token.", error);
          localStorage.removeItem("authToken");
          delete api.defaults.headers.common["Authorization"];
        }
      }
      setIsLoading(false); // Finaliza o carregamento
    };

    loadUserFromToken();
  }, []);

  const login = async (token: string) => {
    localStorage.setItem("authToken", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const response = await api.get("/users/me");
      setUser(response.data);
    } catch (error) {
      console.error("Falha ao buscar dados do usuário após o login.", error);
      localStorage.removeItem("authToken");
      delete api.defaults.headers.common["Authorization"];
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const value = { isAuthenticated: !!user, isLoading, user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
