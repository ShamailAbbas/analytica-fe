import React from "react";
import { Container, Box, Button, Typography, Modal, Grid2 } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useItemContext } from "../context/ItemContext";
import ItemCard from "../components/ItemCard";
import CreateItemBox from "../components/CreateItemBox";
import ItemTable from "../components/ItemTable";
import ItemDetails from "../components/ItemDetails";

export default function ItemManagement() {
  const {
    items,
    openModal,
    handleCloseModal,
    setOpenModal,
    selectedItem,
    setSelectedItem,
    handleUpdateItem,
    loading
  } = useItemContext();

  const [viewMode, setViewMode] = React.useState("cards");

  const handleToggleView = () => {
    setViewMode(viewMode === "cards" ? "table" : "cards");
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Item Management</Typography>
        <Box>
          <Button variant="contained" startIcon={<Add />} onClick={() => setOpenModal(true)} sx={{ mr: 2 }}>
            Create New
          </Button>
          <Button variant="outlined" onClick={handleToggleView}>
            {viewMode === "cards" ? "Show as Table" : "Show as Cards"}
          </Button>
        </Box>
      </Box>

      {viewMode === "cards" ? (
        <Grid2 container spacing={4} sx={{ mt: 4 }}>
          {items.map((item) => (
            <ItemCard key={item._id} item={item} onClick={() => setSelectedItem(item)} />
          ))}
        </Grid2>
      ) : (
        <ItemTable items={items} setSelectedItem={setSelectedItem} />
      )}

      <Modal open={openModal} onClose={handleCloseModal}>
        <CreateItemBox />
      </Modal>

      {selectedItem && selectedItem._id && (
        <Modal open={Boolean(selectedItem)} onClose={() => setSelectedItem(null)}>
          <ItemDetails item={selectedItem} handleUpdate={handleUpdateItem} loading={loading} />
        </Modal>
      )}
    </Container>
  );
}
