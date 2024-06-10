import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createIngredient, createIngredientCategory } from '../../componet/State/Ingredients/Action';

const CreateIngredientForm = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const {restaurant, ingredients} = useSelector((store) => store)
    const [formData,setFormData] =useState({
        name:"",
        categoryId:""
    });
    const handleSubmit = (e) => {
        e.preventDefault()
        const data={
            ...formData,
            restaurantId: restaurant.usersRestaurant.id
        };
        dispatch(createIngredient({data, jwt}))
          console.log(data)
    }
    const handleInputChange =(e) => {
        const {name,value}=e.target
        setFormData({
            ...formData,[name]:value
        })

    }
  return (
    <div  className=''>
        <div>
            <h1 className='text-gray-400 text-center text-xl pb-10'>Thêm mới thành phần món ăn</h1>
            <form className='space-y-5' onSubmit={handleSubmit}>
<TextField 
  fullWidth
  id="name"
  name="name"
  label="Tên thành phần"
  variant="outlined"
  onChange={handleInputChange}
  value={formData.name}>

  </TextField>

  <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">Danh mục thành phần</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={formData.ingredientCategoryId}
    label="Category"
    onChange={handleInputChange}
    name="categoryId"
  >
    {ingredients.category.map((item)=><MenuItem value={item.id}>{item.name}</MenuItem>)}

  </Select>
</FormControl>
  <Button variant="contained" type="submit">
    Hoàn tất
  </Button>
  </form>
        </div>
    </div>
  )
}

export default CreateIngredientForm