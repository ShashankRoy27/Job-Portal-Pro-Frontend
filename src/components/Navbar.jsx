import React from 'react'
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleTheme, theme }) => {
  const navigate = useNavigate(); 

  return (
    <Box sx={{ mt: 2 }}>
      <AppBar 
        position="static" 
        sx={{ background: theme === "light" ? '#ADD8E6' : '#1e1e1e' }}
      >
        <Toolbar variant="dense">

          <Typography 
            variant="h4"
            onClick={() => navigate('/')}
            sx={{ 
              cursor: "pointer",
              flexGrow: 1, 
              color: theme === "light" ? "black" : "white"
            }}
          >
            Job Portal
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", pr: 2 }}>

            <Button 
              variant="outlined" 
              onClick={() => navigate('/')} 
              sx={{ mr: 1, color: theme === "light" ? "black" : "white" }}
            >
              Home
            </Button>

            <Button 
              variant="outlined" 
              onClick={() => navigate('/create')}
              sx={{ mr: 1, color: theme === "light" ? "black" : "white" }}
            >
              Add Job
            </Button>

            {/* 🔥 THEME TOGGLE BUTTON */}
            <Button 
            variant="outlined"
            onClick={toggleTheme}
            sx={{ color: theme === "light" ? "black" : "white" }}
            >
           {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
           </Button>

          </Box>

        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar