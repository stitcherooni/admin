import React, {
  ChangeEvent, SyntheticEvent, useMemo, useState,
} from 'react';
import TableContainer from '@mui/material/TableContainer/TableContainer';
import Table from '@mui/material/Table/Table';
import TableBody from '@mui/material/TableBody/TableBody';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SelectChangeEvent } from '@mui/material/Select/Select';
import dayjs from 'dayjs';
import {
  TableCell, TableContent, Head, Wrapper, OrderStatusBadge,
} from './ReportingOrders.styled';
import {
  Row,
  SearchBarWrapper,
  StyledCheckbox,
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
import { AppDispatch, RootState } from '../../../../redux/store';
import { Order } from '../../../../types/reporting/orders';
import { getOrdersStat } from '../../../../redux/actions/reporting.actions';
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

const createTableActions = (order: Order, params) => {
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
  const dispatch = useDispatch<AppDispatch>();
  const ordersData = useSelector((state: RootState) => state.reporting.orders);
  const table = useSortingTable<Order>(ordersData.data, {
    totalCount: ordersData.totalCount,
    totalPages: ordersData.totalPages,
    pageSize: ordersData.pageSize,
    currentPage: ordersData.currentPage,
  });
  const {
    selected, handleSelectAllClick, checkIsSelected, handleClick,
  } = table.selection;
  const { handleRequestSort } = table.sorting;
  const { page, pagesCount, rowsPerPage } = table.pagination;

  const changePage = (e: ChangeEvent, newPage?: number) => {
    e.preventDefault();
    dispatch(
      getOrdersStat({
        page: newPage,
        pageSize: rowsPerPage,
      }),
    );
  };

  const changeRowsPerPage = (e: SelectChangeEvent<unknown>) => {
    dispatch(
      getOrdersStat({
        page: 1,
        pageSize: parseInt((e.target as HTMLSelectElement).value, 10),
      }),
    );
  };

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
        case item.label === 'Excel':
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
            <strong>{`${ordersData.totalCount} `}</strong>
            {`${ordersData.totalCount === 0 || ordersData.totalCount > 1 ? 'Entries' : 'Entry'}`}
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
              />
              <TableBody>
                {table.visibleRows.map((row) => {
                  const isItemSelected = checkIsSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${row.num}`;

                  return (
                    <Row
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.num}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell className="checkbox">
                        <StyledCheckbox
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                          size="small"
                        />
                      </TableCell>
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
                        <p>{`${getCurrencyByCode(row.value.currency)}${row.value.amount}`}</p>
                      </TableCell>
                      <TableCell className="platform-fee">
                        <p>{`${row.currency}${row.platformFee}`}</p>
                      </TableCell>
                      <TableCell className="refunded">
                        <p>{`${row.currency}${row.refunded}`}</p>
                      </TableCell>
                      <TableCell className="actions">
                        <ActionsMenu options={createTableActions(row, { selectOrderDetails })}
                        />
                      </TableCell>
                    </Row>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            handleChangePage={changePage}
            handleChangeRowsPerPage={changeRowsPerPage}
            page={page}
            pagesCount={pagesCount}
            rowsPerPage={rowsPerPage}
            options={[5, 10, 25]}
          />
        </TableWrapper>
      </TableContent>
      {filterModalOpen
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
        : null}
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
