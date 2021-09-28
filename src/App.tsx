/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const rootDivStyle = css({
  margin: '0px 24px',
  '@media (max-width: 600px)': {
    margin: '0px 16px',
  },
});

const App = () => (
  <div className='App'>
    <header>
      <AppBar position='static'>
        <Toolbar variant='dense'>
          <Typography variant='h6' color='inherit' component='div'>
            Random Number Generator
          </Typography>
        </Toolbar>
      </AppBar>
    </header>
    <div css={rootDivStyle}>
      <h1>Page content</h1>
    </div>
  </div>
);

export default App;
