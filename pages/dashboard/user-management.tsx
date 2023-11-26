import { ReactElement } from 'react';
import { DashboardLayout } from '@/src/shared/presentation/layouts/dashboard-layout/DashboardLayout';
import RootLayout from '@/src/shared/presentation/layouts/root-layout/RootLayout';
import UserManagementScreen from '@/src/features/dashboard/user-management/presentation/screens/UserManagementScreen';

export default function UserManagementPage() {
  return <UserManagementScreen />;
}

UserManagementPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};
