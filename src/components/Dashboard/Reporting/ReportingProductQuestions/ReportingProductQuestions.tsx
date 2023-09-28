import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Col,
  ButtonsWrapper,
  Filters,
  FiltersWrapper,
  TableContent,
  Wrapper,
  SearchBarWrapper,
} from './ReportingProductQuestions.styled';
import { TableCaption } from '../../../shared/Table/Table.styled';
import ReportingProductTableHorizontal from './ReportingProductTableHorizontal/ReportingProductTableHorizontal';
import ReportingProductTableVertical from './ReportingProductTableVertical/ReportingProductTableVertical';
import { rows } from './ReportingProductTableHorizontal/table-data';
import { menuActionsOptions } from './table-data';
import Label from '../../../shared/Label/Label';
import NestedMenu from '../../../shared/NestedMenu/NestedMenu';
import Select from '../../../shared/Select/Select';
import ActionsMenu from '../../../shared/ActionsMenu/ActionsMenu';
import { AppDispatch, RootState } from '../../../../redux/store';
import { createEventsOptions, createProductOptions, createSortByOptions } from './utils';
import { ProductQuestionsEvents, ProductQuestionsFormat } from '../../../../types/reporting/productQuestions';
import { sortProductQuestionsStat } from '../../../../redux/actions/reporting.actions';

interface Filter {
  value: number | string;
  label: number | string;
}

interface EventFilter extends Filter {
  year: number | string;
}

interface ReportingFilters {
  event?: EventFilter;
  product?: string;
  groupBy?: string;
}

const formatOptions = [
  {
    value: 'horizontal',
    label: 'Horizontal',
  },
  {
    value: 'vertical',
    label: 'Vertical',
  },
];

const ReportingProductQuestions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const productQuestionsData = useSelector((state: RootState) => state.reporting.productQuestions);
  const [filters, setSelectedFilters] = useState<ReportingFilters>({
    event: {
      value: '',
      label: '',
      year: '',
    },
    product: '',
    groupBy: '',
  });

  const handleChooseEvent = (e: any) => {
    const { value, label, rootid } = e.currentTarget.dataset;
    setSelectedFilters((currentFilters) => ({
      ...currentFilters,
      event: {
        value,
        label,
        year: rootid,
      },
    }));
    dispatch(sortProductQuestionsStat({
      page: productQuestionsData.currentPage,
      pageSize: productQuestionsData.pageSize,
      eventId: value,
      productId: filters.product ?? '',
      groupBy: filters.groupBy ?? 'horizontal',
    }));
  };

  const handleSelectFilters = (e: any, type: string) => {
    setSelectedFilters((currentFilters) => ({
      ...currentFilters,
      [type]: e.target.value,
    }));

    dispatch(sortProductQuestionsStat({
      page: productQuestionsData.currentPage,
      pageSize: productQuestionsData.pageSize,
      eventId: filters.event?.value,
      productId: type === 'product' ? e.target.value : filters.product,
      groupBy: type === 'groupBy' ? e.target.value : filters.groupBy ?? 'horizontal',
    }));
  };

  const handleEventChange = (e: any) => handleChooseEvent(e);
  const handleProductChange = (e: any) => handleSelectFilters(e, 'product');
  const handleGroupByChange = (e: any) => handleSelectFilters(e, 'groupBy');

  const eventOptions = useMemo(
    () => createEventsOptions(productQuestionsData?.filters?.events ?? ([] as any)),
    [productQuestionsData?.filters?.events],
  );

  const productsOptions = useMemo(
    () => createProductOptions(
      productQuestionsData?.filters?.products ?? ([] as ProductQuestionsEvents[]),
    ),
    [productQuestionsData?.filters?.products],
  );

  // const groupByOptions = useMemo(
  //   () => createSortByOptions(
  //     productQuestionsData?.filters?.groupBy ?? ([] as ProductQuestionsFormat[]),
  //   ),
  //   [productQuestionsData?.filters?.groupBy],
  // );

  // to do
  // sorting
  // table copy
  // search
  // add button show test answers,
  // when click by the button we need to show warning 'Warning: You are viewing test answers
  // needs format filters as array
  // answers should be as questions
  // needs customer id, currency
  // for vertical table - 1 answer and one question per row

  return (
    <Wrapper>
      <Filters>
        <div>
          <Label
            text="Product Questions Selection"
            inputId="ticket"
            content={{
              title: '',
              text: '',
            }}
          />
          <FiltersWrapper>
            <Col>
              <p className="filter-title">Event</p>
              <NestedMenu
                options={eventOptions}
                rootId={!filters?.event ? null : filters?.event.year}
                buttonLabel={!filters?.event ? null : filters?.event.label}
                selectedId={!filters?.event ? null : filters?.event.value}
                handleChoose={handleEventChange}
              />
            </Col>
            <Col>
              <p className="filter-title">Product</p>
              <Select
                options={productsOptions}
                value={filters?.product}
                onChange={handleProductChange}
                placeholder="Select Product"
              />
            </Col>
            <Col>
              <p className="filter-title">Group By</p>
              <Select
                options={formatOptions}
                value={filters?.groupBy}
                onChange={handleGroupByChange}
                placeholder="Group By"
              />
            </Col>
          </FiltersWrapper>
        </div>
        <div>
          <ButtonsWrapper />
          <SearchBarWrapper className="search-wrapper">
            <ActionsMenu options={menuActionsOptions} />
          </SearchBarWrapper>
        </div>
      </Filters>
      <TableContent>
        <TableCaption>
          <p>
            <strong>{productQuestionsData.data.length}</strong>
            {` ${productQuestionsData.totalCount === 0 || productQuestionsData.totalCount > 1 ? 'Entries' : 'Entry'}`}
          </p>
        </TableCaption>
        {(filters.groupBy === '' || filters.groupBy === 'horizontal') ? (
          <ReportingProductTableHorizontal />
        ) : (
          <ReportingProductTableVertical />
        )}
      </TableContent>
    </Wrapper>
  );
};

export default ReportingProductQuestions;
