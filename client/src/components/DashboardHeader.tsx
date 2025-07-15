import {
  Avatar,
  Badge,
  Box,
  Burger,
  Collapse,
  Divider,
  Group,
  Menu,
  Stack,
  Text,
  UnstyledButton,
  rem,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconChevronDown,
  IconLogout,
  IconPlant,
  IconSettings,
  IconUser,
} from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { ThemeToggleButton } from "./ThemeToggleButton";

export function DashboardHeader() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const isDark = colorScheme === "dark";
  const [opened, { toggle }] = useDisclosure(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box
      component="header"
      h="100%"
      px="md"
      style={{
        background: isDark
          ? `linear-gradient(135deg, ${theme.colors.dark[8]} 0%, ${theme.colors.dark[7]} 100%)`
          : `linear-gradient(135deg, ${theme.white} 0%, ${theme.colors.green[0]} 100%)`,
        borderBottom: `1px solid ${
          isDark ? theme.colors.dark[4] : theme.colors.gray[2]
        }`,
        backdropFilter: "blur(10px)",
        boxShadow: isDark
          ? `0 2px 8px ${theme.colors.dark[9]}20`
          : `0 2px 8px ${theme.colors.gray[3]}15`,
      }}
    >
      <Group justify="space-between" h="100%">
        {/* Logo melhorado */}
        <Group gap="xs">
          <Box
            style={{
              background: `linear-gradient(135deg, ${theme.colors.green[6]} 0%, ${theme.colors.green[4]} 100%)`,
              borderRadius: theme.radius.md,
              padding: "8px",
              boxShadow: `0 2px 8px ${theme.colors.green[5]}30`,
              position: "relative",
            }}
          >
            <IconPlant
              size={20}
              color={theme.white}
              style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))" }}
            />
          </Box>
          <Group gap={4} visibleFrom="sm">
            <Text
              fw={700}
              size="lg"
              variant="gradient"
              gradient={{
                from: theme.colors.green[7],
                to: theme.colors.green[5],
                deg: 45,
              }}
            >
              Minha Plantinha
            </Text>
            <Badge
              variant="light"
              color="green"
              size="xs"
              style={{
                background: isDark
                  ? `${theme.colors.green[9]}60`
                  : `${theme.colors.green[0]}80`,
                color: theme.colors.green[isDark ? 3 : 7],
                fontWeight: 600,
              }}
            >
              Dashboard
            </Badge>
          </Group>
        </Group>

        {/* Desktop Navigation */}
        <Group gap="sm" visibleFrom="sm">
          <ThemeToggleButton />

          <Menu shadow="xl" width={240} position="bottom-end">
            <Menu.Target>
              <UnstyledButton
                style={{
                  padding: "8px 12px",
                  borderRadius: theme.radius.md,
                  background: isDark
                    ? `${theme.colors.dark[6]}60`
                    : `${theme.white}80`,
                  border: `1px solid ${
                    isDark ? theme.colors.dark[4] : theme.colors.gray[2]
                  }`,
                  backdropFilter: "blur(10px)",
                  transition: "all 0.2s ease",
                  boxShadow: `0 2px 8px ${
                    isDark ? theme.colors.dark[9] : theme.colors.gray[3]
                  }10`,
                  "&:hover": {
                    background: isDark
                      ? `${theme.colors.dark[5]}80`
                      : `${theme.colors.gray[0]}90`,
                    transform: "translateY(-1px)",
                    boxShadow: `0 4px 12px ${
                      isDark ? theme.colors.dark[9] : theme.colors.gray[3]
                    }20`,
                  },
                }}
              >
                <Group gap="xs">
                  <Avatar
                    color="green"
                    radius="xl"
                    size="sm"
                    style={{
                      background: `linear-gradient(135deg, ${theme.colors.green[6]} 0%, ${theme.colors.green[4]} 100%)`,
                      boxShadow: `0 2px 8px ${theme.colors.green[5]}30`,
                    }}
                  >
                    {user?.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box style={{ flex: 1 }}>
                    <Text
                      size="sm"
                      fw={600}
                      c={isDark ? theme.colors.gray[1] : theme.colors.gray[8]}
                    >
                      {user?.name}
                    </Text>
                    <Text
                      size="xs"
                      c={isDark ? theme.colors.gray[5] : theme.colors.gray[6]}
                    >
                      Jardineiro
                    </Text>
                  </Box>
                  <IconChevronDown
                    style={{
                      width: rem(14),
                      height: rem(14),
                      color: isDark
                        ? theme.colors.gray[4]
                        : theme.colors.gray[6],
                    }}
                  />
                </Group>
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown
              style={{
                background: isDark
                  ? `${theme.colors.dark[7]}95`
                  : `${theme.white}95`,
                backdropFilter: "blur(20px)",
                border: `1px solid ${
                  isDark ? theme.colors.dark[4] : theme.colors.gray[2]
                }`,
                boxShadow: `0 8px 32px ${
                  isDark ? theme.colors.dark[9] : theme.colors.gray[4]
                }20`,
              }}
            >
              <Menu.Label style={{ fontSize: "12px", fontWeight: 600 }}>
                Minha Conta
              </Menu.Label>

              <Menu.Item
                leftSection={
                  <IconUser style={{ width: rem(16), height: rem(16) }} />
                }
                onClick={() => alert("Navegando para a página de Perfil...")}
                style={{
                  borderRadius: theme.radius.sm,
                  margin: "2px",
                }}
              >
                <Box>
                  <Text size="sm" fw={500}>
                    Meu Perfil
                  </Text>
                  <Text size="xs" c="dimmed">
                    Gerenciar informações pessoais
                  </Text>
                </Box>
              </Menu.Item>

              <Menu.Item
                leftSection={
                  <IconSettings style={{ width: rem(16), height: rem(16) }} />
                }
                onClick={() =>
                  alert("Navegando para a página de Configurações...")
                }
                style={{
                  borderRadius: theme.radius.sm,
                  margin: "2px",
                }}
              >
                <Box>
                  <Text size="sm" fw={500}>
                    Configurações
                  </Text>
                  <Text size="xs" c="dimmed">
                    Preferências e notificações
                  </Text>
                </Box>
              </Menu.Item>

              <Menu.Divider />

              <Menu.Item
                color="red"
                leftSection={
                  <IconLogout style={{ width: rem(16), height: rem(16) }} />
                }
                onClick={handleLogout}
                style={{
                  borderRadius: theme.radius.sm,
                  margin: "2px",
                }}
              >
                <Box>
                  <Text size="sm" fw={500}>
                    Sair da Conta
                  </Text>
                  <Text size="xs" c="dimmed">
                    Fazer logout do sistema
                  </Text>
                </Box>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>

        {/* Mobile Menu */}
        <Group gap="xs" hiddenFrom="sm">
          <ThemeToggleButton />

          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            color={isDark ? theme.colors.gray[4] : theme.colors.gray[6]}
          />
        </Group>
      </Group>

      {/* Mobile Navigation */}
      <Collapse in={opened}>
        <Box
          py="md"
          px="md"
          style={{
            borderTop: `1px solid ${
              isDark ? theme.colors.dark[4] : theme.colors.gray[2]
            }`,
            background: isDark ? theme.colors.dark[7] : theme.white,
            backdropFilter: "blur(10px)",
          }}
        >
          <Stack gap="sm">
            {/* User Info Mobile */}
            <Group gap="sm">
              <Avatar
                color="green"
                radius="xl"
                size="md"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.green[6]} 0%, ${theme.colors.green[4]} 100%)`,
                  boxShadow: `0 2px 8px ${theme.colors.green[5]}30`,
                }}
              >
                {user?.name.charAt(0).toUpperCase()}
              </Avatar>
              <Box style={{ flex: 1 }}>
                <Text
                  size="sm"
                  fw={600}
                  c={isDark ? theme.colors.gray[1] : theme.colors.gray[8]}
                >
                  {user?.name}
                </Text>
                <Text
                  size="xs"
                  c={isDark ? theme.colors.gray[5] : theme.colors.gray[6]}
                >
                  Jardineiro
                </Text>
              </Box>
            </Group>

            <Divider />

            {/* Mobile Menu Items */}
            <UnstyledButton
              onClick={() => {
                alert("Navegando para a página de Perfil...");
                toggle();
              }}
              style={{
                padding: "12px",
                borderRadius: theme.radius.md,
                background: isDark
                  ? `${theme.colors.dark[6]}40`
                  : `${theme.colors.gray[0]}60`,
                border: `1px solid ${
                  isDark ? theme.colors.dark[4] : theme.colors.gray[2]
                }`,
                width: "100%",
              }}
            >
              <Group gap="sm">
                <IconUser style={{ width: rem(18), height: rem(18) }} />
                <Box style={{ flex: 1, textAlign: "left" }}>
                  <Text size="sm" fw={500}>
                    Meu Perfil
                  </Text>
                  <Text size="xs" c="dimmed">
                    Gerenciar informações pessoais
                  </Text>
                </Box>
              </Group>
            </UnstyledButton>

            <UnstyledButton
              onClick={() => {
                alert("Navegando para a página de Configurações...");
                toggle();
              }}
              style={{
                padding: "12px",
                borderRadius: theme.radius.md,
                background: isDark
                  ? `${theme.colors.dark[6]}40`
                  : `${theme.colors.gray[0]}60`,
                border: `1px solid ${
                  isDark ? theme.colors.dark[4] : theme.colors.gray[2]
                }`,
                width: "100%",
              }}
            >
              <Group gap="sm">
                <IconSettings style={{ width: rem(18), height: rem(18) }} />
                <Box style={{ flex: 1, textAlign: "left" }}>
                  <Text size="sm" fw={500}>
                    Configurações
                  </Text>
                  <Text size="xs" c="dimmed">
                    Preferências e notificações
                  </Text>
                </Box>
              </Group>
            </UnstyledButton>

            <UnstyledButton
              onClick={() => {
                handleLogout();
                toggle();
              }}
              style={{
                padding: "12px",
                borderRadius: theme.radius.md,
                background: isDark
                  ? `${theme.colors.red[9]}20`
                  : `${theme.colors.red[0]}60`,
                border: `1px solid ${
                  isDark ? theme.colors.red[8] : theme.colors.red[2]
                }`,
                width: "100%",
              }}
            >
              <Group gap="sm">
                <IconLogout
                  style={{
                    width: rem(18),
                    height: rem(18),
                    color: theme.colors.red[isDark ? 4 : 6],
                  }}
                />
                <Box style={{ flex: 1, textAlign: "left" }}>
                  <Text size="sm" fw={500} c={theme.colors.red[isDark ? 4 : 6]}>
                    Sair da Conta
                  </Text>
                  <Text size="xs" c="dimmed">
                    Fazer logout do sistema
                  </Text>
                </Box>
              </Group>
            </UnstyledButton>
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
}
