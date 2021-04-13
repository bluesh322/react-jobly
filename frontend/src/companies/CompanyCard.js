import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  makeStyles,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 200,
  },

  title: {
    fontSize: 16,
  },
});

const CompanyCard = ({ handle, name, description, numEmployees, logoUrl }) => {
  const classes = useStyles();

  return (
    <Box my={2}>
      <Link to={`companies/${handle}`}>
        <Card className={classes.root}>
          <CardContent>
            <Typography component="h2" className={classes.title}>
              {name}
            </Typography>
            <Typography component="h4">{description}</Typography>
          </CardContent>
          <CardActions>
            <Button>{logoUrl && <img src={logoUrl} alt={name} />}</Button>
          </CardActions>
        </Card>
      </Link>
    </Box>
  );
};

export default CompanyCard;
