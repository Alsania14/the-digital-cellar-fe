import { LoadingOverlay, Paper, SimpleGrid, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useInjection } from '@/src/core/ioc/signature-container-context.ioc';
import { CONTAINER_TYPES } from '@/src/core/ioc/signature-type.ioc';
import { UserManagementUseCase } from '../../domain/usecase/user-management.usecase';

export default function UserSummaryPaper() {
  const userManagementUseCase = useInjection<UserManagementUseCase>(
    CONTAINER_TYPES.USER_MANAGEMENT_USECASE
  );
  const { data, isFetching } = useQuery({
    queryKey: ['user-management', 'user-management-page', 'user-management-summary'],
    queryFn: async () => {
      const userSummary = await userManagementUseCase.getSummary();
      return userSummary;
    },
  });
  return (
    <SimpleGrid cols={{ base: 1, sm: 2 }} style={{ paddingTop: 10, width: '100%' }}>
      <Paper
        withBorder
        shadow="md"
        style={{
          padding: 10,
          position: 'relative',
        }}
      >
        <LoadingOverlay
          visible={isFetching}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />
        <Text fw={900}>Total User</Text>
        <Text>{data?.userTotal ?? 0} Users(s)</Text>
      </Paper>
      <Paper withBorder shadow="md" style={{ padding: 10, position: 'relative' }}>
        <LoadingOverlay
          visible={isFetching}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />
        <Text fw={900}>Added today</Text>
        <Text>{data?.userTodayTotal ?? 0} User(s)</Text>
      </Paper>
    </SimpleGrid>
  );
}
