import {
  ActionIcon,
  Box,
  Burger,
  Button,
  Collapse,
  Group,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMoon, IconPlant, IconSun } from "@tabler/icons-react";
import { Link } from "react-router";

export function PublicHeader() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const isDark = colorScheme === "dark";

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
        </Group>

        {/* Desktop Navigation */}
        <Group gap="sm" visibleFrom="sm">
          <ActionIcon
            variant="subtle"
            size="lg"
            onClick={toggleColorScheme}
            title="Alternar tema"
            style={{
              transition: "all 0.2s ease",
            }}
          >
            {isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
          </ActionIcon>

          <Button
            component={Link}
            to="/login"
            variant="subtle"
            size="md"
            style={{
              fontWeight: 500,
            }}
          >
            Entrar
          </Button>
          <Button
            component={Link}
            to="/register"
            variant="gradient"
            gradient={{
              from: theme.colors.green[6],
              to: theme.colors.green[4],
              deg: 45,
            }}
            size="md"
            style={{
              fontWeight: 600,
              boxShadow: `0 2px 8px ${theme.colors.green[5]}30`,
            }}
          >
            Criar Conta
          </Button>
        </Group>

        {/* Mobile Menu */}
        <Group gap="xs" hiddenFrom="sm">
          <ActionIcon
            variant="subtle"
            size="lg"
            onClick={toggleColorScheme}
            title="Alternar tema"
          >
            {isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
          </ActionIcon>

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
          style={{
            borderTop: `1px solid ${
              isDark ? theme.colors.dark[4] : theme.colors.gray[2]
            }`,
          }}
        >
          <Stack gap="sm">
            <Button
              component={Link}
              to="/login"
              variant="subtle"
              fullWidth
              onClick={toggle}
            >
              Entrar
            </Button>
            <Button
              component={Link}
              to="/register"
              variant="gradient"
              gradient={{
                from: theme.colors.green[6],
                to: theme.colors.green[4],
                deg: 45,
              }}
              fullWidth
              onClick={toggle}
            >
              Criar Conta
            </Button>
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
}
