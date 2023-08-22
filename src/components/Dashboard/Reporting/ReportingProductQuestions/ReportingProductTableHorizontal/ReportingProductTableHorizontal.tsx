import React, { ChangeEvent, useMemo } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SelectChangeEvent } from '@mui/material/Select';
import { TableCell, Head } from './ReportingProductTableHorizontal.styled';
import { Row, TableWrapper } from '../../../../shared/Table/Table.styled';
import { useSortingTable } from '../../../../shared/Table/utils';
import { headCells, rows, questions } from './table-data';
import TablePagination from '../../../../shared/Table/TablePagination/TablePagination';
import { convertQuestionsToColumns, createAnswersColumns, mergeColumns } from './helpers';
import { AppDispatch, RootState } from '../../../../../redux/store';
import { ProductQuestionHorizontal } from '../../../../../types/reporting/productQuestions';
import { getProductQuestionsStat } from '../../../../../redux/actions/reporting.actions';
import { getCurrencyByCode } from '../../../../../utils/currency';

const ReportingProductTableHorizontal = () => {
  const productQuestionsData = useSelector((state: RootState) => state.reporting.productQuestions);
  const convertedRows = useMemo(
    () => productQuestionsData.data.map((row) => {
      let newRow = { ...row };

      row.answers.forEach((item) => {
        newRow = { ...newRow, [`question${item.questionId}`]: item.answer };
      });
      return newRow;
    }),
    [productQuestionsData.data],
  );
  const table = useSortingTable<ProductQuestionHorizontal>(convertedRows, {
    totalCount: productQuestionsData.totalCount,
    totalPages: productQuestionsData.totalPages,
    pageSize: productQuestionsData.pageSize,
    currentPage: productQuestionsData.currentPage,
  });
  const { selected, handleSelectAllClick } = table.selection;
  const { handleRequestSort } = table.sorting;
  const {
    page, pagesCount, rowsPerPage,
  } = table.pagination;

  const dispatch = useDispatch<AppDispatch>();

  const changePage = (e: ChangeEvent, newPage?: number) => {
    e.preventDefault();
    dispatch(getProductQuestionsStat({
      page: newPage,
      pageSize: rowsPerPage,
    }));
  };

  const changeRowsPerPage = (e: SelectChangeEvent<unknown>) => {
    dispatch(getProductQuestionsStat({
      page: 1,
      pageSize: parseInt((e.target as HTMLSelectElement).value, 10),
    }));
  };

  return (
    <TableWrapper>
      <TableContainer>
        <Table sx={{ minWidth: 320 }} aria-labelledby="tableTitle" size="small">
          <Head
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            cells={mergeColumns(
              headCells,
              convertQuestionsToColumns(productQuestionsData.questions),
            ) as any}
            className="table-head"
            checkbox={false}
          />
          <TableBody>
            {table.visibleRows.map((row) => (
              <Row key={row.num}>
                <TableCell className="id">
                  <Link to={`/dashboard/reporting?reportType=orders&orderId=${row.orderId}`}>
                    {row.orderId}
                  </Link>
                </TableCell>
                <TableCell className="booking-name">
                  <p>{row.bookingName}</p>
                </TableCell>
                <TableCell className="class-name">
                  <p>{row.className}</p>
                </TableCell>
                <TableCell className="booked-for">
                  <Link to={`/dashboard/customers?customerId=${(row as any).customerId}`}>
                    {row.bookedFor}
                  </Link>
                </TableCell>
                <TableCell className="phone">
                  <p>{row.phone}</p>
                </TableCell>
                <TableCell className="email">
                  <p>{row.email}</p>
                </TableCell>
                <TableCell className="product-name">
                  <p>{row.product}</p>
                </TableCell>
                <TableCell className="price">
                  <p>{`${getCurrencyByCode((row as any).currency, row.price)}`}</p>
                </TableCell>
                <TableCell className="order-value">
                  <p>{`${getCurrencyByCode((row as any).currency, row.order)}`}</p>
                </TableCell>
                {row.answers.length ? createAnswersColumns([...row.answers]) : null}
                <TableCell className="terms">
                  <p>{row.terms ? 'Yes' : 'No'}</p>
                </TableCell>
              </Row>
            ))}
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

export default ReportingProductTableHorizontal;
