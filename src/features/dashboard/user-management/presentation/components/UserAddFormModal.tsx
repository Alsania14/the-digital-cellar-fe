import { useInjection } from '@/src/core/ioc/signature-container-context.ioc';
import { CONTAINER_TYPES } from '@/src/core/ioc/signature-type.ioc';
import SignatureModal from '@/src/shared/presentation/components/modal/SignatureModal';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Flex, PasswordInput, Text, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { UserDto } from '../../domain/dto/user.dto';
import { UserManagementUseCase } from '../../domain/usecase/user-management.usecase';

const createUserSchema = z
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
  modalDisclosure: ReturnType<typeof useDisclosure>;
};
export default function UserAddFormModal({ modalDisclosure }: UserAddFormModalProps) {
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
  } = useForm<UserDto & { passwordConfirm: string }>({
    resolver: zodResolver(createUserSchema),
  });
  const { mutate } = useMutation({
    mutationKey: ['user-management', 'user-management-page', 'user-add-form-modal'],
    mutationFn: async (userDto: UserDto) => {
      await userManagementUseCase.create(userDto);
    },
    onSuccess: () => {
      notifications.show({
        title: 'Success !',
        message: 'User created successfully',
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
      onClose={() => {
        close();
        reset({ email: '', name: '', password: '', passwordConfirm: '' });
      }}
      opened={opened}
      title="ADD NEW USER"
    >
      <Flex direction="column" gap={10}>
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
                name: '',
                email: '',
                password: '',
                passwordConfirm: '',
              })
            }
          >
            RESET
          </Button>
          <Button style={{ flex: 1 }} onClick={handleSubmit((data) => mutate(data))}>
            SAVE
          </Button>
        </Flex>
      </Flex>
    </SignatureModal>
  );
}
