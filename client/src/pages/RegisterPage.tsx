/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Alert,
  Anchor,
  Box,
  Button,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import {
  IconAlertCircle,
  IconBrandGithub,
  IconBrandGoogle,
  IconLock,
  IconMail,
  IconUser,
} from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { AuthLayout } from "../layouts/AuthLayout";

import api from "../services/apiService";

export function RegisterPage() {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: {
      name: (value) =>
        value.length < 3 ? "O nome deve ter no mínimo 3 caracteres" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email inválido"),
      password: (value) => {
        if (value.length < 8) return "A senha deve ter no mínimo 8 caracteres";
        if (!/[A-Z]/.test(value)) return "Deve conter uma letra maiúscula";
        if (!/[0-9]/.test(value)) return "Deve conter um número";
        if (!/[^A-Za-z0-9]/.test(value)) return "Deve conter um símbolo";
        return null;
      },
    },
  });

  // Hook de mutação para a chamada de registro
  const registerMutation = useMutation({
    mutationFn: (userData: typeof form.values) =>
      api.post("/auth/register", userData),
    onSuccess: () => {
      notifications.show({
        title: "Conta Criada!",
        message:
          "Sua conta foi criada com sucesso. Agora você pode fazer o login.",
        color: "green",
      });
      navigate("/login");
    },
    onError: (error) => {
      form.setErrors({ root: error.message });
    },
  });

  return (
    <AuthLayout>
      <Stack gap="lg">
        <Box>
          <Title order={2} ta="center" mt="md">
            Crie sua Conta
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Já tem uma conta?{" "}
            <Anchor size="sm" component={Link} to="/login">
              Faça o login
            </Anchor>
          </Text>
        </Box>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Stack>
            <Group grow mb="md" mt="md">
              <Button
                leftSection={<IconBrandGoogle size={18} />}
                variant="default"
                size="md"
              >
                Google
              </Button>
              <Button
                leftSection={<IconBrandGithub size={18} />}
                variant="default"
                size="md"
              >
                GitHub
              </Button>
            </Group>

            <Divider
              label="Ou registre-se com seu e-mail"
              labelPosition="center"
              my="sm"
            />

            <form
              onSubmit={form.onSubmit((values) =>
                registerMutation.mutate(values)
              )}
            >
              <Stack gap="md">
                <TextInput
                  required
                  label="Nome"
                  placeholder="Seu nome completo"
                  leftSection={<IconUser size={18} />}
                  {...form.getInputProps("name")}
                />

                <TextInput
                  required
                  label="Email"
                  placeholder="voce@exemplo.com"
                  leftSection={<IconMail size={18} />}
                  {...form.getInputProps("email")}
                />

                <PasswordInput
                  required
                  label="Senha"
                  placeholder="Crie uma senha forte"
                  leftSection={<IconLock size={18} />}
                  description="Use 8+ caracteres com uma mistura de letras, números e símbolos"
                  {...form.getInputProps("password")}
                />

                {registerMutation.isError && (
                  <Alert
                    color="red"
                    variant="light"
                    title="Erro ao criar conta"
                    icon={<IconAlertCircle />}
                  >
                    {(registerMutation.error as any)?.response?.data?.message ||
                      "Erro ao criar conta."}
                  </Alert>
                )}

                <Button
                  type="submit"
                  loading={registerMutation.isPending}
                  fullWidth
                  size="md"
                  mt="xl"
                  gradient={{ from: "teal", to: "green", deg: 105 }}
                  variant="gradient"
                >
                  Criar Conta
                </Button>
              </Stack>
            </form>
          </Stack>
        </Paper>
      </Stack>
    </AuthLayout>
  );
}
