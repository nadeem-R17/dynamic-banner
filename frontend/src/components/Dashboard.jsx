import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, FormControlLabel, Checkbox, Button, Typography, Paper } from '@mui/material';
import { BASE_URL } from '../assets/BASE_URL';

const Dashboard = ({ theme }) => {
  const [bannerData, setBannerData] = useState({
    description: '',
    timer: '',
    isVisible: true,
    link: '',
  });

  useEffect(() => {
    axios.get(`${BASE_URL}/api/banner`)
      .then((response) => {
        const { description, timer, isVisible, link } = response.data;

        const formattedTimer = new Date(timer).toISOString().slice(0, 16);

        setBannerData({
          description,
          timer: formattedTimer,
          isVisible,
          link,
        });
      })
      .catch((error) => {
        console.error('Error fetching banner data:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBannerData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentTime = new Date().getTime();
    const formTime = new Date(bannerData.timer).getTime();

    if (formTime <= currentTime) {
      alert("The timer is set to a past date. Please choose a future date.");
      return;
    }
      
    const formattedTimer = new Date(bannerData.timer).toISOString().slice(0, 19).replace('T', ' ');

    axios.put(`${BASE_URL}/api/banner`, { ...bannerData, timer: formattedTimer })
      .then((response) => {
        alert('Banner updated successfully!');
      })
      .catch((error) => {
        console.error('Error updating banner data:', error);
      });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        maxWidth: 600,
        margin: 'auto',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[3],
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: theme.palette.text.primary }}
      >
        Update Banner
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          sx={{ padding: 2 }}
        >
          <TextField
            label="Description"
            name="description"
            value={bannerData.description}
            onChange={handleChange}
            variant="outlined"
            sx={{
                '& .MuiInputBase-input': {
                  color: theme.palette.text.primary,
                },
                '& .MuiFormLabel-root': {
                  color: theme.palette.text.secondary,
                },
              }}
          />
          <TextField
            label="Timer (YYYY-MM-DDTHH:MM)"
            name="timer"
            type="datetime-local"
            value={bannerData.timer}
            onChange={handleChange}
            variant="outlined"
            sx={{
              '& .MuiInputBase-input': {
                color: theme.palette.text.primary,
              },
              '& .MuiFormLabel-root': {
                color: theme.palette.text.secondary,
              },
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="isVisible"
                checked={bannerData.isVisible}
                onChange={handleChange}
                sx={{
                  color: theme.palette.text.primary,
                }}
              />
            }
            label="Visible"
            sx={{
              color: theme.palette.text.secondary,
            }}
          />
          <TextField
            label="Link"
            name="link"
            value={bannerData.link}
            onChange={handleChange}
            variant="outlined"
            sx={{
              '& .MuiInputBase-input': {
                color: theme.palette.text.primary,
              },
              '& .MuiFormLabel-root': {
                color: theme.palette.text.secondary,
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              marginTop: 2,
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Update Banner
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Dashboard;
