export const validateForm = (newItem, setErrors) => {
  let newErrors = {};
  if (!newItem?.name.trim()) newErrors.name = "Name is required";
  else if (newItem?.name.length < 3 || newItem?.name.length > 30)
    newErrors.name = "Name must be between 3 and 30 characters";

  if (!newItem?.description.trim())
    newErrors.description = "Description is required";
  else if (
    newItem?.description.length < 3 ||
    newItem?.description.length > 500
  )
    newErrors.description = "Description must be between 3 and 500 characters";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
