import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client'
import Notificacao from '../../components/notificacoes/notificacoes.tsx'
import Footer from '../../components/cliente/footer'
import { useMediaQuery } from 'react-responsive';
import HeaderCliente from '../../components/cliente/index/header'
import HeaderPrestador from '../../components/prestador/index/header'
import HeaderMobile from '../../components/cliente/index/headerCel'
import { Divider } from 'antd';

export default function Inicio() {
    let isClient = localStorage.getItem("isClient");
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <>
      {isMobile ? (
        <HeaderMobile />
      ) : (
        isClient === '1' ? <HeaderCliente /> : <HeaderPrestador />
      )}
      <div className='container'>
        <center><h3>Notificações</h3></center>
        <Divider />
        <br />
        <Notificacao />
        <br /><br /><br /><br />
      </div>
      <Footer />
    </>
  )
}