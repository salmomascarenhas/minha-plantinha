import {
  Alert,
  Button,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconAlertCircle, IconSparkles } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import api from "../../services/apiService";

interface AiAssistantProps {
  plantId: string;
}

interface AiInsightResponse {
  id: string;
  content: string;
}

export function AiAssistant({ plantId }: AiAssistantProps) {
  const [lastInsight, setLastInsight] = useState<string | null>(null);

  const generateReportMutation = useMutation({
    mutationFn: () =>
      api.post<AiInsightResponse>("/ai/generate-report", { plantId }),
    onMutate: () => {
      setLastInsight(null);
    },
    onSuccess: (data) => {
      setLastInsight(data.data.content);
    },
  });

  return (
    <Paper p="lg" radius="md">
      <Stack>
        <Group justify="space-between">
          <Title order={4}>🤖 Assistente Virtual</Title>
          <Button
            leftSection={<IconSparkles size={18} />}
            variant="light"
            onClick={() => generateReportMutation.mutate()}
            loading={generateReportMutation.isPending}
          >
            Gerar Relatório de Saúde
          </Button>
        </Group>

        {generateReportMutation.isPending && (
          <Group justify="center" gap="xs" p="md">
            <Loader size="sm" />
            <Text size="sm" c="dimmed">
              Caquito está pensando...
            </Text>
          </Group>
        )}

        {generateReportMutation.isError && (
          <Alert
            icon={<IconAlertCircle size="1rem" />}
            title="Erro!"
            color="red"
            variant="light"
          >
            Não foi possível gerar o relatório no momento. Tente novamente mais
            tarde.
          </Alert>
        )}

        {generateReportMutation.isSuccess && lastInsight && (
          <Alert
            icon={<IconSparkles size="1rem" />}
            title="Relatório do Caquito!"
            color="blue"
            variant="light"
          >
            <Text style={{ whiteSpace: "pre-wrap" }}>{lastInsight}</Text>
          </Alert>
        )}
      </Stack>
    </Paper>
  );
}
