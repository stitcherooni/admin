import React, { SyntheticEvent, useMemo, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { createPortal } from 'react-dom';
import {
  Col,
  Filters,
  FiltersWrapper,
  SearchBarWrapper,
  TableCaption,
  TableCell,
  TableContent,
  TableFilters,
  Head,
  Wrapper,
} from './ReportingTreasurerByEvent.styled';
import {
  Row,
  StyledCheckbox,
  StyledTableWrapper,
  TableWrapper,
} from '../../../shared/Table/Table.styled';
import { useSortingTable } from '../../../shared/Table/utils';
import {
  eventOptions, groupByOptions, headCells, menuActionsOptions, rows,
} from './table-data';
import { Overlay } from '../Reporting.styled';
import HelpModal from './ReportingTreasurerByEventsModals/HelpModal/HelpModal';
import Label from '../../../shared/Label/Label';
import NestedMenu from '../../../shared/NestedMenu/NestedMenu';
import TablePagination from '../../../shared/Table/TablePagination/TablePagination';
import StatisticBar from '../StatisticBar/StatisticBar';
import Select from '../../../shared/Select/Select';
import ActionsMenu from '../../../shared/ActionsMenu/ActionsMenu';
import { getCurrencyByCode } from '../../../../utils/currency';

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

const ReportingTreasurerByEvent = () => {
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

  const [filters, setSelectedFilters] = useState<ReportingFilters>({
    event: {
      value: '',
      year: '',
      label: '',
    },
    groupBy: '',
  });
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
  };

  const handleSelectFilters = (e: any) => {
    setSelectedFilters((currentFilters) => ({
      ...currentFilters,
      groupBy: e.target.value,
    }));
  };

  const handleEventChange = (e: any) => handleChooseEvent(e);
  const handleGroupByChange = (e: any) => handleSelectFilters(e);

  // to do
  // show test orders
  // add Treasurer Help button

  return (
    <Wrapper>
      <StatisticBar data={data} />
      <Filters>
        <Label
          content={{
            title: '',
            text: '',
          }}
          text="Treasurer Selection"
          inputId="show"
        />
        <TableFilters>
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
          <SearchBarWrapper className="search-wrapper">
            <ActionsMenu options={menuActionsOptions} />
          </SearchBarWrapper>
        </TableFilters>
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
                checkbox={false}
              />
              <TableBody>
                {table.visibleRows.map((row, index) =>
                // const isItemSelected = checkIsSelected(row.id);
                // const labelId = `enhanced-table-checkbox-${index}`;

                  (
                    <Row
                      // hover
                      // onClick={(event) => handleClick(event, row.id)}
                      // role="checkbox"
                      // aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
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
                      <TableCell className="customer-address">
                        <p>{row.address}</p>
                      </TableCell>
                      <TableCell className="product">
                        <p>{row.product}</p>
                      </TableCell>
                      <TableCell className="type">
                        <p>{row.type}</p>
                      </TableCell>
                      <TableCell className="transaction-id">
                        <p>{row.transactionId}</p>
                      </TableCell>
                      <TableCell className="transaction-email">
                        <p>{row.transactionEmail}</p>
                      </TableCell>
                      <TableCell className="quantity">
                        <p>{row.order}</p>
                      </TableCell>
                      <TableCell className="line-price">
                        <p>{`${getCurrencyByCode(row.currency, row.value ?? 0)}`}</p>
                      </TableCell>
                      <TableCell className="gift-aid">
                        <p>{row.giftAid}</p>
                      </TableCell>
                      <TableCell className="refunded">
                        <p>{`${getCurrencyByCode(row.currency, row.refunded)}`}</p>
                      </TableCell>
                      <TableCell className="fee-not-paid">
                        <p>{`${getCurrencyByCode(row.currency, row.feeNotPaid)}`}</p>
                      </TableCell>
                      <TableCell className="fee-paid">
                        <p>{`${getCurrencyByCode(row.currency, row.feePaid)}`}</p>
                      </TableCell>
                      <TableCell className="platform-fees-not-paid">
                        <p>{`${getCurrencyByCode(row.currency, row.platformFeesNotPaid)}`}</p>
                      </TableCell>
                      <TableCell className="platform-fee-paid">
                        <p>{`${getCurrencyByCode(row.currency, row.platformFeePaid)}`}</p>
                      </TableCell>
                    </Row>
                  ))}
                <Row
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell className="row-id hidden" />
                  <TableCell className="id hidden" />
                  <TableCell className="date hidden" />
                  <TableCell className="customer-name hidden" />
                  <TableCell className="customer-address hidden" />
                  <TableCell className="product hidden" />
                  <TableCell className="type hidden" />
                  <TableCell className="transaction-id hidden" />
                  <TableCell className="transaction-email">
                    <strong>Total</strong>
                  </TableCell>
                  <TableCell className="quantity">
                    <p>0</p>
                  </TableCell>
                  <TableCell className="line-price">
                    <p>{getCurrencyByCode('GBP', 0)}</p>
                  </TableCell>
                  <TableCell className="gift-aid" />
                  <TableCell className="refunded">
                    <p>{getCurrencyByCode('GBP', 0)}</p>
                  </TableCell>
                  <TableCell className="fee-not-paid">
                    <p>{getCurrencyByCode('GBP', 0)}</p>
                  </TableCell>
                  <TableCell className="fee-paid">
                    <p>{getCurrencyByCode('GBP', 0)}</p>
                  </TableCell>
                  <TableCell className="platform-fees-not-paid">
                    <p>{getCurrencyByCode('GBP', 0)}</p>
                  </TableCell>
                  <TableCell className="platform-fee-paid">
                    <p>{getCurrencyByCode('GBP', 0)}</p>
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
            <HelpModal />
          </Overlay>,
          document.body,
        )
        : null}
    </Wrapper>
  );
};

export default ReportingTreasurerByEvent;
