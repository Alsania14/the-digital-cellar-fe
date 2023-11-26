import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Flex, LoadingOverlay, PasswordInput, Text, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect } from 'react';
import SignatureModal from '@/src/shared/presentation/components/modal/SignatureModal';
import { CONTAINER_TYPES } from '@/src/core/ioc/signature-type.ioc';
import { useInjection } from '@/src/core/ioc/signature-container-context.ioc';
import { UserDto } from '../../domain/dto/user.dto';
import { UserManagementUseCase } from '../../domain/usecase/user-management.usecase';
import { UserEntity } from '../../domain/entities/UserEntity';
import { DefaultException } from '@/src/core/exceptions/default.exception';

const editUserSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email().min(2),
    password: z.string().min(6),
    passwordConfirm: z.string().min(6),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ['passwordConfirm'],
  });

type UserAddFormModalProps = {
  user?: UserEntity;
  modalDisclosure: ReturnType<typeof useDisclosure>;
  setTargetEditUser: (user?: UserEntity) => void;
};
export default function UserEditFormModal({
  modalDisclosure,
  user,
  setTargetEditUser,
}: UserAddFormModalProps) {
  const userManagementUseCase = useInjection<UserManagementUseCase>(
    CONTAINER_TYPES.USER_MANAGEMENT_USECASE
  );
  const queryClient = useQueryClient();
  const [opened, { close }] = modalDisclosure;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserDto & { passwordConfirm?: string }>({
    resolver: zodResolver(editUserSchema),
  });
  useEffect(() => {
    reset({
      name: user?.name,
      email: user?.email,
      password: '',
      passwordConfirm: '',
    });
  }, [user]);
  const { mutate, isPending } = useMutation({
    mutationKey: ['user-management', 'user-management-page', 'user-update-form-modal'],
    mutationFn: async ({ id, ...userDto }: UserDto & { id: number }) =>
      userManagementUseCase.update(id, userDto),
    onSuccess: () => {
      notifications.show({
        title: 'Success !',
        message: 'Successful Updating User Data',
        color: 'green',
      });
      close?.();
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.some((value) => value === 'user-management'),
      });
    },
    onError: (e) => {
      if (e instanceof DefaultException) {
        notifications.show({
          title: 'Error !',
          message: e.message,
          color: 'red',
        });
      } else {
        notifications.show({
          title: 'Error !',
          message: 'User delete failed',
          color: 'red',
        });
      }
    },
  });

  return (
    <SignatureModal
      onClose={() => {
        if (isPending) return;
        close();
        reset({ email: '', name: '', password: '', passwordConfirm: '' });
        setTargetEditUser(undefined);
      }}
      opened={opened}
      title="EDIT USER"
    >
      <Flex direction="column" gap={10}>
        <LoadingOverlay
          visible={isPending}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />
        <TextInput
          label="Name"
          placeholder="A beautiful name"
          required
          {...register('name')}
          error={errors?.name?.message}
        />
        <TextInput
          label="Email"
          placeholder="example@thedigitalcellar.com"
          inputMode="email"
          required
          {...register('email')}
          error={errors?.email?.message}
        />
        <PasswordInput
          label="Password"
          placeholder="World class password"
          required
          {...register('password')}
          error={errors?.password?.message}
        />
        <PasswordInput
          label="Password Confirmation"
          placeholder="Confirm your world class password"
          required
          {...register('passwordConfirm')}
          error={errors?.passwordConfirm?.message}
        />
        <Text mt={30} size="xs" opacity={0.5}>
          Make sure all data is correct !
        </Text>
        <Flex gap={10}>
          <Button
            variant="outline"
            style={{ flex: 1 }}
            onClick={() =>
              reset({
                name: user?.name,
                email: user?.email,
                password: '',
                passwordConfirm: '',
              })
            }
          >
            RESET
          </Button>
          <Button
            style={{ flex: 1 }}
            onClick={handleSubmit((data) => {
              mutate({ ...data, id: user?.id! });
            })}
          >
            SAVE
          </Button>
        </Flex>
      </Flex>
    </SignatureModal>
  );
}
