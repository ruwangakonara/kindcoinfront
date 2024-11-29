import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TableHeaderCell,
  Menu,
  MenuItem,
  Icon,
  Label,
} from "semantic-ui-react";

const TableExamplePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3; // Number of rows per page

  // Sample data (replace this with your actual data)
  const data = [
    { id: 1, name: "First", value: "Cell 1" },
    { id: 2, name: "Second", value: "Cell 2" },
    { id: 3, name: "Third", value: "Cell 3" },
    { id: 4, name: "Fourth", value: "Cell 4" },
    { id: 5, name: "Fifth", value: "Cell 5" },
    { id: 6, name: "Sixth", value: "Cell 6" },
    { id: 7, name: "Seventh", value: "Cell 7" },
  ];

  // Calculate total pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Determine the rows to display on the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Table celled>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Header</TableHeaderCell>
          <TableHeaderCell>Header</TableHeaderCell>
          <TableHeaderCell>Header</TableHeaderCell>
        </TableRow>
      </TableHeader>

      <TableBody>
        {currentRows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>
              <Label ribbon>{row.name}</Label>
            </TableCell>
            <TableCell>{row.value}</TableCell>
            <TableCell>{row.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableHeaderCell colSpan="3">
            <Menu floated="right" pagination>
              <MenuItem
                as="a"
                icon
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <Icon name="chevron left" />
              </MenuItem>
              {Array.from({ length: totalPages }, (_, i) => (
                <MenuItem
                  key={i + 1}
                  as="a"
                  active={currentPage === i + 1}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </MenuItem>
              ))}
              <MenuItem
                as="a"
                icon
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <Icon name="chevron right" />
              </MenuItem>
            </Menu>
          </TableHeaderCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default TableExamplePagination;
