import React, { SyntheticEvent, useState } from 'react';
import AccordionSummary from '@mui/material/AccordionSummary/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails/AccordionDetails';
import {
  Wrapper,
  HorizontalAdv,
  UserActivity,
  UserActivityWrapper,
  DashboardOverview,
  OverviewTitle,
  ProductName,
  TablesContainer,
} from './Dashboard.styled';
import HorizontalBanner from '../../assets/images/adv-horizontal.png';
import SharePTACard from './UserActionsCards/SharePTACard/SharePTACard';
import UpcomingEventCard from './UserActionsCards/UpcomingEventCard/UpcomingEventCard';
import FAQAdvCard from './UserActionsCards/FAQAdvCard/FAQAdvCard';
import OverviewCards from './OverviewCards/OverviewCards';
import { CardsName } from './OverviewCards/cards';
import LegalInformation from './LegalInformation/LegalInformation';
import { SalesAccordion } from './Reporting/ReportingSales/ReportingSales.styled';
import ShevronDown from '../../assets/icons/shevron-down';
import { theme } from '../../styles/defaultTheme';
import LiveSalesTable from './DashboardTables/LiveSalesTable/LiveSalesTable';
import MonthlyOrdersTable from './DashboardTables/MonthlyOrdersTable/MonthlyOrdersTable';
import MonthlyCustomersRegTable from './DashboardTables/MonthlyCustomersRegTable/MonthlyCustomersRegTable';
import LastSalesTable from './DashboardTables/LastSalesTable/LastSalesTable';
// import LegalInformationList from './LegalInformationList/LegalInformationList';
// import AdvCard from './UserActionsCards/AdvCard/AdvCard';

export const fakeState = {
  customers: {
    name: CardsName.CUSTOMERS,
    checked: false,
  },
  sales: {
    name: CardsName.SALES,
    checked: false,
  },
  orders: {
    name: CardsName.ORDERS,
    checked: false,
  },
  events: {
    name: CardsName.EVENTS,
    checked: false,
  },
  listings: {
    name: CardsName.LISTINGS,
    checked: false,
  },
  sponsors: {
    name: CardsName.SPONSORS,
    checked: false,
  },
};

const Dashboard = () => {
  const [open, setOpen] = useState<boolean | string>('live-sales');
  const handleChange = (name: string) => (e: SyntheticEvent, isExpanded: boolean) => {
    setOpen(isExpanded ? name : false);
  };

  return (
    <Wrapper>
      <LegalInformation />
      <DashboardOverview>
        <OverviewTitle>Your PTA Overview</OverviewTitle>
        {/* <CustomizerMenu handleChange={() => {}} values={fakeState}>
          <SecondaryButton size="small">Customise View</SecondaryButton>
        </CustomizerMenu> */}
      </DashboardOverview>
      <OverviewCards />
      <TablesContainer>
        <SalesAccordion expanded={open === 'live-sales'} onChange={handleChange('live-sales')}>
          <AccordionSummary expandIcon={<ShevronDown color={theme.colors.main.black} />}>
            <h3>Current Live Sales</h3>
          </AccordionSummary>
          <AccordionDetails>
            <ProductName type="success" className="product-name">
              Product Name
            </ProductName>
            <br />
            <LiveSalesTable />
          </AccordionDetails>
        </SalesAccordion>
        <SalesAccordion expanded={open === 'month-orders'} onChange={handleChange('month-orders')}>
          <AccordionSummary expandIcon={<ShevronDown color={theme.colors.main.black} />}>
            <h3>Monthly Orders</h3>
          </AccordionSummary>
          <AccordionDetails>
            <MonthlyOrdersTable />
          </AccordionDetails>
        </SalesAccordion>
        <SalesAccordion expanded={open === 'month-customers-orders'} onChange={handleChange('month-customers-orders')}>
          <AccordionSummary expandIcon={<ShevronDown color={theme.colors.main.black} />}>
            <h3>Monthly Customers Registrations</h3>
          </AccordionSummary>
          <AccordionDetails>
            <MonthlyCustomersRegTable />
          </AccordionDetails>
        </SalesAccordion>
        <SalesAccordion expanded={open === 'last-sales'} onChange={handleChange('last-sales')}>
          <AccordionSummary expandIcon={<ShevronDown color={theme.colors.main.black} />}>
            <h3>Last 25 Orders</h3>
          </AccordionSummary>
          <AccordionDetails>
            <LastSalesTable />
          </AccordionDetails>
        </SalesAccordion>
      </TablesContainer>
      <HorizontalAdv>
        <p>advertisement</p>
        <img src={HorizontalBanner} alt="" />
        <div className="link-wrapper">
          <a href="/">View Advertising Opportunities</a>
        </div>
      </HorizontalAdv>
      <UserActivityWrapper>
        <UserActivity>
          <SharePTACard />
          <UpcomingEventCard />
          <FAQAdvCard />
          {/* <AdvCard /> */}
        </UserActivity>
      </UserActivityWrapper>
    </Wrapper>
  );
};

export default Dashboard;
