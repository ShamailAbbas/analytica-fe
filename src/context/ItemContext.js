import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { validateForm } from "../lib/validateForm";
import { toast } from "react-toastify";
import axiosInstance from "../lib/axiosInstance";


export const ItemContext = createContext();


export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", description: "" });
  const [errors, setErrors] = useState({});
  const [selectedItem, setSelectedItem] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [deleting, setDeleting] = useState(false); 

  const handleCloseModal = useCallback(() => {
    setErrors({});
    setNewItem({ name: "", description: "" });
    setOpenModal(false);
  }, []);

  // Add item
  const addItem = async () => {
    if (!validateForm(newItem, setErrors)) return;

    const { name, description } = newItem;
    setLoading(true); 

    try {
      const saveItem = await axiosInstance.post(`/items/`, { name, description });

      if (saveItem.data.success) {
        setItems((prevItems) => [saveItem.data.data, ...prevItems]); 
        handleCloseModal();
        toast.success("Item added successfully!");
      }
    } catch (error) {
      toast.error("Please try again");
      console.error("Error adding item:", error);
    } finally {
      setLoading(false); 
    }
  };

  // Get items
  const getItem = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/items/`);
      setItems(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete item
  const deleteItem = async (id) => {
    setDeleting(id); 
    try {
      const del_response = await axiosInstance.delete(`/items/${id}`);

      if (del_response.data.success) {
        setItems((prevItems) => prevItems.filter((item) => item._id !== id)); 
        toast.success("Item deleted successfully!");
      }
    } catch (error) {
      toast.error("Please try again");
      console.error("Error deleting item:", error);
    } finally {
      setDeleting(''); 
    }
  };
  //Update item
  const handleUpdateItem = async (id, updatedItem) => {
    setLoading(true); 
    try {
      // Make sure to send the updated data in the request body
      const update_response = await axiosInstance.put(`/items/${id}`, updatedItem);
  
      if (update_response.data.success) {
        // Update the item in the state
        setItems((prevItems) =>
          prevItems.map((item) =>
            item._id === id ? { ...item, ...updatedItem } : item
          )
        );
        setSelectedItem({})
        toast.success("Item updated successfully!");
      }
    } catch (error) {
      toast.error("Please try again");
      console.error("Error updating item:", error);
    } finally {
      setLoading(false); 
    }
  };
  

  useEffect(() => {
    getItem();
  }, [getItem]);

  return (
    <ItemContext.Provider
      value={{
        items,
        getItem,
        deleteItem,
        addItem,
        newItem,
        errors,
        openModal,
        setItems,
        setOpenModal,
        setNewItem,
        setErrors,
        handleCloseModal,
        handleUpdateItem,
        selectedItem,
        setSelectedItem,
        loading, 
        deleting, 
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export const useItemContext = () => {
  const context = useContext(ItemContext);

  if (!context) {
    throw new Error("useItemContext must be used within an ItemProvider");
  }

  return context; 
};
