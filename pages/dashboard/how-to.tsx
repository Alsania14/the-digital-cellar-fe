import { ReactElement } from 'react';
import HowToScreen from '@/src/features/dashboard/how-to/presentation/screens/HowToScreen';
import { DashboardLayout } from '@/src/shared/presentation/layouts/dashboard-layout/DashboardLayout';
import RootLayout from '@/src/shared/presentation/layouts/root-layout/RootLayout';

export default function HowToPage() {
  return <HowToScreen />;
}

HowToPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};
