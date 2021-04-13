import React, { useState, useContext } from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import {
  Typography,
  Container,
  Box,
  FormControl,
  TextField,
  Button,
  makeStyles,
  Card,
  CardContent,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab"
import UserContext from "../auth/UserContext";
import JoblyApi from "../api";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
  btn: {
    width: 200,
    marin: theme.spacing(2),
  },
  text: {
    display: "flex",
  },
}));

const UpdateUserForm = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const classes = useStyles();
  const INITIAL_STATE = {
    username: currentUser.username,
    password: "",
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
  };
  const history = useHistory();
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [formErrors, setFormErrors] = useState([]);
  const [saveConfirmed, setSaveConfirmed] = useState(false);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profileData = {
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    };
    const {username} = currentUser;
    const {password} = formData;
    let updatedUser;
    try {
      let token = await JoblyApi.login({username, password});
      if(!token) return;
      updatedUser = await JoblyApi.saveProfile(username, profileData);
    } catch (errors) {
      //debugger;
      setFormErrors(errors);
      return;
    }
    setCurrentUser(updatedUser);
    setFormData(f => ({ ...f, password: ""}));
    setFormErrors([]);
    setSaveConfirmed(true);
    history.push("/profile");
  };

  return (
    <Container fullwidth="md" fixed>
      <Typography className={classes.root}  variant="h4">Profile</Typography>
      <Card>
        <CardContent>
          <Box className={classes.root} my={2}>
            <Typography className={classes.text} variant="h3">
            </Typography>
            <form onSubmit={handleSubmit}>
              <FormControl>
                <TextField
                  disabled
                  className={clsx(
                    classes.margin,
                    classes.withoutLabel,
                    classes.textField
                  )}
                  variant="outlined"
                  label="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                ></TextField>
                <TextField
                  className={clsx(
                    classes.margin,
                    classes.withoutLabel,
                    classes.textField
                  )}
                  variant="outlined"
                  label="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                ></TextField>
                <TextField
                  className={clsx(
                    classes.margin,
                    classes.withoutLabel,
                    classes.textField
                  )}
                  variant="outlined"
                  label="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                ></TextField>
                <TextField
                  className={clsx(
                    classes.margin,
                    classes.withoutLabel,
                    classes.textField
                  )}
                  variant="outlined"
                  label="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                ></TextField>
                <TextField
                  className={clsx(
                    classes.margin,
                    classes.withoutLabel,
                    classes.textField
                  )}
                  variant="outlined"
                  label="Confirm password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                ></TextField>
              {formErrors.length
                  ? <Alert severity="error">{formErrors}</Alert>
                  : null}

              {saveConfirmed
                  ?
                  <Alert severity="success" >Updated successfully.</Alert>
                  : null}

                <Button
                  className={classes.btn}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Update Profile
                </Button>
              </FormControl>
            </form>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UpdateUserForm;
