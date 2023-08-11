import React, {
  ChangeEvent, SyntheticEvent, useMemo, useState,
} from 'react';
import TableContainer from '@mui/material/TableContainer/TableContainer';
import Table from '@mui/material/Table/Table';
import TableBody from '@mui/material/TableBody/TableBody';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SelectChangeEvent } from '@mui/material/Select/Select';
import {
  Col,
  Filters,
  FiltersWrapper,
  TableCell,
  TableContent,
  Head,
  Wrapper,
  SearchBarWrapper,
} from './ReportingTickets.styled';
import {
  Row,
  StyledCheckbox,
  TableCaption,
  TableWrapper,
} from '../../../shared/Table/Table.styled';
import { useSortingTable } from '../../../shared/Table/utils';
import {
  actionsOptions, headCells, menuActionsOptions, rows,
} from './table-data';
import ActionsMenu from '../../../shared/ActionsMenu/ActionsMenu';
import QrCodeModal from './QrCodeModal/QrCodeModal';
import { Overlay } from '../Reporting.styled';
import Label from '../../../shared/Label/Label';
import NestedMenu from '../../../shared/NestedMenu/NestedMenu';
import TablePagination from '../../../shared/Table/TablePagination/TablePagination';
import Select from '../../../shared/Select/Select';
import { AppDispatch, RootState } from '../../../../redux/store';
import { TicketItem } from '../../../../types/reporting/tickets';
import { getTicketsStat, sortTicketsStat } from '../../../../redux/actions/reporting.actions';
import { createEventsOptions, createSortByOptions } from './utils';

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

const ReportingTickets = () => {
  const dispatch = useDispatch<AppDispatch>();
  const ticketsData = useSelector((state: RootState) => state.reporting.tickets);
  const table = useSortingTable<TicketItem>(ticketsData.data, {
    totalCount: ticketsData.totalCount,
    totalPages: ticketsData.totalPages,
    pageSize: ticketsData.pageSize,
    currentPage: ticketsData.currentPage,
  });
  const {
    selected, handleSelectAllClick, handleClick, checkIsSelected,
  } = table.selection;
  const { handleRequestSort } = table.sorting;
  const {
    page, pagesCount, rowsPerPage,
  } = table.pagination;
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
    dispatch(sortTicketsStat({
      EventIds: value,
      GroupBy: filters.groupBy ?? '',
      page: ticketsData.currentPage,
      pageSize: ticketsData.pageSize,
    }));
  };

  const handleSelectFilters = (e) => {
    setSelectedFilters((currentFilters) => ({
      ...currentFilters,
      groupBy: e.target.value,
    }));
    dispatch(sortTicketsStat({
      EventIds: filters.event?.value ?? '',
      GroupBy: e.target.value,
      page: ticketsData.currentPage,
      pageSize: ticketsData.pageSize,
    }));
  };

  const handleEventChange = (e) => handleChooseEvent(e);
  const handleGroupByChange = (e) => handleSelectFilters(e);

  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  const handleClose = (e: SyntheticEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (!target.className.length) return;

    if (target.className.includes('overlay')) {
      toggleOpen();
    }
  };

  const changePage = (e: ChangeEvent, newPage?: number) => {
    e.preventDefault();
    dispatch(
      getTicketsStat({
        page: newPage,
        pageSize: rowsPerPage,
      }),
    );
  };

  const changeRowsPerPage = (e: SelectChangeEvent<unknown>) => {
    dispatch(
      getTicketsStat({
        page: 1,
        pageSize: parseInt((e.target as HTMLSelectElement).value, 10),
      }),
    );
  };

  const eventOptions = useMemo(
    () => createEventsOptions(ticketsData?.filters?.year ?? {}),
    [ticketsData?.filters?.year],
  );

  const groupByOptions = useMemo(
    () => createSortByOptions(ticketsData?.filters?.filters ?? []),
    [ticketsData?.filters?.filters],
  );

  // to do
  // actions
  // sorting
  // table copy
  // search

  // needs first, lastname, order id, booking info, winningData, date rename to scanDate,
  // ticket should be blob, not link

  return (
    <Wrapper>
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
            <strong>{`${ticketsData.totalCount} `}</strong>
            {`${ticketsData.totalCount === 0 || ticketsData.totalCount > 1 ? 'Tickets' : 'Ticket'}`}
          </p>
        </TableCaption>
        <TableWrapper>
          <TableContainer>
            <Table sx={{ minWidth: 320 }} aria-labelledby="tableTitle" size="small">
              <Head
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                cells={headCells}
                className="table-head"
              />
              <TableBody>
                {table.visibleRows.map((row, index) => {
                  const isItemSelected = checkIsSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

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
                      <TableCell className="first-name">
                        <p>{row.firstName}</p>
                      </TableCell>
                      <TableCell className="last-name">
                        <p>{row.lastName}</p>
                      </TableCell>
                      <TableCell className="product-name">
                        <p>{row.product}</p>
                      </TableCell>
                      <TableCell className="order-id">
                        <p>{row.orderId}</p>
                      </TableCell>
                      <TableCell className="ticket-id">
                        <p>{row.ticketNumber}</p>
                      </TableCell>
                      <TableCell className="booking-info">
                        <p>{row.bookingInfo}</p>
                      </TableCell>
                      <TableCell className="winning-prize">
                        <p>{row.winningPrize}</p>
                      </TableCell>
                      <TableCell className="scan-date">
                        <p>{row.scanDate}</p>
                      </TableCell>
                      <TableCell className="actions">
                        <ActionsMenu options={actionsOptions} />
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
        {open
          ? createPortal(
            <Overlay onClick={handleClose} className="overlay">
              <QrCodeModal />
            </Overlay>,
            document.body,
          )
          : null}
      </TableContent>
    </Wrapper>
  );
};

export default ReportingTickets;
