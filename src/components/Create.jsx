import React, { useState } from "react";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const initial = {postProfile: "", reqExperience: 0, postTechStack: [], postDesc:"",active: true};


const Create = () => {
  const skillSet = [
    {
      name: "Javascript"
    },
    {
      name: "Java"
    },
    {
      name: "Python"
    },
    {
      name: "Django"
    },
    {
      name: "Rust"
    }
  ];

  const navigate = useNavigate();
  const [form, setForm] = useState(initial);

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {

  e.preventDefault();
  setError("");

if (
  !form.postProfile?.trim() ||
  !form.postDesc?.trim() ||
  Number(form.reqExperience) <= 0
) {

  setError("Please fill all fields properly.");
  return;

}

if (form.postTechStack.length === 0) {

  setError("Please select at least one skill.");
  return;

}

  try {

    const response = await axios.post(
      "https://job-portal-pro-backend.onrender.com/jobPost",
      form
    );

    console.log(response.data);

    navigate('/');

  } catch (error) {

    console.log(error);

  }

};


  const { postProfile, reqExperience, postDesc } = form;

  const handleChange = (e) => {

  const { value, checked } = e.target;

  if (checked) {

    setForm({
      ...form,
      postTechStack: [...form.postTechStack, value]
    });

  } else {

    setForm({
      ...form,
      postTechStack: form.postTechStack.filter(
        (skill) => skill !== value
      )
    });

  }

}

  

  return (
    <Paper sx={{ padding:"1%"}} elevation={0}>
      <Typography sx={{ margin: "3% auto" }} align="center" variant="h5">
        Create New Post
      </Typography>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        {error && (
  <Typography
    color="error"
    align="center"
    sx={{ mt: 2 }}
  >
    {error}
  </Typography>
)}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
           
          <TextField
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) => setForm({ ...form, postProfile: e.target.value })}
            label="Job-Profile"
            variant="outlined"
            value={postProfile}
          />
          <TextField
            min="0"
            type="number"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) => setForm({ ...form, reqExperience: e.target.value })}
            label="Years of Experience"
            variant="outlined"
            value={reqExperience}
          />
           <TextField
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            multiline
            rows={4}
            onChange={(e) => setForm({ ...form, postDesc: e.target.value })}
            label="Job-desc"
            variant="outlined"
            value={postDesc}
          />
          <Box sx={{ margin:"1% auto"}}>
          <h3>Please mention required skills</h3>
         <ul>
        {skillSet.map(({ name }, index) => {
          return (
            <li key={index}>
              <div >
                <div>
                  <input
                  type="checkbox"
                  id={`custom-checkbox-${index}`}
                  name={name}
                  value={name}
                  checked={form.postTechStack.includes(name)}
                  onChange={handleChange}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                </div>
              </div>
            </li>
          );
        })}
       
      </ul>
          </Box>
          <Button
            sx={{ width: "50%", margin: "2% auto" }}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default Create