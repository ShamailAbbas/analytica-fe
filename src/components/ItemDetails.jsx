import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import { Edit } from "@mui/icons-material";

const ItemDetails = ({ item, handleUpdate, loading }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedItem, setUpdatedItem] = useState({
    name: item.name,
    description: item.description,
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (updatedItem.name !== item.name || updatedItem.description !== item.description) {
      handleUpdate(item._id, updatedItem);
    }
    setIsEditing(false);
  };

  useEffect(() => {
    setUpdatedItem({
      name: item.name,
      description: item.description,
    });
  }, [item]);

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
      }}
    >
      {!isEditing ? (
        <>
          <Typography variant="h5">{item.name}</Typography>
          <Typography variant="body1">{item.description}</Typography>
          <IconButton onClick={handleEdit} sx={{ position: "absolute", top: 10, right: 10 }}>
            <Edit />
          </IconButton>
        </>
      ) : (
        <>
          <TextField
            label="Item Name"
            name="name"
            variant="outlined"
            fullWidth
            value={updatedItem.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            name="description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={updatedItem.description}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Box display="flex" justifyContent="space-between">
            <Button variant="outlined" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading||(updatedItem.name == item.name && updatedItem.description == item.description)}>
              Update
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ItemDetails;
