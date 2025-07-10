import { Button, Container, Group, Stack, Text, Title } from "@mantine/core";
import { useCallback } from "react";
import { Link } from "react-router";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";
import classes from "./HeroSection.module.css";

export function HeroSection() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Container size="md" className={classes.wrapper}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: { value: "transparent" },
          },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 },
            },
          },
          particles: {
            color: { value: "#40c057" },
            links: { enable: false },
            move: {
              direction: "none",
              enable: true,
              outModes: { default: "bounce" },
              random: true,
              speed: 0.5,
              straight: false,
            },
            number: { density: { enable: true }, value: 100 },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
          detectRetina: true,
        }}
        style={{
          position: "absolute",
          zIndex: -1,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      <Stack align="center" gap="md">
        <Text size="xl" fw={700} className={classes.supraTitle}>
          🌱
        </Text>
        <Title className={classes.title} ta="center">
          Dê vida à sua planta. <br /> E à sua{" "}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "green", to: "cyan" }}
            inherit
          >
            rotina de cuidados
          </Text>
          .
        </Title>
        <Text c="dimmed" ta="center" size="lg" maw={580}>
          Monitore, interaja e divirta-se cuidando da sua planta com uma
          experiência gamificada que te recompensa por ser um bom guardião.
        </Text>
        <Group mt="lg">
          <Button component={Link} to="/register" size="lg" radius="xl">
            Criar Conta Grátis
          </Button>
          <Button
            component="a"
            href="#features"
            variant="default"
            size="lg"
            radius="xl"
          >
            Saber Mais
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
