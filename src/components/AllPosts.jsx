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
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Search = ({ theme }) => {

  const [query, setQuery] = useState("");
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate("/edit", { state: { id } });
  }

  useEffect(() => {

    const fetchPosts = async () => {
      const response = await axios.get(`http://localhost:8080/jobPosts/keyword/${query}`);
      setPost(response.data);
    };

    const fetchInitialPosts = async () => {
      const response = await axios.get(`http://localhost:8080/jobPosts`);
      setPost(response.data);
    };

    if (query.length === 0) {
      fetchInitialPosts();
    } else {
      fetchPosts();
    }

  }, [query]);

  const handleDelete = (id) => {
    async function deletePost() {
      await axios.delete(`http://localhost:8080/jobPost/${id}`);
    }
    deletePost();
    window.location.reload();
  }

  return (
    <>
      <Grid container spacing={2} sx={{ px: 2, mt: 2 }}>

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

        {/* JOB CARDS */}
        {post &&
          post.map((p) => {
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

                  {/* SKILLS INLINE (FIXED) */}
                  <Typography sx={{ mt: 1 }}>
                    Skills: {p.postTechStack.join(" . ")}
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