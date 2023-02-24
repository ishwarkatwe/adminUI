import React, { useEffect, useState } from "react";
import {
  Button,
  FooterStyle,
  HeaderStyle,
  PageBtn,
  TableStyled,
  TableWrapper,
} from "./TableStyle";
import { FaEdit, FaTrash } from "react-icons/fa";
import { TableData, TableProps } from "./Table.interface";

export const Table: React.FC<TableProps> = ({
  data,
  itemsPerPage,
  onDeleteOne,
  handleEdit,
  onDeleteAll,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState<TableData[]>();
  const [filterData, setFilterData] = useState<TableData[]>();

  useEffect(() => {
    handleSearch("");
  }, [data]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = (filterData || []).slice(startIndex, endIndex);
    setCurrentData(currentData);
    setSelectedIds([]);
  }, [currentPage, filterData]);

  const handleSearch = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(1);
    setSelectedIds([]);
    const filteredData = data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);
    setCurrentData(currentData);
    setFilterData(filteredData);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const ids = data.map((item) => item.id);
      setSelectedIds(ids);
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    if (event.target.checked) {
      setSelectedIds((prevSelectedIds) => [...prevSelectedIds, id]);
    } else {
      setSelectedIds((prevSelectedIds) =>
        prevSelectedIds.filter((selectedId) => selectedId !== id)
      );
    }
  };

  const renderTableHeader = () => {
    return (
      <tr>
        <th>
          <input type="checkbox" onChange={handleSelectAll} />
        </th>
        <th>Name</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
    );
  };

  const renderTableBody = (currentData: TableData[]) => {
    if (currentData.length === 0) {
      return (
        <tr className="text-center">
          <td colSpan={4}>No records found</td>
        </tr>
      );
    }

    return currentData.map((item) => (
      <tr key={item.id}>
        <td>
          <input
            type="checkbox"
            checked={selectedIds.includes(item.id)}
            onChange={(event) => handleSelectOne(event, item.id)}
          />
        </td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>
          <Button onClick={() => handleEdit(item.id)}>
            <FaEdit />
          </Button>
          <Button className="primary" onClick={() => onDeleteOne(item.id)}>
            <FaTrash />
          </Button>
        </td>
      </tr>
    ));
  };

  const renderPagination = (currentData: TableData[]) => {
    const totalPages = Math.ceil(currentData.length / itemsPerPage);
    return (
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (pageNumber) => (
            <PageBtn
              className={pageNumber === currentPage ? "active" : ""}
              key={pageNumber}
              onClick={() => setCurrentPage(pageNumber)}
            >
              {pageNumber}
            </PageBtn>
          )
        )}
      </div>
    );
  };

  return (
    <TableWrapper>
      <HeaderStyle>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search..."
        />
      </HeaderStyle>

      <TableStyled>
        <thead>{renderTableHeader()}</thead>
        <tbody>{renderTableBody(currentData || [])}</tbody>
      </TableStyled>

      <FooterStyle>
        {selectedIds.length > 0 && (
          <div className="deleteAll">
            <Button className="primary" onClick={() => onDeleteAll(selectedIds)}>
              Delete Selected
            </Button>
          </div>
        )}

        {filterData && renderPagination(filterData)}
      </FooterStyle>
    </TableWrapper>
  );
};
