import { Box, Card, CardActions, CardHeader, FormControl, FormControlLabel, IconButton, ListItem, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography  } from '@mui/material'
import React, { useState } from 'react'
import OrderTable from './OrderTable';
import { InsertEmoticon } from '@mui/icons-material';

const orderStatus=[
    {label:"Chưa giải quyết", value:"Chưa giải quyết"},
    {label:"Đã hoàn thành",value:"Đã hoàn thành"},
    {label:"All",value:"ALL"}
]
const Orders = () => {
    const [filterValue,setFilterValue]=useState();

    const handleFilter=(e,value)=>{
        setFilterValue(value)
    }
  return (
    <div className='px-2'>
        <Card className='p-5'>
            <Typography sx={{paddingBottom:"1rem"}} variant='h5'>
                Trạng thái đơn hàng
            </Typography>
            <FormControl>
                <RadioGroup onChange={handleFilter} row name='category' value={filterValue || "all"}>
                  {orderStatus.map((item)=><FormControlLabel
                  key={item.label}
                value={item.value}
            control={<Radio/>}
        label={item.label}
    sx={{color:"gray"}}/>)}
                </RadioGroup>
            </FormControl>
        </Card>
        <OrderTable/>

    </div>
  )
}

export default Orders