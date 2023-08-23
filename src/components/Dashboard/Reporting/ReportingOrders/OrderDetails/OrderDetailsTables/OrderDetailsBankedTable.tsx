import React, { useMemo } from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import { TableCell, Head } from '../OrderDetails.styled';
import { OrderStatusBadge, TableContent } from '../../ReportingOrders.styled';
import { TableWrapper, Row as TableRow } from '../../../../../shared/Table/Table.styled';
import { headCells } from '../table-data';
import { getOrderStatus } from '../../utils';
import { Order } from '../../../../../../types/reporting/orders';
import { getCurrencyByCode, sumTotalAmount } from '../../../../../../utils/currency';

const OrderDetailsBankedTable = (props: Order) => {
  const { history } = props;
  const totalPrice = useMemo(
    () => (!history?.data?.length ? 0
      : sumTotalAmount(history.data.map((item) => item.price.amount))),
    [history],
  );

  const totalLineAmount = useMemo(
    () => (!history?.data?.length ? 0
      : sumTotalAmount(history.data.map((item) => item.lineAmount.amount))),
    [history],
  );

  return (
    <TableContent>
      <TableWrapper>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
            <Head cells={headCells} className="table-head" />
            <TableBody>
              {!history?.data?.length ? null : history.data.map((row, i) => {
                const status = getOrderStatus(row.status);
                return (
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
                      <p>{`${getCurrencyByCode(row.price.currency, row.price.amount)}`}</p>
                    </TableCell>
                    <TableCell className="line-amount">
                      <p>{`${getCurrencyByCode(row.lineAmount.currency, row.lineAmount.amount)}`}</p>
                    </TableCell>
                    <TableCell className="status">
                      <OrderStatusBadge
                        className={`order-status ${status.cls}`}
                      >
                        {status.text}
                      </OrderStatusBadge>
                    </TableCell>
                  </TableRow>
                );
              })}
              {!history?.data?.length ? null : (
                <>
                  <TableRow>
                    <TableCell className="row-id" />
                    <TableCell className="product-id" />
                    <TableCell className="product-name">
                      <p className="refund">Refund</p>
                    </TableCell>
                    <TableCell className="quantity">
                      <p className="refund">{history.refundedQuantity}</p>
                    </TableCell>
                    <TableCell className="price">
                      <p className="refund">{`-${getCurrencyByCode(props.value.currency, totalPrice)}`}</p>
                    </TableCell>
                    <TableCell className="line-amount">
                      <p className="refund">{`-${getCurrencyByCode(props.value.currency, totalLineAmount)}`}</p>
                    </TableCell>
                    <TableCell className="status" />
                  </TableRow>
                  <TableRow>
                    <TableCell className="row-id primary" />
                    <TableCell className="product-id primary" />
                    <TableCell className="product-name primary" />
                    <TableCell className="quantity primary" />
                    <TableCell className="price primary">
                      <strong>Total</strong>
                    </TableCell>
                    <TableCell className="line-amount primary">
                      <strong>{`${getCurrencyByCode(props.value.currency, totalLineAmount)}`}</strong>
                    </TableCell>
                    <TableCell className="status primary" />
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </TableWrapper>
    </TableContent>
  );
};

export default OrderDetailsBankedTable;
