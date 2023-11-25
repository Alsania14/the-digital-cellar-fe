import { Flex, Group, Image, ScrollArea, Text } from '@mantine/core';
import {
  IconGauge,
  IconUser,
  IconApps,
  IconEyeCog,
  IconSettings2,
  IconLogout,
} from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { LinksGroup } from '../../components/navbar-link-group/NavBarLinkGroup';
import { UserButton } from '../../components/user-button/UserButton';
import classes from './DashboardLayout.module.css';

const mockdata = [
  { label: 'Home', icon: IconGauge },
  { label: 'User Management', icon: IconUser },
  { label: 'How To', icon: IconEyeCog },
  { label: 'About App', icon: IconApps },
  { label: 'Setting', icon: IconSettings2 },
  { label: 'Sign Out', icon: IconLogout },
];

type DashboardLayoutProps = {
  children: React.ReactNode;
};
export function DashboardLayout({ children }: DashboardLayoutProps) {
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <nav
        className={classes.navbar}
        style={{ zIndex: 1, position: 'fixed', left: 0, top: 0, bottom: 0 }}
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
            <Text
              variant="gradient"
              fw={{ base: 700, md: 900 }}
              fz={{ base: 18 }}
              component="span"
              gradient={{ from: 'teal', to: 'blue' }}
            >
              THE DIGITAL CELLAR FE
            </Text>
            <Text
              variant="gradient"
              component="span"
              fw={500}
              gradient={{ from: 'teal', to: 'purple' }}
            >
              By Alin Gotama.
            </Text>
          </Group>
        </div>

        <ScrollArea className={classes.links}>
          <div className={classes.linksInner}>{links}</div>
        </ScrollArea>

        <div className={classes.footer}>
          <UserButton />
        </div>
      </nav>
      {children}
    </div>
  );
}
