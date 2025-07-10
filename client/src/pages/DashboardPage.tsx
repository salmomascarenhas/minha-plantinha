import { Center, Grid, Loader, Paper, Stack, Text, Title } from "@mantine/core";
import { IconDroplet, IconSun, IconTemperature } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { GamificationStatus } from "../components/dashboard/GamificationStatus";
import { HistoryChart } from "../components/dashboard/HistoryChart";
import { ManualControls } from "../components/dashboard/ManualControls";
import { MascotDisplay } from "../components/dashboard/MascotDisplay";
import { NoPlantView } from "../components/dashboard/NoPlantView";
import { SensorCard } from "../components/dashboard/SensorCard";
import api from "../services/apiService";

export function DashboardPage() {
  const {
    data: plantData,
    isLoading: isLoadingPlant,
    isError: isErrorPlant,
    error: plantError,
  } = useQuery({
    queryKey: ["myPlantData"],
    queryFn: () => api.get("/plants/my-plant").then((res) => res.data),
    retry: (failureCount, error: any) =>
      error.response?.status !== 404 && failureCount < 3,
  });

  const { data: gamificationData, isLoading: isLoadingGamification } = useQuery(
    {
      queryKey: ["gamificationStatus"],
      queryFn: () =>
        api.get("/api/gamification/status").then((res) => res.data),
      enabled: !!plantData,
    }
  );

  if (isLoadingPlant) {
    return (
      <Center h="80vh">
        <Loader size="xl" />
      </Center>
    );
  }

  if (isErrorPlant && (plantError as any).response?.status === 404) {
    return <NoPlantView />;
  }

  if (isErrorPlant || !plantData) {
    return (
      <Center h="80vh">
        <Text c="red">Erro ao carregar dados do dashboard.</Text>
      </Center>
    );
  }

  const { plant } = plantData;
  const latestReading = plant.SensorData?.[0];

  return (
    <Stack gap="xl">
      <Title order={1}>Painel de Controle: {plant.name}</Title>

      {isLoadingGamification ? (
        <Paper p="lg" radius="md" withBorder>
          <Loader size="sm" />
        </Paper>
      ) : (
        gamificationData && <GamificationStatus {...gamificationData} />
      )}

      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack>
            <MascotDisplay humidity={latestReading?.humidity} />
            <HistoryChart plantId={plant.id} />
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
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
            <ManualControls plantId={plant.id} />
          </Stack>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
