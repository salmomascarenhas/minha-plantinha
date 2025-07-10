import {
  Container,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";

const steps = [
  {
    number: 1,
    title: "Crie sua Conta",
    description:
      "Faça seu cadastro gratuito em segundos e dê um nome ao seu novo amigo verde.",
  },
  {
    number: 2,
    title: "Conecte seu Dispositivo",
    description:
      "Siga as instruções para parear seu dispositivo ESP32 usando a chave de API única fornecida após o cadastro da planta.",
  },
  {
    number: 3,
    title: "Cuide e Divirta-se",
    description:
      "Acompanhe os dados, ganhe pontos, desbloqueie conquistas e veja seu mascote prosperar em tempo real.",
  },
];

export function HowItWorksSection() {
  const items = steps.map((step) => (
    <Stack key={step.title} align="center" ta="center">
      <ThemeIcon
        size={60}
        radius="xl"
        variant="gradient"
        gradient={{ from: "green", to: "cyan" }}
      >
        <Text fz={32} fw={700}>
          {step.number}
        </Text>
      </ThemeIcon>
      <Title order={4} mt="md">
        {step.title}
      </Title>
      <Text c="dimmed">{step.description}</Text>
    </Stack>
  ));

  return (
    <Container size="lg" py="xl" my="xl">
      <Stack align="center" mb={50}>
        <Title order={2} ta="center">
          Comece a usar em 3 passos simples
        </Title>
        <Text c="dimmed" ta="center" maw={600}>
          Transformar o cuidado com plantas em um jogo nunca foi tão fácil.
        </Text>
      </Stack>
      <SimpleGrid
        cols={{ base: 1, sm: 3 }}
        spacing={{ base: "xl", sm: "5rem" }}
      >
        {items}
      </SimpleGrid>
    </Container>
  );
}
