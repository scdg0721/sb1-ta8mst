import { ScrapedData } from '../types';

export type SortField = string;
export type SortOrder = 'asc' | 'desc';

export const sortData = (data: ScrapedData, field: SortField, order: SortOrder): ScrapedData => {
  const sortedContent = [...data.content];
  const headerRow = sortedContent.shift();

  if (!headerRow) return data;

  const fieldIndex = headerRow.findIndex(header => header.toLowerCase() === field.toLowerCase());

  sortedContent.sort((a, b) => {
    let comparison = 0;

    if (fieldIndex !== -1) {
      const valueA = a[fieldIndex];
      const valueB = b[fieldIndex];

      if (!isNaN(Date.parse(valueA)) && !isNaN(Date.parse(valueB))) {
        comparison = new Date(valueA).getTime() - new Date(valueB).getTime();
      } else if (!isNaN(Number(valueA)) && !isNaN(Number(valueB))) {
        comparison = Number(valueA) - Number(valueB);
      } else {
        comparison = valueA.localeCompare(valueB);
      }
    }

    return order === 'asc' ? comparison : -comparison;
  });

  return {
    ...data,
    content: [headerRow, ...sortedContent],
  };
};