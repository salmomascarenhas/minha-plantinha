/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Anchor,
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
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
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
      <Stack p="xl">
        <Title ta="center">Crie sua Conta</Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Já tem uma conta?{" "}
          <Anchor size="sm" component={Link} to="/login">
            Faça o login
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Stack>
            <Group grow mb="md" mt="md">
              <Button leftSection={<IconBrandGoogle />} variant="default">
                Continuar com Google
              </Button>
              <Button leftSection={<IconBrandGithub />} variant="default">
                Continuar com GitHub
              </Button>
            </Group>

            <Divider
              label="Ou continue com seu e-mail"
              labelPosition="center"
              my="sm"
            />

            <form
              onSubmit={form.onSubmit((values) =>
                registerMutation.mutate(values)
              )}
            >
              <Stack>
                <TextInput
                  withAsterisk
                  label="Nome"
                  placeholder="Seu nome"
                  {...form.getInputProps("name")}
                />
                <TextInput
                  withAsterisk
                  label="Email"
                  placeholder="voce@exemplo.com"
                  {...form.getInputProps("email")}
                />

                <PasswordInput
                  withAsterisk
                  label="Senha"
                  placeholder="Sua senha"
                  {...form.getInputProps("password")}
                />

                {registerMutation.isError && (
                  <Text c="red" size="sm">
                    {(registerMutation.error as any)?.response?.data?.message ||
                      "Erro ao criar conta."}
                  </Text>
                )}

                <Button
                  type="submit"
                  loading={registerMutation.isPending}
                  fullWidth
                  mt="xl"
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
