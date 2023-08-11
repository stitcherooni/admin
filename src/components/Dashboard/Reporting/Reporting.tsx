import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, ChooseReportWrapper, Wrapper } from './Reporting.styled';
import { ReportTypes, tabsList } from './tabs';
import { getReportComponent } from './utils';
import Label from '../../shared/Label/Label';
import Select from '../../shared/Select/Select';
import { AppDispatch } from '../../../redux/store';
import { getBankedStat, getBookingFilters, getBookingStat, getChildBookingFilters, getChildBookingStat, getCustomersStat, getEmailTrackerStat, getInvoicesStat, getOrdersStat, getProductQuestionsFilters, getProductQuestionsStat, getSalesFilters, getSalesStat, getTicketsFilters, getTicketsStat, getTreasurerByDateStat, getTreasurerByEventFilters, getTreasurerByEventStat, getVolunteersFilters, getVolunteersStat } from '../../../redux/actions/reporting.actions';

const Reporting = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [activeReportType, setActiveReportType] = useState(ReportTypes.EMAIL_TRACKER);

  const handleChangeReportType = (e) => setActiveReportType(e.target.value);

  useEffect(() => {
    if (activeReportType === ReportTypes.BANKED) {
      dispatch(getBankedStat({ page: 1, pageSize: 10 }));
    }
    if (activeReportType === ReportTypes.BOOKINGS) {
      dispatch(getBookingFilters(1));
      dispatch(getBookingStat({ page: 1, pageSize: 10 }));
    }
    if (activeReportType === ReportTypes.CHILD_BOOKINGS) {
      dispatch(getChildBookingFilters(1));
      dispatch(getChildBookingStat({ page: 1, pageSize: 10 }));
    }
    if (activeReportType === ReportTypes.CUSTOMERS) {
      dispatch(getCustomersStat({ page: 1, pageSize: 10 }));
    }
    if (activeReportType === ReportTypes.EMAIL_TRACKER) {
      dispatch(getEmailTrackerStat({ page: 1, pageSize: 10 }));
    }
    if (activeReportType === ReportTypes.INVOICES) {
      dispatch(getInvoicesStat({ page: 1, pageSize: 10 }));
    }
    if (activeReportType === ReportTypes.ORDERS) {
      dispatch(getOrdersStat({ page: 1, pageSize: 10 }));
    }
    if (activeReportType === ReportTypes.PRODUCT_QUESTIONS) {
      dispatch(getProductQuestionsFilters(1));
      dispatch(getProductQuestionsStat({ type: 'product_questionvertical', page: 1, pageSize: 10 }));
    }
    if (activeReportType === ReportTypes.SALES) {
      dispatch(getSalesFilters(1));
      dispatch(getSalesStat({ page: 1, pageSize: 10 }));
    }
    if (activeReportType === ReportTypes.TICKETS) {
      dispatch(getTicketsFilters(1));
      dispatch(getTicketsStat({ page: 1, pageSize: 10 }));
    }
    if (activeReportType === ReportTypes.TREASURER_BY_EVENT) {
      dispatch(getTreasurerByEventFilters(1));
      dispatch(getTreasurerByEventStat({ page: 1, pageSize: 10 }));
    }
    if (activeReportType === ReportTypes.TREASURER_BY_DATE) {
      dispatch(getTreasurerByDateStat({ page: 1, pageSize: 10 }));
    }
    if (activeReportType === ReportTypes.VOLUNTEERS) {
      dispatch(getVolunteersFilters(1));
      dispatch(getVolunteersStat({ page: 1, pageSize: 10 }));
    }
  }, [activeReportType]);

  return (
    <Wrapper>
      <ChooseReportWrapper>
        <Label text="Report Selection" content={{}} inputId="choose-report" />
        <Col>
          <p>Choose your report</p>
          <Select name="show" options={tabsList} value={activeReportType} onChange={handleChangeReportType} />
        </Col>
      </ChooseReportWrapper>
      {getReportComponent(activeReportType)}
    </Wrapper>
  );
};

export default Reporting;
