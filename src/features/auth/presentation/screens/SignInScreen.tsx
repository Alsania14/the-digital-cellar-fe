import { Flex, Image, ScrollArea, Text } from '@mantine/core';
import { ColorSchemeToggle } from '@/src/shared/presentation/components/ColorSchemeToggle';
import SignInForm from '../components/SignInForm/SignInForm';
import { JumbotronTitle } from '../components/Welcome/JumbotronTitle';

export default function SignInScreen() {
  return (
    <ScrollArea>
      <Image
        style={{ position: 'absolute', top: 0, right: 0, zIndex: -1 }}
        src="/decoration-30.png"
        alt="Decoration"
        fit="contain"
        h={{ base: 300, md: 350 }}
        w={{ base: 300, md: 350 }}
      />
      <Image
        style={{ position: 'absolute', bottom: 0, left: 0, zIndex: -1, rotate: '180deg' }}
        src="/decoration-30.png"
        alt="Decoration"
        fit="contain"
        h={{ base: 300, md: 350 }}
        w={{ base: 300, md: 350 }}
      />
      <Flex
        justify="center"
        align="center"
        style={{
          minHeight: '100vh',
          paddingBottom: 50,
        }}
        direction="column"
      >
        <JumbotronTitle />
        <ColorSchemeToggle />
        <SignInForm />
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
    </ScrollArea>
  );
}
