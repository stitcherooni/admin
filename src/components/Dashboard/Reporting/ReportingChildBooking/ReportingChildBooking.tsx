import React, { SyntheticEvent, useMemo, useState } from 'react';
import Table from '@mui/material/Table/Table';
import TableBody from '@mui/material/TableBody/TableBody';
import { createPortal } from 'react-dom';
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
} from './ReportingChildBooking.styled';
import {
  Row,
  StyledTableWrapper,
} from '../../../shared/Table/Table.styled';
import { useSortingTable } from '../../../shared/Table/utils';
import {
  eventOptions, groupByOptions, headCells, menuActionsOptions, rows,
} from './table-data';
import { Overlay } from '../Reporting.styled';
import Label from '../../../shared/Label/Label';
import NestedMenu from '../../../shared/NestedMenu/NestedMenu';
import DeleteConfirmationModal from '../../../shared/Modals/DeleteConfirmationModal/DeleteConfirmationModal';
import TablePagination from '../../../shared/Table/TablePagination/TablePagination';
import Select from '../../../shared/Select/Select';
import ActionsMenu from '../../../shared/ActionsMenu/ActionsMenu';

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
  const table = useSortingTable(rows);
  const {
    selected, handleSelectAllClick,
  } = table.selection;
  const { handleRequestSort } = table.sorting;
  const {
    page, pagesCount, rowsPerPage, handleChangePage, handleChangeRowsPerPage,
  } = table.pagination;

  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  const handleClose = (e: SyntheticEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (!target.className.length) return;

    if (target.className.includes('overlay')) {
      toggleOpen();
    }
  };

  const namesToDelete = useMemo(() => {
    const names: string[] = [];
    selected.forEach((id) => names.push(table.rowsListById[id].eventName));
    return names.join(', ');
  }, [selected, table.rowsListById]);

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
  };

  const handleSelectFilters = (e) => {
    setSelectedFilters((currentFilters) => ({
      ...currentFilters,
      groupBy: e.target.value,
    }));
  };

  const handleEventChange = (e) => handleChooseEvent(e);
  const handleGroupByChange = (e) => handleSelectFilters(e);

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
          <a href="#">See more information</a>
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
            <strong>{rows.length}</strong>
            {' '}
            Entries
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
                  <Row key={row.id}>
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
                      <p>{row.medical}</p>
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
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            pagesCount={pagesCount}
            rowsPerPage={rowsPerPage}
            options={[5, 10, 25]}
          />
        </TableWrapper>
      </TableContent>
      {open
        ? createPortal(
          <Overlay onClick={handleClose} className="overlay">
            <DeleteConfirmationModal
              deleteItemName={namesToDelete}
              confirm={console.log}
              cancel={console.log}
            />
          </Overlay>,
          document.body,
        )
        : null}
    </Wrapper>
  );
};

export default ReportingChildBooking;
