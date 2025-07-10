import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import api from '../services/apiService';

interface LoginResponse {
  token: string;
  user: { id: string; name: string; email: string; createdAt: Date; updatedAt: Date };
}

export function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email inválido'),
      password: (value) => (value.length > 0 ? null : 'Senha é obrigatória'),
    },
  });

  // Hook de mutação do React Query para a chamada de login
  const loginMutation = useMutation<LoginResponse, Error, typeof form.values>({
    mutationFn: (credentials) => api.post('/auth/login', credentials).then((res) => res.data),
    onSuccess: (data) => {
      auth.login(data.token);
      navigate('/dashboard');
    },
    onError: (error) => {
      // Exibe o erro no formulário
      form.setErrors({ root: error.message });
    },
  });

  return (
    <Container size={420} my={40}>
      <Title ta="center">Bem-vindo de volta!</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Ainda não tem uma conta?{' '}
        <Anchor size="sm" component={Link} to="/register">
          Crie uma conta
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit((values) => loginMutation.mutate(values))}>
          <Stack>
            <TextInput
              required
              label="Email"
              placeholder="voce@exemplo.com"
              {...form.getInputProps('email')}
            />
            <PasswordInput
              required
              label="Senha"
              placeholder="Sua senha"
              {...form.getInputProps('password')}
            />
            {/* Exibe erro geral da mutação */}
            {loginMutation.isError && (
              <Text c="red" size="sm">
                {form.errors.root}
              </Text>
            )}
            <Button type="submit" loading={loginMutation.isPending} fullWidth mt="xl">
              Entrar
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
