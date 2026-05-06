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
    <Box sx={{ mb: 2 }}>

      <AppBar
        position="static"
        sx={{
          background: theme === "light" ? "#ADD8E6" : "#1e1e1e",
          px: 1
        }}
      >

        <Toolbar
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column",
              sm: "row"
            },
            alignItems: {
              xs: "flex-start",
              sm: "center"
            },
            py: 1
          }}
        >

          {/* LOGO / TITLE */}
          <Typography
            variant="h4"
            onClick={() => navigate('/')}
            sx={{
              cursor: "pointer",
              flexGrow: 1,
              color: theme === "light" ? "black" : "white",

              fontSize: {
                xs: "2rem",
                sm: "2.2rem"
              },

              mb: {
                xs: 1,
                sm: 0
              }
            }}
          >
            Job Portal
          </Typography>

          {/* BUTTON SECTION */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              width: {
                xs: "100%",
                sm: "auto"
              }
            }}
          >

            <Button
              variant="outlined"
              onClick={() => navigate('/')}
              sx={{
                color: theme === "light" ? "black" : "white",
                borderColor: theme === "light" ? "#1976d2" : "#90caf9",
                flex: {
                  xs: 1,
                  sm: "unset"
                }
              }}
            >
              Home
            </Button>

            <Button
              variant="outlined"
              onClick={() => navigate('/create')}
              sx={{
                color: theme === "light" ? "black" : "white",
                borderColor: theme === "light" ? "#1976d2" : "#90caf9",
                flex: {
                  xs: 1,
                  sm: "unset"
                }
              }}
            >
              Add Job
            </Button>

            <Button
              variant="outlined"
              onClick={toggleTheme}
              sx={{
                color: theme === "light" ? "black" : "white",
                borderColor: theme === "light" ? "#1976d2" : "#90caf9",

                flex: {
                  xs: 1,
                  sm: "unset"
                }
              }}
            >
              {theme === "light"
                ? "🌙 Dark"
                : "☀️ Light"}
            </Button>

          </Box>

        </Toolbar>

      </AppBar>

    </Box>
  )
}

export default Navbar