import React from 'react';
import { Box, IconButton, Avatar, Tooltip, Typography, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const navItems = [
  { icon: <DashboardIcon fontSize="small" />, key: 'dashboard', label: 'Dashboard' },
  { icon: <AccountBalanceIcon fontSize="small" />, key: 'finance', label: 'Finance' },
  { icon: <PeopleIcon fontSize="small" />, key: 'people', label: 'People' },
  { icon: <SettingsIcon fontSize="small" />, key: 'settings', label: 'Settings' },
];

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const avatarSrc = '/profile.png';
  const brandIconSrc = '/icon.png';
  return (
    <Box display="flex" minHeight="100vh" bgcolor="#f3f4f6">
      {/* Sidebar with icons */}
      <Box
        width={72}
        bgcolor="white"
        boxShadow="0 10px 30px rgba(0,0,0,0.06)"
        display="flex"
        flexDirection="column"
        alignItems="center"
        py={3}
        gap={1.5}
      >
        <Box
          component="img"
          src={brandIconSrc}
          alt="Brand logo"
          width={42}
          height={42}
          sx={{ borderRadius: '10px' }}
          loading="eager"
          decoding="async"
        />
        {navItems.map((item) => (
          <IconButton
            key={item.key}
            size="small"
            aria-label={item.label}
            sx={{
              width: 42,
              height: 42,
              borderRadius: '12px',
              color: '#4a5568',
              '&:hover': { bgcolor: '#e9f2ff', color: '#0d6efd' },
            }}
          >
            {item.icon}
          </IconButton>
        ))}
        {/* User avatar in sidebar footer */}
        <Box mt="auto">
          <Avatar
            src={avatarSrc}
            alt="User avatar"
            sx={{ width: 40, height: 40, borderRadius: '12px' }}
            imgProps={{ loading: 'lazy', decoding: 'async' }}
          />
        </Box>
      </Box>

      {/* Main area */}
      <Box flex={1} display="flex" flexDirection="column">
        {/* Header */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          px={4}
          py={2}
        bgcolor="white"
        boxShadow="0 4px 16px rgba(15, 23, 42, 0.06)"
        borderBottomLeftRadius={24}
        borderBottomRightRadius={24}
        >
          <Box>
            <Typography variant="h6" fontWeight={700}>
              {title || 'John Smith Profile'}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Dashboard &gt; HR manage &gt; Employees &gt; John Smith Profile
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton aria-label="Notifications">
              <NotificationsNoneIcon />
            </IconButton>
            <IconButton aria-label="Messages">
              <MailOutlineIcon />
            </IconButton>
            <IconButton aria-label="Help">
              <HelpOutlineIcon />
            </IconButton>
            <Divider orientation="vertical" flexItem />
            <Tooltip title="John Smith">
              <Avatar
                src={avatarSrc}
                alt="John Smith"
                sx={{ width: 36, height: 36 }}
                imgProps={{ loading: 'lazy', decoding: 'async' }}
              />
            </Tooltip>
          </Box>
        </Box>

        {/* Content */}
        <Box flex={1} p={4}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
