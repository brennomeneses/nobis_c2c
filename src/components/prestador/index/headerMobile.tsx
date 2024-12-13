import React, { useState } from 'react';
import { Modal, Form, Input, Radio, Select, InputNumber, Checkbox, Button, Dropdown, Menu, Space, Divider, Alert, message, Popover } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import logo from '../../assets/logos/nobis_horizontal_branca.png';
import notif from '../../assets/icons/notif.png';
import baseUrl from '../../assets/schemas/baseUrl';
import { Link, useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [userData, setUserData] = useState<any>(null);
  const authToken = localStorage.getItem('authToken');

  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  };

  const navigate = useNavigate();

  const handlePrestadorClick = () => {
    fetch(baseUrl + '/users/create', options)
      .then(response => response.json())
      .then(data => {
        localStorage.setItem("isClient", "1");
        //window.location.reload();

        navigate('/inicio');
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      <div className='header' style={{ backgroundColor: "#4C3779", paddingBottom: "1%" }}>
        <img className='logo' src={logo} alt="Logo" />
        <a className='btnTroca' style={{ cursor: "pointer", color: "#4C3779", border: "1px solid #4C3779", backgroundColor: "white", marginLeft: "5%", marginRight: "5%" }} >
          <Space style={{ fontSize: "10px" }}>
            QUERO PRESTAR SERVIÇOS
          </Space>
        </a>
        <a className='btnTroca' style={{ cursor: "pointer", color: "white", border: "1px solid white", backgroundColor: "#4C3779", marginRight: "5%" }} onClick={handlePrestadorClick}>
          <Space style={{ fontSize: "10px" }}>
            QUERO SOLICITAR SERVIÇOS
          </Space>
        </a>
      </div>
    </>
  );
};

export default RegistrationForm;