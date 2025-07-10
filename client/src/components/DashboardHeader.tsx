import { Avatar, Group, Menu, Text, UnstyledButton, rem } from "@mantine/core";
import {
  IconChevronDown,
  IconLogout,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
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

      {/* INÍCIO DA MUDANÇA: O grupo de usuário agora é um Menu */}
      <Group>
        <ThemeToggleButton />
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <UnstyledButton>
              <Group gap="xs">
                {/* O Avatar gera uma cor e as iniciais a partir do nome do usuário */}
                <Avatar color="green" radius="xl">
                  {user?.name.charAt(0).toUpperCase()}
                </Avatar>
                <Text size="sm" fw={500}>
                  {user?.name}
                </Text>
                <IconChevronDown style={{ width: rem(14), height: rem(14) }} />
              </Group>
            </UnstyledButton>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Conta</Menu.Label>
            <Menu.Item
              leftSection={
                <IconUser style={{ width: rem(14), height: rem(14) }} />
              }
              onClick={() => alert("Navegando para a página de Perfil...")}
            >
              Meu Perfil
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconSettings style={{ width: rem(14), height: rem(14) }} />
              }
              onClick={() =>
                alert("Navegando para a página de Configurações...")
              }
            >
              Configurações
            </Menu.Item>

            <Menu.Divider />

            <Menu.Item
              color="red"
              leftSection={
                <IconLogout style={{ width: rem(14), height: rem(14) }} />
              }
              onClick={handleLogout}
            >
              Sair
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
}
