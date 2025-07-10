import { Button, Group, Paper, Stack, Title } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconDroplet, IconUmbrella } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/apiService";

interface ManualControlsProps {
  plantId: string;
}

type CommandBody = {
  action: "WATER_PUMP" | "COVER";
  duration?: number;
  state?: "TOGGLE";
};

export function ManualControls({ plantId }: ManualControlsProps) {
  const queryClient = useQueryClient();

  const sendCommandMutation = useMutation({
    mutationFn: (command: CommandBody) =>
      api.post(`/plants/${plantId}/command`, command),
    onSuccess: async (_, variables) => {
      const successMessage =
        variables.action === "WATER_PUMP"
          ? "Comando para regar enviado!"
          : "Comando da lona enviado!";
      notifications.show({
        title: "Comando Recebido",
        message: successMessage,
        color: "green",
      });

      await queryClient.invalidateQueries({ queryKey: ["gamificationStatus"] });
    },
    onError: (error) => {
      notifications.show({
        title: "Erro ao Enviar Comando",
        message: error.message,
        color: "red",
      });
    },
  });

  return (
    <Paper p="md" radius="md">
      <Stack>
        <Title order={4}>⚙️ Controles Manuais</Title>
        <Group grow>
          <Button
            leftSection={<IconDroplet size={18} />}
            color="blue"
            loading={
              sendCommandMutation.isPending &&
              sendCommandMutation.variables?.action === "WATER_PUMP"
            }
            onClick={() =>
              sendCommandMutation.mutate({ action: "WATER_PUMP", duration: 5 })
            }
          >
            Regar Agora
          </Button>
          <Button
            leftSection={<IconUmbrella size={18} />}
            variant="default"
            loading={
              sendCommandMutation.isPending &&
              sendCommandMutation.variables?.action === "COVER"
            }
            onClick={() =>
              sendCommandMutation.mutate({ action: "COVER", state: "TOGGLE" })
            }
          >
            Acionar Lona
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
}
