import { Box, Center, Loader, Paper, Text, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import api from '../../services/apiService';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

interface HistoryChartProps {
  plantId: string;
}

export function HistoryChart({ plantId }: HistoryChartProps) {
  const {
    data: history,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['plantHistory', plantId],
    queryFn: () => api.get(`/plants/${plantId}/history?period=7d`).then((res) => res.data),
  });

  if (isLoading) {
    return (
      <Center h={200}>
        <Loader />
      </Center>
    );
  }
  if (isError || !history) {
    return (
      <Center h={200}>
        <Text c="red">Não foi possível carregar o histórico.</Text>
      </Center>
    );
  }

  const chartData = {
    labels: history.map((d: any) => new Date(d.createdAt).toLocaleDateString('pt-BR')),
    datasets: [
      {
        label: 'Umidade do Solo (%)',
        data: history.map((d: any) => d.humidity),
        fill: true,
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.3,
      },
    ],
  };

  return (
    <Paper p="md" radius="md">
      <Title order={4}>Histórico de Umidade (7 dias)</Title>
      <Box h={250} mt="md">
        <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
      </Box>
    </Paper>
  );
}
