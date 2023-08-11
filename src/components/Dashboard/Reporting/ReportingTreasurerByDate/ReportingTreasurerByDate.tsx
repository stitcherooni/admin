import React, { SyntheticEvent, useMemo, useState } from 'react';
import Table from '@mui/material/Table/Table';
import TableBody from '@mui/material/TableBody/TableBody';
import { createPortal } from 'react-dom';
import {
  SearchBarWrapper,
  TableCaption,
  TableCell,
  TableContent,
  Head,
  Wrapper,
} from './ReportingTreasurerByDate.styled';
import {
  Row,
  StyledCheckbox,
  StyledTableWrapper,
  TableWrapper,
} from '../../../shared/Table/Table.styled';
import { useSortingTable } from '../../../shared/Table/utils';
import { headCells, menuActionsOptions, rows } from './table-data';
import { Overlay, StyledDrawer } from '../Reporting.styled';
import DrawerOverlay from '../DrawerOverlay/DrawerOverlay';
import FilteringReportingTreasurerDateModal from './FIlteringReportingTreasurerDateModal/FIlteringReportingTreasurerDateModal';
import DeleteConfirmationModal from '../../../shared/Modals/DeleteConfirmationModal/DeleteConfirmationModal';
import TablePagination from '../../../shared/Table/TablePagination/TablePagination';
import StatisticBar from '../StatisticBar/StatisticBar';
import ActionsMenu from '../../../shared/ActionsMenu/ActionsMenu';

const data = [
  {
    label: 'Total Sales:',
    value: '£42.98',
  },
  {
    label: 'Profit:',
    value: '£38.99',
  },
  {
    label: 'Processing Fees (not paid):',
    value: '£1.76 (£0.00)',
  },
  {
    label: 'Platform Fees (not paid):',
    value: '£1.76 (£0.00)',
  },
];

const ReportingTreasurerByDate = () => {
  const table = useSortingTable(rows);
  const { selected, handleSelectAllClick, handleClick, checkIsSelected } = table.selection;
  const { handleRequestSort } = table.sorting;
  const { page, pagesCount, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    table.pagination;

  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  const handleClose = (e: SyntheticEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (!target.className.length) return;

    if (target.className.includes('overlay')) {
      toggleOpen();
    }
  };

  const [filteringDrawerOpen, setFilteringDrawerOpen] = useState(false);
  const handleFilteringDrawer = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // close just if click by overlay
    if (filteringDrawerOpen && ![...e.currentTarget.classList].includes('MuiBackdrop-root')) return;
    setFilteringDrawerOpen(!filteringDrawerOpen);
  };

  return (
    <Wrapper>
      <StatisticBar data={data} />
      <TableContent>
        <TableCaption>
          <p>
            <strong>{rows.length}</strong> Entries
          </p>
          <SearchBarWrapper className="search-wrapper">
            <ActionsMenu options={menuActionsOptions} />
          </SearchBarWrapper>
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
                      <TableCell className="id">
                        <p>{row.id}</p>
                      </TableCell>
                      <TableCell className="date">
                        <p>{row.date}</p>
                      </TableCell>
                      <TableCell className="customer-name">
                        <p>{row.customerName}</p>
                      </TableCell>
                      <TableCell className="event-name">
                        <p>{row.eventName}</p>
                      </TableCell>
                      <TableCell className="product">
                        <p>{row.product}</p>
                      </TableCell>
                      <TableCell className="type">
                        <p>{row.type}</p>
                      </TableCell>
                      <TableCell className="paypal-id">
                        <p>{row.paypalId}</p>
                      </TableCell>
                      <TableCell className="paypal-email">
                        <p>{row.paypalEmail}</p>
                      </TableCell>
                      <TableCell className="quantity">
                        <p>{row.order}</p>
                      </TableCell>
                      <TableCell className="line-price">
                        <p>{`${row.currency}${row.value}`}</p>
                      </TableCell>
                      <TableCell className="gift-aid">
                        <p>{row.giftAid}</p>
                      </TableCell>
                      <TableCell className="refunded">
                        <p>{`${row.currency}${row.refunded}`}</p>
                      </TableCell>
                      <TableCell className="cost">
                        <p>{`${row.currency}${row.price}`}</p>
                      </TableCell>
                    </Row>
                  );
                })}
                <Row sx={{ cursor: 'pointer' }}>
                  <TableCell className="checkbox hidden" />
                  <TableCell className="row-id hidden" />
                  <TableCell className="id hidden" />
                  <TableCell className="date hidden" />
                  <TableCell className="customer-name hidden" />
                  <TableCell className="event-name hidden" />
                  <TableCell className="product hidden" />
                  <TableCell className="type hidden" />
                  <TableCell className="paypal-id hidden" />
                  <TableCell className="paypal-email hidden">
                    <strong>Total</strong>
                  </TableCell>
                  <TableCell className="quantity hidden">
                    <p>0</p>
                  </TableCell>
                  <TableCell className="line-price hidden">
                    <p>£0.00</p>
                  </TableCell>
                  <TableCell className="gift-aid hidden">
                    <p></p>
                  </TableCell>
                  <TableCell className="refunded hidden">
                    <p>£0.00</p>
                  </TableCell>
                  <TableCell className="cost hidden">
                    <p>£0.00</p>
                  </TableCell>
                </Row>
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
      <StyledDrawer anchor="right" open={filteringDrawerOpen} onClose={handleFilteringDrawer}>
        <DrawerOverlay handleClick={handleFilteringDrawer} handleKeydown={handleFilteringDrawer}>
          <FilteringReportingTreasurerDateModal />
        </DrawerOverlay>
      </StyledDrawer>
    </Wrapper>
  );
};

export default ReportingTreasurerByDate;
