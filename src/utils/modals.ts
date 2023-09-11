import { SyntheticEvent } from 'react';

export const handleCloseModal = (e: SyntheticEvent<HTMLDivElement>, cb: () => void) => {
  const target = e.target as HTMLDivElement;

  if (!target.className.length) return;

  if (target.className.includes('overlay')) {
    cb();
  }
};
