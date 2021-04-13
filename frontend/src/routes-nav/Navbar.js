import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import {
  AppBar,
  Toolbar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Container,
} from "@material-ui/core";
import { Home } from "@material-ui/icons";
import UserContext from "../auth/UserContext";

const useStyles = makeStyles({
  navDisplayFlex: {
    display: "flex",
    justifyContent: "space-between",
  },
  linkText: {
    textDecoration: "none",
    color: "white",
  },
});

const NavBar = ({ logout }) => {
  const { currentUser } = useContext(UserContext);

  const loggedInNav = () => {
    return (
      <Container maxWidth="md" className={classes.navDisplayFlex}>
        <IconButton edge="start" color="inherit" aria-label="home">
          <Link to="/">
            <Home fontSize="large"></Home>
          </Link>
        </IconButton>
        <List
          className={classes.navDisplayFlex}
          component="nav"
          aria-labelledby="main navigation"
        >
          <Link className={classes.linkText} to="/companies" key="Companies">
            <ListItem button>
              <ListItemText primary="Companies"></ListItemText>
            </ListItem>
          </Link>
          <Link className={classes.linkText} to="/jobs" key="Jobs">
            <ListItem button>
              <ListItemText primary="Jobs"></ListItemText>
            </ListItem>
          </Link>
          <Link className={classes.linkText} to="/profile" key="Profile">
            <ListItem button>
              <ListItemText primary="Profile"></ListItemText>
            </ListItem>
          </Link>
          <Link className={classes.linkText} onClick={logout} to="/logout" key="Log Out">
            <ListItem button>
              <ListItemText primary="Log Out"></ListItemText>
            </ListItem>
          </Link>
        </List>
      </Container>
    );
  };

  const loggedOutNav = () => {
    return (
      <Container maxWidth="md" className={classes.navDisplayFlex}>
        <IconButton edge="start" color="inherit" aria-label="home">
          <Link to="/">
            <Home fontSize="large"></Home>
          </Link>
        </IconButton>
        <List
          className={classes.navDisplayFlex}
          component="nav"
          aria-labelledby="main navigation"
        >
          <Link className={classes.linkText} to="/signup" key="Sign Up">
            <ListItem button>
              <ListItemText primary="Sign Up"></ListItemText>
            </ListItem>
          </Link>
          <Link className={classes.linkText} to="/login" key="Login">
            <ListItem button>
              <ListItemText primary="Login"></ListItemText>
            </ListItem>
          </Link>
        </List>
      </Container>
    );
  };

  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>{currentUser ? loggedInNav() : loggedOutNav()}</Toolbar>
    </AppBar>
  );
};

export default NavBar;
