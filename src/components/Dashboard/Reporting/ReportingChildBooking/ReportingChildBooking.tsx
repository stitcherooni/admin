import React, { useMemo, useRef, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { useDispatch, useSelector } from 'react-redux';
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
  TableWrapper,
  Button,
  StyledInput,
} from './ReportingChildBooking.styled';
import { Row, StyledTableWrapper } from '../../../shared/Table/Table.styled';
import { copyTable, useSortingTable } from '../../../shared/Table/utils';
import { headCells, menuActionsOptions } from './table-data';
import Label from '../../../shared/Label/Label';
import NestedMenu from '../../../shared/NestedMenu/NestedMenu';
import TablePagination from '../../../shared/Table/TablePagination/TablePagination';
import Select from '../../../shared/Select/Select';
import ActionsMenu from '../../../shared/ActionsMenu/ActionsMenu';
import { AppDispatch, RootState } from '../../../../redux/store';
import { createEventsOptions } from '../ReportingBooking/utils';
import { sortChildBookingStat } from '../../../../redux/actions/reporting.actions';
import {
  createSortByOptions, getAvailableColumns,
  getChildBookingItemsIds, getFetchChildBookingsFn, getSortingOrdering,
} from './utils';
import { BookingStatEvents, ChildBookingStatItem } from '../../../../types/reporting/bookings';
import ZoomIconSmall from '../../../../assets/icons/zoom-icon-small';
import { downloadFile } from '../../../../utils/file';
import CustomizeTableColumnsPopup from '../../../shared/Table/CustomizeTableColumnsPopup/CustomizeTableColumnsPopup';
import { updateSelectedFilters } from '../../../../redux/slices/reporting/childBookings.slice';
import Qflow from '../Qflow/Qflow';
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
  groupBy?: string;
}

