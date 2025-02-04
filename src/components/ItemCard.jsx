import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid2,
  CircularProgress,
} from "@mui/material";
import { useItemContext } from "../context/ItemContext";
import { Delete } from "@mui/icons-material";

const ItemCard = ({ item, onClick }) => {
  const { deleteItem,deleting } = useItemContext();

  // Truncate the description
  const truncatedDescription = item.description.length > 100 ? item.description.substring(0, 100) + "..." : item.description;

  return (
    <Grid2 item xs={12} sm={6} md={4} lg={3} xl={3} sx={{ mb: 4 }}>
      <Card sx={{ boxShadow: 3, borderRadius: 3, width: 250, height: 270, display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6">{item.name}</Typography>
          <Typography color="textSecondary" textAlign={'justify'} mt={2}>{truncatedDescription}</Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Button color="error" onClick={() => deleteItem(item._id)} disabled={deleting}>
              {deleting ? (<CircularProgress color="error"  />) :<Delete/>}
          </Button>
          <Button variant="outlined" onClick={onClick}>
            View Details
          </Button>
        </CardActions>
      </Card>
    </Grid2>
  );
};

export default ItemCard;
