import {
  Avatar,
  Badge,
  Box,
  Group,
  Paper,
  Progress,
  SimpleGrid,
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
  IconCrown,
  IconFlame,
  IconMedal,
  IconStar,
  IconTarget,
  IconTrophy,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface AchievementRecord {
  id: string;
  unlockedAt: string;
  achievement: {
    name: string;
    description: string;
    icon: string;
  };
}

interface GamificationStatusProps {
  points: number;
  achievements: AchievementRecord[];
}

function getPlayerLevel(points: number) {
  // Cada nível requer: 100, 300, 600, 1000, 1500, 2100, etc.
  let level = 1;
  let requiredXP = 100;
  let totalXP = 0;

  while (points >= totalXP + requiredXP) {
    totalXP += requiredXP;
    level++;
    requiredXP = level * 150;
  }

  return {
    level,
    currentXP: points - totalXP,
    requiredXP,
    totalXP,
    progress: ((points - totalXP) / requiredXP) * 100,
  };
}

function getPlayerStatus(level: number) {
  if (level >= 20)
    return { title: "Mestre Jardineiro", icon: IconCrown, color: "yellow" };
  if (level >= 15)
    return { title: "Especialista Verde", icon: IconTrophy, color: "orange" };
  if (level >= 10)
    return { title: "Cuidador Dedicado", icon: IconMedal, color: "grape" };
  if (level >= 5)
    return { title: "Plantador Experiente", icon: IconTarget, color: "blue" };
  return { title: "Novato Entusiasta", icon: IconFlame, color: "green" };
}

const animationStyles = {
  pointsPulse: {
    animation: "pointsPulse 2s ease-in-out infinite",
  },
  achievementFloat: {
    animation: "achievementFloat 3s ease-in-out infinite",
  },
  progressGlow: {
    animation: "progressGlow 2s ease-in-out infinite alternate",
  },
  "@keyframes pointsPulse": {
    "0%, 100%": { transform: "scale(1)" },
    "50%": { transform: "scale(1.05)" },
  },
  "@keyframes achievementFloat": {
    "0%, 100%": { transform: "translateY(0px)" },
    "50%": { transform: "translateY(-3px)" },
  },
  "@keyframes progressGlow": {
    "0%": { filter: "brightness(1)" },
    "100%": { filter: "brightness(1.2)" },
  },
};

export function GamificationStatus({
  points,
  achievements,
}: GamificationStatusProps) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const [showProgress, setShowProgress] = useState(false);

  const playerData = getPlayerLevel(points);
  const playerStatus = getPlayerStatus(playerData.level);

  const isDark = colorScheme === "dark";
  const primaryColor = theme.colors.myGreen[isDark ? 4 : 7];
  const successColor = theme.colors.myGreen[isDark ? 3 : 8];

  useEffect(() => {
    setShowProgress(true);
  }, []);

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
          background: `radial-gradient(circle at 20% 20%, ${primaryColor}15 0%, transparent 50%)`,
          pointerEvents: "none",
        }}
      />

      {/* Header com nível e status */}
      <Stack gap="md" style={{ position: "relative", zIndex: 1 }}>
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
              style={animationStyles.pointsPulse}
            >
              <playerStatus.icon size={24} />
            </ThemeIcon>
            <Box>
              <Title order={3} c={isDark ? theme.white : theme.black}>
                Nível {playerData.level}
              </Title>
              <Text
                size="sm"
                c={isDark ? theme.colors.gray[4] : theme.colors.gray[7]}
              >
                {playerStatus.title}
              </Text>
            </Box>
          </Group>

          <Badge
            size="lg"
            variant="gradient"
            gradient={{
              from: theme.colors.yellow[4],
              to: theme.colors.orange[5],
              deg: 45,
            }}
            style={animationStyles.pointsPulse}
          >
            <Group gap={4}>
              <IconStar size={16} />
              <Text fw={700}>{points.toLocaleString()}</Text>
            </Group>
          </Badge>
        </Group>

        {/* Barra de progresso do XP */}
        <Box>
          <Group justify="space-between" mb={4}>
            <Text
              size="sm"
              fw={500}
              c={isDark ? theme.colors.gray[3] : theme.colors.gray[7]}
            >
              Progresso para o Nível {playerData.level + 1}
            </Text>
            <Text
              size="xs"
              c={isDark ? theme.colors.gray[5] : theme.colors.gray[6]}
            >
              {playerData.currentXP}/{playerData.requiredXP} XP
            </Text>
          </Group>

          <Transition
            mounted={showProgress}
            transition="slide-right"
            duration={1000}
          >
            {(styles) => (
              <Progress
                value={playerData.progress}
                size="lg"
                radius="xl"
                style={{
                  ...styles,
                  ...animationStyles.progressGlow,
                }}
                styles={{
                  root: {
                    backgroundColor: isDark
                      ? theme.colors.dark[4]
                      : theme.colors.gray[3],
                    border: `1px solid ${
                      isDark ? theme.colors.dark[3] : theme.colors.gray[4]
                    }`,
                  },
                  section: {
                    background: `linear-gradient(90deg, ${primaryColor} 0%, ${successColor} 100%)`,
                    boxShadow: `0 0 10px ${primaryColor}40`,
                  },
                }}
              />
            )}
          </Transition>
        </Box>

        {/* Seção de conquistas */}
        <Box>
          <Group justify="space-between" align="center" mb="sm">
            <Text
              fw={600}
              c={isDark ? theme.colors.gray[2] : theme.colors.gray[8]}
            >
              Conquistas Desbloqueadas
            </Text>
            <Badge variant="light" color={playerStatus.color} size="sm">
              {achievements.length} conquistas
            </Badge>
          </Group>

          {achievements.length > 0 ? (
            <SimpleGrid cols={{ base: 4, sm: 6, md: 8 }} spacing="sm">
              {achievements.map((record, index) => (
                <Tooltip
                  key={record.id}
                  label={
                    <Box p={4}>
                      <Text fw={600} size="sm">
                        {record.achievement.name}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {record.achievement.description}
                      </Text>
                      <Text size="xs" c="dimmed" mt={2}>
                        Desbloqueado em:{" "}
                        {new Date(record.unlockedAt).toLocaleDateString()}
                      </Text>
                    </Box>
                  }
                  withArrow
                  position="top"
                  multiline
                  w={200}
                >
                  <Avatar
                    size="md"
                    radius="xl"
                    style={{
                      ...animationStyles.achievementFloat,
                      animationDelay: `${index * 0.1}s`,
                      background: `linear-gradient(135deg, ${primaryColor} 0%, ${successColor} 100%)`,
                      border: `2px solid ${
                        isDark ? theme.colors.dark[3] : theme.white
                      }`,
                      boxShadow: `0 4px 12px ${primaryColor}30`,
                      cursor: "pointer",
                      transition: "transform 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform =
                        "scale(1.1) translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform =
                        "scale(1) translateY(0px)";
                    }}
                  >
                    <Text size="lg">{record.achievement.icon}</Text>
                  </Avatar>
                </Tooltip>
              ))}
            </SimpleGrid>
          ) : (
            <Paper
              p="md"
              radius="md"
              style={{
                background: isDark
                  ? `linear-gradient(135deg, ${theme.colors.dark[6]} 0%, ${theme.colors.dark[5]} 100%)`
                  : `linear-gradient(135deg, ${theme.colors.gray[0]} 0%, ${theme.white} 100%)`,
                border: `1px dashed ${
                  isDark ? theme.colors.dark[3] : theme.colors.gray[5]
                }`,
                textAlign: "center",
              }}
            >
              <Stack gap="xs" align="center">
                <ThemeIcon size="lg" radius="xl" variant="light" color="gray">
                  <IconTarget size={20} />
                </ThemeIcon>
                <Text size="sm" c="dimmed" fw={500}>
                  Continue cuidando da sua planta para desbloquear conquistas!
                </Text>
                <Text size="xs" c="dimmed">
                  Próxima conquista em{" "}
                  {playerData.requiredXP - playerData.currentXP} pontos
                </Text>
              </Stack>
            </Paper>
          )}
        </Box>
      </Stack>
    </Paper>
  );
}
