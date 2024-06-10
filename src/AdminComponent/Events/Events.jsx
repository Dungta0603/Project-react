import { Box, Button, Grid, Modal, TextField } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEventAction } from '../../componet/State/Restaurant/Action';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  image: '',
  location: '',
  name: '',
  startedAt: null,
  endsAt: null,
};

const Events = () => {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const { restaurant } = useSelector((store) => store);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formValues,
      startedAt: dayjs(formValues.startedAt).format('MMM DD, YYYY hh:mm:ss A'),
      endsAt: dayjs(formValues.endsAt).format('MMM DD, YYYY hh:mm:ss A'),
    };
    dispatch(createEventAction({ data, jwt, restaurantId: restaurant.usersRestaurant.id }));
    setFormValues(initialValues);
    setOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleDateChange = (date, dateType) => {
    setFormValues({ ...formValues, [dateType]: date });
  };

  return (
    <div>
      <div className='p-5'>
        <Button onClick={handleOpen} variant='contained'>
          Create New Event
        </Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'>
          <Box sx={style}>
            <h1 className='text-gray-400 text-center text-xl pb-10'>Create New Event</h1>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    name='image'
                    label='Image URL'
                    variant='outlined'
                    fullWidth
                    value={formValues.image}
                    onChange={handleFormChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name='location'
                    label='Location'
                    variant='outlined'
                    fullWidth
                    value={formValues.location}
                    onChange={handleFormChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name='name'
                    label='Event Name'
                    variant='outlined'
                    fullWidth
                    value={formValues.name}
                    onChange={handleFormChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label='Start Date and Time'
                      value={formValues.startedAt}
                      onChange={(newValue) => handleDateChange(newValue, 'startedAt')}
                      inputFormat='MM/dd/yyyy hh:mm a'
                      className='w-full'
                      sx={{ width: '100%' }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label='End Date and Time'
                      value={formValues.endsAt}
                      onChange={(newValue) => handleDateChange(newValue, 'endsAt')}
                      inputFormat='MM/dd/yyyy hh:mm a'
                      className='w-full'
                      sx={{ width: '100%' }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Box mt={3} display='flex'>
                <Button variant='contained' color='primary' type='submit'>
                  Submit
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Events;
