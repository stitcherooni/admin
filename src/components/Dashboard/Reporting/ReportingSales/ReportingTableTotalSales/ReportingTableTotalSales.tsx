import React, { ChangeEvent } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { useDispatch, useSelector } from 'react-redux';
import { SelectChangeEvent } from '@mui/material/Select';
import { useSortingTable } from '../../../../shared/Table/utils';
import { Row, TableWrapper } from '../../../../shared/Table/Table.styled';
import { TableCell, Head } from './ReportingTableTotalSales.styled';
import { headCells } from './table-data';
import TablePagination from '../../../../shared/Table/TablePagination/TablePagination';
import { AppDispatch, RootState } from '../../../../../redux/store';
import { TotalSalesItem } from '../../../../../types/reporting/sales';
import { getCurrencyByCode } from '../../../../../utils/currency';
import { getSalesStat } from '../../../../../redux/actions/reporting.actions';

const ReportingTableTotalSales = () => {
  const salesData = useSelector((state: RootState) => state.reporting.sales);
  const dispatch = useDispatch<AppDispatch>();
  const table = useSortingTable<TotalSalesItem>(salesData?.data?.totalSales?.sales || [], {
    totalCount: salesData.data?.totalSales?.totalCount,
    totalPages: salesData.data?.totalSales?.totalPages,
    pageSize: salesData.data?.totalSales?.pageSize,
    currentPage: salesData.data?.totalSales?.currentPage,
    columns: headCells,
  });
  const {
    page, pagesCount, rowsPerPage,
  } = table.pagination;

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
            {table.visibleRows.map((row) => (
              <Row key={row.num}>
                <TableCell className="row-id">
                  <p>{row.num}</p>
                </TableCell>
                <TableCell className="product-name">
                  <p>{row.product}</p>
                </TableCell>
                <TableCell className="quantity">
                  <p>{row.quantity}</p>
                </TableCell>
                <TableCell className="target-quantity">
                  <p>{row.targetQuantity}</p>
                </TableCell>
                <TableCell className="difference">
                  <p>{row.difference}</p>
                </TableCell>
                <TableCell className="attaintment">
                  <p>{row.attaintment}</p>
                </TableCell>
                <TableCell className="total-sales">
                  <p>{`${getCurrencyByCode(salesData.currency)}${row.totalSales}`}</p>
                </TableCell>
              </Row>
            ))}
            <Row>
              <TableCell className="row-id" />
              <TableCell className="product-name">
                <p>Less booking fee:</p>
              </TableCell>
              <TableCell className="quantity accent">
                <p>{salesData.data?.totalSales?.totalQuantity}</p>
              </TableCell>
              <TableCell className="target-quantity" />
              <TableCell className="difference" />
              <TableCell className="attaintment" />
              <TableCell className="total-sales accent">
                <p>{`${getCurrencyByCode(salesData.currency)}${salesData.data?.totalSales?.totalSold}`}</p>
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

export default ReportingTableTotalSales;
