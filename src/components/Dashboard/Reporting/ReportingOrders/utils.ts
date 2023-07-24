export const getOrderStatus = (status: string) => {
  switch (true) {
    case status === 'dispatched': return 'dispatched';
    case status === 'awaiting dispatch': return 'awaiting-dispatch';
    case status === 'refunded': return 'refunded';
    default: return '';
  }
};
