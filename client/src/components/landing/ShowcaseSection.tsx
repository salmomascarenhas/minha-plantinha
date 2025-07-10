import {
  Box,
  Container,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import classes from "./ShowcaseSection.module.css";

export function ShowcaseSection() {
  return (
    <Container size="lg" py="xl" my="xl">
      <Stack align="center" mb="xl">
        <Title order={2} ta="center">
          Sua planta, sob seu controle.
        </Title>
        <Text c="dimmed" ta="center" maw={600}>
          Visualize todos os dados importantes em um painel simples, bonito e
          que reage em tempo real.
        </Text>
      </Stack>

      <Paper
        withBorder
        radius="lg"
        shadow="xl"
        className={classes.browserFrame}
      >
        <Box
          bg="dark.6"
          p="xs"
          style={{
            borderTopLeftRadius: "var(--mantine-radius-lg)",
            borderTopRightRadius: "var(--mantine-radius-lg)",
          }}
        >
          <Group gap="xs">
            <Box
              className={classes.browserDot}
              style={{ backgroundColor: "#ff5f57" }}
            />
            <Box
              className={classes.browserDot}
              style={{ backgroundColor: "#febc2e" }}
            />
            <Box
              className={classes.browserDot}
              style={{ backgroundColor: "#28c840" }}
            />
          </Group>
        </Box>

        <Image
          src="/images/dashboard-showcase.png"
          alt="Dashboard da aplicação Minha Plantinha"
          radius="sm"
        />
      </Paper>
    </Container>
  );
}
