import React, { SyntheticEvent, useMemo, useState } from 'react';
import TableContainer from '@mui/material/TableContainer/TableContainer';
import Table from '@mui/material/Table/Table';
import TableBody from '@mui/material/TableBody/TableBody';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import {
  TableCell,
  TableContent,
  Head,
  Wrapper,
} from './ReportingCustomers.styled';
import {
  Row,
  SearchBarWrapper,
  StyledCheckbox,
  TableCaption,
  TableWrapper,
} from '../../../shared/Table/Table.styled';
import { SecondaryButton } from '../../../shared/Buttons/Buttons.styled';
import { useSortingTable } from '../../../shared/Table/utils';
import { actionsOptions, headCells, menuActionsOptions, rows } from './table-data';
import { Overlay, StyledDrawer } from '../Reporting.styled';
import ActionsMenu from '../../../shared/ActionsMenu/ActionsMenu';
import DrawerOverlay from '../DrawerOverlay/DrawerOverlay';
import FilteringReportingCustomersModal from './FIlteringReportingCustomersModal/FIlteringReportingOrdersModal';
import DeleteConfirmationModal from '../../../shared/Modals/DeleteConfirmationModal/DeleteConfirmationModal';
import TablePagination from '../../../shared/Table/TablePagination/TablePagination';
import ApproveCustomerModal from './ApproveCustomerModal/ApproveCustomerModal';
import DeleteCustomerModal from './DeleteCustomerModal/DeleteCustomerModal';
import StatisticBar from '../StatisticBar/StatisticBar';

const data = [
  {
    label: 'Total Customers:',
    value: 47,
  },
  {
    label: 'Total Orders:',
    value: 14,
  },
  {
    label: 'Total Order Value:',
    value: '£2,224.98',
  },
];

const ReportingCustomers = () => {
  const table = useSortingTable(rows);
  const { selected, handleSelectAllClick, handleClick, checkIsSelected } = table.selection;
  const { handleRequestSort } = table.sorting;
  const { page, pagesCount, rowsPerPage, handleChangePage, handleChangeRowsPerPage } =
    table.pagination;

  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen(!open);

  const handleClose = (e: SyntheticEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (!target.className.length) return;

    if (target.className.includes('overlay')) {
      toggleOpen();
    }
  };

  const [openApprovalModal, setOpenApprovalModal] = useState(false);

  const toggleOpenApprovalModal = () => setOpenApprovalModal(!openApprovalModal);

  const handleCloseApprovalModal = (e: SyntheticEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (!target.className.length) return;

    if (target.className.includes('overlay')) {
      toggleOpenApprovalModal();
    }
  };

  const namesToDelete = useMemo(() => {
    const names: string[] = [];
    selected.forEach((id) => names.push(table.rowsListById[id].eventName));
    return names.join(', ');
  }, [selected, table.rowsListById]);

  const [filteringDrawerOpen, setFilteringDrawerOpen] = useState(false);
  const handleFilteringDrawer = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // close just if click by overlay
    if (filteringDrawerOpen && ![...e.currentTarget.classList].includes('MuiBackdrop-root')) return;
    setFilteringDrawerOpen(!filteringDrawerOpen);
  };

  // to do
  // actions (approve, remove, tinymce integration)
  // sorting
  // table copy
  // search

  return (
    <Wrapper>
      <StatisticBar data={data} />
      <TableContent>
        <TableCaption>
          <p>
            <strong>{rows.length}</strong> Customers
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
                        <Link to={`/dashboard/customers/${row.id}`}>{row.id}</Link>
                      </TableCell>
                      <TableCell className="first-name">
                        <p>{row.firstName}</p>
                      </TableCell>
                      <TableCell className="last-name">
                        <p>{row.lastName}</p>
                      </TableCell>
                      <TableCell className="date">
                        <p>{row.date}</p>
                      </TableCell>
                      <TableCell className="approved">
                        <SecondaryButton>{row.approved ? 'Yes' : 'No'}</SecondaryButton>
                      </TableCell>
                      <TableCell className="orders">
                        <p>{row.count}</p>
                      </TableCell>
                      <TableCell className="order-value">
                        <p>{`${row.currency}${row.amount}`}</p>
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
                confirm={console.log}
                cancel={console.log}
                confirmButtonName="Yes - Delete"
                cancelButtonName="No - Cancel"
              >
                <DeleteCustomerModal />
              </DeleteConfirmationModal>
            </Overlay>,
            document.body
          )
        : null}
      {openApprovalModal
        ? createPortal(
            <Overlay onClick={handleCloseApprovalModal} className="overlay">
              <DeleteConfirmationModal
                confirm={console.log}
                cancel={console.log}
                confirmButtonName={'Approve' ?? 'Unapprove'}
                cancelButtonName="Cancel"
              >
                <ApproveCustomerModal type={'approve' ?? 'unapprove'} />
              </DeleteConfirmationModal>
            </Overlay>,
            document.body,
          )
        : null}
      <StyledDrawer anchor="right" open={filteringDrawerOpen} onClose={handleFilteringDrawer}>
        <DrawerOverlay handleClick={handleFilteringDrawer} handleKeydown={handleFilteringDrawer}>
          <FilteringReportingCustomersModal />
        </DrawerOverlay>
      </StyledDrawer>
    </Wrapper>
  );
};

export default ReportingCustomers;
