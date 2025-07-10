import { Center, Group, Paper, RingProgress, Text } from '@mantine/core';

interface SensorCardProps {
  title: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  color: string;
}

export function SensorCard({ title, value, unit, icon, color }: SensorCardProps) {
  return (
    <Paper p="md" radius="md">
      <Group>
        <RingProgress
          size={80}
          roundCaps
          thickness={8}
          sections={[{ value: value, color }]}
          label={<Center>{icon}</Center>}
        />
        <div>
          <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
            {title}
          </Text>
          <Text fw={700} size="xl">
            {value.toFixed(1)} {unit}
          </Text>
        </div>
      </Group>
    </Paper>
  );
}
