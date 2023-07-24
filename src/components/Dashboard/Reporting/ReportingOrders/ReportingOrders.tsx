import React, { SyntheticEvent, useMemo, useState } from 'react';
import TableContainer from '@mui/material/TableContainer/TableContainer';
import Table from '@mui/material/Table/Table';
import TableBody from '@mui/material/TableBody/TableBody';
import { createPortal } from 'react-dom';
import {
  TableCell,
  TableContent,
  Head,
  Wrapper,
  OrderStatusBadge,
} from './ReportingOrders.styled';
import {
  Row,
  SearchBarWrapper,
  StyledCheckbox,
  TableCaption,
  TableWrapper,
} from '../../../shared/Table/Table.styled';
import { useSortingTable } from '../../../shared/Table/utils';
import { actionsOptions, headCells, menuActionsOptions, rows } from './table-data';
import { Overlay, StyledDrawer } from '../Reporting.styled';
import DrawerOverlay from '../DrawerOverlay/DrawerOverlay';
import OrderDetails from './OrderDetails/OrderDetails';
import { getOrderStatus } from './utils';
import ActionsMenu from '../../../shared/ActionsMenu/ActionsMenu';
import FilteringReportingOrdersModal from './FIlteringReportingOrdersModal/FIlteringReportingOrdersModal';
import DeleteConfirmationModal from '../../../shared/Modals/DeleteConfirmationModal/DeleteConfirmationModal';
import TablePagination from '../../../shared/Table/TablePagination/TablePagination';
import StatisticBar from '../StatisticBar/StatisticBar';

const data = [
  {
    label: 'Total Orders:',
    value: 47,
  },
  {
    label: 'Average Order Value:',
    value: '£38.99',
  },
  {
    label: 'Total Order Value:',
    value: '£2,224.98',
  },
  {
    label: 'Refunded:',
    value: '£22',
  },
];

const ReportingOrders = () => {
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

  const namesToDelete = useMemo(() => {
    const names: string[] = [];
    selected.forEach((id) => names.push(table.rowsListById[id].eventName));
    return names.join(', ');
  }, [selected, table.rowsListById]);

  const [helperDrawerOpen, setHelperDrawerOpen] = useState(false);
  const handleHelperDrawer = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // close just if click by overlay
    if (helperDrawerOpen && ![...e.currentTarget.classList].includes('MuiBackdrop-root')) return;
    setHelperDrawerOpen(!helperDrawerOpen);
  };

  const [filteringDrawerOpen, setFilteringDrawerOpen] = useState(false);
  const handleFilteringDrawer = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // close just if click by overlay
    if (filteringDrawerOpen && ![...e.currentTarget.classList].includes('MuiBackdrop-root')) return;
    setFilteringDrawerOpen(!filteringDrawerOpen);
  };

  // to do
  // actions
  // sorting
  // table copy
  // search

  return (
    <Wrapper>
      <StatisticBar data={data} />
      <TableContent>
        <TableCaption>
          <p>
            <strong>{rows.length}</strong>
            {' '}
            Customers
          </p>
          <SearchBarWrapper className="search-wrapper">
            <ActionsMenu options={menuActionsOptions} />
          </SearchBarWrapper>
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
                      <TableCell className="id">
                        <a href="/">{row.id}</a>
                      </TableCell>
                      <TableCell className="date">{row.date}</TableCell>
                      <TableCell className="status">
                        <OrderStatusBadge
                          className={`order-status ${getOrderStatus(row.status.toLowerCase())}`}
                        >
                          {row.status}
                        </OrderStatusBadge>
                      </TableCell>
                      <TableCell className="customer-name">
                        <p>{row.customerName}</p>
                      </TableCell>
                      <TableCell className="payment-method">{row.method}</TableCell>
                      <TableCell className="type">
                        <p>{row.type}</p>
                      </TableCell>
                      {/* <TableCell className="orders">
                        <p>{row.count}</p>
                      </TableCell> */}
                      <TableCell className="orders-value">
                        <p>{`${row.currency}${row.amount}`}</p>
                      </TableCell>
                      <TableCell className="platform-fee">
                        <p>{`${row.currency}${row.platformFee}`}</p>
                      </TableCell>
                      <TableCell className="refunded">
                        <p>{`${row.currency}${row.refunded}`}</p>
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
      <StyledDrawer anchor="right" open={helperDrawerOpen} onClose={handleHelperDrawer}>
        <DrawerOverlay handleClick={handleHelperDrawer} handleKeydown={handleHelperDrawer}>
          <OrderDetails />
        </DrawerOverlay>
      </StyledDrawer>
      <StyledDrawer anchor="right" open={filteringDrawerOpen} onClose={handleFilteringDrawer}>
        <DrawerOverlay handleClick={handleFilteringDrawer} handleKeydown={handleFilteringDrawer}>
          <FilteringReportingOrdersModal />
        </DrawerOverlay>
      </StyledDrawer>
    </Wrapper>
  );
};

export default ReportingOrders;
