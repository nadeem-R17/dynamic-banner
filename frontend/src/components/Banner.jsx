import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Box, Typography, Button, Paper } from "@mui/material";
import { BASE_URL } from "../assets/BASE_URL";

const socket = io(`${BASE_URL}`);

const formatTime = (milliseconds) => {
  if (milliseconds <= 0) return "0 days 0 hours 0 minutes 0 seconds";

  const totalSeconds = Math.floor(milliseconds / 1000);
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  return `${days} days ${hours} hours ${minutes} minutes ${secs} seconds`;
};

const Banner = ({ theme }) => {
  const [bannerData, setBannerData] = useState({
    description: "",
    timer: 0,
    link: "",
    isVisible: true,
  });

  useEffect(() => {
    socket.on("bannerData", (data) => {
      setBannerData({
        ...data,
        timer: new Date(data.timer).getTime() - new Date().getTime(),
      });
    });

    return () => {
      socket.off("bannerData");
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerData((prevData) => {
        const timeLeft = prevData.timer - 1000; 
        return {
          ...prevData,
          timer: timeLeft > 0 ? timeLeft : 0,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!bannerData.isVisible || bannerData.timer <= 0) {
    return null;
  }

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[3],
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ padding: 2 }}
      >
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          sx={{ color: theme.palette.text.primary }}
        >
          {bannerData.description}
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ color: theme.palette.text.secondary }}
        >
          Time remaining: {formatTime(bannerData.timer)}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          href={bannerData.link}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            marginTop: 2,
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          View the link
        </Button>
      </Box>
    </Paper>
  );
};

export default Banner;
