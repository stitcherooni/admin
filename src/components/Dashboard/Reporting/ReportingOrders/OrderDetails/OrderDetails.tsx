import React from 'react';
import Table from '@mui/material/Table/Table';
import TableContainer from '@mui/material/TableContainer/TableContainer';
import TableBody from '@mui/material/TableBody/TableBody';
import {
  Card, Row, Wrapper, Buttons, OrderTable, TableCell, Head,
} from './OrderDetails.styled';
import { SecondaryButton } from '../../../../shared/Buttons/Buttons.styled';
import MessageIcon from '../../../../../assets/icons/message-icon';
import { theme } from '../../../../../styles/defaultTheme';
import DeleteIcon from '../../../../../assets/icons/delete-icon';
import ArrowLeftDoubleShake from '../../../../../assets/icons/arrow-left-double-shake';
import DeliveryIcon from '../../../../../assets/icons/delivery-icon';
import ButtonIconPdf from '../../../../../assets/icons/button-icon-pdf';
import { OrderStatusBadge, TableContent } from '../ReportingOrders.styled';
import { TableWrapper, Row as TableRow } from '../../../../shared/Table/Table.styled';
import { headCells, rows } from './table-data';
import { getOrderStatus } from '../utils';

const OrderDetails = () => (
  <Wrapper>
    <p className="title">
      Order Details:
      <strong> 1665349</strong>
    </p>
    <Card>
      <Row>
        <strong>Name</strong>
        <p>Emma Shaw</p>
      </Row>
      <Row>
        <strong>School</strong>
        <p>Amherst School</p>
      </Row>
      <Row>
        <strong>Email</strong>
        <p>example@email.com</p>
      </Row>
      <Row>
        <strong>Status</strong>
        <p className="order-status dispatched">Dispatched</p>
      </Row>
      <Row>
        <strong>Value</strong>
        <p>£24.35</p>
      </Row>
      <Row>
        <strong>Transaction ID</strong>
        <p>sdg_873523kd3m3</p>
      </Row>
      <Row>
        <strong>Payer Email</strong>
        <p>example@email.com</p>
      </Row>
      <Row>
        <strong>Payment Method</strong>
        <p>Stripe</p>
      </Row>
    </Card>
    <Buttons>
      <h4>Order Actions</h4>
      <SecondaryButton
        startIcon={<MessageIcon color={theme.colors.main.green} />}
      >
        Resend Confirmation Email
      </SecondaryButton>
      <SecondaryButton
        startIcon={<DeleteIcon color={theme.colors.main.green} />}
      >
        Delete Order
      </SecondaryButton>
      <SecondaryButton
        startIcon={<ArrowLeftDoubleShake color={theme.colors.main.green} />}
      >
        Refund Order
      </SecondaryButton>
      <SecondaryButton
        startIcon={<MessageIcon color={theme.colors.main.green} />}
      >
        Partial refund
      </SecondaryButton>
      <SecondaryButton
        startIcon={<DeliveryIcon color={theme.colors.main.green} />}
      >
        Mark as not dispatched
      </SecondaryButton>
      <SecondaryButton
        startIcon={<ButtonIconPdf />}
      >
        Export delivery note
      </SecondaryButton>
    </Buttons>
    <OrderTable>
      <h4>Order History</h4>
      <TableContent>
        <TableWrapper>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
              <Head cells={headCells} className="table-head" />
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    role="checkbox"
                    tabIndex={-1}
                    key={row.productId}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell className="row-id">
                      <p>{row['row-id']}</p>
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
                      <p>{`${row.currency}${row.price}`}</p>
                    </TableCell>
                    <TableCell className="line-amount">
                      <p>{`${row.currency}${row.lineAmount}`}</p>
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
                    <strong>£8</strong>
                  </TableCell>
                  <TableCell className="line-amount primary">
                    <strong>£8</strong>
                  </TableCell>
                  <TableCell className="status primary" />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </TableWrapper>
      </TableContent>
    </OrderTable>
  </Wrapper>
);

export default OrderDetails;
