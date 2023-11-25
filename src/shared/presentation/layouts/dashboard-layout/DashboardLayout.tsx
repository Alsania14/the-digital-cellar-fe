import { Code, Group, ScrollArea, Text } from '@mantine/core';
import { IconGauge, IconUser } from '@tabler/icons-react';
import { LinksGroup } from '../../components/navbar-link-group/NavBarLinkGroup';
import { UserButton } from '../../components/user-button/UserButton';
import classes from './DashboardLayout.module.css';

const mockdata = [
  { label: 'Home', icon: IconGauge },
  { label: 'User Management', icon: IconUser },
  { label: '', icon: IconUser },
];

export function DashboardLayout() {
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <nav className={classes.navbar} style={{ height: '100vh' }}>
      <div className={classes.header}>
        <Group justify="space-between">
          <Text
            variant="gradient"
            fw={{ base: 700, md: 900 }}
            fz={{ base: 18 }}
            component="span"
            gradient={{ from: 'blue', to: 'purple' }}
          >
            THE DIGITAL CELLAR FE
          </Text>
          <Text
            variant="gradient"
            component="span"
            fw={400}
            gradient={{ from: 'teal', to: 'blue' }}
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
  );
}
