import { Button, Flex, Image, Paper, Text, getGradient, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import SignatureModal from '@/src/shared/presentation/components/modal/SignatureModal';
import { UserEntity } from '../../domain/entities/UserEntity';

type UserReadFormModalProps = {
  user?: UserEntity;
  modalDisclosure: ReturnType<typeof useDisclosure>;
  setTargetEditUser: (user?: UserEntity) => void;
};
export default function UserReadFormModal({
  modalDisclosure,
  user,
  setTargetEditUser,
}: UserReadFormModalProps) {
  const [opened, { close }] = modalDisclosure;
  const theme = useMantineTheme();

  return (
    <SignatureModal
      onClose={() => {
        close();
        setTargetEditUser(undefined);
      }}
      withCloseButton={false}
      opened={opened}
    >
      <Image
        style={{ position: 'absolute', top: 0, right: 0, zIndex: -1 }}
        src="/decoration-30.png"
        alt="Decoration"
        fit="contain"
        h={{ base: 150, md: 175 }}
        w={{ base: 150, md: 175 }}
      />
      <Image
        style={{ position: 'absolute', bottom: 0, left: 0, zIndex: -1, rotate: '180deg' }}
        src="/decoration-30.png"
        alt="Decoration"
        fit="contain"
        h={{ base: 150, md: 175 }}
        w={{ base: 150, md: 175 }}
      />
      <Flex direction="column" gap={10} mt={30}>
        <Flex wrap="wrap" gap={10} justify="center">
          <Paper
            style={{
              height: 100,
              width: 100,
              borderRadius: 100,
              position: 'relative',
              background: getGradient({ from: 'blue', to: 'teal' }, theme),
            }}
          >
            <Flex justify="center" align="center" style={{ height: '100%' }}>
              <Text ta="center" tt="uppercase" fw={600} fz={40}>
                {user?.name?.at(0) ?? '?'}
              </Text>
            </Flex>
          </Paper>
        </Flex>
        <Text
          variant="gradient"
          fw={{ base: 700, md: 900 }}
          fz={{ base: 18 }}
          ta="center"
          tt="uppercase"
          mt={30}
          lineClamp={1}
          component="span"
          gradient={{ from: 'purple', to: 'blue' }}
        >
          {user?.name}
        </Text>
        <Text
          variant="gradient"
          fz={{ base: 14 }}
          ta="center"
          tt="lowercase"
          lineClamp={1}
          component="span"
          gradient={{ from: 'teal', to: 'blue' }}
        >
          {user?.email}
        </Text>
        <Flex gap={10} mt={50}>
          <Button variant="outline" style={{ flex: 1 }} onClick={() => close()}>
            BACK
          </Button>
        </Flex>
      </Flex>
    </SignatureModal>
  );
}
