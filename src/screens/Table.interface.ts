export interface TableData {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface TableProps {
  data: TableData[];
  itemsPerPage: number;
  onDeleteOne: Function;
  handleEdit: Function;
  onDeleteAll: Function;
}
