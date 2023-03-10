import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
// import AlertDialog from "./prompts/AlertDialog";
import { createUser } from "./services/createUser";
import SelectLocation from "./signup-components/SelectLocation";
import SelectExperience from "./signup-components/SelectExperience";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  redirect,
  useNavigate,
} from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    console.log("creating user");

    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const birthdate = data.get("birthdate");
    const experience = data.get("experience");

    const locationZipcode = data.get("locationZipcode");
    const locationCity = data.get("locationCity");
    const locationState = data.get("locationState");

    const email = data.get("email");
    const password = data.get("password");

    const profileObject = {
      firstName: firstName,
      lastName: lastName,
      birthdate: birthdate,
      experience: experience,
      locationZipcode: locationZipcode,
      locationCity: locationCity,
      locationState: locationState,
      email: email,
      password: password,
    };
    createUser(profileObject, navigate);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <MusicNoteIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          For Those About to Rock...
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Divider
                sx={{ color: "text.secondary" }}
                variant="middle"
                flexItem
              >
                User Info
              </Divider>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="birthdate"
                label="Date of Birth"
                name="birthdate"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <SelectExperience />
            </Grid>

            <Grid item xs={12}>
              <Divider
                sx={{ color: "text.secondary" }}
                variant="middle"
                flexItem
              >
                Location
              </Divider>
            </Grid>

            <Grid item xs={12}>
              <SelectLocation />
            </Grid>

            <Grid item xs={12}>
              <Divider
                sx={{ color: "text.secondary" }}
                variant="middle"
                flexItem
              >
                Login
              </Divider>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="birthdate"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="./" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
