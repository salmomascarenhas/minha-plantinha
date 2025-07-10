import { Button, Group, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { ThemeToggleButton } from "./ThemeToggleButton";

export function DashboardHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Group h="100%" px="md" justify="space-between">
      <Text fw={700} size="lg">
        🌱 Minha Plantinha
      </Text>
      <Group>
        <Text size="sm">Olá, {user?.name || "Usuário"}!</Text>
        <ThemeToggleButton />
        <Button variant="default" onClick={handleLogout}>
          Sair
        </Button>
      </Group>
    </Group>
  );
}
