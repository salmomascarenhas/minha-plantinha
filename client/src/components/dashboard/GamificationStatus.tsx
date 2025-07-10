import {
  Avatar,
  Group,
  Paper,
  SimpleGrid,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconStar } from "@tabler/icons-react";

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

export function GamificationStatus({
  points,
  achievements,
}: GamificationStatusProps) {
  return (
    <Paper p="lg" radius="md">
      <Group justify="space-between" mb="md">
        <Title order={3}>Meu Progresso</Title>
        <Group gap="xs">
          <IconStar size={24} color="gold" />
          <Text size="xl" fw={700}>
            {points} Pontos
          </Text>
        </Group>
      </Group>

      <Text size="sm" c="dimmed" mb="xs">
        Conquistas Desbloqueadas:
      </Text>
      {achievements.length > 0 ? (
        <SimpleGrid cols={{ base: 4, sm: 6, md: 8 }} spacing="sm">
          {achievements.map((record) => (
            <Tooltip
              key={record.id}
              label={`${record.achievement.name}: ${record.achievement.description}`}
              withArrow
              position="top"
            >
              <Avatar size="md" radius="xl">
                {record.achievement.icon}
              </Avatar>
            </Tooltip>
          ))}
        </SimpleGrid>
      ) : (
        <Text size="sm" c="dimmed" fs="italic">
          Continue cuidando da sua planta para desbloquear conquistas!
        </Text>
      )}
    </Paper>
  );
}
