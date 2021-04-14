import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import { Container, Box, Button } from "@material-ui/core";

const Home = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <Container maxWidth="md">
      <h2 data-testid="resolved">Jobly</h2>
      <p>All the jobs in one, convenient place</p>
      {currentUser ? (
        <h2 data-testid="loggedInResolved" >Welcome Back {currentUser.username}</h2>
      ) : (
          <Box>
          <Link to="/signup" key="Sign Up">
          <Button variant="contained" color="primary">Sign Up</Button>
          </Link>
          <Link to="/login" key="Login">
            <Button variant="contained" color="secondary">Login</Button>
          </Link>              
          </Box>
      )}
    </Container>
  );
};

export default Home;
