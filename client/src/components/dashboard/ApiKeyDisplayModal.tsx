import {
  Button,
  Group,
  List,
  Modal,
  Paper,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import {
  IconCheck,
  IconCircleNumber1,
  IconCircleNumber2,
  IconCircleNumber3,
  IconCircleNumber4,
  IconCopy,
} from "@tabler/icons-react";

interface ApiKeyDisplayModalProps {
  apiKey: string | null;
  onClose: () => void;
}

export function ApiKeyDisplayModal({
  apiKey,
  onClose,
}: ApiKeyDisplayModalProps) {
  const clipboard = useClipboard({ timeout: 2000 });

  return (
    <Modal
      opened={!!apiKey}
      onClose={onClose}
      title={
        <Title order={3}>
          Planta Cadastrada! Próximo Passo: Conectar Dispositivo
        </Title>
      }
      centered
      size="lg"
    >
      <Text mb="md">
        Siga os passos abaixo para configurar seu dispositivo físico (ESP32) e
        conectá-lo à plataforma.
      </Text>
      <List
        spacing="sm"
        size="sm"
        center
        icon={
          <ThemeIcon color="teal" size={24} radius="xl">
            <IconCheck style={{ width: "70%", height: "70%" }} />
          </ThemeIcon>
        }
      >
        <List.Item
          icon={
            <ThemeIcon color="blue" size={24} radius="xl">
              <IconCircleNumber1 size={16} />
            </ThemeIcon>
          }
        >
          Ligue seu dispositivo ESP32. Ele criará uma rede Wi-Fi própria chamada{" "}
          <strong>MinhaPlantinha-Setup</strong>.
        </List.Item>
        <List.Item
          icon={
            <ThemeIcon color="blue" size={24} radius="xl">
              <IconCircleNumber2 size={16} />
            </ThemeIcon>
          }
        >
          No seu celular ou computador, conecte-se a essa rede Wi-Fi.
        </List.Item>
        <List.Item
          icon={
            <ThemeIcon color="blue" size={24} radius="xl">
              <IconCircleNumber3 size={16} />
            </ThemeIcon>
          }
        >
          Após conectar, uma página de configuração deve abrir automaticamente.
          (Se não abrir, acesse <strong>192.168.4.1</strong> no seu navegador).
        </List.Item>
        <List.Item
          icon={
            <ThemeIcon color="blue" size={24} radius="xl">
              <IconCircleNumber4 size={16} />
            </ThemeIcon>
          }
        >
          Na página, selecione sua rede Wi-Fi de casa, digite sua senha e cole a
          Chave de API abaixo.
        </List.Item>
      </List>

      <Paper withBorder p="md" mt="lg" bg="dark.8">
        <Text ff="monospace" c="green.4" ta="center" size="md">
          <span style={{ wordBreak: "break-all" }}>{apiKey}</span>
        </Text>
      </Paper>

      <Group justify="space-between" mt="xl">
        <Button
          variant="light"
          leftSection={
            clipboard.copied ? <IconCheck size={16} /> : <IconCopy size={16} />
          }
          color={clipboard.copied ? "teal" : "gray"}
          onClick={() => clipboard.copy(apiKey || "")}
        >
          {clipboard.copied ? "Chave Copiada!" : "Copiar Chave"}
        </Button>
        <Button onClick={onClose} color="green">
          Concluir
        </Button>
      </Group>
    </Modal>
  );
}
