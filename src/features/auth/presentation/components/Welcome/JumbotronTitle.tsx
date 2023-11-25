import { Button, Flex, Image, Paper, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import { ColorSchemeToggle } from '@/src/shared/presentation/components/ColorSchemeToggle';
import classes from './Welcome.module.css';

export function JumbotronTitle() {
  return (
    <Flex
      justify="center"
      align="center"
      style={{
        minHeight: '100vh',
      }}
      direction="column"
    >
      <Title className={classes.title} ta="center">
        <Flex direction={{ base: 'column' }} justify="center" align="center">
          <Text
            inherit
            variant="gradient"
            fw={{ base: 700, md: 900 }}
            fz={{ base: 30, md: 40 }}
            component="span"
            gradient={{ from: 'purple', to: 'blue' }}
          >
            THE DIGITAL CELLAR FE
          </Text>
          <Image
            radius="md"
            h={200}
            w={200}
            fit="contain"
            src="/logo.png"
            alt="The Digital Cellar"
          />
        </Flex>
      </Title>
      <ColorSchemeToggle />
      <Paper withBorder shadow="md" p={30} mt={30} radius="md" w={{ base: '90%', sm: 450 }}>
        <TextInput label="Email" placeholder="you@mantine.dev" required />
        <PasswordInput label="Password" placeholder="Your password" required mt="md" />
        <Button fullWidth mt="xl">
          Sign in
        </Button>
      </Paper>
      <Text
        inherit
        variant="gradient"
        component="span"
        fw={400}
        gradient={{ from: 'purple', to: 'blue' }}
        mt={10}
      >
        By Alin Gotama.
      </Text>
    </Flex>
  );
}
