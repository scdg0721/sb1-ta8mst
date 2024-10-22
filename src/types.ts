export interface ScrapedData {
  id: number;
  header: string;
  content: string[][];
}

export interface SortConfig {
  field: 'date' | 'title' | 'index';
  order: 'asc' | 'desc';
}