import TableBody from '@mui/material/TableBody';
import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { Row } from '../../../shared/Table/Table.styled';
import { TableCell } from './ReportingBanked.styled';
import { getCurrencyByCode, sumTotalAmount } from '../../../../utils/currency';
import { Order } from '../../../../types/reporting/orders';
import { BankedItem } from '../../../../types/reporting/banked';

interface ReportingBankedTableBodyProps {
  handleOrderDetailDrawer: (e: any, order: Order) => void;
  rows: BankedItem[];
  columnsOptions: Map<string, { name: string; checked: boolean }>;
  currency: string;
  dataFound: boolean;
  isSearching: boolean;
}

const ReportingBankedTableBody = (props: ReportingBankedTableBodyProps) => {
  const totalValue = useMemo(() => sumTotalAmount(props.rows.map((item) => item.value)), [props.rows]);
  const totalBankedFee = useMemo(() => sumTotalAmount(props.rows.map((item) => item.bankedFee)), [props.rows]);
  const totalPlatformFee = useMemo(() => sumTotalAmount(props.rows.map((item) => item.platformFee)), [props.rows]);

  return (
    <TableBody>
      {props.rows.map((row) => (
        <Row key={row.num}>
          {props.columnsOptions.get('num')?.checked ? (
            <TableCell className="row-id">
              <p>{row.num}</p>
            </TableCell>
          ) : null}
          {props.columnsOptions.get('orderId')?.checked ? (
            <TableCell
              className="order-id"
              onClick={(e) => props.handleOrderDetailDrawer(e, row.order)}
            >
              <a>{row.orderId}</a>
            </TableCell>
          ) : null}
          {props.columnsOptions.get('transactionId')?.checked ? (
            <TableCell className="transaction-id">
              <p>{row.order.transactionId}</p>
            </TableCell>
          ) : null}
          {props.columnsOptions.get('status')?.checked ? (
            <TableCell className="transaction-status">
              <p>{row.status}</p>
            </TableCell>
          ) : null}
          {props.columnsOptions.get('date')?.checked ? (
            <TableCell className="transaction-date">
              <p>{dayjs(row.date).format('DD/MM/YYYY HH:mm')}</p>
            </TableCell>
          ) : null}
          {props.columnsOptions.get('value')?.checked ? (
            <TableCell className="transaction-value">
              <p>{`${getCurrencyByCode(props.currency)}${row.value}`}</p>
            </TableCell>
          ) : null}
          {props.columnsOptions.get('bankedFee')?.checked ? (
            <TableCell className="banked-fee">
              <p>{`${getCurrencyByCode(props.currency)}${row.bankedFee}`}</p>
            </TableCell>
          ) : null}
          {props.columnsOptions.get('platformFee')?.checked ? (
            <TableCell className="platform-fee">
              <p>{`${getCurrencyByCode(props.currency)}${row.platformFee}`}</p>
            </TableCell>
          ) : null}
        </Row>
      ))}
      {props.rows.length ? (
        <Row className="last">
          {props.columnsOptions.get('num')?.checked ? <TableCell className="row-id" /> : null}
          {props.columnsOptions.get('orderId')?.checked ? (
            <TableCell className="order-id hidden" />
          ) : null}
          {props.columnsOptions.get('transactionId')?.checked ? (
            <TableCell className="transaction-id hidden" />
          ) : null}
          {props.columnsOptions.get('status')?.checked ? (
            <TableCell className="transaction-status hidden" />
          ) : null}
          {props.columnsOptions.get('date')?.checked ? (
            <TableCell className="transaction-date hidden">
              <strong>Total</strong>
            </TableCell>
          ) : null}
          {props.columnsOptions.get('value')?.checked ? (
            <TableCell className="transaction-value">
              <strong>{`${getCurrencyByCode(props.currency)}${totalValue}`}</strong>
            </TableCell>
          ) : null}
          {props.columnsOptions.get('bankedFee')?.checked ? (
            <TableCell className="banked-fee">
              <strong>{`${getCurrencyByCode(props.currency)}${totalBankedFee}`}</strong>
            </TableCell>
          ) : null}
          {props.columnsOptions.get('platformFee')?.checked ? (
            <TableCell className="platform-fee">
              <strong>{`${getCurrencyByCode(props.currency)}${totalPlatformFee}`}</strong>
            </TableCell>
          ) : null}
        </Row>
      ) : null}
      {!props.dataFound && props.isSearching ? (
        <Row className="last">
          <TableCell className="not-found">
            <p>No matches records found</p>
          </TableCell>
        </Row>
      ) : null}
    </TableBody>
  );
};

export default ReportingBankedTableBody;
