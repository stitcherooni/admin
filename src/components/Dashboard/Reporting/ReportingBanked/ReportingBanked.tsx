import React, { useMemo, useState, ChangeEvent } from 'react';
import TableContainer from '@mui/material/TableContainer/TableContainer';
import Table from '@mui/material/Table/Table';
import TableBody from '@mui/material/TableBody/TableBody';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { SelectChangeEvent } from '@mui/material/Select/Select';
import {
  TableCell, TableContent, Head, Wrapper, StyledAlert,
} from './ReportingBanked.styled';
import {
  Row,
  SearchBarWrapper,
  TableCaption,
  TableWrapper,
} from '../../../shared/Table/Table.styled';
import { useSortingTable } from '../../../shared/Table/utils';
import { actionsOptions, headCells, rows } from './table-data';
import TablePagination from '../../../shared/Table/TablePagination/TablePagination';
import StatisticBar from '../StatisticBar/StatisticBar';
import ActionsMenu from '../../../shared/ActionsMenu/ActionsMenu';
import { AppDispatch, RootState } from '../../../../redux/store';
import { BankedItem } from '../../../../types/reporting/banked';
import { getCurrencyByCode } from '../../../../utils/currency';
import { Order } from '../../../../types/reporting/orders';
import { StyledDrawer } from '../Reporting.styled';
import DrawerOverlay from '../DrawerOverlay/DrawerOverlay';
import OrderDetails from '../ReportingOrders/OrderDetails/OrderDetails';
import { getBankedStat } from '../../../../redux/actions/reporting.actions';

