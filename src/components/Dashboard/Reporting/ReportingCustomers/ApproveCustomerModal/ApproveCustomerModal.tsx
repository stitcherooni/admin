import React from 'react';

interface ApproveCustomerModalProps {
  firstName: string;
  lastName: string;
  userId: number;
  type: 'approve' | 'unapprove';
}

const ApproveCustomerModal = (props: ApproveCustomerModalProps) => (
  <div>
    <h3>Please confirm</h3>
    <p>Are you sure you want to {props.type} {props.firstName} {props.lastName} ({props.userId}) ?</p>
  </div>
);

export default ApproveCustomerModal;
