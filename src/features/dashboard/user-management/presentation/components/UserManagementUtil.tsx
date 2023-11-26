import { Button, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';

type UserManagementUtilProps = {
  modalDisclosure: ReturnType<typeof useDisclosure>;
};
export default function UserManagementUtil({ modalDisclosure }: UserManagementUtilProps) {
  const { open } = modalDisclosure[1];
  return (
    <Flex justify="flex-end">
      <Button onClick={open} variant="gradient" gradient={{ from: 'blue', to: 'purple' }}>
        <IconPlus size={14} style={{ marginRight: 10 }} /> Add new user
      </Button>
    </Flex>
  );
}
