import React, { useState } from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { Typography, Container, Box, FormControl, TextField, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch'
    },
    btn: {
        width: 100,
        marin: theme.spacing(2),
    },
    text: {
        display: 'flex',
    }
}))

const NewUserForm = ({signup}) => {
    const classes = useStyles();
    const INITIAL_STATE = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    }
    const history = useHistory();
    const [formData, setFormData] = useState(INITIAL_STATE);

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData((data) => ({
            ...data,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const {username, password, firstName, lastName, email} = formData;
        signup({username, password, firstName, lastName, email});
        setFormData(INITIAL_STATE);
        history.push("/");
    }

    return (
        <Container justifycontent="center" maxWidth="md" fixed>
            <Box className={classes.root} my={2}>
            <Typography className={classes.text} variant="h3">Welcome to jobly!</Typography>
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <TextField id="username" className={clsx(classes.margin, classes.withoutLabel, classes.textField)} variant="outlined" label="username" name="username" value={formData.username} onChange={handleChange}></TextField>
                    <TextField id="password" className={clsx(classes.margin, classes.withoutLabel, classes.textField)} variant="outlined" label="password" name="password" value={formData.password} onChange={handleChange}></TextField>
                    <TextField id="firstName" className={clsx(classes.margin, classes.withoutLabel, classes.textField)} variant="outlined" label="firstName" name="firstName" value={formData.firstName} onChange={handleChange}></TextField>
                    <TextField id="lastName" className={clsx(classes.margin, classes.withoutLabel, classes.textField)} variant="outlined" label="lastName" name="lastName" value={formData.lastName} onChange={handleChange}></TextField>
                    <TextField id="email" className={clsx(classes.margin, classes.withoutLabel, classes.textField)} variant="outlined" label="email" name="email" value={formData.email} onChange={handleChange}></TextField>
                    <Button className={classes.btn} variant="contained" color="primary" type="submit">Sign Up!</Button>
                </FormControl>
            </form>      
            </Box>
        </Container>
    );
}

export default NewUserForm;