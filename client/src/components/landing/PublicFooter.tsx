import { Container, Group, Text } from "@mantine/core";

export function PublicFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <Container component="footer" py="xl" mt="xl">
      <Group justify="center">
        <Text size="sm" c="dimmed">
          &copy; {currentYear} Minha Plantinha. Todos os direitos reservados.
        </Text>
      </Group>
    </Container>
  );
}
