import { OrderStatus } from '../../../../types/reporting/orders';

export const getOrderStatus = (status: keyof typeof OrderStatus) => {
  switch (true) {
    case status === 'OrderDispatched': return { text: 'Dispatched', cls: 'dispatched' };
    case status === 'OrderCompleted': return { text: 'Completed', cls: 'completed' };
    case status === 'OrderDeleted': return { text: 'Deleted', cls: 'deleted' };
    case status === 'OrderReserved': return { text: 'Reserved', cls: 'reserved' };
    case status === 'OrderTest': return { text: 'Test', cls: 'test' };
    case status === 'OrderFailed': return { text: 'Failed', cls: 'failed' };
    case status === 'OrderAwaitingDispatch': return { text: 'Awaiting dispatch', cls: 'awaiting-dispatch' };
    case status === 'OrderPartialRefund': return { text: 'Partial refund', cls: 'partial-refunded' };
    case status === 'OrderRefunded': return { text: 'Refunded', cls: 'refunded' };
    default: return { text: '', cls: '' };
  }
}; 
