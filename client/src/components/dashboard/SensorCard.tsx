import {
  Box,
  Center,
  Group,
  Paper,
  RingProgress,
  Text,
  ThemeIcon,
  Transition,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useEffect, useState } from "react";

interface SensorCardProps {
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  color: string;
}

export function SensorCard({
  title,
  value,
  unit,
  icon,
  color,
}: SensorCardProps) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const [isVisible, setIsVisible] = useState(false);
  const isDark = colorScheme === "dark";

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getProgressValue = () => {
    if (title.includes("Umidade")) return Math.min(value, 100);
    if (title.includes("Temperatura")) return Math.min((value / 40) * 100, 100);
    if (title.includes("Luminosidade"))
      return Math.min((value / 1000) * 100, 100);
    if (title.includes("Nível")) return Math.min(value, 100);
    if (title.includes("Condição"))
      return value === 1 ? 100 : value === 0 ? 25 : 75;
    return Math.min(value, 100);
  };

  const progressValue = getProgressValue();

  return (
    <>
      <style>
        {`
          @keyframes sensorPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
          }
          @keyframes sensorGlow {
            0%, 100% { box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
            50% { box-shadow: 0 4px 16px rgba(0,0,0,0.2); }
          }
          .sensor-card {
            transition: all 0.3s ease;
            cursor: pointer;
          }
          .sensor-card:hover {
            transform: translateY(-2px);
            animation: sensorGlow 2s ease-in-out infinite;
          }
        `}
      </style>

      <Transition mounted={isVisible} transition="slide-up" duration={400}>
        {(styles) => (
          <Paper
            className="sensor-card"
            p="lg"
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
                ? `0 4px 16px ${theme.colors.dark[9]}40`
                : `0 4px 16px ${theme.colors.gray[4]}20`,
            }}
          >
            <Group justify="space-between" align="center">
              <Box style={{ flex: 1 }}>
                <Text
                  c={isDark ? "dimmed" : "gray.7"}
                  size="xs"
                  tt="uppercase"
                  fw={600}
                  mb="xs"
                >
                  {title}
                </Text>
                <Text fw={700} size="xl" c={isDark ? "gray.1" : "gray.9"}>
                  {title.includes("Condição")
                    ? unit
                    : `${value.toFixed(1)} ${unit}`}
                </Text>
              </Box>

              <Box style={{ position: "relative" }}>
                <RingProgress
                  size={70}
                  roundCaps
                  thickness={6}
                  sections={[{ value: progressValue, color }]}
                  label={
                    <Center>
                      <ThemeIcon
                        size={30}
                        radius="md"
                        variant="light"
                        color={color}
                        style={{
                          animation:
                            progressValue > 80
                              ? "sensorPulse 2s ease-in-out infinite"
                              : "none",
                        }}
                      >
                        {icon}
                      </ThemeIcon>
                    </Center>
                  }
                />
              </Box>
            </Group>
          </Paper>
        )}
      </Transition>
    </>
  );
}
