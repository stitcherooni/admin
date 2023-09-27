import React from 'react';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import QrCodeIcon from '../../../../assets/icons/qrcode-icon';
import { theme } from '../../../../styles/defaultTheme';
import DownloadIcon from '../../../../assets/icons/download-icon';
import TuneOutlined from '@mui/icons-material/TuneOutlined';
import ContentCopyOutlined from '@mui/icons-material/ContentCopyOutlined';
import ButtonIconPdf from '../../../../assets/icons/button-icon-pdf';

export const headCells = [
  {
    id: 'row-id',
    label: '##',
    className: 'row-id',
  },
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
    id: 'productName',
    label: 'Product Name',
    className: 'product-name',
  },
  {
    id: 'orderId',
    label: 'Order ID',
    className: 'order-id',
  },
  {
    id: 'ticketNumber',
    label: 'Ticket #',
    className: 'ticket-id',
  },
  {
    id: 'bookingInfo',
    label: 'Booking Info',
    className: 'booking-info',
  },
  {
    id: 'winningPrize',
    label: 'Winning Prize',
    className: 'winning-prize',
  },
  {
    id: 'scanDate',
    label: 'Scan Date',
    className: 'scan-date',
  },
  {
    id: 'actions',
    label: 'Actions',
    className: 'actions',
  },
];

export const rows = [
  {
    'row-id': 1,
    id: 1,
    firstName: 'Alex',
    lastName: 'Crossman',
    product: 'Fireworks Ticket',
    orderId: 11111,
    ticketId: '34234324',
    bookingInfo: 'booking info',
    winningPrize: 'winning prize',
    scanDate: '23 May 2023',
  },
];

export const actionsOptions = [
  {
    value: 'qr',
    label: 'QR code',
    icon: <QrCodeIcon color={theme.colors.main.black} />,
  },
  {
    value: 'download',
    label: 'Download ticket',
    icon: <DownloadIcon color={theme.colors.main.black} />,
  },
];

export const menuActionsOptions = [
  {
    value: 'prize',
    label: 'Hold Prize Draw (Beta)',
    icon: <EmojiEventsOutlinedIcon className="prize" />,
  },
  {
    value: 'qflow',
    label: 'Sync to Qflow',
    icon: <QrCodeIcon color={theme.colors.main.black} className="qr" />,
  },
  {
    value: 'test-tickets',
    label: 'Show Test Tickets',
    icon: <LocalActivityOutlinedIcon className="ticket" />,
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
    value: 'csv',
    label: 'Export to CSV',
    icon: <ButtonIconPdf color={theme.colors.main.black} />,
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
