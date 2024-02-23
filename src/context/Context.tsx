import { createContext } from 'react';

export type ContextType = {
  data: any,
  setData: any,
  search: any,
  setSearch: any,
  searched: any,
  setSearched: any,
  columns: any,
  setColumns: any,
  selectedColumn: any,
  setSelectedColumn: any,
  comparisons: any,
  setComparisons: any,
  comparisonsValue: any,
  setComparisonsValue: any,
  handleColumns: any,
  handleComparisons: any,
  filters: any,
  handleRemoveFilter: any,
  handleRemoveAllFilters: any,
};
const Context = createContext({} as any);

export default Context;
