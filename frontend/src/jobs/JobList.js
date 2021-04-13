import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core"
import SearchForm from "../common/SearchForm";
import JobCardList from "./JobCardList";
import JoblyApi from "../api"
const JobList = () => {
  const [jobs, setJobs] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    search();
  }, []); 

  const search = async (title) => {
    let jobs = await JoblyApi.getJobs(title);
      setJobs(jobs);
      setIsLoading(false);
  }

  if (isLoading) {
    return <span data-testid="loading">Loading ...</span>;
  }


  return (
    <Container maxWidth="md" fixed>
      <SearchForm search={search}></SearchForm>
      {jobs.length ? (
            <JobCardList
              jobs={jobs}>
            </JobCardList>
          ) : <span>Sorry, no results were found</span>
        
      }
    </Container>
  );

}

export default JobList;