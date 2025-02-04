import { TextField, Button, Typography, Box, IconButton, CircularProgress } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useItemContext } from "../context/ItemContext";

const CreateItemBox = () => {
  const { addItem, newItem, errors, setNewItem, setOpenModal,loading } =
    useItemContext();
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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">Create Item</Typography>
        <IconButton onClick={() => setOpenModal(false)}>
          <Close />
        </IconButton>
      </Box>
      <TextField
        fullWidth
        label="Item Name"
        variant="outlined"
        value={newItem?.name}
        onChange={(e) =>
          setNewItem({
            ...newItem,
            name: e.target.value,
          })
        }
        error={!!errors.name}
        helperText={errors.name}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Description"
        variant="outlined"
        value={newItem?.description}
        onChange={(e) =>
          setNewItem({
            ...newItem,
            description: e.target.value,
          })
        }
        error={!!errors.description}
        helperText={errors.description}
        multiline
        rows={3}
        sx={{ mb: 2 }}
      />
     
      <Button variant="contained" color="primary" fullWidth disabled={loading} onClick={addItem}>
        {loading ? (
          <CircularProgress color="error"  />
        ) :"Add Item"}
      </Button>
    </Box>
  );
};

export default CreateItemBox;
