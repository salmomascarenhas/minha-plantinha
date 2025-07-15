import {
  Box,
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
import {
  IconDroplet,
  IconPlant2,
  IconSun,
  IconSunOff,
  IconTemperature,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
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

const convertHumidityToPercentage = (rawValue: number) => {
  const DRY_VALUE = 2300;
  const WET_VALUE = 1100;

  const percentage = ((DRY_VALUE - rawValue) / (DRY_VALUE - WET_VALUE)) * 100;

  return Math.round(Math.max(0, Math.min(100, percentage)));
};

export function DashboardPage() {
  const [
    registerModalOpened,
    { open: openRegisterModal, close: closeRegisterModal },
  ] = useDisclosure(false);
  const [newlyGeneratedApiKey, setNewlyGeneratedApiKey] = useState<
    string | null
  >(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
      <style>
        {`
          @keyframes dashboardEntry {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes dashboardFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }
          
          .dashboard-container {
            animation: ${isLoaded ? "dashboardEntry 0.8s ease-out" : "none"};
            transition: all 0.3s ease;
          }
          
          .gamified-section {
            transition: all 0.3s ease;
          }
          
          .gamified-section:hover {
            animation: dashboardFloat 3s ease-in-out infinite;
          }
        `}
      </style>

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
        <Box className="dashboard-container">
          {(() => {
            const { plant } = plantData;
            const latestReading = plant.SensorData?.[0];
            return (
              <Stack gap="xl">
                <Title order={1}>Painel de Controle: {plant.name}</Title>
                {/* Gamification Status */}
                <Box className="gamified-section">
                  {isLoadingGamification ? (
                    <Paper p="lg" radius="md" withBorder>
                      <Loader size="sm" />
                    </Paper>
                  ) : (
                    gamificationData && (
                      <GamificationStatus {...gamificationData} />
                    )
                  )}
                </Box>{" "}
                {/* Layout Responsivo Melhorado */}
                <Box className="gamified-section">
                  <Grid>
                    {/* Coluna Principal - Sensores e Status (Prioridade Mobile) */}
                    <Grid.Col
                      span={{ base: 12, md: 8 }}
                      order={{ base: 1, md: 2 }}
                    >
                      <Stack>
                        {/* Sensores Principais - Medições */}
                        <Box className="gamified-section">
                          <Grid>
                            {/* Primeira linha - Sensores ambientais */}
                            {typeof latestReading?.humidity === "number" && (
                              <Grid.Col span={{ base: 6, sm: 4, lg: 3 }}>
                                <SensorCard
                                  title="Umidade Solo"
                                  value={convertHumidityToPercentage(
                                    latestReading.humidity
                                  )}
                                  unit="%"
                                  icon={<IconDroplet />}
                                  color="blue"
                                />
                              </Grid.Col>
                            )}
                            {typeof latestReading?.temperature === "number" && (
                              <Grid.Col span={{ base: 6, sm: 4, lg: 3 }}>
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
                              <Grid.Col span={{ base: 6, sm: 4, lg: 3 }}>
                                <SensorCard
                                  title="Luminosidade"
                                  value={latestReading.luminosity}
                                  unit="lux"
                                  icon={<IconSun />}
                                  color="yellow"
                                />
                              </Grid.Col>
                            )}

                            {/* Segunda linha - Medições do sistema */}
                            {typeof latestReading?.waterLevel === "number" && (
                              <Grid.Col span={{ base: 6, sm: 4, lg: 3 }}>
                                <SensorCard
                                  title="Nível do Reservatório"
                                  value={latestReading.waterLevel}
                                  unit="cm"
                                  icon={<IconDroplet />}
                                  color={
                                    latestReading.waterLevel < 10
                                      ? "red"
                                      : latestReading.waterLevel < 30
                                      ? "yellow"
                                      : "myGreen"
                                  }
                                />
                              </Grid.Col>
                            )}

                            {typeof latestReading?.soilStatus === "number" && (
                              <Grid.Col span={{ base: 6, sm: 4, lg: 3 }}>
                                <SensorCard
                                  title="Condição do Solo"
                                  value={latestReading.soilStatus}
                                  unit={
                                    latestReading.soilStatus === 0
                                      ? "Seco"
                                      : latestReading.soilStatus === 1
                                      ? "Úmido"
                                      : "Encharcado"
                                  }
                                  color={
                                    latestReading.soilStatus === 0
                                      ? "yellow"
                                      : latestReading.soilStatus === 1
                                      ? "myGreen"
                                      : "blue"
                                  }
                                  icon={
                                    latestReading.soilStatus === 0 ? (
                                      <IconSunOff size={24} />
                                    ) : latestReading.soilStatus === 1 ? (
                                      <IconPlant2 size={24} />
                                    ) : (
                                      <IconDroplet size={24} />
                                    )
                                  }
                                />
                              </Grid.Col>
                            )}
                          </Grid>
                        </Box>

                        <Box className="gamified-section">
                          <DeviceStatus
                            wifiSignal={latestReading?.wifiSignal}
                            rainDetected={latestReading?.rainDetected}
                            pumpStatus={latestReading?.pumpStatus}
                            coverStatus={latestReading?.coverStatus}
                          />
                        </Box>

                        <Box className="gamified-section">
                          <HistoryChart plantId={plant.id} />
                        </Box>
                      </Stack>
                    </Grid.Col>

                    {/* Coluna Secundária - Mascote e IA (Mobile fica abaixo) */}
                    <Grid.Col
                      span={{ base: 12, md: 4 }}
                      order={{ base: 2, md: 1 }}
                    >
                      <Stack>
                        <MascotDisplay
                          soilStatus={latestReading?.soilStatus}
                          plantName={plant.name}
                          level={level}
                          xp={currentLevelXp}
                          maxXp={100}
                        />
                        <ManualControls plantId={plant.id} />
                        <AiAssistant
                          plantId={plant.id}
                          plantName={plant.name}
                        />
                      </Stack>
                    </Grid.Col>
                  </Grid>
                </Box>
              </Stack>
            );
          })()}
        </Box>
      ) : (
        <NoPlantView onRegisterClick={openRegisterModal} />
      )}
    </>
  );
}
