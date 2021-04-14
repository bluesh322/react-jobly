import React, {useState, useEffect, useContext} from "react";
import { Card, CardContent, Typography, Button, Box } from "@material-ui/core";
import UserContext from "../auth/UserContext";

const JobCard = ({ id, title, salary, equity, companyName }) => {
  const { hasAppliedForJob, applyForJob } = useContext(UserContext)
  const [applied, setApplied] = useState();

  useEffect(() => {
    setApplied(hasAppliedForJob(id));
  }, [id, hasAppliedForJob])

  const handleApply = async (evt) => {
    if (hasAppliedForJob(id)) return;
    applyForJob(id);
    setApplied(true);
  }

  return (
    <Box my={2}>
      <Card>
        <CardContent>
          <Typography>{title}</Typography>
          <Typography>{companyName}</Typography>
          {salary && (
            <Typography>Salary: {Number(salary).toLocaleString()}</Typography>
          )}
          <Typography>Equity: {equity}</Typography>
          <Button data-testid="apply" disabled={applied} onClick={handleApply} variant="contained" size="small" color="secondary">
            {applied ? "Applied" : "Apply"}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default JobCard;
