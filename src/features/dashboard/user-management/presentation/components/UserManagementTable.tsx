import { useQuery } from '@tanstack/react-query';
import { Paper } from '@mantine/core';
import DataTable from 'react-data-table-component';
import { useMemo } from 'react';
import { useInjection } from '@/src/core/ioc/signature-container-context.ioc';
import { UserManagementUseCase } from '../../domain/usecase/user-management.usecase';
import { CONTAINER_TYPES } from '@/src/core/ioc/signature-type.ioc';
import { UserEntity } from '../../domain/entities/UserEntity';

export default function UserManagementTable() {
  const userManagementUseCase = useInjection<UserManagementUseCase>(
    CONTAINER_TYPES.USER_MANAGEMENT_USECASE
  );
  const { data: users } = useQuery({
    queryKey: ['user-management', 'user-management-page'],
    queryFn: async () => {
      const data = await userManagementUseCase.get();
      return data;
    },
  });
  const columns = useMemo(
    () => [
      {
        name: 'Name',
        selector: (row: UserEntity) => row.name,
      },
      {
        name: 'Email',
        selector: (row: UserEntity) => row.email,
      },
    ],
    []
  );

  return (
    <Paper style={{ width: '100%', paddingTop: 20 }}>
      <DataTable theme="dark" columns={columns} data={users ?? []} />
    </Paper>
  );
}
