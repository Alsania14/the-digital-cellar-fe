import { Button, Flex } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

export default function UserManagementUtil() {
  return (
    <Flex justify="flex-end">
      <Button variant="gradient" gradient={{ from: 'blue', to: 'purple' }}>
        <IconPlus size={14} style={{ marginRight: 10 }} /> Add new user
      </Button>
    </Flex>
  );
}