const ReportingChildBooking = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showTestBookings, setShowTestBookings] = useState(false);
  const childBookingData = useSelector((state: RootState) => state.reporting.childBookings);
  const headCols = useMemo(() => {
    if (childBookingData.selectedFilters.groupBy !== 'noGroup') {
      return headCells.filter((item) => item.id !== 'class');
    }

    return headCells;
  }, [childBookingData.selectedFilters.groupBy, headCells]);
  const rows = useMemo(() => (!showTestBookings ? childBookingData.data ??
     [] : childBookingData.testData ?? []), [showTestBookings, childBookingData]);
  const table = useSortingTable<ChildBookingStatItem>(rows, { columns: headCols, totalCount: rows.length });
  const { page, pagesCount, rowsPerPage, totalRows, 
    handleChangePage, handleChangeRowsPerPage } = table.pagination;
  const { selected, handleSelectAllClick } = table.selection;
  const { handleRequestSort } = table.sorting;

  const handleChooseEvent = (e: any) => {
    const { value, label, rootid } = e.currentTarget.dataset;
    dispatch(updateSelectedFilters({
      ...childBookingData.selectedFilters,
      event: {
        value,
        label,
        year: rootid,
      },
    }));
    dispatch(sortChildBookingStat({
      EventIds: value,
      GroupBy: childBookingData.selectedFilters.groupBy ?? '',
    }));
  };

  const handleSelectFilters = (e: any) => {
    dispatch(updateSelectedFilters({
      ...childBookingData.selectedFilters,
      groupBy: e.target.value,
    }));
    dispatch(sortChildBookingStat({
      EventIds: childBookingData.selectedFilters.event?.value ?? '',
      GroupBy: e.target.value ?? '',
    }));
  };

  const handleEventChange = (e: any) => handleChooseEvent(e);
  const handleGroupByChange = (e: any) => handleSelectFilters(e);

  const eventOptions = useMemo(
    () => createEventsOptions(childBookingData?.filters?.events ?? ([] as BookingStatEvents[])),
    [childBookingData?.filters?.events],
  );

  const groupByOptions = useMemo(
    () => createSortByOptions(childBookingData?.filters?.groupBy ?? ([] as any)),
    [childBookingData?.filters?.groupBy],
  );

  const { updateSearchText, isFound, isSearching } = table.search;
  const tableRef = useRef(null);
  const { columnsOptions, visibleColumns, updateColumnsOptions } = table.customization;

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
                '/Report/childonlybookingsexcel',
                'excel.xls',
                {
                  ids: getChildBookingItemsIds(table.visibleRows),
                  columns: getAvailableColumns(table.customization.visibleColumns),
                  ordering: getSortingOrdering(table.sorting.filters, headCols), // objects, key - field name, value - asc | desc
                },
                setError,
              ),
            };
          case 'pdf':
            return {
              ...item,
              handleClick: () => downloadFile(
                '/Report/childonlybookingspdf',
                'report.pdf',
                {
                  ids: getChildBookingItemsIds(table.visibleRows),
                  columns: getAvailableColumns(table.customization.visibleColumns),
                  ordering: getSortingOrdering(table.sorting.filters, headCols), // objects, key - field name, value - asc | desc
                },
                setError,
              ),
            };
          case 'test-bookings':
            return !showTestBookings
              ? {
                ...item,
                handleClick: () => {
                  const fn = getFetchChildBookingsFn(true);
                  setShowTestBookings(true);
                  dispatch(fn({
                    eventIds: childBookingData.selectedFilters.event?.value ?? '',
                    groupBy: childBookingData.selectedFilters.groupBy ?? '',
                  }));
                },
              }
              : null;
          case 'live-bookings':
            return showTestBookings
              ? {
                ...item,
                handleClick: () => {
                  const fn = getFetchChildBookingsFn(false);
                  setShowTestBookings(false);
                  dispatch(fn({
                    eventIds: childBookingData.selectedFilters.event?.value ?? '',
                    groupBy: childBookingData.selectedFilters.groupBy ?? '',
                  }));
                },
              }
              : null;
          case 'copy': {
            return {
              ...item,
              handleClick: () => copyTable(tableRef),
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

  return childBookingData.status === 'loading' ? <LoadingOverlay /> : (
    <Wrapper>
      <Qflow />
      {childBookingData?.error || error ? (
        <>
          <br />
          <StyledAlert type="error">
            {process.env.NODE_ENV === 'development' ? childBookingData?.error : error ?? 'Something went wrong'}
          </StyledAlert>
        </>
      ) : null}
      {!showTestBookings ? null : (
        <>
          <br />
          <StyledAlert type="warning" testid="test-bookings">
            Warning: You are viewing
            {' '}
            <strong>test</strong>
            {' '}
            bookings
          </StyledAlert>
          <br />
        </>
      )}
      {childBookingData.selectedFilters.event.year === '' || !table.visibleRows.length ? <StyledAlert type="warning">There are no bookings</StyledAlert> : null}
      <Filters>
        <div>
          <Label
            text="Ticket Selection"
            inputId="ticket"
            content={{
              title: '',
              text: '',
            }}
          />
          <FiltersWrapper>
            <Col>
              <p className="filter-title">Event</p>
              <NestedMenu
                options={eventOptions}
                rootId={!childBookingData.selectedFilters?.event ? null : childBookingData.selectedFilters?.event.year}
                buttonLabel={!childBookingData.selectedFilters?.event ? null : childBookingData.selectedFilters?.event.label}
                selectedId={!childBookingData.selectedFilters?.event ? null : childBookingData.selectedFilters?.event.value}
                handleChoose={handleEventChange}
                placeholder="Select Event"
              />
            </Col>
            <Col>
              <p className="filter-title">Group By</p>
              <Select
                options={groupByOptions}
                value={childBookingData.selectedFilters?.groupBy}
                onChange={handleGroupByChange}
                placeholder="Group By"
              />
            </Col>
          </FiltersWrapper>
        </div>
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
      </Filters>
      {childBookingData.selectedFilters.event?.year !== '' || !table.visibleRows.length ? (
        <TableContent>
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
                  rowCount={rows.length}
                  cells={visibleColumns}
                  className="table-head"
                  checkbox={false}
                />
                <TableBody>
                  {childBookingData.selectedFilters.groupBy !== 'noGroup' && table.visibleRows.length ? (
                    <Row>
                      {columnsOptions.get('firstName')?.checked ? (
                        <TableCell className="first-name hidden sum" />
                      ) : null}
                      {columnsOptions.get('lastName')?.checked ? (
                        <TableCell className="last-name hidden sum" />
                      ) : null}
                      {columnsOptions.get('class')?.checked && childBookingData.selectedFilters.groupBy === 'noGroup' ? (
                        <TableCell className="class hidden sum" />
                      ) : null}
                      {columnsOptions.get('bookedBy')?.checked ? (
                        <TableCell className="booked-by hidden sum" />
                      ) : null}
                      {columnsOptions.get('allergies')?.checked ? (
                        <TableCell className="medical hidden sum" />
                      ) : null}
                      {columnsOptions.get('phone')?.checked ? (
                        <TableCell className="phone hidden sum">
                          <strong>{`${childBookingData.soldQuantity} Sold`}</strong>
                        </TableCell>
                      ) : null}
                    </Row>
                  ) : null}
                  {table.visibleRows.map((row, i) => (
                    <Row
                      key={row.num}
                      className={table.visibleRows.length - 1 === i ? 'last' : ''}
                    >
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
                      {columnsOptions.get('class')?.checked && childBookingData.selectedFilters.groupBy === 'noGroup' ? (
                        <TableCell className="class">
                          <p>{row.class}</p>
                        </TableCell>
                      ) : null}
                      {columnsOptions.get('bookedBy')?.checked ? (
                        <TableCell className="booked-by">
                          <p>{row.bookedBy}</p>
                        </TableCell>
                      ) : null}
                      {columnsOptions.get('allergies')?.checked ? (
                        <TableCell className="medical">
                          <p>{row.allergies}</p>
                        </TableCell>
                      ) : null}
                      {columnsOptions.get('phone')?.checked ? (
                        <TableCell className="phone">
                          <p>{row.phone}</p>
                        </TableCell>
                      ) : null}
                    </Row>
                  ))}
                  {!isFound && isSearching ? (
                    <Row className="last">
                      <TableCell className="not-found" extended={childBookingData.selectedFilters.groupBy === 'noGroup'}>
                        <p>No matches records found</p>
                      </TableCell>
                    </Row>
                  ) : null}
                </TableBody>
              </Table>
            </StyledTableWrapper>
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
      ) : null}
      {actionsMenuRef.current && openCustomizeMenu ? (
        <CustomizeTableColumnsPopup
          anchorEl={actionsMenuRef.current}
          open={openCustomizeMenu}
          onClose={closeCustomizeMenu}
          options={columnsOptions}
          updatePopup={updateColumnsOptions}
        />
      ) : null}
    </Wrapper>
  );
};

export default ReportingChildBooking;
