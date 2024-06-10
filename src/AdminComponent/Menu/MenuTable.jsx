import React, { useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFoodAction, getMenuItemsByRestaurantId, updateMenuItemsAvailability } from '../../componet/State/Menu/Action';

export default function MenuTable() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, ingredients,  menu } = useSelector((store) => store);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMenuItemsByRestaurantId({
      jwt,
      restaurantId: restaurant.usersRestaurant.id,
      vegetarian: false,
      nonveg: false,
      seasonal: false,
      foodCategory: "",
    }));
  }, [dispatch, jwt, restaurant.usersRestaurant.id]);

  const handleDeleteFood = (foodId) => {
    dispatch(deleteFoodAction({ foodId, jwt }));
  };

  const handleToggleAvailability = (foodId) => {
    dispatch(updateMenuItemsAvailability({ foodId, jwt }));
  };

  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader
          action={
            <IconButton onClick={() => navigate("/admin/restaurants/add-menu")} aria-label="settings">
              <CreateIcon />
            </IconButton>
          }
          title={"Menu"}
          sx={{ pt: 2, alignItems: "center" }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Ảnh</TableCell>
                <TableCell align="right">Tên món ăn</TableCell>
                <TableCell align="right">Thành phần món ăn</TableCell>
                <TableCell align="right">Giá</TableCell>
                <TableCell align="right">Trạng thái</TableCell>
                <TableCell align="right">Xóa</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menu.menuItems.map((item) => (
                <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    <Avatar src={item.images[0]}></Avatar>
                  </TableCell>
                  <TableCell align="right">{item.name}</TableCell>
                  <TableCell align="right">
                    {item.ingredients.map((ingredient) => (
                      <Chip key={ingredient.id} label={ingredient.name}></Chip>
                    ))}
                  </TableCell>
                  <TableCell align="right">{item.price} VND</TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      style={{ backgroundColor: 'primary' }}
                      onClick={() => handleToggleAvailability(item.id)}
                    >
                      {item.available ? "Còn Hàng" : "Hết Hàng"}
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="primary" onClick={() => handleDeleteFood(item.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
}
