import React, {
  SyntheticEvent, useMemo, useState,
} from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import {
  TableCell, TableContent, Head, Wrapper, OrderStatusBadge,
} from './ReportingOrders.styled';
import {
  Row,
  SearchBarWrapper,
  TableCaption,
  TableWrapper,
} from '../../../shared/Table/Table.styled';
import { useSortingTable } from '../../../shared/Table/utils';
import { actionsOptions, headCells, menuActionsOptions } from './table-data';
import { Overlay, StyledDrawer } from '../Reporting.styled';
import DrawerOverlay from '../DrawerOverlay/DrawerOverlay';
import OrderDetails from './OrderDetails/OrderDetails';
import { getOrderStatus } from './utils';
import ActionsMenu from '../../../shared/ActionsMenu/ActionsMenu';
import FilteringReportingOrdersModal from './FIlteringReportingOrdersModal/FIlteringReportingOrdersModal';
import DeleteConfirmationModal from '../../../shared/Modals/DeleteConfirmationModal/DeleteConfirmationModal';
import TablePagination from '../../../shared/Table/TablePagination/TablePagination';
import StatisticBar from '../StatisticBar/StatisticBar';
import { RootState } from '../../../../redux/store';
import { Order } from '../../../../types/reporting/orders';
import { getCurrencyByCode } from '../../../../utils/currency';
import { downloadFile } from '../../../../utils/file';

const data = [
  {
    label: 'Total Orders:',
    value: 47,
  },
  {
    label: 'Average Order Value:',
    value: '£38.99',
  },
  {
    label: 'Total Order Value:',
    value: '£2,224.98',
  },
  {
    label: 'Refunded:',
    value: '£22',
  },
];

const createTableActions = (order: Order, params: any) => {
  const { selectOrderDetails } = params;

  return actionsOptions.map((item) => {
    switch (true) {
      case item.label === 'View Order':
        return { ...item, handleClick: () => selectOrderDetails(order) };
      default: return item;
    }
  });
};

