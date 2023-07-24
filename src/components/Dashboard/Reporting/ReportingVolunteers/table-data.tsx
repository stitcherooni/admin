import React from 'react';
import DeleteIcon from '../../../../assets/icons/delete-icon';
import { theme } from '../../../../styles/defaultTheme';
import MessageIcon from '../../../../assets/icons/message-icon';
import TuneOutlined from '@mui/icons-material/TuneOutlined';
import ContentCopyOutlined from '@mui/icons-material/ContentCopyOutlined';
import ButtonIconPdf from '../../../../assets/icons/button-icon-pdf';

export const headCells = [
  {
    id: 'eventName',
    label: 'Name',
    className: 'event-name',
  },
  {
    id: 'dbsChecked',
    label: 'DBS Checked',
    className: 'dbs-checked',
  },
  {
    id: 'firstAider',
    label: 'First Aider',
    className: 'first-aider',
  },
  {
    id: 'email',
    label: 'Email',
    className: 'email',
  },
  {
    id: 'phone',
    label: 'Telephone / Mobile',
    className: 'phone',
  },
  {
    id: 'message',
    label: 'Message',
    className: 'message',
  },
  {
    id: 'date',
    label: 'Date Voluntered',
    className: 'date',
  },
  {
    id: 'actions',
    label: 'Actions',
    className: 'actions',
  },
];

export const rows = [
  {
    id: 1,
    eventName: 'PTA Events Support',
    dbsChecked: false,
    firstAider: false,
    email: 'support@pta-events.co.uk',
    phone: '09672076',
    message: 'Message',
    date: '19/11/2020 18:51',
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
    value: 'tickets',
    label: 'Tickets',
  },
  {
    value: 'vouchers',
    label: 'Vouchers',
  },
  {
    value: 'Prize Draws',
    label: 'Prize Draws',
  },
];

export const actionsOptions = [
  {
    value: 'remove',
    label: 'Remove',
    icon: <DeleteIcon color={theme.colors.main.black} />,
  },
];

export const menuActionsOptions = [
  {
    value: 'message',
    label: 'Email Volunteers',
    icon: <MessageIcon className="email" color={theme.colors.main.black} />,
  },
  {
    value: 'customise-view',
    label: 'Customise View',
    icon: <TuneOutlined className="customize-view" />,
  },
  {
    value: 'copy',
    label: 'Copy',
    icon: <ContentCopyOutlined className="copy" />,
  },
  {
    value: 'pdf',
    label: 'Export Pdf',
    icon: <ButtonIconPdf color={theme.colors.main.black} />,
  },
];