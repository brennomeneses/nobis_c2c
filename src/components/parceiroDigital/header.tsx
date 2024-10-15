import React from 'react';
import logo from '../assets/logos/nobis_horizontal.png';
import menu from '../assets/icons/menu.png';
import { Dropdown, Space } from 'antd';
import { Link } from 'react-router-dom';
import { Divider } from 'antd';

const App: React.FC = () => (
  <>
    <div className='header' style={{ marginTop: "-5.5%" }}>
      <img className='logo' src={logo} />
      
      <img src={menu} />
    </div>
    <Divider />
  </>
);

export default App;