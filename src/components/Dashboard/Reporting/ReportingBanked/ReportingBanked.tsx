import React, {
  useMemo, useState, ChangeEvent, useRef,
} from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import { useDispatch, useSelector } from 'react-redux';
import { SelectChangeEvent } from '@mui/material/Select';
import {
  TableContent, Head, Wrapper, StyledAlert,
} from './ReportingBanked.styled';
import { SearchBarWrapper, TableCaption, TableWrapper } from '../../../shared/Table/Table.styled';
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
import ReportingBankedTableBody from './ReportingBankedTableBody';
import CustomizeTableColumnsPopup from '../../../shared/Table/CustomizeTableColumnsPopup/CustomizeTableColumnsPopup';

const ReportingBanked = () => {
  const dispatch = useDispatch<AppDispatch>();
  const bankedData = useSelector((state: RootState) => state.reporting.banked);
  const table = useSortingTable<BankedItem>(bankedData.data ?? [], {
    totalCount: bankedData.totalCount,
    totalPages: bankedData.totalPages,
    pageSize: bankedData.pageSize,
    currentPage: bankedData.currentPage,
    columns: headCells,
  });
  const { selected, handleSelectAllClick } = table.selection;
  const { handleRequestSort } = table.sorting;
  const { page, pagesCount, rowsPerPage } = table.pagination;
  const { columnsOptions, visibleColumns, updateColumnsOptions } = table.customization;

  const changePage = (e: ChangeEvent, newPage?: number) => {
    e.preventDefault();
    dispatch(
      getBankedStat({
        page: newPage,
        pageSize: rowsPerPage,
      }),
    );
  };

  const changeRowsPerPage = (e: SelectChangeEvent<unknown>) => {
    dispatch(
      getBankedStat({
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

  const [showTestTransactions, setShowTestTransactions] = useState(false);
  const actionsMenuRef = useRef(null);
  const [openCustomizeMenu, setOpenCustomizeMenu] = useState(false);
  const closeCustomizeMenu = () => {
    setOpenCustomizeMenu(false);
  };
  const actionsMenuOptions = useMemo(
    () => actionsOptions.map((item) => {
      switch (item.value) {
        case 'customize-view':
          return { ...item, handleClick: () => setOpenCustomizeMenu(true) };
        default:
          return item;
      }
    }),
    [actionsOptions],
  );

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
          <SearchBarWrapper className="search-wrapper" ref={actionsMenuRef}>
            <ActionsMenu options={actionsMenuOptions} />
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
                cells={visibleColumns ?? []}
                className="table-head"
                checkbox={false}
              />
              <ReportingBankedTableBody
                rows={table.visibleRows}
                handleOrderDetailDrawer={handleOrderDetailDrawer}
                columnsOptions={columnsOptions}
                currency={totalBankedFee.currency}
              />
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
          <StyledDrawer
            anchor="right"
            open={orderDetailOpen}
            onClose={(e) => handleOrderDetailDrawer(e as any, null)}
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
