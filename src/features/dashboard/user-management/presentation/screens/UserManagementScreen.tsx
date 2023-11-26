import { Button, Flex, Paper, SimpleGrid, Text, getGradient, useMantineTheme } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import DataTable from 'react-data-table-component';
import UserManagementTable from '../components/UserManagementTable';
import UserSummaryPaper from '../components/UserSummaryPaper';
import UserManagementUtil from '../components/UserManagementUtil';

export default function UserManagementScreen() {
  return (
    <Flex
      style={{ minHeight: '100vh', paddingTop: 50, paddingLeft: 10, paddingRight: 10 }}
      justify="flex-start"
      wrap="wrap"
      direction="column"
    >
      <UserManagementUtil />
      <UserSummaryPaper />
      <UserManagementTable />
    </Flex>
  );
}
