import { ReactElement } from 'react';
import SignInScreen from '@/src/features/auth/presentation/screens/SignInScreen';
import RootLayout from '@/src/shared/presentation/layouts/root-layout/RootLayout';

export default function SignInPage() {
  return <SignInScreen />;
}
SignInPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
