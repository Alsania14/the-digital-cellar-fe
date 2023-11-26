import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Flex,
  Paper,
  Text,
  getGradient,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useMemo } from 'react';
import { IconEdit, IconEye, IconQuestionMark, IconTrash } from '@tabler/icons-react';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
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

type UserEditFormModalProps = {
  editModalDisclosure: ReturnType<typeof useDisclosure>;
  deleteModalDisclosure: ReturnType<typeof useDisclosure>;
  readModalDisclosure: ReturnType<typeof useDisclosure>;
  setTargetEditUser: (user: UserEntity) => void;
};
export default function UserManagementTable({
  editModalDisclosure,
  deleteModalDisclosure,
  readModalDisclosure,
  setTargetEditUser,
}: UserEditFormModalProps) {
  const userManagementUseCase = useInjection<UserManagementUseCase>(
    CONTAINER_TYPES.USER_MANAGEMENT_USECASE
  );
  const schema = useMantineColorScheme();
  const theme = useMantineTheme();
  const { data: users } = useQuery({
    queryKey: ['user-management', 'user-management-page'],
    queryFn: async () => {
      const data = await userManagementUseCase.get();
      return data;
    },
  });
  const columns = useMemo<TableColumn<UserEntity>[]>(
    () => [
      {
        width: 'auto',
        right: true,
        maxWidth: '70px',
        cell: (row: UserEntity) => (
          <Flex wrap="wrap" gap={10}>
            <Paper
              style={{
                height: 30,
                width: 30,
                borderRadius: 30,
                position: 'relative',
                background: getGradient({ from: 'blue', to: 'teal' }, theme),
              }}
            >
              <Flex justify="center" align="center" style={{ height: '100%' }}>
                <Text ta="center" tt="capitalize" fw={600}>
                  {row?.name?.at(0) ?? '?'}
                </Text>
              </Flex>
            </Paper>
          </Flex>
        ),
      },
      {
        name: 'Name',
        cell: (row: UserEntity) => (
          <Flex wrap="wrap" gap={10}>
            <Text lineClamp={1} fz={12} tt="capitalize">
              {row?.name}
            </Text>
          </Flex>
        ),
      },
      {
        name: 'Email',
        cell: (row: UserEntity) => (
          <Flex wrap="wrap" gap={10}>
            <Text lineClamp={1} fz={12} tt="lowercase">
              {row?.email}
            </Text>
          </Flex>
        ),
      },
      {
        name: 'Action',
        cell: (row: UserEntity) => (
          <Flex wrap="wrap" gap={10} m={10}>
            <Button
              variant="gradient"
              gradient={{ from: 'teal', to: 'teal' }}
              className="btn btn-outline btn-xs"
              onClick={() => {
                setTargetEditUser(row);
                readModalDisclosure[1].open();
              }}
              size="xs"
            >
              <IconEye size={14} />
            </Button>
            <Button
              variant="gradient"
              gradient={{ from: 'blue', to: 'teal' }}
              className="btn btn-outline btn-xs"
              onClick={() => {
                setTargetEditUser(row);
                editModalDisclosure[1].open();
              }}
              size="xs"
            >
              <IconEdit size={14} />
            </Button>
            <Button
              variant="gradient"
              gradient={{ from: 'pink', to: 'red' }}
              className="btn btn-outline btn-xs"
              onClick={() => {
                setTargetEditUser(row);
                deleteModalDisclosure[1].open();
              }}
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
    <Paper style={{ width: '100%', paddingTop: 20, paddingBottom: 50 }}>
      <DataTable
        noDataComponent={<NoDataComponent />}
        theme={schema.colorScheme === 'dark' ? 'dark' : 'light'}
        columns={columns}
        data={users ?? []}
      />
    </Paper>
  );
}
