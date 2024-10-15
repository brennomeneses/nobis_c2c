import React, { useState } from 'react';
import logo from '../../assets/logos/nobis_horizontal_branca.png';
import { Input, Drawer, Button } from 'antd';
import { SearchOutlined, MenuOutlined } from '@ant-design/icons';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className='header' style={{ margin: "-7%", marginBottom: "5%", backgroundColor: "#4C3778", padding: "2%" }}>
        <img className='logo' src={logo} />
        <Input size="large" placeholder="Pesquisar" style={{ width: "50%" }} suffix={<SearchOutlined />} />
        <Button type="primary" onClick={showDrawer}>
          <MenuOutlined />
        </Button>
        <Drawer title="Basic Drawer" onClose={onClose} open={open}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </div>
    </>
  );
};

export default App;
