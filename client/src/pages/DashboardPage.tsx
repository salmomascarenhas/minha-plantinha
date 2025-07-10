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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AiAssistant } from "../components/dashboard/AiAssistant";
import { ApiKeyDisplayModal } from "../components/dashboard/ApiKeyDisplayModal";
import { GamificationStatus } from "../components/dashboard/GamificationStatus";
import { HistoryChart } from "../components/dashboard/HistoryChart";
import { ManualControls } from "../components/dashboard/ManualControls";
import { MascotDisplay } from "../components/dashboard/MascotDisplay";
import { NoPlantView } from "../components/dashboard/NoPlantView";
import { PlantRegisterForm } from "../components/dashboard/PlantRegisterForm";
import { SensorCard } from "../components/dashboard/SensorCard";
import api from "../services/apiService";

export function DashboardPage() {
  const queryClient = useQueryClient();
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

  // Função para gerenciar o reetch do React Query
  useEffect(() => {
    if (registerModalOpened) {
      queryClient.setQueryDefaults(["myPlantData"], { refetchInterval: false });
    } else {
      queryClient.setQueryDefaults(["myPlantData"], { refetchInterval: 10000 });
    }
  }, [registerModalOpened, queryClient]);

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
  }); // Remove o refetchInterval daqui pois agora é gerenciado dinamicamente

  const { data: gamificationData, isLoading: isLoadingGamification } = useQuery(
    {
      queryKey: ["gamificationStatus"],
      queryFn: () => api.get("/gamification/status").then((res) => res.data),
      enabled: !!plantData,
    }
  );

  // Enquanto a query principal carrega, mostre o loader principal
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

  // O componente agora retorna uma estrutura principal única
  return (
    <>
      {/* 1. MOVA OS MODAIS PARA CÁ: Eles agora existem fora de qualquer condição */}
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

      {/* 2. A lógica condicional decide o que mostrar no corpo da página */}
      {plantData ? (
        // Se HÁ planta, mostre o dashboard completo
        (() => {
          const { plant } = plantData;
          const latestReading = plant.SensorData?.[0];

          return (
            <Stack gap="xl">
              <Title order={1}>
                Painel de Controle: {plantData.plant.name}
              </Title>

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
                    <AiAssistant plantId={plant.id} />
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
                        <Text>
                          Aguardando primeira leitura do dispositivo...
                        </Text>
                      </Paper>
                    )}
                    <ManualControls plantId={plant.id} />
                  </Stack>
                </Grid.Col>
              </Grid>
            </Stack>
          );
        })()
      ) : (
        // Se NÃO HÁ planta, mostre a NoPlantView
        <NoPlantView onRegisterClick={openRegisterModal} />
      )}
    </>
  );
}
