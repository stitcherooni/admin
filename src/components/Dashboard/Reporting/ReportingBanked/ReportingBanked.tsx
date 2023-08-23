/* eslint-disable react/jsx-one-expression-per-line */
import React, {
  useMemo, useState, ChangeEvent, useRef,
} from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import { useDispatch, useSelector } from 'react-redux';
import { SelectChangeEvent } from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import {
  TableContent, Head, Wrapper, StyledAlert, StyledInput,
} from './ReportingBanked.styled';
import { SearchBarWrapper, TableCaption, TableWrapper } from '../../../shared/Table/Table.styled';
import { copyTable, useSortingTable } from '../../../shared/Table/utils';
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
import { getBankedStat, getBankedStatTest } from '../../../../redux/actions/reporting.actions';
import ReportingBankedTableBody from './ReportingBankedTableBody';
import CustomizeTableColumnsPopup from '../../../shared/Table/CustomizeTableColumnsPopup/CustomizeTableColumnsPopup';
import ZoomIconSmall from '../../../../assets/icons/zoom-icon-small';
import { downloadFile } from '../../../../utils/file';
import Alert from '../../../shared/Alert/Alert';
import {
  convertBankedItems,
  getAvailableColumns,
  getBankedItemsIds,
  getSortingOrdering,
} from './utils';
import LoadingOverlay from '../../../shared/LoadingOverlay/LoadingOverlay';
import { BankedInitialState } from '../../../../redux/slices/reporting/banked.slice';

