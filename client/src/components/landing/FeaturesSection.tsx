import {
  Container,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconAward,
  IconDeviceHeartMonitor,
  IconMessageChatbot,
} from "@tabler/icons-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: IconDeviceHeartMonitor,
    title: "Monitoramento em Tempo Real",
    description:
      "Acompanhe umidade, temperatura e luminosidade com dados atualizados do seu dispositivo ESP32.",
  },
  {
    icon: IconAward,
    title: "Gamificação e Recompensas",
    description:
      "Ganhe pontos, desbloqueie conquistas e veja seu mascote reagir ao seu cuidado diário.",
  },
  {
    icon: IconMessageChatbot,
    title: "Assistente com IA",
    description:
      "Receba dicas personalizadas e relatórios de saúde gerados por IA com base nos dados da sua planta.",
  },
];
export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: "power3.out",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const items = features.map((feature, index) => (
    <Paper
      withBorder
      radius="md"
      p="lg"
      key={feature.title}
      ref={(el) => {
        itemsRef.current[index] = el;
      }}
    >
      <Stack>
        <ThemeIcon
          size={44}
          radius="md"
          variant="gradient"
          gradient={{ from: "green", to: "cyan" }}
        >
          <feature.icon
            style={{ width: "2rem", height: "2rem" }}
            stroke={1.5}
          />
        </ThemeIcon>
        <Title order={4} fw={600}>
          {feature.title}
        </Title>
        <Text size="sm" c="dimmed">
          {feature.description}
        </Text>
      </Stack>
    </Paper>
  ));

  return (
    <Container size="lg" py="xl" id="features" ref={containerRef}>
      <Stack align="center" mb="xl">
        <Title order={2} ta="center">
          Uma plataforma completa para o jardineiro moderno
        </Title>
        <Text c="dimmed" ta="center" maw={600}>
          Tudo o que você precisa para transformar o cuidado com plantas em uma
          jornada divertida e recompensadora.
        </Text>
      </Stack>
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl" mt="xl">
        {items}
      </SimpleGrid>
    </Container>
  );
}
