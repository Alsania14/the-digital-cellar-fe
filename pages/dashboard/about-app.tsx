import { ReactElement } from 'react';
import { DashboardLayout } from '@/src/shared/presentation/layouts/dashboard-layout/DashboardLayout';
import RootLayout from '@/src/shared/presentation/layouts/root-layout/RootLayout';
import AboutAppScreen from '@/src/features/dashboard/about-app/presentation/screens/AboutAppScreen';

export default function AboutAppPage() {
  return <AboutAppScreen />;
}

AboutAppPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};
