import React, {
  ChangeEvent, SyntheticEvent, useMemo, useState,
} from 'react';
import Table from '@mui/material/Table/Table';
import TableBody from '@mui/material/TableBody/TableBody';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SelectChangeEvent } from '@mui/material/Select/Select';
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
  TableWrapper,
  Button,
} from './ReportingChildBooking.styled';
import { Row, StyledTableWrapper } from '../../../shared/Table/Table.styled';
import { useSortingTable } from '../../../shared/Table/utils';
import { headCells, menuActionsOptions, rows } from './table-data';
import { Overlay } from '../Reporting.styled';
import Label from '../../../shared/Label/Label';
import NestedMenu from '../../../shared/NestedMenu/NestedMenu';
import DeleteConfirmationModal from '../../../shared/Modals/DeleteConfirmationModal/DeleteConfirmationModal';
import TablePagination from '../../../shared/Table/TablePagination/TablePagination';
import Select from '../../../shared/Select/Select';
import ActionsMenu from '../../../shared/ActionsMenu/ActionsMenu';
import { AppDispatch, RootState } from '../../../../redux/store';
import { BookingEvents, ChildBooking } from '../../../../types/reporting/bookings';
import { createEventsOptions, handleCloseModal } from '../ReportingBooking/utils';
import { getChildBookingStat, sortChildBookingStat } from '../../../../redux/actions/reporting.actions';
import { createSortByOptions } from './utils';
import QflowModal from '../QflowModal/QflowModal';

interface Filter {
  value: number | string;
  label: number | string;
}

interface EventFilter extends Filter {
  year: number | string;
}

interface ReportingFilters {
  event?: EventFilter;
  groupBy?: string;
}

const ReportingChildBooking = () => {
  const dispatch = useDispatch<AppDispatch>();
  const childBookingData = useSelector((state: RootState) => state.reporting.childBookings);
  const table = useSortingTable<ChildBooking>(childBookingData.data, {
    totalCount: childBookingData.totalCount,
    totalPages: childBookingData.totalPages,
    pageSize: childBookingData.pageSize,
    currentPage: childBookingData.currentPage,
  });
  const { page, pagesCount, rowsPerPage } = table.pagination;
  const { selected, handleSelectAllClick } = table.selection;
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
      year: '',
      label: '',
    },
    groupBy: '',
  });
  const handleChooseEvent = (e) => {
    const { value, label, rootid } = e.currentTarget.dataset;
    setSelectedFilters((currentFilters) => ({
      ...currentFilters,
      event: {
        value,
        label,
        year: rootid,
      },
    }));
    dispatch(sortChildBookingStat({
      EventIds: value,
      GroupBy: filters.groupBy ?? '',
      page: childBookingData.currentPage,
      pageSize: childBookingData.pageSize,
    }));
  };

  const handleSelectFilters = (e) => {
    setSelectedFilters((currentFilters) => ({
      ...currentFilters,
      groupBy: e.target.value,
    }));
    dispatch(sortChildBookingStat({
      EventIds: filters.event?.value ?? '',
      GroupBy: filters.groupBy ?? '',
      page: childBookingData.currentPage,
      pageSize: childBookingData.pageSize,
    }));
  };

  const handleEventChange = (e) => handleChooseEvent(e);
  const handleGroupByChange = (e) => handleSelectFilters(e);

  const changePage = (e: ChangeEvent, newPage?: number) => {
    e.preventDefault();
    dispatch(
      getChildBookingStat({
        page: newPage,
        pageSize: rowsPerPage,
      }),
    );
  };

  const changeRowsPerPage = (e: SelectChangeEvent<unknown>) => {
    dispatch(
      getChildBookingStat({
        page: 1,
        pageSize: parseInt((e.target as HTMLSelectElement).value, 10),
      }),
    );
  };

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const toggleOpenDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

  const handleCloseDeleteModal = (e: SyntheticEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (!target.className.length) return;

    if (target.className.includes('overlay')) {
      toggleOpenDeleteModal();
    }
  };

  const eventOptions = useMemo(
    () => createEventsOptions(childBookingData?.filters?.events ?? ([] as BookingEvents[])),
    [childBookingData?.filters?.events],
  );

  const groupByOptions = useMemo(
    () => createSortByOptions(childBookingData?.filters?.groupBy ?? ([] as BookingGroupByFilter)),
    [childBookingData?.filters?.groupBy],
  );

  // group by filter should be array
  // not need on url product id params

  return (
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
          <Button onClick={toggleOpenQflowModal}>See more information</Button>
        </p>
      </StyledAlert>
      <Filters>
        <div>
          <Label text="Ticket Selection" content={{}} inputId="ticket" />
          <FiltersWrapper>
            <Col>
              <p className="filter-title">Event</p>
              <NestedMenu
                options={eventOptions}
                rootId={!filters?.event ? null : filters?.event.year}
                buttonLabel={!filters?.event ? null : filters?.event.label}
                selectedId={!filters?.event ? null : filters?.event.value}
                handleChoose={handleEventChange}
                placeholder="Select Event"
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
            <strong>{`${childBookingData.totalCount} `}</strong>
            {`${childBookingData.totalCount === 0 || childBookingData.totalCount > 1 ? 'Entries' : 'Entry'}`}
          </p>
        </TableCaption>
        <TableWrapper>
          <StyledTableWrapper>
            <Table sx={{ minWidth: 320 }} aria-labelledby="tableTitle" size="small">
              <Head
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                cells={headCells}
                className="table-head"
                checkbox={false}
              />
              <TableBody>
                <Row sx={{ cursor: 'pointer' }}>
                  <TableCell className="total">
                    <strong>0 Sold</strong>
                  </TableCell>
                </Row>
                {table.visibleRows.map((row) => (
                  <Row key={row.num}>
                    <TableCell className="first-name">
                      <p>{row.firstName}</p>
                    </TableCell>
                    <TableCell className="last-name">
                      <p>{row.lastName}</p>
                    </TableCell>
                    <TableCell className="booked-by">
                      <p>{row.bookedBy}</p>
                    </TableCell>
                    <TableCell className="medical">
                      <p>{row.allergies}</p>
                    </TableCell>
                    <TableCell className="phone">
                      <p>{row.phone}</p>
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
      {openDeleteModal
        ? createPortal(
          <Overlay onClick={handleCloseDeleteModal} className="overlay">
            <DeleteConfirmationModal
              deleteItemName={namesToDelete}
              confirm={console.log}
              cancel={console.log}
            />
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
    </Wrapper>
  );
};

export default ReportingChildBooking;
