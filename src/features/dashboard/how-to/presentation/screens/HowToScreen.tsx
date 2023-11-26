import { Container, Image, Paper, Text, Title } from '@mantine/core';

export default function HowToScreen() {
  return (
    <Container
      style={{ marginLeft: 'auto', marginRight: 'auto', paddingBottom: 50, paddingTop: 50 }}
    >
      <Title order={1}>HOW TO</Title>
      <Paper shadow="lg" withBorder p={10} mt={30}>
        <Title order={2} mt={30}>
          READ USER
        </Title>
        <Text mt={30}>Press the Eye Key on the target user you want to see.</Text>
        <Image src="/how-to/1.png" w={{ base: '100%', md: '50%' }} />
      </Paper>
      <Paper shadow="lg" withBorder p={10} mt={30}>
        <Title order={2} mt={30}>
          ADD USER
        </Title>
        <Text mt={30}>Go to User Management menu.</Text>
        <Image src="/how-to/2.png" w={{ base: '100%', md: '50%' }} />
        <Text mt={30}>Press the Add New User button in the upper right corner.</Text>
        <Image src="/how-to/3.png" w={{ base: '100%', md: '50%' }} />
        <Text mt={30}>Modal will appear input all data correctly and press enter.</Text>
        <Image src="/how-to/4.png" w={{ base: '100%', md: '50%' }} />
        <Text mt={30}>The user will be added immediately.</Text>
      </Paper>
      <Paper shadow="lg" withBorder p={10} mt={30}>
        <Title order={2} mt={30}>
          UPDATE USER
        </Title>
        <Text mt={30}>Go to User Management menu.</Text>
        <Image src="/how-to/2.png" w={{ base: '100%', md: '50%' }} />
        <Text mt={30}>Press the button with the Pencil Icon on one of the users.</Text>
        <Image src="/how-to/5.png" w={{ base: '100%', md: '50%' }} />
        <Text mt={30}>A modal will appear, replace all data, and provide a new password.</Text>
        <Image src="/how-to/6.png" w={{ base: '100%', md: '50%' }} />
      </Paper>
      <Paper shadow="lg" withBorder p={10} mt={30}>
        <Title order={2} mt={30}>
          DELETE USER
        </Title>
        <Text mt={30}>Go to User Management menu.</Text>
        <Image src="/how-to/2.png" w={{ base: '100%', md: '50%' }} />
        <Text mt={30}>Press the button with the trash icon on the user you want to delete.</Text>
        <Image src="/how-to/7.png" w={{ base: '100%', md: '50%' }} />
        <Text mt={30}>
          The user deletion confirmation modal will appear, press the Confirm Button and the user
          will be deleted.
        </Text>
        <Image src="/how-to/8.png" w={{ base: '100%', md: '50%' }} />
      </Paper>
    </Container>
  );
}
