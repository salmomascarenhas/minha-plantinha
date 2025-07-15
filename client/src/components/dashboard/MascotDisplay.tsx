import {
  Badge,
  Box,
  Center,
  Group,
  Paper,
  Progress,
  Stack,
  Text,
  Tooltip,
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

  const getStateColors = (colorScheme: string) => {
    switch (colorScheme) {
      case "myDanger":
        return {
          primary: isDark ? theme.colors.red[3] : theme.colors.red[7],
          light: isDark ? theme.colors.red[6] : theme.colors.red[3],
          bg: isDark ? theme.colors.red[9] : theme.colors.red[0],
          text: isDark ? theme.colors.red[1] : theme.colors.red[9],
          border: isDark ? theme.colors.red[4] : theme.colors.red[5],
          badgeText: isDark ? theme.white : theme.colors.red[0],
        };
      case "myGreen":
        return {
          primary: isDark ? theme.colors.green[3] : theme.colors.green[7],
          light: isDark ? theme.colors.green[6] : theme.colors.green[3],
          bg: isDark ? theme.colors.green[9] : theme.colors.green[0],
          text: isDark ? theme.colors.green[1] : theme.colors.green[9],
          border: isDark ? theme.colors.green[4] : theme.colors.green[5],
          badgeText: isDark ? theme.white : theme.colors.green[0],
        };
      case "blue":
        return {
          primary: isDark ? theme.colors.blue[3] : theme.colors.blue[7],
          light: isDark ? theme.colors.blue[6] : theme.colors.blue[3],
          bg: isDark ? theme.colors.blue[9] : theme.colors.blue[0],
          text: isDark ? theme.colors.blue[1] : theme.colors.blue[9],
          border: isDark ? theme.colors.blue[4] : theme.colors.blue[5],
          badgeText: isDark ? theme.white : theme.colors.blue[0],
        };
      default:
        return {
          primary: isDark ? theme.colors.gray[4] : theme.colors.gray[6],
          light: isDark ? theme.colors.gray[7] : theme.colors.gray[3],
          bg: isDark ? theme.colors.gray[8] : theme.colors.gray[1],
          text: isDark ? theme.colors.gray[3] : theme.colors.gray[7],
          border: isDark ? theme.colors.gray[5] : theme.colors.gray[4],
        };
    }
  };

  const stateColors = getStateColors(mascotState.colorScheme);

  const bgGradient = (() => {
    switch (mascotState.colorScheme) {
      case "myDanger":
        return isDark
          ? `linear-gradient(135deg, ${theme.colors.dark[8]} 0%, ${theme.colors.red[9]} 30%, ${theme.colors.dark[7]} 100%)`
          : `linear-gradient(135deg, ${theme.colors.red[0]} 0%, ${theme.colors.pink[0]} 50%, ${theme.colors.red[1]} 100%)`;
      case "myGreen":
        return isDark
          ? `linear-gradient(135deg, ${theme.colors.dark[8]} 0%, ${theme.colors.green[9]} 30%, ${theme.colors.dark[7]} 100%)`
          : `linear-gradient(135deg, ${theme.colors.green[0]} 0%, ${theme.colors.teal[0]} 50%, ${theme.colors.green[1]} 100%)`;
      case "blue":
        return isDark
          ? `linear-gradient(135deg, ${theme.colors.dark[8]} 0%, ${theme.colors.blue[9]} 30%, ${theme.colors.dark[7]} 100%)`
          : `linear-gradient(135deg, ${theme.colors.blue[0]} 0%, ${theme.colors.cyan[0]} 50%, ${theme.colors.blue[1]} 100%)`;
      default:
        return isDark
          ? `linear-gradient(135deg, ${theme.colors.dark[8]} 0%, ${theme.colors.dark[6]} 100%)`
          : `linear-gradient(135deg, ${theme.colors.gray[0]} 0%, ${theme.colors.gray[1]} 100%)`;
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
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.9; }
            100% { transform: scale(1); opacity: 1; }
          }
          .mascot-container {
            transition: all 0.3s ease;
            cursor: pointer;
          }
          .mascot-container:hover {
            transform: scale(1.02);
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
            className="mascot-container"
            radius="md"
            style={{
              ...styles,
              background: bgGradient,
              border: `3px solid ${stateColors.border}`,
              boxShadow: `0 8px 16px ${stateColors.primary}30`,
              position: "relative",
              overflow: "hidden",
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
                  <Text
                    size="sm"
                    fw={600}
                    c={isDark ? theme.colors.gray[2] : theme.colors.gray[7]}
                    style={{
                      textShadow: isDark
                        ? `0 1px 2px ${theme.colors.dark[9]}`
                        : `0 1px 2px ${theme.colors.white}`,
                    }}
                  >
                    {plantName}
                  </Text>
                  <Badge
                    variant="filled"
                    size="lg"
                    style={{
                      fontWeight: 700,
                      background: `linear-gradient(45deg, ${stateColors.primary} 0%, ${stateColors.border} 100%)`,
                      color: stateColors.badgeText,
                      boxShadow: `0 2px 8px ${stateColors.primary}40`,
                      border: `1px solid ${stateColors.light}`,
                    }}
                  >
                    Nível {level}
                  </Badge>
                </Stack>
                <Badge
                  variant="light"
                  size="md"
                  style={{
                    background: isDark
                      ? `${theme.colors.dark[6]}`
                      : `${theme.white}`,
                    color: stateColors.text,
                    fontWeight: 600,
                    backdropFilter: "blur(10px)",
                    border: `1px solid ${stateColors.light}`,
                    boxShadow: `0 2px 8px ${stateColors.primary}20`,
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

                  <Tooltip
                    label={
                      mascotState.text.length > 50 ? mascotState.text : null
                    }
                    multiline
                    w={300}
                    disabled={mascotState.text.length <= 50}
                  >
                    <Text
                      fw={500}
                      size="md"
                      ta="center"
                      c={isDark ? theme.colors.gray[1] : theme.colors.gray[8]}
                      style={{
                        textShadow: isDark
                          ? `0 2px 4px ${theme.colors.dark[9]}`
                          : `0 2px 4px ${theme.colors.gray[3]}`,
                        maxWidth: 220,
                        lineHeight: 1.4,
                        background: isDark
                          ? `${theme.colors.dark[6]}60`
                          : `${theme.white}70`,
                        padding: "8px 16px",
                        borderRadius: "12px",
                        backdropFilter: "blur(8px)",
                        border: `1px solid ${
                          isDark ? theme.colors.dark[4] : theme.colors.gray[2]
                        }`,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {mascotState.text}
                    </Text>
                  </Tooltip>
                </Stack>
              </Center>

              {/* Footer com XP e dicas */}
              <Stack gap="xs">
                <Group justify="space-between" align="center">
                  <Text
                    size="xs"
                    fw={500}
                    c={isDark ? theme.colors.gray[3] : theme.colors.gray[6]}
                  >
                    Experiência
                  </Text>
                  <Text
                    size="xs"
                    fw={600}
                    c={isDark ? theme.colors.gray[2] : theme.colors.gray[7]}
                  >
                    {xp}/{maxXp} XP
                  </Text>
                </Group>

                <Progress
                  value={xpPercentage}
                  size="lg"
                  radius="xl"
                  striped={mascotState.mood === "happy"}
                  animated={mascotState.mood === "happy"}
                  style={{
                    background: isDark
                      ? `${theme.colors.dark[6]}80`
                      : `${theme.white}60`,
                    boxShadow: `inset 0 2px 4px ${
                      isDark ? theme.colors.dark[9] : theme.colors.gray[3]
                    }30`,
                    border: `1px solid ${
                      isDark ? theme.colors.dark[4] : theme.colors.gray[2]
                    }`,
                  }}
                  styles={{
                    section: {
                      background: `linear-gradient(90deg, ${stateColors.primary} 0%, ${stateColors.border} 100%)`,
                    },
                  }}
                />

                <Transition
                  mounted={true}
                  transition="slide-left"
                  duration={500}
                  key={showTip}
                >
                  {(tipStyles) => (
                    <Tooltip
                      label={
                        mascotState.tips[showTip].length > 40
                          ? `💡 ${mascotState.tips[showTip]}`
                          : null
                      }
                      multiline
                      w={280}
                      disabled={mascotState.tips[showTip].length <= 40}
                    >
                      <Text
                        size="xs"
                        ta="center"
                        c={isDark ? theme.colors.gray[2] : theme.colors.gray[7]}
                        fw={500}
                        style={{
                          ...tipStyles,
                          background: isDark
                            ? `${theme.colors.dark[6]}90`
                            : `${theme.white}80`,
                          padding: "8px 16px",
                          borderRadius: "16px",
                          backdropFilter: "blur(10px)",
                          border: `1px solid ${stateColors.light}`,
                          boxShadow: `0 2px 8px ${stateColors.primary}20`,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          cursor:
                            mascotState.tips[showTip].length > 40
                              ? "help"
                              : "default",
                        }}
                      >
                        💡 {mascotState.tips[showTip]}
                      </Text>
                    </Tooltip>
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