const ReportingBanked = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showTestTransactions, setShowTestTransactions] = useState(false);
  const bankedData: BankedInitialState = useSelector((state: RootState) => state.reporting.banked);
  const table = useSortingTable<BankedItem>(
    !showTestTransactions ? bankedData?.data ?? [] : bankedData.testTransactions ?? [],
    {
      totalCount: bankedData.totalCount,
      totalPages: bankedData.totalPages,
      pageSize: bankedData.pageSize,
      currentPage: bankedData.currentPage,
      columns: headCells,
    },
    convertBankedItems,
  );
  const { selected, handleSelectAllClick } = table.selection;
  const { handleRequestSort } = table.sorting;
  const { page, pagesCount, rowsPerPage } = table.pagination;
  const { columnsOptions, visibleColumns, updateColumnsOptions } = table.customization;
  const { updateSearchText, isFound, isSearching } = table.search;

  const changePage = (e: ChangeEvent, newPage?: number) => {
    e.preventDefault();
    const fn = showTestTransactions ? getBankedStatTest : getBankedStat;
    dispatch(
      fn({
        page: newPage,
        pageSize: rowsPerPage,
      }),
    );
  };

  const changeRowsPerPage = (e: SelectChangeEvent<unknown>) => {
    const fn = showTestTransactions ? getBankedStatTest : getBankedStat;
    dispatch(
      fn({
        page: 1,
        pageSize: parseInt((e.target as HTMLSelectElement).value, 10),
      }),
    );
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
        value: `${getCurrencyByCode(totalSalesAmount?.currency, !totalSalesAmount?.amount ? 0 : totalSalesAmount.amount)}`,
      },
      {
        label: 'Banked Fee:',
        value: `${getCurrencyByCode(totalBankedFee?.currency, !totalBankedFee?.amount ? 0 : totalBankedFee.amount)}`,
      },
      {
        label: 'Platform Fee:',
        value: `${getCurrencyByCode(totalPlatformFees?.currency, !totalPlatformFees?.amount ? 0 : totalPlatformFees.amount)}`,
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
  const [error, setError] = useState<null | string>(null);
  const actionsMenuRef = useRef(null);
  const [openCustomizeMenu, setOpenCustomizeMenu] = useState(false);
  const closeCustomizeMenu = () => {
    setOpenCustomizeMenu(false);
  };
  const tableRef = useRef(null);
  const actionsMenuOptions = useMemo(
    () => actionsOptions.map((item) => {
      switch (item.value) {
        case 'customize-view':
          return { ...item, handleClick: () => setOpenCustomizeMenu(true) };
        case 'excel':
          return {
            ...item,
            handleClick: () => downloadFile(
              '/Report/bankedsexcel',
              'excel.xls',
              {
                ids: getBankedItemsIds(table.visibleRows),
                columns: getAvailableColumns(table.customization.visibleColumns),
                ordering: getSortingOrdering(
                  table.sorting.filters,
                  headCells,
                ), // objects, key - field name, value - asc | desc
              },
              setError,
            ),
          };
        case 'pdf':
          return {
            ...item,
            handleClick: () => downloadFile(
              '/Report/bankedspdf',
              'report.pdf',
              {
                ids: getBankedItemsIds(table.visibleRows),
                columns: getAvailableColumns(table.customization.visibleColumns),
                ordering: getSortingOrdering(
                  table.sorting.filters,
                  headCells,
                ), // objects, key - field name, value - asc | desc
              },
              setError,
            ),
          };
        case 'test-transactions':
          return {
            ...item,
            handleClick: () => {
              setShowTestTransactions(true);
              dispatch(getBankedStatTest({ page, pageSize: rowsPerPage }));
            },
          };
        case 'copy': {
          return {
            ...item,
            handleClick: () => copyTable(tableRef),
          };
        }
        default:
          return item;
      }
    }),
    [actionsOptions],
  );

  return bankedData.status === 'loading' ? (
    <LoadingOverlay />
  ) : (
    <Wrapper>
      {bankedData?.error ? <StyledAlert type="error">{process.env.NODE_ENV === 'development' ? bankedData?.error : 'Something went wrong'}</StyledAlert> : null}
      {!showTestTransactions ? null : (
        <StyledAlert type="warning" testid="test-transactions">
          Warning: You are viewing <strong>test</strong> Banked transactions
        </StyledAlert>
      )}
      {!table.visibleRows.length ? (
        <StyledAlert type="warning">There are no banked transactions</StyledAlert>
      ) : null}
      <StatisticBar data={bankedStatisticData} />
      <TableContent>
        {!error ? null : (
          <>
            <Alert type="error">{error}</Alert>
            <br />
          </>
        )}
        <TableCaption>
          <p>
            <strong>{`${bankedData.totalCount} `}</strong>
            {`${bankedData.totalCount === 0 || bankedData.totalCount > 1 ? 'Entries' : 'Entry'}`}
          </p>
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
        </TableCaption>
        <TableWrapper>
          <TableContainer>
            <Table sx={{ minWidth: 320 }} aria-labelledby="tableTitle" size="small" ref={tableRef}>
              <Head
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                cells={visibleColumns ?? []}
                className="table-head"
                checkbox={false}
              />
              <ReportingBankedTableBody
                rows={table.visibleRows}
                handleOrderDetailDrawer={handleOrderDetailDrawer}
                columnsOptions={columnsOptions}
                currency={bankedData?.currency}
                dataFound={isFound}
                isSearching={isSearching}
              />
            </Table>
          </TableContainer>
          {!table.visibleRows.length ? null : (
            <TablePagination
              handleChangePage={changePage}
              handleChangeRowsPerPage={changeRowsPerPage}
              page={page}
              pagesCount={pagesCount}
              rowsPerPage={rowsPerPage}
              options={[5, 10, 25]}
            />
          )}
        </TableWrapper>
        {!orderDetails ? null : (
          <StyledDrawer
            anchor="right"
            open={orderDetailOpen}
            onClose={(e) => handleOrderDetailDrawer(e as React.SyntheticEvent, null)}
          >
            <DrawerOverlay
              handleClick={handleOrderDetailDrawer}
              handleKeydown={handleOrderDetailDrawer}
            >
              <OrderDetails data={orderDetails} needsActions={false} type="banked" />
            </DrawerOverlay>
          </StyledDrawer>
        )}
        {actionsMenuRef.current && openCustomizeMenu ? (
          <CustomizeTableColumnsPopup
            anchorEl={actionsMenuRef.current}
            open={openCustomizeMenu}
            onClose={closeCustomizeMenu}
            options={columnsOptions}
            updatePopup={updateColumnsOptions}
          />
        ) : null}
      </TableContent>
    </Wrapper>
  );
};

export default ReportingBanked;
