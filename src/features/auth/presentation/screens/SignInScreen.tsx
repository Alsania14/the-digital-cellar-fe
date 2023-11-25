import { Flex, Text } from '@mantine/core';
import { NextPageWithLayout } from '@/pages/_app';
import { ColorSchemeToggle } from '@/src/shared/presentation/components/ColorSchemeToggle';
import SignInForm from '../components/SignInForm/SignInForm';
import { JumbotronTitle } from '../components/Welcome/JumbotronTitle';

const SignInScreen = () => (
  <Flex
    justify="center"
    align="center"
    style={{
      minHeight: '100vh',
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
);

export default SignInScreen;
