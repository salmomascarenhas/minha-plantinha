import {
  Center,
  Grid,
  Loader,
  Modal,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDroplet, IconSun, IconTemperature } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AiAssistant } from "../components/dashboard/AiAssistant";
import { ApiKeyDisplayModal } from "../components/dashboard/ApiKeyDisplayModal";
import { DeviceStatus } from "../components/dashboard/DeviceStatus";
import { GamificationStatus } from "../components/dashboard/GamificationStatus";
import { HistoryChart } from "../components/dashboard/HistoryChart";
import { ManualControls } from "../components/dashboard/ManualControls";
import { MascotDisplay } from "../components/dashboard/MascotDisplay";
import { NoPlantView } from "../components/dashboard/NoPlantView";
import { PlantRegisterForm } from "../components/dashboard/PlantRegisterForm";
import { SensorCard } from "../components/dashboard/SensorCard";
import api from "../services/apiService";

export function DashboardPage() {
  const [
    registerModalOpened,
    { open: openRegisterModal, close: closeRegisterModal },
  ] = useDisclosure(false);
  const [newlyGeneratedApiKey, setNewlyGeneratedApiKey] = useState<
    string | null
  >(null);

  const handleRegistrationSuccess = (apiKey: string) => {
    closeRegisterModal();
    setNewlyGeneratedApiKey(apiKey);
  };

  const handleApiKeyModalClose = () => {
    setNewlyGeneratedApiKey(null);
  };

  const {
    data: plantData,
    isLoading: isLoadingPlant,
    isError: isErrorPlant,
    error: plantError,
  } = useQuery({
    queryKey: ["myPlantData"],
    queryFn: () => api.get("/plants/my-plant").then((res) => res.data),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    retry: (failureCount, error: any) =>
      error.response?.status !== 404 && failureCount < 3,
    refetchInterval: registerModalOpened ? false : 10000,
  });

  const { data: gamificationData, isLoading: isLoadingGamification } = useQuery(
    {
      queryKey: ["gamificationStatus"],
      queryFn: () => api.get("/gamification/status").then((res) => res.data),
      enabled: !!plantData, // Só busca dados de gamificação se a planta existir
    }
  );

  if (isLoadingPlant) {
    return (
      <Center h="80vh">
        <Loader size="xl" />
      </Center>
    );
  }

  // Se houver um erro que NÃO SEJA 404, mostre a mensagem de erro.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (isErrorPlant && (plantError as any).response?.status !== 404) {
    return (
      <Center h="80vh">
        <Text c="red">Erro ao carregar dados do dashboard.</Text>
      </Center>
    );
  }

  const level = gamificationData?.points
    ? Math.floor(gamificationData.points / 100) + 1
    : 1;
  const currentLevelXp = gamificationData?.points
    ? gamificationData.points % 100
    : 0;

  return (
    <>
      <Modal
        opened={registerModalOpened}
        onClose={closeRegisterModal}
        title={<Title order={3}>Cadastrar Nova Planta</Title>}
        centered
      >
        <PlantRegisterForm onSuccess={handleRegistrationSuccess} />
      </Modal>

      <ApiKeyDisplayModal
        apiKey={newlyGeneratedApiKey}
        onClose={handleApiKeyModalClose}
      />

      {plantData ? (
        (() => {
          const { plant } = plantData;
          const latestReading = plant.SensorData?.[0];
          return (
            <Stack gap="xl">
              <Title order={1}>Painel de Controle: {plant.name}</Title>

              {/* Gamification Status */}
              {isLoadingGamification ? (
                <Paper p="lg" radius="md" withBorder>
                  <Loader size="sm" />
                </Paper>
              ) : (
                gamificationData && <GamificationStatus {...gamificationData} />
              )}

              {/* Layout Responsivo Melhorado */}
              <Grid>
                {/* Coluna Principal - Sensores e Status (Prioridade Mobile) */}
                <Grid.Col span={{ base: 12, md: 8 }} order={{ base: 1, md: 2 }}>
                  <Stack>
                    {/* Sensores Principais */}
                    <Grid>
                      {typeof latestReading?.humidity === "number" && (
                        <Grid.Col span={{ base: 6, sm: 4 }}>
                          <SensorCard
                            title="Umidade Solo"
                            value={latestReading.humidity}
                            unit="%"
                            icon={<IconDroplet />}
                            color="blue"
                          />
                        </Grid.Col>
                      )}
                      {typeof latestReading?.temperature === "number" && (
                        <Grid.Col span={{ base: 6, sm: 4 }}>
                          <SensorCard
                            title="Temperatura"
                            value={latestReading.temperature}
                            unit="°C"
                            icon={<IconTemperature />}
                            color="orange"
                          />
                        </Grid.Col>
                      )}
                      {typeof latestReading?.luminosity === "number" && (
                        <Grid.Col span={{ base: 6, sm: 4 }}>
                          <SensorCard
                            title="Luminosidade"
                            value={latestReading.luminosity}
                            unit="lux"
                            icon={<IconSun />}
                            color="yellow"
                          />
                        </Grid.Col>
                      )}
                    </Grid>
                    <DeviceStatus
                      wifiSignal={latestReading?.wifiSignal}
                      waterLevel={latestReading?.waterLevel}
                      rainDetected={latestReading?.rainDetected}
                      pumpStatus={latestReading?.pumpStatus}
                      coverStatus={latestReading?.coverStatus}
                      soilStatus={latestReading?.soilStatus}
                    />

                    <HistoryChart plantId={plant.id} />
                  </Stack>
                </Grid.Col>

                {/* Coluna Secundária - Mascote e IA (Mobile fica abaixo) */}
                <Grid.Col span={{ base: 12, md: 4 }} order={{ base: 2, md: 1 }}>
                  <Stack>
                    <MascotDisplay
                      soilStatus={latestReading?.soilStatus}
                      plantName={plant.name}
                      level={level}
                      xp={currentLevelXp}
                      maxXp={100}
                    />
                    <ManualControls plantId={plant.id} />
                    <AiAssistant plantId={plant.id} plantName={plant.name} />
                  </Stack>
                </Grid.Col>
              </Grid>
            </Stack>
          );
        })()
      ) : (
        <NoPlantView onRegisterClick={openRegisterModal} />
      )}
    </>
  );
}
