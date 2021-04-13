import React, { useState } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";

const SearchForm = ({ search }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (evt) => {
    evt.preventDefault();
    search(query.trim() || undefined);
    setQuery(query.trim());
  };

  const handleChange = (evt) => {
    setQuery(evt.target.value);
  };

  return (
    <Box my={2}>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <FormControl fullWidth>
          <TextField
            size="small"
            name="query"
            value={query}
            width="20ch"
            onChange={handleChange}
            id="query"
            label="Search"
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit">
                    <Search></Search>
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
        </FormControl>
      </form>
    </Box>
  );
};

export default SearchForm;
