import { Button, Flex, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import SignatureModal from '@/src/shared/presentation/components/modal/SignatureModal';
import { CONTAINER_TYPES } from '@/src/core/ioc/signature-type.ioc';
import { useInjection } from '@/src/core/ioc/signature-container-context.ioc';
import { UserManagementUseCase } from '../../domain/usecase/user-management.usecase';
import { UserEntity } from '../../domain/entities/UserEntity';

type UserDeleteFormModalProps = {
  user?: UserEntity;
  modalDisclosure: ReturnType<typeof useDisclosure>;
  setTargetEditUser: (user?: UserEntity) => void;
};
export default function UserDeleteFormModal({
  modalDisclosure,
  user,
  setTargetEditUser,
}: UserDeleteFormModalProps) {
  const userManagementUseCase = useInjection<UserManagementUseCase>(
    CONTAINER_TYPES.USER_MANAGEMENT_USECASE
  );
  const queryClient = useQueryClient();
  const [opened, { close }] = modalDisclosure;
  const { mutate } = useMutation({
    mutationKey: ['user-management', 'user-management-page', 'user-delete-form-modal'],
    mutationFn: async (id: number) => {
      await userManagementUseCase.delete(id);
    },
    onSuccess: () => {
      notifications.show({
        title: 'Success !',
        message: 'User deleted successfully',
        color: 'green',
      });
      close?.();
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.some((value) => value === 'user-management'),
      });
    },
  });

  return (
    <SignatureModal
      opened={opened}
      onClose={() => {
        close();
        setTargetEditUser(undefined);
      }}
    >
      <Flex direction="column" gap={10} justify="center" align="center">
        <Text fw={700} ta="center" mb={50}>
          Are you sure to delete user <span style={{ color: 'purple' }}>{user?.name}</span> ?
        </Text>
        <Flex gap={10} style={{ width: '100%' }}>
          <Button variant="outline" style={{ flex: 1 }} onClick={() => close()}>
            BACK
          </Button>
          <Button style={{ flex: 1 }} onClick={() => mutate(user?.id!)}>
            DELETE
          </Button>
        </Flex>
      </Flex>
    </SignatureModal>
  );
}
