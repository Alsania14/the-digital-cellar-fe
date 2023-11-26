import {
  Box,
  Button,
  Flex,
  LoadingOverlay,
  Paper,
  Text,
  TextInput,
  getGradient,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconEdit,
  IconEye,
  IconPlus,
  IconQuestionMark,
  IconSearch,
  IconTrash,
} from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { createRef, useCallback, useEffect, useMemo, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { useInjection } from '@/src/core/ioc/signature-container-context.ioc';
import { CONTAINER_TYPES } from '@/src/core/ioc/signature-type.ioc';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserManagementUseCase } from '../../domain/usecase/user-management.usecase';

function NoDataComponent() {
  return (
    <Flex>
      <IconQuestionMark size={20} />
      <Text style={{ marginLeft: 10 }}>There are no users</Text>
    </Flex>
  );
}

type UserEditFormModalProps = {
  addModalDisclosure: ReturnType<typeof useDisclosure>;
  editModalDisclosure: ReturnType<typeof useDisclosure>;
  deleteModalDisclosure: ReturnType<typeof useDisclosure>;
  readModalDisclosure: ReturnType<typeof useDisclosure>;
  setTargetEditUser: (user: UserEntity) => void;
};
export default function UserManagementTable({
  addModalDisclosure,
  editModalDisclosure,
  deleteModalDisclosure,
  readModalDisclosure,
  setTargetEditUser,
}: UserEditFormModalProps) {
  const userManagementUseCase = useInjection<UserManagementUseCase>(
    CONTAINER_TYPES.USER_MANAGEMENT_USECASE
  );
  const schema = useMantineColorScheme();
  const [search, setSearch] = useState<string | undefined>();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const searchInputRef = createRef<HTMLInputElement>();
  const theme = useMantineTheme();
  const {
    data: users,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['user-management', 'user-management-page', 'user-management-table'],
    queryFn: async () => {
      const data = await userManagementUseCase.get({ search, perPage, page });
      return data;
    },
  });
  const columns = useMemo<TableColumn<UserEntity>[]>(
    () => [
      {
        name: '#',
        maxWidth: '70px',
        cell: (row, index) => index + 1 + perPage * (page - 1),
      },
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
    [page]
  );
  const onChangePage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);
  const onChangeRowsPerPage = useCallback((newPerPage: number) => {
    setPerPage(newPerPage);
  }, []);

  useEffect(() => {
    refetch();
  }, [page, perPage, search]);

  return (
    <Paper style={{ width: '100%', paddingTop: 20, paddingBottom: 50 }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearch(searchInputRef.current?.value ?? undefined);
        }}
      >
        <Flex justify="flex-end" mb={10} gap={10}>
          <Box w={{ base: '100%', md: 300 }}>
            <TextInput ref={searchInputRef} placeholder="Search users" />
          </Box>
          <Box>
            <Button
              onClick={() => setSearch(searchInputRef.current?.value ?? undefined)}
              variant="gradient"
              gradient={{ from: 'blue', to: 'purple' }}
            >
              <IconSearch size={14} />
            </Button>
          </Box>
          <Button
            onClick={() => addModalDisclosure[1].open()}
            variant="gradient"
            gradient={{ from: 'blue', to: 'purple' }}
          >
            <IconPlus size={14} style={{ marginRight: 10 }} /> Add new user
          </Button>
        </Flex>
      </form>
      <Box style={{ position: 'relative' }}>
        <LoadingOverlay
          visible={isFetching}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />
        <DataTable
          responsive
          noDataComponent={<NoDataComponent />}
          theme={schema.colorScheme === 'dark' ? 'dark' : 'light'}
          columns={columns}
          data={users?.data ?? []}
          paginationPerPage={perPage}
          paginationDefaultPage={page}
          paginationTotalRows={users?.meta?.total ?? 0}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          pagination
          paginationServer
        />
      </Box>
    </Paper>
  );
}
