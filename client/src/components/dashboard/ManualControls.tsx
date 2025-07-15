import {
  Alert,
  Badge,
  Box,
  Group,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconBolt,
  IconCheck,
  IconClock,
  IconDroplet,
  IconSettings,
  IconUmbrella,
} from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import api from "../../services/apiService";

interface ManualControlsProps {
  plantId: string;
}

type CommandBody = {
  action: "WATER_PUMP" | "TOGGLE_COVER";
  duration?: number;
};

const animationStyles = {
  buttonPulse: {
    animation: "buttonPulse 2s ease-in-out infinite",
  },
  iconFloat: {
    animation: "iconFloat 3s ease-in-out infinite",
  },
  successGlow: {
    animation: "successGlow 1s ease-out",
  },
  "@keyframes buttonPulse": {
    "0%, 100%": { transform: "scale(1)" },
    "50%": { transform: "scale(1.02)" },
  },
  "@keyframes iconFloat": {
    "0%, 100%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-2px)" },
  },
  "@keyframes successGlow": {
    "0%": { boxShadow: "0 0 5px rgba(64, 192, 87, 0.4)" },
    "50%": { boxShadow: "0 0 20px rgba(64, 192, 87, 0.8)" },
    "100%": { boxShadow: "0 0 5px rgba(64, 192, 87, 0.4)" },
  },
};

function getCommandStatus(action: string, isLoading: boolean) {
  if (action === "WATER_PUMP") {
    return {
      icon: isLoading ? IconClock : IconDroplet,
      text: isLoading ? "Regando..." : "Regar Agora",
      description: isLoading
        ? "Bomba ativada por 5 segundos"
        : "Ativar bomba d'água por 5 segundos",
      color: "blue",
      variant: "filled" as const,
    };
  }

  return {
    icon: isLoading ? IconClock : IconUmbrella,
    text: isLoading ? "Acionando..." : "Acionar Lona",
    description: isLoading
      ? "Movimentando cobertura"
      : "Abrir/fechar cobertura automática",
    color: "gray",
    variant: "light" as const,
  };
}

