import { Box, Card, TableContainer, Table, CardHeader, Paper, TableBody, TableCell, TableHead, TableRow, Avatar, AvatarGroup, Chip, MenuItem, Menu, Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurantsOrder, updateOrderStatus } from '../../componet/State/Restaurant Order/Action'

const orderStatus = [
  { label: "Đơn hàng đang được chuẩn bị giao", value: "Đơn hàng đang được chuẩn bị giao" },
  { label: "Đã giao hàng", value: "Đã giao hàng" },
  { label: "Đã hoàn thành", value: "Đã hoàn thành" },
  { label: "Chưa giải quyết", value: "Chưa giải quyết" },
  
  
];
const orders = [1, 1, 1, 1, 1, 1, 1]
export default function OrderTable() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, restaurantOrder, ingredients, menu } = useSelector((store) => store);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    dispatch(fetchRestaurantsOrder({
      jwt,
      restaurantId: restaurant.usersRestaurant?.id,
    }))
  }, []);
  const handleUpdateOrder=(orderId, orderStatus)=>{
    dispatch(updateOrderStatus({orderId,orderStatus,jwt}))
    handleClose();
  }
  return (
    <div>
      <Box>
        <Card className='mt-1'>
          <CardHeader
            title={"Tất cả đơn hàng"}
            sx={{ pt: 2, alignItems: "center" }}

          />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Mã đơn hàng</TableCell>
                  <TableCell align="right">Ảnh</TableCell>
                  <TableCell align="right">Khách hàng</TableCell>
                  <TableCell align="right">Giá</TableCell>
                  <TableCell align="right">Tên món ăn</TableCell>
                  <TableCell align="right">Thành phần món ăn</TableCell>
                  <TableCell align="right">Trạng thái</TableCell>
                  <TableCell align="right">Cập nhật</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {restaurantOrder.orders.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.id}
                    </TableCell>
                    <TableCell align="right">
                      <AvatarGroup>
                        {item.items.map((orderItem) => <Avatar src={orderItem.food?.images[0]}></Avatar>)}
                      </AvatarGroup>
                    </TableCell>
                    <TableCell align="right">
                      {item.customer?.fullName}
                    </TableCell>
                    <TableCell align="right">{item.totalPrice}VND</TableCell>
                    <TableCell align="right">
                      {item.items.map((orderItem) => <p>{orderItem.food?.name}</p>)}
                    </TableCell>
                    <TableCell align="right">
                      {item.items.map((orderItem) =>
                        <div>{orderItem.ingredients.map((ingredient) => <Chip label={ingredient} />)}</div>
                      )}
                    </TableCell>
                    <TableCell align="right">{item.orderStatus}</TableCell>
                    <TableCell align="right">
                      <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                      >
                        update
                      </Button>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                      >
                        {orderStatus.map((status) => (
                          <MenuItem onClick={() => handleUpdateOrder(item.id, status.value)}>{status.label}</MenuItem>

                        ))}
                      </Menu>

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Box>
    </div>
  )
}
