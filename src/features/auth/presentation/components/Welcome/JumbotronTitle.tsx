import { Flex, Image, Text, Title } from '@mantine/core';
import classes from './JumbotronTitle.module.css';

export function JumbotronTitle() {
  return (
    <Title className={classes.title} ta="center">
      <Flex direction={{ base: 'column' }} justify="center" align="center">
        <Image
          radius="md"
          h={{ base: 100, md: 250 }}
          w={{ base: 100, md: 250 }}
          fit="contain"
          src="/logo.png"
          alt="The Digital Cellar"
        />
        <Text
          inherit
          variant="gradient"
          fw={{ base: 700, md: 900 }}
          fz={{ base: 20, sm: 40 }}
          component="span"
          style={{ marginLeft: 50, marginRight: 50 }}
          gradient={{ from: 'blue', to: 'purple' }}
        >
          THE DIGITAL CELLAR FE
        </Text>
      </Flex>
    </Title>
  );
}
