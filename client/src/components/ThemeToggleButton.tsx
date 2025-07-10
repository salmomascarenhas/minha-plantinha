import { ActionIcon, rem, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import cx from 'clsx';
import classes from './ThemeToggleButton.module.css';

export function ThemeToggleButton() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <ActionIcon
      onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
      variant="default"
      size="lg"
      aria-label="Toggle color scheme"
    >
      <IconSun
        className={cx(classes.icon, classes.light)}
        stroke={1.5}
        style={{ width: rem(22), height: rem(22) }}
      />
      <IconMoon
        className={cx(classes.icon, classes.dark)}
        stroke={1.5}
        style={{ width: rem(22), height: rem(22) }}
      />
    </ActionIcon>
  );
}
