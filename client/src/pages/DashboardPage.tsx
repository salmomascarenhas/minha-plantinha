import { Center, Grid, Loader, Paper, Stack, Text, Title } from '@mantine/core';
import { IconDroplet, IconSun, IconTemperature } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { HistoryChart } from '../components/dashboard/HistoryChart';
import { NoPlantView } from '../components/dashboard/NoPlantView';
import { SensorCard } from '../components/dashboard/SensorCard';
import api from '../services/apiService';

export function DashboardPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['myPlantData'],
    queryFn: () => api.get('/plants/my-plant').then((res) => res.data),
    retry: (failureCount, error: any) => {
      // Não tenta novamente se o erro for 404 (planta não encontrada)
      if (error.response?.status === 404) return false;
      return failureCount < 3;
    },
  });

  if (isLoading) {
    return (
      <Center h="80vh">
        <Loader size="xl" />
      </Center>
    );
  }

  // Tratamento específico para o erro 404
  if (isError && (error as any).response?.status === 404) {
    return <NoPlantView />;
  }

  if (isError || !data) {
    return (
      <Center h="80vh">
        <Text c="red">Erro ao carregar dados do dashboard.</Text>
      </Center>
    );
  }

  const { plant } = data;
  const latestReading = plant.SensorData?.[0];

  return (
    <Stack gap="xl">
      <Title order={1}>Painel de Controle: {plant.name}</Title>
      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          {/* Coluna Principal com o Gráfico (e futuramente, o mascote) */}
          <Stack>
            {/* Aqui entrará o MascoteDisplay.tsx */}
            <Paper p="md" h={200}>
              <Center>Espaço do Mascote (Rive)</Center>
            </Paper>
            <HistoryChart plantId={plant.id} />
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          {/* Coluna Lateral com Sensores e Controles */}
          <Stack>
            {latestReading ? (
              <>
                <SensorCard
                  title="Umidade"
                  value={latestReading.humidity}
                  unit="%"
                  icon={<IconDroplet />}
                  color="blue"
                />
                <SensorCard
                  title="Temperatura"
                  value={latestReading.temperature}
                  unit="°C"
                  icon={<IconTemperature />}
                  color="orange"
                />
                <SensorCard
                  title="Luminosidade"
                  value={latestReading.luminosity}
                  unit="lux"
                  icon={<IconSun />}
                  color="yellow"
                />
              </>
            ) : (
              <Paper p="md">
                <Text>Aguardando primeira leitura do dispositivo...</Text>
              </Paper>
            )}
            {/* Aqui entrarão os Controles Manuais */}
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
