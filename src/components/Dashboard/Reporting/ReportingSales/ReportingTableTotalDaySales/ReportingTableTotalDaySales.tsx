import React, { ChangeEvent } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { useDispatch, useSelector } from 'react-redux';
import { SelectChangeEvent } from '@mui/material/Select';
import dayjs from 'dayjs';
import { useSortingTable } from '../../../../shared/Table/utils';
import { Row, TableWrapper } from '../../../../shared/Table/Table.styled';
import { TableCell, Head } from './ReportingTableTotalDaySales.styled';
import { headCells } from './table-data';
import TablePagination from '../../../../shared/Table/TablePagination/TablePagination';
import { AppDispatch, RootState } from '../../../../../redux/store';
import { getSalesStat } from '../../../../../redux/actions/reporting.actions';
import { getCurrencyByCode } from '../../../../../utils/currency';

const ReportingTableTotalDaySales = () => {
  const salesData = useSelector((state: RootState) => state.reporting.sales);
  const table = useSortingTable(salesData.data?.totalSoldByDay?.data || [], {
    totalCount: salesData.data?.totalSoldByDay?.totalCount,
    totalPages: salesData.data?.totalSoldByDay?.totalPages,
    pageSize: salesData.data?.totalSoldByDay?.pageSize,
    currentPage: salesData.data?.totalSoldByDay?.currentPage,
    columns: headCells,
  });
  const {
    page, pagesCount, rowsPerPage,
  } = table.pagination;
  const dispatch = useDispatch<AppDispatch>();

  const changePage = (e: ChangeEvent, newPage?: number) => {
    e.preventDefault();
    dispatch(
      getSalesStat({
        page: newPage,
        pageSize: rowsPerPage,
      }),
    );
  };

  const changeRowsPerPage = (e: SelectChangeEvent<unknown>) => {
    dispatch(
      getSalesStat({
        page: 1,
        pageSize: parseInt((e.target as HTMLSelectElement).value, 10),
      }),
    );
  };

  return (
    <TableWrapper>
      <TableContainer>
        <Table sx={{ minWidth: 320 }} aria-labelledby="tableTitle" size="small">
          <Head cells={headCells} className="table-head" />
          <TableBody>
            {table.visibleRows.map((row: any) => (
              <Row key={row.num}>
                <TableCell className="date">
                  <p>{dayjs(row.date).format('DD/MM/YYYY HH:mm')}</p>
                </TableCell>
                <TableCell className="quantity">
                  <p>{row.quantity}</p>
                </TableCell>
                <TableCell className="quantity-to-date">
                  <p>{row.quantityToDate}</p>
                </TableCell>
                <TableCell className="total-sales">
                  <p>{`${getCurrencyByCode(salesData.currency)}${row.totalSales}`}</p>
                </TableCell>
                <TableCell className="sales-to-date">
                  <p>{`${getCurrencyByCode(salesData.currency)}${row.toDate}`}</p>
                </TableCell>
              </Row>
            ))}
            <Row>
              <TableCell className="date" />
              <TableCell className="quantity">
                <strong>{salesData.data?.totalSoldByDay?.totalQuantity}</strong>
              </TableCell>
              <TableCell className="quantity-to-date">
                <strong>{salesData.data?.totalSoldByDay?.totalQuantityToDate}</strong>
              </TableCell>
              <TableCell className="total-sales">
                <strong>{`${getCurrencyByCode(salesData.currency)}${salesData.data?.totalSoldByDay?.totalSales}`}</strong>
              </TableCell>
              <TableCell className="sales-to-date">
                <strong>{`${getCurrencyByCode(salesData.currency)}${salesData.data?.totalSoldByDay?.totalSalesToDate}`}</strong>
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
  );
};

export default ReportingTableTotalDaySales;
