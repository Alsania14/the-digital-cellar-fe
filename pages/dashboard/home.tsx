import { ReactElement } from 'react';
import RootLayout from '@/src/shared/presentation/layouts/root-layout/RootLayout';
import { DashboardLayout } from '@/src/shared/presentation/layouts/dashboard-layout/DashboardLayout';
import HomeScreen from '@/src/features/dashboard/home/presentation/HomeScreen/HomeScreen';

export default function HomePage() {
  return <HomeScreen />;
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};
