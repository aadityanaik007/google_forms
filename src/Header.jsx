import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';

const Header = () => {
  return (
    <div className='Header'>
        <div className="header_info">
          <IconButton>
              <MenuIcon/>
          </IconButton>    
        </div>
        <div className="header_search">
          
        </div>
        <div className="header_right"></div>
    </div>
  )
}

export default Header;