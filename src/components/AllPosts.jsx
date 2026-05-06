import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';

import {
  Box,
  Card,
  Grid,
  InputAdornment,
  TextField,
  Typography,
  CircularProgress
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Search = ({ theme }) => {

  const [query, setQuery] = useState("");
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate("/edit", { state: { id } });
  }

  useEffect(() => {

    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://job-portal-pro-backend.onrender.com/jobPosts/keyword/${query}`);
        setPost(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchInitialPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://job-portal-pro-backend.onrender.com/jobPosts`);
        setPost(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (query.length === 0) {
      fetchInitialPosts();
    } else {
      fetchPosts();
    }

  }, [query]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://job-portal-pro-backend.onrender.com/jobPost/${id}`);
      setPost(prev => prev.filter(p => p.postId !== id)); // no reload 🔥
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Grid 
  container 
  spacing={2} 
  sx={{ 
    px: 2, 
    mt: 2,
    pb: 4
  }}
>

        {/* SEARCH BAR */}
        <Grid item xs={12}>
          <Box>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              placeholder="Search for jobs..."
              sx={{ width: "100%" }}
              fullWidth
              onChange={(e) => setQuery(e.target.value)}
            />
          </Box>
        </Grid>

        {/* 🔥 LOADING STATE */}
        {loading && (
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <CircularProgress />
            </Box>
          </Grid>
        )}

        {/* JOB CARDS */}
        {!loading && post.length === 0 && (
          <Grid item xs={12}>
            <Typography align="center" sx={{ mt: 4 }}>
              No jobs found
            </Typography>
          </Grid>
        )}

        {!loading && post.map((p) => {
          return (
            <Grid key={p.postId} item xs={12} md={6} lg={4}>

              <Card
                sx={{
                  p: 2,
                  backgroundColor: theme === "light" ? "#ADD8E6" : "#2c2c2c",
                  color: theme === "light" ? "black" : "white"
                }}
              >

                {/* TITLE */}
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: "1.8rem",
                    fontWeight: "600",
                    fontFamily: "sans-serif"
                  }}
                >
                  {p.postProfile}
                </Typography>

                {/* DESCRIPTION */}
                <Typography
                  sx={{
                    color: theme === "light" ? "#585858" : "#ccc",
                    mt: 1,
                    fontFamily: "cursive"
                  }}
                >
                  Description: {p.postDesc}
                </Typography>

                {/* EXPERIENCE */}
                <Typography sx={{ mt: 1.5 }}>
                  Experience: {p.reqExperience} years
                </Typography>

                {/* SKILLS */}
                <Typography sx={{ mt: 1 }}>
                  Skills: {p.postTechStack?.join(" . ")}
                </Typography>

                {/* ICONS */}
                <Box sx={{ mt: 1 }}>
                  <DeleteIcon sx={{ mr: 1, cursor: "pointer" }} onClick={() => handleDelete(p.postId)} />
                  <EditIcon sx={{ cursor: "pointer" }} onClick={() => handleEdit(p.postId)} />
                </Box>

              </Card>

            </Grid>
          );
        })}
      </Grid>
    </>
  )
}

export default Search