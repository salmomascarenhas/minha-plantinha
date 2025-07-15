import {
  Badge,
  Box,
  Center,
  Group,
  Paper,
  Progress,
  Stack,
  Text,
  Transition,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useEffect, useState } from "react";

interface MascotDisplayProps {
  soilStatus?: number; // 0: seco, 1: úmido, 2: encharcado
  plantName?: string;
  level?: number;
  xp?: number;
  maxXp?: number;
}

function getMascotState(soilStatus?: number) {
  switch (soilStatus) {
    case 0:
      return {
        emoji: "🥵",
        text: "Estou com sede! Por favor, me regue.",
        mood: "thirsty",
        colorScheme: "myDanger",
        healthStatus: "Crítico",
        tips: [
          "Regue imediatamente!",
          "Solo muito seco",
          "Planta precisa de água!",
        ],
      };
    case 1:
      return {
        emoji: "😄",
        text: "Estou feliz e hidratado! Obrigado!",
        mood: "happy",
        colorScheme: "myGreen",
        healthStatus: "Perfeito",
        tips: ["Continue assim!", "Solo ideal", "Você é um ótimo jardineiro!"],
      };
    case 2:
      return {
        emoji: "🤢",
        text: "Acho que bebi água demais... Preciso secar um pouco.",
        mood: "overwatered",
        colorScheme: "blue",
        healthStatus: "Encharcado",
        tips: ["Pare de regar", "Deixe secar", "Cuidado com o excesso!"],
      };
    default:
      return {
        emoji: "🤔",
        text: "Esperando dados para saber como estou...",
        mood: "waiting",
        colorScheme: "gray",
        healthStatus: "Aguardando",
        tips: ["Conectando sensores...", "Aguarde", "Verificando status..."],
      };
  }
}

