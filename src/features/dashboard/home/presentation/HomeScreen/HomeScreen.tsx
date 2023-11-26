import { ThemeIcon, Text, Title, Container, SimpleGrid, rem } from '@mantine/core';
import {
  IconGauge,
  IconCookie,
  IconMessage2,
  IconLock,
  IconDatabase,
  IconColorPicker,
} from '@tabler/icons-react';
import classes from './HomeScreen.module.css';

export const MOCKDATA = [
  {
    icon: IconGauge,
    title: 'Laravel BE',
    description: 'This application uses Laravel as an optimized BE,',
  },
  {
    icon: IconColorPicker,
    title: 'Next.JS FE',
    description: 'This application uses Next.JS, a mature React.JS framework',
  },
  {
    icon: IconCookie,
    title: 'Vercel',
    description: 'This Front End application is hosted on Vercel.',
  },
  {
    icon: IconLock,
    title: 'Sanctum',
    description: 'This application uses Sanctum Token to secure data exchange',
  },
  {
    icon: IconMessage2,
    title: 'Swagger Open API',
    description: 'This application uses the Swagger Open API for API documentation',
  },
  {
    icon: IconDatabase,
    title: 'MySQL',
    description: 'This application uses a MySQL database',
  },
];

interface FeatureProps {
  icon: React.FC<any>;
  title: React.ReactNode;
  description: React.ReactNode;
}

function Feature({ icon: Icon, title, description }: FeatureProps) {
  return (
    <div>
      <ThemeIcon variant="light" size={40} radius={40}>
        <Icon style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      </ThemeIcon>
      <Text mt="sm" mb={7}>
        {title}
      </Text>
      <Text size="sm" c="dimmed" lh={1.6}>
        {description}
      </Text>
    </div>
  );
}

export default function HomeScreen() {
  const features = MOCKDATA.map((feature, index) => <Feature {...feature} key={index} />);

  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title}>Integrate effortlessly with any technology stack</Title>

      <Container size={560} p={0}>
        <Text size="sm" className={classes.description}>
          some of the technologies used in this project
        </Text>
      </Container>

      <SimpleGrid
        mt={60}
        cols={{ base: 1, sm: 2, md: 3 }}
        spacing={{ base: 'xl', md: 50 }}
        verticalSpacing={{ base: 'xl', md: 50 }}
      >
        {features}
      </SimpleGrid>
    </Container>
  );
}
