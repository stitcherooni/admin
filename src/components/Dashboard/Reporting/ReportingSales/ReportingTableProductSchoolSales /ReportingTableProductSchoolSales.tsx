import React, { ChangeEvent } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { useDispatch } from 'react-redux';
import { SelectChangeEvent } from '@mui/material/Select';
import { useSortingTable } from '../../../../shared/Table/utils';
import { Row, TableWrapper } from '../../../../shared/Table/Table.styled';
import { TableCell, Head } from './ReportingTableProductSchoolSales.styled';
import { headCells } from './table-data';
import TablePagination from '../../../../shared/Table/TablePagination/TablePagination';
import { ProductSoldSchool } from '../../../../../types/reporting/sales';
import { AppDispatch } from '../../../../../redux/store';
import { getSalesStat } from '../../../../../redux/actions/reporting.actions';
import { getCurrencyByCode } from '../../../../../utils/currency';

interface ReportingTableProductSchoolSalesProps extends ProductSoldSchool {
  currency: string;
}

const ReportingTableProductSchoolSales = (props: ReportingTableProductSchoolSalesProps) => {
  const table = useSortingTable(props.data || [], {
    totalCount: props.totalCount,
    totalPages: props.totalPages,
    pageSize: props.pageSize,
    currentPage: props.currentPage,
  });
  const dispatch = useDispatch<AppDispatch>();
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
                <TableCell className="school-name">
                  <p>{row.schoolName}</p>
                </TableCell>
                <TableCell className="percentage">
                  <p>{`${row.percentage}%`}</p>
                </TableCell>
                <TableCell className="quantity">
                  <p>{row.quantity}</p>
                </TableCell>
                <TableCell className="total-sales">
                  <p>{`${getCurrencyByCode(props.currency)}${row.totalSales}`}</p>
                </TableCell>
              </Row>
            ))}
            <Row>
              <TableCell className="school-name" />
              <TableCell className="percentage">
                <strong>{`${props.totalPercentage}%`}</strong>
              </TableCell>
              <TableCell className="quantity">
                <strong>{props.totalQuantity}</strong>
              </TableCell>
              <TableCell className="total-sales">
                <strong>{`${getCurrencyByCode(props.currency)}${props.totalSales}`}</strong>
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

export default ReportingTableProductSchoolSales;
