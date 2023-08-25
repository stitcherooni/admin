import React, {
  ChangeEvent, SyntheticEvent, useMemo, useState,
} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SelectChangeEvent } from '@mui/material/Select';
import dayjs from 'dayjs';
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
} from './ReportingBooking.styled';
import {
  Row,
  StyledCheckbox,
  StyledTableWrapper,
  TableWrapper,
} from '../../../shared/Table/Table.styled';
import { useSortingTable } from '../../../shared/Table/utils';
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
  createEventsOptions,
  createProductOptions,
  createSortByOptions,
  handleCloseModal,
} from './utils';
import OrderDetails from '../ReportingOrders/OrderDetails/OrderDetails';
import DrawerOverlay from '../DrawerOverlay/DrawerOverlay';
import { BookingStatEvents, BookingStatGroupByFilter, BookingStatItem } from '../../../../types/reporting/bookings';
import { Order } from '../../../../types/reporting/orders';
import { getCurrencyByCode } from '../../../../utils/currency';
import LoadingOverlay from '../../../shared/LoadingOverlay/LoadingOverlay';

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
  const bookingData = useSelector((state: RootState) => state.reporting.bookings);
  const table = useSortingTable<BookingStatItem>(bookingData.data, {
    totalCount: bookingData.totalCount,
    totalPages: bookingData.totalPages,
    pageSize: bookingData.pageSize,
    currentPage: bookingData.currentPage,
  });
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
    dispatch(sortBookingStat({
      EventIds: value,
      ProductIds: filters.product ?? '',
      GroupBy: filters.groupBy ?? '',
      page: bookingData.currentPage,
      pageSize: bookingData.pageSize,
    }));
  };

  const handleSelectFilters = (e: any, type: string) => {
    setSelectedFilters((currentFilters) => ({
      ...currentFilters,
      [type]: e.target.value,
    }));

    dispatch(sortBookingStat({
      EventIds: filters.event?.value,
      ProductIds: type === 'product' ? e.target.value : filters.product,
      GroupBy: type === 'groupBy' ? e.target.value : filters.groupBy ?? '',
      page: bookingData.currentPage,
      pageSize: bookingData.pageSize,
    }));
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

  return bookingData.status === 'loading' ? <LoadingOverlay /> : (
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
          <SearchBarWrapper className="search-wrapper">
            <ActionsMenu options={menuActionsOptions} />
          </SearchBarWrapper>
        </div>
      </Filters>
      <TableContent>
        <TableCaption>
          <p>
            <strong>{`${bookingData.totalCount} `}</strong>
            {`${bookingData.totalCount === 0 || bookingData.totalCount > 1 ? 'Entries' : 'Entry'}`}
          </p>
        </TableCaption>
        <TableWrapper>
          <StyledTableWrapper>
            <Table sx={{ minWidth: 320 }} aria-labelledby="tableTitle" size="small">
              <Head
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={bookingData.data.length}
                cells={headCells}
                className="table-head"
                checkbox={false}
              />
              <TableBody>
                {table.visibleRows.map((row, index) =>
                // const isItemSelected = checkIsSelected(row.id);
                // const labelId = `enhanced-table-checkbox-${index}`;

                  (
                    <Row
                      tabIndex={-1}
                      key={row.num}
                    >
                      {/* <TableCell className="checkbox">
                        <StyledCheckbox
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                          size="small"
                        />
                      </TableCell> */}
                      <TableCell className="row-id">
                        <p>{row.num}</p>
                      </TableCell>
                      <TableCell className="first-name">
                        <p>{(row as any).firstName}</p>
                      </TableCell>
                      <TableCell className="last-name">
                        <p>{(row as any).lastName}</p>
                      </TableCell>
                      <TableCell className="booking-name">
                        <p>{row.bookingName}</p>
                      </TableCell>
                      <TableCell className="class">
                        <p>{(row as any).class}</p>
                      </TableCell>
                      <TableCell className="booking-info">
                        <p>{(row as any).bookingInfo}</p>
                      </TableCell>
                      <TableCell className="sku">
                        <p>{(row as any).sku}</p>
                      </TableCell>
                      <TableCell className="product">
                        <p>{row.product.bookingName}</p>
                      </TableCell>
                      <TableCell className="price">
                        <p>{`${getCurrencyByCode((row as any).currency, (row as any).price)}`}</p>
                      </TableCell>
                      <TableCell className="quantity">
                        <p>{(row as any).quantity}</p>
                      </TableCell>
                      <TableCell className="order-id">
                        <p>{(row as any).orderId}</p>
                      </TableCell>
                      <TableCell className="order-date">
                        <p>{dayjs(row.date).format('DD/MM/YYYY HH:MM')}</p>
                      </TableCell>
                      <TableCell className="booked-by">
                        <p>{(row as any).bookedBy}</p>
                      </TableCell>
                      <TableCell className="phone">
                        <p>{(row as any).phone}</p>
                      </TableCell>
                      <TableCell className="email">
                        <p>{(row as any).email}</p>
                      </TableCell>
                      <TableCell className="payment-method">
                        <p>{(row as any).paymentMethod}</p>
                      </TableCell>
                      <TableCell className="actions">
                        <ActionsMenu options={tableActionsOptions} />
                      </TableCell>
                    </Row>
                  ))}
              </TableBody>
            </Table>
          </StyledTableWrapper>
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
      {openUpdateBooking
        ? createPortal(
          <Overlay onClick={handleCloseUpdateBooking} className="overlay">
            <BookingEditModal />
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
      {/* {!orderDetails ? null : (
        <StyledDrawer
          anchor="right"
          open={orderDetailOpen}
          onClose={(e) => handleOrderDetailDrawer(e, null)}
        >
          <DrawerOverlay
            handleClick={handleOrderDetailDrawer}
            handleKeydown={handleOrderDetailDrawer}
          >
            <OrderDetails data={orderDetails} needsActions={false} />
          </DrawerOverlay>
        </StyledDrawer>
      )} */}
    </Wrapper>
  );
};

export default ReportingBooking;
