import { useInjection } from '@/src/core/ioc/signature-container-context.ioc';
import { CONTAINER_TYPES } from '@/src/core/ioc/signature-type.ioc';
import SignatureModal from '@/src/shared/presentation/components/modal/SignatureModal';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, LoadingOverlay, Paper, PasswordInput, Text, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SignInDto } from '../../../domain/dto/sign-in.dto';
import { AuthUseCase } from '../../../domain/usecase/auth.usecase';

const signInSchema = z.object({
  email: z.string().email().min(2),
  password: z.string().min(6),
});

export default function SignInForm() {
  const authUseCase = useInjection<AuthUseCase>(CONTAINER_TYPES.AUTH_USECASE);
  const [isModalSuccessOpen, modalSuccessAction] = useDisclosure();
  const [isModalErrorOpen, modalErrorAction] = useDisclosure();
  const router = useRouter();
  const { isPending, mutate } = useMutation({
    mutationKey: ['sign-in', 'sign-in-page'],
    mutationFn: async (signInDto: SignInDto) => {
      const token = await authUseCase.signIn(signInDto);
      return token;
    },
    onSuccess: () => {
      router.replace('/dashboard/home');
    },
    onError: () => {
      modalErrorAction.open();
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInDto>({
    resolver: zodResolver(signInSchema),
  });
  return (
    <>
      <Paper withBorder shadow="md" mt={30} radius="md" w={{ base: '90%', sm: 450 }}>
        <Box pos="relative" p={30}>
          <LoadingOverlay
            visible={isPending}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
          />
          <TextInput
            label="Email"
            placeholder="example@thedigitalcellar.com"
            required
            {...register('email')}
            error={errors.email?.message}
          />
          <PasswordInput
            {...register('password')}
            label="Password"
            placeholder="Your password"
            required
            error={errors.password?.message}
            mt="md"
          />
          <Button onClick={handleSubmit((data) => mutate(data))} fullWidth mt="xl">
            Sign in
          </Button>
        </Box>
      </Paper>
      <SignatureModal
        opened={isModalSuccessOpen}
        onClose={modalSuccessAction.close}
        title="Success Sign In"
        centered
      >
        <Text>HALO</Text>
      </SignatureModal>
      <SignatureModal opened={isModalErrorOpen} onClose={modalErrorAction.close} title="Ooppss...">
        <Text style={{ color: 'red' }}>
          Failed to sign in, Please check your credential and try again
        </Text>
      </SignatureModal>
    </>
  );
}
