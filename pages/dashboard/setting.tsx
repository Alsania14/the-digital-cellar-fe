import { ReactElement } from 'react';
import SettingScreen from '@/src/features/dashboard/setting/presentation/screens/SettingScreen';
import { DashboardLayout } from '@/src/shared/presentation/layouts/dashboard-layout/DashboardLayout';
import RootLayout from '@/src/shared/presentation/layouts/root-layout/RootLayout';

export default function SettingPage() {
  return <SettingScreen />;
}

SettingPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};
