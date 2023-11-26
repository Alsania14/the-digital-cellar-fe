import { Button, Container, Flex, Group, Title, useMantineColorScheme } from '@mantine/core';

export default function SettingScreen() {
  const { setColorScheme } = useMantineColorScheme();
  return (
    <Container
      style={{ marginLeft: 'auto', marginRight: 'auto', paddingBottom: 50, paddingTop: 50 }}
    >
      <Flex justify="flex-start" direction="column">
        <Title order={5}>App Theme</Title>
        <Group justify="flex-start" mt={10}>
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
      </Flex>
    </Container>
  );
}