const ReportingBanked = () => {
  const dispatch = useDispatch<AppDispatch>();
  const bankedData = useSelector((state: RootState) => state.reporting.banked);
  const table = useSortingTable<BankedItem>(bankedData.data ?? [], {
    totalCount: bankedData.totalCount,
    totalPages: bankedData.totalPages,
    pageSize: bankedData.pageSize,
    currentPage: bankedData.currentPage,
  });
  const { selected, handleSelectAllClick } = table.selection;
  const { handleRequestSort } = table.sorting;
  const {
    page, pagesCount, rowsPerPage,
  } = table.pagination;

  const changePage = (e: ChangeEvent, newPage?: number) => {
    e.preventDefault();
    dispatch(getBankedStat({
      page: newPage,
      pageSize: rowsPerPage,
    }));
  };

  const changeRowsPerPage = (e: SelectChangeEvent<unknown>) => {
    dispatch(getBankedStat({
      page: 1,
      pageSize: parseInt((e.target as HTMLSelectElement).value, 10),
    }));
  };

  const {
    totalOrdersCount, totalSalesAmount, totalBankedFee, totalPlatformFees,
  } = bankedData;
  const bankedStatisticData = useMemo(
    () => [
      {
        label: 'No of Orders:',
        value: totalOrdersCount,
      },
      {
        label: 'Total:',
        value: `${getCurrencyByCode(totalSalesAmount.currency)}${totalSalesAmount.amount}`,
      },
      {
        label: 'Banked Fee:',
        value: `${getCurrencyByCode(totalBankedFee.currency)}${totalBankedFee.amount}`,
      },
      {
        label: 'Platform Fee:',
        value: `${getCurrencyByCode(totalPlatformFees.currency)}${totalPlatformFees.amount}`,
      },
    ],
    [totalOrdersCount, totalSalesAmount, totalBankedFee, totalPlatformFees],
  );

  const [orderDetails, setOrderDetails] = useState<Order | null>(null);

  const [orderDetailOpen, setOrderDetailOpen] = useState(false);
  const handleOrderDetailDrawer = (e: React.SyntheticEvent, order: Order | null = null) => {
    e.preventDefault();
    // close just if click by overlay
    if (orderDetailOpen && ![...e.currentTarget.classList].includes('MuiBackdrop-root')) return;
    setOrderDetailOpen(!orderDetailOpen);
    setOrderDetails(order);
  };

  const ids = useMemo(() => table.visibleRows.map((item) => item.order.transactionId), [table.visibleRows]);

  const [showTestTransactions, setShowTestTransactions] = useState(false);

  // to do
  // actions
  // sorting
  // table copy
  // search
  // add button 'show test transactions'

  // needs transactionId and currency
  // total values is it just for table?
  // needs refunded for order history

  return (
    <Wrapper>
      <StatisticBar data={bankedStatisticData} />
      {!showTestTransactions ? null : (
        <StyledAlert type="warning">
          Warning: You are viewing
          {' '}
          <strong>test</strong>
          {' '}
          Banked transactions
        </StyledAlert>
      )}
      <TableContent>
        <TableCaption>
          <p>
            <strong>{`${bankedData.totalCount} `}</strong>
            {`${bankedData.totalCount === 0 || bankedData.totalCount > 1 ? 'Entries' : 'Entry'}`}
          </p>
          <SearchBarWrapper className="search-wrapper">
            <ActionsMenu options={actionsOptions} />
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
                checkbox={false}
              />
              <TableBody>
                {table.visibleRows.map((row) => (
                  <Row key={row.num}>
                    <TableCell className="row-id">
                      <p>{row.num}</p>
                    </TableCell>
                    <TableCell className="order-id" onClick={(e) => handleOrderDetailDrawer(e, row.order)}>
                      <a>{row.orderId}</a>
                    </TableCell>
                    <TableCell className="transaction-id">
                      <p>{row.order.transactionId}</p>
                    </TableCell>
                    <TableCell className="transaction-status">
                      <p>{row.status}</p>
                    </TableCell>
                    <TableCell className="transaction-date">
                      <p>{dayjs(row.date).format('DD/MM/YYYY HH:MM')}</p>
                    </TableCell>
                    <TableCell className="transaction-value">
                      <p>{`${getCurrencyByCode('GBP')}${row.value}`}</p>
                    </TableCell>
                    <TableCell className="banked-fee">
                      <p>{`${getCurrencyByCode('GBP')}${row.bankedFee}`}</p>
                    </TableCell>
                    <TableCell className="platform-fee">
                      <p>{`${getCurrencyByCode('GBP')}${row.platformFee}`}</p>
                    </TableCell>
                  </Row>
                ))}
                <Row sx={{ cursor: 'pointer' }}>
                  <TableCell className="row-id" />
                  <TableCell className="order-id hidden" />
                  <TableCell className="transaction-id hidden" />
                  <TableCell className="transaction-status hidden" />
                  <TableCell className="transaction-date">
                    <strong>Total</strong>
                  </TableCell>
                  <TableCell className="transaction-value">
                    <strong>
                      {`${getCurrencyByCode('GBP')}${
                        bankedData.totalSalesAmount.amount
                      }`}

                    </strong>
                  </TableCell>
                  <TableCell className="banked-fee">
                    <strong>
                      {`${getCurrencyByCode('GBP')}${
                        bankedData.totalBankedFee.amount
                      }`}

                    </strong>
                  </TableCell>
                  <TableCell className="platform-fee">
                    <strong>
                      {`${getCurrencyByCode('GBP')}${
                        bankedData.totalPlatformFees.amount
                      }`}

                    </strong>
                  </TableCell>
                </Row>
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
        {!orderDetails ? null : (
          <StyledDrawer anchor="right" open={orderDetailOpen} onClose={(e) => handleOrderDetailDrawer(e, null)}>
            <DrawerOverlay
              handleClick={handleOrderDetailDrawer}
              handleKeydown={handleOrderDetailDrawer}
            >
              <OrderDetails data={orderDetails} needsActions={false} type="banked" />
            </DrawerOverlay>
          </StyledDrawer>
        )}
      </TableContent>
    </Wrapper>
  );
};

export default ReportingBanked;
