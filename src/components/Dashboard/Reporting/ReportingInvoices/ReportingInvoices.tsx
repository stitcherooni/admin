import React, { SyntheticEvent, useMemo, useState } from 'react';
import Table from '@mui/material/Table/Table';
import TableBody from '@mui/material/TableBody/TableBody';
import { createPortal } from 'react-dom';
import {
  StyledAlert,
  TableCaption,
  TableCell,
  TableContent,
  Head,
  Wrapper,
} from './ReportingInvoices.styled';
import {
  Row,
  StyledTableWrapper,
  TableWrapper,
} from '../../../shared/Table/Table.styled';
import { useSortingTable } from '../../../shared/Table/utils';
import { headCells, rows } from './table-data';
import { Overlay } from '../Reporting.styled';
import DeleteConfirmationModal from '../../../shared/Modals/DeleteConfirmationModal/DeleteConfirmationModal';
import TablePagination from '../../../shared/Table/TablePagination/TablePagination';

const ReportingInvoices = () => {
  const table = useSortingTable(rows);
  const {
    selected, handleSelectAllClick,
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

  return (
    <Wrapper>
      <StyledAlert type="warning" className="invoices-alert">
        <p>
          Our humblest apologies as these invoices should have been
          automatically emailed to you at the point of
          creation but due to a technical issue,
          they weren’t being sent. We’ve therefore made them available online.
          These invoices are for all platform fees as well as Qflow and premium subscriptions.
          Invoices for platform fees taken via Stripe are issued weekly
          on a Monday in line with our rolling seven day payout schedule.
        </p>
      </StyledAlert>
      <TableContent>
        <TableCaption>
          <p>
            <strong>{rows.length}</strong>
            {` ${rows.length === 0 || rows.length > 1 ? 'Entries' : 'Entry'}`}
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
                {table.visibleRows.map((row) => (
                  <Row
                    key={row.id}
                  >
                    <TableCell className="invoice-no">
                      <p>{row.invoiceNo}</p>
                    </TableCell>
                    <TableCell className="issue-date">
                      <p>{row.issueDate}</p>
                    </TableCell>
                    <TableCell className="due-date">
                      <p>{row.dueDate}</p>
                    </TableCell>
                    <TableCell className="status">
                      <p>{row.status}</p>
                    </TableCell>
                    <TableCell className="net">
                      <p>{`${row.currency}${row.net}`}</p>
                    </TableCell>
                    <TableCell className="vat">
                      <p>{`${row.currency}${row.vat}`}</p>
                    </TableCell>
                    <TableCell className="total">
                      <p>{`${row.currency}${row.total}`}</p>
                    </TableCell>
                    <TableCell className="invoice">
                      <a href={row.invoice} target="_blank" rel="noreferrer">View</a>
                    </TableCell>
                  </Row>
                ))}
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
            <DeleteConfirmationModal
              deleteItemName={namesToDelete}
              confirm={console.log}
              cancel={console.log}
            />
          </Overlay>,
          document.body,
        )
        : null}
    </Wrapper>
  );
};

export default ReportingInvoices;
