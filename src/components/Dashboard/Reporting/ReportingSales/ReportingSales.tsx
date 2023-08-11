import React, { SyntheticEvent, useMemo, useState } from 'react';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col,
  Filters,
  FiltersWrapper,
  ProductName,
  SalesAccordion,
  TableCaption,
  TableContent,
  TableFilters,
  Wrapper,
} from './ReportingSales.styled';
import { rows } from './table-data';
import ShevronDown from '../../../../assets/icons/shevron-down';
import { theme } from '../../../../styles/defaultTheme';
import ReportingTableTotalSales from './ReportingTableTotalSales/ReportingTableTotalSales';
import ReportingTableTotalDaySales from './ReportingTableTotalDaySales/ReportingTableTotalDaySales';
import ReportingTableProductDaySales from './ReportingTableProductDaySales/ReportingTableProductDaySales';
import ReportingTableProductSchoolSales from './ReportingTableProductSchoolSales /ReportingTableProductSchoolSales';
import ReportingTableProductOrderSales from './ReportingTableProductOrderSales/ReportingTableProductOrderSales';
import Label from '../../../shared/Label/Label';
import NestedMenu from '../../../shared/NestedMenu/NestedMenu';
import StatisticBar from '../StatisticBar/StatisticBar';
import { AppDispatch, RootState } from '../../../../redux/store';
import { createEventsOptions } from './utils';
import { SalesEvents } from '../../../../types/reporting/sales';
import { sortSalesStat } from '../../../../redux/actions/reporting.actions';
import { getCurrencyByCode } from '../../../../utils/currency';

interface SelectedEventProps {
  year: number;
  value: number | string;
  label: number | string;
}

const data = [
  {
    label: 'Total Sales:',
    value: 47,
  },
  {
    label: 'Average Sales Value:',
    value: '£38.99',
  },
  {
    label: 'Total Sales Value:',
    value: '£2,224.98',
  },
  {
    label: 'Platform & Booking Fees:',
    value: '£22',
  },
];

const ReportingSales = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState<boolean | string>('total-sales');
  const handleChange = (name: string) => (e: SyntheticEvent, isExpanded: boolean) => {
    setOpen(isExpanded ? name : false);
  };
  const salesData = useSelector((state: RootState) => state.reporting.sales);
  const [selectedEvent, setSelectEvent] = useState<SelectedEventProps | null>(null);
  const handleSelectEvent = (e) => {
    const { rootid, value, label } = e.currentTarget.dataset;
    setSelectEvent({
      year: rootid,
      value,
      label,
    });
    dispatch(
      sortSalesStat({
        page: 1,
        pageSize: 10,
        eventId: value ?? '',
      }),
    );
  };

  const eventOptions = useMemo(
    () => createEventsOptions(salesData?.filters?.events ?? ([] as SalesEvents[])),
    [salesData?.filters?.events],
  );

  const statistic = useMemo(() => [
    {
      label: 'Total Sales:',
      value: salesData.totalSales,
    },
    {
      label: 'Average Sales Value:',
      value: `${getCurrencyByCode(salesData.currency)}${salesData.avgSalesValue}`,
    },
    {
      label: 'Total Sales Value:',
      value: `${getCurrencyByCode(salesData.currency)}${salesData.totalSalesValue}`,
    },
    {
      label: 'Platform & Booking Fees:',
      value: `${getCurrencyByCode(salesData.currency)}${salesData.platformBookingFees}`,
    },
  ], [
    salesData.totalSalesValue,
    salesData.totalSales,
    salesData.platformBookingFees,
    salesData.avgSalesValue,
  ]);

  // total sales needs num

  return (
    <Wrapper>
      <StatisticBar data={statistic} />
      <Filters>
        <Label content={{} as any} text="Sales Selection" inputId="show" />
        <TableFilters>
          <FiltersWrapper>
            <Col>
              <p>Event</p>
              <NestedMenu
                options={eventOptions}
                handleChoose={handleSelectEvent}
                rootId={!selectedEvent ? null : selectedEvent.year}
                buttonLabel={!selectedEvent ? null : selectedEvent.label}
                selectedId={!selectedEvent ? null : selectedEvent.value}
              />
            </Col>
          </FiltersWrapper>
        </TableFilters>
      </Filters>
      <TableContent>
        <SalesAccordion expanded={open === 'total-sales'} onChange={handleChange('total-sales')}>
          <AccordionSummary expandIcon={<ShevronDown color={theme.colors.main.black} />}>
            <h3>Total Sales</h3>
          </AccordionSummary>
          <AccordionDetails>
            <ReportingTableTotalSales />
          </AccordionDetails>
        </SalesAccordion>
        <SalesAccordion
          expanded={open === 'total-sales-day'}
          onChange={handleChange('total-sales-day')}
        >
          <AccordionSummary expandIcon={<ShevronDown color={theme.colors.main.black} />}>
            <h3>Total Sales By Day</h3>
          </AccordionSummary>
          <AccordionDetails>
            <ReportingTableTotalDaySales />
          </AccordionDetails>
        </SalesAccordion>
        <SalesAccordion
          expanded={open === 'product-sales-day'}
          onChange={handleChange('product-sales-day')}
        >
          <AccordionSummary expandIcon={<ShevronDown color={theme.colors.main.black} />}>
            <h3>Products Sold By Day</h3>
          </AccordionSummary>
          <AccordionDetails>
            {Object.entries(salesData.data?.productsSoldByDay ?? {}).map((item) => {
              const [name, props] = item;
              const productData = { ...props, currency: salesData.currency };
              return (
                <React.Fragment key={name}>
                  <ProductName type="success" className="product-name">
                    {name}
                  </ProductName>
                  <br />
                  <ReportingTableProductDaySales
                    {...productData}
                  />
                </React.Fragment>
              );
            })}
          </AccordionDetails>
        </SalesAccordion>
        <SalesAccordion
          expanded={open === 'product-sales-school'}
          onChange={handleChange('product-sales-school')}
        >
          <AccordionSummary expandIcon={<ShevronDown color={theme.colors.main.black} />}>
            <h3>{`Products Sold By School - ${selectedEvent?.label ?? ''}`}</h3>
          </AccordionSummary>
          <AccordionDetails>
            {Object.entries(salesData.data?.productsSoldBySchool ?? {}).map((item) => {
              const [name, props] = item;
              const schoolProduct = { ...props, currency: salesData.currency };
              return (
                <React.Fragment key={name}>
                  <ProductName type="success" className="product-name">
                    {name}
                  </ProductName>
                  <br />
                  <ReportingTableProductSchoolSales {...schoolProduct} />
                </React.Fragment>
              );
            })}
          </AccordionDetails>
        </SalesAccordion>
        <SalesAccordion
          expanded={open === 'product-order-sales'}
          onChange={handleChange('product-order-sales')}
        >
          <AccordionSummary expandIcon={<ShevronDown color={theme.colors.main.black} />}>
            <h3>{`Product Order Count - ${selectedEvent?.label ?? ''}`}</h3>
          </AccordionSummary>
          <AccordionDetails>
            {Object.entries(salesData.data.productOrderCount ?? {}).map((item) => {
              const [name, props] = item;
              return (
                <React.Fragment key={name}>
                  <ProductName type="success" className="product-name">
                    {name}
                  </ProductName>
                  <br />
                  <ReportingTableProductOrderSales {...props} />
                </React.Fragment>
              );
            })}
          </AccordionDetails>
        </SalesAccordion>
      </TableContent>
    </Wrapper>
  );
};

export default ReportingSales;
