/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Alert,
  Anchor,
  Box,
  Button,
  Checkbox,
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
} from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { AuthLayout } from "../layouts/AuthLayout";
import api from "../services/apiService";

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email inválido"),
      password: (value) => (value.length > 0 ? null : "Senha é obrigatória"),
    },
  });

  const loginMutation = useMutation<LoginResponse, Error, typeof form.values>({
    mutationFn: (credentials) =>
      api.post("/auth/login", credentials).then((res) => res.data),
    onSuccess: async (data) => {
      try {
        await auth.login(data.token);
        notifications.show({
          title: "Bem-vindo de volta!",
          message: "Login realizado com sucesso.",
          color: "green",
        });
        navigate("/dashboard");
      } catch {
        form.setErrors({ root: "Erro ao carregar dados do usuário" });
      }
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
            Bem-vindo de volta!
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={5}>
            Ainda não tem uma conta?{" "}
            <Anchor size="sm" component={Link} to="/register">
              Crie uma conta
            </Anchor>
          </Text>
        </Box>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form
            onSubmit={form.onSubmit((values) => loginMutation.mutate(values))}
          >
            <Stack gap="md">
              <TextInput
                required
                size="md"
                label="Email"
                placeholder="voce@exemplo.com"
                leftSection={<IconMail size={18} />}
                {...form.getInputProps("email")}
              />

              <PasswordInput
                required
                size="md"
                label="Senha"
                placeholder="Sua senha"
                leftSection={<IconLock size={18} />}
                {...form.getInputProps("password")}
              />

              <Group justify="space-between" mt="xs">
                <Checkbox
                  label="Lembrar-me"
                  size="sm"
                  {...form.getInputProps("rememberMe", { type: "checkbox" })}
                />
                <Anchor component={Link} size="sm" to="/forgot-password">
                  Esqueceu a senha?
                </Anchor>
              </Group>

              {loginMutation.isError && (
                <Alert
                  color="red"
                  variant="light"
                  title="Erro ao fazer login"
                  icon={<IconAlertCircle />}
                >
                  {(loginMutation.error as any)?.response?.data?.message ||
                    "Credenciais inválidas."}
                </Alert>
              )}

              <Button
                type="submit"
                loading={loginMutation.isPending}
                fullWidth
                size="md"
                mt="xl"
                gradient={{ from: "teal", to: "green", deg: 105 }}
                variant="gradient"
              >
                Entrar
              </Button>

              <Divider label="ou continue com" labelPosition="center" my="md" />

              <Group grow>
                <Button
                  variant="default"
                  leftSection={<IconBrandGoogle size={18} />}
                  size="md"
                >
                  Google
                </Button>
                <Button
                  variant="default"
                  leftSection={<IconBrandGithub size={18} />}
                  size="md"
                >
                  GitHub
                </Button>
              </Group>
            </Stack>
          </form>
        </Paper>
      </Stack>
    </AuthLayout>
  );
}
