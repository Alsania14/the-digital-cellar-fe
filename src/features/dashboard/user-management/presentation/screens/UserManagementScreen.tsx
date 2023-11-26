import { Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import UserManagementTable from '../components/UserManagementTable';
import UserSummaryPaper from '../components/UserSummaryPaper';
import UserManagementUtil from '../components/UserManagementUtil';
import UserAddFormModal from '../components/UserAddFormModal';
import { UserEntity } from '../../domain/entities/UserEntity';
import UserEditFormModal from '../components/UserEditFormModal';
import UserDeleteFormModal from '../components/UserDeleteFormModal';
import UserReadFormModal from '../components/UserReadFormModal';

export default function UserManagementScreen() {
  const addUserModalDisclosure = useDisclosure();
  const editUserModalDisclosure = useDisclosure();
  const deleteUserModalDisclosure = useDisclosure();
  const readUserModalDisclosure = useDisclosure();
  const [targetUser, setTargetUser] = useState<UserEntity | undefined>();
  return (
    <Flex
      style={{ minHeight: '100vh', paddingTop: 50, paddingLeft: 10, paddingRight: 10 }}
      justify="flex-start"
      wrap="wrap"
      direction="column"
    >
      <UserSummaryPaper />
      <UserManagementTable
        addModalDisclosure={addUserModalDisclosure}
        editModalDisclosure={editUserModalDisclosure}
        deleteModalDisclosure={deleteUserModalDisclosure}
        readModalDisclosure={readUserModalDisclosure}
        setTargetEditUser={setTargetUser}
      />
      <UserAddFormModal modalDisclosure={addUserModalDisclosure} />
      <UserEditFormModal
        modalDisclosure={editUserModalDisclosure}
        user={targetUser}
        setTargetEditUser={setTargetUser}
      />
      <UserDeleteFormModal
        modalDisclosure={deleteUserModalDisclosure}
        user={targetUser}
        setTargetEditUser={setTargetUser}
      />
      <UserReadFormModal
        modalDisclosure={readUserModalDisclosure}
        user={targetUser}
        setTargetEditUser={setTargetUser}
      />
    </Flex>
  );
}
