import React, {
  SyntheticEvent, useMemo, useState,
} from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import {
  TableCell, TableContent, Head, Wrapper, RowButton,
} from './ReportingCustomers.styled';
import {
  Row,
  SearchBarWrapper,
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
import { CustomerStatItem } from '../../../../types/reporting/customers';
import { handleCloseModal } from '../../../../utils/modals';
import LoadingOverlay from '../../../shared/LoadingOverlay/LoadingOverlay';
import { EmailIcon } from '../ReportingEmailTracker/ReportingEmailDetails/ReportingEmailStepper/ReportingEmailStepper.styled';
import MessageIcon from '../../../../assets/icons/message-icon';
import DeleteIcon from '../../../../assets/icons/delete-icon';
import { theme } from '../../../../styles/defaultTheme';

const ReportingCustomers = () => {
  const customersData = useSelector((state: RootState) => state.reporting.customers);
  const table = useSortingTable<CustomerStatItem>(customersData.data, {
    columns: headCells,
    totalCount: customersData.data.length,
  });
  const { selected, handleSelectAllClick } = table.selection;
  const { handleRequestSort } = table.sorting;
  const {
    page, pagesCount, rowsPerPage, totalRows, handleChangePage, handleChangeRowsPerPage,
  } = table.pagination;

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

  const statistic = useMemo(
    () => [
      {
        label: 'Total Customers:',
        value: customersData.customersCount,
      },
      {
        label: 'Total Orders:',
        value: customersData.totalOrdersNumber,
      },
      {
        label: 'Total Order Value:',
        value: `${getCurrencyByCode(
          customersData.currency,
          !customersData.totalOrderValue ? 0 : customersData.totalOrderValue,
        )}`,
      },
    ],
    [customersData.totalOrderValue, customersData.totalOrdersNumber, customersData.customersCount],
  );

  // to do
  // actions (approve, remove, tinymce integration)
  // sorting
  // table copy
  // search

  // needs fields: approved, currency
  // need separate value for total customers count

  return customersData.status === 'loading' ? <LoadingOverlay /> : (
    <Wrapper>
      <StatisticBar data={statistic} />
      <TableContent>
        <TableCaption>
          <p>
            <strong>{`${totalRows} `}</strong>
            {`${
              totalRows === 0 || totalRows > 1
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
                checkbox={false}
              />
              <TableBody>
                {table.visibleRows.map((row) => (
                  <Row
                    tabIndex={-1}
                    key={row.id}
                  >
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
                      <p>{dayjs(row.date).format('DD/MM/YYYY HH:mm')}</p>
                    </TableCell>
                    <TableCell className="approved">
                      <RowButton>{(row as any).approved ? 'Yes' : 'No'}</RowButton>
                    </TableCell>
                    <TableCell className="orders">
                      <p>{row.orders}</p>
                    </TableCell>
                    <TableCell className="order-value">
                      <p>{`${getCurrencyByCode(customersData.currency, row.value)}`}</p>
                    </TableCell>
                    <TableCell className="send-email">
                      <RowButton startIcon={<MessageIcon color={theme.colors.main.green} />} />
                    </TableCell>
                    <TableCell className="delete-customer">
                      <RowButton startIcon={<DeleteIcon color={theme.colors.main.green} />} />
                    </TableCell>
                  </Row>
                ))}
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
