import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import AirIcon from '@mui/icons-material/Air';
import React from 'react';

const NavBar: React.FC<any> = () => {
  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton size='large' edge='start' aria-label='logo'>
            <AirIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Air Balloon
          </Typography>
        </Toolbar>
      </AppBar>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default NavBar;
