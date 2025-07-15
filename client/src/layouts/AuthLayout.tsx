import {
  Box,
  Container,
  Grid,
  Group,
  Image,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconPlant } from "@tabler/icons-react";
import { Link } from "react-router";
import classes from "./AuthLayout.module.css";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const theme = useMantineTheme();

  return (
    <Grid gutter={0} className={classes.wrapper}>
      <Grid.Col visibleFrom="md" span={6} className={classes.visualColumn}>
        <Stack justify="center" h="100%" p="xl">
          <Title order={1} className={classes.title} ta="left">
            Sua jornada verde começa aqui
          </Title>
          <Text className={classes.text} c="gray.4" size="lg" mt="md">
            Junte-se à comunidade Minha Plantinha e transforme o cuidado com
            suas plantas em uma experiência divertida e recompensadora.
          </Text>
          <Image
            src="/environment.svg"
            alt="Ilustração de uma pessoa cuidando de plantas"
            mt={40}
            style={{ transform: "scale(1.1)" }}
          />
        </Stack>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 6 }}>
        <Box className={classes.formWrapper}>
          <header className={classes.formHeader}>
            <Container size="sm">
              <Link to="/" className={classes.logoLink}>
                <Group gap="xs">
                  <Box
                    style={{
                      background: `linear-gradient(135deg, ${theme.colors.green[6]} 0%, ${theme.colors.green[4]} 100%)`,
                      borderRadius: theme.radius.sm,
                      padding: "6px",
                      boxShadow: `0 2px 8px ${theme.colors.green[5]}30`,
                    }}
                  >
                    <IconPlant
                      size={16}
                      color={theme.white}
                      style={{
                        filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))",
                      }}
                    />
                  </Box>
                  <Text fw={700} component="span">
                    Minha Plantinha
                  </Text>
                </Group>
              </Link>
            </Container>
          </header>

          <main className={classes.formColumn}>
            <Container size="sm">{children}</Container>
          </main>
        </Box>
      </Grid.Col>
    </Grid>
  );
}
