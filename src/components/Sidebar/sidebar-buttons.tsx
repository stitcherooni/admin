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
    id: 1,
    name: 'Dashboard',
    img: <DashboardIcon />,
  },
  {
    id: 2,
    name: 'Events',
    img: <EventsIcon />,
  },
  {
    id: 3,
    name: 'Listings',
    img: <ListingsIcon />,
  },
  {
    id: 4,
    name: 'Admin',
    img: <AdminIcon />,
  },
  {
    id: 5,
    name: 'Reporting',
    img: <ReportingIcon />,
  },
  {
    id: 6,
    name: 'Help & Support',
    img: <SupportIcon />,
  },
  {
    id: 7,
    name: 'Add quicklink to sidebar',
    img: <AddIcon />,
  },
];
