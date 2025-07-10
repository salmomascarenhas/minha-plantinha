import { createTheme, Paper, type MantineColorsTuple } from '@mantine/core';

const myGreen: MantineColorsTuple = [
  '#eef9e8',
  '#e2f2da',
  '#c7e6b7',
  '#a9d991',
  '#90cd70',
  '#80c55a',
  '#76c24d',
  '#65aa3f',
  '#589736',
  '#48842a',
];

// 2. Criação do tema
export const theme = createTheme({
  /* Defina sua cor primária */
  primaryColor: 'myGreen',

  /* Adicione suas cores customizadas ao objeto de cores do Mantine */
  colors: {
    myGreen,
  },

  /* Defina a fonte padrão da aplicação */
  fontFamily: 'Nunito, sans-serif',

  /* Defina outras propriedades globais se necessário */
  headings: {
    fontFamily: 'Nunito, sans-serif',
    fontWeight: '700',
  },

  components: {
    Paper: Paper.extend({
      defaultProps: {
        withBorder: true,
        shadow: 'md',
        radius: 'md',
        p: 'lg',
      },
    }),
  },
});
