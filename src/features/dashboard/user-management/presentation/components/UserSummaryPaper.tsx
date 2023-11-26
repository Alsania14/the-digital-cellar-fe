import { Paper, SimpleGrid, Text } from '@mantine/core';

export default function UserSummaryPaper() {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }} style={{ paddingTop: 10, width: '100%' }}>
      <Paper
        withBorder
        shadow="md"
        style={{
          padding: 10,
        }}
      >
        <Text fw={900}>Total User</Text>
        <Text>10 Users(s)</Text>
      </Paper>
      <Paper withBorder shadow="md" style={{ padding: 10 }}>
        <Text fw={900}>Added today</Text>
        <Text>1 User(s)</Text>
      </Paper>
    </SimpleGrid>
  );
}
