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
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router';
import api from '../services/apiService';

export function RegisterPage() {
  const navigate = useNavigate();

  // Hook de formulário com validação espelhada do backend (Zod)
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validate: {
      name: (value) => (value.length < 3 ? 'O nome deve ter no mínimo 3 caracteres' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email inválido'),
      password: (value) => {
        if (value.length < 8) return 'A senha deve ter no mínimo 8 caracteres';
        if (!/[A-Z]/.test(value)) return 'Deve conter uma letra maiúscula';
        if (!/[0-9]/.test(value)) return 'Deve conter um número';
        if (!/[^A-Za-z0-9]/.test(value)) return 'Deve conter um símbolo';
        return null;
      },
    },
  });

  // Hook de mutação para a chamada de registro
  const registerMutation = useMutation({
    mutationFn: (userData: typeof form.values) => api.post('/auth/register', userData),
    onSuccess: () => {
      notifications.show({
        title: 'Conta Criada!',
        message: 'Sua conta foi criada com sucesso. Agora você pode fazer o login.',
        color: 'green',
      });
      navigate('/login');
    },
    onError: (error) => {
      form.setErrors({ root: error.message });
    },
  });

  return (
    <Container size={420} my={40}>
      <Title ta="center">Crie sua Conta</Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Já tem uma conta?{' '}
        <Anchor size="sm" component={Link} to="/login">
          Faça o login
        </Anchor>
      </Text>

      {/* Graças ao nosso tema, não precisamos mais passar as props de estilo aqui */}
      <Paper mt={30}>
        <form onSubmit={form.onSubmit((values) => registerMutation.mutate(values))}>
          <Stack>
            <TextInput
              required
              label="Nome"
              placeholder="Seu nome"
              {...form.getInputProps('name')}
            />
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
              description="Mínimo 8 caracteres, com maiúscula, número e símbolo."
              {...form.getInputProps('password')}
            />

            {registerMutation.isError && (
              <Text c="red" size="sm">
                {form.errors.root}
              </Text>
            )}

            <Button type="submit" loading={registerMutation.isPending} fullWidth mt="xl">
              Criar Conta
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
