import React, { SyntheticEvent, useState } from 'react';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
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
import { eventOptions, rows } from './table-data';
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
  const [open, setOpen] = useState<boolean | string>('total-sales');
  const handleChange = (name: string) => (e: SyntheticEvent, isExpanded: boolean) => {
    setOpen(isExpanded ? name : false);
  };

  const [selectedEvent, setSelectEvent] = useState<SelectedEventProps | null>(null);
  const handleSelectEvent = (e) => {
    const { rootid, value, label } = e.currentTarget.dataset;
    setSelectEvent({
      year: rootid,
      value,
      label,
    });
  };

  return (
    <Wrapper>
      <StatisticBar data={data} />
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
        <TableCaption>
          <p>
            <strong>{rows.length}</strong>
            {' '}
            Sales
          </p>
        </TableCaption>
        <SalesAccordion expanded={open === 'total-sales'} onChange={handleChange('total-sales')}>
          <AccordionSummary expandIcon={<ShevronDown color={theme.colors.main.black} />}>
            <h3>Total Sales</h3>
          </AccordionSummary>
          <AccordionDetails>
            <ReportingTableTotalSales />
          </AccordionDetails>
        </SalesAccordion>
        <SalesAccordion expanded={open === 'total-sales-day'} onChange={handleChange('total-sales-day')}>
          <AccordionSummary expandIcon={<ShevronDown color={theme.colors.main.black} />}>
            <h3>Total Sales By Day</h3>
          </AccordionSummary>
          <AccordionDetails>
            <ReportingTableTotalDaySales />
          </AccordionDetails>
        </SalesAccordion>
        <SalesAccordion expanded={open === 'product-sales-day'} onChange={handleChange('product-sales-day')}>
          <AccordionSummary expandIcon={<ShevronDown color={theme.colors.main.black} />}>
            <h3>Products Sold By Day</h3>
          </AccordionSummary>
          <AccordionDetails>
            <ProductName type="success" className="product-name">
              {'{Product name}'}
            </ProductName>
            <br />
            <ReportingTableProductDaySales />
          </AccordionDetails>
        </SalesAccordion>
        <SalesAccordion expanded={open === 'product-sales-school'} onChange={handleChange('product-sales-school')}>
          <AccordionSummary expandIcon={<ShevronDown color={theme.colors.main.black} />}>
            <h3>Products Sold By School - Event name</h3>
          </AccordionSummary>
          <AccordionDetails>
            <ProductName type="success" className="product-name">
              {'{School name}'}
            </ProductName>
            <br />
            <ReportingTableProductSchoolSales />
          </AccordionDetails>
        </SalesAccordion>
        <SalesAccordion expanded={open === 'product-order-sales'} onChange={handleChange('product-order-sales')}>
          <AccordionSummary expandIcon={<ShevronDown color={theme.colors.main.black} />}>
            <h3>Product Order Count - Event name</h3>
          </AccordionSummary>
          <AccordionDetails>
            <ProductName type="success" className="product-name">
              {'{Product name}'}
            </ProductName>
            <br />
            <ReportingTableProductOrderSales />
          </AccordionDetails>
        </SalesAccordion>
      </TableContent>
    </Wrapper>
  );
};

export default ReportingSales;
