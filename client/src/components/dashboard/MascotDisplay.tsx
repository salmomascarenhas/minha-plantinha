import { Center, Paper, Stack, Text } from "@mantine/core";

interface MascotDisplayProps {
  humidity?: number;
}

// Função auxiliar para determinar o estado do mascote
function getMascotState(humidity?: number) {
  if (typeof humidity === "undefined") {
    return { emoji: "🤔", text: "Esperando para ver como estou..." };
  }
  if (humidity > 75) {
    return { emoji: "😅", text: "Ufa, um pouco de água a mais!" };
  }
  if (humidity > 40) {
    return { emoji: "😄", text: "Estou feliz e hidratado!" };
  }
  if (humidity > 20) {
    return { emoji: "😟", text: "Estou com um pouco de sede." };
  }
  return { emoji: "🥵", text: "SOCORRO, ESTOU SECO!" };
}

export function MascotDisplay({ humidity }: MascotDisplayProps) {
  const { emoji, text } = getMascotState(humidity);

  return (
    <Paper p="lg" radius="md" h={200}>
      <Center h="100%">
        <Stack align="center" gap="xs">
          <Text style={{ fontSize: "5rem" }}>{emoji}</Text>
          <Text fw={500} size="lg">
            {text}
          </Text>
        </Stack>
      </Center>
    </Paper>
  );
}
