import {
  Alert,
  Button,
  createTheme,
  Paper,
  type MantineColorsTuple,
  type MantineGradient,
} from "@mantine/core";

const myGreen: MantineColorsTuple = [
  "#eef9e8",
  "#e2f2da",
  "#c7e6b7",
  "#a9d991",
  "#90cd70",
  "#80c55a",
  "#76c24d",
  "#65aa3f",
  "#589736",
  "#48842a",
];

const myDanger: MantineColorsTuple = [
  "#ffe9e9",
  "#ffd1d1",
  "#faa3a3",
  "#f67474",
  "#f24c4c",
  "#f03232",
  "#f02727",
  "#d61a1a",
  "#c01111",
  "#a90202",
];

const brandGradient: MantineGradient = { from: "green", to: "cyan", deg: 45 };

export const theme = createTheme({
  colors: {
    myGreen,
    myDanger,
  },
  primaryColor: "myGreen",
  primaryShade: 6,
  defaultGradient: brandGradient,

  fontFamily: "Nunito, sans-serif",
  headings: {
    fontFamily: "Nunito, sans-serif",
    fontWeight: "800",
  },

  components: {
    Button: Button.extend({
      defaultProps: {
        radius: "xl",
      },

      styles: (theme, props) => ({
        root: {
          ...(props.variant === "filled" &&
            props.color === theme.primaryColor && {
              background: `linear-gradient(${brandGradient.deg}deg, ${
                theme.colors[brandGradient.from][6]
              } 0%, ${theme.colors[brandGradient.to][6]} 100%)`,
              color: "white",
            }),
        },
      }),
    }),

    Paper: Paper.extend({
      defaultProps: {
        withBorder: true,
        shadow: "sm",
        radius: "md",
        p: "lg",
      },
    }),
    Alert: Alert.extend({
      defaultProps: {
        radius: "md",
      },
    }),
  },
});
