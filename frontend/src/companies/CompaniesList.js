import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import JoblyApi from "../api";
import SearchForm from "../common/SearchForm";
import CompanyCard from "./CompanyCard";

const CompaniesList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    search();
  }, []);

  const search = async (name) => {
    let mounted = true;
    let companies = await JoblyApi.getCompanies(name);

    if (mounted) {
      setCompanies(companies);
      setIsLoading(false);
    }
    return () => {
      mounted = false;
    };
  };

  if (isLoading) {
    return <span data-testid="loading">Loading ...</span>;
  }

  return (
    <section className="CompaniesList">
      <Container maxWidth="md" fixed>
        <SearchForm search={search} />
        {companies.map(
          ({ handle, name, description, numEmployees, logoUrl }) => {
            return (
              <CompanyCard
                key={handle}
                handle={handle}
                name={name}
                description={description}
                numEmployees={numEmployees}
                logoUrl={logoUrl}
              ></CompanyCard>
            );
          }
        )}
      </Container>
    </section>
  );
};

export default CompaniesList;