export function MascotDisplay({
  soilStatus,
  plantName = "Minha Plantinha",
  level = 1,
  xp = 50,
  maxXp = 100,
}: MascotDisplayProps) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const [isVisible, setIsVisible] = useState(false);
  const [showTip, setShowTip] = useState(0);
  const [emojiHover, setEmojiHover] = useState(false);

  const mascotState = getMascotState(soilStatus);

  useEffect(() => {
    setIsVisible(true);
    const tipInterval = setInterval(() => {
      setShowTip((prev) => (prev + 1) % mascotState.tips.length);
    }, 3000);

    return () => clearInterval(tipInterval);
  }, [mascotState.tips.length]);

  const xpPercentage = (xp / maxXp) * 100;

  const isDark = colorScheme === "dark";
  const colorIndex = 6;
  const lightColorIndex = 1;

  const stateColor =
    theme.colors[mascotState.colorScheme as keyof typeof theme.colors]?.[
      colorIndex
    ] || theme.colors.gray[colorIndex];
  const lightStateColor =
    theme.colors[mascotState.colorScheme as keyof typeof theme.colors]?.[
      lightColorIndex
    ] || theme.colors.gray[lightColorIndex];

  const bgGradient = (() => {
    switch (mascotState.colorScheme) {
      case "myDanger":
        return `linear-gradient(135deg, ${theme.colors.myDanger[0]} 0%, ${theme.colors.red[1]} 50%, ${theme.colors.pink[0]} 100%)`;
      case "myGreen":
        return `linear-gradient(135deg, ${theme.colors.myGreen[0]} 0%, ${theme.colors.cyan[0]} 50%, ${theme.colors.teal[0]} 100%)`;
      case "blue":
        return `linear-gradient(135deg, ${theme.colors.blue[0]} 0%, ${theme.colors.cyan[1]} 50%, ${theme.colors.teal[0]} 100%)`;
      default:
        return `linear-gradient(135deg, ${theme.colors.gray[0]} 0%, ${theme.colors.gray[1]} 100%)`;
    }
  })();

  const bounceAnimation =
    mascotState.mood === "happy" ? "bounce 2s infinite" : "none";
  const shakeAnimation =
    mascotState.mood === "thirsty" ? "shake 0.5s infinite" : "none";
  const pulseAnimation =
    mascotState.mood === "waiting" ? "pulse 2s infinite" : "none";
  const floatAnimation =
    mascotState.mood === "overwatered"
      ? "float 3s ease-in-out infinite"
      : "none";

  return (
    <>
      {/* Estilos CSS para animações */}
      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
            20%, 40%, 60%, 80% { transform: translateX(3px); }
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          @keyframes sparkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
        `}
      </style>

      <Transition mounted={isVisible} transition="slide-up" duration={500}>
        {(styles) => (
          <Paper
            p="xl"
            radius="xl"
            h={300}
            style={{
              ...styles,
              background: bgGradient,
              border: `3px solid ${stateColor}`,
              boxShadow: `0 8px 32px ${stateColor}30`,
              position: "relative",
              overflow: "hidden",
              transition: "all 0.3s ease",
            }}
          >
            {/* Efeito de brilho de fundo */}
            <Box
              style={{
                position: "absolute",
                top: -50,
                right: -50,
                width: 100,
                height: 100,
                background: isDark
                  ? `${theme.colors.dark[4]}20`
                  : `${theme.white}15`,
                borderRadius: "50%",
                animation: "sparkle 4s ease-in-out infinite",
              }}
            />

            <Stack h="100%" justify="space-between">
              {/* Header com informações do nível */}
              <Group justify="space-between" align="center">
                <Stack gap={4}>
                  <Text size="sm" fw={600} c="dimmed">
                    {plantName}
                  </Text>
                  <Badge
                    variant="filled"
                    color={mascotState.colorScheme}
                    size="lg"
                    style={{
                      fontWeight: 700,
                      boxShadow: `0 2px 8px ${stateColor}40`,
                    }}
                  >
                    Nível {level}
                  </Badge>
                </Stack>
                <Badge
                  variant="light"
                  color={mascotState.colorScheme}
                  size="md"
                  style={{
                    background: isDark
                      ? `${theme.colors.dark[6]}80`
                      : `${theme.white}50`,
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${lightStateColor}50`,
                  }}
                >
                  {mascotState.healthStatus}
                </Badge>
              </Group>

              {/* Mascote principal */}
              <Center>
                <Stack align="center" gap="md">
                  <Box
                    style={{
                      fontSize: emojiHover ? "4.5rem" : "4rem",
                      animation: `${bounceAnimation} ${shakeAnimation} ${pulseAnimation} ${floatAnimation}`,
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      userSelect: "none",
                    }}
                    onMouseEnter={() => setEmojiHover(true)}
                    onMouseLeave={() => setEmojiHover(false)}
                    onClick={() => {
                      setEmojiHover(true);
                      setTimeout(() => setEmojiHover(false), 200);
                    }}
                  >
                    {mascotState.emoji}
                  </Box>

                  <Text
                    fw={500}
                    size="md"
                    ta="center"
                    c={isDark ? "gray.1" : "dark.8"}
                    style={{
                      textShadow: `0 2px 4px ${
                        isDark ? theme.colors.dark[9] : theme.colors.gray[3]
                      }50`,
                      maxWidth: 220,
                      lineHeight: 1.4,
                    }}
                  >
                    {mascotState.text}
                  </Text>
                </Stack>
              </Center>

              {/* Footer com XP e dicas */}
              <Stack gap="xs">
                <Group justify="space-between" align="center">
                  <Text size="xs" fw={500} c="dimmed">
                    Experiência
                  </Text>
                  <Text size="xs" fw={600} c="dimmed">
                    {xp}/{maxXp} XP
                  </Text>
                </Group>

                <Progress
                  value={xpPercentage}
                  color={mascotState.colorScheme}
                  size="lg"
                  radius="xl"
                  striped={mascotState.mood === "happy"}
                  animated={mascotState.mood === "happy"}
                  style={{
                    background: isDark
                      ? `${theme.colors.dark[6]}60`
                      : `${theme.white}30`,
                    boxShadow: `inset 0 2px 4px ${
                      isDark ? theme.colors.dark[9] : theme.colors.gray[3]
                    }20`,
                  }}
                />

                <Transition
                  mounted={true}
                  transition="slide-left"
                  duration={500}
                  key={showTip}
                >
                  {(tipStyles) => (
                    <Text
                      size="xs"
                      ta="center"
                      c="dimmed"
                      fw={500}
                      style={{
                        ...tipStyles,
                        background: isDark
                          ? `${theme.colors.dark[6]}70`
                          : `${theme.white}40`,
                        padding: "6px 12px",
                        borderRadius: "12px",
                        backdropFilter: "blur(10px)",
                        border: `1px solid ${
                          isDark ? theme.colors.dark[4] : theme.white
                        }40`,
                        boxShadow: `0 2px 8px ${
                          isDark ? theme.colors.dark[9] : theme.colors.gray[3]
                        }20`,
                      }}
                    >
                      💡 {mascotState.tips[showTip]}
                    </Text>
                  )}
                </Transition>
              </Stack>
            </Stack>
          </Paper>
        )}
      </Transition>
    </>
  );
}
