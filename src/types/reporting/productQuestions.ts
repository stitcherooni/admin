export interface ProductQuestionsProps {
  data: ProductQuestionHorizontal[] | ProductQuestionVertical[];
  questions: Question[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  filters: ProductQuestionsFiltersOptions;
}

export interface ProductQuestionsEvents {
  year: ProductQuestionsEventFilter[];
}

export interface ProductQuestionsEventFilter {
  eventId: number;
  eventName: string;
}

export interface ProductQuestionsProductFilter {
  productId: number;
  productName: string;
}

export type ProductQuestionsFormat = 'horizontal' | 'vertical';

export interface ProductQuestionsFiltersOptions {
  events: ProductQuestionsEvents[];
  products: ProductQuestionsProductFilter[];
  format: ProductQuestionsFormat;
}

export interface ProductQuestionHorizontal {
  num: number;
  orderId: number;
  bookingName: string;
  className: string;
  email: string;
  phone: string;
  bookedFor: string;
  product: string;
  price: number;
  order: number;
  date: string;
  terms: string;
  allergies: string[];
  answers: Answer[];
}

export interface ProductQuestionVertical {
  num: number;
  orderId: number;
  bookingName: string;
  className: string;
  email: string;
  phone: string;
  bookedFor: string;
  product: string;
  price: number;
  order: number;
  question: number;
  answers: Answer[];
  date: string;
  terms: string;
  allergies: string[];
}

export interface Answer {
  questionId: number;
  answer: string;
}

export interface Question {
  questionId: number;
  question: string;
}
