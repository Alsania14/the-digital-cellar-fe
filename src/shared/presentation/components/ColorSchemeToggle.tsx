import { Button, Group, useMantineColorScheme } from '@mantine/core';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();

  return (
    <Group justify="center" mt="xl">
      <Button color="blue" onClick={() => setColorScheme('light')}>
        Light
      </Button>
      <Button
        variant="gradient"
        gradient={{ from: 'blue', to: 'dark.3', deg: 90 }}
        onClick={() => setColorScheme('auto')}
      >
        Auto
      </Button>
      <Button color="dark.3" onClick={() => setColorScheme('dark')}>
        Dark
      </Button>
    </Group>
  );
}
