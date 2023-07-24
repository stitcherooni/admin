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
} from './ReportingBooking.styled';
import {
  Row,
  StyledCheckbox,
  StyledTableWrapper,
  TableWrapper,
} from '../../../shared/Table/Table.styled';
import { useSortingTable } from '../../../shared/Table/utils';
import {
  eventOptions, groupByOptions, headCells, menuActionsOptions,
  productsOptions, rows, tableActionsOptions,
} from './table-data';
import { Overlay } from '../Reporting.styled';
import ActionsMenu from '../../../shared/ActionsMenu/ActionsMenu';
import BookingEditModal from './BookingEditModal/BookingEditModal';
import QflowModal from '../QflowModal/QflowModal';
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
  product?: string;
  groupBy?: string;
}

const ReportingBooking = () => {
  const table = useSortingTable(rows);
  const {
    selected, handleSelectAllClick, handleClick, checkIsSelected,
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

  const [openQflowModal, setQflowModalOpen] = useState(false);

  const toggleOpenQflowModal = () => setQflowModalOpen(!openQflowModal);

  const handleCloseQflowModal = (e: SyntheticEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (!target.className.length) return;

    if (target.className.includes('overlay')) {
      toggleOpenQflowModal();
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
      label: '',
      year: '',
    },
    product: '',
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

  const handleSelectFilters = (e, type: string) => {
    setSelectedFilters((currentFilters) => ({
      ...currentFilters,
      [type]: e.target.value,
    }));
  };

  const handleEventChange = (e) => handleChooseEvent(e);
  const handleProductChange = (e) => handleSelectFilters(e, 'product');
  const handleGroupByChange = (e) => handleSelectFilters(e, 'groupBy');

  // add button 'show test bookings'
  // add logic for column sorting
  // add logic for table customization
  // add logic for table copy
  // add tinymce integration
  // add 'select random' button

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
            <strong>32</strong>
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
                      <TableCell className="booking-name">
                        <p>{row.bookingName}</p>
                      </TableCell>
                      <TableCell className="class">
                        <p>{row.class}</p>
                      </TableCell>
                      <TableCell className="booking-info">
                        <p>{row.bookingInfo}</p>
                      </TableCell>
                      <TableCell className="sku">
                        <p>{row.sku}</p>
                      </TableCell>
                      <TableCell className="product">
                        <p>{row.product}</p>
                      </TableCell>
                      <TableCell className="price">
                        <p>{`${row.currency}${row.price}`}</p>
                      </TableCell>
                      <TableCell className="quantity">
                        <p>{row.quantity}</p>
                      </TableCell>
                      <TableCell className="order-id">
                        <p>{row.orderId}</p>
                      </TableCell>
                      <TableCell className="order-date">
                        <p>{row.orderDate}</p>
                      </TableCell>
                      <TableCell className="booked-by">
                        <p>{row.bookedBy}</p>
                      </TableCell>
                      <TableCell className="phone">
                        <p>{row.phone}</p>
                      </TableCell>
                      <TableCell className="email">
                        <p>{row.email}</p>
                      </TableCell>
                      <TableCell className="payment-method">
                        <p>{row.paymentMethod}</p>
                      </TableCell>
                      <TableCell className="actions">
                        <ActionsMenu options={tableActionsOptions} />
                      </TableCell>
                    </Row>
                  );
                })}
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
            <BookingEditModal />
          </Overlay>,
          document.body,
        )
        : null}
      {openQflowModal
        ? createPortal(
          <Overlay onClick={handleCloseQflowModal} className="overlay">
            <QflowModal />
          </Overlay>,
          document.body,
        )
        : null}
    </Wrapper>
  );
};

export default ReportingBooking;
