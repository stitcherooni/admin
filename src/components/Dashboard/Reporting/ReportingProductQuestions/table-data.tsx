import React from 'react';
import TuneOutlined from "@mui/icons-material/TuneOutlined";
import ContentCopyOutlined from '@mui/icons-material/ContentCopyOutlined';
import ButtonIconPdf from '../../../../assets/icons/button-icon-pdf';
import { theme } from '../../../../styles/defaultTheme';

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

export const productsOptions = [
  {
    value: 1,
    label: 'All Products',
  },
  {
    value: 2,
    label: '£1 Ticket (36)',
  },
  {
    value: 3,
    label: 'Prize Draw Entry',
  },
];

export const menuActionsOptions = [
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
    value: 'excel',
    label: 'Export Excel',
    icon: <ButtonIconPdf color={theme.colors.main.black} />,
  },
  {
    value: 'pdf',
    label: 'Export Pdf',
    icon: <ButtonIconPdf color={theme.colors.main.black} />,
  },
];
