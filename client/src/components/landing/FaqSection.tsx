import { Accordion, Container, Stack, Text, Title } from "@mantine/core";

const faqData = [
  {
    question: "Preciso ter um dispositivo ESP32 para usar o aplicativo?",
    answer:
      'Não necessariamente! Você pode se cadastrar e explorar a interface com uma "planta virtual" para entender a dinâmica e a gamificação. No entanto, para monitorar uma planta real e usar todo o potencial da plataforma, o hardware ESP32 com os sensores é necessário.',
  },
  {
    question: "O serviço é realmente gratuito?",
    answer:
      'Sim. O "Minha Plantinha" é um projeto desenvolvido para fins de aprendizado e portfólio. Todos os recursos de software são 100% gratuitos para uso pessoal. Os únicos custos envolvidos são a aquisição do hardware (ESP32, sensores, etc.), caso você decida montar o dispositivo físico.',
  },
  {
    question: "Preciso saber programar para montar o dispositivo?",
    answer:
      'Alguma familiaridade com o ambiente Arduino/ESP32 é útil. Forneceremos o código-fonte e tutoriais para facilitar a gravação no seu dispositivo. Além disso, a funcionalidade de "Portal Cativo" (descrita no cadastro da planta) tornará esse processo muito mais simples, sem necessidade de editar o código manualmente.',
  },
  {
    question: "Funciona com qualquer tipo de planta?",
    answer:
      "Sim! Os sensores de umidade, temperatura e luminosidade são universais. Onde a plataforma realmente brilha é quando você informa a espécie correta da sua planta, pois isso permite que nosso Assistente de IA forneça dicas e cuidados muito mais precisos e personalizados.",
  },
];

export function FaqSection() {
  const items = faqData.map((item) => (
    <Accordion.Item key={item.question} value={item.question}>
      <Accordion.Control>{item.question}</Accordion.Control>
      <Accordion.Panel>{item.answer}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Container size="lg" py="xl" my="xl">
      <Stack align="center" mb={50}>
        <Title order={2} ta="center">
          Ainda tem alguma dúvida?
        </Title>
        <Text c="dimmed" ta="center" maw={600}>
          Encontre aqui respostas para as perguntas mais comuns sobre o projeto.
        </Text>
      </Stack>
      <Accordion variant="separated" radius="md">
        {items}
      </Accordion>
    </Container>
  );
}
