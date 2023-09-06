/* eslint-disable react/jsx-one-expression-per-line */
import React, {
  ChangeEvent, SyntheticEvent, useMemo, useRef, useState,
} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SelectChangeEvent } from '@mui/material/Select';
import dayjs from 'dayjs';
import InputAdornment from '@mui/material/InputAdornment';
import {
  Col,
  Filters,
  FiltersWrapper,
  SearchBarWrapper,
  StyledAlert,
  TableCaption,
  TableCell,
  TableContent,
  Head,
  Wrapper,
  Button,
  StyledInput,
} from './ReportingBooking.styled';
import {
  Row,
  StyledCheckbox,
  StyledTableWrapper,
  TableWrapper,
} from '../../../shared/Table/Table.styled';
import { copyTable, useSortingTable } from '../../../shared/Table/utils';
import { headCells, menuActionsOptions, tableActionsOptions } from './table-data';
import { Overlay, StyledDrawer } from '../Reporting.styled';
import ActionsMenu from '../../../shared/ActionsMenu/ActionsMenu';
import BookingEditModal from './BookingEditModal/BookingEditModal';
import QflowModal from '../QflowModal/QflowModal';
import Label from '../../../shared/Label/Label';
import NestedMenu from '../../../shared/NestedMenu/NestedMenu';
import TablePagination from '../../../shared/Table/TablePagination/TablePagination';
import Select from '../../../shared/Select/Select';
import { AppDispatch, RootState } from '../../../../redux/store';
import { getBookingStat, sortBookingStat } from '../../../../redux/actions/reporting.actions';
import {
  convertBookingItems,
  createEventsOptions,
  createProductOptions,
  createSortByOptions,
  getAvailableColumns,
  getBookingItemsIds,
  getFetchBookingsFn,
  getSortingOrdering,
  handleCloseModal,
} from './utils';
import OrderDetails from '../ReportingOrders/OrderDetails/OrderDetails';
import DrawerOverlay from '../DrawerOverlay/DrawerOverlay';
import {
  BookingStatEvents,
  BookingStatGroupByFilter,
  BookingStatItem,
} from '../../../../types/reporting/bookings';
import { Order } from '../../../../types/reporting/orders';
import { getCurrencyByCode } from '../../../../utils/currency';
import LoadingOverlay from '../../../shared/LoadingOverlay/LoadingOverlay';
import { Input } from '../../../shared/Input/Input.styled';
import BookingRandomModal from './BookingRandomModal/BookingRandomModal';
import ZoomIconSmall from '../../../../assets/icons/zoom-icon-small';
import { downloadFile } from '../../../../utils/file';
import CustomizeTableColumnsPopup from '../../../shared/Table/CustomizeTableColumnsPopup/CustomizeTableColumnsPopup';
import Alert from '../../../shared/Alert/Alert';

interface Filter {
  value: number | string;
  label: number | string;
}

interface EventFilter extends Filter {
  year: number | string;
}

interface ReportingFilters {
  event?: EventFilter;
  product?: string;
  groupBy?: string;
}

