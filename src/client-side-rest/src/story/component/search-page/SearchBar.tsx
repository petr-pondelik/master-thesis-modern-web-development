import { Container, IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';

type SearchBarProps = {
  query: string,
  setSearchQuery: (query: string) => void,
};

export default function SearchBar(props: SearchBarProps) {

  const [query, setQuery] = useState<string>(props.query);

  const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setQuery(query);
    props.setSearchQuery(query);
  };

  return (
    <Container style={{ margin: '2rem 0' }}>
      <Paper
        component='form'
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder='Search Stories'
          inputProps={{ 'aria-label': 'search google maps' }}
          value={query}
          onChange={handleSearchQueryChange}
        />
        <IconButton sx={{ p: '10px' }} aria-label='search'>
          <SearchIcon />
        </IconButton>
      </Paper>
    </Container>
  );
}