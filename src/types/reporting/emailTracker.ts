export interface EmailTrackerTrackerProps {
  data: EmailTrackerStatItem[];
  totalEmailsSent: number;
  totalEmailsDelivered: number;
  totalEmailsOpened: number;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface EmailTrackerStatItem {
  num: number;
  id: number;
  to: string;
  email: string;
  messageTitle: string;
  message: string;
  subject: string;
  messageId: number;
  sentBy: string;
  dateSent: string;
  delivered: boolean;
  deliveredDate?: string;
  opened: boolean;
  openedDate?: string;
  location: string;
  ip: string;
  type: string;
}
