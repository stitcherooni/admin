import React from 'react';
import {
  Card, Row, Wrapper, Buttons, OrderTable,
} from './OrderDetails.styled';
import { SecondaryButton } from '../../../../shared/Buttons/Buttons.styled';
import MessageIcon from '../../../../../assets/icons/message-icon';
import { theme } from '../../../../../styles/defaultTheme';
import DeleteIcon from '../../../../../assets/icons/delete-icon';
import ArrowLeftDoubleShake from '../../../../../assets/icons/arrow-left-double-shake';
import DeliveryIcon from '../../../../../assets/icons/delivery-icon';
import ButtonIconPdf from '../../../../../assets/icons/button-icon-pdf';
import { OrderStatusBadge } from '../ReportingOrders.styled';
import { getOrderStatus } from '../utils';
import { Order } from '../../../../../types/reporting/orders';
import { getCurrencyByCode } from '../../../../../utils/currency';
import OrderDetailsTable from './OrderDetailsTables/OrderDetailsTable';
import OrderDetailsBankedTable from './OrderDetailsTables/OrderDetailsBankedTable';

interface OrderDetailsProps {
  data: Order;
  needsActions: boolean;
  type: string;
}

const OrderDetails = (props: OrderDetailsProps) => {
  const { data, needsActions, type } = props;
  const resendEmail = (e: React.SyntheticEvent, email: string) => {
    e.preventDefault();
  };

  const removeOrder = (e: React.SyntheticEvent, orderId: number) => {};
  const status = getOrderStatus(data.status);

  return (
    <Wrapper>
      <p className="title">
        Order Details:
        <strong>{` ${data.id}`}</strong>
      </p>
      <Card className={needsActions ? '' : 'mb'}>
        <Row>
          <strong>Name</strong>
          <p>{data.customerName}</p>
        </Row>
        <Row>
          <strong>School</strong>
          <p>{data.schoolName}</p>
        </Row>
        <Row>
          <strong>Email</strong>
          <p>{data.email}</p>
        </Row>
        <Row>
          <strong>Status</strong>
          <OrderStatusBadge
            className={`order-status ${status.cls}`}
          >
            {status.text}
          </OrderStatusBadge>
        </Row>
        <Row>
          <strong>Value</strong>
          <p>{`${getCurrencyByCode(data.value.currency, data.value.amount)}`}</p>
        </Row>
        <Row>
          <strong>Transaction ID</strong>
          <p>{data.transactionId}</p>
        </Row>
        <Row>
          <strong>Payer Email</strong>
          <p>{data.payerEmail}</p>
        </Row>
        <Row>
          <strong>Payment Method</strong>
          <p>{data.paymentMethod}</p>
        </Row>
      </Card>
      {needsActions ? (
        <Buttons>
          <h4>Order Actions</h4>
          <SecondaryButton startIcon={<MessageIcon color={theme.colors.main.green} />}>
            Resend Confirmation Email
          </SecondaryButton>
          <SecondaryButton
            startIcon={<DeleteIcon color={theme.colors.main.green} />}
            onClick={(e) => removeOrder(e, props.data.id)}
          >
            Delete Order
          </SecondaryButton>
          <SecondaryButton startIcon={<ArrowLeftDoubleShake color={theme.colors.main.green} />}>
            Refund Order
          </SecondaryButton>
          <SecondaryButton startIcon={<MessageIcon color={theme.colors.main.green} />}>
            Partial refund
          </SecondaryButton>
          <SecondaryButton startIcon={<DeliveryIcon color={theme.colors.main.green} />}>
            Mark as not dispatched
          </SecondaryButton>
          <SecondaryButton startIcon={<ButtonIconPdf />}>Export delivery note</SecondaryButton>
        </Buttons>
      ) : null}
      <OrderTable>
        <h4>Order History</h4>
        { type !== 'banked' ? <OrderDetailsTable {...data} /> : <OrderDetailsBankedTable {...data} /> }
      </OrderTable>
    </Wrapper>
  );
};

export default OrderDetails;