const ReportingBooking = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showTestBookings, setShowTestBookings] = useState(false);

  const bookingData = useSelector((state: RootState) => state.reporting.bookings);
  const rows = useMemo(() => {
    return !showTestBookings ? bookingData.data ?? [] : bookingData.testData ?? []
  }, [showTestBookings, bookingData]);
  const table = useSortingTable<BookingStatItem>(rows,
    {
      totalCount: bookingData.totalCount,
      totalPages: bookingData.totalPages,
      pageSize: bookingData.pageSize,
      currentPage: bookingData.currentPage,
      columns: headCells,
    },
    convertBookingItems,
  );
  const { page, pagesCount, rowsPerPage } = table.pagination;
  const {
    selected, handleSelectAllClick, checkIsSelected, handleClick,
  } = table.selection;
  const { handleRequestSort } = table.sorting;
  const [openUpdateBooking, setOpenUpdateBooking] = useState(false);
  const toggleOpenUpdateBooking = () => setOpenUpdateBooking(!openUpdateBooking);

  const handleCloseUpdateBooking = (e: SyntheticEvent<HTMLDivElement>) => {
    handleCloseModal(e, toggleOpenUpdateBooking);
  };

  const [showRandom, setShowRandom] = useState(false);
  const toggleShowRandom = () => setShowRandom(!showRandom);

  const handleCloseRandom = (e: SyntheticEvent<HTMLDivElement>) => {
    handleCloseModal(e, toggleShowRandom);
  };

  const [openQflowModal, setQflowModalOpen] = useState(false);
  const toggleOpenQflowModal = () => setQflowModalOpen(!openQflowModal);

  const handleCloseQflowModal = (e: SyntheticEvent<HTMLDivElement>) => {
    handleCloseModal(e, toggleOpenQflowModal);
  };

  const [filters, setSelectedFilters] = useState<ReportingFilters>({
    event: {
      value: '',
      label: '',
      year: '',
    },
    product: '',
    groupBy: '',
  });

  // for sorting we neednt all fields are required

  const handleChooseEvent = (e: any) => {
    const { value, label, rootid } = e.currentTarget.dataset;
    setSelectedFilters((currentFilters) => ({
      ...currentFilters,
      event: {
        value,
        label,
        year: rootid,
      },
    }));
    dispatch(
      sortBookingStat({
        EventIds: value,
        ProductIds: filters.product ?? '',
        GroupBy: filters.groupBy ?? '',
        page: bookingData.currentPage,
        pageSize: bookingData.pageSize,
      }),
    );
  };

  const handleSelectFilters = (e: any, type: string) => {
    setSelectedFilters((currentFilters) => ({
      ...currentFilters,
      [type]: e.target.value,
    }));

    dispatch(
      sortBookingStat({
        EventIds: filters.event?.value,
        ProductIds: type === 'product' ? e.target.value : filters.product,
        GroupBy: type === 'groupBy' ? e.target.value : filters.groupBy ?? '',
        page: bookingData.currentPage,
        pageSize: bookingData.pageSize,
      }),
    );
  };

  const handleEventChange = (e: any) => handleChooseEvent(e);
  const handleProductChange = (e: any) => handleSelectFilters(e, 'product');
  const handleGroupByChange = (e: any) => handleSelectFilters(e, 'groupBy');

  const changePage = (e: ChangeEvent, newPage?: number) => {
    e.preventDefault();
    dispatch(
      getBookingStat({
        page: newPage,
        pageSize: rowsPerPage,
      }),
    );
  };

  const changeRowsPerPage = (e: SelectChangeEvent<unknown>) => {
    dispatch(
      getBookingStat({
        page: 1,
        pageSize: parseInt((e.target as HTMLSelectElement).value, 10),
      }),
    );
  };

  const eventOptions = useMemo(
    () => createEventsOptions(bookingData?.filters?.events ?? ([] as BookingStatEvents[])),
    [bookingData?.filters?.events],
  );

  const productsOptions = useMemo(
    () => createProductOptions(bookingData?.filters?.products ?? []),
    [bookingData?.filters?.products],
  );

  const groupByOptions = useMemo(
    () => createSortByOptions(bookingData?.filters?.groupBy ?? ([] as any)),
    [bookingData?.filters?.groupBy],
  );

  const [orderDetails, setOrderDetails] = useState<Order | null>(null);

  const [orderDetailOpen, setOrderDetailOpen] = useState(false);
  const handleOrderDetailDrawer = (e: React.SyntheticEvent, order: Order | null = null) => {
    e.preventDefault();
    // close just if click by overlay
    if (orderDetailOpen && ![...e.currentTarget.classList].includes('MuiBackdrop-root')) return;
    setOrderDetailOpen(!orderDetailOpen);
    setOrderDetails(order);
  };

  const { updateSearchText, isFound, isSearching } = table.search;
  const tableRef = useRef(null);
  const { columnsOptions, visibleColumns, updateColumnsOptions } = table.customization;

  // add button 'show test bookings'
  // add logic for column sorting
  // add logic for table customization
  // add logic for table copy
  // add tinymce integration
  // add 'select random' button

  // needs firstName, lastName, remove customerName
  // needs className, bookingInfo, SKU, price, quantity, orderId, bookedBy, phone, email, paymentMethod, remove contact, order

  // filters
  // group by should be array of objects
  // events - obj , key year, value: array of events

  // click by first, last name - show update booking / order popup
  // filters group by should be array, not object

  // we neednt high requirements for filters, group by or other not required

  const [openCustomizeMenu, setOpenCustomizeMenu] = useState(false);
  const closeCustomizeMenu = () => {
    setOpenCustomizeMenu(false);
  };

  const [error, setError] = useState<null | string>(null);

  const actionsMenuOptions = useMemo(
    () => menuActionsOptions
      .map((item) => {
        switch (item.value) {
          case 'customize-view':
            return { ...item, handleClick: () => setOpenCustomizeMenu(true) };
          case 'excel':
            return {
              ...item,
              handleClick: () => downloadFile(
                '/Report/bookingsexcel',
                'excel.xls',
                {
                  ids: getBookingItemsIds(table.visibleRows),
                  columns: getAvailableColumns(table.customization.visibleColumns),
                  ordering: getSortingOrdering(table.sorting.filters, headCells), // objects, key - field name, value - asc | desc
                },
                setError,
              ),
            };
          case 'pdf':
            return {
              ...item,
              handleClick: () => downloadFile(
                '/Report/bookingspdf',
                'report.pdf',
                {
                  ids: getBookingItemsIds(table.visibleRows),
                  columns: getAvailableColumns(table.customization.visibleColumns),
                  ordering: getSortingOrdering(table.sorting.filters, headCells), // objects, key - field name, value - asc | desc
                },
                setError,
              ),
            };
          case 'test-bookings':
            return !showTestBookings
              ? {
                ...item,
                handleClick: () => {
                  const fn = getFetchBookingsFn(true);
                  setShowTestBookings(true);
                  dispatch(fn());
                },
              }
              : null;
          case 'live-bookings':
            return showTestBookings
              ? {
                ...item,
                handleClick: () => {
                  const fn = getFetchBookingsFn(false);
                  setShowTestBookings(false);
                  dispatch(fn());
                },
              }
              : null;
          case 'copy': {
            return {
              ...item,
              handleClick: () => copyTable(tableRef),
            };
          }
          case 'random': {
            return {
              ...item,
              handleClick: () => setShowRandom(true),
            };
          }

          default:
            return item;
        }
      })
      .filter((item) => item),
    [menuActionsOptions, showTestBookings],
  );

  const actionsMenuRef = useRef(null);

  return bookingData.status === 'loading' ? (
    <LoadingOverlay />
  ) : (
    <Wrapper>
      <StyledAlert type="success" className="booking-alert">
        <p>
          Good news
          {' '}
          <strong>Test User</strong>
          , we’ve integrated with
          {' '}
          <a href="https://www.getqflow.com/features" target="_blank" rel="noreferrer">
            Qflow
          </a>
          {' '}
          which is a simple and intuitive ticket scanning and guest list app that you can use to
          scan your guests in to your events.
          <br />
          <Button type="button" onClick={toggleOpenQflowModal}>
            See more information
          </Button>
        </p>
      </StyledAlert>
      {bookingData?.error ? (
        <>
          <br />
          <StyledAlert type="error">
            {process.env.NODE_ENV === 'development' ? bookingData?.error : 'Something went wrong'}
          </StyledAlert>
        </>
      ) : null}
      {!showTestBookings ? null : (
        <>
          <br />
          <StyledAlert type="warning" testid="test-bookings">
            Warning: You are viewing <strong>test</strong> bookings
          </StyledAlert>
          <br />
        </>
      )}
      {!table.visibleRows.length ? (
        <StyledAlert type="warning">There are no bookings</StyledAlert>
      ) : null}
      <Filters>
        <div>
          <Label
            text="Ticket Selection"
            content={{
              title: '',
              text: '',
            }}
            inputId="ticket"
          />
          <FiltersWrapper>
            <Col>
              <p className="filter-title">Event</p>
              <NestedMenu
                options={eventOptions}
                rootId={!filters?.event ? null : filters?.event.year}
                buttonLabel={!filters?.event ? null : filters?.event.label}
                selectedId={!filters?.event ? null : filters?.event.value}
                handleChoose={handleEventChange}
              />
            </Col>
            <Col>
              <p className="filter-title">Product</p>
              <Select
                options={productsOptions}
                value={filters?.product}
                onChange={handleProductChange}
                placeholder="Select Product"
              />
            </Col>
            <Col>
              <p className="filter-title">Group By</p>
              <Select
                options={groupByOptions}
                value={filters?.groupBy}
                onChange={handleGroupByChange}
                placeholder="Group By"
              />
            </Col>
          </FiltersWrapper>
        </div>
        <div>
          <SearchBarWrapper className="search-wrapper" ref={actionsMenuRef}>
            <StyledInput
              name="search"
              placeholder="Search by table columns"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <ZoomIconSmall />
                  </InputAdornment>
                ),
              }}
              onChange={updateSearchText}
            />
            <ActionsMenu options={actionsMenuOptions} />
          </SearchBarWrapper>
        </div>
      </Filters>
      <TableContent>
        {!error ? null : (
          <>
            <Alert type="error">{error}</Alert>
            <br />
          </>
        )}
        <TableCaption>
          <p>
            <strong>{`${table.visibleRows.length} `}</strong>
            {`${
              table.visibleRows.length === 0 || table.visibleRows.length > 1 ? 'Entries' : 'Entry'
            }`}
          </p>
        </TableCaption>
        <TableWrapper>
          <StyledTableWrapper>
            <Table sx={{ minWidth: 320 }} aria-labelledby="tableTitle" size="small" ref={tableRef}>
              <Head
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows?.length}
                cells={visibleColumns ?? []}
                className="table-head"
                checkbox={false}
              />
              <TableBody>
                {table.visibleRows.map((row, index) => (
                  // const isItemSelected = checkIsSelected(row.id);
                  // const labelId = `enhanced-table-checkbox-${index}`;

                  <Row
                    tabIndex={-1}
                    key={row.num}
                    className={table.visibleRows.length - 1 === index ? 'last' : ''}
                  >
                    {columnsOptions.get('num')?.checked ? (
                      <TableCell className="row-id">
                        <p>{row.num}</p>
                      </TableCell>
                    ) : null}
                    {columnsOptions.get('firstName')?.checked ? (
                      <TableCell className="first-name">
                        <p>{row.firstName}</p>
                      </TableCell>
                    ) : null}
                    {columnsOptions.get('lastName')?.checked ? (
                      <TableCell className="last-name">
                        <p>{row.lastName}</p>
                      </TableCell>
                    ) : null}
                    {columnsOptions.get('bookingName')?.checked ? (
                      <TableCell className="booking-name">
                        <p>{row.bookingName}</p>
                      </TableCell>
                    ) : null}
                    {columnsOptions.get('class')?.checked ? (
                      <TableCell className="class">
                        <p>{row.class}</p>
                      </TableCell>
                    ) : null}
                    {columnsOptions.get('bookingInfo')?.checked ? (
                      <TableCell className="booking-info">
                        <p>{row.bookingInfo}</p>
                      </TableCell>
                    ) : null}
                    {columnsOptions.get('sku')?.checked ? (
                      <TableCell className="sku">
                        <p>{row.sku}</p>
                      </TableCell>
                    ) : null}
                    {columnsOptions.get('product.name')?.checked ? (
                      <TableCell className="product">
                        <p>{row.product.name}</p>
                      </TableCell>
                    ) : null}
                    {columnsOptions.get('price')?.checked ? (
                      <TableCell className="price">
                        <p>{`${getCurrencyByCode(row?.currency ?? 'GBP', row.price)}`}</p>
                      </TableCell>
                    ) : null}
                    {columnsOptions.get('quantity')?.checked ? (
                      <TableCell className="quantity">
                        <p>{row.quantity}</p>
                      </TableCell>
                    ) : null}
                    {columnsOptions.get('orderId')?.checked ? (
                      <TableCell className="order-id">
                        <p onClick={(e) => handleOrderDetailDrawer(e, row.order)}>{row.orderId}</p>
                      </TableCell>
                    ) : null}
                    {columnsOptions.get('date')?.checked ? (
                      <TableCell className="order-date">
                        <p>{dayjs(row.date).format('DD/MM/YYYY HH:mm')}</p>
                      </TableCell>
                    ) : null}
                    {columnsOptions.get('customerName')?.checked ? (
                      <TableCell className="booked-by">
                        <p>{row.customerName}</p>
                      </TableCell>
                    ) : null}
                    {columnsOptions.get('phone')?.checked ? (
                      <TableCell className="phone">
                        <p>{row.phone}</p>
                      </TableCell>
                    ) : null}
                    {columnsOptions.get('email')?.checked ? (
                      <TableCell className="email">
                        <p>{row.email}</p>
                      </TableCell>
                    ) : null}
                    {columnsOptions.get('paymentMethod')?.checked ? (
                      <TableCell className="payment-method">
                        <p>{row.paymentMethod}</p>
                      </TableCell>
                    ) : null}
                  </Row>
                ))}
                {!isFound && isSearching ? (
                  <Row className="last">
                    <TableCell className="not-found">
                      <p>No matches records found</p>
                    </TableCell>
                  </Row>
                ) : null}
              </TableBody>
            </Table>
          </StyledTableWrapper>
          {!bookingData.data?.length ? null : (
            <TablePagination
              handleChangePage={changePage}
              handleChangeRowsPerPage={changeRowsPerPage}
              page={page}
              pagesCount={pagesCount}
              rowsPerPage={rowsPerPage}
              options={[5, 10, 25]}
            />
          )}
        </TableWrapper>
      </TableContent>
      {openUpdateBooking
        ? createPortal(
          <Overlay onClick={handleCloseUpdateBooking} className="overlay">
            <BookingEditModal />
          </Overlay>,
          document.body,
        )
        : null}
      {showRandom
        ? createPortal(
          <Overlay onClick={handleCloseRandom} className="overlay">
            <BookingRandomModal handleClose={toggleShowRandom} />
          </Overlay>,
          document.body,
        )
        : null}
      {openQflowModal
        ? createPortal(
          <Overlay onClick={handleCloseQflowModal} className="overlay">
            <QflowModal handleClose={toggleOpenQflowModal} />
          </Overlay>,
          document.body,
        )
        : null}
      {actionsMenuRef.current && openCustomizeMenu ? (
        <CustomizeTableColumnsPopup
          anchorEl={actionsMenuRef.current}
          open={openCustomizeMenu}
          onClose={closeCustomizeMenu}
          options={columnsOptions}
          updatePopup={updateColumnsOptions}
        />
      ) : null}
      {!orderDetails ? null : (
        <StyledDrawer
          anchor="right"
          open={orderDetailOpen}
          onClose={(e) => handleOrderDetailDrawer(e, null)}
        >
          <DrawerOverlay
            handleClick={handleOrderDetailDrawer}
            handleKeydown={handleOrderDetailDrawer}
          >
            <OrderDetails data={orderDetails} needsActions={false} type="booking" />
          </DrawerOverlay>
        </StyledDrawer>
      )}
    </Wrapper>
  );
};

export default ReportingBooking;
