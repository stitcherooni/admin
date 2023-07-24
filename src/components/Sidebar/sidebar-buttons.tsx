import React from 'react';
import AddIcon from '../../assets/icons/add-icon';
import AdminIcon from '../../assets/icons/admin-icon';
import DashboardIcon from '../../assets/icons/dashboard-icon';
import EventsIcon from '../../assets/icons/events-icon';
import ListingsIcon from '../../assets/icons/listings-icon';
import ReportingIcon from '../../assets/icons/reporting-icon';
import SupportIcon from '../../assets/icons/support-icon';

export const sidebarButtons = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    img: <DashboardIcon />,
  },
  {
    id: 'events',
    name: 'Events',
    img: <EventsIcon />,
  },
  {
    id: 'listings',
    name: 'Listings',
    img: <ListingsIcon />,
  },
  {
    id: 'admin',
    name: 'Admin',
    img: <AdminIcon />,
  },
  {
    id: 'reporting',
    name: 'Reporting',
    img: <ReportingIcon />,
  },
  {
    id: 'help',
    name: 'Help & Support',
    img: <SupportIcon />,
  },
  {
    id: 'quick-link',
    name: 'Add quicklink to sidebar',
    img: <AddIcon />,
  },
];
