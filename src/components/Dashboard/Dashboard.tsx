import React, { SyntheticEvent, useEffect, useState } from 'react';
import AccordionSummary from '@mui/material/AccordionSummary/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails/AccordionDetails';
import { useDispatch, useSelector } from 'react-redux';
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
import LoadingOverlay from '../shared/LoadingOverlay/LoadingOverlay';
import { AppDispatch, RootState } from '../../redux/store';
import { addCurrencyToStatistic } from './helpers';
import { getDashboardStat } from '../../redux/actions/dashboard.actions';
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

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getDashboardStat());
  }, []);

  const dashboardData = useSelector((state: RootState) => state.dashboard);

  // rename totqalOrders for Monthly Orders (shouldnt be 0), currency also should be string
  // need eventId and productId for liveSales
  // need to count total values manually? for liveSales
  // rename registations to registrations for for monthly registrations
  // totalCount, currentPage, pageSize needs for every table

  return dashboardData.status === 'loading' ? <LoadingOverlay /> : (
    <Wrapper>
      <LegalInformation />
      <DashboardOverview>
        <OverviewTitle>Your PTA Overview</OverviewTitle>
        {/* <CustomizerMenu handleChange={() => {}} values={fakeState}>
          <SecondaryButton size="small">Customise View</SecondaryButton>
        </CustomizerMenu> */}
      </DashboardOverview>
      <OverviewCards data={addCurrencyToStatistic(dashboardData.stat, '£')} />
      <TablesContainer>
        <SalesAccordion expanded={open === 'live-sales'} onChange={handleChange('live-sales')}>
          <AccordionSummary expandIcon={<ShevronDown color={theme.colors.main.black} />}>
            <h3>Current Live Sales</h3>
          </AccordionSummary>
          <AccordionDetails>
            {dashboardData.currentLiveSales.data.map((item) => (
              <React.Fragment key={item.key}>
                <ProductName type="success" className="product-name">
                  {item.key}
                </ProductName>
                <br />
                <LiveSalesTable
                  data={item.value.data}
                  totalQuantitySold={item.value.totalQuantitySold}
                  totalQuantityLeft={item.value.totalQuantityLeft}
                  totalSales={item.value.totalSales}
                  currency={item.value.currency}
                  currentPage={item.value}
                  pageSize={0}
                />
                <br />
              </React.Fragment>
            ))}
          </AccordionDetails>
        </SalesAccordion>
        <SalesAccordion expanded={open === 'monthly-orders'} onChange={handleChange('monthly-orders')}>
          <AccordionSummary expandIcon={<ShevronDown color={theme.colors.main.black} />}>
            <h3>Monthly Orders</h3>
          </AccordionSummary>
          <AccordionDetails>
            <MonthlyOrdersTable
              data={dashboardData.monthlyOrders.data}
              totalOrders={dashboardData.monthlyOrders.totqalOrders}
              totalSales={dashboardData.monthlyOrders.totalSales}
              currency="£"
            />
          </AccordionDetails>
        </SalesAccordion>
        <SalesAccordion expanded={open === 'monthly-customers-orders'} onChange={handleChange('monthly-customers-orders')}>
          <AccordionSummary expandIcon={<ShevronDown color={theme.colors.main.black} />}>
            <h3>Monthly Customers Registrations</h3>
          </AccordionSummary>
          <AccordionDetails>
            <MonthlyCustomersRegTable
              data={dashboardData.monthlyCustomersRegistrations.data}
              totalCount={0}
              totalRegistrations={dashboardData.monthlyCustomersRegistrations.totalRegistrations}
            />
          </AccordionDetails>
        </SalesAccordion>
        <SalesAccordion expanded={open === 'last-sales'} onChange={handleChange('last-sales')}>
          <AccordionSummary expandIcon={<ShevronDown color={theme.colors.main.black} />}>
            <h3>Last 25 Orders</h3>
          </AccordionSummary>
          <AccordionDetails>
            <LastSalesTable data={dashboardData.lastOrders} />
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
