import { GlobalLoading } from '../../components/global-loading/GlobalLoading';

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <GlobalLoading />
      {children}
    </div>
  );
}
