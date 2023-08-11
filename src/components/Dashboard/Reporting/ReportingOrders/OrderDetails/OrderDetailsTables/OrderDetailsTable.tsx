import React, { useMemo } from 'react';
import Table from '@mui/material/Table/Table';
import TableContainer from '@mui/material/TableContainer/TableContainer';
import TableBody from '@mui/material/TableBody/TableBody';
import { TableCell, Head } from '../OrderDetails.styled';
import { OrderStatusBadge, TableContent } from '../../ReportingOrders.styled';
import { TableWrapper, Row as TableRow } from '../../../../../shared/Table/Table.styled';
import { headCells } from '../table-data';
import { getOrderStatus } from '../../utils';
import { Order } from '../../../../../../types/reporting/orders';
import { getCurrencyByCode } from '../../../../../../utils/currency';

const OrderDetailsTable = (props: Order) => {
  const totalPrice = useMemo(
    () => props.history.reduce((acc, current) => acc + current.price.amount * 100, 0) / 100,
    [props.history],
  );

  const totalLineAmount = useMemo(
    () => props.history.reduce((acc, current) => acc + current.lineAmount.amount * 100, 0) / 100,
    [props.history],
  );

  return (
    <TableContent>
      <TableWrapper>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
            <Head cells={headCells} className="table-head" />
            <TableBody>
              {props.history.map((row, i) => (
                <TableRow
                  role="checkbox"
                  tabIndex={-1}
                  key={row.productId}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell className="row-id">
                    <p>{i + 1}</p>
                  </TableCell>
                  <TableCell className="product-id">
                    <p>{row.productId}</p>
                  </TableCell>
                  <TableCell className="product-name">
                    <p>{row.productName}</p>
                  </TableCell>
                  <TableCell className="quantity">
                    <p>{row.quantity}</p>
                  </TableCell>
                  <TableCell className="price">
                    <p>{`${getCurrencyByCode(row.price.currency)}${row.price.amount}`}</p>
                  </TableCell>
                  <TableCell className="line-amount">
                    <p>{`${getCurrencyByCode(row.lineAmount.currency)}${row.lineAmount.amount}`}</p>
                  </TableCell>
                  <TableCell className="status">
                    <OrderStatusBadge
                      className={`order-status ${getOrderStatus(row.status.toLowerCase())}`}
                    >
                      {row.status}
                    </OrderStatusBadge>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="row-id primary" />
                <TableCell className="product-id primary" />
                <TableCell className="product-name primary" />
                <TableCell className="quantity primary">
                  <strong>Total</strong>
                </TableCell>
                <TableCell className="price primary">
                  <strong>{`${getCurrencyByCode('GBP')}${totalPrice}`}</strong>
                </TableCell>
                <TableCell className="line-amount primary">
                  <strong>{`${getCurrencyByCode('GBP')}${totalLineAmount}`}</strong>
                </TableCell>
                <TableCell className="status primary" />
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </TableWrapper>
    </TableContent>
  );
};

export default OrderDetailsTable;
