import { Center, Loader } from "@mantine/core";
import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { Layout } from "./Layout";

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader size="lg" />
      </Center>
    );
  }

  return isAuthenticated ? <Layout /> : <Navigate to="/login" replace />;
}
