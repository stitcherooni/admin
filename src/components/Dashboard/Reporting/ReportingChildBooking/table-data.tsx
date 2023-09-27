import React from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { ContentCopyOutlined, TuneOutlined } from '@mui/icons-material';
import { theme } from '../../../../styles/defaultTheme';
import MessageIcon from '../../../../assets/icons/message-icon';
import ButtonIconPdf from '../../../../assets/icons/button-icon-pdf';

export const headCells = [
  {
    id: 'firstName',
    label: 'First Name',
    className: 'first-name',
  },
  {
    id: 'lastName',
    label: 'Last Name',
    className: 'last-name',
  },
  {
    id: 'class',
    label: 'Class',
    className: 'class',
  },
  {
    id: 'bookedBy',
    label: 'Booked by',
    className: 'booked-by',
  },
  {
    id: 'allergies',
    label: 'Dietary / Medical',
    className: 'medical',
  },
  {
    id: 'phone',
    label: 'Telephone / Mobile',
    className: 'phone',
  },
];

export const rows = [
  {
    id: 1,
    firstName: 'David',
    lastName: 'Cooke',
    bookedBy: 'David Cooke',
    phone: '0967207681',
    medical: 'medical and dietary data',
  },
];

export const eventOptions = [
  {
    value: 2020,
    label: 2020,
    subMenu: [
      {
        value: 10,
        label: 'Fireworks / Bonfire night',
      },
      {
        value: 11,
        label: 'Cinema',
      },
    ],
  },
];

export const groupByOptions = [
  {
    value: 'className',
    label: 'Class Name',
  },
  {
    value: 'productName',
    label: 'Product Name',
  },
  {
    value: 'productOrder',
    label: 'Product Order',
  },
  {
    value: 'bookingName',
    label: 'Booking Name',
  },
];

export const menuActionsOptions = [
  {
    value: 'test-bookings',
    label: 'Show Test Bookings',
    icon: <ShoppingCartOutlinedIcon className="test-orders" />,
  },
  {
    value: 'live-bookings',
    label: 'Show Live Bookings',
    icon: <ShoppingCartOutlinedIcon className="test-orders" />,
  },
  {
    value: 'customize-view',
    label: 'Customise View',
    icon: <TuneOutlined className="customize-view" />,
  },
  {
    value: 'copy',
    label: 'Copy',
    icon: <ContentCopyOutlined className="copy" />,
  },
  {
    value: 'excel',
    label: 'Export to Excel',
    icon: <ButtonIconPdf color={theme.colors.main.black} />,
  },
  {
    value: 'pdf',
    label: 'Export to PDF',
    icon: <ButtonIconPdf color={theme.colors.main.black} />,
  },
];
