import { Flex, Image, Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';

export function JumbotronTitle() {
  return (
    <Title className={classes.title} ta="center">
      <Flex direction={{ base: 'column' }} justify="center" align="center">
        <Text
          inherit
          variant="gradient"
          fw={{ base: 700, md: 900 }}
          fz={{ base: 30, md: 60 }}
          component="span"
          gradient={{ from: 'blue', to: 'purple' }}
        >
          THE DIGITAL CELLAR FE
        </Text>
        <Image
          radius="md"
          h={{ base: 100, md: 250 }}
          w={{ base: 100, md: 250 }}
          fit="contain"
          src="/logo.png"
          alt="The Digital Cellar"
        />
      </Flex>
    </Title>
  );
}
