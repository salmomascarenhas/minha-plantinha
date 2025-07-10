import { Button, Container, Paper, Stack, Text, Title } from "@mantine/core";
import { Link } from "react-router";
import classes from "./FinalCtaSection.module.css";

export function FinalCtaSection() {
  return (
    <Container size="lg" my="xl">
      <Paper
        p="xl"
        radius="lg"
        style={(theme) => ({
          backgroundImage: `linear-gradient(45deg, ${theme.colors.green[6]}, ${theme.colors.cyan[6]})`,
        })}
        className={classes.wrapper}
      >
        <Stack align="center" ta="center">
          <Title order={2} className={classes.title} c="white">
            Pronto para começar sua jornada verde?
          </Title>
          <Text maw={600} c="white" mt="sm">
            Junte-se a nós e transforme o cuidado com suas plantas em uma
            experiência recompensadora, interativa e cheia de vida. Crie sua
            conta gratuita agora mesmo.
          </Text>
          <Button
            component={Link}
            to="/register"
            size="xl"
            radius="xl"
            variant="white"
            color="dark.6"
            mt="xl"
            className={classes.ctaButton}
          >
            Começar Gratuitamente
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
