import {
  Badge,
  Box,
  Group,
  Paper,
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
  IconCloudRain,
  IconDeviceDesktop,
  IconEngine,
  IconSignal2g,
  IconSignal3g,
  IconSignal4g,
  IconSignal5g,
  IconSunOff,
  IconWifiOff,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface StatusInfo {
  colorScheme: string;
  label: string;
  icon?: React.ReactNode;
  status: string;
  description: string;
}

interface ColorInfo {
  primary: string;
  light: string;
  bg: string;
  text: string;
  border: string;
  badgeText: string;
}

interface DeviceStatusProps {
  wifiSignal?: number;
  rainDetected?: boolean;
  pumpStatus?: boolean;
  coverStatus?: boolean;
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

const getRainStatus = (detected?: boolean) => {
  if (typeof detected === "undefined")
    return {
      colorScheme: "gray",
      label: "Desconhecido",
      icon: <IconCloudRain size={24} />,
      status: "unknown",
      description: "Sensor não disponível",
    };
  return detected
    ? {
        colorScheme: "blue",
        label: "Detectada",
        icon: <IconCloudRain size={24} />,
        status: "detected",
        description: "Chuva em andamento",
      }
    : {
        colorScheme: "gray",
        label: "Sem Chuva",
        icon: <IconCloudRain size={24} />,
        status: "clear",
        description: "Tempo seco",
      };
};

const getPumpStatus = (active?: boolean) => {
  if (typeof active === "undefined")
    return {
      colorScheme: "gray",
      label: "Desconhecido",
      icon: <IconEngine size={24} />,
      status: "unknown",
      description: "Status não disponível",
    };
  return active
    ? {
        colorScheme: "myGreen",
        label: "Ativa",
        icon: <IconEngine size={24} />,
        status: "active",
        description: "Bomba funcionando",
      }
    : {
        colorScheme: "gray",
        label: "Inativa",
        icon: <IconEngine size={24} />,
        status: "inactive",
        description: "Bomba parada",
      };
};

const getCoverStatus = (open?: boolean) => {
  if (typeof open === "undefined")
    return {
      colorScheme: "gray",
      label: "Desconhecido",
      icon: <IconSunOff size={24} />,
      status: "unknown",
      description: "Status não disponível",
    };
  return open
    ? {
        colorScheme: "myGreen",
        label: "Aberta",
        icon: <IconSunOff size={24} />,
        status: "open",
        description: "Cobertura ativa",
      }
    : {
        colorScheme: "blue",
        label: "Fechada",
        icon: <IconSunOff size={24} />,
        status: "closed",
        description: "Cobertura inativa",
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

export function DeviceStatus({
  wifiSignal,
  rainDetected,
  pumpStatus,
  coverStatus,
}: DeviceStatusProps) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const [isVisible, setIsVisible] = useState(false);

  const isDark = colorScheme === "dark";
  const wifi = getWifiStatus(wifiSignal);
  const rain = getRainStatus(rainDetected);
  const pump = getPumpStatus(pumpStatus);
  const cover = getCoverStatus(coverStatus);

  const wifiColors = getOptimizedColors(wifi.colorScheme, theme, isDark);
  const rainColors = getOptimizedColors(rain.colorScheme, theme, isDark);
  const pumpColors = getOptimizedColors(pump.colorScheme, theme, isDark);
  const coverColors = getOptimizedColors(cover.colorScheme, theme, isDark);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const StatusCard = ({
    title,
    status,
    colors,
    extra,
  }: {
    title: string;
    status: StatusInfo;
    colors: ColorInfo;
    extra?: React.ReactNode;
  }) => (
    <Box
      style={{
        background: isDark ? `${theme.colors.dark[6]}80` : theme.white,
        padding: theme.spacing.md,
        borderRadius: theme.radius.lg,
        border: `1px solid ${colors.border}`,
        backdropFilter: "blur(10px)",
        boxShadow: `0 2px 8px ${colors.primary}10`,
      }}
    >
      <Group justify="space-between" align="center">
        <ThemeIcon
          size={40}
          radius="md"
          style={{
            background: colors.bg,
            color: colors.primary,
            border: `1px solid ${colors.border}`,
            animation:
              status.status !== "unknown" && status.status !== "disconnected"
                ? "signalFlow 2s ease-in-out infinite"
                : "none",
          }}
        >
          {status.icon}
        </ThemeIcon>
        <Box style={{ flex: 1 }}>
          <Group justify="space-between" align="center">
            <Text size="sm" c={isDark ? "dimmed" : "gray.7"} fw={500}>
              {title}
            </Text>
            <Badge
              variant="light"
              size="sm"
              style={{
                background: colors.bg,
                color: colors.text,
                fontWeight: 600,
                border: `1px solid ${colors.border}`,
              }}
            >
              {status.label}
            </Badge>
          </Group>
          <Tooltip
            label={status.description.length > 20 ? status.description : null}
            disabled={status.description.length <= 20}
          >
            <Text
              fw={600}
              size="md"
              c={isDark ? "gray.1" : "gray.9"}
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                cursor: status.description.length > 20 ? "help" : "default",
              }}
            >
              {status.description}
            </Text>
          </Tooltip>
          {extra}
        </Box>
      </Group>
    </Box>
  );

  return (
    <>
      {/* Animações CSS */}
      <style>
        {`
          @keyframes signalFlow {
            0%, 100% { opacity: 0.6; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
          }
          @keyframes waterFlow {
            0% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-3px) scale(1.02); }
            100% { transform: translateY(0) scale(1); }
          }
          @keyframes devicePulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.02); opacity: 0.95; }
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
                : `linear-gradient(135deg, ${theme.white} 0%, ${theme.colors.gray[0]} 100%)`,
              border: `2px solid ${
                isDark ? theme.colors.dark[4] : theme.colors.gray[3]
              }`,
              boxShadow: isDark
                ? `0 8px 32px ${theme.colors.dark[9]}40`
                : `0 8px 32px ${theme.colors.gray[4]}20`,
              transition: "all 0.3s ease",
            }}
          >
            <Stack gap="lg">
              {/* Header */}
              <Group justify="space-between" align="center">
                <Group gap="sm">
                  <ThemeIcon
                    size={48}
                    radius="xl"
                    style={{
                      background: `linear-gradient(135deg, ${theme.colors.green[6]} 0%, ${theme.colors.green[4]} 100%)`,
                      boxShadow: `0 4px 16px ${theme.colors.green[5]}30`,
                      animation: "devicePulse 3s ease-in-out infinite",
                    }}
                  >
                    <IconDeviceDesktop size={24} color={theme.white} />
                  </ThemeIcon>
                  <Box>
                    <Title order={4} c={isDark ? "gray.1" : "gray.9"}>
                      Status Operacional
                    </Title>
                    <Text size="sm" c="dimmed">
                      Sistema e equipamentos
                    </Text>
                  </Box>
                </Group>
                <Badge
                  size="lg"
                  radius="md"
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
                  }}
                >
                  {wifi.status === "disconnected" ? "📴 Offline" : "🟢 Online"}
                </Badge>
              </Group>

              {/* Status Cards Grid - Apenas Status Operacionais */}
              <Stack gap="md">
                <StatusCard
                  title="📶 Sinal Wi-Fi"
                  status={wifi}
                  colors={wifiColors}
                  extra={
                    typeof wifiSignal === "number" && (
                      <Text size="xs" c="dimmed" mt={2}>
                        {wifiSignal} dBm
                      </Text>
                    )
                  }
                />

                <StatusCard
                  title="🌧️ Detecção de Chuva"
                  status={rain}
                  colors={rainColors}
                />

                <StatusCard
                  title="⚙️ Bomba d'Água"
                  status={pump}
                  colors={pumpColors}
                />

                <StatusCard
                  title="☂️ Cobertura"
                  status={cover}
                  colors={coverColors}
                />
              </Stack>
            </Stack>
          </Paper>
        )}
      </Transition>
    </>
  );
}
