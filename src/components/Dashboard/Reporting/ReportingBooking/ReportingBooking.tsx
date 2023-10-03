import React, {
  SyntheticEvent, useEffect, useMemo, useRef, useState,
} from 'react';
import Table from '@mui/material/Table';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  StyledAlert, TableCaption, TableContent, Head, Wrapper,
} from './ReportingBooking.styled';
import { StyledTableWrapper, TableWrapper } from '../../../shared/Table/Table.styled';
import { useSortingTable } from '../../../shared/Table/utils';
import { headCells } from './table-data';
import { Overlay, StyledDrawer } from '../Reporting.styled';
import BookingEditModal from './BookingEditModal/BookingEditModal';
import TablePagination from '../../../shared/Table/TablePagination/TablePagination';
import { AppDispatch, RootState } from '../../../../redux/store';
import { convertBookingItems, createBookingActions, getFetchBookingsFn } from './utils';
import OrderDetails from '../ReportingOrders/OrderDetails/OrderDetails';
import DrawerOverlay from '../DrawerOverlay/DrawerOverlay';
import { BookingStatItem } from '../../../../types/reporting/bookings';
import { Order } from '../../../../types/reporting/orders';
import LoadingOverlay from '../../../shared/LoadingOverlay/LoadingOverlay';
import BookingRandomModal from './BookingRandomModal/BookingRandomModal';
import CustomizeTableColumnsPopup from '../../../shared/Table/CustomizeTableColumnsPopup/CustomizeTableColumnsPopup';
import Alert from '../../../shared/Alert/Alert';
import Qflow from '../Qflow/Qflow';
import { handleCloseModal } from '../../../../utils/modals';
import ReportingBookingTableBody from './ReportingBookingTableBody';
import ReportingBookingFilters from './ReportingBookingFilters/ReportingBookingFilters';
import { resetSelectedFilters } from '../../../../redux/slices/reporting/bookings.slice';
import { ActionsMenuOption } from '../../../shared/ActionsMenu/ActionsMenu';

const ReportingBooking = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showTestBookings, setShowTestBookings] = useState(false);

  const bookingData = useSelector((state: RootState) => state.reporting.bookings);
  // eslint-disable-next-line max-len
  const rows = useMemo(
    () => (!showTestBookings ? bookingData.data ?? [] : bookingData.testData ?? []),
    [showTestBookings, bookingData.data, bookingData.testData],
  );
  const table = useSortingTable<BookingStatItem>(
    rows,
    {
      columns: headCells,
      totalCount: rows.length,
    },
    convertBookingItems,
  );
  const {
    page, pagesCount, rowsPerPage, totalRows, handleChangePage, handleChangeRowsPerPage,
  } = table.pagination;
  const { selected, handleSelectAllClick } = table.selection;
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

  const [openCustomizeMenu, setOpenCustomizeMenu] = useState(false);
  const closeCustomizeMenu = () => {
    setOpenCustomizeMenu(false);
  };

  const [error, setError] = useState<null | string>(null);

  const fetchBookingData = (testBookings: boolean) => {
    const fn = getFetchBookingsFn(testBookings);
    setShowTestBookings(testBookings);
    dispatch(fn());
  };

  const navigate = useNavigate();
  const sendNewsletter = () => {
    navigate(
      `/dashboard/listings?type=booking-newsletter&id=${bookingData.selectedFilters.event.value}`,
    );
  };

  const actionsMenuOptions = useMemo(
    () => createBookingActions({
      handleCustomize: setOpenCustomizeMenu,
      tableData: table,
      headCells,
      showTestBookings,
      fetchBookingData,
      tableRef,
      toggleShowRandom,
      errorCb: setError,
      sendNewsletter,
    }),
    [showTestBookings, table],
  );

  const actionsMenuRef = useRef(null);

  useEffect(() => {
    dispatch(resetSelectedFilters());
  }, []);

  return bookingData.status === 'loading' ? (
    <LoadingOverlay />
  ) : (
    <Wrapper>
      <Qflow />
      {bookingData?.error ? (
        <StyledAlert type="error">
          {process.env.NODE_ENV === 'development' ? bookingData?.error : 'Something went wrong'}
        </StyledAlert>
      ) : null}
      {!showTestBookings ? null : (
        <StyledAlert type="warning" testid="test-bookings">
          Warning: You are viewing
          {' '}
          <strong>test</strong>
          {' '}
          bookings
        </StyledAlert>
      )}
      {!table.visibleRows.length ? (
        <StyledAlert type="warning">There are no bookings</StyledAlert>
      ) : null}
      <ReportingBookingFilters
        actionsMenuRef={actionsMenuRef}
        updateSearchText={updateSearchText}
        actionsMenuOptions={actionsMenuOptions as ActionsMenuOption[]}
      />
      <TableContent>
        {!error ? null : (
          <>
            <Alert type="error">{error}</Alert>
            <br />
          </>
        )}
        <TableCaption>
          <p>
            <strong>{`${totalRows} `}</strong>
            {`${totalRows === 0 || totalRows > 1 ? 'Entries' : 'Entry'}`}
          </p>
        </TableCaption>
        <TableWrapper>
          <StyledTableWrapper>
            <Table sx={{ minWidth: 320 }} aria-labelledby="tableTitle" size="small" ref={tableRef}>
              <Head
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={totalRows ?? 0}
                cells={visibleColumns ?? []}
                className="table-head"
                checkbox={false}
              />
              <ReportingBookingTableBody
                rows={table.visibleRows}
                columnsOptions={columnsOptions}
                handleOrderDetailDrawer={handleOrderDetailDrawer}
                dataFound={isFound}
                dataSearching={isSearching}
              />
            </Table>
          </StyledTableWrapper>
          {!totalRows ? null : (
            <TablePagination
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
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