export function ManualControls({ plantId }: ManualControlsProps) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const queryClient = useQueryClient();
  const [lastCommand, setLastCommand] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const isDark = colorScheme === "dark";
  const primaryColor = theme.colors.myGreen[isDark ? 4 : 6];
  const successColor = theme.colors.myGreen[isDark ? 3 : 7];

  const sendCommandMutation = useMutation({
    mutationFn: (command: CommandBody) =>
      api.post(`/plants/${plantId}/command`, command),
    onSuccess: async (_, variables) => {
      const successMessage =
        variables.action === "WATER_PUMP"
          ? "Comando para regar enviado!"
          : "Comando da lona enviado!";

      notifications.show({
        title: "Comando Executado! 🎉",
        message: successMessage,
        color: "green",
        icon: <IconCheck size={18} />,
        autoClose: 4000,
      });

      setLastCommand(variables.action);
      setShowSuccess(true);

      setTimeout(() => setShowSuccess(false), 2000);

      await queryClient.invalidateQueries({ queryKey: ["gamificationStatus"] });
      await queryClient.invalidateQueries({
        queryKey: ["plantHistory", plantId],
      });
    },
    onError: (error) => {
      notifications.show({
        title: "Erro no Comando ⚠️",
        message: error.message,
        color: "red",
        autoClose: 5000,
      });
    },
  });

  const waterStatus = getCommandStatus(
    "WATER_PUMP",
    sendCommandMutation.isPending &&
      sendCommandMutation.variables?.action === "WATER_PUMP"
  );

  const coverStatus = getCommandStatus(
    "TOGGLE_COVER",
    sendCommandMutation.isPending &&
      sendCommandMutation.variables?.action === "TOGGLE_COVER"
  );

  const WaterIcon = waterStatus.icon;
  const CoverIcon = coverStatus.icon;

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  return (
    <Paper
      p="lg"
      radius="md"
      style={{
        background: isDark
          ? `linear-gradient(135deg, ${theme.colors.dark[8]} 0%, ${theme.colors.dark[7]} 100%)`
          : `linear-gradient(135deg, ${theme.white} 0%, ${theme.colors.gray[0]} 100%)`,
        border: `1px solid ${
          isDark ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,
        boxShadow: isDark
          ? `0 8px 32px ${theme.colors.dark[9]}40`
          : `0 8px 32px ${theme.colors.gray[4]}40`,
        position: "relative",
        overflow: "hidden",
        ...animationStyles,
        ...(showSuccess ? animationStyles.successGlow : {}),
      }}
    >
      {/* Efeito de brilho de fundo */}
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 30% 80%, ${primaryColor}15 0%, transparent 50%)`,
          pointerEvents: "none",
        }}
      />

      <Stack gap="md" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <Group justify="space-between" align="center">
          <Group gap="sm">
            <ThemeIcon
              size="xl"
              radius="xl"
              variant="gradient"
              gradient={{
                from: primaryColor,
                to: successColor,
                deg: 45,
              }}
              style={animationStyles.iconFloat}
            >
              <IconSettings size={24} />
            </ThemeIcon>
            <Box>
              <Title order={3} c={isDark ? theme.white : theme.black}>
                Controles Manuais
              </Title>
              <Text
                size="sm"
                c={isDark ? theme.colors.gray[4] : theme.colors.gray[6]}
              >
                Comandos diretos para o ESP32
              </Text>
            </Box>
          </Group>

          {lastCommand && (
            <Badge
              size="sm"
              color="green"
              variant="light"
              style={showSuccess ? animationStyles.buttonPulse : {}}
            >
              <Group gap={4}>
                <IconCheck size={12} />
                <Text size="xs">
                  Último: {lastCommand === "WATER_PUMP" ? "Rega" : "Lona"}
                </Text>
              </Group>
            </Badge>
          )}
        </Group>

        {/* Aviso informativo */}
        <Alert
          icon={<IconBolt size={16} />}
          color="yellow"
          variant="light"
          style={{
            background: isDark
              ? `linear-gradient(135deg, ${theme.colors.yellow[9]}20 0%, ${theme.colors.yellow[8]}10 100%)`
              : `linear-gradient(135deg, ${theme.colors.yellow[1]} 0%, ${theme.colors.yellow[0]} 100%)`,
            border: `1px solid ${theme.colors.yellow[isDark ? 7 : 3]}`,
          }}
        >
          <Text size="sm">
            Use estes controles apenas quando necessário. O sistema automático
            cuida da sua planta! 🌱
          </Text>
        </Alert>

        {/* Botões de controle */}
        <Group grow>
          <Paper
            p="md"
            radius="md"
            style={{
              background: isDark
                ? `linear-gradient(135deg, ${theme.colors.dark[6]} 0%, ${theme.colors.dark[5]} 100%)`
                : `linear-gradient(135deg, ${theme.colors.blue[0]} 0%, ${theme.white} 100%)`,
              border: `1px solid ${
                isDark ? theme.colors.dark[4] : theme.colors.blue[2]
              }`,
              cursor: sendCommandMutation.isPending ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              ...(sendCommandMutation.isPending &&
              sendCommandMutation.variables?.action === "WATER_PUMP"
                ? animationStyles.buttonPulse
                : {}),
            }}
            onClick={() => {
              if (!sendCommandMutation.isPending) {
                sendCommandMutation.mutate({
                  action: "WATER_PUMP",
                  duration: 5,
                });
              }
            }}
            onMouseEnter={(e) => {
              if (!sendCommandMutation.isPending) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = isDark
                  ? `0 8px 25px ${theme.colors.blue[9]}40`
                  : `0 8px 25px ${theme.colors.blue[4]}20`;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            <Stack align="center" gap="sm">
              <ThemeIcon
                size="xl"
                radius="xl"
                color="blue"
                variant="gradient"
                gradient={{
                  from: theme.colors.blue[4],
                  to: theme.colors.cyan[5],
                  deg: 45,
                }}
                style={{
                  ...(sendCommandMutation.isPending &&
                  sendCommandMutation.variables?.action === "WATER_PUMP"
                    ? animationStyles.iconFloat
                    : {}),
                }}
              >
                <WaterIcon size={24} />
              </ThemeIcon>

              <Box style={{ textAlign: "center" }}>
                <Text fw={600} size="md" c={isDark ? theme.white : theme.black}>
                  {waterStatus.text}
                </Text>
                <Text size="xs" c="dimmed" mt={2}>
                  {waterStatus.description}
                </Text>
              </Box>

              {sendCommandMutation.isPending &&
                sendCommandMutation.variables?.action === "WATER_PUMP" && (
                  <Badge size="sm" color="blue" variant="filled">
                    Executando...
                  </Badge>
                )}
            </Stack>
          </Paper>

          <Paper
            p="md"
            radius="md"
            style={{
              background: isDark
                ? `linear-gradient(135deg, ${theme.colors.dark[6]} 0%, ${theme.colors.dark[5]} 100%)`
                : `linear-gradient(135deg, ${theme.colors.gray[1]} 0%, ${theme.white} 100%)`,
              border: `1px solid ${
                isDark ? theme.colors.dark[4] : theme.colors.gray[3]
              }`,
              cursor: sendCommandMutation.isPending ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              ...(sendCommandMutation.isPending &&
              sendCommandMutation.variables?.action === "TOGGLE_COVER"
                ? animationStyles.buttonPulse
                : {}),
            }}
            onClick={() => {
              if (!sendCommandMutation.isPending) {
                sendCommandMutation.mutate({ action: "TOGGLE_COVER" });
              }
            }}
            onMouseEnter={(e) => {
              if (!sendCommandMutation.isPending) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = isDark
                  ? `0 8px 25px ${theme.colors.gray[9]}40`
                  : `0 8px 25px ${theme.colors.gray[4]}20`;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0px)";
              e.currentTarget.style.boxShadow = "";
            }}
          >
            <Stack align="center" gap="sm">
              <ThemeIcon
                size="xl"
                radius="xl"
                color="gray"
                variant="gradient"
                gradient={{
                  from: theme.colors.gray[4],
                  to: theme.colors.gray[6],
                  deg: 45,
                }}
                style={{
                  ...(sendCommandMutation.isPending &&
                  sendCommandMutation.variables?.action === "TOGGLE_COVER"
                    ? animationStyles.iconFloat
                    : {}),
                }}
              >
                <CoverIcon size={24} />
              </ThemeIcon>

              <Box style={{ textAlign: "center" }}>
                <Text fw={600} size="md" c={isDark ? theme.white : theme.black}>
                  {coverStatus.text}
                </Text>
                <Text size="xs" c="dimmed" mt={2}>
                  {coverStatus.description}
                </Text>
              </Box>

              {sendCommandMutation.isPending &&
                sendCommandMutation.variables?.action === "TOGGLE_COVER" && (
                  <Badge size="sm" color="gray" variant="filled">
                    Executando...
                  </Badge>
                )}
            </Stack>
          </Paper>
        </Group>

        {/* Rodapé informativo */}
        <Group justify="center" gap="xl">
          <Group gap="xs">
            <Box
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: theme.colors.blue[5],
              }}
            />
            <Text size="xs" c="dimmed">
              Rega: 5 segundos
            </Text>
          </Group>
          <Group gap="xs">
            <Box
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: theme.colors.gray[5],
              }}
            />
            <Text size="xs" c="dimmed">
              Lona: Toggle
            </Text>
          </Group>
        </Group>
      </Stack>
    </Paper>
  );
}
