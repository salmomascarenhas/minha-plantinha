import {
  Box,
  Container,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import classes from "./ShowcaseSection.module.css";

export function ShowcaseSection() {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const isDark = colorScheme === "dark";

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
          bg={isDark ? theme.colors.dark[6] : theme.colors.gray[1]}
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
          src={
            isDark
              ? "/images/dashboard-showcase-dark.png"
              : "/images/dashboard-showcase-light.png"
          }
          alt="Dashboard da aplicação Minha Plantinha"
          radius="sm"
        />
      </Paper>
    </Container>
  );
}
