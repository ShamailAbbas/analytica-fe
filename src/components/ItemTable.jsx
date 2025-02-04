// src/components/ItemTable.js

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useItemContext } from "../context/ItemContext";
import { Delete } from "@mui/icons-material";

export default function ItemTable({ items, setSelectedItem}) {
      const { deleteItem,deleting } = useItemContext();
     
    

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell sx={{ width: "60%" }}>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.name}</TableCell>
              <TableCell sx={{ width: "60%" }}>{item.description.length > 100 ? item.description.substring(0, 100) + "..." : item.description}</TableCell>
              <TableCell sx={{display:'flex'}}>
                <Button variant="outlined" onClick={() => setSelectedItem(item)}>
                  View Details
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ ml: 2 }}
                  onClick={() => deleteItem(item._id)} // Delete button
                  disabled={deleting==item._id}
                >
                   {deleting==item._id ? (
                            <CircularProgress color="error"  />
                          ) :<Delete/>}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
