import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/apiService";

interface PlantRegisterFormProps {
  onSuccess: (apiKey: string) => void;
}

interface Plant {
  id: string;
  name: string;
  species: string;
  deviceId: string;
  pendingCommand: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface CreatePlantResponse {
  plant: Plant;
  apiKey: string;
}

export function PlantRegisterForm({ onSuccess }: PlantRegisterFormProps) {
  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      name: "",
      species: "",
      deviceId: "",
    },
    validate: {
      name: (value) =>
        value.trim().length > 0 ? null : "O nome é obrigatório",
      species: (value) =>
        value.trim().length > 0 ? null : "A espécie é obrigatória",
      deviceId: (value) =>
        value.trim().length > 0 ? null : "O ID do dispositivo é obrigatório",
    },
  });

  const createPlantMutation = useMutation({
    mutationFn: (newPlant: typeof form.values) =>
      api
        .post<CreatePlantResponse>("/plants", newPlant)
        .then((res) => res.data),
    onSuccess: (data) => {
      notifications.show({
        title: "Sucesso!",
        message: "Sua planta foi cadastrada e já estamos monitorando-a.",
        color: "green",
      });
      queryClient.invalidateQueries({ queryKey: ["myPlantData"] });
      onSuccess(data.apiKey);
    },
    onError: (error: unknown) => {
      const message =
        error && typeof error === "object" && "response" in error
          ? error.response &&
            typeof error.response === "object" &&
            "data" in error.response
            ? error.response.data &&
              typeof error.response.data === "object" &&
              "message" in error.response.data
              ? String(error.response.data.message)
              : "Não foi possível cadastrar a planta."
            : "Não foi possível cadastrar a planta."
          : "Não foi possível cadastrar a planta.";

      notifications.show({
        title: "Erro no cadastro",
        message,
        color: "red",
      });
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => createPlantMutation.mutate(values))}
    >
      <Stack>
        <TextInput
          withAsterisk
          label="Nome da Planta"
          placeholder="Meu Cacto Zezinho"
          {...form.getInputProps("name")}
        />
        <TextInput
          withAsterisk
          label="Espécie"
          placeholder="Cacto (Cactaceae)"
          {...form.getInputProps("species")}
        />
        <TextInput
          withAsterisk
          label="ID do Dispositivo"
          placeholder="ID único do seu ESP32"
          {...form.getInputProps("deviceId")}
        />
        <Group justify="flex-end" mt="md">
          <Button type="submit" loading={createPlantMutation.isPending}>
            Cadastrar Planta
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
