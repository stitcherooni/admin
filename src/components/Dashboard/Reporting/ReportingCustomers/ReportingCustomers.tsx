import React, {
  ChangeEvent, SyntheticEvent, useMemo, useState,
} from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SelectChangeEvent } from '@mui/material/Select';
import dayjs from 'dayjs';
import {
  TableCell, TableContent, Head, Wrapper,
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
import {
  actionsOptions, headCells, menuActionsOptions, rows,
} from './table-data';
import { Overlay, StyledDrawer } from '../Reporting.styled';
import ActionsMenu from '../../../shared/ActionsMenu/ActionsMenu';
import DrawerOverlay from '../DrawerOverlay/DrawerOverlay';
import FilteringReportingCustomersModal from './FIlteringReportingCustomersModal/FIlteringReportingOrdersModal';
import DeleteConfirmationModal from '../../../shared/Modals/DeleteConfirmationModal/DeleteConfirmationModal';
import TablePagination from '../../../shared/Table/TablePagination/TablePagination';
import ApproveCustomerModal from './ApproveCustomerModal/ApproveCustomerModal';
import DeleteCustomerModal from './DeleteCustomerModal/DeleteCustomerModal';
import StatisticBar from '../StatisticBar/StatisticBar';
import { AppDispatch, RootState } from '../../../../redux/store';
import { getCustomersStat } from '../../../../redux/actions/reporting.actions';
import { getCurrencyByCode } from '../../../../utils/currency';
import { handleCloseModal } from '../ReportingBooking/utils';
import { CustomerStatItem } from '../../../../types/reporting/customers';

const ReportingCustomers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const customersData = useSelector((state: RootState) => state.reporting.customers);
  const table = useSortingTable<CustomerStatItem>(customersData.data, {
    totalCount: customersData.totalCount,
    totalPages: customersData.totalPages,
    pageSize: customersData.pageSize,
    currentPage: customersData.currentPage,
    columns: headCells,
  });
  const {
    selected, handleSelectAllClick, checkIsSelected, handleClick,
  } = table.selection;
  const { handleRequestSort } = table.sorting;
  const { page, pagesCount, rowsPerPage } = table.pagination;

  const changePage = (e: ChangeEvent, newPage?: number) => {
    e.preventDefault();
    dispatch(
      getCustomersStat({
        page: newPage,
        pageSize: rowsPerPage,
      }),
    );
  };

  const changeRowsPerPage = (e: SelectChangeEvent<unknown>) => {
    dispatch(
      getCustomersStat({
        page: 1,
        pageSize: parseInt((e.target as HTMLSelectElement).value, 10),
      }),
    );
  };

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const toggleOpenDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

  const handleCloseDeletePopup = (e: SyntheticEvent<HTMLDivElement>) => {
    handleCloseModal(e, toggleOpenDeleteModal);
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

  const [filteringDrawerOpen, setFilteringDrawerOpen] = useState(false);
  const handleFilteringDrawer = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // close just if click by overlay
    if (filteringDrawerOpen && ![...e.currentTarget.classList].includes('MuiBackdrop-root')) return;
    setFilteringDrawerOpen(!filteringDrawerOpen);
  };

  const statistic = useMemo(() => [
    {
      label: 'Total Customers:',
      value: 'n/a',
    },
    {
      label: 'Total Orders:',
      value: customersData.totalOrdersNumber,
    },
    {
      label: 'Total Order Value:',
      value: `${getCurrencyByCode(customersData.totalOrderValue.currency)}${customersData.totalOrderValue.amount}`,
    },
  ], [customersData.totalOrderValue, customersData.totalOrdersNumber]);

  // to do
  // actions (approve, remove, tinymce integration)
  // sorting
  // table copy
  // search

  // needs fields: approved, currency
  // need separate value for total customers count

  return (
    <Wrapper>
      <StatisticBar data={statistic} />
      <TableContent>
        <TableCaption>
          <p>
            <strong>{`${customersData.totalCount} `}</strong>
            {`${
              customersData.totalCount === 0 || customersData.totalCount > 1
                ? 'Customers'
                : 'Customer'
            }`}
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
                  // const isItemSelected = checkIsSelected(row.id);
                  // const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <Row
                      // hover
                      // onClick={(event) => handleClick(event, row.id)}
                      // role="checkbox"
                      // aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      // selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      {/* <TableCell className="checkbox">
                        <StyledCheckbox
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                          size="small"
                        />
                      </TableCell> */}
                      <TableCell className="row-id">
                        <p>{row.num}</p>
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
                        <p>{dayjs(row.date).format('DD/MM/YYYY HH:MM')}</p>
                      </TableCell>
                      <TableCell className="approved">
                        <SecondaryButton>{(row as any).approved ? 'Yes' : 'No'}</SecondaryButton>
                      </TableCell>
                      <TableCell className="orders">
                        <p>{row.orders}</p>
                      </TableCell>
                      <TableCell className="order-value">
                        <p>{`${getCurrencyByCode(row.value.currency)}${row.value.amount}`}</p>
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
            handleChangePage={changePage}
            handleChangeRowsPerPage={changeRowsPerPage}
            page={page}
            pagesCount={pagesCount}
            rowsPerPage={rowsPerPage}
            options={[5, 10, 25]}
          />
        </TableWrapper>
      </TableContent>
      {openDeleteModal
        ? createPortal(
          <Overlay onClick={handleCloseDeletePopup} className="overlay">
            <DeleteConfirmationModal
              confirm={console.log}
              cancel={() => handleCloseDeletePopup}
              confirmButtonName="Yes - Delete"
              cancelButtonName="No - Cancel"
            >
              <DeleteCustomerModal />
            </DeleteConfirmationModal>
          </Overlay>,
          document.body,
        )
        : null}
      {/* {openApprovalModal
        ? createPortal(
          <Overlay onClick={handleCloseApprovalModal} className="overlay">
            <DeleteConfirmationModal
              confirm={console.log}
              cancel={handleCloseApprovalModal}
              confirmButtonName={'Approve' ?? 'Unapprove'}
              cancelButtonName="Cancel"
            >
              <ApproveCustomerModal type={'approve' ?? 'unapprove'} />
            </DeleteConfirmationModal>
          </Overlay>,
          document.body,
        )
        : null} */}
      <StyledDrawer anchor="right" open={filteringDrawerOpen} onClose={handleFilteringDrawer}>
        <DrawerOverlay handleClick={handleFilteringDrawer} handleKeydown={handleFilteringDrawer}>
          <FilteringReportingCustomersModal />
        </DrawerOverlay>
      </StyledDrawer>
    </Wrapper>
  );
};

export default ReportingCustomers;
