import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  getProductQuestionsFilters,
  getProductQuestionsStat,
  sortProductQuestionsStat,
} from '../../actions/reporting.actions';
import { ProductQuestionsFiltersOptions, ProductQuestionsProps } from '../../../types/reporting/productQuestions';

interface ReportingInitialState extends ProductQuestionsProps {
  status: string;
}

const initialState: ReportingInitialState = {
  status: 'loading',
  data: [],
  questions: [],
  totalCount: 10,
  totalPages: 1,
  currentPage: 1,
  pageSize: 10,
  filters: {} as any,
};

const productQuestionsSlice = createSlice({
  name: 'productQuestions',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProductQuestionsStat.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(
        getProductQuestionsStat.fulfilled,
        (state, action: PayloadAction<ProductQuestionsProps>) => ({
          ...state,
          status: 'succeeded',
          data: action.payload.data,
          questions: action.payload.questions,
          totalCount: action.payload.totalCount,
          totalPages: action.payload.totalPages,
          currentPage: action.payload.currentPage,
          pageSize: action.payload.pageSize,
        }),
      )
      .addCase(getProductQuestionsStat.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }))
      .addCase(getProductQuestionsFilters.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(
        getProductQuestionsFilters.fulfilled,
        (state, action: PayloadAction<ProductQuestionsFiltersOptions>) => ({
          ...state,
          status: 'succeeded',
          filters: action.payload,
        }),
      )
      .addCase(getProductQuestionsFilters.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }))
      .addCase(sortProductQuestionsStat.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(
        sortProductQuestionsStat.fulfilled,
        (state, action: PayloadAction<ProductQuestionsProps>) => ({
          ...state,
          status: 'succeeded',
          data: action.payload.data,
        }),
      )
      .addCase(sortProductQuestionsStat.rejected, (state, action) => ({
        ...state,
        status: 'error',
        error: action.error.message,
      }));
  },
});

export default productQuestionsSlice.reducer;
