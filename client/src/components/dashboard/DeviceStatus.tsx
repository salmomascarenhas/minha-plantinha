import {
  Badge,
  Box,
  Group,
  Paper,
  Progress,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Transition,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import {
  IconDeviceDesktop,
  IconDropletFilled,
  IconSignal2g,
  IconSignal3g,
  IconSignal4g,
  IconSignal5g,
  IconWifiOff,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface DeviceStatusProps {
  wifiSignal?: number;
  waterLevel?: number;
}

const getWifiStatus = (dbi?: number) => {
  if (typeof dbi === "undefined")
    return {
      colorScheme: "gray",
      label: "Desconhecido",
      icon: <IconWifiOff size={24} />,
      status: "disconnected",
      description: "Sensor desconectado",
    };
  if (dbi > -60)
    return {
      colorScheme: "myGreen",
      label: "Excelente",
      icon: <IconSignal5g size={24} />,
      status: "excellent",
      description: "Sinal muito forte",
    };
  if (dbi > -75)
    return {
      colorScheme: "yellow",
      label: "Bom",
      icon: <IconSignal4g size={24} />,
      status: "good",
      description: "Sinal adequado",
    };
  if (dbi > -85)
    return {
      colorScheme: "orange",
      label: "Regular",
      icon: <IconSignal3g size={24} />,
      status: "fair",
      description: "Sinal fraco",
    };
  return {
    colorScheme: "myDanger",
    label: "Crítico",
    icon: <IconSignal2g size={24} />,
    status: "poor",
    description: "Sinal muito fraco",
  };
};

const getWaterStatus = (percentage: number) => {
  if (percentage > 75)
    return {
      colorScheme: "myGreen",
      label: "Alto",
      status: "high",
      description: "Reservatório cheio",
    };
  if (percentage > 50)
    return {
      colorScheme: "cyan",
      label: "Médio",
      status: "medium",
      description: "Nível adequado",
    };
  if (percentage > 25)
    return {
      colorScheme: "yellow",
      label: "Baixo",
      status: "low",
      description: "Precisa reabastecer",
    };
  return {
    colorScheme: "myDanger",
    label: "Crítico",
    status: "critical",
    description: "Reabastecer urgente!",
  };
};

export function DeviceStatus({ wifiSignal, waterLevel }: DeviceStatusProps) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const [isVisible, setIsVisible] = useState(false);

  const isDark = colorScheme === "dark";
  const wifi = getWifiStatus(wifiSignal);

  const waterPercentage =
    typeof waterLevel !== "undefined"
      ? Math.min((waterLevel / 21) * 100, 100)
      : 0;

  const water = getWaterStatus(waterPercentage);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      {/* Animações CSS */}
      <style>
        {`
          @keyframes devicePulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
          }
          @keyframes signalFlow {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
          @keyframes waterFlow {
            0% { transform: translateY(0); }
            50% { transform: translateY(-2px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>

      <Transition mounted={isVisible} transition="slide-up" duration={500}>
        {(styles) => (
          <Paper
            p="xl"
            radius="xl"
            style={{
              ...styles,
              background: isDark
                ? `linear-gradient(135deg, ${theme.colors.dark[7]} 0%, ${theme.colors.dark[6]} 100%)`
                : `linear-gradient(135deg, ${theme.colors.gray[0]} 0%, ${theme.colors.blue[0]} 100%)`,
              border: `2px solid ${
                isDark ? theme.colors.dark[4] : theme.colors.gray[2]
              }`,
              position: "relative",
              overflow: "hidden",
              boxShadow: isDark
                ? `0 8px 32px ${theme.colors.dark[9]}50`
                : `0 8px 32px ${theme.colors.gray[3]}30`,
            }}
          >
            {/* Efeito de fundo decorativo */}
            <Box
              style={{
                position: "absolute",
                top: -40,
                right: -40,
                width: 100,
                height: 100,
                background: isDark
                  ? `linear-gradient(45deg, ${theme.colors.dark[5]}40, ${theme.colors.blue[8]}20)`
                  : `linear-gradient(45deg, ${theme.colors.blue[2]}20, ${theme.colors.gray[2]}20)`,
                borderRadius: "50%",
                opacity: 0.7,
                animation: "devicePulse 6s ease-in-out infinite",
              }}
            />

            <Stack gap="lg">
              {/* Header */}
              <Group justify="space-between" align="center">
                <Group gap="md">
                  <ThemeIcon
                    size="xl"
                    radius="xl"
                    variant="gradient"
                    gradient={{ from: "blue", to: "cyan", deg: 45 }}
                  >
                    <IconDeviceDesktop size={24} />
                  </ThemeIcon>
                  <Box>
                    <Title order={4} c={isDark ? "blue.4" : "blue.8"}>
                      📡 Status do Dispositivo
                    </Title>
                    <Text size="sm" c="dimmed">
                      ESP32 Smart Plant Monitor
                    </Text>
                  </Box>
                </Group>

                <Badge
                  variant="dot"
                  color={wifi.status === "disconnected" ? "gray" : "myGreen"}
                  size="lg"
                >
                  {wifi.status === "disconnected" ? "Offline" : "Online"}
                </Badge>
              </Group>

              {/* Status Cards */}
              <Stack gap="md">
                {/* Wi-Fi Status Card */}
                <Box
                  style={{
                    background: isDark
                      ? `${theme.colors.dark[6]}80`
                      : `${theme.white}70`,
                    padding: theme.spacing.md,
                    borderRadius: theme.radius.lg,
                    border: `1px solid ${
                      theme.colors[
                        wifi.colorScheme as keyof typeof theme.colors
                      ]?.[2] || theme.colors.gray[2]
                    }`,
                    backdropFilter: "blur(10px)",
                    boxShadow: `0 4px 16px ${
                      theme.colors[
                        wifi.colorScheme as keyof typeof theme.colors
                      ]?.[2] || theme.colors.gray[2]
                    }20`,
                  }}
                >
                  <Group gap="md" align="center">
                    <ThemeIcon
                      color={wifi.colorScheme}
                      variant="light"
                      size="lg"
                      style={{
                        animation:
                          wifi.status !== "disconnected"
                            ? "signalFlow 2s ease-in-out infinite"
                            : "none",
                      }}
                    >
                      {wifi.icon}
                    </ThemeIcon>
                    <Box style={{ flex: 1 }}>
                      <Group justify="space-between" align="center">
                        <Text size="sm" c="dimmed" fw={500}>
                          📶 Sinal Wi-Fi
                        </Text>
                        <Badge
                          variant="light"
                          color={wifi.colorScheme}
                          size="sm"
                        >
                          {wifi.label}
                        </Badge>
                      </Group>
                      <Text fw={600} size="md" c={isDark ? "gray.1" : "dark.8"}>
                        {wifi.description}
                      </Text>
                      <Text size="xs" c="dimmed" mt={2}>
                        {wifiSignal ?? "--"} dBm
                      </Text>
                    </Box>
                  </Group>
                </Box>

                {/* Water Level Status Card */}
                <Box
                  style={{
                    background: isDark
                      ? `${theme.colors.dark[6]}80`
                      : `${theme.white}70`,
                    padding: theme.spacing.md,
                    borderRadius: theme.radius.lg,
                    border: `1px solid ${
                      theme.colors[
                        water.colorScheme as keyof typeof theme.colors
                      ]?.[2] || theme.colors.blue[2]
                    }`,
                    backdropFilter: "blur(10px)",
                    boxShadow: `0 4px 16px ${
                      theme.colors[
                        water.colorScheme as keyof typeof theme.colors
                      ]?.[2] || theme.colors.blue[2]
                    }20`,
                  }}
                >
                  <Group gap="md" align="center">
                    <ThemeIcon
                      color={water.colorScheme}
                      variant="light"
                      size="lg"
                      style={{
                        animation:
                          waterPercentage > 0
                            ? "waterFlow 3s ease-in-out infinite"
                            : "none",
                      }}
                    >
                      <IconDropletFilled size={24} />
                    </ThemeIcon>
                    <Box style={{ flex: 1 }}>
                      <Group justify="space-between" align="center">
                        <Text size="sm" c="dimmed" fw={500}>
                          💧 Nível do Reservatório
                        </Text>
                        <Badge
                          variant="light"
                          color={water.colorScheme}
                          size="sm"
                        >
                          {water.label}
                        </Badge>
                      </Group>
                      <Text fw={600} size="md" c={isDark ? "gray.1" : "dark.8"}>
                        {water.description}
                      </Text>
                      <Text size="xs" c="dimmed" mt={2}>
                        {waterPercentage.toFixed(0)}% capacidade
                      </Text>
                    </Box>
                  </Group>

                  {/* Barra de progresso melhorada */}
                  <Progress
                    value={waterPercentage}
                    size="lg"
                    radius="xl"
                    color={water.colorScheme}
                    animated={waterPercentage > 0}
                    striped={water.status === "critical"}
                    mt="md"
                    style={{
                      background: isDark
                        ? `${theme.colors.dark[5]}60`
                        : `${theme.colors.gray[1]}60`,
                      boxShadow: `inset 0 2px 4px ${
                        isDark ? theme.colors.dark[9] : theme.colors.gray[3]
                      }20`,
                    }}
                  />
                </Box>
              </Stack>
            </Stack>
          </Paper>
        )}
      </Transition>
    </>
  );
}
