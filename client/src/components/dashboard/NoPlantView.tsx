import { Button, Paper, Stack, Text, Title } from '@mantine/core';

export function NoPlantView() {
  // Futuramente, este botão pode abrir um modal de cadastro.
  const handleAddPlant = () => {
    alert('Redirecionando para o cadastro de planta...');
  };

  return (
    <Paper p="xl" ta="center">
      <Stack align="center">
        <Text fz={50}>🤔</Text>
        <Title order={2}>Nenhuma planta encontrada!</Title>
        <Text c="dimmed">Parece que você ainda não cadastrou uma plantinha para monitorar.</Text>
        <Button color="green" size="md" mt="lg" onClick={handleAddPlant}>
          🌿 Cadastrar minha primeira planta
        </Button>
      </Stack>
    </Paper>
  );
}
