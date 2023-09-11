import React, { SyntheticEvent, useMemo } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import { useDispatch, useSelector } from 'react-redux';
import { SelectChangeEvent } from '@mui/material';
import {
  Filters, FiltersWrapper,
  Col, SearchBarWrapper, StyledInput,
} from './ReportingBookingFilters.styled';
import Label from '../../../../shared/Label/Label';
import NestedMenu from '../../../../shared/NestedMenu/NestedMenu';
import Select from '../../../../shared/Select/Select';
import ZoomIconSmall from '../../../../../assets/icons/zoom-icon-small';
import ActionsMenu from '../../../../shared/ActionsMenu/ActionsMenu';
import { AppDispatch, RootState } from '../../../../../redux/store';
import { updateSelectedFilters } from '../../../../../redux/slices/reporting/bookings.slice';
import { sortBookingStat } from '../../../../../redux/actions/reporting.actions';
import { createEventsOptions, createProductOptions, createSortByOptions } from '../utils';

interface Filter {
  value: number | string;
  label: number | string;
}

interface EventFilter extends Filter {
  year: number | string;
}

export interface ReportingBookingsFilters {
  event?: EventFilter;
  product?: string;
  groupBy?: string;
}

interface ReportingBookingFiltersProps {
  actionsMenuRef: React.MutableRefObject<null>;
  updateSearchText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  actionsMenuOptions: any;
}

const ReportingBookingFilters = (props: ReportingBookingFiltersProps) => {
  const { selectedFilters, filters } = useSelector((state: RootState) => state.reporting.bookings);
  const dispatch = useDispatch<AppDispatch>();

  const handleChooseEvent = (e: SyntheticEvent<HTMLButtonElement>) => {
    const { value, label, rootid } = e.currentTarget.dataset;
    dispatch(updateSelectedFilters({
      ...selectedFilters,
      event: {
        value,
        label,
        year: rootid,
      },
    }));
    dispatch(
      sortBookingStat({
        EventIds: value,
        ProductIds: selectedFilters.product ?? '',
        GroupBy: selectedFilters.groupBy ?? '',
      }),
    );
  };

  const handleSelectFilters = (e: SelectChangeEvent<unknown>, type: string) => {
    dispatch(updateSelectedFilters({
      ...selectedFilters,
      [type]: e.target.value,
    }));

    dispatch(
      sortBookingStat({
        EventIds: selectedFilters.event?.value,
        ProductIds: type === 'product' ? e.target.value : selectedFilters.product,
        GroupBy: type === 'groupBy' ? e.target.value : selectedFilters.groupBy ?? '',
      }),
    );
  };
  const handleEventChange = (e: SyntheticEvent<HTMLButtonElement>) => handleChooseEvent(e);
  const handleProductChange = (e: SelectChangeEvent<unknown>) => handleSelectFilters(e, 'product');
  const handleGroupByChange = (e: SelectChangeEvent<unknown>) => handleSelectFilters(e, 'groupBy');

  const eventOptions = useMemo(
    () => createEventsOptions(filters?.events ?? []),
    [filters?.events],
  );

  const productsOptions = useMemo(
    () => createProductOptions(filters?.products ?? []),
    [filters?.products],
  );

  const groupByOptions = useMemo(
    () => createSortByOptions(filters?.groupBy ?? []),
    [filters?.groupBy],
  );

  return (
    <Filters>
      <div>
        <Label
          text="Ticket Selection"
          content={{
            title: '',
            text: '',
          }}
          inputId="ticket"
        />
        <FiltersWrapper>
          <Col>
            <p className="filter-title">Event</p>
            <NestedMenu
              options={eventOptions}
              rootId={!selectedFilters?.event ? null : selectedFilters?.event.year}
              buttonLabel={!selectedFilters?.event ? null : selectedFilters?.event.label}
              selectedId={!selectedFilters?.event ? null : selectedFilters?.event.value}
              handleChoose={handleEventChange}
            />
          </Col>
          <Col>
            <p className="filter-title">Product</p>
            <Select
              options={productsOptions}
              value={selectedFilters?.product}
              onChange={handleProductChange}
              placeholder="Select Product"
            />
          </Col>
          <Col>
            <p className="filter-title">Group By</p>
            <Select
              options={groupByOptions}
              value={selectedFilters?.groupBy}
              onChange={handleGroupByChange}
              placeholder="Group By"
            />
          </Col>
        </FiltersWrapper>
      </div>
      <div>
        <SearchBarWrapper className="search-wrapper" ref={props.actionsMenuRef}>
          <StyledInput
            name="search"
            placeholder="Search by table columns"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <ZoomIconSmall />
                </InputAdornment>
              ),
            }}
            onChange={props.updateSearchText}
          />
          <ActionsMenu options={props.actionsMenuOptions} />
        </SearchBarWrapper>
      </div>
    </Filters>
  );
};

export default ReportingBookingFilters;
