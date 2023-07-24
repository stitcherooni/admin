import React, { SyntheticEvent, useState } from 'react';
import TableContainer from '@mui/material/TableContainer/TableContainer';
import Table from '@mui/material/Table/Table';
import TableBody from '@mui/material/TableBody/TableBody';
import { createPortal } from 'react-dom';
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
  actionsOptions, eventOptions, groupByOptions, headCells, menuActionsOptions, rows,
} from './table-data';
import ActionsMenu from '../../../shared/ActionsMenu/ActionsMenu';
import QrCodeModal from './QrCodeModal/QrCodeModal';
import { Overlay } from '../Reporting.styled';
import Label from '../../../shared/Label/Label';
import NestedMenu from '../../../shared/NestedMenu/NestedMenu';
import TablePagination from '../../../shared/Table/TablePagination/TablePagination';
import Select from '../../../shared/Select/Select';

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
  const table = useSortingTable(rows);
  const {
    selected, handleSelectAllClick, handleClick, checkIsSelected,
  } = table.selection;
  const { handleRequestSort } = table.sorting;
  const {
    page, pagesCount, rowsPerPage, handleChangePage, handleChangeRowsPerPage,
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
  };

  const handleSelectFilters = (e) => {
    setSelectedFilters((currentFilters) => ({
      ...currentFilters,
      groupBy: e.target.value,
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

  // to do
  // actions
  // sorting
  // table copy
  // search

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
            <strong>{rows.length}</strong>
            {' '}
            Tickets
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
                      key={row.id}
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
                        <p>{row['row-id']}</p>
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
                        <p>{row.ticketId}</p>
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
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
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
