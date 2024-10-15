import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import { useMediaQuery } from 'react-responsive';
import Header from '../../components/cliente/index/header';
import HeaderMobile from '../../components/cliente/index/headerCel';
import Carrossel from '../../components/cliente/index/carousel';
import Solicitados from '../../components/cliente/index/mais-solicitados';
import Destaques from '../../components/cliente/index/destaques';
import Footer from '../../components/cliente/footer';
import { Row, Col, Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import bg from '../../components/assets/bgs/cliente.png';
import baseUrl from '../../components/assets/schemas/baseUrl';

export default function Inicio() {
  const [services, setServices] = useState([]);

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    const options = { method: 'GET', headers: { 'User-Agent': 'insomnia/9.3.1' } };

    fetch(`${baseUrl}/services/trend`, options)
      .then(response => response.json())
      .then(response => setServices(response))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
      {isMobile ? <HeaderMobile /> : <Header />}
      <div style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center', height: "125vh" }}>
        <div className='container'>
          <Carrossel />
          <br />
          <Card>
            <div style={{ display: "flex", alignItems: "stretch", justifyContent: "space-between" }}>
              <h1 className='titulo'>Serviços mais solicitados</h1>
              <div>
                <Link to="/busca" style={{ display: "flex", color: "black" }}>
                  <p>Ver mais serviços</p>
                  <SearchOutlined style={{ fontSize: "25px", color: "black" }} />
                </Link>
              </div>
            </div>
            <Row gutter={16}>
              {services.map(service => (
                <Col
                  key={service.id}
                  xs={24}
                  sm={12}
                  md={8}
                >
                  {/* Adiciona o Link ao redor do Card */}
                  <Link to={`/busca?servico=${service}`}>
                    <Solicitados servico={service} />
                  </Link>
                </Col>
              ))}
            </Row>
            <br />
            <Destaques />
          </Card>
        </div>
        <br /><br />
        <Footer />
      </div>
    </>
  );
}