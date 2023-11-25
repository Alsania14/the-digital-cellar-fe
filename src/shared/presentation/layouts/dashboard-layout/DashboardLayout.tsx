import { Flex, Group, Image, ScrollArea, Text, ThemeIcon, Transition } from '@mantine/core';
import {
  IconApps,
  IconEyeCog,
  IconGauge,
  IconList,
  IconLogout,
  IconSettings2,
  IconUser,
  IconX,
} from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import Router from 'next/router';
import { LinksGroup } from '../../components/navbar-link-group/NavBarLinkGroup';
import { UserButton } from '../../components/user-button/UserButton';
import classes from './DashboardLayout.module.css';
import { useInjection } from '@/src/core/ioc/signature-container-context.ioc';
import { AuthUseCase } from '@/src/features/auth/domain/usecase/auth.usecase';
import { CONTAINER_TYPES } from '@/src/core/ioc/signature-type.ioc';
import { useMutation } from '@tanstack/react-query';

type DashboardLayoutProps = {
  children: React.ReactNode;
};
export function DashboardLayout({ children }: DashboardLayoutProps) {
  const authUseCase = useInjection<AuthUseCase>(CONTAINER_TYPES.AUTH_USECASE);
  const [isNavigationOpen, setIsNavigationOpen] = useState(true);
  const { mutate } = useMutation({
    mutationKey: ['sign-out', 'profile'],
    mutationFn: async () => {
      authUseCase.signOut();
    },
    onSuccess: () => {
      Router.replace('/');
    },
  });
  const mockdata = useMemo(
    () => [
      {
        label: 'Home',
        icon: IconGauge,
        onClick: () => {
          Router.replace('/dashboard/home');
          setIsNavigationOpen(false);
        },
      },
      {
        label: 'User Management',
        icon: IconUser,
        onClick: () => {
          Router.replace('/dashboard/user-management');
          setIsNavigationOpen(false);
        },
      },
      { label: 'How To', icon: IconEyeCog },
      { label: 'About App', icon: IconApps },
      { label: 'Setting', icon: IconSettings2 },
      { label: 'Sign Out', icon: IconLogout, onClick: () => mutate() },
    ],
    []
  );
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <Transition
        mounted={!isNavigationOpen}
        transition="slide-right"
        duration={600}
        timingFunction="ease"
      >
        {(styles) => (
          <ThemeIcon
            onClick={() => {
              setIsNavigationOpen(() => true);
            }}
            variant="light"
            size={30}
            style={{
              margin: 10,
              position: 'absolute',
              top: 0,

              left: 0,
              cursor: 'pointer',
              ...styles,
            }}
          >
            <IconList width={18} height={18} />
          </ThemeIcon>
        )}
      </Transition>
      <Transition
        mounted={isNavigationOpen}
        transition="slide-right"
        duration={400}
        timingFunction="ease"
      >
        {(styles) => (
          <nav
            className={classes.navbar}
            style={{ position: 'fixed', left: 0, top: 0, bottom: 0, ...styles }}
          >
            <Image
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                zIndex: -1,
                opacity: 0.5,
                rotate: '180deg',
              }}
              src="/decoration-30.png"
              alt="Decoration"
              fit="contain"
              h={{ base: 300, md: 350 }}
              w={{ base: 300, md: 350 }}
            />
            <div className={classes.header}>
              <Group justify="space-between">
                <Flex>
                  <Text
                    variant="gradient"
                    fw={{ base: 700, md: 900 }}
                    fz={{ base: 18 }}
                    lineClamp={1}
                    component="span"
                    gradient={{ from: 'purple', to: 'blue' }}
                  >
                    THE DIGITAL CELLAR FE
                  </Text>
                  <div>
                    <ThemeIcon
                      onClick={() => setIsNavigationOpen(() => false)}
                      variant="light"
                      size={30}
                      style={{ position: 'absolute', right: 0, marginRight: 20, cursor: 'pointer' }}
                    >
                      <IconX width={18} height={18} />
                    </ThemeIcon>
                  </div>
                </Flex>
              </Group>
            </div>

            <ScrollArea className={classes.links}>
              <div className={classes.linksInner}>{links}</div>
            </ScrollArea>

            <div className={classes.footer}>
              <UserButton />
            </div>
          </nav>
        )}
      </Transition>

      {children}
    </div>
  );
}
