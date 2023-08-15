import React, { ChangeEvent } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { useDispatch } from 'react-redux';
import { SelectChangeEvent } from '@mui/material/Select';
import { useSortingTable } from '../../../../shared/Table/utils';
import { Row, TableWrapper } from '../../../../shared/Table/Table.styled';
import { TableCell, Head } from './ReportingTableProductOrderSales.styled';
import { headCells } from './table-data';
import TablePagination from '../../../../shared/Table/TablePagination/TablePagination';
import { ProductOrderCount } from '../../../../../types/reporting/sales';
import { AppDispatch } from '../../../../../redux/store';
import { getSalesStat } from '../../../../../redux/actions/reporting.actions';

interface ReportingTableProductOrderSalesProps extends ProductOrderCount {}

const ReportingTableProductOrderSales = (props: ReportingTableProductOrderSalesProps) => {
  const table = useSortingTable(props.data || [], {
    totalCount: props.totalCount,
    totalPages: props.totalPages,
    pageSize: props.pageSize,
    currentPage: props.currentPage,
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
            {table.visibleRows.map((row) => (
              <Row key={(row as any).num}>
                <TableCell className="percentage">
                  <p>{`${row.percentage}%`}</p>
                </TableCell>
                <TableCell className="quantity">
                  <p>{row.noOfOrder}</p>
                </TableCell>
                <TableCell className="product-count">
                  <p>{row.productCount}</p>
                </TableCell>
              </Row>
            ))}
            <Row>
              <TableCell className="percentage">
                <strong>{`${props.totalPercentage}%`}</strong>
              </TableCell>
              <TableCell className="quantity">
                <strong>{props.totalOrders}</strong>
              </TableCell>
              <TableCell className="product-count">
                <strong>{props.totalProductCount}</strong>
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

export default ReportingTableProductOrderSales;
