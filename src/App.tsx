import { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import { TableData } from "./screens/Table.interface";
import { Table } from "./screens/TableContainer";

const Container = styled.section`
  margin: 20px;
`;

function App() {
  const [data, setData] = useState<TableData[]>([]);
  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => response.json())
      .then((res: TableData[]) => setData(res));
  }, []);

  const handleDelete = (id: string) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };

  const handleDeleteAll = (selectedIds: Array<string>) => {
    const newData = data.filter(
      (item: TableData) => !selectedIds.includes(item.id)
    );
    setData(newData);
  };

  const handleEdit = (id: string) => {
    console.log(id);
  };
  return (
    <Container>
      <Table
        data={data}
        itemsPerPage={10}
        onDeleteOne={(e: string) => handleDelete(e)}
        handleEdit={(e: string) => handleEdit(e)}
        onDeleteAll={(e: Array<string>) => handleDeleteAll(e)}
      />
    </Container>
  );
}

export default App;
