import { Button, Paper, Stack, Text, Title } from "@mantine/core";

interface NoPlantViewProps {
  onRegisterClick: () => void;
}

export function NoPlantView({ onRegisterClick }: NoPlantViewProps) {
  return (
    <Paper p="xl" ta="center">
      <Stack align="center">
        <Text fz={50}>🤔</Text>
        <Title order={2}>Nenhuma planta encontrada!</Title>
        <Text c="dimmed">
          Parece que você ainda não cadastrou uma plantinha para monitorar.
        </Text>
        <Button color="green" size="md" mt="lg" onClick={onRegisterClick}>
          🌿 Cadastrar minha primeira planta
        </Button>
      </Stack>
    </Paper>
  );
}
