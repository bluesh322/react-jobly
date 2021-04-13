import React, { useState, useEffect} from "react"; 
import { useParams } from "react-router-dom";
import JoblyApi from "../api";
import JobCardList from "../jobs/JobCardList"
import { Container } from "@material-ui/core";

const CompanyDetails = () => {
    const { handle } = useParams();
    const [company, setCompany] = useState(null);

    useEffect(() => {
        const getCompanyAndJobList = async () => {
            setCompany(await JoblyApi.getCompany(handle));
        }
        getCompanyAndJobList();

    }, [handle])

    if (!company) return <span>Loading ...</span>

    return (
        <Container maxWidth="md" fixed>
            <h3>{company.name}</h3>
            <p>{company.description}</p>
            <JobCardList jobs={company.jobs}/>
        </Container>
    );
}

export default CompanyDetails;