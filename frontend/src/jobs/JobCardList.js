import React from "react";
import JobCard from "./JobCard";
import { Box } from "@material-ui/core";

const JobCardList = ({ jobs }) => {
  return (
    <Box>
      {jobs.map(({ id, title, salary, equity, companyName }) => {
        return (
          <JobCard
            id={id}
            title={title}
            salary={salary}
            equity={equity}
            companyName={companyName}
            key={id}
          />
        );
      })}
    </Box>
  );
};

export default JobCardList;
