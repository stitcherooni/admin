import React from 'react';
import { TableCell } from './ReportingProductTableHorizontal.styled';

export const convertQuestionsToColumns = (questions: any) => questions
  .map((item: any) => ({
    id: `question${item.questionId}`,
    label: item.question,
    className: 'question',
    questionId: item.questionId,
  }))
  .sort((a: { questionId: number; }, b: { questiondId: number; }) => a.questionId < b.questiondId);

export const mergeColumns = (target: unknown[], newColumns: unknown[]) => [
  ...target.slice(0, target.length - 1).concat(newColumns),
  target[target.length - 1],
];

export const createAnswersColumns = (answers: any[]) => (
  <>
    {answers
      .sort((a, b) => a.questionId < b.questiondId)
      .map((item) => (
        <TableCell className="answer" key={item.questionId}>
          {item.answer}
        </TableCell>
      ))}
  </>
);
