import {
  ActionIcon,
  Alert,
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Group,
  Loader,
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
  IconAlertCircle,
  IconBrain,
  IconPlant,
  IconRefresh,
  IconRobot,
  IconSparkles,
} from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import api from "../../services/apiService";

interface AiAssistantProps {
  plantId: string;
  plantName?: string;
}

interface AiInsightResponse {
  id: string;
  content: string;
}

export function AiAssistant({
  plantId,
  plantName = "sua planta",
}: AiAssistantProps) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const [lastInsight, setLastInsight] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const isDark = colorScheme === "dark";

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const generateReportMutation = useMutation({
    mutationFn: () =>
      api.post<AiInsightResponse>("/ai/generate-report", { plantId }),
    onMutate: () => {
      setLastInsight(null);
    },
    onSuccess: (data) => {
      setLastInsight(data.data.content);
    },
  });

  return (
    <>
      {/* Animações CSS */}
      <style>
        {`
          @keyframes robotThink {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-5deg); }
            75% { transform: rotate(5deg); }
          }
          @keyframes sparkleGlow {
            0%, 100% { box-shadow: 0 0 5px ${theme.colors.cyan[4]}40; }
            50% { box-shadow: 0 0 20px ${theme.colors.cyan[4]}80; }
          }
          @keyframes typewriter {
            from { width: 0; }
            to { width: 100%; }
          }
          @keyframes aiPulse {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
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
                : `linear-gradient(135deg, ${theme.colors.myGreen[0]} 0%, ${theme.colors.cyan[0]} 100%)`,
              border: `2px solid ${
                isDark ? theme.colors.dark[4] : theme.colors.myGreen[2]
              }`,
              position: "relative",
              overflow: "hidden",
              boxShadow: isDark
                ? `0 8px 32px ${theme.colors.dark[9]}50`
                : `0 8px 32px ${theme.colors.myGreen[2]}30`,
            }}
          >
            {/* Efeito de fundo decorativo */}
            <Box
              style={{
                position: "absolute",
                top: -30,
                right: -30,
                width: 80,
                height: 80,
                background: isDark
                  ? `linear-gradient(45deg, ${theme.colors.dark[5]}40, ${theme.colors.cyan[8]}20)`
                  : `linear-gradient(45deg, ${theme.colors.cyan[2]}20, ${theme.colors.myGreen[2]}20)`,
                borderRadius: "50%",
                opacity: 0.7,
                animation: "aiPulse 4s ease-in-out infinite",
              }}
            />

            <Stack gap="lg">
              {/* Header do AI Assistant */}
              <Group justify="space-between" align="center">
                <Group gap="md">
                  <ThemeIcon
                    size="xl"
                    radius="xl"
                    variant="gradient"
                    gradient={{ from: "myGreen", to: "cyan", deg: 45 }}
                    style={{
                      animation: generateReportMutation.isPending
                        ? "robotThink 1s infinite"
                        : "none",
                    }}
                  >
                    <IconRobot size={24} />
                  </ThemeIcon>
                  <Box>
                    <Title order={4} c={isDark ? "myGreen.4" : "myGreen.8"}>
                      🤖 Caquito - Assistente IA
                    </Title>
                    <Text size="sm" c="dimmed">
                      Especialista em cuidados de plantas
                    </Text>
                  </Box>
                </Group>

                <Badge variant="dot" color="myGreen" size="lg">
                  Online
                </Badge>
              </Group>

              <Divider
                variant="dashed"
                color={isDark ? "dark.3" : "myGreen.2"}
                label={
                  <Group gap={4}>
                    <IconPlant size={16} />
                    <Text
                      size="xs"
                      fw={500}
                      c={isDark ? "myGreen.4" : "myGreen.6"}
                    >
                      Análise de {plantName}
                    </Text>
                  </Group>
                }
                labelPosition="center"
              />

              {/* Botão de ação principal */}
              <Group justify="center">
                <Button
                  leftSection={<IconSparkles size={18} />}
                  rightSection={
                    generateReportMutation.isPending ? (
                      <Loader size={16} color="white" />
                    ) : (
                      <IconBrain size={18} />
                    )
                  }
                  variant="gradient"
                  gradient={{ from: "myGreen", to: "cyan", deg: 45 }}
                  size="lg"
                  radius="xl"
                  onClick={() => generateReportMutation.mutate()}
                  loading={generateReportMutation.isPending}
                  style={{
                    animation: generateReportMutation.isPending
                      ? "sparkleGlow 2s infinite"
                      : "none",
                    minWidth: 250,
                  }}
                >
                  {generateReportMutation.isPending
                    ? "Analisando..."
                    : "Gerar Relatório Inteligente"}
                </Button>
              </Group>

              {/* Estado de carregamento */}
              {generateReportMutation.isPending && (
                <Alert
                  icon={
                    <Avatar size="sm" radius="xl" color="cyan">
                      🤖
                    </Avatar>
                  }
                  title="Caquito está trabalhando!"
                  color="cyan"
                  variant="light"
                  style={{
                    background: isDark
                      ? `linear-gradient(90deg, ${theme.colors.dark[6]} 0%, ${theme.colors.dark[5]} 100%)`
                      : `linear-gradient(90deg, ${theme.colors.cyan[0]} 0%, ${theme.colors.myGreen[0]} 100%)`,
                    border: `1px solid ${
                      isDark ? theme.colors.dark[4] : theme.colors.cyan[2]
                    }`,
                    boxShadow: isDark
                      ? `0 4px 16px ${theme.colors.dark[9]}30`
                      : `0 4px 16px ${theme.colors.cyan[2]}30`,
                  }}
                >
                  <Group gap="xs">
                    <Loader size="xs" color="cyan" />
                    <Text size="sm" c="cyan.7">
                      Analisando dados dos sensores e gerando insights
                      personalizados para {plantName}...
                    </Text>
                  </Group>
                </Alert>
              )}

              {/* Estado de erro */}
              {generateReportMutation.isError && (
                <Alert
                  icon={<IconAlertCircle size="1rem" />}
                  title="Ops! Algo deu errado"
                  color="myDanger"
                  variant="light"
                  style={{
                    background: isDark
                      ? `${theme.colors.dark[6]}80`
                      : `${theme.colors.myDanger[0]}50`,
                    border: `1px solid ${
                      isDark ? theme.colors.red[8] : theme.colors.myDanger[2]
                    }`,
                    boxShadow: isDark
                      ? `0 4px 16px ${theme.colors.dark[9]}30`
                      : `0 4px 16px ${theme.colors.myDanger[2]}30`,
                  }}
                >
                  <Stack gap="xs">
                    <Text size="sm">
                      O Caquito não conseguiu gerar o relatório no momento.
                    </Text>
                    <Group gap="xs">
                      <ActionIcon
                        variant="subtle"
                        color="myDanger"
                        onClick={() => generateReportMutation.mutate()}
                      >
                        <IconRefresh size={16} />
                      </ActionIcon>
                      <Text size="xs" c="dimmed">
                        Clique para tentar novamente
                      </Text>
                    </Group>
                  </Stack>
                </Alert>
              )}

              {/* Relatório gerado */}
              {generateReportMutation.isSuccess && lastInsight && (
                <Alert
                  icon={
                    <Avatar
                      size="sm"
                      radius="xl"
                      color="myGreen"
                      variant="light"
                    >
                      🌱
                    </Avatar>
                  }
                  title={
                    <Group gap="xs">
                      <IconSparkles size={16} />
                      <Text fw={600}>Relatório Personalizado do Caquito</Text>
                      <Badge size="xs" color="myGreen" variant="dot">
                        Novo
                      </Badge>
                    </Group>
                  }
                  color="myGreen"
                  variant="light"
                  style={{
                    background: isDark
                      ? `linear-gradient(135deg, ${theme.colors.dark[6]} 0%, ${theme.colors.dark[5]} 100%)`
                      : `linear-gradient(135deg, ${theme.colors.myGreen[0]} 0%, ${theme.colors.cyan[0]} 100%)`,
                    border: `2px solid ${
                      isDark ? theme.colors.myGreen[8] : theme.colors.myGreen[3]
                    }`,
                    borderRadius: theme.radius.xl,
                    boxShadow: isDark
                      ? `0 8px 32px ${theme.colors.dark[9]}50`
                      : `0 8px 32px ${theme.colors.myGreen[2]}30`,
                  }}
                >
                  <Box
                    style={{
                      background: isDark
                        ? `${theme.colors.dark[5]}90`
                        : "rgba(255, 255, 255, 0.7)",
                      padding: theme.spacing.md,
                      borderRadius: theme.radius.md,
                      border: `1px solid ${
                        isDark ? theme.colors.dark[3] : theme.colors.myGreen[2]
                      }`,
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <Text
                      style={{
                        whiteSpace: "pre-wrap",
                        lineHeight: 1.6,
                        color: isDark
                          ? theme.colors.gray[1]
                          : theme.colors.dark[8],
                      }}
                    >
                      {lastInsight}
                    </Text>
                  </Box>

                  <Group justify="space-between" mt="md">
                    <Group gap="xs">
                      <ThemeIcon size="xs" color="myGreen" variant="light">
                        <IconBrain size={12} />
                      </ThemeIcon>
                      <Text size="xs" c="dimmed">
                        Análise gerada por IA
                      </Text>
                    </Group>

                    <Tooltip label="Gerar novo relatório">
                      <ActionIcon
                        variant="subtle"
                        color="myGreen"
                        onClick={() => generateReportMutation.mutate()}
                      >
                        <IconRefresh size={16} />
                      </ActionIcon>
                    </Tooltip>
                  </Group>
                </Alert>
              )}
            </Stack>
          </Paper>
        )}
      </Transition>
    </>
  );
}