const ReportingOrders = () => {
  const ordersData = useSelector((state: RootState) => state.reporting.orders);
  const table = useSortingTable<Order>(ordersData.data, {
    columns: headCells,
    totalCount: ordersData.data.length,
  });
  const { selected, handleSelectAllClick } = table.selection;
  const { handleRequestSort } = table.sorting;
  const {
    page, pagesCount, rowsPerPage, totalRows, handleChangePage, handleChangeRowsPerPage,
  } = table.pagination;

  const [filterModalOpen, setFilterModalOpen] = useState(false);

  const toggleFilterModalOpen = () => setFilterModalOpen(!filterModalOpen);

  const handleCloseFilterModal = (e: SyntheticEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (!target.className.length) return;

    if (target.className.includes('overlay')) {
      toggleFilterModalOpen();
    }
  };

  const [helperDrawerOpen, setHelperDrawerOpen] = useState(false);
  const handleHelperDrawer = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // close just if click by overlay
    if (helperDrawerOpen && ![...e.currentTarget.classList].includes('MuiBackdrop-root')) return;
    setHelperDrawerOpen(!helperDrawerOpen);
  };

  const [filteringDrawerOpen, setFilteringDrawerOpen] = useState(false);
  const handleFilteringDrawer = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // close just if click by overlay
    if (filteringDrawerOpen && ![...e.currentTarget.classList].includes('MuiBackdrop-root')) return;
    setFilteringDrawerOpen(!filteringDrawerOpen);
  };

  const [orderDetails, setOrderDetails] = useState<null | Order>(null);

  const selectOrderDetails = (order: Order) => {
    setOrderDetails(order);
    setHelperDrawerOpen(true);
  };

  const manageMenu = useMemo(
    () => menuActionsOptions.map((item) => {
      switch (true) {
        case item.label === 'Export to Excel':
          return {
            ...item,
            handleClick: () => downloadFile(
              '/api/Report/ordersexcel?Ids=1&Ids=0&Columns=string&Ordering=%7B%0A%20%20%22additionalProp1%22%3A%20%22string%22%2C%0A%20%20%22additionalProp2%22%3A%20%22string%22%2C%0A%20%20%22additionalProp3%22%3A%20%22string%22%0A%7D',
              'name.xls',
            ),
          };
        case item.label === 'Export Pdf':
          return {
            ...item,
            handleClick: () => downloadFile(
              '/api/Report/ordersexcel?Ids=1&Ids=0&Columns=string&Ordering=%7B%0A%20%20%22additionalProp1%22%3A%20%22string%22%2C%0A%20%20%22additionalProp2%22%3A%20%22string%22%2C%0A%20%20%22additionalProp3%22%3A%20%22string%22%0A%7D',
              'name.xls',
            ),
          };
        case item.label === 'Search & Advanced Filtering':
          return { ...item, handleClick: () => setFilteringDrawerOpen(true) };
        default: return item;
      }
    }),
    [],
  );

  // to do
  // actions
  // sorting
  // table copy
  // search

  // needs totalOrders, avgOrderValue, totalOrderValue, refunded

  return (
    <Wrapper>
      <StatisticBar data={data} />
      <TableContent>
        <TableCaption>
          <p>
            <strong>{`${totalRows} `}</strong>
            {`${totalRows === 0 || totalRows > 1 ? 'Entries' : 'Entry'}`}
          </p>
          <SearchBarWrapper className="search-wrapper">
            <ActionsMenu options={manageMenu} />
          </SearchBarWrapper>
        </TableCaption>
        <TableWrapper>
          <TableContainer>
            <Table sx={{ minWidth: 320 }} aria-labelledby="tableTitle" size="small">
              <Head
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={table.visibleRows.length}
                cells={headCells}
                className="table-head"
                checkbox={false}
              />
              <TableBody>
                {table.visibleRows.map((row) => (
                  <Row
                    tabIndex={-1}
                    key={row.num}
                  >
                    <TableCell className="row-id">
                      <p>{row.num}</p>
                    </TableCell>
                    <TableCell className="id" onClick={() => selectOrderDetails(row)}>
                      <p className="link">{row.id}</p>
                    </TableCell>
                    <TableCell className="date">
                      <p>{dayjs(row.date).format('DD/MM/YYYY')}</p>
                      <p>{dayjs(row.date).format('HH:MM')}</p>
                    </TableCell>
                    <TableCell className="status">
                      <OrderStatusBadge
                        className={`order-status ${getOrderStatus(row.status.toLowerCase())}`}
                      >
                        {row.status}
                      </OrderStatusBadge>
                    </TableCell>
                    <TableCell className="customer-name">
                      <p>{row.customerName}</p>
                    </TableCell>
                    <TableCell className="payment-method">{row.paymentMethod}</TableCell>
                    <TableCell className="type">
                      <p>{row.type}</p>
                    </TableCell>
                    <TableCell className="orders-value">
                      <p>{`${getCurrencyByCode(row.value.currency, row.value.amount)}`}</p>
                    </TableCell>
                    <TableCell className="platform-fee">
                      <p>{`${getCurrencyByCode((row as any).currency ?? 'GBP', row.platformFee)}`}</p>
                    </TableCell>
                    <TableCell className="refunded">
                      <p>{`${getCurrencyByCode((row as any).currency ?? 'GBP', row.refunded)}`}</p>
                    </TableCell>
                    <TableCell className="actions">
                      <ActionsMenu options={createTableActions(row, { selectOrderDetails })} />
                    </TableCell>
                  </Row>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            pagesCount={pagesCount}
            rowsPerPage={rowsPerPage}
            options={[5, 10, 25]}
          />
        </TableWrapper>
      </TableContent>
      {/* {filterModalOpen
        ? createPortal(
          <Overlay onClick={handleCloseFilterModal} className="overlay">
            <DeleteConfirmationModal
              deleteItemName={namesToDelete}
              confirm={console.log}
              cancel={handleCloseFilterModal}
            />
          </Overlay>,
          document.body,
        )
        : null} */}
      {!orderDetails ? null : (
        <StyledDrawer anchor="right" open={helperDrawerOpen} onClose={handleHelperDrawer}>
          <DrawerOverlay handleClick={handleHelperDrawer} handleKeydown={handleHelperDrawer}>
            <OrderDetails data={orderDetails} needsActions type="orders" />
          </DrawerOverlay>
        </StyledDrawer>
      )}
      <StyledDrawer anchor="right" open={filteringDrawerOpen} onClose={handleFilteringDrawer}>
        <DrawerOverlay handleClick={handleFilteringDrawer} handleKeydown={handleFilteringDrawer}>
          <FilteringReportingOrdersModal />
        </DrawerOverlay>
      </StyledDrawer>
    </Wrapper>
  );
};

export default ReportingOrders;
