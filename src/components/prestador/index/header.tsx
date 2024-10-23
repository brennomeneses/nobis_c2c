import React, { useState } from 'react';
import logo from '../../assets/logos/nobis_horizontal_branca.png';
import notif from '../../assets/icons/notif.png';
import { Menu, Dropdown, Space, Divider } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const authToken = localStorage.getItem('authToken');

const options = {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${authToken}`
  }
};

const App: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);

  const navigate = useNavigate();

  const handlePrestadorClick = () => {
    fetch('https://brenno-envoriment-node.1pc5en.easypanel.host/users/create', options)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem("isClient", "1");
        //window.location.reload();

        navigate('/inicio');
      })
      .catch(err => console.error(err));
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/inicio" onClick={handlePrestadorClick}>Virar Cliente</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className='header' style={{ backgroundColor: "#4C3779", paddingBottom: "1%" }}>
        <img className='logo' src={logo} alt="Logo" /> <sub style={{ color: "#FFFFFF" }}>VOCÊ ESTÁ LOGADO COMO: <b>PRESTADOR DE SERVIÇOS</b></sub>
        <Dropdown overlay={menu} trigger={['click']}>
          <a className='btnTroca' style={{ cursor: "pointer", color: "#FFFFFF", border: "1px solid white", backgroundColor: "#4C3779" }} onClick={(e) => e.preventDefault()}>
            <Space>
              QUERO SOLICITAR SERVIÇOS
            </Space>
          </a>
        </Dropdown>
        <Link to={'/notificacoes'}><img className='notif' src={notif} alt="Notificações" /></Link>
      </div>
    </>
  );
}

export default App;