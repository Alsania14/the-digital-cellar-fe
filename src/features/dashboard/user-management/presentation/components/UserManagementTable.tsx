import { useQuery } from '@tanstack/react-query';
import { Button, Flex, Paper, Text, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import DataTable from 'react-data-table-component';
import { useMemo } from 'react';
import { IconEdit, IconEye, IconQuestionMark, IconTrash } from '@tabler/icons-react';
import { useInjection } from '@/src/core/ioc/signature-container-context.ioc';
import { UserManagementUseCase } from '../../domain/usecase/user-management.usecase';
import { CONTAINER_TYPES } from '@/src/core/ioc/signature-type.ioc';
import { UserEntity } from '../../domain/entities/UserEntity';

function NoDataComponent() {
  return (
    <Flex>
      <IconQuestionMark size={20} />
      <Text style={{ marginLeft: 10 }}>There are no users</Text>
    </Flex>
  );
}
export default function UserManagementTable() {
  const userManagementUseCase = useInjection<UserManagementUseCase>(
    CONTAINER_TYPES.USER_MANAGEMENT_USECASE
  );
  const schema = useMantineColorScheme();
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
      {
        name: 'Action',
        cell: (row: UserEntity) => (
          <Flex wrap="wrap" gap={10}>
            <Button
              variant="gradient"
              gradient={{ from: 'teal', to: 'teal' }}
              className="btn btn-outline btn-xs"
              onClick={() => console.log(row.id)}
              size="xs"
            >
              <IconEye size={14} />
            </Button>
            <Button
              variant="gradient"
              gradient={{ from: 'blue', to: 'teal' }}
              className="btn btn-outline btn-xs"
              onClick={() => console.log(row.id)}
              size="xs"
            >
              <IconEdit size={14} />
            </Button>
            <Button
              variant="gradient"
              gradient={{ from: 'pink', to: 'red' }}
              className="btn btn-outline btn-xs"
              onClick={() => console.log(row.id)}
              size="xs"
            >
              <IconTrash size={14} />
            </Button>
          </Flex>
        ),
      },
    ],
    []
  );

  return (
    <Paper style={{ width: '100%', paddingTop: 20 }}>
      <DataTable
        noDataComponent={<NoDataComponent />}
        theme={schema.colorScheme === 'dark' ? 'dark' : 'light'}
        columns={columns}
        data={users ?? []}
      />
    </Paper>
  );
}
