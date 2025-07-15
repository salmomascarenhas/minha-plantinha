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
  Tooltip,
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

const getOptimizedColors = (
  colorScheme: string,
  theme: ReturnType<typeof useMantineTheme>,
  isDark: boolean
) => {
  switch (colorScheme) {
    case "myDanger":
      return {
        primary: isDark ? theme.colors.red[3] : theme.colors.red[7],
        light: isDark ? theme.colors.red[6] : theme.colors.red[3],
        bg: isDark ? theme.colors.red[9] : theme.colors.red[0],
        text: isDark ? theme.colors.red[2] : theme.colors.red[8],
        border: isDark ? theme.colors.red[4] : theme.colors.red[6],
        badgeText: isDark ? theme.white : theme.colors.red[0],
      };
    case "myGreen":
      return {
        primary: isDark ? theme.colors.green[3] : theme.colors.green[7],
        light: isDark ? theme.colors.green[6] : theme.colors.green[3],
        bg: isDark ? theme.colors.green[9] : theme.colors.green[0],
        text: isDark ? theme.colors.green[2] : theme.colors.green[8],
        border: isDark ? theme.colors.green[4] : theme.colors.green[6],
        badgeText: isDark ? theme.white : theme.colors.green[0],
      };
    case "cyan":
      return {
        primary: isDark ? theme.colors.cyan[3] : theme.colors.cyan[7],
        light: isDark ? theme.colors.cyan[6] : theme.colors.cyan[3],
        bg: isDark ? theme.colors.cyan[9] : theme.colors.cyan[0],
        text: isDark ? theme.colors.cyan[2] : theme.colors.cyan[8],
        border: isDark ? theme.colors.cyan[4] : theme.colors.cyan[6],
        badgeText: isDark ? theme.white : theme.colors.cyan[0],
      };
    case "yellow":
      return {
        primary: isDark ? theme.colors.yellow[3] : theme.colors.yellow[8],
        light: isDark ? theme.colors.yellow[6] : theme.colors.yellow[2],
        bg: isDark ? theme.colors.yellow[9] : theme.colors.yellow[0],
        text: isDark ? theme.colors.yellow[2] : theme.colors.yellow[9],
        border: isDark ? theme.colors.yellow[4] : theme.colors.yellow[7],
        badgeText: isDark ? theme.colors.gray[9] : theme.colors.yellow[0],
      };
    case "orange":
      return {
        primary: isDark ? theme.colors.orange[3] : theme.colors.orange[7],
        light: isDark ? theme.colors.orange[6] : theme.colors.orange[3],
        bg: isDark ? theme.colors.orange[9] : theme.colors.orange[0],
        text: isDark ? theme.colors.orange[2] : theme.colors.orange[8],
        border: isDark ? theme.colors.orange[4] : theme.colors.orange[6],
        badgeText: isDark ? theme.white : theme.colors.orange[0],
      };
    default:
      return {
        primary: isDark ? theme.colors.gray[4] : theme.colors.gray[7],
        light: isDark ? theme.colors.gray[7] : theme.colors.gray[3],
        bg: isDark ? theme.colors.gray[8] : theme.colors.gray[0],
        text: isDark ? theme.colors.gray[3] : theme.colors.gray[8],
        border: isDark ? theme.colors.gray[5] : theme.colors.gray[6],
        badgeText: isDark ? theme.white : theme.colors.gray[0],
      };
  }
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

  const wifiColors = getOptimizedColors(wifi.colorScheme, theme, isDark);
  const waterColors = getOptimizedColors(water.colorScheme, theme, isDark);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      {/* Animações CSS melhoradas */}
      <style>
        {`
          @keyframes devicePulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.02); opacity: 0.95; }
          }
          @keyframes signalFlow {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
          }
          @keyframes waterFlow {
            0% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-3px) scale(1.02); }
            100% { transform: translateY(0) scale(1); }
          }
          .device-container {
            transition: all 0.3s ease;
            cursor: pointer;
          }
          .device-container:hover {
            transform: scale(1.01);
          }
        `}
      </style>

      <Transition mounted={isVisible} transition="slide-up" duration={500}>
        {(styles) => (
          <Paper
            className="device-container"
            p="xl"
            radius="xl"
            style={{
              ...styles,
              background: isDark
                ? `linear-gradient(135deg, ${theme.colors.dark[7]} 0%, ${theme.colors.dark[6]} 100%)`
                : `linear-gradient(135deg, ${theme.white} 0%, ${theme.colors.gray[0]} 100%)`,
              border: `2px solid ${
                isDark ? theme.colors.dark[4] : theme.colors.gray[3]
              }`,
              position: "relative",
              overflow: "hidden",
              boxShadow: isDark
                ? `0 8px 32px ${theme.colors.dark[9]}50`
                : `0 8px 32px ${theme.colors.gray[4]}20`,
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
                    <Text size="sm" c={isDark ? "dimmed" : "gray.7"}>
                      ESP32 Smart Plant Monitor
                    </Text>
                  </Box>
                </Group>

                <Badge
                  variant="light"
                  size="lg"
                  style={{
                    background:
                      wifi.status === "disconnected"
                        ? isDark
                          ? `${theme.colors.gray[8]}90`
                          : `${theme.colors.gray[1]}90`
                        : isDark
                        ? `${theme.colors.green[9]}90`
                        : `${theme.colors.green[0]}90`,
                    color:
                      wifi.status === "disconnected"
                        ? isDark
                          ? theme.colors.gray[3]
                          : theme.colors.gray[7]
                        : isDark
                        ? theme.colors.green[2]
                        : theme.colors.green[8],
                    fontWeight: 600,
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${
                      wifi.status === "disconnected"
                        ? isDark
                          ? theme.colors.gray[6]
                          : theme.colors.gray[3]
                        : isDark
                        ? theme.colors.green[6]
                        : theme.colors.green[3]
                    }`,
                    boxShadow: `0 2px 8px ${
                      wifi.status === "disconnected"
                        ? theme.colors.gray[5]
                        : theme.colors.green[5]
                    }20`,
                  }}
                >
                  {wifi.status === "disconnected" ? "📴 Offline" : "🟢 Online"}
                </Badge>
              </Group>

              {/* Status Cards */}
              <Stack gap="md">
                {/* Wi-Fi Status Card */}
                <Box
                  style={{
                    background: isDark
                      ? `${theme.colors.dark[6]}80`
                      : `${theme.white}`,
                    padding: theme.spacing.md,
                    borderRadius: theme.radius.lg,
                    border: `1px solid ${wifiColors.border}`,
                    backdropFilter: "blur(10px)",
                    boxShadow: `0 4px 16px ${wifiColors.primary}20`,
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
                        <Text
                          size="sm"
                          c={isDark ? "dimmed" : "gray.7"}
                          fw={500}
                        >
                          📶 Sinal Wi-Fi
                        </Text>
                        <Badge
                          variant="light"
                          size="sm"
                          style={{
                            background: wifiColors.bg,
                            color: wifiColors.text,
                            fontWeight: 600,
                            border: `1px solid ${wifiColors.border}`,
                          }}
                        >
                          {wifi.label}
                        </Badge>
                      </Group>
                      <Tooltip
                        label={
                          wifi.description.length > 20 ? wifi.description : null
                        }
                        disabled={wifi.description.length <= 20}
                      >
                        <Text
                          fw={600}
                          size="md"
                          c={isDark ? "gray.1" : "gray.9"}
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            cursor:
                              wifi.description.length > 20 ? "help" : "default",
                          }}
                        >
                          {wifi.description}
                        </Text>
                      </Tooltip>
                      <Text size="xs" c={isDark ? "dimmed" : "gray.9"} mt={2}>
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
                      : `${theme.white}`,
                    padding: theme.spacing.md,
                    borderRadius: theme.radius.lg,
                    border: `1px solid ${waterColors.border}`,
                    backdropFilter: "blur(10px)",
                    boxShadow: `0 4px 16px ${waterColors.primary}20`,
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
                        <Text
                          size="sm"
                          c={isDark ? "dimmed" : "gray.7"}
                          fw={500}
                        >
                          💧 Nível do Reservatório
                        </Text>
                        <Badge
                          variant="light"
                          size="sm"
                          style={{
                            background: waterColors.bg,
                            color: waterColors.text,
                            fontWeight: 600,
                            border: `1px solid ${waterColors.border}`,
                          }}
                        >
                          {water.label}
                        </Badge>
                      </Group>
                      <Tooltip
                        label={
                          water.description.length > 20
                            ? water.description
                            : null
                        }
                        disabled={water.description.length <= 20}
                      >
                        <Text
                          fw={600}
                          size="md"
                          c={isDark ? "gray.1" : "gray.9"}
                          style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            cursor:
                              water.description.length > 20
                                ? "help"
                                : "default",
                          }}
                        >
                          {water.description}
                        </Text>
                      </Tooltip>
                      <Text size="xs" c={isDark ? "dimmed" : "gray.9"} mt={2}>
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
                    styles={{
                      section: {
                        background: `linear-gradient(90deg, ${waterColors.primary} 0%, ${waterColors.border} 100%)`,
                      },
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
