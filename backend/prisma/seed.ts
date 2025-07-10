import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const achievementsData = [
  {
    code: 'FIRST_LOGIN',
    name: 'Bem-vindo, Guardião!',
    description: 'Fez seu primeiro login na plataforma.',
    icon: '🎉',
  },
  {
    code: 'FIRST_PLANT',
    name: 'Nova Vida',
    description: 'Cadastrou sua primeira planta.',
    icon: '🌱',
  },
  {
    code: 'FIRST_WATER',
    name: 'Primeiras Gotas',
    description: 'Realizou a primeira rega manual.',
    icon: '💧',
  },

  {
    code: 'LOGIN_STREAK_3',
    name: 'Visitante Frequente',
    description: 'Fez login por 3 dias seguidos.',
    icon: '🗓️',
  },
  {
    code: 'LOGIN_STREAK_7',
    name: 'Hábito Criado',
    description: 'Fez login por 7 dias seguidos.',
    icon: '📅',
  },
  {
    code: 'LOGIN_STREAK_30',
    name: 'Parte da Família',
    description: 'Fez login por 30 dias seguidos.',
    icon: '👨‍👩‍👧‍👦',
  },

  {
    code: 'HEALTHY_WEEK_HUMIDITY',
    name: 'Mestre da Umidade',
    description: 'Manteve a umidade da planta ideal por 7 dias.',
    icon: '🥇',
  },
  {
    code: 'HEALTHY_WEEK_TEMP',
    name: 'Clima Perfeito',
    description: 'Manteve a temperatura da planta ideal por 7 dias.',
    icon: '🌡️',
  },
  {
    code: 'NIGHT_OWL',
    name: 'Coruja Guardiã',
    description: 'Cuidou da sua planta durante a noite.',
    icon: '🦉',
  },
  {
    code: 'SUN_WORSHIPPER',
    name: 'Amante do Sol',
    description: 'Garantiu que sua planta recebesse a quantidade ideal de luz.',
    icon: '☀️',
  },

  {
    code: 'POINTS_100',
    name: 'Centurião Verde',
    description: 'Alcançou 100 pontos de cuidado.',
    icon: '💯',
  },
  {
    code: 'POINTS_500',
    name: 'Meio Milhar',
    description: 'Alcançou 500 pontos de cuidado.',
    icon: '🌠',
  },
  {
    code: 'POINTS_1000',
    name: 'Mestre Jardineiro',
    description: 'Alcançou 1000 pontos de cuidado.',
    icon: '🏆',
  },

  {
    code: 'CACTUS_LOVER',
    name: 'Amigo dos Espinhos',
    description: 'Cadastrou um cacto.',
    icon: '🌵',
  },
  {
    code: 'FRUIT_MASTER',
    name: 'Pomar Pessoal',
    description: 'Cadastrou uma planta frutífera.',
    icon: '🍎',
  },
  {
    code: 'COLLECTOR_3',
    name: 'Pequeno Jardim',
    description: 'Cadastrou 3 plantas diferentes.',
    icon: '🪴',
  },
];

async function main() {
  console.log(`Iniciando o seeding...`);

  for (const ach of achievementsData) {
    const achievement = await prisma.achievement.upsert({
      where: { code: ach.code },
      update: {},
      create: {
        code: ach.code,
        name: ach.name,
        description: ach.description,
        icon: ach.icon,
      },
    });
    console.log(`Conquista criada ou já existente: ${achievement.name}`);
  }

  console.log(`Seeding finalizado.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
