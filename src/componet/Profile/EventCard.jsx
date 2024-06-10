import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
export const EventCard = () => {
  return (
    <div>
      <Card sx={{ width: 345 }}>
        <CardMedia
          sx={{ height: 345 }}
          image="https://images.pexels.com/photos/940302/pexels-photo-940302.jpeg?auto=compress&cs=tinysrgb&w=800"
        />

        <CardContent>
          <Typography variant="h5">Indian Fast Food</Typography>
          <Typography variant="body2">50% off on first order</Typography>
          <div className="py-2 space-y-2">
            <p>{"mumbai"}</p>
            <p className="text-sm text-blue-400">ffre 14,2024,12.00 am</p>
            <p className="text-sm text-red-400">ffre 14,2024,12.00 am</p>
          </div>
        </CardContent>
        {false && (
          <CardActionArea>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </CardActionArea>
        )}
      </Card>
    </div>
  );
};
