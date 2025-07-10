import { Box, Button, Group } from "@mantine/core";
import { Link } from "react-router";

export function PublicHeader() {
  return (
    <Box component="header" h="100%" px="md">
      <Group justify="space-between" h="100%">
        <span style={{ fontWeight: 700 }}>🌱 Minha Plantinha</span>
        <Group>
          <Button component={Link} to="/login" variant="default">
            Entrar
          </Button>
          <Button component={Link} to="/register">
            Criar Conta
          </Button>
        </Group>
      </Group>
    </Box>
  );
}
