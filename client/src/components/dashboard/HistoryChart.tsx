import {
  Alert,
  Badge,
  Box,
  Center,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import {
  IconAlertTriangle,
  IconChartLine,
  IconDroplet,
  IconMinus,
  IconTrendingDown,
  IconTrendingUp,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import api from "../../services/apiService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

interface HistoryData {
  createdAt: string;
  humidity: number;
  temperature?: number;
}

interface HistoryChartProps {
  plantId: string;
}

function analyzeTrend(data: HistoryData[]) {
  if (data.length < 2) return { trend: "stable", change: 0 };

  const recent =
    data.slice(-3).reduce((sum, d) => sum + d.humidity, 0) /
    Math.min(3, data.length);
  const older =
    data.slice(0, -3).reduce((sum, d) => sum + d.humidity, 0) /
    Math.max(1, data.length - 3);

  const change = recent - older;

  if (Math.abs(change) < 2) return { trend: "stable", change };
  return { trend: change > 0 ? "up" : "down", change };
}

function getHumidityStatus(average: number) {
  if (average >= 70)
    return { status: "excellent", color: "green", message: "Umidade ideal!" };
  if (average >= 50)
    return { status: "good", color: "blue", message: "Umidade boa" };
  if (average >= 30)
    return { status: "low", color: "orange", message: "Umidade baixa" };
  return { status: "critical", color: "red", message: "Umidade crítica!" };
}

const animationStyles = {
  statsFloat: {
    animation: "statsFloat 3s ease-in-out infinite",
  },
  "@keyframes statsFloat": {
    "0%, 100%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-2px)" },
  },
};

export function HistoryChart({ plantId }: HistoryChartProps) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const {
    data: history,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["plantHistory", plantId],
    queryFn: () =>
      api.get(`/plants/${plantId}/history?period=7d`).then((res) => res.data),
  });

  if (isLoading) {
    return (
      <Paper
        p="lg"
        radius="md"
        style={{
          background:
            colorScheme === "dark"
              ? `linear-gradient(135deg, ${theme.colors.dark[8]} 0%, ${theme.colors.dark[7]} 100%)`
              : `linear-gradient(135deg, ${theme.white} 0%, ${theme.colors.gray[0]} 100%)`,
        }}
      >
        <Center h={300}>
          <Stack align="center" gap="md">
            <Loader size="lg" color={theme.colors.myGreen[6]} />
            <Text c="dimmed">Carregando histórico de dados...</Text>
          </Stack>
        </Center>
      </Paper>
    );
  }

  if (isError || !history) {
    return (
      <Paper
        p="lg"
        radius="md"
        style={{
          background:
            colorScheme === "dark"
              ? `linear-gradient(135deg, ${theme.colors.dark[8]} 0%, ${theme.colors.dark[7]} 100%)`
              : `linear-gradient(135deg, ${theme.white} 0%, ${theme.colors.gray[0]} 100%)`,
        }}
      >
        <Center h={300}>
          <Alert
            icon={<IconAlertTriangle size={16} />}
            title="Erro ao carregar dados"
            color="red"
            variant="light"
          >
            Não foi possível carregar o histórico de umidade. Tente novamente
            mais tarde.
          </Alert>
        </Center>
      </Paper>
    );
  }

  const historyData: HistoryData[] = history;
  const average =
    historyData.reduce((sum, d) => sum + d.humidity, 0) / historyData.length;
  const trend = analyzeTrend(historyData);
  const humidityStatus = getHumidityStatus(average);

  const isDark = colorScheme === "dark";
  const primaryColor = theme.colors.myGreen[isDark ? 4 : 6];
  const successColor = theme.colors.myGreen[isDark ? 3 : 7];

  const getTrendIcon = () => {
    switch (trend.trend) {
      case "up":
        return IconTrendingUp;
      case "down":
        return IconTrendingDown;
      default:
        return IconMinus;
    }
  };

  const TrendIcon = getTrendIcon();

  const chartData = {
    labels: historyData.map((d) => {
      const date = new Date(d.createdAt);
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      });
    }),
    datasets: [
      {
        label: "Umidade do Solo (%)",
        data: historyData.map((d) => d.humidity),
        fill: true,
        backgroundColor: isDark
          ? "rgba(59, 130, 246, 0.1)"
          : "rgba(59, 130, 246, 0.1)",
        borderColor: isDark ? "rgb(59, 130, 246)" : "rgb(59, 130, 246)",
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

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
          background: `radial-gradient(circle at 80% 20%, ${primaryColor}10 0%, transparent 50%)`,
          pointerEvents: "none",
        }}
      />

      <Stack gap="md" style={{ position: "relative", zIndex: 1 }}>
        {/* Header com estatísticas */}
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
            >
              <IconChartLine size={24} />
            </ThemeIcon>
            <Box>
              <Title order={3} c={isDark ? theme.white : theme.black}>
                Histórico de Umidade
              </Title>
              <Text
                size="sm"
                c={isDark ? theme.colors.gray[4] : theme.colors.gray[6]}
              >
                Últimos 7 dias
              </Text>
            </Box>
          </Group>

          <Group gap="sm">
            <Badge
              size="lg"
              variant="gradient"
              gradient={{
                from: theme.colors.blue[4],
                to: theme.colors.cyan[5],
                deg: 45,
              }}
              style={animationStyles.statsFloat}
            >
              <Group gap={4}>
                <IconDroplet size={16} />
                <Text fw={700}>{average.toFixed(1)}%</Text>
              </Group>
            </Badge>

            <Badge size="lg" color={humidityStatus.color} variant="light">
              {humidityStatus.message}
            </Badge>
          </Group>
        </Group>

        {/* Análise de tendência */}
        <Group justify="space-between" align="center">
          <Group gap="xs">
            <ThemeIcon
              size="md"
              radius="xl"
              variant="light"
              color={
                trend.trend === "up"
                  ? "green"
                  : trend.trend === "down"
                  ? "red"
                  : "gray"
              }
            >
              <TrendIcon size={16} />
            </ThemeIcon>
            <Text
              size="sm"
              c={isDark ? theme.colors.gray[3] : theme.colors.gray[7]}
            >
              Tendência: {trend.change > 0 ? "+" : ""}
              {trend.change.toFixed(1)}%
              {trend.trend === "up"
                ? " (Aumentando)"
                : trend.trend === "down"
                ? " (Diminuindo)"
                : " (Estável)"}
            </Text>
          </Group>

          <Text size="xs" c="dimmed">
            {historyData.length} medições registradas
          </Text>
        </Group>

        {/* Gráfico */}
        <Box h={300} mt="md">
          <Line data={chartData} options={chartOptions} />
        </Box>

        {/* Legenda informativa */}
        <Group justify="center" gap="xl">
          <Group gap="xs">
            <Box
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: theme.colors.green[5],
              }}
            />
            <Text size="xs" c="dimmed">
              ≥70% Ideal
            </Text>
          </Group>
          <Group gap="xs">
            <Box
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: theme.colors.blue[5],
              }}
            />
            <Text size="xs" c="dimmed">
              50-69% Bom
            </Text>
          </Group>
          <Group gap="xs">
            <Box
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: theme.colors.orange[5],
              }}
            />
            <Text size="xs" c="dimmed">
              30-49% Baixo
            </Text>
          </Group>
          <Group gap="xs">
            <Box
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: theme.colors.red[5],
              }}
            />
            <Text size="xs" c="dimmed">
              &lt;30% Crítico
            </Text>
          </Group>
        </Group>
      </Stack>
    </Paper>
  );
}
