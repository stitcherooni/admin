import React from 'react';
import dayjs from 'dayjs';
import TableBody from '@mui/material/TableBody';
import { Row } from '../../../shared/Table/Table.styled';
import { TableCell, TextButton } from './ReportingBooking.styled';
import { getCurrencyByCode } from '../../../../utils/currency';
import { BookingStatItem } from '../../../../types/reporting/bookings';
import { Order } from '../../../../types/reporting/orders';

interface ReportingBookingTableBodyProps {
  rows: BookingStatItem[];
  columnsOptions: Map<string, any>;
  handleOrderDetailDrawer: (e: React.SyntheticEvent, order?: Order | null) => void;
  dataFound: boolean;
  dataSearching: boolean;
}

const ReportingBookingTableBody = (props: ReportingBookingTableBodyProps) => (
  <TableBody>
    {props.rows.map((row, index) => (
      <Row
        tabIndex={-1}
        key={row.num}
        className={props.rows.length - 1 === index ? 'last' : ''}
      >
        {props.columnsOptions.get('num')?.checked ? (
          <TableCell className="row-id">
            <p>{row.num}</p>
          </TableCell>
        ) : null}
        {props.columnsOptions.get('firstName')?.checked ? (
          <TableCell className="first-name">
            <p>{row.firstName}</p>
          </TableCell>
        ) : null}
        {props.columnsOptions.get('lastName')?.checked ? (
          <TableCell className="last-name">
            <p>{row.lastName}</p>
          </TableCell>
        ) : null}
        {props.columnsOptions.get('bookingName')?.checked ? (
          <TableCell className="booking-name">
            <p>{row.bookingName}</p>
          </TableCell>
        ) : null}
        {props.columnsOptions.get('class')?.checked ? (
          <TableCell className="class">
            <p>{row.class}</p>
          </TableCell>
        ) : null}
        {props.columnsOptions.get('bookingInfo')?.checked ? (
          <TableCell className="booking-info">
            <p>{row.bookingInfo}</p>
          </TableCell>
        ) : null}
        {props.columnsOptions.get('sku')?.checked ? (
          <TableCell className="sku">
            <p>{row.sku}</p>
          </TableCell>
        ) : null}
        {props.columnsOptions.get('product.name')?.checked ? (
          <TableCell className="product">
            <p>{row.product.name}</p>
          </TableCell>
        ) : null}
        {props.columnsOptions.get('price')?.checked ? (
          <TableCell className="price">
            <p>{`${getCurrencyByCode(row?.currency ?? 'GBP', row.price)}`}</p>
          </TableCell>
        ) : null}
        {props.columnsOptions.get('quantity')?.checked ? (
          <TableCell className="quantity">
            <p>{row.quantity}</p>
          </TableCell>
        ) : null}
        {props.columnsOptions.get('orderId')?.checked ? (
          <TableCell className="order-id">
            <TextButton
              onClick={(e) => props.handleOrderDetailDrawer(e, row.order)}
            >
              {row.orderId}
            </TextButton>
          </TableCell>
        ) : null}
        {props.columnsOptions.get('date')?.checked ? (
          <TableCell className="order-date">
            <p>{dayjs(row.date).format('DD/MM/YYYY HH:mm')}</p>
          </TableCell>
        ) : null}
        {props.columnsOptions.get('customerName')?.checked ? (
          <TableCell className="booked-by">
            <p>{row.customerName}</p>
          </TableCell>
        ) : null}
        {props.columnsOptions.get('phone')?.checked ? (
          <TableCell className="phone">
            <p>{row.phone}</p>
          </TableCell>
        ) : null}
        {props.columnsOptions.get('email')?.checked ? (
          <TableCell className="email">
            <p>{row.email}</p>
          </TableCell>
        ) : null}
        {props.columnsOptions.get('paymentMethod')?.checked ? (
          <TableCell className="payment-method">
            <p>{row.paymentMethod}</p>
          </TableCell>
        ) : null}
      </Row>
    ))}
    {!props.dataFound && props.dataSearching ? (
      <Row className="last">
        <TableCell className="not-found">
          <p>No matches records found</p>
        </TableCell>
      </Row>
    ) : null}
  </TableBody>
);

export default ReportingBookingTableBody;
