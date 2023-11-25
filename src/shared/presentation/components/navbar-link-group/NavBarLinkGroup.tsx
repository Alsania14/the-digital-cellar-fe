import { Box, Group, ThemeIcon, UnstyledButton, rem } from '@mantine/core';
import { IconCalendarStats } from '@tabler/icons-react';
import classes from './NavbarLinkGroup.module.css';

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  onClick?: () => void;
}

export function LinksGroup({ icon: Icon, label, onClick }: LinksGroupProps) {
  return (
    <UnstyledButton onClick={onClick} className={classes.control}>
      <Group justify="space-between" gap={0}>
        <Box style={{ display: 'flex', alignItems: 'center' }}>
          <ThemeIcon variant="light" size={30}>
            <Icon style={{ width: rem(18), height: rem(18) }} />
          </ThemeIcon>
          <Box ml="md">{label}</Box>
        </Box>
      </Group>
    </UnstyledButton>
  );
}

const mockdata = {
  label: 'Releases',
  icon: IconCalendarStats,
  links: [
    { label: 'Upcoming releases', link: '/' },
    { label: 'Previous releases', link: '/' },
    { label: 'Releases schedule', link: '/' },
  ],
};

export function NavbarLinksGroup() {
  return (
    <Box mih={220} p="md">
      <LinksGroup {...mockdata} />
    </Box>
  );
}
