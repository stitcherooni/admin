import { renderHook, act } from '@testing-library/react';
import { ChangeEvent } from 'react';
import { useSortingTable } from './utils';
import { cells, fakeDataRows } from './testData';
import { convertBankedItems } from '../../Dashboard/Reporting/ReportingBanked/utils';

describe('table utils', () => {
  test('if on search founded data should show founded rows', () => {
    const { result } = renderHook(() => useSortingTable(
      fakeDataRows,
      {
        pageSize: 10, currentPage: 1, totalCount: 3, totalPages: 1, columns: cells,
      },
      convertBankedItems,
    ));

    act(() => {
      result.current.search.updateSearchText({ target: { value: '34' } } as ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.visibleRows.length).toBe(1);
  });

  test('if on search not founded data should back negative isFound', () => {
    const { result } = renderHook(() => useSortingTable(
      fakeDataRows,
      {
        pageSize: 10, currentPage: 1, totalCount: 3, totalPages: 1, columns: cells,
      },
      convertBankedItems,
    ));

    act(() => {
      result.current.search.updateSearchText({ target: { value: '--' } } as ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.search.isFound).toBeFalsy();
  });
});
