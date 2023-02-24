import styled from "styled-components";

const colors = {
  primary: "#000000",
  secondary: "#202020",
  accent: "#1497ff",
  default: "#8d8d8d",
  white: "#ffffff",
  black: "#000000",
  grey: "#ccc",
  lightGrey: "#f2f2f2",
};

const WIDTH = "50px";

const Button = styled.button`
  background-color: transparent;
  height: 35px;
  min-width: 40px;
  box-shadow: none;
  border: 1px solid ${colors.accent};
  padding: 0px 10px;
  margin: 0px 5px;
  border-radius: 4px;
  &.primary {
    background-color: ${colors.accent};
    color: ${colors.white};
  }
`;
const TableWrapper = styled.section`
  display: flex;
  flex: 1;
  flex-direction: column;
`;
const FooterStyle = styled.section`
  padding: 10px 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  > div.deleteAll {
    flex: 0.5;
    text-align: left;
  }
  div {
    flex: 2;
    text-align: center;
  }
`;
const HeaderStyle = styled.section`
  padding: 10px 0px;
  > input {
    height: 40px;
    width: calc(100% - 30px);
    border: 1px solid ${colors.grey};
    box-shadow: none;
    padding: 5px 15px;
  }
`;
const TableStyled = styled.table`
  border: none;
  border-collapse: collapse;

  .text-center {
    text-align: center;
  }

  tr {
    height: 50px;
    text-align: left;
    td {
      border-bottom: 1px solid ${colors.lightGrey};
    }
  }
  tbody {
    tr {
      &:hover {
        background-color: ${colors.lightGrey};
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
`;

const PageBtn = styled.button`
  height: ${WIDTH};
  border-radius: 50%;
  border: none;
  min-width: ${WIDTH};
  margin: 10px 5px;
  border: 2px solid ${colors.accent};
  background-color: transparent;

  &.active {
    background-color: ${colors.accent};
    color: ${colors.white};
  }
`;

export {
  colors,
  Button,
  TableWrapper,
  HeaderStyle,
  TableStyled,
  FooterStyle,
  PageBtn,
};
