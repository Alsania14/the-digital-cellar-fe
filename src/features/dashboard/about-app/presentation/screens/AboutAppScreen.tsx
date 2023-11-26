import { Anchor, Container, Paper, Text, Title } from '@mantine/core';

export default function AboutAppScreen() {
  return (
    <Container
      style={{ marginLeft: 'auto', marginRight: 'auto', paddingBottom: 50, paddingTop: 50 }}
    >
      <Title order={1}>ABOUT APP</Title>
      <Paper shadow="lg" withBorder p={10} mt={30}>
        <Title order={2} mt={10}>
          LARAVEL BE
        </Title>
        <Text mt={30}>
          • Project Laravel is hosted on a service with a data center location in Bogor, Indonesia.
          FTP access to the server has been sent to the email and Github access can be seen at the
          following link{' '}
          <Anchor target="_blank" href="https://github.com/Alsania14/the-digital-cellar-be-api">
            Alsania14 / the-digital-cellar-be-api
          </Anchor>
          .
        </Text>
        <Text>
          • The output of Laravel BE is OpenAPI documented using Swagger, Swagger can be seen at{' '}
          <Anchor
            target="_blank"
            href="https://www.thedigitalcellar.fitotekno.com/api/documentation"
          >
            Swagger Open API
          </Anchor>
        </Text>
        <Text>• BE has two main modules, namely Module Auth and Module Users</Text>
        <Text>
          • The Auth module protects the application so that only logged-in users can perform CRUD.
        </Text>
        <Text>
          • FTP for access to the backend server can be seen in the email that has been sent.
        </Text>
        <Text>• Laravel BE uses Eloquent ORM to process data on MySQL Database.</Text>
      </Paper>
      <Paper shadow="lg" withBorder p={10} mt={30}>
        <Title order={2} mt={10}>
          REACT FE
        </Title>
        <Text mt={30}>
          • This application uses Next.JS, a React framework.JS which is mature and widely used by
          companies.
        </Text>
        <Text>
          • The FE project can be seen at the following link{' '}
          <Anchor href="https://github.com/Alsania14/the-digital-cellar-fe" target="_blank">
            Alsania14 / the-digital-cellar-fe
          </Anchor>
          .
        </Text>
        <Text>
          • The application uses Mantine UI, a UI Library that provides several ready-to-use
          React.JS Components.
        </Text>
        <Text>
          • The FE application uses React Query, a library to set the state fetching of data to the
          server.
        </Text>
        <Text>
          • This application uses Axios to integrate with BE applications and exchange data in JSON
          form.
        </Text>
        <Text>• Mobile first design.</Text>
      </Paper>
    </Container>
  );
}
